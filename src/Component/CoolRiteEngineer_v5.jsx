import { useState, useEffect, useRef, useCallback } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#030810;--panel:#070f1c;--card:#0a1828;--card2:#0d1f30;
  --border:rgba(0,200,255,0.1);--ice:#00c8ff;--warm:#ff6b2b;
  --green:#00e87a;--yellow:#ffd060;--purple:#a78bfa;
  --muted:#3d6070;--text:#c8e0f0;--white:#eef6ff;
}


body{font-family:'Syne',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:0 20px;height:56px;
  background:rgba(3,8,16,0.97);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;}
.logo{display:flex;align-items:center;gap:9px;}
.lbox{width:32px;height:32px;background:linear-gradient(135deg,#00c8ff,#004499);border-radius:7px;
  display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue';font-size:14px;color:#fff;
  box-shadow:0 0 16px rgba(0,200,255,0.35);}
.lname{font-family:'Bebas Neue';font-size:18px;letter-spacing:2px;color:var(--white);}
.lname span{color:var(--ice);}
.pills{display:flex;gap:7px;}
.pill{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  padding:3px 10px;border-radius:20px;border:1px solid;}
.pill.b{color:var(--ice);border-color:rgba(0,200,255,0.25);background:rgba(0,200,255,0.07);}
.pill.g{color:var(--green);border-color:rgba(0,232,122,0.25);background:rgba(0,232,122,0.07);}
.pill.w{color:var(--warm);border-color:rgba(255,107,43,0.25);background:rgba(255,107,43,0.07);}
.layout{display:grid;grid-template-columns:300px 1fr;min-height:calc(100vh - 56px);}
.lpanel{background:var(--panel);border-right:1px solid var(--border);overflow-y:auto;
  max-height:calc(100vh - 56px);position:sticky;top:56px;}
.rpanel{overflow-y:auto;max-height:calc(100vh - 56px);}
.navbar{ display: none;}

    .top-header-wrapper {
    display: none !important;}
    .footer{display: none;}
    .contact-buttons {display:none;}
/* EQUIPMENT SELECT */
.eqsec{padding:14px;border-bottom:1px solid var(--border);}
.eqlbl{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:5px;}
.eqsel{width:100%;background:rgba(0,200,255,0.05);border:1.5px solid rgba(0,200,255,0.2);
  border-radius:8px;padding:9px 12px;color:var(--white);font-family:'Syne';font-size:12.5px;
  font-weight:600;outline:none;cursor:pointer;margin-bottom:7px;transition:border-color 0.2s;}
.eqsel:focus{border-color:var(--ice);}
.eqsel option{background:#070f1c;}
.eqdesc{padding:9px 11px;background:rgba(0,200,255,0.04);border-radius:7px;
  font-size:11px;color:var(--muted);line-height:1.5;border:1px solid var(--border);}
.eqname{font-size:12.5px;font-weight:700;color:var(--white);margin-bottom:3px;}
.eqstd{font-size:9.5px;color:var(--ice);margin-top:5px;opacity:0.8;}

/* FORM */
.farea{padding:12px;}
.sec{margin-bottom:12px;}
.shead{display:flex;align-items:center;gap:7px;padding:8px 11px;background:var(--card);
  border:1px solid var(--border);border-radius:7px;cursor:pointer;transition:border-color 0.2s;}
.shead:hover{border-color:rgba(0,200,255,0.25);}
.shead.on{border-color:rgba(0,200,255,0.3);border-bottom-color:transparent;border-radius:7px 7px 0 0;}
.stitle{font-size:11.5px;font-weight:700;color:var(--white);flex:1;}
.sarr{font-size:9px;color:var(--muted);transition:transform 0.2s;}
.sarr.on{transform:rotate(180deg);}
.sbody{background:var(--card2);border:1px solid rgba(0,200,255,0.18);border-top:none;
  border-radius:0 0 7px 7px;padding:11px;display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sbody.c1{grid-template-columns:1fr;}
.sbody.c3{grid-template-columns:1fr 1fr 1fr;}
.f{display:flex;flex-direction:column;gap:4px;}
.f.s2{grid-column:1/-1;}
.f label{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);}
.f input,.f select,.f textarea{background:rgba(0,0,0,0.35);border:1px solid rgba(0,200,255,0.12);
  border-radius:6px;padding:6px 8px;color:var(--white);font-family:'JetBrains Mono';
  font-size:11.5px;outline:none;transition:border 0.2s;}
.f input:focus,.f select:focus,.f textarea:focus{border-color:rgba(0,200,255,0.4);}
.f select option{background:#070f1c;}
.f textarea{resize:vertical;min-height:54px;}
.frow{display:flex;}
.frow input{border-radius:6px 0 0 6px;flex:1;}
.funit{background:rgba(0,200,255,0.08);border:1px solid rgba(0,200,255,0.15);border-left:none;
  border-radius:0 6px 6px 0;padding:6px 7px;font-size:9.5px;font-weight:700;
  color:var(--ice);white-space:nowrap;display:flex;align-items:center;}
.rrow{display:flex;gap:6px;flex-wrap:wrap;}
.ropt{flex:1;min-width:48px;padding:5px 4px;background:rgba(0,0,0,0.35);
  border:1px solid rgba(0,200,255,0.12);border-radius:6px;cursor:pointer;
  text-align:center;font-size:11px;font-weight:600;color:var(--muted);transition:all 0.18s;}
.ropt.on{background:rgba(0,200,255,0.12);border-color:rgba(0,200,255,0.35);color:var(--ice);}

/* ACTIONS */
.abar{padding:11px;border-top:1px solid var(--border);position:sticky;bottom:0;background:var(--panel);}
.bcalc{width:100%;background:linear-gradient(135deg,#00c8ff,#0066bb);color:#fff;border:none;
  padding:11px;border-radius:7px;font-family:'Syne';font-size:13px;font-weight:700;cursor:pointer;
  letter-spacing:0.5px;box-shadow:0 4px 16px rgba(0,200,255,0.25);transition:all 0.2s;margin-bottom:7px;}
.bcalc:hover{box-shadow:0 6px 24px rgba(0,200,255,0.45);transform:translateY(-1px);}
.brow{display:flex;gap:7px;}
.bex{flex:1;padding:8px;border-radius:6px;font-family:'Syne';font-size:10.5px;font-weight:700;
  cursor:pointer;letter-spacing:0.5px;border:1px solid;transition:all 0.2s;}
.bex.p{color:var(--warm);border-color:rgba(255,107,43,0.3);background:rgba(255,107,43,0.07);}
.bex.d{color:var(--green);border-color:rgba(0,232,122,0.3);background:rgba(0,232,122,0.07);}
.bex.r{color:var(--muted);border-color:rgba(255,255,255,0.1);background:transparent;}
.bex:hover{filter:brightness(1.3);}

/* TABS */
.tabs{display:flex;border-bottom:1px solid var(--border);background:var(--panel);position:sticky;top:0;z-index:10;}
.tab{padding:13px 18px;font-size:11.5px;font-weight:700;cursor:pointer;
  color:var(--muted);border-bottom:2px solid transparent;transition:all 0.18s;}
.tab.on{color:var(--ice);border-color:var(--ice);}
.tab:hover:not(.on){color:var(--text);}
.rcont{padding:20px;}

/* RESULTS */
.rhdr{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
.rtag{font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  padding:3px 10px;border-radius:20px;border:1px solid;}
.rhdr h2{font-family:'Bebas Neue';font-size:24px;letter-spacing:2px;color:var(--white);}
.kgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:9px;margin-bottom:16px;}
.kcard{background:var(--card);border:1px solid var(--border);border-radius:9px;padding:12px 10px;text-align:center;}
.kval{font-family:'JetBrains Mono';font-size:19px;font-weight:600;line-height:1;}
.kunit{font-size:9.5px;color:var(--muted);margin-top:2px;}
.klbl{font-size:9px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--muted);margin-top:5px;}
.ctbl{width:100%;border-collapse:collapse;margin-bottom:12px;}
.ctbl th{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--muted);padding:6px 10px;border-bottom:1px solid var(--border);text-align:left;}
.ctbl td{font-size:12px;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.03);}
.ctbl td.v{font-family:'JetBrains Mono';color:var(--ice);}
.ctbl td.s{font-size:10px;color:var(--muted);}
.ctbl tr.tot td{background:rgba(0,200,255,0.05);color:var(--white);font-weight:700;}
.stitle{font-family:'Bebas Neue';font-size:15px;letter-spacing:2px;color:var(--ice);
  margin:16px 0 9px;padding-bottom:5px;border-bottom:1px solid var(--border);}
.dgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px;}
.drow{display:flex;justify-content:space-between;align-items:center;
  padding:6px 10px;background:var(--card);border-radius:6px;border:1px solid var(--border);}
.dkey{font-size:11px;color:var(--muted);}
.dval{font-family:'JetBrains Mono';font-size:11.5px;color:var(--white);font-weight:500;}
.note{padding:9px 12px;border-radius:7px;font-size:11px;line-height:1.6;margin-bottom:9px;}
.note.g{background:rgba(0,232,122,0.06);border:1px solid rgba(0,232,122,0.2);color:#80e8a8;}
.note.w{background:rgba(255,107,43,0.06);border:1px solid rgba(255,107,43,0.2);color:#ffb080;}
.note.b{background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.18);color:#80d8ff;}

/* 3D CANVAS */
.cwrap{position:relative;width:100%;height:540px;background:var(--bg);
  border-radius:11px;overflow:hidden;border:1px solid var(--border);}
canvas{width:100%!important;height:100%!important;display:block;}
.otl{position:absolute;top:11px;left:11px;}
.otr{position:absolute;top:11px;right:11px;display:flex;flex-direction:column;gap:5px;}
.obl{position:absolute;bottom:11px;left:11px;}
.obr{position:absolute;bottom:11px;right:11px;max-height:190px;overflow-y:auto;}
.cpanel{background:rgba(3,8,16,0.83);backdrop-filter:blur(12px);
  border:1px solid var(--border);border-radius:8px;padding:8px 12px;}
.cpanel h3{font-family:'Bebas Neue';font-size:15px;letter-spacing:2px;color:var(--white);}
.cpanel p{font-size:9.5px;color:var(--muted);margin-top:1px;}
.vbtn{background:rgba(3,8,16,0.85);backdrop-filter:blur(10px);border:1px solid var(--border);
  color:var(--text);padding:6px 11px;border-radius:6px;cursor:pointer;font-size:10.5px;
  font-weight:700;font-family:'Syne';transition:all 0.18s;}
.vbtn:hover,.vbtn.on{border-color:var(--ice);color:var(--ice);background:rgba(0,200,255,0.1);}
.lrow{display:flex;align-items:center;gap:6px;font-size:9.5px;color:var(--muted);margin-bottom:4px;}
.lsq{width:10px;height:10px;border-radius:3px;flex-shrink:0;}
.hint{font-size:9.5px;color:var(--muted);margin-bottom:2px;}
.hint b{color:var(--ice);}

/* EMPTY */
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 30px;text-align:center;color:var(--muted);}
.empty .ico{font-size:48px;margin-bottom:12px;opacity:0.4;}
.empty h3{font-family:'Bebas Neue';font-size:20px;letter-spacing:2px;color:var(--text);margin-bottom:5px;}
.empty p{font-size:12px;line-height:1.6;max-width:280px;}

/* MISC */
.lbar{height:2px;background:linear-gradient(90deg,var(--ice),#0077cc);animation:lda 0.8s ease;}
@keyframes lda{from{transform:scaleX(0)transform-origin:left;}to{transform:scaleX(1);}}
.toast{position:fixed;bottom:20px;right:20px;background:var(--ice);color:#030810;
  padding:9px 16px;border-radius:7px;font-size:12px;font-weight:700;z-index:999;}
@media(max-width:750px){.layout{grid-template-columns:1fr;}.lpanel{position:relative;max-height:none;}.rpanel{max-height:none;}}
`;

/* ─── EQUIPMENT CONFIG ─────────────────────────────────────────────── */
const EQLIST = [
  {id:"ahu_draw",  grp:"AHU", icon:"🔵", color:"#00c8ff", name:"Draw-Through AHU",     short:"DTF",  desc:"Fan draws air through coil & filters. Standard commercial AHU.", std:"ASHRAE 62.1 · ASHRAE 90.1 · NBC 2016"},
  {id:"ahu_blow",  grp:"AHU", icon:"🟣", color:"#a78bfa", name:"Blow-Through AHU",      short:"BTF",  desc:"Fan pushes air through coil. Hospital & cleanroom use.", std:"ASHRAE 62.1 · EN 13053"},
  {id:"ahu_rtu",   grp:"AHU", icon:"🏠", color:"#ffd060", name:"Rooftop Unit (RTU)",    short:"RTU",  desc:"Self-contained DX unit on roof. Malls & retail.", std:"AHRI 340/360 · ASHRAE 90.1"},
  {id:"ahu_fcu",   grp:"AHU", icon:"🟢", color:"#00e87a", name:"Fan Coil Unit (FCU)",   short:"FCU",  desc:"Small terminal unit. Hotels, apartments, offices.", std:"AHRI 440 · EN 1397"},
  {id:"ahu_fau",   grp:"AHU", icon:"🌿", color:"#4ade80", name:"Fresh Air Unit (FAU)",  short:"FAU",  desc:"100% outdoor air system (DOAS).", std:"ASHRAE 62.1 · NBC 2016"},
  {id:"ahu_eru",   grp:"AHU", icon:"♻️", color:"#34d399", name:"Energy Recovery (ERU)", short:"ERU",  desc:"Heat wheel recovers energy from exhaust. LEED.", std:"ASHRAE 90.1 · LEED v4"},
  {id:"ahu_pac",   grp:"AHU", icon:"🔶", color:"#fb923c", name:"Precision AC (CRAC)",   short:"PAC",  desc:"High-precision for server rooms & labs.", std:"ASHRAE A2 · TIA-942"},
  {id:"duct_sup",  grp:"Duct",icon:"📦", color:"#00c8ff", name:"Rectangular Supply Duct",short:"RSD",  desc:"GI rectangular supply duct. SMACNA construction.", std:"SMACNA · IS 655 · NBC 2016"},
  {id:"duct_ret",  grp:"Duct",icon:"🔴", color:"#ff6b2b", name:"Rectangular Return Duct",short:"RRD",  desc:"GI rectangular return air duct. Lower velocity.", std:"SMACNA · IS 655"},
  {id:"duct_circ", grp:"Duct",icon:"⭕", color:"#00e87a", name:"Circular / Spiral Duct", short:"CSD",  desc:"Round spiral duct. Lower friction, better airflow.", std:"SMACNA · EN 1505"},
  {id:"duct_flex", grp:"Duct",icon:"🌀", color:"#a78bfa", name:"Flexible Duct",           short:"FLEX", desc:"Insulated flex duct for last-metre to diffuser. Max 1.8m.", std:"UL 181 · SMACNA"},
  {id:"duct_exh",  grp:"Duct",icon:"💨", color:"#f87171", name:"Exhaust / Extract Duct",  short:"EXD",  desc:"Toilet & kitchen exhaust. Negative pressure.", std:"SMACNA · NBC 2016 SP-7"},
];

const CITIES = {Delhi:43,Mumbai:37,Pune:38,Hyderabad:40,Chennai:39,Kolkata:38,Bangalore:33,Ahmedabad:43};

/* ─── DEFAULT FORMS ────────────────────────────────────────────────── */
function getForm(id) {
  const base = {proj:"",dwg:"",rev:"00",client:"",date:new Date().toISOString().split("T")[0],city:"Delhi",zone:"",floor:"",prepared:"",checked:"",app:"Commercial Office"};
  if(id==="ahu_fcu") return {...base,area:"30",cfm:"300",coil_rows:"2",chw_in:"7",chw_out:"12",in_db:"24",filter:"G3 Washable",fan_speed:"3-Speed",chw_pipe:"15 mm",power:"230V / 1Ph / 50Hz"};
  if(id==="ahu_rtu") return {...base,area:"500",ach:"10",out_db:"43",in_db:"24",refrigerant:"R-410A",comp:"Scroll Compressor",eer:"3.0",power:"415V / 3Ph / 50Hz"};
  if(id.startsWith("duct")) return {...base,sys:"",served:"",cfm:"1200",diversity:"1.0",vel:"800",friction:"0.10",sizing:"Equal Friction",ar:"4:1",material:"GI (Galvanised Iron)",grade:"IS 513 (Grade O)",gauge:"24G (0.63mm)",joint:"TDC Flange",leakage:"Class A (SMACNA)",sealing:"Duct Sealer + Fibreglass Tape",insulation:"Yes",ins_type:"Glass Wool (Resin Bonded)",ins_thk:"25",ins_facing:"Aluminium Foil + Kraft (AFK)",ins_density:"16 kg/m³",hanger:"GI Trapeze @ 2.4m c/c",support:"SMACNA Table 4-1"};
  return {...base,area:"200",ht:"3.2",ach:"10",cfm_total:"",out_db:"43",out_wb:"28",out_rh:"60",in_db:"24",in_wb:"17",in_rh:"55",coil_rows:"6",fpi:"12",face_vel:"450",enter_db:"28",leave_db:"13",chw_in:"6",chw_out:"12",filter_pre:"G4 (Synthetic)",filter_fin:"F7 (Bag Filter)",filter_hepa:"None",fvel:"1.5",pre_dp:"25",fin_dp:"50",fan_type:"Forward Curved (FC)",esp:"1.5",tsp:"2.0",fan_eff:"70",vfd:"Yes",drive:"Driven Pulley + V-Belt",starter:"Star-Delta",casing:"Double Skin",casing_thk:"50",panel:"PIR / PU Foam",casing_mat:"Pre-coated GI Sheet",drain:"SS Drain Pan with Trap",vib:"Anti-vibration Spring Mounts",access:"Yes - Filter & Coil Section",power:"415V / 3Ph / 50Hz",remarks:""};
}

/* ─── CALCULATIONS ─────────────────────────────────────────────────── */
function calcAHU(f) {
  const area=parseFloat(f.area)||200, ht=parseFloat(f.ht)||3.2, ach=parseFloat(f.ach)||10;
  const vol=area*ht, volFt=vol*35.3147;
  const cfmCalc=(volFt*ach)/60;
  const cfm=parseFloat(f.cfm_total)||cfmCalc;
  const oa=cfm*0.25;
  const dT=(parseFloat(f.out_db)||43)-(parseFloat(f.in_db)||24);
  const sens=cfm*1.08*dT;
  const TR=sens/12000;
  const chw_dt=(parseFloat(f.chw_out)||12)-(parseFloat(f.chw_in)||6);
  const gpm=(TR*12000)/(500*chw_dt);
  const lpm=gpm*3.785;
  const pipe=lpm<30?"25 mm":lpm<80?"32 mm":lpm<150?"40 mm":lpm<300?"50 mm":"65 mm";
  const fa=cfm/(parseFloat(f.face_vel)||450);
  const kw=(cfm*((parseFloat(f.esp)||1.5)+0.5))/(6356*0.72);
  const hp=kw*1.341;
  const stdHP=[0.5,0.75,1,1.5,2,3,5,7.5,10,15,20,25,30].find(function(h){return h>=hp;})||30;
  const sw=Math.ceil(Math.sqrt(cfm/800*144*1.25)/50)*50;
  const sh=Math.ceil(sw*0.6/50)*50;
  const rw=Math.ceil(Math.sqrt(cfm/550*144*1.2)/50)*50;
  const rh=Math.ceil(rw*0.55/50)*50;
  const mca=Math.ceil(kw*1000/415/1.732*1.25);
  return {cfm:cfm.toFixed(0),oa:oa.toFixed(0),vol:vol.toFixed(1),TR:TR.toFixed(2),sens:sens.toFixed(0),gpm:gpm.toFixed(2),lpm:lpm.toFixed(1),pipe,fa:fa.toFixed(2),kw:kw.toFixed(2),hp:hp.toFixed(2),stdHP,sw,sh,rw,rh,mca};
}
function calcRTU(f) {
  const area=parseFloat(f.area)||500, ach=parseFloat(f.ach)||10;
  const volFt=area*3.2*35.3147;
  const cfm=(volFt*ach)/60;
  const dT=(parseFloat(f.out_db)||43)-(parseFloat(f.in_db)||24);
  const TR=(cfm*1.08*dT)/12000;
  return {cfm:cfm.toFixed(0),TR:TR.toFixed(2),kw:(TR*3.517).toFixed(2)};
}
function calcFCU(f) {
  const cfm=parseFloat(f.cfm)||300;
  const TR=(cfm*1.08*11)/12000;
  const dt=(parseFloat(f.chw_out)||12)-(parseFloat(f.chw_in)||7);
  const lpm=(TR*3.517*860)/(dt*1.163*60);
  return {cfm:cfm.toFixed(0),TR:TR.toFixed(2),lpm:lpm.toFixed(1)};
}
function calcDuct(f) {
  const cfm=(parseFloat(f.cfm)||1200)*(parseFloat(f.diversity)||1);
  const vel=parseFloat(f.vel)||800;
  const aIn=cfm/vel*144;
  const diaIn=Math.sqrt(4*aIn/Math.PI);
  const diaMM=diaIn*25.4;
  const bIn=Math.sqrt(aIn/1.5), aIn2=1.5*bIn;
  const rw=Math.ceil(aIn2*25.4/50)*50, rh=Math.ceil(bIn*25.4/50)*50;
  const actVel=cfm/((rw*rh)/(25.4*25.4*144));
  const vp=Math.pow(vel/4005,2);
  const gauge=cfm<500?"26G (0.5mm)":cfm<1000?"24G (0.63mm)":cfm<2000?"22G (0.8mm)":"20G (1.0mm)";
  return {cfm:cfm.toFixed(0),diaMM:diaMM.toFixed(0),diaIn:diaIn.toFixed(2),rw,rh,vel:actVel.toFixed(0),vp:vp.toFixed(4),gauge};
}

/* ─── FORM SECTION COMPONENT ───────────────────────────────────────── */
function Sec({title,icon,children,cols,open:o}) {
  const [open,setOpen] = useState(!!o);
  const cls = cols===1?"c1":cols===3?"c3":"";
  return (
    <div className="sec">
      <div className={open?"shead on":"shead"} onClick={function(){setOpen(!open);}}>
        <span>{icon}</span><span className="stitle">{title}</span>
        <span className={open?"sarr on":"sarr"}>▼</span>
      </div>
      {open && <div className={"sbody "+cls}>{children}</div>}
    </div>
  );
}

/* ─── SIMPLE FIELD COMPONENTS ──────────────────────────────────────── */
function FI({lbl,val,set,unit,type,ph,hint,cls}){
  const cl="f"+(cls?" "+cls:"");
  return(
    <div className={cl}>
      {lbl&&<label>{lbl}</label>}
      {unit?(
        <div className="frow">
          <input type={type||"text"} value={val} onChange={function(e){set(e.target.value);}} placeholder={ph||""}/>
          <div className="funit">{unit}</div>
        </div>
      ):(
        <input type={type||"text"} value={val} onChange={function(e){set(e.target.value);}} placeholder={ph||""}/>
      )}
      {hint&&<span style={{fontSize:"9.5px",color:"var(--muted)",marginTop:"2px"}}>{hint}</span>}
    </div>
  );
}
function FS({lbl,val,set,opts,cls}){
  const cl="f"+(cls?" "+cls:"");
  return(
    <div className={cl}>
      {lbl&&<label>{lbl}</label>}
      <select value={val} onChange={function(e){set(e.target.value);}}>
        {opts.map(function(o){
          const v=typeof o==="object"?o.v:o;
          const l=typeof o==="object"?o.l:o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </div>
  );
}
function FR({lbl,val,set,opts,cls}){
  const cl="f s2"+(cls?" "+cls:"");
  return(
    <div className={cl}>
      {lbl&&<label>{lbl}</label>}
      <div className="rrow">
        {opts.map(function(o){
          return <div key={o} className={val===o?"ropt on":"ropt"} onClick={function(){set(o);}}>{o}</div>;
        })}
      </div>
    </div>
  );
}

/* ─── AHU FORM ──────────────────────────────────────────────────────── */
function AHUForm({f,sf}) {
  const u=function(k){return function(v){sf(function(p){return {...p,[k]:v};});};};
  const cityOpts = Object.keys(CITIES).map(function(c){return {v:c,l:c};});
  function setCity(v){sf(function(p){return {...p,city:v,out_db:String(CITIES[v]||43)};});}
  return(<>
    <Sec title="Project Info" icon="📋" open cols={2}>
      <FI lbl="Project Name" val={f.proj} set={u("proj")} ph="Project Name" cls="s2"/>
      <FI lbl="Drawing No." val={f.dwg} set={u("dwg")} ph="CRE-HVAC-001"/>
      <FI lbl="Revision" val={f.rev} set={u("rev")} ph="00"/>
      <FI lbl="Client" val={f.client} set={u("client")} ph="Client Name"/>
      <FI lbl="Date" val={f.date} set={u("date")} type="date"/>
      <FS lbl="City" val={f.city} set={setCity} opts={cityOpts}/>
      <FS lbl="Application" val={f.app} set={u("app")} opts={["Commercial Office","Hotel / Hospitality","Hospital / Healthcare","Retail / Mall","Data Centre","Pharma / GMP","Educational","Industrial","Residential"]}/>
      <FI lbl="Zone" val={f.zone} set={u("zone")} ph="West Wing"/>
      <FI lbl="Floor" val={f.floor} set={u("floor")} ph="3rd Floor"/>
      <FI lbl="Prepared By" val={f.prepared} set={u("prepared")}/>
    </Sec>
    <Sec title="Room & Airflow" icon="🏢" open cols={3}>
      <FI lbl="Room Area" val={f.area} set={u("area")} unit="m²" type="number"/>
      <FI lbl="Ceiling Height" val={f.ht} set={u("ht")} unit="m" type="number"/>
      <FS lbl="ACH" val={f.ach} set={u("ach")} opts={["6","8","10","12","15","20","25","30"]}/>
      <FI lbl="Supply CFM" val={f.cfm_total} set={u("cfm_total")} ph="Auto" hint="Blank=auto" cls="s2"/>
    </Sec>
    <Sec title="Design Conditions" icon="🌡️" cols={3}>
      <FI lbl="Outdoor DB" val={f.out_db} set={u("out_db")} unit="°C" type="number"/>
      <FI lbl="Outdoor WB" val={f.out_wb} set={u("out_wb")} unit="°C" type="number"/>
      <FI lbl="Outdoor RH" val={f.out_rh} set={u("out_rh")} unit="%" type="number"/>
      <FI lbl="Indoor DB" val={f.in_db} set={u("in_db")} unit="°C" type="number"/>
      <FI lbl="Indoor WB" val={f.in_wb} set={u("in_wb")} unit="°C" type="number"/>
      <FI lbl="Indoor RH" val={f.in_rh} set={u("in_rh")} unit="%" type="number"/>
    </Sec>
    <Sec title="Cooling Coil" icon="❄️" cols={3}>
      <FS lbl="Coil Rows" val={f.coil_rows} set={u("coil_rows")} opts={["2","3","4","6","8"]}/>
      <FS lbl="FPI" val={f.fpi} set={u("fpi")} opts={["8","10","12","14"]}/>
      <FS lbl="Face Velocity" val={f.face_vel} set={u("face_vel")} opts={["350","400","450","500","550"]}/>
      <FI lbl="Entering DB" val={f.enter_db} set={u("enter_db")} unit="°C" type="number"/>
      <FI lbl="Leaving DB" val={f.leave_db} set={u("leave_db")} unit="°C" type="number"/>
      <FI lbl="CHW Inlet" val={f.chw_in} set={u("chw_in")} unit="°C" type="number"/>
      <FI lbl="CHW Outlet" val={f.chw_out} set={u("chw_out")} unit="°C" type="number"/>
    </Sec>
    <Sec title="Filters" icon="🔲" cols={2}>
      <FS lbl="Pre-Filter" val={f.filter_pre} set={u("filter_pre")} opts={["G4 (Synthetic)","G4 (Washable)","G3 Coarse","EU3"]}/>
      <FS lbl="Final Filter" val={f.filter_fin} set={u("filter_fin")} opts={["None","F5 (Pocket)","F7 (Bag Filter)","F9 (Rigid Box)","H13 HEPA","H14 HEPA"]}/>
      <FS lbl="HEPA / UV" val={f.filter_hepa} set={u("filter_hepa")} opts={["None","H13 HEPA","H14 HEPA (99.995%)","UV-C Section","Carbon + UV-C"]}/>
    </Sec>
    <Sec title="Fan Section" icon="💨" cols={2}>
      <FS lbl="Fan Type" val={f.fan_type} set={u("fan_type")} opts={["Forward Curved (FC)","Backward Inclined (BI)","Backward Curved (BC)","Airfoil (AF)","Plug Fan (EC)","Plenum Fan"]}/>
      <FS lbl="Drive Type" val={f.drive} set={u("drive")} opts={["Driven Pulley + V-Belt","Direct Drive","EC Motor"]}/>
      <FS lbl="ESP (in.wg)" val={f.esp} set={u("esp")} opts={["0.75","1.0","1.25","1.5","2.0","2.5","3.0"]}/>
      <FI lbl="Fan Efficiency" val={f.fan_eff} set={u("fan_eff")} unit="%" type="number"/>
      <FR lbl="VFD Drive" val={f.vfd} set={u("vfd")} opts={["Yes","No"]}/>
      <FS lbl="Starter" val={f.starter} set={u("starter")} opts={["Star-Delta","DOL","Soft Starter","VFD"]}/>
    </Sec>
    <Sec title="Casing" icon="🏗️" cols={2}>
      <FR lbl="Casing Type" val={f.casing} set={u("casing")} opts={["Double Skin","Single Skin"]}/>
      <FS lbl="Insulation Thk." val={f.casing_thk} set={u("casing_thk")} opts={["25","50","75"]}/>
      <FS lbl="Panel Infill" val={f.panel} set={u("panel")} opts={["PIR / PU Foam","Rockwool","Glasswool"]}/>
      <FS lbl="Casing Material" val={f.casing_mat} set={u("casing_mat")} opts={["Pre-coated GI Sheet","Galvanised Steel","Stainless Steel (SS304)","Aluminium"]}/>
      <FS lbl="Drain Pan" val={f.drain} set={u("drain")} opts={["SS Drain Pan with Trap","GI Drain Pan","SS Double-walled Pan"]}/>
      <FS lbl="Vibration Iso." val={f.vib} set={u("vib")} opts={["Anti-vibration Spring Mounts","Rubber Pad Mounts","Inertia Base + Springs","Direct (none)"]}/>
    </Sec>
    <Sec title="Electrical" icon="⚡" cols={2}>
      <FS lbl="Power Supply" val={f.power} set={u("power")} opts={["415V / 3Ph / 50Hz","230V / 1Ph / 50Hz","480V / 3Ph / 60Hz"]}/>
      <FS lbl="Starter Type" val={f.starter} set={u("starter")} opts={["Star-Delta","DOL","Soft Starter","VFD"]}/>
    </Sec>
    <Sec title="Remarks" icon="📝" cols={1}>
      <div className="f s2">
        <textarea rows={3} value={f.remarks} onChange={function(e){u("remarks")(e.target.value);}} placeholder="Specifications, make preferences, site notes..."/>
      </div>
    </Sec>
  </>);
}

/* ─── DUCT FORM ──────────────────────────────────────────────────────── */
function DuctForm({f,sf,id}) {
  const u=function(k){return function(v){sf(function(p){return {...p,[k]:v};});};};
  const isKitchen=id==="duct_exh";
  const matOpts=isKitchen?["Stainless Steel (SS304)","Black Steel (Seam Welded)"]:["GI (Galvanised Iron)","Pre-Insulated GI","Aluminium","Stainless Steel (SS304)","GRP"];
  const insOpts=isKitchen?["Fire-rated Rockwool (50mm)","Calcium Silicate"]:["Glass Wool (Resin Bonded)","Rockwool (Mineral Wool)","Closed Cell PU Foam","Elastomeric (Nitrile)","Pre-insulated PIR"];
  return(<>
    <Sec title="Project Info" icon="📋" open cols={2}>
      <FI lbl="Project Name" val={f.proj} set={u("proj")} ph="Project Name" cls="s2"/>
      <FI lbl="Drawing No." val={f.dwg} set={u("dwg")} ph="CRE-DWG-001"/>
      <FI lbl="System Name" val={f.sys} set={u("sys")} ph="SAC-03"/>
      <FI lbl="Served Area" val={f.served} set={u("served")} ph="3F East"/>
      <FI lbl="Prepared By" val={f.prepared} set={u("prepared")}/>
      <FI lbl="Date" val={f.date} set={u("date")} type="date"/>
    </Sec>
    <Sec title="Airflow Parameters" icon="💨" open cols={2}>
      <FI lbl="Design CFM" val={f.cfm} set={u("cfm")} unit="CFM" type="number"/>
      <FI lbl="Diversity Factor" val={f.diversity} set={u("diversity")} type="number" hint="1.0=full load"/>
      <FS lbl="Sizing Method" val={f.sizing} set={u("sizing")} opts={["Equal Friction","Velocity Reduction","Static Regain","T-Method"]}/>
      <FS lbl="Max Aspect Ratio" val={f.ar} set={u("ar")} opts={["2:1","3:1","4:1","5:1","8:1"]}/>
      <FS lbl="Design Velocity" val={f.vel} set={u("vel")} opts={[{v:"300",l:"300 — Return Grille"},{v:"400",l:"400 — Branch (Low)"},{v:"600",l:"600 — Branch (Std)"},{v:"800",l:"800 — Main (Std)"},{v:"1000",l:"1000 — Main (High)"},{v:"1200",l:"1200 — High Vel."},{v:"1500",l:"1500 — Industrial"}]}/>
      <FS lbl="Friction Rate" val={f.friction} set={u("friction")} opts={["0.06","0.08","0.10","0.12","0.15","0.20"]}/>
    </Sec>
    <Sec title="Material & Construction" icon="🔩" cols={2}>
      <FS lbl="Duct Material" val={f.material} set={u("material")} opts={matOpts}/>
      <FS lbl="GI Grade" val={f.grade} set={u("grade")} opts={["IS 513 (Grade O)","IS 277","ASTM A653","EN 10346"]}/>
      <FS lbl="Sheet Gauge" val={f.gauge} set={u("gauge")} opts={["28G (0.4mm)","26G (0.5mm)","24G (0.63mm)","22G (0.8mm)","20G (1.0mm)","18G (1.2mm)","16G (1.6mm)"]}/>
      <FS lbl="Joint Type" val={f.joint} set={u("joint")} opts={["TDC Flange","S&Drive Slip","Pittsburgh Lock","Companion Flange","Welded (SS)"]}/>
      <FS lbl="Leakage Class" val={f.leakage} set={u("leakage")} opts={["Class A (SMACNA)","Class B — Medium Pressure","Class C — High Pressure","EN 12237 Class A","EN 12237 Class B"]}/>
      <FS lbl="Sealing" val={f.sealing} set={u("sealing")} opts={["Duct Sealer + Fibreglass Tape","Mastic Sealant","Foil Tape","Butyl Tape (High Temp)"]}/>
    </Sec>
    <Sec title="Insulation" icon="🌡️" cols={2}>
      <FR lbl="Insulation Required?" val={f.insulation} set={u("insulation")} opts={["Yes","No"]}/>
      {f.insulation==="Yes"&&<>
        <FS lbl="Insulation Type" val={f.ins_type} set={u("ins_type")} opts={insOpts}/>
        <FS lbl="Thickness (mm)" val={f.ins_thk} set={u("ins_thk")} opts={["19","25","32","38","50","75"]}/>
        <FS lbl="Facing / Jacket" val={f.ins_facing} set={u("ins_facing")} opts={["Aluminium Foil + Kraft (AFK)","FSK (Foil Scrim Kraft)","Plain (No facing)","PVC Jacketing","Aluminium Sheet"]}/>
        <FI lbl="Density (kg/m³)" val={f.ins_density} set={u("ins_density")}/>
      </>}
    </Sec>
    <Sec title="Support & Hangers" icon="🔧" cols={2}>
      <FS lbl="Hanger Type" val={f.hanger} set={u("hanger")} opts={["GI Trapeze @ 2.4m c/c","GI Trapeze @ 1.5m c/c","All-thread Rod @ 1.2m c/c","Concrete Insert + Rod"]}/>
      <FS lbl="Support Standard" val={f.support} set={u("support")} opts={["SMACNA Table 4-1","IS 655","NBC 2016 SP-7"]}/>
    </Sec>
  </>);
}

/* ─── FCU / RTU FORMS ────────────────────────────────────────────────── */
function FCUForm({f,sf}) {
  const u=function(k){return function(v){sf(function(p){return {...p,[k]:v};});};};
  return(<>
    <Sec title="Project & Room" icon="📋" open cols={2}>
      <FI lbl="Project Name" val={f.proj} set={u("proj")} cls="s2"/>
      <FI lbl="Drawing No." val={f.dwg} set={u("dwg")}/>
      <FI lbl="Zone / Room" val={f.zone} set={u("zone")}/>
    </Sec>
    <Sec title="FCU Parameters" icon="❄️" open cols={2}>
      <FI lbl="Room Area" val={f.area} set={u("area")} unit="m²" type="number"/>
      <FS lbl="Airflow (CFM)" val={f.cfm} set={u("cfm")} opts={["150","200","300","400","600","800","1000","1200"]}/>
      <FS lbl="Coil Rows" val={f.coil_rows} set={u("coil_rows")} opts={["2","3","4"]}/>
      <FS lbl="Filter Type" val={f.filter} set={u("filter")} opts={["G3 Washable","G4 Synthetic","F5 (Bag)"]}/>
      <FI lbl="CHW Inlet" val={f.chw_in} set={u("chw_in")} unit="°C" type="number"/>
      <FI lbl="CHW Outlet" val={f.chw_out} set={u("chw_out")} unit="°C" type="number"/>
      <FI lbl="Indoor DB" val={f.in_db} set={u("in_db")} unit="°C" type="number"/>
      <FS lbl="Fan Speed" val={f.fan_speed} set={u("fan_speed")} opts={["3-Speed","EC Motor (Variable)","2-Speed"]}/>
      <FS lbl="CHW Pipe Size" val={f.chw_pipe} set={u("chw_pipe")} opts={["15 mm","20 mm","25 mm","32 mm"]}/>
      <FS lbl="Power Supply" val={f.power} set={u("power")} opts={["230V / 1Ph / 50Hz","415V / 3Ph / 50Hz"]}/>
    </Sec>
  </>);
}
function RTUForm({f,sf}) {
  const u=function(k){return function(v){sf(function(p){return {...p,[k]:v};});};};
  const cityOpts=Object.keys(CITIES).map(function(c){return {v:c,l:c};});
  return(<>
    <Sec title="Project" icon="📋" open cols={2}>
      <FI lbl="Project Name" val={f.proj} set={u("proj")} cls="s2"/>
      <FI lbl="Drawing No." val={f.dwg} set={u("dwg")}/>
      <FS lbl="City" val={f.city} set={u("city")} opts={cityOpts}/>
    </Sec>
    <Sec title="Area & Conditions" icon="🏢" open cols={2}>
      <FI lbl="Area" val={f.area} set={u("area")} unit="m²" type="number"/>
      <FS lbl="ACH" val={f.ach} set={u("ach")} opts={["6","8","10","12","15"]}/>
      <FI lbl="Outdoor DB" val={f.out_db} set={u("out_db")} unit="°C" type="number"/>
      <FI lbl="Indoor DB" val={f.in_db} set={u("in_db")} unit="°C" type="number"/>
    </Sec>
    <Sec title="Refrigeration" icon="❄️" cols={2}>
      <FS lbl="Refrigerant" val={f.refrigerant} set={u("refrigerant")} opts={["R-410A","R-32","R-407C","R-134a"]}/>
      <FS lbl="Compressor" val={f.comp} set={u("comp")} opts={["Scroll Compressor","Reciprocating","Screw"]}/>
      <FI lbl="EER" val={f.eer} set={u("eer")} type="number"/>
      <FS lbl="Power Supply" val={f.power} set={u("power")} opts={["415V / 3Ph / 50Hz","230V / 1Ph / 50Hz"]}/>
    </Sec>
  </>);
}

/* ─── RESULTS ────────────────────────────────────────────────────────── */
function AHUResults({r,f,eq}) {
  const items=[
    {v:r.cfm,u:"CFM",l:"Design Airflow",c:"#00c8ff"},
    {v:r.TR,u:"TR",l:"Cooling Load",c:"#00e87a"},
    {v:r.stdHP+" HP",u:"",l:"Motor Size",c:"#ffd060"},
    {v:r.pipe,u:"CHW",l:"Pipe Size",c:"#a78bfa"},
    {v:r.oa,u:"CFM",l:"Fresh Air",c:"#4ade80"},
    {v:r.mca,u:"A",l:"MCA (est.)",c:"#f87171"},
  ];
  return(<>
    <div className="rhdr">
      <span className="rtag" style={{color:eq.color,borderColor:eq.color+"44",background:eq.color+"11"}}>{eq.short}</span>
      <h2>CALCULATION RESULTS</h2>
    </div>
    <div className="kgrid">
      {items.map(function(item){return(
        <div className="kcard" key={item.l}>
          <div className="kval" style={{color:item.c,fontSize:String(item.v).length>7?"13px":""}}>{item.v}</div>
          <div className="kunit">{item.u}</div><div className="klbl">{item.l}</div>
        </div>
      );})}
    </div>
    <div className="stitle">AIRFLOW SUMMARY</div>
    <table className="ctbl">
      <thead><tr><th>Parameter</th><th>Method</th><th>Value</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Room Volume</td><td>L×W×H</td><td className="v">{r.vol} m³</td><td className="s">Input</td></tr>
        <tr><td>Total Supply CFM</td><td>ACH×Vol/60</td><td className="v">{r.cfm} CFM</td><td className="s">ASHRAE 62.1</td></tr>
        <tr><td>Outdoor Air</td><td>25% Supply</td><td className="v">{r.oa} CFM</td><td className="s">ASHRAE 62.1 §6.2</td></tr>
        <tr><td>Sensible Load</td><td>CFM×1.08×ΔT</td><td className="v">{(parseFloat(r.sens)/1000).toFixed(1)}k BTU/hr</td><td className="s">ASHRAE</td></tr>
        <tr className="tot"><td>Cooling Capacity</td><td>BTU/12000</td><td className="v">{r.TR} TR</td><td className="s">Design</td></tr>
      </tbody>
    </table>
    <div className="stitle">FAN & MOTOR</div>
    <table className="ctbl">
      <thead><tr><th>Parameter</th><th>Value</th><th>Basis</th></tr></thead>
      <tbody>
        <tr><td>Motor Power (calc.)</td><td className="v">{r.kw} kW ({r.hp} HP)</td><td className="s">CFM×TSP/(6356×η)</td></tr>
        <tr className="tot"><td>Selected Motor</td><td className="v">{r.stdHP} HP</td><td className="s">Next standard size</td></tr>
        <tr><td>MCA (est.)</td><td className="v">{r.mca} A</td><td className="s">NEC 125% FLA</td></tr>
      </tbody>
    </table>
    <div className="stitle">CONNECTIONS</div>
    <div className="dgrid">
      {[["Supply Duct",r.sw+"×"+r.sh+" mm"],["Return Duct",r.rw+"×"+r.rh+" mm"],
        ["CHW Pipe",r.pipe],["CHW Flow",r.gpm+" GPM ("+r.lpm+" LPM)"],
        ["Coil Face Area",r.fa+" ft²"],["MCA",r.mca+" A"]].map(function(item){return(
        <div className="drow" key={item[0]}><span className="dkey">{item[0]}</span><span className="dval">{item[1]}</span></div>
      );})}
    </div>
    <div className="note g">✅ ASHRAE 62.1, ASHRAE 90.1, NBC 2016 SP-7</div>
  </>);
}
function DuctResults({r,f,eq}) {
  return(<>
    <div className="rhdr">
      <span className="rtag" style={{color:eq.color,borderColor:eq.color+"44",background:eq.color+"11"}}>{eq.short}</span>
      <h2>DUCT SIZING RESULTS</h2>
    </div>
    <div className="kgrid">
      {[{v:r.cfm,u:"CFM",l:"Design Flow",c:"#00c8ff"},
        {v:r.rw+"×"+r.rh,u:"mm",l:"Rectangular",c:"#00e87a"},
        {v:"⌀"+r.diaMM,u:"mm",l:"Circular",c:"#ffd060"},
        {v:r.vel,u:"FPM",l:"Actual Vel.",c:"#a78bfa"},
        {v:r.vp,u:"in.wg",l:"Vel. Press.",c:"#f87171"},
        {v:r.gauge,u:"",l:"Gauge",c:"#94a3b8"},
      ].map(function(item){return(
        <div className="kcard" key={item.l}>
          <div className="kval" style={{color:item.c,fontSize:String(item.v).length>6?"12px":""}}>{item.v}</div>
          <div className="kunit">{item.u}</div><div className="klbl">{item.l}</div>
        </div>
      );})}
    </div>
    <table className="ctbl">
      <thead><tr><th>Parameter</th><th>Value</th><th>Basis</th></tr></thead>
      <tbody>
        <tr><td>Design Airflow</td><td className="v">{r.cfm} CFM</td><td className="s">Input × Diversity</td></tr>
        <tr><td>Design Velocity</td><td className="v">{f.vel} FPM</td><td className="s">SMACNA</td></tr>
        <tr><td>Circular Dia.</td><td className="v">{r.diaMM} mm ({r.diaIn}")</td><td className="s">D=√(4A/π)</td></tr>
        <tr><td>Rectangular</td><td className="v">{r.rw} × {r.rh} mm</td><td className="s">AR≤{f.ar}, 50mm grid</td></tr>
        <tr><td>Actual Velocity</td><td className="v">{r.vel} FPM</td><td className="s">Based on rect. size</td></tr>
        <tr className="tot"><td>Sheet Gauge</td><td className="v">{r.gauge}</td><td className="s">SMACNA Table 1-4</td></tr>
      </tbody>
    </table>
    <div className="note g">✅ SMACNA HVAC Duct Construction Standards and IS 655</div>
    {parseInt(r.vel)>1200&&<div className="note w">⚠️ Velocity {">"}1200 FPM — consider larger duct or sound attenuator</div>}
  </>);
}

/* ─── 3D SCENE ───────────────────────────────────────────────────────── */
function build3D(THREE, scene, f, r, id) {
  var isDuct = id.startsWith("duct");
  function M(col,met,rou,emi,ei){
    var m=new THREE.MeshPhysicalMaterial({color:new THREE.Color(col),metalness:met||0.5,roughness:rou||0.4});
    if(emi!==undefined){m.emissive=new THREE.Color(emi);m.emissiveIntensity=ei||0.3;}
    return m;
  }
  function MT(col,op,met,rou){
    return new THREE.MeshPhysicalMaterial({color:new THREE.Color(col),metalness:met||0.1,roughness:rou||0.7,transparent:true,opacity:op||0.18,side:THREE.DoubleSide});
  }
  function B(mat,x,y,z,w,h,d){var m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m;}
  function C(mat,x,y,z,rt,rb,h,rx,ry,rz,seg){var m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg||24),mat);m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,rz||0);m.castShadow=true;scene.add(m);return m;}
  function E(geo,col,x,y,z){var l=new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:new THREE.Color(col)}));l.position.set(x,y,z);scene.add(l);}
  var g=new THREE.GridHelper(40,32,new THREE.Color(0x061428),new THREE.Color(0x03080f));scene.add(g);

  if(!isDuct){
    var cfm=parseFloat(r.cfm)||5000;
    var sc=Math.max(0.7,Math.min(2.0,cfm/5000));
    var AW=5.2*sc,AH=1.85*sc,AD=1.6*sc,ay=AH/2+0.12;
    var nR=parseInt(f.coil_rows)||6, nF=parseInt(f.fpi)||12;
    var sw=[AW*0.09,AW*0.09,AW*0.09,AW*0.10,AW*0.22,AW*0.08,AW*0.23,AW*0.10];
    var sx=[]; var cxi=0;
    for(var i=0;i<sw.length;i++){sx.push(cxi+sw[i]/2);cxi+=sw[i];}
    // Plinth
    B(M(0x0b1c28,0.15,0.9),AW/2,-0.1,0,AW+0.5,0.16,AD+0.35);
    // Spring mounts
    var mpts=[[0.35,0.35],[AW-0.35,0.35],[0.35,-0.35],[AW-0.35,-0.35]];
    for(var mi=0;mi<mpts.length;mi++){C(M(0x445566,0.75,0.4),mpts[mi][0],0.04,mpts[mi][1],0.08,0.08,0.05,0,0,0,12);for(var si2=0;si2<5;si2++)C(M(0x3a4d5e),mpts[mi][0],si2*0.013,mpts[mi][1],0.055,0.055,0.01,0,0,0,10);}
    // Casing
    B(M(0x0e2535,0.5,0.55),AW/2,0.1,0,AW+0.05,0.06,AD+0.05);
    B(M(0x1a3d52,0.65,0.3),AW/2,ay+AH/2+0.03,0,AW+0.05,0.06,AD+0.05);
    B(M(0x16354e,0.65,0.35),-0.03,ay,0,0.06,AH,AD+0.05);
    B(M(0x16354e,0.65,0.35),AW+0.03,ay,0,0.06,AH,AD+0.05);
    B(MT(0x2a5575,0.13),AW/2,ay,AD/2+0.03,AW,AH,0.06);
    B(MT(0x2a5575,0.13),AW/2,ay,-AD/2-0.03,AW,AH,0.06);
    B(M(0x00aacc,0.9,0.1,0x002233,0.2),AW/2,ay+AH/2+0.07,AD/2+0.06,AW+0.1,0.025,0.04);
    B(M(0x00aacc,0.9,0.1,0x002233,0.2),AW/2,ay+AH/2+0.07,-AD/2-0.06,AW+0.1,0.025,0.04);
    var dxi=0;for(var di=0;di<sw.length;di++){dxi+=sw[di];if(di<sw.length-1)B(M(0x0c2232,0.6,0.5),dxi,ay,0,0.035,AH,AD);}
    var corn=[[0,AD/2],[0,-AD/2],[AW,AD/2],[AW,-AD/2]];for(var ci2=0;ci2<corn.length;ci2++)B(M(0x1e3e52,0.75,0.4),corn[ci2][0],ay,corn[ci2][1],0.04,AH,0.04);
    // OA Louvres
    for(var lo=0;lo<7;lo++)B(M(0x00aacc,0.85,0.2),sx[0],ay-AH/2*0.7+lo*AH*0.7/7+AH*0.07,AD/2+0.02,sw[0]*0.7,0.03,AD*0.88);
    B(M(0x336688,0.8,0.3),sx[0],ay,AD/2+0.04,sw[0]*0.9,AH*0.92,0.04);
    // OA Damper
    for(var db=0;db<6;db++){var dbm=new THREE.Mesh(new THREE.BoxGeometry(0.035,AH*0.86,AD/6*0.88),M(0x00bbdd,0.85,0.15,0x002233,0.2));dbm.position.set(sx[1],ay,-AD/2+(db+0.5)*(AD/6));dbm.rotation.y=Math.PI/5;scene.add(dbm);}
    B(M(0xffcc00,0.6,0.4,0x221100,0.15),sx[1],ay+AH*0.45,AD/2+0.1,0.22,0.15,0.12);
    // Mixing box
    B(MT(0x004488,0.2),sx[2],ay,0,sw[2]*0.8,AH*0.85,AD*0.85);
    // Pre-Filter G4
    B(M(0x1a3a1a,0.3,0.8),sx[3],ay,0,0.04,AH*0.93,AD*0.94);
    B(MT(0x55cc55,0.55),sx[3]+0.01,ay,0,0.03,AH*0.88,AD*0.9);
    E(new THREE.BoxGeometry(0.04,AH*0.93,AD*0.94),0x44bb44,sx[3],ay,0);
    for(var gr=0;gr<8;gr++)B(MT(0x33aa33,0.3),sx[3]+0.015,ay-AH*0.4+gr*AH*0.8/8,0,0.02,0.02,AD*0.88);
    for(var gc=0;gc<6;gc++)B(MT(0x33aa33,0.3),sx[3]+0.015,ay,-AD*0.42+gc*AD*0.84/6,0.02,AH*0.88,0.02);
    C(M(0xcccccc,0.5,0.4),sx[3],ay+AH*0.5+0.04,AD/2+0.06,0.07,0.07,0.05,Math.PI/2,0,0,18);
    // Bag Filter F7
    var bzs=[-AD*0.35,-AD*0.12,AD*0.12,AD*0.35];
    for(var bi=0;bi<bzs.length;bi++){B(M(0x1a3a1a,0.3,0.7),sx[4],ay,bzs[bi],0.03,AH*0.88,AD*0.22);for(var bp=0;bp<10;bp++)B(MT(0x66cc66,0.55),sx[4]+0.005+bp*0.008,ay,bzs[bi],0.01,AH*0.83,AD*0.2);}
    B(M(0x1a3a1a,0.3,0.7),sx[4],ay+AH*0.45,0,sw[4]*0.85,0.04,AD*0.92);
    B(M(0x1a3a1a,0.3,0.7),sx[4],ay-AH*0.45,0,sw[4]*0.85,0.04,AD*0.92);
    C(M(0xcccccc,0.5,0.4),sx[4],ay+AH*0.5+0.04,AD/2+0.06,0.07,0.07,0.05,Math.PI/2,0,0,18);
    // Cooling Coil
    B(M(0x334444,0.6,0.5),sx[5],ay+AH*0.47,0,sw[5]*0.9,0.03,AD*0.96);
    B(M(0x334444,0.6,0.5),sx[5],ay-AH*0.47,0,sw[5]*0.9,0.03,AD*0.96);
    C(M(0xcc8833,0.9,0.08),sx[5],ay+AH*0.44,0,0.055,0.055,AD*0.94,Math.PI/2,0,0,16);
    C(M(0xcc8833,0.9,0.08),sx[5],ay-AH*0.44,0,0.055,0.055,AD*0.94,Math.PI/2,0,0,16);
    var nT=Math.floor(AH*2.8);
    for(var cr=0;cr<nR;cr++){var trx=sx[5]-sw[5]*0.4+cr*(sw[5]*0.78/nR);for(var ct=0;ct<nT;ct++){var ty=ay-AH*0.42+(ct+0.5)*(AH*0.84/nT);C(M(0xcc8833,0.9,0.08),trx,ty,0,0.016,0.016,AD*0.93,Math.PI/2,0,0,6);}}
    var nFins=Math.floor(AD*nF/12*2.2);for(var fi=0;fi<nFins;fi++){var fz=-AD*0.45+fi*(AD*0.9/nFins);B(MT(0xbbbbbb,0.5),sx[5],ay,fz,sw[5]*0.82,AH*0.85,0.006);}
    C(M(0x0055aa,0.9,0.08,0x001133,0.3),sx[5]+sw[5]*0.22,ay-AH*0.38,-AD/2-0.5,0.045,0.045,1.0,Math.PI/2,0,0,12);
    C(M(0xaa2200,0.9,0.08,0x220000,0.2),sx[5]-sw[5]*0.22,ay+AH*0.38,-AD/2-0.5,0.045,0.045,1.0,Math.PI/2,0,0,12);
    C(MT(0x111144,0.3),sx[5]+sw[5]*0.22,ay-AH*0.38,-AD/2-0.5,0.065,0.065,1.0,Math.PI/2,0,0,12);
    C(MT(0x111144,0.3),sx[5]-sw[5]*0.22,ay+AH*0.38,-AD/2-0.5,0.065,0.065,1.0,Math.PI/2,0,0,12);
    B(M(0x3355aa,0.8,0.3),sx[5],ay-AH*0.38,-AD/2-0.7,0.09,0.18,0.09);
    B(M(0x1c4455,0.7,0.25),sx[5],ay-AH*0.5+0.035,0,sw[5]+sw[4]+0.05,0.065,AD+0.04);
    C(M(0x1a3344,0.7,0.3),sx[5],ay-AH*0.5-0.05,AD/2+0.12,0.022,0.022,0.18,0,0,0,8);
    // Heating coil
    C(M(0xcc4400,0.88,0.1),sx[6],ay+AH*0.42,0,0.04,0.04,AD*0.92,Math.PI/2,0,0,14);
    C(M(0xcc4400,0.88,0.1),sx[6],ay-AH*0.42,0,0.04,0.04,AD*0.92,Math.PI/2,0,0,14);
    var nHW=Math.floor(AH*2.2);for(var ht=0;ht<nHW;ht++){var hty=ay-AH*0.4+(ht+0.5)*(AH*0.8/nHW);C(M(0xcc4400,0.88,0.1),sx[6],hty,0,0.015,0.015,AD*0.9,Math.PI/2,0,0,6);}
    // Fan
    var fanR=Math.min(AH*0.43,AD*0.42);
    B(M(0x1d3d58,0.7,0.35),sx[7],ay,0,sw[7]*0.88,AH*0.93,AD*0.9);
    E(new THREE.BoxGeometry(sw[7]*0.88,AH*0.93,AD*0.9),0x003d55,sx[7],ay,0);
    C(M(0x0c2535,0.65,0.4),sx[7]-sw[7]*0.3,ay,0,fanR*0.85,fanR*0.6,0.15,Math.PI/2,0,0,32);
    C(M(0x003355,0.85,0.12,0x001a2e,0.35),sx[7],ay,0,fanR,fanR,AD*0.58,Math.PI/2,0,0,48);
    C(M(0x00aacc,0.9,0.1,0x002233,0.45),sx[7],ay,0,fanR*0.18,fanR*0.18,AD*0.6,Math.PI/2,0,0,24);
    for(var fb=0;fb<20;fb++){var fa2=(fb/20)*Math.PI*2;var fbm=new THREE.Mesh(new THREE.BoxGeometry(fanR*0.055,fanR*0.4,AD*0.52),M(0x0077aa,0.8,0.18,0x001e2e,0.25));fbm.position.set(sx[7]+fanR*0.7*Math.sin(fa2),ay+fanR*0.7*Math.cos(fa2),0);fbm.rotation.z=-fa2+Math.PI/5;fbm.castShadow=true;scene.add(fbm);}
    C(M(0x888888,0.92,0.08),sx[7],ay,-AD*0.55,0.035,0.035,0.5,Math.PI/2,0,0,10);
    C(M(0x888888,0.92,0.08),sx[7],ay,AD*0.55,0.035,0.035,0.5,Math.PI/2,0,0,10);
    C(M(0x666666,0.88,0.2),sx[7],ay,AD*0.38,0.09,0.09,0.1,Math.PI/2,0,0,16);
    C(M(0x666666,0.88,0.2),sx[7],ay,-AD*0.38,0.09,0.09,0.1,Math.PI/2,0,0,16);
    // Motor
    var mx=sx[7]+sw[7]*0.25,my=ay-AH*0.25,mz=AD*0.5+0.02;
    B(M(0x1a1a1a,0.7,0.45),mx,my,mz,0.3,0.22,0.38);
    B(M(0x252525,0.7,0.4),mx+0.2,my,mz,0.08,0.22,0.38);
    for(var mf=0;mf<10;mf++)B(M(0x111111,0.6,0.5),mx-0.1+mf*0.025,my+0.12,mz,0.012,0.055,0.36);
    C(M(0x333333,0.85,0.2),mx+0.14,my,mz,0.12,0.12,0.04,Math.PI/2,0,0,20);
    C(M(0x333333,0.85,0.2),sx[7],ay,AD*0.52,0.2,0.2,0.04,Math.PI/2,0,0,24);
    for(var vb=0;vb<3;vb++){var belt=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.009,6,40),M(0x111111,0.15,0.9));belt.position.set(sx[7]+sw[7]*0.08,my+0.04+vb*0.013,AD*0.52);belt.rotation.x=Math.PI/2;scene.add(belt);}
    // VFD
    var vx=sx[7]-sw[7]*0.05,vy=ay+AH/2+0.15,vz=AD*0.3;
    B(M(0x0d1625,0.6,0.5),vx,vy,vz,0.38,0.24,0.22);
    B(M(0x00cc88,0.4,0.4,0x003322,0.4),vx,vy,vz+0.12,0.32,0.2,0.02);
    B(M(0x001100,0.1,0.9),vx,vy+0.02,vz+0.13,0.18,0.09,0.01);
    // Supply duct
    var sdw=(r.sw||600)/1000,sdh=(r.sh||400)/1000;
    B(M(0x009abb,0.75,0.2,0x002233,0.15),AW+sdw/2+0.06,ay,0,sdw,sdh,Math.min(sdw*0.7,AD));
    B(M(0x006688,0.9,0.1),AW+0.04,ay,0,0.06,sdh+0.04,Math.min(sdw*0.7,AD)+0.04);
    B(M(0x009abb,0.75,0.2,0x002233,0.15),AW+sdw+2.2,ay,0,3.0,sdh,Math.min(sdw*0.7,AD));
    B(MT(0xee9900,0.12),AW+sdw+2.2,ay,0,3.06,sdh+0.05,Math.min(sdw*0.7,AD)+0.05);
    var hhz=Math.min(sdw*0.7,AD)*0.55;
    B(M(0x334455,0.8,0.3),AW+sdw+2.2,ay+sdh/2+0.32,-hhz,0.035,0.65,0.035);
    B(M(0x334455,0.8,0.3),AW+sdw+2.2,ay+sdh/2+0.32,hhz,0.035,0.65,0.035);
    B(M(0x334455,0.8,0.3),AW+sdw+2.2,ay+sdh/2+0.63,0,0.035,0.035,hhz*2+0.08);
    var dbz=Math.min(sdw*0.7,AD)/2+0.8;
    B(M(0x0077aa,0.7,0.25),AW+sdw+2.2,ay-sdh*0.15,dbz+0.4,sdh*0.65,sdh*0.65,0.8);
    B(M(0x00ddff,0.5,0.12,0x003344,0.5),AW+sdw+2.2,ay+AH*0.4,dbz+1.0,0.62,0.04,0.62);
    for(var ds=0;ds<5;ds++){B(M(0x003a4e,0.7,0.15),AW+sdw+2.2,ay+AH*0.4,dbz+1.0-0.22+ds*0.11,0.58,0.016,0.022);B(M(0x003a4e,0.7,0.15),AW+sdw+2.2-0.22+ds*0.11,ay+AH*0.4,dbz+1.0,0.022,0.016,0.58);}
    var dfl=new THREE.PointLight(0x00ccff,0.9,2.8);dfl.position.set(AW+sdw+2.2,ay+AH*0.35,dbz+1.0);scene.add(dfl);
    // Return duct
    var rdw=(r.rw||500)/1000,rdh=(r.rh||350)/1000;
    B(M(0xff4400,0.6,0.3,0x220000,0.1),-rdw/2-0.06,ay,0,rdw,rdh,Math.min(rdw*0.6,AD));
    B(M(0xff4400,0.6,0.3,0x220000,0.1),-rdw-2.2,ay-0.08,0,3.5,rdh,Math.min(rdw*0.6,AD));
    B(MT(0xee9900,0.1),-rdw-2.2,ay-0.08,0,3.56,rdh+0.04,Math.min(rdw*0.6,AD)+0.04);
    B(M(0xff3300,0.6,0.4),-rdw-4.0,ay-0.08,0,0.07,rdh+0.08,Math.min(rdw*0.6,AD)+0.08);
    for(var rg=0;rg<7;rg++)B(M(0xcc2200,0.55,0.45),-rdw-4.03,ay-0.08-rdh*0.35+rg*rdh*0.7/7,0,0.04,0.022,Math.min(rdw*0.6,AD)*0.88);
    // CHW mains
    C(M(0x0055bb,0.9,0.08,0x001133,0.25),AW/2,ay-AH/2-0.22,-AD/2-0.5,0.038,0.038,AW+1.5,0,0,Math.PI/2,12);
    C(M(0xbb2200,0.9,0.08,0x220000,0.18),AW/2,ay-AH/2-0.32,-AD/2-0.5,0.038,0.038,AW+1.5,0,0,Math.PI/2,12);
    C(MT(0x111144,0.28),AW/2,ay-AH/2-0.22,-AD/2-0.5,0.055,0.055,AW+1.5,0,0,Math.PI/2,12);
    C(MT(0x111144,0.28),AW/2,ay-AH/2-0.32,-AD/2-0.5,0.055,0.055,AW+1.5,0,0,Math.PI/2,12);
    // Access doors
    var dm=MT(0x1e4a60,0.25);
    var daccs=[sx[3],sx[5],sx[7]], daws=[(sw[3]+sw[4])*0.85,sw[5]*0.86,sw[7]*0.86];
    for(var dac=0;dac<daccs.length;dac++){B(dm.clone(),daccs[dac],ay,AD/2+0.04,daws[dac],AH*0.86,0.04);E(new THREE.BoxGeometry(daws[dac],AH*0.86,0.04),0x00aacc,daccs[dac],ay,AD/2+0.04);}
    // Interior lights
    var ildata=[[sx[5],0x00bbff,0.5],[sx[7],0x00ffaa,0.4],[sx[3],0xffcc88,0.3]];
    for(var il=0;il<ildata.length;il++){var ipl=new THREE.PointLight(ildata[il][1],ildata[il][2],3.5);ipl.position.set(ildata[il][0],ay,0);scene.add(ipl);}
    return {center:new THREE.Vector3(AW/2,ay,0),radius:Math.sqrt(AW*AW+AH*AH+AD*AD)*1.65};

  } else {
    // DUCT LAYOUT
    var dCFM=parseFloat(r.cfm)||5000;
    var dsw=(r.rw||600)/1000,dsh=(r.rh||400)/1000;
    var drw=dsw*0.8,drh=dsh*0.75;
    var RL=14,RH=3.8,RW=10;
    B(M(0x08121c,0.2,0.9),RL/2,0,RW/2,RL,0.06,RW);
    var wallDat=[[RL/2,RH/2,0,true],[RL/2,RH/2,RW,true],[0,RH/2,RW/2,false],[RL,RH/2,RW/2,false]];
    for(var wi=0;wi<wallDat.length;wi++){var wiv=wallDat[wi][3];B(MT(0x0d2035,0.07),wallDat[wi][0],wallDat[wi][1],wallDat[wi][2],wiv?RL:0.05,RH,wiv?0.05:RW);}
    E(new THREE.BoxGeometry(RL,0.04,RW),0x0d2540,RL/2,RH,RW/2);
    var dY=RH-dsh/2-0.08;
    B(M(0x00aacc,0.75,0.2,0x002233,0.15),RL/2,dY,RW/2,RL-0.4,dsh,dsw);
    B(MT(0xee9900,0.1),RL/2,dY,RW/2,RL-0.34,dsh+0.04,dsw+0.04);
    for(var df=0;df<5;df++)B(M(0x006688,0.9,0.1),(df+0.5)*(RL-0.4)/5,dY,RW/2,0.04,dsh+0.04,dsw+0.04);
    for(var dh2=1;dh2<5;dh2++){var dhx=dh2*(RL/5);B(M(0x334455,0.8,0.3),dhx,dY+dsh/2+0.3,RW/2-dsw/2*0.65,0.03,0.62,0.03);B(M(0x334455,0.8,0.3),dhx,dY+dsh/2+0.3,RW/2+dsw/2*0.65,0.03,0.62,0.03);B(M(0x334455,0.8,0.3),dhx,dY+dsh/2+0.6,RW/2,0.03,0.03,dsw+0.2);}
    var brxs=[RL*0.18,RL*0.38,RL*0.58,RL*0.78];
    for(var bri=0;bri<brxs.length;bri++){
      var brx=brxs[bri];
      B(M(0x009bba,0.75,0.22),brx,dY,RW/2,dsh*0.62,RW-1.0,dsh*0.58);
      B(MT(0xee9900,0.1),brx,dY,RW/2,dsh*0.62+0.04,RW-0.94,dsh*0.58+0.04);
      for(var vc=0;vc<4;vc++){var vm=new THREE.Mesh(new THREE.BoxGeometry(dsh*0.52,0.015,dsh*0.52/4*0.88),M(0x00aacc,0.8,0.12));vm.position.set(brx,dY-dsh*0.38,RW/2-dsw*0.2+vc*(dsw*0.4/4));vm.rotation.x=Math.PI/6;scene.add(vm);}
      B(M(0x009bba,0.65,0.28),brx,dY-dsh*0.22,RW/2,dsh*0.6,dsh*0.18,dsw*0.88);
      var dzs=[0.9,RW/3,RW*2/3,RW-0.9];
      for(var dri=0;dri<dzs.length;dri++){var drz=dzs[dri];B(MT(0x4a6a80,0.5),brx,RH-0.7,drz,0.14,1.3,0.14);B(M(0x224455,0.75,0.3),brx,RH*0.65+0.06,drz,0.28,0.18,0.28);var dm2=M(0x00ddff,0.5,0.1,0x002233,0.5);B(dm2,brx,RH+0.025,drz,0.64,0.04,0.64);for(var sl=0;sl<5;sl++){B(M(0x003a4e,0.7,0.15),brx,RH+0.03,drz-0.27+sl*0.135,0.6,0.016,0.022);B(M(0x003a4e,0.7,0.15),brx-0.27+sl*0.135,RH+0.03,drz,0.022,0.016,0.6);}var dpl=new THREE.PointLight(0x00ddff,0.4,2);dpl.position.set(brx,RH-0.18,drz);scene.add(dpl);}
    }
    B(M(0xff4400,0.6,0.3,0x1a0000,0.1),RL/2,RH*0.2,RW-0.2,RL-1,drh,drw);
    B(MT(0xee9900,0.1),RL/2,RH*0.2,RW-0.2,RL-0.94,drh+0.04,drw+0.04);
    for(var rgi=0;rgi<4;rgi++){var rgx=1+rgi*(RL-2)/3;B(M(0xff4400,0.6,0.3),rgx,RH*0.2,RW-0.04,0.52,drh+0.06,0.07);for(var rgb=0;rgb<7;rgb++)B(M(0xcc2200,0.55,0.45),rgx,RH*0.2-drh*0.32+rgb*drh*0.64/7,RW-0.025,0.48,0.02,0.05);}
    B(M(0x663300,0.6,0.4,0x0a0000,0.1),1.5,RH-0.14,0.9,3.5,0.22,0.22);
    B(M(0x552200,0.55,0.5),0.03,RH-0.14,0.9,0.06,0.26,0.25);
    for(var eb=0;eb<5;eb++)B(M(0x441a00),0.025,RH-0.22+eb*0.07,0.9,0.04,0.018,0.22);
    C(M(0x0055bb,0.9,0.08,0x001133,0.22),RL/2,RH-0.25,0.3,0.038,0.038,RL,0,0,Math.PI/2,12);
    C(M(0xbb2200,0.9,0.08,0x1a0000,0.18),RL/2,RH-0.3,0.3,0.038,0.038,RL,0,0,Math.PI/2,12);
    C(MT(0x111144,0.25),RL/2,RH-0.25,0.3,0.055,0.055,RL,0,0,Math.PI/2,12);
    C(MT(0x111144,0.25),RL/2,RH-0.3,0.3,0.055,0.055,RL,0,0,Math.PI/2,12);
    for(var pi=0;pi<6;pi++)B(M(0x334455,0.8,0.3),pi*(RL/5),RH-0.26,0.3,0.04,0.08,0.08);
    return {center:new THREE.Vector3(RL/2,RH/2,RW/2),radius:Math.sqrt(RL*RL+RH*RH+RW*RW)*1.45};
  }
}

/* ─── SCENE3D COMPONENT ──────────────────────────────────────────────── */
function Scene3D({r,id,f}) {
  const canvasRef=useRef(null);
  const sceneRef=useRef(null);
  const camS=useRef({theta:0.55,phi:0.68,radius:18});
  const [av,setAV]=useState("ISO");
  const isDuct=id.startsWith("duct");
  const eq=EQLIST.find(function(e){return e.id===id;})||{};

  const build=useCallback(function(){
    if(!window.THREE||!canvasRef.current||!r)return;
    if(sceneRef.current){sceneRef.current.dispose();sceneRef.current=null;}
    var THREE=window.THREE;
    var canvas=canvasRef.current;
    var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;
    var scene=new THREE.Scene();
    scene.background=new THREE.Color(0x020b14);
    scene.fog=new THREE.FogExp2(0x020b14,0.012);
    var camera=new THREE.PerspectiveCamera(46,1,0.05,400);
    var sd=build3D(THREE,scene,f,r,id);
    var center=sd.center;
    var theta=camS.current.theta,phi=camS.current.phi,radius=sd.radius;
    function updateCam(){camera.position.set(center.x+radius*Math.sin(phi)*Math.sin(theta),center.y+radius*Math.cos(phi),center.z+radius*Math.sin(phi)*Math.cos(theta));camera.lookAt(center);}
    updateCam();
    scene.add(new THREE.AmbientLight(0x08203a,1.6));
    var sun=new THREE.DirectionalLight(0x88c8ff,2.2);sun.position.set(10,15,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
    var fl=new THREE.DirectionalLight(0x002244,0.5);fl.position.set(-8,5,-6);scene.add(fl);
    var tl=new THREE.PointLight(0x00aaff,0.4,25);tl.position.set(0,10,0);scene.add(tl);
    function setView(v){if(v==="ISO"){theta=0.55;phi=0.68;}else if(v==="TOP"){theta=0;phi=0.05;}else if(v==="FRONT"){theta=0;phi=Math.PI*0.44;}else if(v==="SIDE"){theta=Math.PI/2;phi=Math.PI*0.4;}else if(v==="CUTAWAY"){theta=0.25;phi=0.52;}else if(v==="BACK"){theta=Math.PI;phi=Math.PI*0.4;}camS.current={theta,phi,radius};updateCam();}
    var drag=false,lx=0,ly=0;
    function onDown(e){drag=true;lx=e.clientX;ly=e.clientY;}
    function onUp(){drag=false;}
    function onMove(e){if(!drag)return;theta-=(e.clientX-lx)*0.007;phi=Math.max(0.05,Math.min(Math.PI*0.46,phi-(e.clientY-ly)*0.006));lx=e.clientX;ly=e.clientY;camS.current={theta,phi,radius};updateCam();}
    canvas.addEventListener("mousedown",onDown);
    window.addEventListener("mouseup",onUp);
    window.addEventListener("mousemove",onMove);
    canvas.addEventListener("wheel",function(e){radius=Math.max(2,Math.min(50,radius+e.deltaY*0.03));camS.current={theta,phi,radius};updateCam();e.preventDefault();},{passive:false});
    var lt=0;
    canvas.addEventListener("touchstart",function(e){if(e.touches.length===1){drag=true;lx=e.touches[0].clientX;ly=e.touches[0].clientY;}if(e.touches.length===2)lt=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);},{passive:true});
    canvas.addEventListener("touchmove",function(e){if(e.touches.length===1&&drag){theta-=(e.touches[0].clientX-lx)*0.007;phi=Math.max(0.05,Math.min(Math.PI*0.46,phi-(e.touches[0].clientY-ly)*0.006));lx=e.touches[0].clientX;ly=e.touches[0].clientY;updateCam();}if(e.touches.length===2){var d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);radius=Math.max(2,Math.min(50,radius-(d-lt)*0.03));lt=d;updateCam();}e.preventDefault();},{passive:false});
    canvas.addEventListener("touchend",function(){drag=false;},{passive:true});
    function onResize(){var pw=canvas.parentElement.clientWidth,ph=canvas.parentElement.clientHeight;renderer.setSize(pw,ph,false);camera.aspect=pw/ph;camera.updateProjectionMatrix();}
    window.addEventListener("resize",onResize);onResize();
    var fId;function animate(){fId=requestAnimationFrame(animate);renderer.render(scene,camera);}animate();
    sceneRef.current={dispose:function(){cancelAnimationFrame(fId);window.removeEventListener("resize",onResize);window.removeEventListener("mouseup",onUp);window.removeEventListener("mousemove",onMove);renderer.dispose();},setView:setView};
  },[r,id,f]);

  useEffect(function(){
    if(!window.THREE){var s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";s.onload=function(){build();};document.head.appendChild(s);}else build();
    return function(){if(sceneRef.current)sceneRef.current.dispose();};
  },[build]);

  function hv(v){setAV(v);if(sceneRef.current)sceneRef.current.setView(v);}
  var VIEWS=["ISO","TOP","FRONT","SIDE","CUTAWAY","BACK"];
  var ahuLeg=[{c:"#1a3d52",l:"AHU Casing"},{c:"#00bbdd",l:"OA Damper"},{c:"#55cc55",l:"Pre-Filter G4"},{c:"#66cc66",l:"Bag Filter F7"},{c:"#cc8833",l:"Cooling Coil"},{c:"#cc4400",l:"Heating Coil"},{c:"#003355",l:"Fan Impeller"},{c:"#1a1a1a",l:"Motor + Belts"},{c:"#00cc88",l:"VFD Drive"},{c:"#0055bb",l:"CHW Supply"},{c:"#bb2200",l:"CHW Return"},{c:"#009abb",l:"Supply Duct"},{c:"#ff4400",l:"Return Duct"}];
  var ductLeg=[{c:"#00aacc",l:"Main Supply Duct"},{c:"#009bba",l:"Branch + VCD"},{c:"#4a6a80",l:"Flex Drop"},{c:"#00ddff",l:"Ceiling Diffuser"},{c:"#ff4400",l:"Return Duct"},{c:"#663300",l:"Exhaust Duct"},{c:"#0055bb",l:"CHW Supply"},{c:"#bb2200",l:"CHW Return"},{c:"#334455",l:"Hangers"},{c:"#ee9900",l:"GW Insulation"}];
  var leg=isDuct?ductLeg:ahuLeg;
  return(
    <div className="cwrap">
      <canvas ref={canvasRef}/>
      <div className="otl"><div className="cpanel"><h3>PRO 3D — {eq.short||"MEP"}</h3><p>{isDuct?r.rw+"×"+r.rh+"mm | ⌀"+r.diaMM+"mm | "+r.vel+" FPM":f.area+"m² · "+r.cfm+" CFM · "+r.TR+" TR"}</p></div></div>
      <div className="otr">{VIEWS.map(function(v){return <button key={v} className={av===v?"vbtn on":"vbtn"} onClick={function(){hv(v);}}>{v}</button>;})}</div>
      <div className="obl"><div className="cpanel"><div className="hint"><b>Drag</b> rotate</div><div className="hint"><b>Scroll</b> zoom</div><div className="hint"><b>Pinch</b> zoom (mobile)</div></div></div>
      <div className="obr"><div className="cpanel">{leg.map(function(item){return <div className="lrow" key={item.l}><div className="lsq" style={{background:item.c}}/>{item.l}</div>;})}</div></div>
    </div>
  );
}

/* ─── PDF EXPORT ─────────────────────────────────────────────────────── */
function doPDF(id,f,r){
  var eq=EQLIST.find(function(e){return e.id===id;})||{};
  var isDuct=id.startsWith("duct");
  var rows=isDuct?[["Project",f.proj||"—"],["Drawing No.",f.dwg||"—"],["System",f.sys||"—"],["Design CFM",r.cfm+" CFM"],["Velocity",f.vel+" FPM"],["Rectangular",r.rw+"×"+r.rh+" mm"],["Circular Dia.","⌀"+r.diaMM+" mm"],["Actual Vel.",r.vel+" FPM"],["Gauge",r.gauge],["Material",f.material||"GI"],["Insulation",f.insulation==="Yes"?f.ins_type+" "+f.ins_thk+"mm":"None"],["Prepared By",f.prepared||"—"]]:
  [["Project",f.proj||"—"],["Drawing No.",f.dwg||"—"],["City",f.city||"—"],["Room Area",f.area+" m²"],["ACH",f.ach+"/hr"],["Design CFM",r.cfm+" CFM"],["OA CFM",r.oa+" CFM"],["Cooling Load",r.TR+" TR"],["CHW Flow",r.gpm+" GPM"],["CHW Pipe",r.pipe||"—"],["Motor",r.stdHP+" HP ("+r.kw+" kW)"],["Supply Duct",r.sw+"×"+r.sh+" mm"],["Return Duct",r.rw+"×"+r.rh+" mm"],["MCA",r.mca+" A"],["Prepared By",f.prepared||"—"]];
  var w=window.open("","_blank");
  w.document.write("<!DOCTYPE html><html><head><title>"+eq.name+" — CoolRiteEngineer</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;}.hdr{background:#003366;color:white;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;}.hdr h1{font-size:16px;letter-spacing:1px;}.co{font-size:18px;font-weight:900;letter-spacing:2px;color:#00aacc;}.meta{background:#f0f6ff;padding:7px 24px;border-bottom:2px solid #003366;display:flex;gap:20px;font-size:11px;color:#336;}.cont{padding:16px 24px;}h2{font-size:11px;color:#003366;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #00aacc;padding-bottom:4px;margin:14px 0 7px;}table{width:100%;border-collapse:collapse;}th{background:#003366;color:white;padding:5px 9px;font-size:9.5px;text-transform:uppercase;}td{padding:6px 9px;border-bottom:1px solid #e0e8f4;font-size:11.5px;}td:first-child{color:#555;width:40%;}td:last-child{font-weight:600;color:#003366;}tr:nth-child(even){background:#f7fbff;}.footer{margin-top:16px;padding:7px 24px;background:#f0f0f0;border-top:1px solid #ccc;font-size:9.5px;color:#666;}</style></head><body>");
  w.document.write("<div class='hdr'><div><h1>"+eq.name+" — Design Data Sheet</h1><div style='font-size:9px;margin-top:2px;opacity:0.7'>"+(eq.std||"")+"</div></div><div class='co'>CoolRiteEngineer</div></div>");
  w.document.write("<div class='meta'><span><b>Project:</b> "+(f.proj||"—")+"</span><span><b>Dwg:</b> "+(f.dwg||"—")+"</span><span><b>Rev:</b> "+(f.rev||"00")+"</span><span><b>Date:</b> "+(f.date||"—")+"</span></div>");
  w.document.write("<div class='cont'><h2>Design Parameters</h2><table><thead><tr><th>Parameter</th><th>Value</th></tr></thead><tbody>");
  rows.forEach(function(row){w.document.write("<tr><td>"+row[0]+"</td><td>"+row[1]+"</td></tr>");});
  w.document.write("</tbody></table><div style='margin-top:16px;display:flex;gap:12px;flex-wrap:wrap;'>");
  ["Prepared By","Checked By","Approved By"].forEach(function(s){w.document.write("<div style='border:2px solid #003366;padding:9px 14px;min-width:120px;text-align:center;'><div style='font-size:9px;color:#666;text-transform:uppercase;letter-spacing:1px;'>"+s+"</div><div style='font-size:13px;font-weight:700;color:#003366;margin-top:5px;'>__________</div></div>");});
  w.document.write("</div></div><div class='footer'>CoolRiteEngineer Pvt. Ltd. | Noida, UP | Generated: "+new Date().toLocaleString()+"</div>");
  w.document.write("<script>window.onload=function(){window.print();}<\/script></body></html>");
  w.document.close();
}

/* ─── DXF EXPORT ─────────────────────────────────────────────────────── */
function doDXF(id,f,r){
  var eq=EQLIST.find(function(e){return e.id===id;})||{};
  var isDuct=id.startsWith("duct");
  var d="0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1015\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n";
  function tx(x,y,h,t){return "0\nTEXT\n8\nTEXT\n10\n"+x+"\n20\n"+y+"\n30\n0\n40\n"+h+"\n1\n"+t+"\n";}
  function ln(x1,y1,x2,y2){return "0\nLINE\n8\nOUTLINE\n10\n"+x1+"\n20\n"+y1+"\n30\n0\n11\n"+x2+"\n21\n"+y2+"\n31\n0\n";}
  d+=tx(5,290,8,"CoolRiteEngineer — "+eq.name);
  d+=tx(5,280,6,"Project: "+(f.proj||"—")+"  Dwg: "+(f.dwg||"—")+"  Rev: "+(f.rev||"00"));
  d+=ln(0,0,420,0)+ln(420,0,420,300)+ln(420,300,0,300)+ln(0,300,0,0)+ln(0,265,420,265);
  if(isDuct){
    var dw=(r.rw||600)/10,dh=(r.rh||400)/10;
    d+=ln(30,80,30+dw,80)+ln(30+dw,80,30+dw,80+dh)+ln(30+dw,80+dh,30,80+dh)+ln(30,80+dh,30,80);
    d+=tx(30+dw/2-8,75,4,r.rw+"mm");d+=tx(8,80+dh/2,4,r.rh+"mm");
    d+=tx(30,145,5,"Rect: "+r.rw+"×"+r.rh+"mm  |  Circ: ⌀"+r.diaMM+"mm");
    var info=["CFM: "+r.cfm,"Vel: "+f.vel+" FPM  |  Actual: "+r.vel+" FPM","Gauge: "+r.gauge,"Material: "+(f.material||"GI"),"Insulation: "+(f.insulation==="Yes"?f.ins_type+" "+f.ins_thk+"mm":"None")];
    info.forEach(function(t,i){d+=tx(5,255-i*12,4.5,t);});
  } else {
    d+=ln(20,100,130,100)+ln(130,100,130,150)+ln(130,150,20,150)+ln(20,150,20,100);
    d+=ln(35,100,35,150)+ln(55,100,55,150)+ln(85,100,85,150)+ln(110,100,110,150);
    d+=tx(22,152,3.5,"FILTER");d+=tx(40,152,3.5,"PRE-F");d+=tx(62,152,3.5,"COIL");d+=tx(90,152,3.5,"FAN");d+=tx(112,152,3.5,"DIS");
    d+=ln(130,125,195,125)+ln(130,133,195,133);
    d+=tx(135,136,3.5,"SUP: "+r.sw+"×"+r.sh+"mm");
    d+=ln(8,118,20,118)+ln(8,132,20,132);d+=tx(3,135,3,"RET: "+r.rw+"×"+r.rh+"mm");
    var info2=["CFM: "+r.cfm+"  OA: "+r.oa+" CFM","Load: "+r.TR+" TR  |  Motor: "+r.stdHP+" HP","CHW: "+r.gpm+" GPM  |  Pipe: "+r.pipe,"MCA: "+r.mca+"A","Supply Duct: "+r.sw+"×"+r.sh+"mm","Return Duct: "+r.rw+"×"+r.rh+"mm"];
    info2.forEach(function(t,i){d+=tx(200,255-i*13,4.5,t);});
  }
  d+="0\nENDSEC\n0\nEOF";
  var blob=new Blob([d],{type:"text/plain"});
  var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="CRE_"+(eq.short||"MEP")+"_"+(f.dwg||"001")+".dxf";a.click();
}

/* ─── MAIN APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [id,setId]=useState("ahu_draw");
  const [form,setForm]=useState(function(){return getForm("ahu_draw");});
  const [res,setRes]=useState(null);
  const [tab,setTab]=useState("results");
  const [toast,setToast]=useState("");
  const [loading,setLoading]=useState(false);

  function toast2(msg){setToast(msg);setTimeout(function(){setToast("");},3000);}
  function changeEq(newId){setId(newId);setForm(getForm(newId));setRes(null);setTab("results");}

  function calculate(){
    setLoading(true);
    setTimeout(function(){
      var r;
      var ahuIds=["ahu_draw","ahu_blow","ahu_fau","ahu_eru","ahu_pac"];
      if(ahuIds.indexOf(id)>=0)r=calcAHU(form);
      else if(id==="ahu_rtu")r=calcRTU(form);
      else if(id==="ahu_fcu")r=calcFCU(form);
      else r=calcDuct(form);
      setRes(r);setTab("results");setLoading(false);
      toast2("✅ Calculation complete!");
    },350);
  }

  var eq=EQLIST.find(function(e){return e.id===id;})||{};
  var isDuct=id.startsWith("duct");
  var ahuIds=["ahu_draw","ahu_blow","ahu_fau","ahu_eru","ahu_pac"];
  var isAHU=ahuIds.indexOf(id)>=0;
  var ahuGroup=EQLIST.filter(function(e){return e.grp==="AHU";});
  var ductGroup=EQLIST.filter(function(e){return e.grp==="Duct";});

  function renderForm(){
    if(isAHU)return <AHUForm f={form} sf={setForm}/>;
    if(id==="ahu_rtu")return <RTUForm f={form} sf={setForm}/>;
    if(id==="ahu_fcu")return <FCUForm f={form} sf={setForm}/>;
    return <DuctForm f={form} sf={setForm} id={id}/>;
  }

  function renderRes(){
    if(!res)return(<div className="empty"><div className="ico">📐</div><h3>NO RESULTS YET</h3><p>Fill the form on the left and click Calculate to generate results and 3D drawing.</p></div>);
    if(isAHU)return <AHUResults r={res} f={form} eq={eq}/>;
    if(id==="ahu_rtu")return(<div><div className="rhdr"><span className="rtag" style={{color:eq.color,borderColor:eq.color+"44",background:eq.color+"11"}}>{eq.short}</span><h2>RTU RESULTS</h2></div><div className="kgrid">{[{v:res.cfm,u:"CFM",l:"Airflow",c:"#00c8ff"},{v:res.TR,u:"TR",l:"Capacity",c:"#00e87a"},{v:res.kw,u:"kW",l:"Power",c:"#ffd060"}].map(function(item){return <div className="kcard" key={item.l}><div className="kval" style={{color:item.c}}>{item.v}</div><div className="kunit">{item.u}</div><div className="klbl">{item.l}</div></div>;})}</div><div className="note g">✅ AHRI 340/360 and ASHRAE 90.1</div></div>);
    if(id==="ahu_fcu")return(<div><div className="rhdr"><span className="rtag" style={{color:eq.color,borderColor:eq.color+"44",background:eq.color+"11"}}>{eq.short}</span><h2>FCU RESULTS</h2></div><div className="kgrid">{[{v:res.cfm,u:"CFM",l:"Airflow",c:"#00c8ff"},{v:res.TR,u:"TR",l:"Coil Cap.",c:"#00e87a"},{v:res.lpm,u:"LPM",l:"CHW Flow",c:"#ffd060"}].map(function(item){return <div className="kcard" key={item.l}><div className="kval" style={{color:item.c}}>{item.v}</div><div className="kunit">{item.u}</div><div className="klbl">{item.l}</div></div>;})}</div><div className="note g">✅ AHRI 440</div></div>);
    return <DuctResults r={res} f={form} eq={eq}/>;
  }

  var dsRows=isDuct?[["Design CFM",(res&&res.cfm)||"—"+" CFM"],["Velocity",form.vel+" FPM"],["Rectangular",(res&&res.rw)||"—"+"×"+(res&&res.rh)||"—"+" mm"],["Circular","⌀"+(res&&res.diaMM)||"—"+" mm"],["Gauge",(res&&res.gauge)||"—"],["Material",form.material||"GI"],["Insulation",form.insulation==="Yes"?form.ins_type+" "+form.ins_thk+"mm":"None"]]:
  [["Design Airflow",(res&&res.cfm)||"—"+" CFM"],["Cooling Load",(res&&res.TR)||"—"+" TR"],["Motor",(res&&res.stdHP)||"—"+" HP"],["CHW Flow",(res&&res.gpm)||"—"+" GPM"],["CHW Pipe",(res&&res.pipe)||"—"],["Supply Duct",(res&&res.sw)||"—"+"×"+(res&&res.sh)||"—"+" mm"],["Return Duct",(res&&res.rw)||"—"+"×"+(res&&res.rh)||"—"+" mm"],["MCA",(res&&res.mca)||"—"+" A"]];

  return(<>
    <style>{CSS}</style>
    <div className="topbar">
      <div className="logo"><div className="lbox">CR</div><div className="lname">Cool<span>Rite</span>Engineer</div></div>
      <div className="pills"><span className="pill b">MEP Design Tool</span><span className="pill g">ASHRAE · SMACNA · NBC 2016</span><span className="pill w">v5.0 Pro</span></div>
    </div>
    {loading&&<div className="lbar"/>}
    <div className="layout">
      <div className="lpanel">
        <div className="eqsec">
          <div className="eqlbl">── Air Handling Units ──</div>
          <select className="eqsel" value={isAHU||id==="ahu_rtu"||id==="ahu_fcu"?id:""} onChange={function(e){if(e.target.value)changeEq(e.target.value);}}>
            {ahuGroup.map(function(e){return <option key={e.id} value={e.id}>{e.icon} {e.name}</option>;})}
          </select>
          <div className="eqlbl">── Duct Systems ──</div>
          <select className="eqsel" value={isDuct?id:""} onChange={function(e){if(e.target.value)changeEq(e.target.value);}}>
            <option value="">-- Select Duct Type --</option>
            {ductGroup.map(function(e){return <option key={e.id} value={e.id}>{e.icon} {e.name}</option>;})}
          </select>
          <div className="eqdesc">
            <div className="eqname">{eq.icon} {eq.name}</div>
            {eq.desc}
            <div className="eqstd">{eq.std}</div>
          </div>
        </div>
        <div className="farea">{renderForm()}</div>
        <div className="abar">
          <button className="bcalc" onClick={calculate}>⚡ CALCULATE + GENERATE 3D</button>
          <div className="brow">
            <button className="bex p" onClick={function(){if(!res){toast2("Calculate first!");return;}doPDF(id,form,res);}}>📄 PDF</button>
            <button className="bex d" onClick={function(){if(!res){toast2("Calculate first!");return;}doDXF(id,form,res);}}>📐 DXF</button>
            <button className="bex r" onClick={function(){setForm(getForm(id));setRes(null);}}>↺ Reset</button>
          </div>
        </div>
      </div>
      <div className="rpanel">
        <div className="tabs">
          {[["results","📊 Results"],["drawing","🧊 3D Drawing"],["datasheet","📋 Data Sheet"]].map(function(t){
            return <div key={t[0]} className={tab===t[0]?"tab on":"tab"} onClick={function(){setTab(t[0]);}}>{t[1]}</div>;
          })}
        </div>
        <div className="rcont">
          {tab==="results"&&renderRes()}
          {tab==="drawing"&&(res?<Scene3D r={res} id={id} f={form}/>:<div className="empty"><div className="ico">🧊</div><h3>3D DRAWING</h3><p>Calculate first to generate the interactive 3D model.</p></div>)}
          {tab==="datasheet"&&(res?<>
            <div className="stitle">PROJECT INFORMATION</div>
            <div className="dgrid">
              {[["Project",form.proj||"—"],["Drawing No.",form.dwg||"—"],["Revision",form.rev||"00"],["Date",form.date||"—"],["City",form.city||"—"],["App.",form.app||"—"]].map(function(item){return <div className="drow" key={item[0]}><span className="dkey">{item[0]}</span><span className="dval">{item[1]}</span></div>;})}
            </div>
            <div className="stitle">EQUIPMENT: {eq.name}</div>
            <div className="dgrid">
              {dsRows.map(function(item){return <div className="drow" key={item[0]}><span className="dkey">{item[0]}</span><span className="dval">{item[1]}</span></div>;})}
            </div>
            <div className="note b">ℹ️ Use 📄 PDF button to export complete data sheet with approval stamps.</div>
          </>:<div className="empty"><div className="ico">📋</div><h3>DATA SHEET</h3><p>Calculate first to view complete data sheet.</p></div>)}
        </div>
      </div>
    </div>
    {toast&&<div className="toast">{toast}</div>}
  </>);
}
