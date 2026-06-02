import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CFG_KEY   = "dv_sb_cfg_v1";
const FILE_PFX  = "dv_file_";
const MOD_TABLES = { po:"dv_po", invoice:"dv_invoice", quotation:"dv_quotation", drawing:"dv_drawing" };
const MOD_LABEL  = { po:"Purchase Orders", invoice:"Invoices", quotation:"Quotations", drawing:"Project Drawings" };
const MOD_PFX    = { po:"PO", invoice:"INV", quotation:"QUO", drawing:"DRW" };
const FILE_ACCEPT = {
  po:".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx",
  invoice:".pdf,.jpg,.jpeg,.png,.doc,.docx",
  quotation:".pdf,.jpg,.jpeg,.png,.doc,.docx",
  drawing:".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.stl,.obj,.sat,.rvt,.ifc,.jpg,.jpeg,.png",
};

// ─── SUPABASE AUTH REST ───────────────────────────────────────────────────────
const sbRest = cfg=>`https://${cfg.projectRef}.supabase.co/rest/v1`;
const sbAuth = cfg=>`https://${cfg.projectRef}.supabase.co/auth/v1`;
const sbH    = (cfg,token)=>({'apikey':cfg.anonKey,'Authorization':`Bearer ${token||cfg.anonKey}`,'Content-Type':'application/json','Prefer':'return=representation'});

const SA = {
  async signUp(cfg,email,password){
    const r=await fetch(`${sbAuth(cfg)}/signup`,{method:'POST',headers:{'apikey':cfg.anonKey,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const d=await r.json();if(!r.ok)throw new Error(d.error_description||d.msg||d.message||'Sign up failed');return d;
  },
  async signIn(cfg,email,password){
    const r=await fetch(`${sbAuth(cfg)}/token?grant_type=password`,{method:'POST',headers:{'apikey':cfg.anonKey,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const d=await r.json();if(!r.ok)throw new Error(d.error_description||d.msg||d.message||'Sign in failed');return d;
  },
};

// ─── SUPABASE DATABASE REST ───────────────────────────────────────────────────
const DB = {
  async list(cfg,token,table,userId){
    let url=`${sbRest(cfg)}/${table}?order=created_at.desc`;
    if(userId)url+=`&user_id=eq.${userId}`;
    const r=await fetch(url,{headers:sbH(cfg,token)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'List failed');return d;
  },
  async create(cfg,token,table,obj){
    const r=await fetch(`${sbRest(cfg)}/${table}`,{method:'POST',headers:sbH(cfg,token),body:JSON.stringify(obj)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'Create failed');return Array.isArray(d)?d[0]:d;
  },
  async update(cfg,token,table,dbId,obj){
    const r=await fetch(`${sbRest(cfg)}/${table}?id=eq.${dbId}`,{method:'PATCH',headers:sbH(cfg,token),body:JSON.stringify(obj)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'Update failed');return Array.isArray(d)?d[0]:d;
  },
  async remove(cfg,token,table,dbId){
    const r=await fetch(`${sbRest(cfg)}/${table}?id=eq.${dbId}`,{method:'DELETE',headers:sbH(cfg,token)});
    if(!r.ok){const d=await r.json();throw new Error(d.message||'Delete failed');}
  },
  async getUser(cfg,token,uid){
    const r=await fetch(`${sbRest(cfg)}/dv_users?id=eq.${uid}`,{headers:sbH(cfg,token)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'Get failed');return d[0]||null;
  },
  async upsertUser(cfg,token,obj){
    const r=await fetch(`${sbRest(cfg)}/dv_users`,{method:'POST',headers:{...sbH(cfg,token),'Prefer':'resolution=merge-duplicates,return=representation'},body:JSON.stringify(obj)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'Upsert failed');return Array.isArray(d)?d[0]:d;
  },
  async listUsers(cfg,token){
    const r=await fetch(`${sbRest(cfg)}/dv_users?order=created_at.asc`,{headers:sbH(cfg,token)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'List failed');return d;
  },
  async patchUser(cfg,token,uid,obj){
    const r=await fetch(`${sbRest(cfg)}/dv_users?id=eq.${uid}`,{method:'PATCH',headers:sbH(cfg,token),body:JSON.stringify(obj)});
    const d=await r.json();if(!r.ok)throw new Error(d.message||'Update failed');return Array.isArray(d)?d[0]:d;
  },
};

// ─── DATA CONVERSION ──────────────────────────────────────────────────────────
function rowToRec(row){
  return {_dbId:row.id,id:row.record_id,user_id:row.user_id,user_name:row.user_name,attachments:[],_attMeta:row.attachments_meta||[],...(row.data||{})};
}
function recToRow(rec){
  const skip=new Set(['_dbId','id','user_id','user_name','attachments','_attMeta','_docId']);
  const data={};
  Object.keys(rec).forEach(k=>{if(!skip.has(k))data[k]=rec[k];});
  return {record_id:rec.id,user_id:rec.user_id,user_name:rec.user_name,data,attachments_meta:(rec.attachments||[]).map(({name,size,uploadedAt,ext})=>({name,size:size||0,uploadedAt:uploadedAt||'',ext:ext||(name||'').split('.').pop()}))};
}

// ─── LOCAL FILE STORAGE ───────────────────────────────────────────────────────
const fKey=(tbl,dbId,idx)=>`${FILE_PFX}${tbl}_${dbId}_${idx}`;
async function saveFile(tbl,dbId,idx,data){try{await window.storage.set(fKey(tbl,dbId,idx),data);}catch{}}
async function loadFile(tbl,dbId,idx){try{const r=await window.storage.get(fKey(tbl,dbId,idx));return r?.value||null;}catch{return null;}}
async function dropFile(tbl,dbId,idx){try{await window.storage.delete(fKey(tbl,dbId,idx));}catch{}}

async function hydrateFiles(tbl,records){
  return await Promise.all(records.map(async rec=>{
    if(!rec._attMeta?.length)return{...rec,attachments:[]};
    const atts=await Promise.all(rec._attMeta.map(async(att,idx)=>({...att,data:await loadFile(tbl,rec._dbId,idx)})));
    return{...rec,attachments:atts};
  }));
}

// ─── CONFIG STORAGE ───────────────────────────────────────────────────────────
async function loadCfg(){try{const r=await window.storage.get(CFG_KEY);return r?JSON.parse(r.value):null;}catch{return null;}}
async function saveCfg(cfg){try{await window.storage.set(CFG_KEY,JSON.stringify(cfg));}catch{}}
async function clearCfg(){try{await window.storage.delete(CFG_KEY);}catch{}}

// ─── FILE TYPE INFO ───────────────────────────────────────────────────────────
function getFileInfo(name=""){
  const ext=name.split('.').pop().toLowerCase();
  const m={pdf:{l:"PDF",c:"#ef4444",canPreview:true},dwg:{l:"DWG",c:"#3b82f6",canPreview:false},dxf:{l:"DXF",c:"#3b82f6",canPreview:false},step:{l:"STEP",c:"#8b5cf6",canPreview:false},stp:{l:"STP",c:"#8b5cf6",canPreview:false},iges:{l:"IGES",c:"#8b5cf6",canPreview:false},igs:{l:"IGS",c:"#8b5cf6",canPreview:false},stl:{l:"STL",c:"#a855f7",canPreview:false},obj:{l:"OBJ",c:"#a855f7",canPreview:false},sat:{l:"SAT",c:"#a855f7",canPreview:false},rvt:{l:"RVT",c:"#06b6d4",canPreview:false},ifc:{l:"IFC",c:"#06b6d4",canPreview:false},jpg:{l:"IMG",c:"#22c55e",canPreview:true},jpeg:{l:"IMG",c:"#22c55e",canPreview:true},png:{l:"IMG",c:"#22c55e",canPreview:true},xlsx:{l:"XLS",c:"#059669",canPreview:false},xls:{l:"XLS",c:"#059669",canPreview:false},doc:{l:"DOC",c:"#2563eb",canPreview:false},docx:{l:"DOC",c:"#2563eb",canPreview:false}};
  return m[ext]||{l:ext.toUpperCase()||"FILE",c:"#64748b",canPreview:false};
}
const fmt=n=>"Rs. "+Number(n||0).toLocaleString("en-US");
const fmtSz=b=>b>1048576?`${(b/1048576).toFixed(1)} MB`:`${(b/1024).toFixed(0)} KB`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon=({name,size=18})=>{
  const d={dashboard:"M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",po:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z",invoice:"M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",quotation:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",drawing:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",logout:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",add:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",edit:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",delete:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",search:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",close:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",user:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",users:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",lock:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",email:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",eye:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",pdf:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7H20.5v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z",excel:"M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM9 15.75L6.75 12 9 8.25h1.5L8.25 12l2.25 3.75H9zm6 0h-1.5L11.25 12l2.25-3.75H15L12.75 12 15 15.75z",upload:"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z",download:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",import:"M11 16h2V7h3l-4-4-4 4h3zm-8 2v2h18v-2H3z",db:"M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4.55c-1.3.86-3.42 1.55-6 1.55s-4.7-.69-6-1.55V9.68C7.48 10.51 9.6 11 12 11s4.52-.49 6-1.32v3.77zM12 9C8.13 9 6 7.5 6 7s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z",cad:"M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h4v-2H7V9H5zm5-8v8h2V9h2V7zm4 6h2v-2h-2zm0-4h2V7h-4v2h2z",shield:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",crown:"M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z",refresh:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",copy:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",disconnect:"M13.41 10.59L12 12l-1.41-1.41L12 9.17l1.41 1.42zm-4-4l1.41 1.41L12 9.17l1.17-1.17L14.58 9.4l1.42-1.41L12 4 8 8l1.41 1.41zm4 9.82L12 14.83l-1.41 1.41L12 17.66l1.41-1.41zM19 3H5c-1.11 0-2 .89-2 2v3h2V5h14v14H5v-3H3v3c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2z",sql:"M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z",};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d={d[name]||d.db}/></svg>;
};

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
const SB=({s})=>{const m={Approved:"#22c55e",Accepted:"#22c55e",Paid:"#22c55e",Received:"#22c55e",Pending:"#f59e0b",Sent:"#3b82f6",Draft:"#6b7280",Review:"#a855f7",Unpaid:"#ef4444",Overdue:"#ef4444",Cancelled:"#ef4444",Rejected:"#ef4444",Superseded:"#6b7280"};const c=m[s]||"#6b7280";return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{s}</span>;};
const IS={width:"100%",padding:"9px 12px",background:"#0f1624",border:"1px solid #2e3a50",borderRadius:8,color:"#e2e8f0",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
const Inp=p=><input {...p} style={{...IS,...(p.style||{})}} onFocus={e=>e.target.style.borderColor="#10b981"} onBlur={e=>e.target.style.borderColor="#2e3a50"}/>;
const Sel=({children,...p})=><select {...p} style={IS}>{children}</select>;
const TA=p=><textarea {...p} style={{...IS,resize:"vertical",minHeight:60,...(p.style||{})}} onFocus={e=>e.target.style.borderColor="#10b981"} onBlur={e=>e.target.style.borderColor="#2e3a50"}/>;
const Field=({label,children,span})=>(<div style={{marginBottom:11,gridColumn:span?"1/-1":"auto"}}><label style={{display:"block",marginBottom:4,fontSize:10,fontWeight:700,color:"#94a3b8",letterSpacing:"0.8px",textTransform:"uppercase"}}>{label}</label>{children}</div>);
const Modal=({title,onClose,children,wide,full})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
    <div style={{background:"#1e2533",borderRadius:16,width:full?"min(900px,98vw)":wide?"min(720px,96vw)":"min(560px,94vw)",border:"1px solid #2e3a50",boxShadow:"0 24px 60px rgba(0,0,0,0.5)",overflow:"hidden",maxHeight:"95vh",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 20px",borderBottom:"1px solid #2e3a50",background:"linear-gradient(135deg,#052e16,#064e3b)",flexShrink:0}}>
        <h3 style={{margin:0,color:"#e2e8f0",fontSize:14,fontWeight:700}}>{title}</h3>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",display:"flex"}}><Icon name="close" size={18}/></button>
      </div>
      <div style={{padding:20,overflowY:"auto",flex:1}}>{children}</div>
    </div>
  </div>
);
const TBtn=({icon,label,color="#10b981",onClick,outline,disabled})=>(
  <button onClick={onClick} disabled={disabled} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",background:outline?"transparent":color,border:outline?`1px solid ${color}`:"none",borderRadius:7,color:outline?color:"white",fontSize:12,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",whiteSpace:"nowrap",opacity:disabled?0.5:1,transition:"opacity .15s"}}
    onMouseEnter={e=>!disabled&&(e.currentTarget.style.opacity="0.8")} onMouseLeave={e=>e.currentTarget.style.opacity=disabled?"0.5":"1"}>
    <Icon name={icon} size={14}/> {label}
  </button>
);

// ─── COLUMN CONFIG ────────────────────────────────────────────────────────────
const COL={
  po:[{key:"id",label:"PO #"},{key:"userName",label:"User"},{key:"vendor",label:"Vendor"},{key:"project",label:"Project"},{key:"date",label:"Date"},{key:"delivery_date",label:"Delivery"},{key:"amount",label:"Amount",render:v=><b style={{color:"#34d399"}}>{fmt(v)}</b>},{key:"payment_terms",label:"Payment"},{key:"status",label:"Status",render:v=><SB s={v}/>}],
  invoice:[{key:"id",label:"Invoice #"},{key:"userName",label:"User"},{key:"client",label:"Client"},{key:"description",label:"Description"},{key:"date",label:"Issue Date"},{key:"due",label:"Due Date"},{key:"amount",label:"Amount",render:v=><b style={{color:"#34d399"}}>{fmt(v)}</b>},{key:"tax",label:"Tax %"},{key:"status",label:"Status",render:v=><SB s={v}/>}],
  quotation:[{key:"id",label:"Quote #"},{key:"userName",label:"User"},{key:"client",label:"Client"},{key:"scope",label:"Scope"},{key:"date",label:"Date"},{key:"validity",label:"Valid Until"},{key:"amount",label:"Amount",render:v=><b style={{color:"#34d399"}}>{fmt(v)}</b>},{key:"status",label:"Status",render:v=><SB s={v}/>}],
  drawing:[{key:"id",label:"DRW #"},{key:"userName",label:"User"},{key:"title",label:"Title"},{key:"project",label:"Project"},{key:"type",label:"Type"},{key:"discipline",label:"Discipline"},{key:"version",label:"Ver."},{key:"revision",label:"Rev."},{key:"scale",label:"Scale"},{key:"status",label:"Status",render:v=><SB s={v}/>}],
};
const FC={
  po:[{key:"vendor",label:"Vendor Name",type:"text",ph:"e.g. Al-Amin Traders"},{key:"project",label:"Project",type:"text",ph:"e.g. Site A"},{key:"items",label:"Items/Description",type:"text",ph:"e.g. Steel Pipes x50"},{key:"date",label:"PO Date",type:"date"},{key:"delivery_date",label:"Expected Delivery",type:"date"},{key:"amount",label:"Amount (Rs)",type:"number",ph:"0"},{key:"payment_terms",label:"Payment Terms",type:"select",opts:["Advance 100%","Advance 50%","30 Days Net","60 Days Net","On Delivery","COD"]},{key:"contact",label:"Contact Person",type:"text",ph:"Name — Phone"},{key:"status",label:"Status",type:"select",opts:["Pending","Approved","Received","Cancelled"]},{key:"notes",label:"Notes",type:"textarea",span:true,ph:"Additional notes..."}],
  invoice:[{key:"client",label:"Client Name",type:"text",ph:"e.g. Malik Enterprises"},{key:"description",label:"Description",type:"text",ph:"e.g. Monthly Service"},{key:"date",label:"Issue Date",type:"date"},{key:"due",label:"Due Date",type:"date"},{key:"amount",label:"Amount (Rs)",type:"number",ph:"0"},{key:"tax",label:"Tax %",type:"number",ph:"17"},{key:"discount",label:"Discount %",type:"number",ph:"0"},{key:"bank",label:"Bank Account",type:"text",ph:"Bank — Account No"},{key:"contact",label:"Contact Person",type:"text",ph:"Name — Phone"},{key:"status",label:"Status",type:"select",opts:["Unpaid","Paid","Overdue","Cancelled"]},{key:"notes",label:"Notes",type:"textarea",span:true,ph:"Additional notes..."}],
  quotation:[{key:"client",label:"Client Name",type:"text",ph:"e.g. Zafar Builders"},{key:"scope",label:"Scope of Work",type:"text",ph:"e.g. Full Construction Package"},{key:"date",label:"Date",type:"date"},{key:"validity",label:"Valid Until",type:"date"},{key:"amount",label:"Amount (Rs)",type:"number",ph:"0"},{key:"tax",label:"Tax %",type:"number",ph:"17"},{key:"discount",label:"Discount %",type:"number",ph:"0"},{key:"contact",label:"Contact Person",type:"text",ph:"Name — Phone"},{key:"terms",label:"Payment Terms",type:"text",ph:"e.g. 50% advance"},{key:"status",label:"Status",type:"select",opts:["Draft","Sent","Accepted","Rejected"]},{key:"notes",label:"Notes",type:"textarea",span:true,ph:"Additional notes..."}],
  drawing:[{key:"title",label:"Drawing Title",type:"text",ph:"e.g. Foundation Plan"},{key:"project",label:"Project",type:"text",ph:"e.g. Site A"},{key:"type",label:"Drawing Type",type:"select",opts:["Structural","Electrical","Plumbing","Architectural","Civil","Mechanical","HVAC","Fire Fighting"]},{key:"discipline",label:"Discipline",type:"select",opts:["Civil","Electrical","MEP","Structural","Architectural","Mechanical","Survey"]},{key:"version",label:"Version",type:"text",ph:"e.g. v1.0"},{key:"revision",label:"Revision No.",type:"text",ph:"e.g. R0"},{key:"scale",label:"Scale",type:"text",ph:"e.g. 1:100"},{key:"size",label:"Paper Size",type:"select",opts:["A0","A1","A2","A3","A4"]},{key:"prepared_by",label:"Prepared By",type:"text",ph:"Engineer name"},{key:"checked_by",label:"Checked By",type:"text",ph:"Engineer name"},{key:"date",label:"Date",type:"date"},{key:"status",label:"Status",type:"select",opts:["Draft","Review","Approved","Superseded"]},{key:"notes",label:"Notes/Remarks",type:"textarea",span:true,ph:"Revision notes..."}],
};

// ─── EXPORT/PRINT ─────────────────────────────────────────────────────────────
const exportXLSX=(mod,data)=>{const rows=data.map(item=>{const r={};COL[mod].forEach(c=>{r[c.label]=item[c.key]??""});return r;});const ws=XLSX.utils.json_to_sheet(rows);ws["!cols"]=COL[mod].map(c=>({wch:Math.max(c.label.length+4,16)}));const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,MOD_LABEL[mod]);XLSX.writeFile(wb,`DataVault_${MOD_LABEL[mod].replace(/ /g,"_")}_${new Date().toISOString().slice(0,10)}.xlsx`);};
const printPDF=(mod,data)=>{const cols=COL[mod];const rows=data.map(item=>`<tr>${cols.map(c=>`<td>${c.key==="amount"?fmt(item[c.key]):(item[c.key]||"")}</td>`).join("")}</tr>`).join("");const html=`<!DOCTYPE html><html><head><title>${MOD_LABEL[mod]}</title><style>body{font-family:Arial;padding:24px;color:#111;}h1{font-size:18px;color:#065f46;}p{color:#666;font-size:11px;margin-bottom:14px;}table{width:100%;border-collapse:collapse;font-size:11px;}th{background:#065f46;color:white;padding:7px 8px;text-align:left;font-size:9px;text-transform:uppercase;}td{padding:6px 8px;border-bottom:1px solid #e5e7eb;}tr:nth-child(even) td{background:#f0fdf4;}footer{margin-top:12px;font-size:9px;color:#999;text-align:right;}@media print{body{padding:8px;}}</style></head><body><h1>${MOD_LABEL[mod]}</h1><p>Generated: ${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} | Records: ${data.length}</p><table><thead><tr>${cols.map(c=>`<th>${c.label}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table><footer>DataVault Pro — Powered by Supabase PostgreSQL</footer><script>window.onload=()=>window.print();<\/script></body></html>`;const w=window.open("","_blank");if(w){w.document.write(html);w.document.close();}};

// ─── SETUP WIZARD ─────────────────────────────────────────────────────────────
const SQL_SCRIPT=`CREATE TABLE IF NOT EXISTS dv_users (
  id text PRIMARY KEY, email text, name text,
  role text DEFAULT 'User', created_at text,
  disabled boolean DEFAULT false, created_by text
);
CREATE TABLE IF NOT EXISTS dv_po (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  record_id text, user_id text, user_name text,
  data jsonb DEFAULT '{}',
  attachments_meta jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS dv_invoice (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  record_id text, user_id text, user_name text,
  data jsonb DEFAULT '{}',
  attachments_meta jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS dv_quotation (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  record_id text, user_id text, user_name text,
  data jsonb DEFAULT '{}',
  attachments_meta jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS dv_drawing (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  record_id text, user_id text, user_name text,
  data jsonb DEFAULT '{}',
  attachments_meta jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE dv_users     DISABLE ROW LEVEL SECURITY;
ALTER TABLE dv_po        DISABLE ROW LEVEL SECURITY;
ALTER TABLE dv_invoice   DISABLE ROW LEVEL SECURITY;
ALTER TABLE dv_quotation DISABLE ROW LEVEL SECURITY;
ALTER TABLE dv_drawing   DISABLE ROW LEVEL SECURITY;`;

function SetupWizard({onDone}){
  const [step,setStep]=useState(1);
  const [cfg,setCfg]=useState({projectRef:"",anonKey:""});
  const [testing,setTesting]=useState(false);
  const [err,setErr]=useState("");
  const [copied,setCopied]=useState(false);
  const test=async()=>{
    if(!cfg.projectRef.trim()||!cfg.anonKey.trim()){setErr("Both fields required.");return;}
    setTesting(true);setErr("");
    try{
      const r=await fetch(`${sbRest(cfg)}/dv_users?limit=1`,{headers:sbH(cfg)});
      if(!r.ok){const d=await r.json();throw new Error(d.message||"Connection failed");}
      await saveCfg(cfg);onDone(cfg);
    }catch(e){setErr(`Failed: ${e.message}. Run the SQL script first and check credentials.`);}
    finally{setTesting(false);}
  };
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#022c22,#064e3b,#022c22)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne','Segoe UI',sans-serif",padding:20}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');*{box-sizing:border-box;}input::placeholder,textarea::placeholder{color:#4a5568;}@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      <div style={{width:"min(600px,100%)",background:"rgba(2,26,20,0.97)",border:"1px solid rgba(16,185,129,0.35)",borderRadius:20,overflow:"hidden",boxShadow:"0 0 50px rgba(16,185,129,0.1)"}}>
        <div style={{padding:"20px 26px",background:"linear-gradient(135deg,#052e16,#065f46)",borderBottom:"1px solid rgba(16,185,129,0.25)"}}>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#059669,#10b981)",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="sql" size={22}/></div>
            <div><h2 style={{margin:0,color:"#d1fae5",fontSize:16,fontWeight:800}}>Supabase SQL Setup — Step {step}/3</h2><p style={{margin:0,color:"#6ee7b7",fontSize:11}}>Free PostgreSQL database connect karo</p></div>
          </div>
          <div style={{display:"flex",gap:5,marginTop:13}}>{[1,2,3].map(s=><div key={s} style={{height:3,flex:1,borderRadius:2,background:s<=step?"#10b981":"rgba(16,185,129,0.2)",transition:"background .3s"}}/>)}</div>
        </div>
        <div style={{padding:"22px 26px"}}>
          {step===1&&(<div>
            <h3 style={{margin:"0 0 14px",color:"#e2e8f0",fontSize:14,fontWeight:700}}>Supabase Project Setup karo</h3>
            {[{n:1,t:"Supabase.com pe account banao",d:<>Go to <a href="https://supabase.com" target="_blank" rel="noopener" style={{color:"#10b981"}}>supabase.com</a> → Start your project → GitHub se sign up (free)</>},{n:2,t:"New Project banao",d:'"New Project" → Name: "datavault" → Strong password daalo → Region: closest → Create Project (2 min lagega)'},{n:3,t:"Email Confirmation disable karo",d:'Authentication → Providers → Email → "Confirm email" toggle OFF → Save (ZAROORI)'},{n:4,t:"SQL Script run karo",d:'Left menu: SQL Editor → New Query → Neeche se SQL copy karo → Paste karo → RUN karo'}].map(item=>(
              <div key={item.n} style={{display:"flex",gap:10,marginBottom:10,padding:"10px 12px",background:"#021a14",borderRadius:8,border:"1px solid #064e3b"}}>
                <div style={{width:23,height:23,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#10b981)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800,color:"white"}}>{item.n}</div>
                <div><div style={{fontWeight:700,color:"#e2e8f0",fontSize:12,marginBottom:2}}>{item.t}</div><div style={{color:"#64748b",fontSize:11,lineHeight:1.5}}>{item.d}</div></div>
              </div>
            ))}
            <div style={{background:"#021a14",border:"1px solid #064e3b",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontSize:10,color:"#10b981",fontWeight:700}}>SQL SCRIPT — Supabase SQL Editor mein run karo:</div>
                <button onClick={()=>{navigator.clipboard.writeText(SQL_SCRIPT).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),1500);}} style={{background:"#10b98122",border:"1px solid #10b98144",borderRadius:5,color:"#10b981",fontSize:10,cursor:"pointer",padding:"2px 8px",fontFamily:"inherit"}}>{copied?"Copied!":"Copy SQL"}</button>
              </div>
              <pre style={{margin:0,fontSize:9,color:"#6ee7b7",background:"#011a12",padding:"8px",borderRadius:5,overflow:"auto",maxHeight:180}}>{SQL_SCRIPT}</pre>
            </div>
            <button onClick={()=>setStep(2)} style={{width:"100%",padding:10,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",borderRadius:9,color:"white",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>SQL Run ho gaya → Next</button>
          </div>)}

          {step===2&&(<div>
            <h3 style={{margin:"0 0 6px",color:"#e2e8f0",fontSize:14,fontWeight:700}}>Supabase Credentials Enter karo</h3>
            <p style={{margin:"0 0 14px",color:"#64748b",fontSize:11}}>Supabase Dashboard → Project Settings → API</p>
            <div style={{background:"#021a14",border:"1px solid #064e3b",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
              <div style={{fontSize:10,color:"#10b981",fontWeight:700,marginBottom:5}}>YAHAN SE COPY KARO:</div>
              <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.6}}>Project Settings → API tab mein:<br/>• <b style={{color:"#e2e8f0"}}>Project URL</b>: https://XXXX.supabase.co → XXXX = Reference<br/>• <b style={{color:"#e2e8f0"}}>anon public key</b>: eyJh... wali lambi key</div>
            </div>
            <Field label="Project Reference (URL mein jo XXXX hai)"><Inp value={cfg.projectRef} onChange={e=>setCfg(c=>({...c,projectRef:e.target.value.trim().replace('https://','').replace('.supabase.co','').replace(/\//g,'')}))} placeholder="e.g. abcdefghijklmnop"/></Field>
            <Field label="Anon Public Key"><Inp value={cfg.anonKey} onChange={e=>setCfg(c=>({...c,anonKey:e.target.value.trim()}))} placeholder="eyJhbGciOiJIUzI1NiIs..."/></Field>
            <div style={{display:"flex",gap:9}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:10,background:"transparent",border:"1px solid #2e3a50",borderRadius:8,color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
              <button onClick={()=>setStep(3)} disabled={!cfg.projectRef||!cfg.anonKey} style={{flex:2,padding:10,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",borderRadius:8,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:(!cfg.projectRef||!cfg.anonKey)?0.5:1}}>Next →</button>
            </div>
          </div>)}

          {step===3&&(<div>
            <h3 style={{margin:"0 0 6px",color:"#e2e8f0",fontSize:14,fontWeight:700}}>Connection Test karo</h3>
            <div style={{background:"#021a14",border:"1px solid #064e3b",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
              <div style={{fontSize:10,color:"#10b981",fontWeight:700,marginBottom:6}}>CONNECTING TO:</div>
              <div style={{fontSize:12,color:"#94a3b8",marginBottom:3}}>🗄️ Project: <code style={{color:"#10b981"}}>{cfg.projectRef}</code></div>
              <div style={{fontSize:12,color:"#94a3b8"}}>🔑 Key: <code style={{color:"#10b981"}}>{cfg.anonKey.slice(0,20)}...</code></div>
            </div>
            {err&&<div style={{background:"#7f1d1d22",border:"1px solid #ef444444",borderRadius:7,padding:"8px 12px",color:"#f87171",fontSize:11,marginBottom:12,lineHeight:1.5}}>⚠ {err}</div>}
            <div style={{display:"flex",gap:9}}>
              <button onClick={()=>setStep(2)} style={{flex:1,padding:10,background:"transparent",border:"1px solid #2e3a50",borderRadius:8,color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
              <button onClick={test} disabled={testing} style={{flex:2,padding:10,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",borderRadius:8,color:"white",fontSize:12,fontWeight:700,cursor:testing?"wait":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                {testing?<><span style={{width:12,height:12,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/> Testing...</>:<><Icon name="sql" size={13}/> Connect Supabase</>}
              </button>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({cfg,token,currentUser,showToast}){
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [nu,setNu]=useState({email:"",password:"",name:"",role:"User"});
  const [creating,setCreating]=useState(false);
  const [err,setErr]=useState("");

  useEffect(()=>{loadUsers();},[]);
  const loadUsers=async()=>{setLoading(true);try{setUsers(await DB.listUsers(cfg,token));}catch(e){showToast(e.message,"error");}finally{setLoading(false);}};

  const createUser=async()=>{
    if(!nu.email||!nu.password||!nu.name){setErr("All fields required.");return;}
    if(nu.password.length<6){setErr("Password min 6 characters.");return;}
    setCreating(true);setErr("");
    try{
      const auth=await SA.signUp(cfg,nu.email,nu.password);
      const profile={id:auth.user?.id||auth.id,email:nu.email,name:nu.name,role:nu.role,created_at:new Date().toLocaleDateString(),disabled:false,created_by:currentUser.name};
      const saved=await DB.upsertUser(cfg,token,profile);
      setUsers(u=>[...u,saved]);
      setNu({email:"",password:"",name:"",role:"User"});
      showToast(`"${nu.name}" created! ✓`);
    }catch(e){setErr(e.message);}
    finally{setCreating(false);}
  };

  const toggleDisable=async(u)=>{
    try{const upd=await DB.patchUser(cfg,token,u.id,{disabled:!u.disabled});setUsers(list=>list.map(x=>x.id===u.id?upd:x));showToast(`${u.name} ${upd.disabled?"disabled":"enabled"}.`,upd.disabled?"error":"success");}
    catch(e){showToast(e.message,"error");}
  };
  const changeRole=async(u,role)=>{
    try{const upd=await DB.patchUser(cfg,token,u.id,{role});setUsers(list=>list.map(x=>x.id===u.id?upd:x));showToast(`${u.name} → ${role}`);}
    catch(e){showToast(e.message,"error");}
  };

  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
        {[{l:"Total Users",v:users.length,c:"#10b981"},{l:"Active",v:users.filter(u=>!u.disabled).length,c:"#22c55e"},{l:"Admins",v:users.filter(u=>u.role==="Admin").length,c:"#3b82f6"}].map(s=>(
          <div key={s.l} style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:12,padding:14,textAlign:"center"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:12,padding:16,marginBottom:18}}>
        <h3 style={{margin:"0 0 13px",fontSize:13,fontWeight:700,color:"#e2e8f0",display:"flex",alignItems:"center",gap:7}}><Icon name="add" size={15}/> Create New User</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <Field label="Full Name"><Inp value={nu.name} onChange={e=>setNu(u=>({...u,name:e.target.value}))} placeholder="Ahmad Khan"/></Field>
          <Field label="Email"><Inp type="email" value={nu.email} onChange={e=>setNu(u=>({...u,email:e.target.value}))} placeholder="user@company.com"/></Field>
          <Field label="Password"><Inp type="password" value={nu.password} onChange={e=>setNu(u=>({...u,password:e.target.value}))} placeholder="Min 6 characters"/></Field>
          <Field label="Role"><Sel value={nu.role} onChange={e=>setNu(u=>({...u,role:e.target.value}))}><option value="User">User</option><option value="Admin">Admin</option></Sel></Field>
        </div>
        {err&&<div style={{background:"#7f1d1d22",border:"1px solid #ef444444",borderRadius:7,padding:"7px 11px",color:"#f87171",fontSize:11,marginBottom:9}}>{err}</div>}
        <button onClick={createUser} disabled={creating} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 15px",background:"#10b981",border:"none",borderRadius:8,color:"white",fontSize:12,fontWeight:700,cursor:creating?"wait":"pointer",fontFamily:"inherit",opacity:creating?0.7:1}}>
          {creating?<><span style={{width:11,height:11,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/> Creating...</>:<><Icon name="users" size={13}/> Create User</>}
        </button>
      </div>
      <div style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:12,overflow:"hidden"}}>
        <div style={{padding:"10px 14px",borderBottom:"1px solid #1a2840",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{margin:0,fontSize:12,fontWeight:700,color:"#e2e8f0",display:"flex",alignItems:"center",gap:6}}><Icon name="users" size={14}/> Users ({users.length})</h3>
          <button onClick={loadUsers} style={{background:"none",border:"none",color:"#10b981",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,fontFamily:"inherit",fontWeight:600}}><Icon name="refresh" size={12}/> Refresh</button>
        </div>
        {loading?<div style={{padding:28,textAlign:"center",color:"#64748b",fontSize:12}}>Loading...</div>:
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#0a1220"}}>{["Name","Email","Role","Status","Actions"].map(h=><th key={h} style={{padding:"7px 11px",textAlign:"left",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840"}}>{h}</th>)}</tr></thead>
          <tbody>
            {users.map(u=>(
              <tr key={u.id} style={{borderBottom:"1px solid #0f1a2e"}}>
                <td style={{padding:"9px 11px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:u.role==="Admin"?"linear-gradient(135deg,#059669,#10b981)":"linear-gradient(135deg,#1d4ed8,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon name={u.role==="Admin"?"crown":"user"} size={12}/></div>
                    <div><div style={{fontSize:12,fontWeight:700,color:u.disabled?"#4a5568":"#e2e8f0"}}>{u.name}</div>{u.id===currentUser.uid&&<div style={{fontSize:9,color:"#10b981",fontWeight:700}}>YOU</div>}</div>
                  </div>
                </td>
                <td style={{padding:"9px 11px",fontSize:11,color:"#64748b"}}>{u.email}</td>
                <td style={{padding:"9px 11px"}}>
                  <select value={u.role} onChange={e=>changeRole(u,e.target.value)} disabled={u.id===currentUser.uid} style={{background:"transparent",border:"1px solid #2e3a50",borderRadius:5,color:u.role==="Admin"?"#10b981":"#94a3b8",fontSize:10,fontWeight:700,fontFamily:"inherit",padding:"2px 6px",cursor:"pointer"}}>
                    <option value="User">User</option><option value="Admin">Admin</option>
                  </select>
                </td>
                <td style={{padding:"9px 11px"}}>
                  <span style={{background:u.disabled?"#7f1d1d22":"#052e1622",color:u.disabled?"#ef4444":"#22c55e",border:`1px solid ${u.disabled?"#ef444433":"#22c55e33"}`,padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700}}>{u.disabled?"Disabled":"Active"}</span>
                </td>
                <td style={{padding:"9px 11px"}}>
                  {u.id!==currentUser.uid&&<button onClick={()=>toggleDisable(u)} style={{padding:"3px 9px",background:u.disabled?"#22c55e22":"#7f1d1d22",border:`1px solid ${u.disabled?"#22c55e44":"#ef444444"}`,borderRadius:5,color:u.disabled?"#22c55e":"#ef4444",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{u.disabled?"Enable":"Disable"}</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [appState,setAppState]=useState("loading");
  const [sbCfg,setSbCfg]=useState(null);
  const [token,setToken]=useState(null);
  const [currentUser,setCurrentUser]=useState(null);
  const [authMode,setAuthMode]=useState("login");
  const [authForm,setAuthForm]=useState({email:"",password:"",name:""});
  const [authErr,setAuthErr]=useState("");
  const [authLoading,setAuthLoading]=useState(false);
  const [showPass,setShowPass]=useState(false);
  const [activeTab,setActiveTab]=useState("dashboard");
  const [data,setData]=useState({po:[],invoice:[],quotation:[],drawing:[]});
  const [modLoading,setModLoading]=useState({});
  const [dbStatus,setDbStatus]=useState("idle");
  const [modal,setModal]=useState(null);
  const [formData,setFormData]=useState({});
  const [search,setSearch]=useState("");
  const [userFilter,setUserFilter]=useState("");
  const [allUsers,setAllUsers]=useState([]);
  const [toast,setToast]=useState(null);
  const importRef=useRef();

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3500);};
  const setDB=s=>{setDbStatus(s);if(s!=="saving")setTimeout(()=>setDbStatus("idle"),2500);};
  const accent="#10b981";

  useEffect(()=>{(async()=>{const cfg=await loadCfg();if(cfg){setSbCfg(cfg);setAppState("auth");}else setAppState("setup");})();},[]);

  const loadAll=async(cfg,tok,user)=>{
    const isAdmin=(user||currentUser)?.role==="Admin";
    const uid=(user||currentUser)?.uid;
    const mods=["po","invoice","quotation","drawing"];
    setModLoading({po:true,invoice:true,quotation:true,drawing:true});
    if(isAdmin){try{setAllUsers(await DB.listUsers(cfg,tok));}catch{}}
    const result={};
    for(const mod of mods){
      try{
        const rows=await DB.list(cfg,tok,MOD_TABLES[mod],isAdmin?null:uid);
        const recs=rows.map(rowToRec);
        result[mod]=await hydrateFiles(MOD_TABLES[mod],recs);
      }catch(e){result[mod]=[];showToast(`Load error (${mod}): ${e.message}`,"error");}
      setModLoading(l=>({...l,[mod]:false}));
    }
    setData(result);
  };

  const handleAuth=async()=>{
    if(!authForm.email||!authForm.password){setAuthErr("Email and password required.");return;}
    if(authMode==="register"&&!authForm.name){setAuthErr("Full name required.");return;}
    setAuthLoading(true);setAuthErr("");
    try{
      let authRes;
      if(authMode==="login") authRes=await SA.signIn(sbCfg,authForm.email,authForm.password);
      else authRes=await SA.signUp(sbCfg,authForm.email,authForm.password);
      const uid=authRes.user?.id||authRes.id;
      const tok=authRes.access_token;
      setToken(tok);
      let profile=await DB.getUser(sbCfg,tok,uid);
      if(!profile){
        const existing=await DB.listUsers(sbCfg,tok);
        const isFirst=existing.length===0;
        profile={id:uid,email:authForm.email,name:authForm.name||authForm.email.split("@")[0],role:isFirst?"Admin":"User",created_at:new Date().toLocaleDateString(),disabled:false};
        profile=await DB.upsertUser(sbCfg,tok,profile);
        if(isFirst)showToast("Welcome Admin! 👑 You have full access.");
      }
      if(profile.disabled)throw new Error("Your account is disabled. Contact admin.");
      const user={...profile,uid};
      setCurrentUser(user);
      setAppState("main");
      loadAll(sbCfg,tok,user);
    }catch(e){setAuthErr(e.message);}
    finally{setAuthLoading(false);}
  };

  const handleLogout=()=>{setCurrentUser(null);setToken(null);setAppState("auth");setAuthForm({email:"",password:"",name:""});setData({po:[],invoice:[],quotation:[],drawing:[]});};
  const handleDisconnect=async()=>{if(!window.confirm("Disconnect Supabase?"))return;await clearCfg();setSbCfg(null);setAppState("setup");handleLogout();};

  const openAdd=(mod)=>{setFormData({});setModal({type:"add",module:mod});};
  const openEdit=(mod,item)=>{setFormData({...item});setModal({type:"edit",module:mod,item});};
  const openView=(mod,item)=>setModal({type:"view",module:mod,item});

  const handleSave=async()=>{
    const mod=modal.module;setDB("saving");
    try{
      if(modal.type==="add"){
        const newId=`${MOD_PFX[mod]}-${String(data[mod].length+1).padStart(3,"0")}`;
        const rec={id:newId,...formData,user_id:currentUser.uid,user_name:currentUser.name,attachments:[]};
        const row=recToRow(rec);
        const saved=await DB.create(sbCfg,token,MOD_TABLES[mod],row);
        const newRec=rowToRec(saved);
        setData(d=>({...d,[mod]:[...d[mod],{...newRec,attachments:[]}]}));
        showToast("Saved to SQL database! ✓");
      }else{
        const row=recToRow(formData);
        const saved=await DB.update(sbCfg,token,MOD_TABLES[mod],formData._dbId,row);
        const updRec=rowToRec(saved);
        setData(d=>({...d,[mod]:d[mod].map(x=>x._dbId===formData._dbId?{...updRec,attachments:formData.attachments||[]}:x)}));
        showToast("Updated in database! ✓");
      }
      setDB("saved");
    }catch(e){setDB("error");showToast(`Error: ${e.message}`,"error");}
    setModal(null);
  };

  const handleDelete=async(mod,item)=>{
    const isAdmin=currentUser?.role==="Admin";
    if(!isAdmin&&item.user_id!==currentUser.uid){showToast("You can only delete your own records.","error");return;}
    if(!window.confirm(`Delete ${item.id}?`))return;
    setDB("saving");
    try{await DB.remove(sbCfg,token,MOD_TABLES[mod],item._dbId);setData(d=>({...d,[mod]:d[mod].filter(x=>x._dbId!==item._dbId)}));setDB("saved");showToast("Deleted.","error");}
    catch(e){setDB("error");showToast(`Error: ${e.message}`,"error");}
  };

  const handleFileUpload=async(files,item,mod)=>{
    const accepted=FILE_ACCEPT[mod].split(",").map(e=>e.trim().replace(".",""));
    const newFiles=Array.from(files).filter(f=>{const ext=f.name.split(".").pop().toLowerCase();return accepted.includes(ext);});
    if(!newFiles.length){showToast("Unsupported file type.","error");return;}
    for(const file of newFiles){
      const reader=new FileReader();
      reader.onload=async e=>{
        const att={name:file.name,size:file.size,uploadedAt:new Date().toLocaleDateString(),ext:file.name.split(".").pop().toLowerCase(),data:e.target.result};
        const newAtts=[...(item.attachments||[]),att];
        const updItem={...item,attachments:newAtts};
        const idx=newAtts.length-1;
        await saveFile(MOD_TABLES[mod],item._dbId,idx,att.data);
        try{
          await DB.update(sbCfg,token,MOD_TABLES[mod],item._dbId,recToRow(updItem));
          setData(d=>({...d,[mod]:d[mod].map(x=>x._dbId===item._dbId?{...x,attachments:newAtts}:x)}));
          setModal(m=>m?{...m,item:{...m.item,attachments:newAtts}}:m);
          showToast(`"${file.name}" attached! 📎`);
        }catch(e){showToast(`Upload failed: ${e.message}`,"error");}
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDelete=async(item,mod,idx)=>{
    if(!window.confirm("Remove file?"))return;
    const newAtts=item.attachments.filter((_,i)=>i!==idx);
    await dropFile(MOD_TABLES[mod],item._dbId,idx);
    try{
      await DB.update(sbCfg,token,MOD_TABLES[mod],item._dbId,recToRow({...item,attachments:newAtts}));
      setData(d=>({...d,[mod]:d[mod].map(x=>x._dbId===item._dbId?{...x,attachments:newAtts}:x)}));
      setModal(m=>m?{...m,item:{...m.item,attachments:newAtts}}:m);
      showToast("File removed.","error");
    }catch(e){showToast(`Error: ${e.message}`,"error");}
  };

  const previewFile=att=>{const ext=att.name.split(".").pop().toLowerCase();const w=window.open();if(["jpg","jpeg","png"].includes(ext))w.document.write(`<img src="${att.data}" style="max-width:100%;margin:auto;display:block;background:#111"/>`);else w.document.write(`<iframe src="${att.data}" style="width:100%;height:100vh;border:none"></iframe>`);};

  const handleImport=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=async ev=>{
      try{
        const wb=XLSX.read(ev.target.result,{type:"array"});
        const rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        setDB("saving");const saved=[];
        for(let i=0;i<rows.length;i++){
          const rw=rows[i];
          const data={};Object.keys(rw).forEach(k=>{data[k.toLowerCase().replace(/ /g,"_")]=String(rw[k]||"");});
          const newId=`${MOD_PFX[activeTab]}-${String(data[activeTab]?.length||0+i+1).padStart(3,"0")}`;
          const rowObj={record_id:newId,user_id:currentUser.uid,user_name:currentUser.name,data,attachments_meta:[]};
          try{const r=await DB.create(sbCfg,token,MOD_TABLES[activeTab],rowObj);saved.push({...rowToRec(r),attachments:[]});}catch{}
        }
        setData(d=>({...d,[activeTab]:[...d[activeTab],...saved]}));
        setDB("saved");showToast(`${saved.length} records imported! ✓`);
      }catch{showToast("Error reading Excel.","error");}
    };
    reader.readAsArrayBuffer(file);
    e.target.value="";
  };

  const filtered=mod=>{
    let rows=data[mod]||[];
    if(userFilter)rows=rows.filter(x=>x.user_id===userFilter);
    const q=search.toLowerCase();
    if(q)rows=rows.filter(item=>Object.values(item).some(v=>String(v).toLowerCase().includes(q)));
    return rows;
  };

  const isAdmin=currentUser?.role==="Admin";
  const cols=(COL[activeTab]||[]).filter(c=>isAdmin||c.key!=="userName");
  const stats={
    po:{total:data.po.length,val:data.po.reduce((a,b)=>a+(+b.amount||0),0),extra:data.po.filter(x=>x.status==="Pending").length,el:"Pending"},
    invoice:{total:data.invoice.length,val:data.invoice.reduce((a,b)=>a+(+b.amount||0),0),extra:data.invoice.filter(x=>x.status!=="Paid").length,el:"Unpaid"},
    quotation:{total:data.quotation.length,val:data.quotation.reduce((a,b)=>a+(+b.amount||0),0),extra:data.quotation.filter(x=>x.status==="Accepted").length,el:"Accepted"},
    drawing:{total:data.drawing.length,val:null,extra:data.drawing.filter(x=>x.status==="Approved").length,el:"Approved"},
  };
  const navItems=[{id:"dashboard",label:"Dashboard",icon:"dashboard"},{id:"po",label:"Purchase Orders",icon:"po"},{id:"invoice",label:"Invoices",icon:"invoice"},{id:"quotation",label:"Quotations",icon:"quotation"},{id:"drawing",label:"Project Drawings",icon:"drawing"},...(isAdmin?[{id:"admin",label:"Admin Panel",icon:"shield"}]:[])];
  const cardDef=[{mod:"po",label:"Purchase Orders",icon:"po",color:"#3b82f6"},{mod:"invoice",label:"Invoices",icon:"invoice",color:"#22c55e"},{mod:"quotation",label:"Quotations",icon:"quotation",color:"#f59e0b"},{mod:"drawing",label:"Drawings",icon:"drawing",color:"#a855f7"}];

  if(appState==="setup")return <SetupWizard onDone={cfg=>{setSbCfg(cfg);setAppState("auth");}}/>;
  if(appState==="loading")return(
    <div style={{minHeight:"100vh",background:"#060d1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne','Segoe UI',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      <div style={{textAlign:"center"}}><div style={{width:48,height:48,borderRadius:"50%",border:"3px solid #1a2840",borderTop:`3px solid ${accent}`,animation:"spin .8s linear infinite",margin:"0 auto 16px"}}/><h2 style={{color:"#e2e8f0",margin:"0 0 5px",fontSize:17,fontWeight:800}}>DataVault Pro</h2><p style={{color:"#64748b",fontSize:11,margin:0}}>Loading...</p></div>
    </div>
  );

  if(appState==="auth")return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#022c22,#064e3b,#022c22)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne','Segoe UI',sans-serif",padding:20}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');*{box-sizing:border-box;}input::placeholder{color:#4a5568;}.gc{animation:glow 3s ease-in-out infinite alternate;}@keyframes glow{from{box-shadow:0 0 20px rgba(16,185,129,0.2);}to{box-shadow:0 0 40px rgba(16,185,129,0.5);}}@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      <div style={{width:"min(410px,100%)"}}>
        <div className="gc" style={{background:"rgba(2,26,20,0.97)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:20,padding:"32px 28px",backdropFilter:"blur(20px)"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{width:52,height:52,borderRadius:14,background:"linear-gradient(135deg,#059669,#10b981)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:11,boxShadow:"0 8px 24px rgba(16,185,129,0.35)"}}><Icon name="sql" size={25}/></div>
            <h1 style={{margin:0,color:"#e2e8f0",fontSize:19,fontWeight:800}}>DataVault Pro</h1>
            <p style={{margin:"4px 0 0",color:"#64748b",fontSize:11}}>Powered by Supabase PostgreSQL</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,justifyContent:"center",marginBottom:15,padding:"4px 10px",background:"#052e1622",border:"1px solid #10b98133",borderRadius:20,width:"fit-content",margin:"0 auto 15px"}}><Icon name="sql" size={11}/><span style={{fontSize:10,color:accent,fontWeight:700}}>{sbCfg?.projectRef}.supabase.co</span></div>
          <div style={{display:"flex",background:"#021a14",borderRadius:9,padding:3,marginBottom:16,border:"1px solid #064e3b"}}>
            {["login","register"].map(m=><button key={m} onClick={()=>{setAuthMode(m);setAuthErr("");}} style={{flex:1,padding:"7px 0",background:authMode===m?"linear-gradient(135deg,#059669,#10b981)":"transparent",border:"none",borderRadius:7,color:authMode===m?"white":"#64748b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{m==="login"?"Login":"Register"}</button>)}
          </div>
          {authMode==="register"&&<Field label="Full Name"><div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#4a5568"}}><Icon name="user" size={13}/></span><input value={authForm.name} onChange={e=>setAuthForm(f=>({...f,name:e.target.value}))} placeholder="Your full name" style={{...IS,paddingLeft:30}}/></div></Field>}
          <Field label="Email"><div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#4a5568"}}><Icon name="email" size={13}/></span><input type="email" value={authForm.email} onChange={e=>setAuthForm(f=>({...f,email:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleAuth()} placeholder="you@company.com" style={{...IS,paddingLeft:30}}/></div></Field>
          <Field label="Password"><div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#4a5568"}}><Icon name="lock" size={13}/></span><input type={showPass?"text":"password"} value={authForm.password} onChange={e=>setAuthForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleAuth()} placeholder="Min 6 characters" style={{...IS,paddingLeft:30,paddingRight:30}}/><span onClick={()=>setShowPass(s=>!s)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#4a5568",cursor:"pointer"}}><Icon name="eye" size={13}/></span></div></Field>
          {authErr&&<div style={{background:"#7f1d1d22",border:"1px solid #ef444444",borderRadius:7,padding:"8px 11px",color:"#f87171",fontSize:11,marginBottom:11,lineHeight:1.5}}>⚠ {authErr}</div>}
          <button onClick={handleAuth} disabled={authLoading} style={{width:"100%",padding:11,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",borderRadius:9,color:"white",fontSize:13,fontWeight:800,cursor:authLoading?"wait":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7,opacity:authLoading?0.8:1}}>
            {authLoading?<><span style={{width:12,height:12,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/> Please wait...</>:(authMode==="login"?"Login →":"Create Account →")}
          </button>
          {authMode==="register"&&<div style={{marginTop:10,padding:"8px 12px",background:"#021a14",borderRadius:7,border:"1px solid #064e3b"}}><div style={{fontSize:10,color:accent,fontWeight:700,marginBottom:2}}>👑 FIRST USER = ADMIN</div><div style={{fontSize:10,color:"#64748b",lineHeight:1.4}}>Pehla register karne wala automatically Admin banta hai.</div></div>}
          <button onClick={()=>setAppState("setup")} style={{width:"100%",marginTop:8,padding:"6px 0",background:"transparent",border:"1px solid #064e3b",borderRadius:7,color:"#64748b",cursor:"pointer",fontSize:10,fontFamily:"inherit",display:"flex",alignItems:"center",gap:4,justifyContent:"center"}}><Icon name="disconnect" size={11}/> Change Supabase Project</button>
        </div>
      </div>
    </div>
  );

  // ─── MAIN APP ────────────────────────────────────────────────────────────
  return(
    <div style={{display:"flex",minHeight:"100vh",background:"#0a1220",fontFamily:"'Syne','Segoe UI',sans-serif",color:"#e2e8f0"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#0a1220;}::-webkit-scrollbar-thumb{background:#1e2d45;border-radius:2px;}
        .ni{transition:all .2s;cursor:pointer;border-radius:9px;margin-bottom:3px;}.ni:hover{background:rgba(16,185,129,0.1)!important;}
        .rh:hover{background:rgba(16,185,129,0.04)!important;}.ib:hover{opacity:.7;}
        .sc{transition:transform .2s,box-shadow .2s;cursor:pointer;}.sc:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.4)!important;}
        @keyframes spin{to{transform:rotate(360deg);}}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .saving{animation:pulse 1s ease-in-out infinite;}
        @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
        .sk{background:linear-gradient(90deg,#1a2840 25%,#1e3050 50%,#1a2840 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;}
      `}</style>

      {/* SIDEBAR */}
      <div style={{width:228,background:"#0d1b2e",borderRight:"1px solid #1a2840",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        <div style={{padding:"15px 12px 10px"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#059669,#10b981)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon name="sql" size={15}/></div>
            <div><div style={{fontWeight:800,fontSize:13,color:"#e2e8f0"}}>DataVault Pro</div><div style={{fontSize:9,color:accent,fontWeight:700}}>SUPABASE SQL</div></div>
          </div>
        </div>
        <div style={{margin:"0 10px 8px",padding:"6px 10px",background:"#0a1220",borderRadius:7,border:"1px solid #1a2840"}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:dbStatus==="error"?"#ef4444":dbStatus==="saving"?"#f59e0b":accent,display:"inline-block"}} className={dbStatus==="saving"?"saving":""}/>
          <span style={{fontSize:9,color:dbStatus==="error"?"#ef4444":dbStatus==="saving"?"#f59e0b":accent,fontWeight:700}}>{dbStatus==="saving"?"Saving to SQL...":dbStatus==="error"?"Error":"PostgreSQL Connected"}</span></div>
        </div>
        <div style={{borderTop:"1px solid #1a2840",margin:"0 10px 8px"}}/>
        <nav style={{flex:1,padding:"0 6px",overflowY:"auto"}}>
          {navItems.map(item=>(
            <div key={item.id} className="ni" onClick={()=>{setActiveTab(item.id);setSearch("");setUserFilter("");}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",background:activeTab===item.id?"rgba(16,185,129,0.12)":"transparent",color:activeTab===item.id?"#34d399":"#64748b",border:activeTab===item.id?"1px solid rgba(16,185,129,0.25)":"1px solid transparent"}}>
              <Icon name={item.icon} size={15}/>
              <span style={{fontSize:12,fontWeight:activeTab===item.id?700:500,flex:1}}>{item.label}</span>
              {item.id==="admin"&&<span style={{fontSize:9,color:"#f59e0b",fontWeight:700,background:"#f59e0b18",padding:"1px 5px",borderRadius:7}}>ADMIN</span>}
              {modLoading[item.id]&&<span style={{width:10,height:10,borderRadius:"50%",border:`2px solid ${accent}`,borderTop:"2px solid transparent",animation:"spin .7s linear infinite",display:"inline-block",flexShrink:0}}/>}
              {!modLoading[item.id]&&data[item.id]?.length>0&&<span style={{fontSize:9,color:accent,fontWeight:700,background:"rgba(16,185,129,0.15)",padding:"1px 5px",borderRadius:7}}>{data[item.id]?.length}</span>}
            </div>
          ))}
        </nav>
        <div style={{padding:"8px",borderTop:"1px solid #1a2840"}}>
          <div style={{background:"#0a1220",borderRadius:8,padding:"8px 10px",border:"1px solid #1a2840",marginBottom:6}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:isAdmin?"linear-gradient(135deg,#059669,#10b981)":"linear-gradient(135deg,#1d4ed8,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon name={isAdmin?"crown":"user"} size={12}/></div>
              <div><div style={{fontSize:11,fontWeight:700,color:"#e2e8f0"}}>{currentUser?.name}</div><div style={{fontSize:9,color:isAdmin?accent:"#3b82f6",fontWeight:700}}>{currentUser?.role}</div></div>
            </div>
          </div>
          {[{l:"Refresh",i:"refresh",fn:()=>loadAll(sbCfg,token),c:accent},{l:"Disconnect",i:"disconnect",fn:handleDisconnect,c:"#f59e0b"},{l:"Logout",i:"logout",fn:handleLogout,c:"#ef4444"}].map(btn=>(
            <button key={btn.l} onClick={btn.fn} style={{width:"100%",display:"flex",alignItems:"center",gap:5,justifyContent:"center",padding:"5px 0",background:"transparent",border:"1px solid #1a2840",borderRadius:6,color:"#64748b",cursor:"pointer",fontSize:10,fontFamily:"inherit",marginBottom:3,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=btn.c;e.currentTarget.style.color=btn.c;}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a2840";e.currentTarget.style.color="#64748b";}}>
              <Icon name={btn.i} size={11}/> {btn.l}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",minWidth:0}}>
        <div style={{padding:"10px 20px",borderBottom:"1px solid #1a2840",background:"#0d1b2e",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10,gap:10,flexWrap:"wrap"}}>
          <div><h2 style={{margin:0,fontSize:15,fontWeight:800,color:"#e2e8f0"}}>{navItems.find(n=>n.id===activeTab)?.label}</h2><p style={{margin:0,fontSize:10,color:"#64748b",marginTop:1}}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p></div>
          {activeTab!=="dashboard"&&activeTab!=="admin"&&(
            <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
              {isAdmin&&allUsers.length>0&&<select value={userFilter} onChange={e=>setUserFilter(e.target.value)} style={{...IS,width:"auto",padding:"6px 10px",fontSize:11}}><option value="">All Users</option>{allUsers.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</select>}
              <div style={{position:"relative"}}><span style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",color:"#4a5568"}}><Icon name="search" size={12}/></span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{...IS,paddingLeft:26,padding:"6px 9px 6px 26px",width:140,fontSize:11}}/></div>
              <input ref={importRef} type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={handleImport}/>
              <TBtn icon="import" label="Import" color="#059669" outline onClick={()=>importRef.current.click()}/>
              <TBtn icon="excel"  label="Export" color="#059669" onClick={()=>{exportXLSX(activeTab,filtered(activeTab));showToast("Exported!");}}/>
              <TBtn icon="pdf"    label="PDF"    color="#dc2626" onClick={()=>printPDF(activeTab,filtered(activeTab))}/>
              <TBtn icon="add"    label="Add New" color={accent} onClick={()=>openAdd(activeTab)}/>
            </div>
          )}
        </div>

        <div style={{padding:20,flex:1}}>
          {/* ADMIN */}
          {activeTab==="admin"&&<AdminPanel cfg={sbCfg} token={token} currentUser={currentUser} showToast={showToast}/>}

          {/* DASHBOARD */}
          {activeTab==="dashboard"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"11px 15px",background:"linear-gradient(135deg,#022c22,#021a12)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:11,marginBottom:16}}>
                <Icon name="sql" size={19}/><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#d1fae5"}}>Welcome, {currentUser?.name}! 👋 — Supabase PostgreSQL Connected</div><div style={{fontSize:11,color:"#6ee7b7",marginTop:1}}>{isAdmin?"Admin: all users data visible + full management access.":"Your personal records only."}</div></div>
                {isAdmin&&<div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:16,fontWeight:800,color:accent}}>{allUsers.length}</div><div style={{fontSize:9,color:"#6ee7b7"}}>Users</div></div>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:12,marginBottom:18}}>
                {cardDef.map(card=>(
                  <div key={card.mod} className="sc" onClick={()=>setActiveTab(card.mod)} style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:12,padding:15}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div><p style={{margin:"0 0 5px",fontSize:10,color:"#64748b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px"}}>{card.label}</p>
                      {modLoading[card.mod]?<div className="sk" style={{width:32,height:24,borderRadius:4}}/>:<p style={{margin:0,fontSize:26,fontWeight:800,color:"#e2e8f0",lineHeight:1}}>{stats[card.mod].total}</p>}
                      <p style={{margin:"4px 0 0",fontSize:10,color:card.color}}>{stats[card.mod].extra} {stats[card.mod].el}</p></div>
                      <div style={{width:38,height:38,borderRadius:10,background:card.color+"22",color:card.color,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${card.color}33`,flexShrink:0}}><Icon name={card.icon} size={18}/></div>
                    </div>
                    {stats[card.mod].val!=null&&<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #1a2840"}}><p style={{margin:0,fontSize:11,color:"#94a3b8"}}>Total: <b style={{color:"#e2e8f0"}}>{fmt(stats[card.mod].val)}</b></p></div>}
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[{title:"Recent Purchase Orders",mod:"po"},{title:"Recent Invoices",mod:"invoice"}].map(s=>(
                  <div key={s.mod} style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:12,overflow:"hidden"}}>
                    <div style={{padding:"10px 14px",borderBottom:"1px solid #1a2840",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <h3 style={{margin:0,fontSize:12,fontWeight:700}}>{s.title}</h3>
                      <button onClick={()=>setActiveTab(s.mod)} style={{background:"none",border:"none",color:accent,fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>View All →</button>
                    </div>
                    {data[s.mod].slice(0,3).map(item=>(
                      <div key={item._dbId||item.id} className="rh" style={{padding:"9px 14px",borderBottom:"1px solid #0f1a2e",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>openView(s.mod,item)}>
                        <div><p style={{margin:0,fontSize:11,fontWeight:700,color:"#e2e8f0"}}>{item.id}</p><p style={{margin:0,fontSize:10,color:"#64748b"}}>{item.vendor||item.client}{isAdmin&&item.user_name&&<span style={{color:accent}}> · {item.user_name}</span>}</p></div>
                        <div style={{textAlign:"right"}}><p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"#34d399"}}>{fmt(item.amount)}</p><SB s={item.status}/></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DATA TABLE */}
          {activeTab!=="dashboard"&&activeTab!=="admin"&&(
            <div style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:12,overflow:"hidden"}}>
              {activeTab==="drawing"&&<div style={{padding:"7px 14px",background:"#0c1a2e",borderBottom:"1px solid #1a2840",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}><Icon name="cad" size={13}/><span style={{fontSize:10,color:"#93c5fd",fontWeight:700}}>CAD:</span>{["DWG","DXF","STEP","IGES","STL","OBJ","RVT","IFC"].map(t=><span key={t} style={{background:"#3b82f615",color:"#93c5fd",border:"1px solid #3b82f630",padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:700}}>{t}</span>)}<span style={{color:"#4a5568",fontSize:9}}>+ PDF, Images</span></div>}
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#0a1220"}}>{cols.map(c=><th key={c.key} style={{padding:"9px 10px",textAlign:"left",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840",whiteSpace:"nowrap"}}>{c.label}</th>)}<th style={{padding:"9px 10px",textAlign:"center",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840"}}>Files</th><th style={{padding:"9px 10px",textAlign:"center",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840"}}>Actions</th></tr></thead>
                  <tbody>
                    {modLoading[activeTab]?[1,2,3].map(i=><tr key={i} style={{borderBottom:"1px solid #0f1a2e"}}>{[...cols,{},{},{}].map((_,j)=><td key={j} style={{padding:"10px 10px"}}><div className="sk" style={{width:`${50+Math.random()*40}%`,height:10,borderRadius:3}}/></td>)}</tr>)
                    :filtered(activeTab).length===0?<tr><td colSpan={cols.length+2} style={{textAlign:"center",padding:34,color:"#4a5568",fontSize:12}}>No records found</td></tr>
                    :filtered(activeTab).map(item=>(
                      <tr key={item._dbId||item.id} className="rh" style={{borderBottom:"1px solid #0f1a2e"}}>
                        {cols.map(c=><td key={c.key} style={{padding:"9px 10px",fontSize:11,color:"#e2e8f0",whiteSpace:"nowrap",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis"}}>{c.render?c.render(item[c.key]):(item[c.key]||"—")}</td>)}
                        <td style={{padding:"9px 10px",textAlign:"center"}}>
                          {item.attachments?.length>0?<div style={{display:"flex",flexWrap:"wrap",gap:3,justifyContent:"center"}}>{item.attachments.slice(0,3).map((att,i)=>{const info=getFileInfo(att.name);return <span key={i} style={{background:info.bg||info.c+"22",color:info.c,border:`1px solid ${info.c}33`,padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:700}}>{info.l}</span>;})}{item.attachments.length>3&&<span style={{fontSize:9,color:"#64748b"}}>+{item.attachments.length-3}</span>}</div>:<span style={{fontSize:10,color:"#374151"}}>—</span>}
                        </td>
                        <td style={{padding:"9px 10px",textAlign:"center"}}>
                          <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                            {[{fn:()=>openView(activeTab,item),icon:"eye",color:"#3b82f6"},{fn:()=>openEdit(activeTab,item),icon:"edit",color:"#f59e0b",disabled:!isAdmin&&item.user_id!==currentUser.uid},{fn:()=>handleDelete(activeTab,item),icon:"delete",color:"#ef4444",disabled:!isAdmin&&item.user_id!==currentUser.uid}].map(btn=>(
                              <button key={btn.icon} className={btn.disabled?"":"ib"} onClick={btn.fn} disabled={btn.disabled} style={{width:25,height:25,background:btn.color+"18",border:`1px solid ${btn.color}30`,borderRadius:5,color:btn.disabled?"#374151":btn.color,cursor:btn.disabled?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:btn.disabled?0.4:1}}>
                                <Icon name={btn.icon} size={11}/>
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{padding:"7px 12px",borderTop:"1px solid #1a2840",color:"#64748b",fontSize:10,display:"flex",justifyContent:"space-between"}}>
                <span>{filtered(activeTab).length} of {data[activeTab].length} records</span>
                <span style={{color:dbStatus==="saving"?"#f59e0b":dbStatus==="error"?"#ef4444":accent,fontWeight:600}}>🗄️ {dbStatus==="saving"?"Saving...":"SQL Synced"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast&&<div style={{position:"fixed",bottom:18,right:18,zIndex:2000,background:toast.type==="error"?"#450a0a":"#021a14",border:`1px solid ${toast.type==="error"?"#ef4444":accent}`,color:toast.type==="error"?"#fca5a5":"#6ee7b7",padding:"10px 14px",borderRadius:9,fontSize:12,fontWeight:600,boxShadow:"0 8px 24px rgba(0,0,0,0.4)",maxWidth:320}}>
        {toast.type==="error"?"✕ ":"🗄️ "}{toast.msg}
      </div>}

      {/* VIEW MODAL */}
      {modal?.type==="view"&&(()=>{
        const item=modal.item;const mod=modal.module;
        return(
          <Modal title={`${item?.id} — Full Details`} onClose={()=>setModal(null)} full>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 28px"}}>
              <div>
                {isAdmin&&item.user_name&&<div style={{marginBottom:12,padding:"7px 11px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:7,fontSize:11,color:accent}}>👤 Created by: <b>{item.user_name}</b> on {item.created_at||"—"}</div>}
                <div style={{fontSize:10,color:accent,fontWeight:700,marginBottom:9,letterSpacing:"0.8px"}}>📋 RECORD DETAILS</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
                  {(FC[mod]||[]).filter(f=>f.type!=="textarea").map(f=>(
                    <div key={f.key} style={{padding:"6px 0",borderBottom:"1px solid #0f1a2e"}}>
                      <div style={{fontSize:9,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:2}}>{f.label}</div>
                      <div style={{fontSize:12,fontWeight:600,color:"#e2e8f0"}}>{f.key==="amount"?fmt(item[f.key]):f.key==="status"?<SB s={item[f.key]}/>:(item[f.key]||<span style={{color:"#374151"}}>—</span>)}</div>
                    </div>
                  ))}
                </div>
                {item.notes&&<div style={{marginTop:11,padding:"8px 11px",background:"#0a1220",borderRadius:7,border:"1px solid #1a2840"}}><div style={{fontSize:9,color:accent,fontWeight:700,marginBottom:3}}>📝 NOTES</div><div style={{fontSize:12,color:"#94a3b8",lineHeight:1.6}}>{item.notes}</div></div>}
              </div>
              <div>
                <div style={{fontSize:10,color:accent,fontWeight:700,marginBottom:9,letterSpacing:"0.8px"}}>📎 FILE ATTACHMENTS ({(item.attachments||[]).length})</div>
                <label style={{display:"flex",alignItems:"center",gap:7,padding:"8px 13px",background:mod==="drawing"?"#1e3a8a":"#065f46",borderRadius:8,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:9,justifyContent:"center"}}>
                  <Icon name="upload" size={13}/> Upload {mod==="drawing"?"PDF / CAD / Image":"File"}
                  <input type="file" accept={FILE_ACCEPT[mod]} multiple style={{display:"none"}} onChange={e=>handleFileUpload(e.target.files,item,mod)}/>
                </label>
                {mod==="drawing"&&<div style={{marginBottom:9,padding:"6px 9px",background:"#0c1a3a",borderRadius:6,border:"1px solid #3b82f633"}}><div style={{fontSize:9,color:"#93c5fd",fontWeight:700,marginBottom:3}}>SUPPORTED CAD FORMATS:</div><div style={{display:"flex",flexWrap:"wrap",gap:2}}>{["DWG","DXF","STEP","IGES","STL","OBJ","SAT","RVT","IFC","PDF","PNG","JPG"].map(t=>{const info=getFileInfo("f."+t.toLowerCase());return <span key={t} style={{background:info.c+"22",color:info.c,border:`1px solid ${info.c}33`,padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:700}}>{t}</span>;})}</div></div>}
                {(item.attachments||[]).length===0?<div style={{textAlign:"center",padding:"14px 0",color:"#4a5568",fontSize:12,border:"1px dashed #1a2840",borderRadius:7}}>No files attached yet</div>
                :(item.attachments||[]).map((att,idx)=>{const info=getFileInfo(att.name);return(
                  <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 11px",background:"#0a1220",borderRadius:7,border:"1px solid #1a2840",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,minWidth:0,flex:1}}>
                      <div style={{width:28,height:28,borderRadius:6,background:info.c+"22",color:info.c,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${info.c}22`,fontSize:9,fontWeight:800}}>{info.l}</div>
                      <div style={{minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{att.name}</div><div style={{fontSize:10,color:"#4a5568"}}>{fmtSz(att.size)} · {att.uploadedAt}</div></div>
                    </div>
                    <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:8}}>
                      {att.data&&info.canPreview&&<button onClick={()=>previewFile(att)} style={{width:24,height:24,background:"#1d4ed818",border:"1px solid #1d4ed830",borderRadius:5,color:"#60a5fa",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="eye" size={11}/></button>}
                      {att.data&&<a href={att.data} download={att.name} style={{width:24,height:24,background:"#05916018",border:"1px solid #05916030",borderRadius:5,color:"#22c55e",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}><Icon name="download" size={11}/></a>}
                      <button onClick={()=>handleFileDelete(item,mod,idx)} style={{width:24,height:24,background:"#dc262618",border:"1px solid #dc262630",borderRadius:5,color:"#ef4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="delete" size={11}/></button>
                    </div>
                  </div>
                );})}
              </div>
            </div>
            <div style={{display:"flex",gap:9,marginTop:13,paddingTop:12,borderTop:"1px solid #1a2840"}}>
              {(isAdmin||item.user_id===currentUser.uid)&&<button onClick={()=>{setModal(null);openEdit(mod,item);}} style={{flex:1,padding:8,background:"#f59e0b22",border:"1px solid #f59e0b44",borderRadius:7,color:"#f59e0b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,justifyContent:"center"}}><Icon name="edit" size={13}/> Edit</button>}
              <button onClick={()=>setModal(null)} style={{flex:2,padding:8,background:accent,border:"none",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Close</button>
            </div>
          </Modal>
        );
      })()}

      {/* ADD / EDIT MODAL */}
      {modal&&(modal.type==="add"||modal.type==="edit")&&(
        <Modal title={modal.type==="add"?`New ${MOD_LABEL[modal.module]} Record`:`Edit — ${modal.item?.id}`} onClose={()=>setModal(null)} wide>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
            {(FC[modal.module]||[]).map(field=>(
              <Field key={field.key} label={field.label} span={field.span}>
                {field.type==="select"?<Sel value={formData[field.key]||""} onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))}><option value="">-- Select --</option>{field.opts.map(o=><option key={o} value={o}>{o}</option>)}</Sel>
                :field.type==="textarea"?<TA rows={2} value={formData[field.key]||""} onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))} placeholder={field.ph}/>
                :<Inp type={field.type} value={formData[field.key]||""} onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))} placeholder={field.ph}/>}
              </Field>
            ))}
          </div>
          <div style={{display:"flex",gap:9,marginTop:11}}>
            <button onClick={()=>setModal(null)} style={{flex:1,padding:10,background:"transparent",border:"1px solid #2e3a50",borderRadius:7,color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
            <button onClick={handleSave} style={{flex:2,padding:10,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="sql" size={13}/> Save to PostgreSQL</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

