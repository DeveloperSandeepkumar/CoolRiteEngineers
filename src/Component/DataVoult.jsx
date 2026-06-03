  // ============================================================
  //  DataVault Pro — Drop-in Component for existing React apps
  //  Usage:  import DataVault from './DataVault'
  //          <DataVault height="calc(100vh - 60px)" />
  //  Install: npm install xlsx
  // ============================================================

  import { useState, useEffect, useRef } from "react";
  import * as XLSX from "xlsx";

  // ─── CONFIG ───────────────────────────────────────────────────────────────────
  const CFG_KEY    = "dv_sb_cfg_v1";
  const FILE_PFX   = "dv_file_";
  const MOD_TABLES = { po:"dv_po", invoice:"dv_invoice", quotation:"dv_quotation", drawing:"dv_drawing" };
  const MOD_LABEL  = { po:"Purchase Orders", invoice:"Invoices", quotation:"Quotations", drawing:"Project Drawings" };
  const MOD_PFX    = { po:"PO", invoice:"INV", quotation:"QUO", drawing:"DRW" };
  const FILE_ACCEPT = {
    po:".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx",
    invoice:".pdf,.jpg,.jpeg,.png,.doc,.docx",
    quotation:".pdf,.jpg,.jpeg,.png,.doc,.docx",
    drawing:".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.stl,.obj,.sat,.rvt,.ifc,.jpg,.jpeg,.png",
  };

  // ─── SUPABASE ─────────────────────────────────────────────────────────────────
  const sbRest = cfg => `https://${cfg.projectRef}.supabase.co/rest/v1`;
  const sbAuth = cfg => `https://${cfg.projectRef}.supabase.co/auth/v1`;
  const sbH    = (cfg,tok) => ({'apikey':cfg.anonKey,'Authorization':`Bearer ${tok||cfg.anonKey}`,'Content-Type':'application/json','Prefer':'return=representation'});

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

  const DB = {
    async list(cfg,tok,table,userId){
      let url=`${sbRest(cfg)}/${table}?order=created_at.desc`;if(userId)url+=`&user_id=eq.${userId}`;
      const r=await fetch(url,{headers:sbH(cfg,tok)});const d=await r.json();if(!r.ok)throw new Error(d.message||'List failed');return d;
    },
    async create(cfg,tok,table,obj){
      const r=await fetch(`${sbRest(cfg)}/${table}`,{method:'POST',headers:sbH(cfg,tok),body:JSON.stringify(obj)});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Create failed');return Array.isArray(d)?d[0]:d;
    },
    async update(cfg,tok,table,dbId,obj){
      const r=await fetch(`${sbRest(cfg)}/${table}?id=eq.${dbId}`,{method:'PATCH',headers:sbH(cfg,tok),body:JSON.stringify(obj)});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Update failed');return Array.isArray(d)?d[0]:d;
    },
    async remove(cfg,tok,table,dbId){
      const r=await fetch(`${sbRest(cfg)}/${table}?id=eq.${dbId}`,{method:'DELETE',headers:sbH(cfg,tok)});
      if(!r.ok){const d=await r.json();throw new Error(d.message||'Delete failed');}
    },
    async getUser(cfg,tok,uid){
      const r=await fetch(`${sbRest(cfg)}/dv_users?id=eq.${uid}`,{headers:sbH(cfg,tok)});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Get failed');return d[0]||null;
    },
    async upsertUser(cfg,tok,obj){
      const r=await fetch(`${sbRest(cfg)}/dv_users`,{method:'POST',headers:{...sbH(cfg,tok),'Prefer':'resolution=merge-duplicates,return=representation'},body:JSON.stringify(obj)});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Upsert failed');return Array.isArray(d)?d[0]:d;
    },
    async listUsers(cfg,tok){
      const r=await fetch(`${sbRest(cfg)}/dv_users?order=created_at.asc`,{headers:sbH(cfg,tok)});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'List failed');return d;
    },
    async patchUser(cfg,tok,uid,obj){
      const r=await fetch(`${sbRest(cfg)}/dv_users?id=eq.${uid}`,{method:'PATCH',headers:sbH(cfg,tok),body:JSON.stringify(obj)});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Update failed');return Array.isArray(d)?d[0]:d;
    },
  };

  function rowToRec(row){return{_dbId:row.id,id:row.record_id,user_id:row.user_id,user_name:row.user_name,attachments:[],_attMeta:row.attachments_meta||[],...(row.data||{})};}
  function recToRow(rec){const skip=new Set(['_dbId','id','user_id','user_name','attachments','_attMeta']);const data={};Object.keys(rec).forEach(k=>{if(!skip.has(k))data[k]=rec[k];});return{record_id:rec.id,user_id:rec.user_id,user_name:rec.user_name,data,attachments_meta:(rec.attachments||[]).map(({name,size,uploadedAt,ext})=>({name,size:size||0,uploadedAt:uploadedAt||'',ext:ext||(name||'').split('.').pop()}))};}

  // ─── LOCAL FILE STORAGE ───────────────────────────────────────────────────────
  const fKey=(tbl,dbId,idx)=>`${FILE_PFX}${tbl}_${dbId}_${idx}`;
  async function saveFile(tbl,dbId,idx,data){try{if(window.storage)await window.storage.set(fKey(tbl,dbId,idx),data);else localStorage.setItem(fKey(tbl,dbId,idx),data);}catch{}}
  async function loadFile(tbl,dbId,idx){try{if(window.storage){const r=await window.storage.get(fKey(tbl,dbId,idx));return r?.value||null;}else return localStorage.getItem(fKey(tbl,dbId,idx))||null;}catch{return null;}}
  async function dropFile(tbl,dbId,idx){try{if(window.storage)await window.storage.delete(fKey(tbl,dbId,idx));else localStorage.removeItem(fKey(tbl,dbId,idx));}catch{}}

  async function hydrateFiles(tbl,records){
    return await Promise.all(records.map(async rec=>{
      if(!rec._attMeta?.length)return{...rec,attachments:[]};
      const atts=await Promise.all(rec._attMeta.map(async(att,idx)=>({...att,data:await loadFile(tbl,rec._dbId,idx)})));
      return{...rec,attachments:atts};
    }));
  }

  async function loadCfg(){try{if(window.storage){const r=await window.storage.get(CFG_KEY);return r?JSON.parse(r.value):null;}else{const v=localStorage.getItem(CFG_KEY);return v?JSON.parse(v):null;}}catch{return null;}}
  async function saveCfg(cfg){try{if(window.storage)await window.storage.set(CFG_KEY,JSON.stringify(cfg));else localStorage.setItem(CFG_KEY,JSON.stringify(cfg));}catch{}}
  async function clearCfg(){try{if(window.storage)await window.storage.delete(CFG_KEY);else localStorage.removeItem(CFG_KEY);}catch{}}

  function getFileInfo(name=""){const ext=name.split('.').pop().toLowerCase();const m={pdf:{l:"PDF",c:"#ef4444",canPreview:true},dwg:{l:"DWG",c:"#3b82f6",canPreview:false},dxf:{l:"DXF",c:"#3b82f6",canPreview:false},step:{l:"STEP",c:"#8b5cf6",canPreview:false},stp:{l:"STP",c:"#8b5cf6",canPreview:false},iges:{l:"IGES",c:"#8b5cf6",canPreview:false},igs:{l:"IGS",c:"#8b5cf6",canPreview:false},stl:{l:"STL",c:"#a855f7",canPreview:false},obj:{l:"OBJ",c:"#a855f7",canPreview:false},rvt:{l:"RVT",c:"#06b6d4",canPreview:false},ifc:{l:"IFC",c:"#06b6d4",canPreview:false},jpg:{l:"IMG",c:"#22c55e",canPreview:true},jpeg:{l:"IMG",c:"#22c55e",canPreview:true},png:{l:"IMG",c:"#22c55e",canPreview:true},xlsx:{l:"XLS",c:"#059669",canPreview:false},doc:{l:"DOC",c:"#2563eb",canPreview:false},docx:{l:"DOC",c:"#2563eb",canPreview:false}};return m[ext]||{l:ext.toUpperCase()||"FILE",c:"#64748b",canPreview:false};}
  const fmt=n=>"Rs. "+Number(n||0).toLocaleString("en-US");
  const fmtSz=b=>b>1048576?`${(b/1048576).toFixed(1)} MB`:`${(b/1024).toFixed(0)} KB`;

  // ─── COLUMN & FORM CONFIG ─────────────────────────────────────────────────────
  const COL={
    po:[{key:"id",label:"PO #"},{key:"userName",label:"User"},{key:"vendor",label:"Vendor"},{key:"project",label:"Project"},{key:"date",label:"Date"},{key:"delivery_date",label:"Delivery"},{key:"amount",label:"Amount",render:v=><b style={{color:"#34d399"}}>{fmt(v)}</b>},{key:"payment_terms",label:"Payment"},{key:"status",label:"Status",render:v=><StatusBadge s={v}/>}],
    invoice:[{key:"id",label:"Invoice #"},{key:"userName",label:"User"},{key:"client",label:"Client"},{key:"description",label:"Description"},{key:"date",label:"Issue Date"},{key:"due",label:"Due Date"},{key:"amount",label:"Amount",render:v=><b style={{color:"#34d399"}}>{fmt(v)}</b>},{key:"tax",label:"Tax %"},{key:"status",label:"Status",render:v=><StatusBadge s={v}/>}],
    quotation:[{key:"id",label:"Quote #"},{key:"userName",label:"User"},{key:"client",label:"Client"},{key:"scope",label:"Scope"},{key:"date",label:"Date"},{key:"validity",label:"Valid Until"},{key:"amount",label:"Amount",render:v=><b style={{color:"#34d399"}}>{fmt(v)}</b>},{key:"status",label:"Status",render:v=><StatusBadge s={v}/>}],
    drawing:[{key:"id",label:"DRW #"},{key:"userName",label:"User"},{key:"title",label:"Title"},{key:"project",label:"Project"},{key:"type",label:"Type"},{key:"discipline",label:"Discipline"},{key:"version",label:"Ver."},{key:"revision",label:"Rev."},{key:"scale",label:"Scale"},{key:"status",label:"Status",render:v=><StatusBadge s={v}/>}],
  };
  const FC={
    po:[{key:"vendor",label:"Vendor Name",type:"text",ph:"e.g. Al-Amin Traders"},{key:"project",label:"Project",type:"text",ph:"e.g. Site A"},{key:"items",label:"Items/Description",type:"text",ph:"e.g. Steel Pipes x50"},{key:"date",label:"PO Date",type:"date"},{key:"delivery_date",label:"Expected Delivery",type:"date"},{key:"amount",label:"Amount (Rs)",type:"number",ph:"0"},{key:"payment_terms",label:"Payment Terms",type:"select",opts:["Advance 100%","Advance 50%","30 Days Net","60 Days Net","On Delivery","COD"]},{key:"contact",label:"Contact Person",type:"text",ph:"Name — Phone"},{key:"status",label:"Status",type:"select",opts:["Pending","Approved","Received","Cancelled"]},{key:"notes",label:"Notes",type:"textarea",span:true,ph:"Additional notes..."}],
    invoice:[{key:"client",label:"Client Name",type:"text",ph:"e.g. Malik Enterprises"},{key:"description",label:"Description",type:"text",ph:"e.g. Monthly Service"},{key:"date",label:"Issue Date",type:"date"},{key:"due",label:"Due Date",type:"date"},{key:"amount",label:"Amount (Rs)",type:"number",ph:"0"},{key:"tax",label:"Tax %",type:"number",ph:"17"},{key:"discount",label:"Discount %",type:"number",ph:"0"},{key:"bank",label:"Bank Account",type:"text",ph:"Bank — Account No"},{key:"contact",label:"Contact Person",type:"text",ph:"Name — Phone"},{key:"status",label:"Status",type:"select",opts:["Unpaid","Paid","Overdue","Cancelled"]},{key:"notes",label:"Notes",type:"textarea",span:true,ph:"Additional notes..."}],
    quotation:[{key:"client",label:"Client Name",type:"text",ph:"e.g. Zafar Builders"},{key:"scope",label:"Scope of Work",type:"text",ph:"e.g. Full Construction Package"},{key:"date",label:"Date",type:"date"},{key:"validity",label:"Valid Until",type:"date"},{key:"amount",label:"Amount (Rs)",type:"number",ph:"0"},{key:"tax",label:"Tax %",type:"number",ph:"17"},{key:"discount",label:"Discount %",type:"number",ph:"0"},{key:"contact",label:"Contact Person",type:"text",ph:"Name — Phone"},{key:"terms",label:"Payment Terms",type:"text",ph:"e.g. 50% advance"},{key:"status",label:"Status",type:"select",opts:["Draft","Sent","Accepted","Rejected"]},{key:"notes",label:"Notes",type:"textarea",span:true,ph:"Additional notes..."}],
    drawing:[{key:"title",label:"Drawing Title",type:"text",ph:"e.g. Foundation Plan"},{key:"project",label:"Project",type:"text",ph:"e.g. Site A"},{key:"type",label:"Drawing Type",type:"select",opts:["Structural","Electrical","Plumbing","Architectural","Civil","Mechanical","HVAC","Fire Fighting"]},{key:"discipline",label:"Discipline",type:"select",opts:["Civil","Electrical","MEP","Structural","Architectural","Mechanical","Survey"]},{key:"version",label:"Version",type:"text",ph:"e.g. v1.0"},{key:"revision",label:"Revision No.",type:"text",ph:"e.g. R0"},{key:"scale",label:"Scale",type:"text",ph:"e.g. 1:100"},{key:"size",label:"Paper Size",type:"select",opts:["A0","A1","A2","A3","A4"]},{key:"prepared_by",label:"Prepared By",type:"text",ph:"Engineer name"},{key:"checked_by",label:"Checked By",type:"text",ph:"Engineer name"},{key:"date",label:"Date",type:"date"},{key:"status",label:"Status",type:"select",opts:["Draft","Review","Approved","Superseded"]},{key:"notes",label:"Notes/Remarks",type:"textarea",span:true,ph:"Revision notes..."}],
  };

  const exportXLSX=(mod,data)=>{const rows=data.map(item=>{const r={};COL[mod].forEach(c=>{r[c.label]=item[c.key]??""});return r;});const ws=XLSX.utils.json_to_sheet(rows);ws["!cols"]=COL[mod].map(c=>({wch:Math.max(c.label.length+4,16)}));const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,MOD_LABEL[mod]);XLSX.writeFile(wb,`DataVault_${MOD_LABEL[mod].replace(/ /g,"_")}_${new Date().toISOString().slice(0,10)}.xlsx`);};
  const printPDF=(mod,data)=>{const cols=COL[mod];const rows=data.map(item=>`<tr>${cols.map(c=>`<td>${c.key==="amount"?fmt(item[c.key]):(item[c.key]||"")}</td>`).join("")}</tr>`).join("");const html=`<!DOCTYPE html><html><head><title>${MOD_LABEL[mod]}</title><style>body{font-family:Arial;padding:24px;color:#111;}h1{font-size:18px;color:#065f46;}p{color:#666;font-size:11px;margin-bottom:14px;}table{width:100%;border-collapse:collapse;font-size:11px;}th{background:#065f46;color:white;padding:7px 8px;text-align:left;font-size:9px;text-transform:uppercase;}td{padding:6px 8px;border-bottom:1px solid #e5e7eb;}tr:nth-child(even) td{background:#f0fdf4;}footer{margin-top:12px;font-size:9px;color:#999;text-align:right;}@media print{body{padding:8px;}}</style></head><body><h1>${MOD_LABEL[mod]}</h1><p>Generated: ${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} | Records: ${data.length}</p><table><thead><tr>${cols.map(c=>`<th>${c.label}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table><footer>DataVault Pro</footer><script>window.onload=()=>window.print();<\/script></body></html>`;const w=window.open("","_blank");if(w){w.document.write(html);w.document.close();}};

  // ─── MINI UI COMPONENTS ───────────────────────────────────────────────────────
  const StatusBadge=({s})=>{const m={Approved:"#22c55e",Accepted:"#22c55e",Paid:"#22c55e",Received:"#22c55e",Pending:"#f59e0b",Sent:"#3b82f6",Draft:"#6b7280",Review:"#a855f7",Unpaid:"#ef4444",Overdue:"#ef4444",Cancelled:"#ef4444",Rejected:"#ef4444",Superseded:"#6b7280"};const c=m[s]||"#6b7280";return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{s}</span>;};
  const IS={width:"100%",padding:"8px 11px",background:"#0f1624",border:"1px solid #2e3a50",borderRadius:7,color:"#e2e8f0",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
  const Inp=p=><input {...p} style={{...IS,...(p.style||{})}} onFocus={e=>e.target.style.borderColor="#10b981"} onBlur={e=>e.target.style.borderColor="#2e3a50"}/>;
  const Sel=({children,...p})=><select {...p} style={IS}>{children}</select>;
  const TA=p=><textarea {...p} style={{...IS,resize:"vertical",minHeight:56,...(p.style||{})}} onFocus={e=>e.target.style.borderColor="#10b981"} onBlur={e=>e.target.style.borderColor="#2e3a50"}/>;
  const Fld=({label,children,span})=>(<div style={{marginBottom:10,gridColumn:span?"1/-1":"auto"}}><label style={{display:"block",marginBottom:3,fontSize:10,fontWeight:700,color:"#94a3b8",letterSpacing:"0.8px",textTransform:"uppercase"}}>{label}</label>{children}</div>);
  const DvModal=({title,onClose,children,wide,full})=>(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,backdropFilter:"blur(4px)"}}>
      <div style={{background:"#1e2533",borderRadius:14,width:full?"min(860px,98vw)":wide?"min(700px,96vw)":"min(540px,94vw)",border:"1px solid #2e3a50",boxShadow:"0 24px 60px rgba(0,0,0,0.5)",overflow:"hidden",maxHeight:"92vh",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 18px",borderBottom:"1px solid #2e3a50",background:"linear-gradient(135deg,#052e16,#064e3b)",flexShrink:0}}>
          <h3 style={{margin:0,color:"#e2e8f0",fontSize:14,fontWeight:700}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:18,lineHeight:1}}>✕</button>
        </div>
        <div style={{padding:18,overflowY:"auto",flex:1}}>{children}</div>
      </div>
    </div>
  );
  const TBtn=({icon,label,color="#10b981",onClick,outline,disabled})=>(
    <button onClick={onClick} disabled={disabled} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 11px",background:outline?"transparent":color,border:outline?`1px solid ${color}`:"none",borderRadius:7,color:outline?color:"white",fontSize:12,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",whiteSpace:"nowrap",opacity:disabled?0.5:1}}>
      {icon} {label}
    </button>
  );

  // ─── SQL SETUP SCRIPT ─────────────────────────────────────────────────────────
  const SQL=`CREATE TABLE IF NOT EXISTS dv_users (id text PRIMARY KEY,email text,name text,role text DEFAULT 'User',created_at text,disabled boolean DEFAULT false,created_by text);
  CREATE TABLE IF NOT EXISTS dv_po (id uuid DEFAULT gen_random_uuid() PRIMARY KEY,record_id text,user_id text,user_name text,data jsonb DEFAULT '{}',attachments_meta jsonb DEFAULT '[]',created_at timestamptz DEFAULT now());
  CREATE TABLE IF NOT EXISTS dv_invoice (id uuid DEFAULT gen_random_uuid() PRIMARY KEY,record_id text,user_id text,user_name text,data jsonb DEFAULT '{}',attachments_meta jsonb DEFAULT '[]',created_at timestamptz DEFAULT now());
  CREATE TABLE IF NOT EXISTS dv_quotation (id uuid DEFAULT gen_random_uuid() PRIMARY KEY,record_id text,user_id text,user_name text,data jsonb DEFAULT '{}',attachments_meta jsonb DEFAULT '[]',created_at timestamptz DEFAULT now());
  CREATE TABLE IF NOT EXISTS dv_drawing (id uuid DEFAULT gen_random_uuid() PRIMARY KEY,record_id text,user_id text,user_name text,data jsonb DEFAULT '{}',attachments_meta jsonb DEFAULT '[]',created_at timestamptz DEFAULT now());
  ALTER TABLE dv_users DISABLE ROW LEVEL SECURITY;
  ALTER TABLE dv_po DISABLE ROW LEVEL SECURITY;
  ALTER TABLE dv_invoice DISABLE ROW LEVEL SECURITY;
  ALTER TABLE dv_quotation DISABLE ROW LEVEL SECURITY;
  ALTER TABLE dv_drawing DISABLE ROW LEVEL SECURITY;`;

  // ─── SETUP WIZARD ─────────────────────────────────────────────────────────────
  function DvSetup({onDone}){
    const [step,setStep]=useState(1);
    const [cfg,setCfg]=useState({projectRef:"",anonKey:""});
    const [testing,setTesting]=useState(false);
    const [err,setErr]=useState("");
    const [copied,setCopied]=useState(false);
    const test=async()=>{
      if(!cfg.projectRef.trim()||!cfg.anonKey.trim()){setErr("Both fields required.");return;}
      setTesting(true);setErr("");
      try{const r=await fetch(`${sbRest(cfg)}/dv_users?limit=1`,{headers:sbH(cfg)});if(!r.ok){const d=await r.json();throw new Error(d.message||"Connection failed");}await saveCfg(cfg);onDone(cfg);}
      catch(e){setErr(`Failed: ${e.message}`);}
      finally{setTesting(false);}
    };
    const W={background:"#0a1220",minHeight:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui,sans-serif"};
    const Card={background:"#1e2533",border:"1px solid rgba(16,185,129,0.3)",borderRadius:16,width:"100%",maxWidth:520,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"};
    return(
      <div style={W}>
        <div style={Card}>
          <div style={{padding:"18px 22px",background:"linear-gradient(135deg,#052e16,#065f46)",borderBottom:"1px solid rgba(16,185,129,0.2)"}}>
            <h2 style={{margin:0,color:"#d1fae5",fontSize:15,fontWeight:700}}>🗄️ Supabase Setup — Step {step}/3</h2>
            <p style={{margin:"3px 0 10px",color:"#6ee7b7",fontSize:11}}>DataVault Pro — SQL Database</p>
            <div style={{display:"flex",gap:4}}>{[1,2,3].map(s=><div key={s} style={{height:3,flex:1,borderRadius:2,background:s<=step?"#10b981":"rgba(16,185,129,0.2)"}}/>)}</div>
          </div>
          <div style={{padding:20}}>
            {step===1&&(<div>
              <p style={{color:"#94a3b8",fontSize:12,marginBottom:12}}>Supabase SQL Editor mein yeh script run karo:</p>
              <div style={{background:"#0a1220",border:"1px solid #064e3b",borderRadius:8,padding:"10px 12px",marginBottom:12,position:"relative"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:10,color:"#10b981",fontWeight:700}}>SQL SCRIPT — Supabase → SQL Editor → New Query → Paste → RUN</span>
                  <button onClick={()=>{navigator.clipboard.writeText(SQL).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),1500);}} style={{background:"#10b98122",border:"1px solid #10b98144",borderRadius:5,color:"#10b981",fontSize:10,cursor:"pointer",padding:"2px 8px",fontFamily:"inherit"}}>{copied?"✓ Copied!":"Copy SQL"}</button>
                </div>
                <pre style={{margin:0,fontSize:9,color:"#6ee7b7",overflow:"auto",maxHeight:160,lineHeight:1.5}}>{SQL}</pre>
              </div>
              <div style={{background:"#432a0022",border:"1px solid #f59e0b33",borderRadius:7,padding:"8px 11px",marginBottom:12}}>
                <p style={{margin:0,fontSize:11,color:"#fbbf24"}}>⚠ Authentication → Providers → Email → "Confirm email" OFF → Save</p>
              </div>
              <button onClick={()=>setStep(2)} style={{width:"100%",padding:10,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",borderRadius:8,color:"white",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>SQL run ho gaya → Next</button>
            </div>)}
            {step===2&&(<div>
              <p style={{color:"#94a3b8",fontSize:12,marginBottom:12}}>Project Settings → API → Copy these values:</p>
              <Fld label="Project Reference (URL se — rifovnjhbaibhzbizpgq jaisa)">
                <Inp value={cfg.projectRef} onChange={e=>setCfg(c=>({...c,projectRef:e.target.value.trim().replace(/https?:\/\//,'').replace('.supabase.co','').replace(/\//g,'')}))} placeholder="e.g. abcdefghijklmnop"/>
              </Fld>
              <Fld label="Anon Public Key (eyJhbGci... lambi key)">
                <Inp value={cfg.anonKey} onChange={e=>setCfg(c=>({...c,anonKey:e.target.value.trim()}))} placeholder="eyJhbGciOiJIUzI1NiIs..."/>
              </Fld>
              <div style={{display:"flex",gap:9,marginTop:4}}>
                <button onClick={()=>setStep(1)} style={{flex:1,padding:9,background:"transparent",border:"1px solid #2e3a50",borderRadius:7,color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
                <button onClick={()=>setStep(3)} disabled={!cfg.projectRef||!cfg.anonKey} style={{flex:2,padding:9,background:"#10b981",border:"none",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:(!cfg.projectRef||!cfg.anonKey)?0.5:1}}>Next →</button>
              </div>
            </div>)}
            {step===3&&(<div>
              <div style={{background:"#0a1220",border:"1px solid #064e3b",borderRadius:8,padding:"10px 12px",marginBottom:12}}>
                <p style={{margin:"0 0 4px",fontSize:10,color:"#10b981",fontWeight:700}}>CONNECTING TO:</p>
                <p style={{margin:"2px 0",fontSize:12,color:"#94a3b8"}}>🗄️ <code style={{color:"#10b981"}}>{cfg.projectRef}.supabase.co</code></p>
              </div>
              {err&&<div style={{background:"#7f1d1d22",border:"1px solid #ef444444",borderRadius:7,padding:"8px 11px",color:"#f87171",fontSize:11,marginBottom:11,lineHeight:1.5}}>⚠ {err}</div>}
              <div style={{display:"flex",gap:9}}>
                <button onClick={()=>setStep(2)} style={{flex:1,padding:9,background:"transparent",border:"1px solid #2e3a50",borderRadius:7,color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
                <button onClick={test} disabled={testing} style={{flex:2,padding:9,background:"#10b981",border:"none",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:testing?"wait":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                  {testing?"⏳ Testing...":"🗄️ Connect Supabase"}
                </button>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
  function DvAuth({cfg,onLogin,onDisconnect}){
    const [mode,setMode]=useState("login");
    const [form,setForm]=useState({email:"",password:"",name:""});
    const [err,setErr]=useState("");
    const [loading,setLoading]=useState(false);
    const [showPass,setShowPass]=useState(false);

    const submit=async()=>{
      if(!form.email||!form.password){setErr("Email and password required.");return;}
      if(mode==="register"&&!form.name){setErr("Full name required.");return;}
      setLoading(true);setErr("");
      try{
        let res;
        if(mode==="login")res=await SA.signIn(cfg,form.email,form.password);
        else res=await SA.signUp(cfg,form.email,form.password);
        const uid=res.user?.id||res.id;
        const tok=res.access_token;
        let profile=await DB.getUser(cfg,tok,uid);
        if(!profile){
          const existing=await DB.listUsers(cfg,tok);
          const isFirst=existing.length===0;
          profile={id:uid,email:form.email,name:form.name||form.email.split("@")[0],role:isFirst?"Admin":"User",created_at:new Date().toLocaleDateString(),disabled:false};
          profile=await DB.upsertUser(cfg,tok,profile);
        }
        if(profile.disabled)throw new Error("Account disabled. Contact admin.");
        onLogin({...profile,uid},tok);
      }catch(e){setErr(e.message);}
      finally{setLoading(false);}
    };

    return(
      <div style={{background:"#0a1220",minHeight:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui,sans-serif"}}>
        <div style={{width:"100%",maxWidth:400,background:"#1e2533",border:"1px solid rgba(16,185,129,0.3)",borderRadius:16,padding:"28px 24px",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:32,marginBottom:6}}>🗄️</div>
            <h2 style={{margin:0,color:"#e2e8f0",fontSize:18,fontWeight:700}}>DataVault Pro</h2>
            <p style={{margin:"4px 0 0",color:"#64748b",fontSize:11}}>Powered by Supabase PostgreSQL</p>
            <p style={{margin:"3px 0 0",fontSize:9,color:"#10b981"}}>{cfg.projectRef}.supabase.co</p>
          </div>
          <div style={{display:"flex",background:"#0a1220",borderRadius:8,padding:3,marginBottom:16,border:"1px solid #1a2840"}}>
            {["login","register"].map(m=><button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"7px 0",background:mode===m?"#10b981":"transparent",border:"none",borderRadius:6,color:mode===m?"white":"#64748b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{m==="login"?"Login":"Register"}</button>)}
          </div>
          {mode==="register"&&<Fld label="Full Name"><Inp value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your full name"/></Fld>}
          <Fld label="Email"><Inp type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="you@company.com"/></Fld>
          <Fld label="Password">
            <div style={{position:"relative"}}>
              <Inp type={showPass?"text":"password"} value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Min 6 characters" style={{paddingRight:34}}/>
              <button onClick={()=>setShowPass(s=>!s)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:14}}>👁</button>
            </div>
          </Fld>
          {err&&<div style={{background:"#7f1d1d22",border:"1px solid #ef444444",borderRadius:7,padding:"8px 11px",color:"#f87171",fontSize:11,marginBottom:11}}>{err}</div>}
          <button onClick={submit} disabled={loading} style={{width:"100%",padding:11,background:"#10b981",border:"none",borderRadius:9,color:"white",fontSize:13,fontWeight:700,cursor:loading?"wait":"pointer",fontFamily:"inherit",opacity:loading?0.8:1}}>{loading?"Please wait...":mode==="login"?"Login →":"Create Account →"}</button>
          {mode==="register"&&<p style={{margin:"10px 0 0",fontSize:10,color:"#64748b",textAlign:"center"}}>👑 First registered user becomes Admin automatically</p>}
          <button onClick={onDisconnect} style={{width:"100%",marginTop:8,padding:"6px 0",background:"transparent",border:"1px solid #1a2840",borderRadius:7,color:"#4a5568",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>Change Supabase Project</button>
        </div>
      </div>
    );
  }

  // ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
  function DvAdmin({cfg,token,currentUser,showToast}){
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [nu,setNu]=useState({email:"",password:"",name:"",role:"User"});
    const [creating,setCreating]=useState(false);
    const [err,setErr]=useState("");
    useEffect(()=>{(async()=>{setLoading(true);try{setUsers(await DB.listUsers(cfg,token));}catch(e){showToast(e.message,"error");}finally{setLoading(false);}})();},[]);
    const create=async()=>{
      if(!nu.email||!nu.password||!nu.name){setErr("All fields required.");return;}
      if(nu.password.length<6){setErr("Password min 6 chars.");return;}
      setCreating(true);setErr("");
      try{
        const res=await SA.signUp(cfg,nu.email,nu.password);
        const p={id:res.user?.id||res.id,email:nu.email,name:nu.name,role:nu.role,created_at:new Date().toLocaleDateString(),disabled:false,created_by:currentUser.name};
        const saved=await DB.upsertUser(cfg,token,p);
        setUsers(u=>[...u,saved]);setNu({email:"",password:"",name:"",role:"User"});
        showToast(`"${nu.name}" created! ✓`);
      }catch(e){setErr(e.message);}finally{setCreating(false);}
    };
    const toggle=async u=>{try{const up=await DB.patchUser(cfg,token,u.id,{disabled:!u.disabled});setUsers(l=>l.map(x=>x.id===u.id?up:x));showToast(`${u.name} ${up.disabled?"disabled":"enabled"}.`,up.disabled?"error":"success");}catch(e){showToast(e.message,"error");}};
    const changeRole=async(u,role)=>{try{const up=await DB.patchUser(cfg,token,u.id,{role});setUsers(l=>l.map(x=>x.id===u.id?up:x));showToast(`${u.name} → ${role}`);}catch(e){showToast(e.message,"error");}};
    return(
      <div style={{padding:16}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
          {[{l:"Total",v:users.length,c:"#10b981"},{l:"Active",v:users.filter(u=>!u.disabled).length,c:"#22c55e"},{l:"Admins",v:users.filter(u=>u.role==="Admin").length,c:"#3b82f6"}].map(s=>(
            <div key={s.l} style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:"#64748b",marginTop:1}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:10,padding:14,marginBottom:16}}>
          <h3 style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#e2e8f0"}}>➕ Create New User</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}>
            <Fld label="Full Name"><Inp value={nu.name} onChange={e=>setNu(u=>({...u,name:e.target.value}))} placeholder="Ahmad Khan"/></Fld>
            <Fld label="Email"><Inp type="email" value={nu.email} onChange={e=>setNu(u=>({...u,email:e.target.value}))} placeholder="user@company.com"/></Fld>
            <Fld label="Password"><Inp type="password" value={nu.password} onChange={e=>setNu(u=>({...u,password:e.target.value}))} placeholder="Min 6 characters"/></Fld>
            <Fld label="Role"><Sel value={nu.role} onChange={e=>setNu(u=>({...u,role:e.target.value}))}><option value="User">User</option><option value="Admin">Admin</option></Sel></Fld>
          </div>
          {err&&<div style={{color:"#f87171",fontSize:11,marginBottom:8,padding:"6px 10px",background:"#7f1d1d22",borderRadius:6}}>{err}</div>}
          <button onClick={create} disabled={creating} style={{padding:"7px 14px",background:"#10b981",border:"none",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:creating?"wait":"pointer",fontFamily:"inherit",opacity:creating?0.7:1}}>{creating?"Creating...":"Create User"}</button>
        </div>
        <div style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:10,overflow:"hidden"}}>
          <div style={{padding:"10px 14px",borderBottom:"1px solid #1a2840",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h3 style={{margin:0,fontSize:12,fontWeight:700,color:"#e2e8f0"}}>👥 All Users ({users.length})</h3>
          </div>
          {loading?<div style={{padding:24,textAlign:"center",color:"#64748b",fontSize:12}}>Loading...</div>:
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#0a1220"}}>{["Name","Email","Role","Status","Action"].map(h=><th key={h} style={{padding:"7px 11px",textAlign:"left",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840"}}>{h}</th>)}</tr></thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id} style={{borderBottom:"1px solid #0f1a2e"}}>
                  <td style={{padding:"9px 11px",fontSize:12,fontWeight:700,color:u.disabled?"#4a5568":"#e2e8f0"}}>{u.name}{u.id===currentUser.uid&&<span style={{fontSize:9,color:"#10b981",marginLeft:5}}>YOU</span>}</td>
                  <td style={{padding:"9px 11px",fontSize:11,color:"#64748b"}}>{u.email}</td>
                  <td style={{padding:"9px 11px"}}>
                    <select value={u.role} onChange={e=>changeRole(u,e.target.value)} disabled={u.id===currentUser.uid} style={{background:"transparent",border:"1px solid #2e3a50",borderRadius:5,color:u.role==="Admin"?"#10b981":"#94a3b8",fontSize:10,fontWeight:700,fontFamily:"inherit",padding:"2px 6px",cursor:"pointer"}}>
                      <option value="User">User</option><option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td style={{padding:"9px 11px"}}><span style={{background:u.disabled?"#7f1d1d22":"#052e1622",color:u.disabled?"#ef4444":"#22c55e",border:`1px solid ${u.disabled?"#ef444433":"#22c55e33"}`,padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700}}>{u.disabled?"Disabled":"Active"}</span></td>
                  <td style={{padding:"9px 11px"}}>{u.id!==currentUser.uid&&<button onClick={()=>toggle(u)} style={{padding:"3px 8px",background:u.disabled?"#22c55e22":"#7f1d1d22",border:`1px solid ${u.disabled?"#22c55e44":"#ef444444"}`,borderRadius:5,color:u.disabled?"#22c55e":"#ef4444",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{u.disabled?"Enable":"Disable"}</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  MAIN DATAVAULT COMPONENT
  //  Props:
  //    height  — CSS height string, default "100vh"
  //              e.g. "calc(100vh - 64px)" if you have a 64px navbar
  // ════════════════════════════════════════════════════════════════════════════
  export default function DataVault({ height = "100vh" }) {
    const [appState,setAppState]=useState("loading");
    const [sbCfg,setSbCfg]=useState(null);
    const [token,setToken]=useState(null);
    const [currentUser,setCurrentUser]=useState(null);
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
      setModLoading({po:true,invoice:true,quotation:true,drawing:true});
      if(isAdmin){try{setAllUsers(await DB.listUsers(cfg,tok));}catch{}}
      const result={};
      for(const mod of ["po","invoice","quotation","drawing"]){
        try{const rows=await DB.list(cfg,tok,MOD_TABLES[mod],isAdmin?null:uid);const recs=rows.map(rowToRec);result[mod]=await hydrateFiles(MOD_TABLES[mod],recs);}
        catch(e){result[mod]=[];showToast(`Load error (${mod}): ${e.message}`,"error");}
        setModLoading(l=>({...l,[mod]:false}));
      }
      setData(result);
    };

    const handleLogin=(user,tok)=>{setCurrentUser(user);setToken(tok);setAppState("main");loadAll(sbCfg,tok,user);};
    const handleLogout=()=>{setCurrentUser(null);setToken(null);setAppState("auth");setData({po:[],invoice:[],quotation:[],drawing:[]});setActiveTab("dashboard");};
    const handleDisconnect=async()=>{if(!window.confirm("Disconnect Supabase?"))return;await clearCfg();setSbCfg(null);setAppState("setup");handleLogout();};

    const openAdd=mod=>{setFormData({});setModal({type:"add",module:mod});};
    const openEdit=(mod,item)=>{setFormData({...item});setModal({type:"edit",module:mod,item});};
    const openView=(mod,item)=>setModal({type:"view",module:mod,item});

    const handleSave=async()=>{
      const mod=modal.module;setDB("saving");
      try{
        if(modal.type==="add"){
          const newId=`${MOD_PFX[mod]}-${String(data[mod].length+1).padStart(3,"0")}`;
          const rec={id:newId,...formData,user_id:currentUser.uid,user_name:currentUser.name,attachments:[]};
          const saved=await DB.create(sbCfg,token,MOD_TABLES[mod],recToRow(rec));
          setData(d=>({...d,[mod]:[...d[mod],{...rowToRec(saved),attachments:[]}]}));
          showToast("Saved to SQL ✓");
        }else{
          const saved=await DB.update(sbCfg,token,MOD_TABLES[mod],formData._dbId,recToRow(formData));
          setData(d=>({...d,[mod]:d[mod].map(x=>x._dbId===formData._dbId?{...rowToRec(saved),attachments:formData.attachments||[]}:x)}));
          showToast("Updated ✓");
        }
        setDB("saved");
      }catch(e){setDB("error");showToast(`Error: ${e.message}`,"error");}
      setModal(null);
    };

    const handleDelete=async(mod,item)=>{
      const isAdmin=currentUser?.role==="Admin";
      if(!isAdmin&&item.user_id!==currentUser.uid){showToast("Can only delete your own records.","error");return;}
      if(!window.confirm(`Delete ${item.id}?`))return;
      setDB("saving");
      try{await DB.remove(sbCfg,token,MOD_TABLES[mod],item._dbId);setData(d=>({...d,[mod]:d[mod].filter(x=>x._dbId!==item._dbId)}));setDB("saved");showToast("Deleted.","error");}
      catch(e){setDB("error");showToast(`Error: ${e.message}`,"error");}
    };

    const handleFileUpload=async(files,item,mod)=>{
      const accepted=FILE_ACCEPT[mod].split(",").map(e=>e.trim().replace(".",""));
      const newFiles=Array.from(files).filter(f=>accepted.includes(f.name.split(".").pop().toLowerCase()));
      if(!newFiles.length){showToast("Unsupported file type.","error");return;}
      for(const file of newFiles){
        const reader=new FileReader();
        reader.onload=async e=>{
          const att={name:file.name,size:file.size,uploadedAt:new Date().toLocaleDateString(),ext:file.name.split(".").pop().toLowerCase(),data:e.target.result};
          const newAtts=[...(item.attachments||[]),att];
          const idx=newAtts.length-1;
          await saveFile(MOD_TABLES[mod],item._dbId,idx,att.data);
          try{
            await DB.update(sbCfg,token,MOD_TABLES[mod],item._dbId,recToRow({...item,attachments:newAtts}));
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
            const rw=rows[i];const d={};Object.keys(rw).forEach(k=>{d[k.toLowerCase().replace(/ /g,"_")]=String(rw[k]||"");});
            const rowObj={record_id:`${MOD_PFX[activeTab]}-${String(data[activeTab].length+i+1).padStart(3,"0")}`,user_id:currentUser.uid,user_name:currentUser.name,data:d,attachments_meta:[]};
            try{const r=await DB.create(sbCfg,token,MOD_TABLES[activeTab],rowObj);saved.push({...rowToRec(r),attachments:[]});}catch{}
          }
          setData(d=>({...d,[activeTab]:[...d[activeTab],...saved]}));
          setDB("saved");showToast(`${saved.length} records imported! ✓`);
        }catch{showToast("Error reading Excel.","error");}
      };
      reader.readAsArrayBuffer(file);e.target.value="";
    };

    const filtered=mod=>{let rows=data[mod]||[];if(userFilter)rows=rows.filter(x=>x.user_id===userFilter);const q=search.toLowerCase();if(q)rows=rows.filter(item=>Object.values(item).some(v=>String(v).toLowerCase().includes(q)));return rows;};
    const isAdmin=currentUser?.role==="Admin";
    const cols=(COL[activeTab]||[]).filter(c=>isAdmin||c.key!=="userName");
    const stats={po:{total:data.po.length,val:data.po.reduce((a,b)=>a+(+b.amount||0),0),extra:data.po.filter(x=>x.status==="Pending").length,el:"Pending"},invoice:{total:data.invoice.length,val:data.invoice.reduce((a,b)=>a+(+b.amount||0),0),extra:data.invoice.filter(x=>x.status!=="Paid").length,el:"Unpaid"},quotation:{total:data.quotation.length,val:data.quotation.reduce((a,b)=>a+(+b.amount||0),0),extra:data.quotation.filter(x=>x.status==="Accepted").length,el:"Accepted"},drawing:{total:data.drawing.length,val:null,extra:data.drawing.filter(x=>x.status==="Approved").length,el:"Approved"}};
    const navItems=[{id:"dashboard",label:"Dashboard",emoji:"📊"},{id:"po",label:"Purchase Orders",emoji:"📦"},{id:"invoice",label:"Invoices",emoji:"🧾"},{id:"quotation",label:"Quotations",emoji:"📄"},{id:"drawing",label:"Drawings",emoji:"📐"},...(isAdmin?[{id:"admin",label:"Admin Panel",emoji:"🛡️"}]:[])];
    const cardDef=[{mod:"po",label:"Purchase Orders",emoji:"📦",color:"#3b82f6"},{mod:"invoice",label:"Invoices",emoji:"🧾",color:"#22c55e"},{mod:"quotation",label:"Quotations",emoji:"📄",color:"#f59e0b"},{mod:"drawing",label:"Drawings",emoji:"📐",color:"#a855f7"}];

    // CSS scoped to .dv-root to avoid conflicts with host app
    const styles=`
      .dv-root *{box-sizing:border-box;}
      .dv-root ::-webkit-scrollbar{width:4px;}
      .dv-root ::-webkit-scrollbar-track{background:#0a1220;}
      .dv-root ::-webkit-scrollbar-thumb{background:#1e2d45;border-radius:2px;}
      .dv-ni{transition:all .2s;cursor:pointer;border-radius:8px;margin-bottom:2px;}
      .dv-ni:hover{background:rgba(16,185,129,0.1)!important;}
      .dv-rh:hover{background:rgba(16,185,129,0.04)!important;}
      .dv-ib:hover{opacity:.7;}
      .dv-sc{transition:transform .2s,box-shadow .2s;cursor:pointer;}
      .dv-sc:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.3)!important;}
      @keyframes dv-spin{to{transform:rotate(360deg);}}
      @keyframes dv-pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
      .dv-saving{animation:dv-pulse 1s ease-in-out infinite;}
      @keyframes dv-shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
      .dv-sk{background:linear-gradient(90deg,#1a2840 25%,#1e3050 50%,#1a2840 75%);background-size:200% 100%;animation:dv-shimmer 1.5s infinite;}
    `;

    const wrapStyle={height,overflow:"hidden",display:"flex",flexDirection:"column",background:"#0a1220",fontFamily:"system-ui,'Segoe UI',sans-serif",color:"#e2e8f0",position:"relative"};

    if(appState==="setup")return(<div className="dv-root" style={wrapStyle}><style>{styles}</style><DvSetup onDone={cfg=>{setSbCfg(cfg);setAppState("auth");}}/></div>);
    if(appState==="loading")return(<div className="dv-root" style={{...wrapStyle,alignItems:"center",justifyContent:"center"}}><style>{styles}</style><div style={{textAlign:"center"}}><div style={{width:44,height:44,borderRadius:"50%",border:"3px solid #1a2840",borderTop:`3px solid ${accent}`,animation:"dv-spin .8s linear infinite",margin:"0 auto 14px"}}/><p style={{color:"#64748b",fontSize:13,margin:0}}>Loading DataVault...</p></div></div>);
    if(appState==="auth")return(<div className="dv-root" style={wrapStyle}><style>{styles}</style><DvAuth cfg={sbCfg} onLogin={handleLogin} onDisconnect={async()=>{await clearCfg();setSbCfg(null);setAppState("setup");}}/></div>);

    // ── MAIN APP ────────────────────────────────────────────────────────────────
    return(
      <div className="dv-root" style={wrapStyle}>
        <style>{styles}</style>

        {/* TOP BAR */}
        <div style={{background:"#0d1b2e",borderBottom:"1px solid #1a2840",padding:"0 16px",display:"flex",alignItems:"center",gap:0,flexShrink:0,overflowX:"auto"}}>
          {/* Branding */}
          <div style={{display:"flex",alignItems:"center",gap:7,marginRight:16,padding:"10px 0",flexShrink:0}}>
            <span style={{fontSize:16}}>🗄️</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0",lineHeight:1}}>DataVault Pro</div>
              <div style={{fontSize:9,color:accent}}>SQL</div>
            </div>
          </div>

          {/* Nav Tabs */}
          {navItems.map(item=>(
            <button key={item.id} className="dv-ni" onClick={()=>{setActiveTab(item.id);setSearch("");setUserFilter("");}} style={{display:"flex",alignItems:"center",gap:5,padding:"12px 12px",background:"transparent",border:"none",borderBottom:activeTab===item.id?`2px solid ${accent}`:"2px solid transparent",color:activeTab===item.id?accent:"#64748b",cursor:"pointer",fontSize:12,fontWeight:activeTab===item.id?700:500,fontFamily:"inherit",whiteSpace:"nowrap",borderRadius:0,marginBottom:0}}>
              <span>{item.emoji}</span> {item.label}
              {modLoading[item.id]&&<span style={{width:8,height:8,borderRadius:"50%",border:`1.5px solid ${accent}`,borderTop:"1.5px solid transparent",animation:"dv-spin .7s linear infinite",display:"inline-block"}}/>}
              {!modLoading[item.id]&&data[item.id]?.length>0&&<span style={{fontSize:9,color:accent,fontWeight:700,background:"rgba(16,185,129,0.15)",padding:"1px 5px",borderRadius:8,marginLeft:2}}>{data[item.id]?.length}</span>}
            </button>
          ))}

          {/* Spacer */}
          <div style={{flex:1}}/>

          {/* DB Status */}
          <div style={{display:"flex",alignItems:"center",gap:5,padding:"0 8px",flexShrink:0}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:dbStatus==="error"?"#ef4444":dbStatus==="saving"?"#f59e0b":accent,display:"inline-block"}} className={dbStatus==="saving"?"dv-saving":""}/>
            <span style={{fontSize:10,color:dbStatus==="saving"?"#f59e0b":accent,fontWeight:600,whiteSpace:"nowrap"}}>{dbStatus==="saving"?"Saving...":"SQL Synced"}</span>
          </div>

          {/* User & Logout */}
          <div style={{display:"flex",alignItems:"center",gap:8,paddingLeft:12,borderLeft:"1px solid #1a2840",marginLeft:8,flexShrink:0}}>
            <span style={{fontSize:11,color:"#64748b"}}>{isAdmin?"👑":"👤"} {currentUser?.name}</span>
            <button onClick={handleLogout} title="Logout" style={{background:"none",border:"1px solid #1a2840",borderRadius:6,color:"#64748b",cursor:"pointer",padding:"4px 8px",fontSize:10,fontFamily:"inherit"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#ef4444";e.currentTarget.style.color="#ef4444";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a2840";e.currentTarget.style.color="#64748b";}}>Logout</button>
          </div>
        </div>

        {/* TOOLBAR for data modules */}
        {activeTab!=="dashboard"&&activeTab!=="admin"&&(
          <div style={{background:"#0d1b2e",borderBottom:"1px solid #1a2840",padding:"8px 16px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",flexShrink:0}}>
            {isAdmin&&allUsers.length>0&&<select value={userFilter} onChange={e=>setUserFilter(e.target.value)} style={{...IS,width:"auto",padding:"5px 8px",fontSize:11,height:30}}><option value="">All Users</option>{allUsers.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</select>}
            <div style={{position:"relative"}}><span style={{position:"absolute",left:7,top:"50%",transform:"translateY(-50%)",fontSize:12}}>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{...IS,paddingLeft:24,padding:"5px 8px 5px 24px",width:150,fontSize:11}}/></div>
            <input ref={importRef} type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={handleImport}/>
            <TBtn icon="📥" label="Import" color="#059669" outline onClick={()=>importRef.current.click()}/>
            <TBtn icon="📤" label="Excel" color="#059669" onClick={()=>{exportXLSX(activeTab,filtered(activeTab));showToast("Exported!");}}/>
            <TBtn icon="🖨️" label="PDF" color="#dc2626" onClick={()=>printPDF(activeTab,filtered(activeTab))}/>
            <TBtn icon="➕" label="Add New" color={accent} onClick={()=>openAdd(activeTab)}/>
          </div>
        )}

        {/* CONTENT */}
        <div style={{flex:1,overflowY:"auto",padding:16}}>

          {/* ADMIN */}
          {activeTab==="admin"&&<DvAdmin cfg={sbCfg} token={token} currentUser={currentUser} showToast={showToast}/>}

          {/* DASHBOARD */}
          {activeTab==="dashboard"&&(
            <div>
              <div style={{padding:"10px 14px",background:"linear-gradient(135deg,#022c22,#021a12)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:10,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:16}}>👋</span>
                <div><div style={{fontSize:12,fontWeight:700,color:"#d1fae5"}}>Welcome, {currentUser?.name}!</div><div style={{fontSize:11,color:"#6ee7b7",marginTop:1}}>{isAdmin?"Admin — all users data + management access.":"Your personal records only."}</div></div>
                {isAdmin&&<div style={{marginLeft:"auto",textAlign:"center",flexShrink:0}}><div style={{fontSize:18,fontWeight:800,color:accent}}>{allUsers.length}</div><div style={{fontSize:9,color:"#6ee7b7"}}>Users</div></div>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:10,marginBottom:14}}>
                {cardDef.map(card=>(
                  <div key={card.mod} className="dv-sc" onClick={()=>setActiveTab(card.mod)} style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:10,padding:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div><p style={{margin:"0 0 4px",fontSize:10,color:"#64748b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px"}}>{card.emoji} {card.label}</p>
                      {modLoading[card.mod]?<div className="dv-sk" style={{width:30,height:22,borderRadius:3}}/>:<p style={{margin:0,fontSize:24,fontWeight:800,color:"#e2e8f0",lineHeight:1}}>{stats[card.mod].total}</p>}
                      <p style={{margin:"4px 0 0",fontSize:10,color:card.color}}>{stats[card.mod].extra} {stats[card.mod].el}</p></div>
                    </div>
                    {stats[card.mod].val!=null&&<div style={{marginTop:9,paddingTop:9,borderTop:"1px solid #1a2840"}}><p style={{margin:0,fontSize:11,color:"#94a3b8"}}>Total: <b style={{color:"#e2e8f0"}}>{fmt(stats[card.mod].val)}</b></p></div>}
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[{title:"Recent POs",mod:"po"},{title:"Recent Invoices",mod:"invoice"}].map(s=>(
                  <div key={s.mod} style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:10,overflow:"hidden"}}>
                    <div style={{padding:"9px 13px",borderBottom:"1px solid #1a2840",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <h3 style={{margin:0,fontSize:12,fontWeight:700}}>{s.title}</h3>
                      <button onClick={()=>setActiveTab(s.mod)} style={{background:"none",border:"none",color:accent,fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>View All →</button>
                    </div>
                    {data[s.mod].slice(0,3).map(item=>(
                      <div key={item._dbId||item.id} className="dv-rh" style={{padding:"8px 13px",borderBottom:"1px solid #0f1a2e",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>openView(s.mod,item)}>
                        <div><p style={{margin:0,fontSize:11,fontWeight:700,color:"#e2e8f0"}}>{item.id}</p><p style={{margin:0,fontSize:10,color:"#64748b"}}>{item.vendor||item.client}{isAdmin&&item.user_name&&<span style={{color:accent}}> · {item.user_name}</span>}</p></div>
                        <div style={{textAlign:"right"}}><p style={{margin:"0 0 2px",fontSize:11,fontWeight:700,color:"#34d399"}}>{fmt(item.amount)}</p><StatusBadge s={item.status}/></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DATA TABLE */}
          {activeTab!=="dashboard"&&activeTab!=="admin"&&(
            <div style={{background:"#0d1b2e",border:"1px solid #1a2840",borderRadius:10,overflow:"hidden"}}>
              {activeTab==="drawing"&&<div style={{padding:"6px 13px",background:"#0c1a2e",borderBottom:"1px solid #1a2840",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}><span style={{fontSize:11,color:"#93c5fd",fontWeight:700}}>📐 CAD:</span>{["DWG","DXF","STEP","IGES","STL","OBJ","RVT","IFC"].map(t=><span key={t} style={{background:"#3b82f615",color:"#93c5fd",border:"1px solid #3b82f630",padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:700}}>{t}</span>)}<span style={{color:"#4a5568",fontSize:9}}>+ PDF, Images</span></div>}
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#0a1220"}}>{cols.map(c=><th key={c.key} style={{padding:"8px 10px",textAlign:"left",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840",whiteSpace:"nowrap"}}>{c.label}</th>)}<th style={{padding:"8px 10px",textAlign:"center",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840"}}>Files</th><th style={{padding:"8px 10px",textAlign:"center",fontSize:9,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.8px",borderBottom:"1px solid #1a2840"}}>Actions</th></tr></thead>
                  <tbody>
                    {modLoading[activeTab]?[1,2,3].map(i=><tr key={i} style={{borderBottom:"1px solid #0f1a2e"}}>{[...cols,{},{},{}].map((_,j)=><td key={j} style={{padding:"9px 10px"}}><div className="dv-sk" style={{width:`${50+Math.random()*40}%`,height:9,borderRadius:3}}/></td>)}</tr>)
                    :filtered(activeTab).length===0?<tr><td colSpan={cols.length+2} style={{textAlign:"center",padding:32,color:"#4a5568",fontSize:12}}>No records found</td></tr>
                    :filtered(activeTab).map(item=>(
                      <tr key={item._dbId||item.id} className="dv-rh" style={{borderBottom:"1px solid #0f1a2e"}}>
                        {cols.map(c=><td key={c.key} style={{padding:"8px 10px",fontSize:11,color:"#e2e8f0",whiteSpace:"nowrap",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis"}}>{c.render?c.render(item[c.key]):(item[c.key]||"—")}</td>)}
                        <td style={{padding:"8px 10px",textAlign:"center"}}>
                          {item.attachments?.length>0?<div style={{display:"flex",flexWrap:"wrap",gap:2,justifyContent:"center"}}>{item.attachments.slice(0,3).map((att,i)=>{const info=getFileInfo(att.name);return <span key={i} style={{background:info.c+"22",color:info.c,border:`1px solid ${info.c}33`,padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:700}}>{info.l}</span>;})}
                          {item.attachments.length>3&&<span style={{fontSize:9,color:"#64748b"}}>+{item.attachments.length-3}</span>}</div>:<span style={{fontSize:10,color:"#374151"}}>—</span>}
                        </td>
                        <td style={{padding:"8px 10px",textAlign:"center"}}>
                          <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                            {[{fn:()=>openView(activeTab,item),label:"👁",color:"#3b82f6",title:"View"},{fn:()=>openEdit(activeTab,item),label:"✏️",color:"#f59e0b",title:"Edit",dis:!isAdmin&&item.user_id!==currentUser.uid},{fn:()=>handleDelete(activeTab,item),label:"🗑",color:"#ef4444",title:"Delete",dis:!isAdmin&&item.user_id!==currentUser.uid}].map(btn=>(
                              <button key={btn.title} title={btn.title} className={btn.dis?"":"dv-ib"} onClick={btn.fn} disabled={btn.dis} style={{width:26,height:26,background:btn.color+"18",border:`1px solid ${btn.color}30`,borderRadius:5,color:btn.dis?"#374151":btn.color,cursor:btn.dis?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,opacity:btn.dis?0.4:1}}>
                                {btn.label}
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
                <span style={{color:dbStatus==="saving"?"#f59e0b":accent,fontWeight:600}}>🗄️ {dbStatus==="saving"?"Saving...":"Synced"}</span>
              </div>
            </div>
          )}
        </div>

        {/* TOAST */}
        {toast&&<div style={{position:"absolute",bottom:16,right:16,zIndex:9999,background:toast.type==="error"?"#450a0a":"#021a14",border:`1px solid ${toast.type==="error"?"#ef4444":accent}`,color:toast.type==="error"?"#fca5a5":"#6ee7b7",padding:"9px 13px",borderRadius:8,fontSize:12,fontWeight:600,boxShadow:"0 8px 24px rgba(0,0,0,0.4)",maxWidth:300}}>
          {toast.type==="error"?"✕ ":"🗄️ "}{toast.msg}
        </div>}

        {/* VIEW MODAL */}
        {modal?.type==="view"&&(()=>{
          const item=modal.item;const mod=modal.module;
          return(
            <DvModal title={`${item?.id} — Details`} onClose={()=>setModal(null)} full>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 24px"}}>
                <div>
                  {isAdmin&&item.user_name&&<div style={{marginBottom:11,padding:"6px 10px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:6,fontSize:11,color:accent}}>👤 By: <b>{item.user_name}</b></div>}
                  <div style={{fontSize:10,color:accent,fontWeight:700,marginBottom:8}}>📋 RECORD DETAILS</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}>
                    {(FC[mod]||[]).filter(f=>f.type!=="textarea").map(f=>(
                      <div key={f.key} style={{padding:"5px 0",borderBottom:"1px solid #0f1a2e"}}>
                        <div style={{fontSize:9,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:1}}>{f.label}</div>
                        <div style={{fontSize:12,fontWeight:600,color:"#e2e8f0"}}>{f.key==="amount"?fmt(item[f.key]):f.key==="status"?<StatusBadge s={item[f.key]}/>:(item[f.key]||<span style={{color:"#374151"}}>—</span>)}</div>
                      </div>
                    ))}
                  </div>
                  {item.notes&&<div style={{marginTop:10,padding:"8px 10px",background:"#0a1220",borderRadius:6,border:"1px solid #1a2840"}}><div style={{fontSize:9,color:accent,fontWeight:700,marginBottom:2}}>📝 NOTES</div><div style={{fontSize:12,color:"#94a3b8",lineHeight:1.5}}>{item.notes}</div></div>}
                </div>
                <div>
                  <div style={{fontSize:10,color:accent,fontWeight:700,marginBottom:8}}>📎 ATTACHMENTS ({(item.attachments||[]).length})</div>
                  <label style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:mod==="drawing"?"#1e3a8a":"#065f46",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:8,justifyContent:"center"}}>
                    📎 Upload {mod==="drawing"?"PDF / CAD / Image":"File"}
                    <input type="file" accept={FILE_ACCEPT[mod]} multiple style={{display:"none"}} onChange={e=>handleFileUpload(e.target.files,item,mod)}/>
                  </label>
                  {(item.attachments||[]).length===0?<div style={{textAlign:"center",padding:"12px 0",color:"#4a5568",fontSize:12,border:"1px dashed #1a2840",borderRadius:6}}>No files attached yet</div>
                  :(item.attachments||[]).map((att,idx)=>{const info=getFileInfo(att.name);return(
                    <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"#0a1220",borderRadius:6,border:"1px solid #1a2840",marginBottom:5}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0,flex:1}}>
                        <span style={{background:info.c+"22",color:info.c,border:`1px solid ${info.c}22`,padding:"2px 6px",borderRadius:4,fontSize:9,fontWeight:800,flexShrink:0}}>{info.l}</span>
                        <div style={{minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{att.name}</div><div style={{fontSize:10,color:"#4a5568"}}>{fmtSz(att.size)} · {att.uploadedAt}</div></div>
                      </div>
                      <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:6}}>
                        {att.data&&info.canPreview&&<button onClick={()=>previewFile(att)} style={{width:24,height:24,background:"#1d4ed818",border:"1px solid #1d4ed830",borderRadius:4,color:"#60a5fa",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>👁</button>}
                        {att.data&&<a href={att.data} download={att.name} style={{width:24,height:24,background:"#05916018",border:"1px solid #05916030",borderRadius:4,color:"#22c55e",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",fontSize:11}}>⬇</a>}
                        <button onClick={()=>handleFileDelete(item,mod,idx)} style={{width:24,height:24,background:"#dc262618",border:"1px solid #dc262630",borderRadius:4,color:"#ef4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>✕</button>
                      </div>
                    </div>
                  );})}
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:12,paddingTop:11,borderTop:"1px solid #1a2840"}}>
                {(isAdmin||item.user_id===currentUser.uid)&&<button onClick={()=>{setModal(null);openEdit(mod,item);}} style={{flex:1,padding:8,background:"#f59e0b22",border:"1px solid #f59e0b44",borderRadius:6,color:"#f59e0b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✏️ Edit</button>}
                <button onClick={()=>setModal(null)} style={{flex:2,padding:8,background:accent,border:"none",borderRadius:6,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Close</button>
              </div>
            </DvModal>
          );
        })()}

        {/* ADD / EDIT MODAL */}
        {modal&&(modal.type==="add"||modal.type==="edit")&&(
          <DvModal title={modal.type==="add"?`New ${MOD_LABEL[modal.module]} Record`:`Edit — ${modal.item?.id}`} onClose={()=>setModal(null)} wide>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
              {(FC[modal.module]||[]).map(field=>(
                <Fld key={field.key} label={field.label} span={field.span}>
                  {field.type==="select"?<Sel value={formData[field.key]||""} onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))}><option value="">-- Select --</option>{field.opts.map(o=><option key={o} value={o}>{o}</option>)}</Sel>
                  :field.type==="textarea"?<TA rows={2} value={formData[field.key]||""} onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))} placeholder={field.ph}/>
                  :<Inp type={field.type} value={formData[field.key]||""} onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))} placeholder={field.ph}/>}
                </Fld>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button onClick={()=>setModal(null)} style={{flex:1,padding:9,background:"transparent",border:"1px solid #2e3a50",borderRadius:7,color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              <button onClick={handleSave} style={{flex:2,padding:9,background:"#10b981",border:"none",borderRadius:7,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🗄️ Save to SQL</button>
            </div>
          </DvModal>
        )}
      </div>
    );
  }
