import { useState, useCallback } from "react";

const COMPANY = "Coolrite Engineers";

const ALL_UNITS = ["Sq.ft", "Sq.m", "Rmt", "Nos", "Kg", "Set", "Lot", "Pair", "Box", "Roll"];

const CATEGORIES = [
  {
    id: "gi_ducting", icon: "⬜", label: "GI Ducting", subtitle: "Main Supply Work", color: "#3b82f6",
    items: [
      { name: "GI Rectangular Duct", unit: "Sq.ft", calc: "rect" },
      { name: "GI Round Duct", unit: "Sq.ft", calc: "round" },
      { name: "Spiral Duct", unit: "Sq.ft", calc: "round" },
      { name: "TDF Duct", unit: "Sq.ft", calc: "rect" },
      { name: "TDC Duct", unit: "Sq.ft", calc: "rect" },
      { name: "Pre-insulated Duct (PIR Panel)", unit: "Sq.ft", calc: "rect" },
    ],
  },
  {
    id: "fittings", icon: "🔀", label: "Duct Fittings", subtitle: "Fabricated Items", color: "#10b981",
    items: [
      { name: "Elbow 90°", unit: "Nos", calc: "nos" },
      { name: "Elbow 45°", unit: "Nos", calc: "nos" },
      { name: "Radius Bend", unit: "Nos", calc: "nos" },
      { name: "Reducer – Eccentric", unit: "Nos", calc: "nos" },
      { name: "Reducer – Concentric", unit: "Nos", calc: "nos" },
      { name: "Tee", unit: "Nos", calc: "nos" },
      { name: "Cross", unit: "Nos", calc: "nos" },
      { name: "Offset", unit: "Nos", calc: "nos" },
      { name: "Transition Piece", unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "air_terminals", icon: "🌬️", label: "Air Terminals", subtitle: "Supply / Return", color: "#8b5cf6",
    items: [
      { name: "Supply Air Diffuser – Ceiling", unit: "Nos", calc: "nos" },
      { name: "Supply Air Diffuser – 4-way", unit: "Nos", calc: "nos" },
      { name: "Linear Slot Diffuser", unit: "Nos", calc: "nos" },
      { name: "Return Air Grille", unit: "Nos", calc: "nos" },
      { name: "Exhaust Air Grille", unit: "Nos", calc: "nos" },
      { name: "Egg Crate Grille", unit: "Nos", calc: "nos" },
      { name: "Perforated Diffuser (Pharma)", unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "dampers", icon: "🧰", label: "Dampers", subtitle: "Critical for Pharma", color: "#f59e0b",
    items: [
      { name: "Volume Control Damper (VCD)", unit: "Nos", calc: "nos" },
      { name: "Opposed Blade Damper", unit: "Nos", calc: "nos" },
      { name: "Fire Damper", unit: "Nos", calc: "nos" },
      { name: "Smoke Damper", unit: "Nos", calc: "nos" },
      { name: "Motorized Damper", unit: "Nos", calc: "nos" },
      { name: "Back Draft Damper", unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "pharma", icon: "🧪", label: "Pharma-Specific", subtitle: "VERY IMPORTANT", color: "#ef4444",
    items: [
      { name: "HEPA Filter Box", unit: "Nos", calc: "nos" },
      { name: "Terminal HEPA Housing", unit: "Nos", calc: "nos" },
      { name: "Fine Filter – Pre", unit: "Nos", calc: "nos" },
      { name: "Fine Filter – Microvee", unit: "Nos", calc: "nos" },
      { name: "Return Riser with Filter", unit: "Nos", calc: "nos" },
      { name: "Laminar Air Flow Unit (LAF)", unit: "Nos", calc: "nos" },
      { name: "Dynamic Pass Box", unit: "Nos", calc: "nos" },
      { name: "Static Pass Box", unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "exhaust", icon: "🌪️", label: "Exhaust System", subtitle: "Exhaust / Fresh Air", color: "#06b6d4",
    items: [
      { name: "Exhaust Duct", unit: "Sq.ft", calc: "rect" },
      { name: "Fume Exhaust Duct (Chemical Resistant)", unit: "Sq.ft", calc: "rect" },
      { name: "Scrubber Connection Duct", unit: "Sq.ft", calc: "rect" },
      { name: "Fresh Air Duct", unit: "Sq.ft", calc: "rect" },
    ],
  },
  {
    id: "insulation", icon: "🧵", label: "Insulation Work", subtitle: "Nitrile / Glass Wool", color: "#22c55e",
    items: [
      { name: "Duct Insulation – Nitrile Rubber", unit: "Sq.m", calc: "sqm" },
      { name: "Duct Insulation – Glass Wool", unit: "Sq.m", calc: "sqm" },
      { name: "Aluminum Cladding", unit: "Sq.m", calc: "sqm" },
      { name: "Vapor Barrier", unit: "Sq.m", calc: "sqm" },
    ],
  },
  {
    id: "supports", icon: "🔩", label: "Supports & Accessories", subtitle: "MS Angle / Hangers", color: "#94a3b8",
    items: [
      { name: "MS Angle Supports", unit: "Kg", calc: "nos" },
      { name: "Threaded Rods", unit: "Nos", calc: "nos" },
      { name: "Hangers", unit: "Nos", calc: "nos" },
      { name: "Cleats", unit: "Nos", calc: "nos" },
      { name: "Nut Bolts", unit: "Nos", calc: "nos" },
      { name: "Gaskets", unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "flexible", icon: "🔧", label: "Flexible Connections", subtitle: "Canvas / Aluminum", color: "#a78bfa",
    items: [
      { name: "Canvas Connection", unit: "Nos", calc: "nos" },
      { name: "Flexible Duct – Aluminum", unit: "Sq.ft", calc: "round" },
      { name: "Flexible Duct – PVC", unit: "Sq.ft", calc: "round" },
    ],
  },
  {
    id: "misc", icon: "💧", label: "Drain & Misc", subtitle: "AHU / Access / Sealant", color: "#38bdf8",
    items: [
      { name: "Drain Pipe for AHU", unit: "Rmt", calc: "nos" },
      { name: "Access Doors (Duct Inspection)", unit: "Nos", calc: "nos" },
      { name: "Duct Sealant", unit: "Nos", calc: "nos" },
      { name: "Acoustic Lining", unit: "Sq.ft", calc: "rect" },
    ],
  },
  {
    id: "cleanroom", icon: "🧼", label: "Cleanroom / Pharma Grade", subtitle: "SS / Leak Proof", color: "#f472b6",
    items: [
      { name: "Powder Coated Duct", unit: "Sq.ft", calc: "rect" },
      { name: "SS Duct (Critical Zones)", unit: "Sq.ft", calc: "rect" },
      { name: "Leak Proof Duct Class A", unit: "Sq.ft", calc: "rect" },
      { name: "Leak Proof Duct Class B", unit: "Sq.ft", calc: "rect" },
      { name: "DOP Test Port", unit: "Nos", calc: "nos" },
      { name: "Pressure Tap Point", unit: "Nos", calc: "nos" },
    ],
  },
];

let _id = 1;
function newRow(name, unit, calc, catId) {
  return { id: _id++, catId, name, location: "", L: "", W: "", H: "", qty: "", unit, calc, remarks: "" };
}

function compute(row) {
  const L = parseFloat(row.L) || 0;
  const W = parseFloat(row.W) || 0;
  const H = parseFloat(row.H) || 0;
  const Q = parseFloat(row.qty) || 1;
  const u = row.unit;
  const c = row.calc;

  if (u === "Sq.ft") {
    if (c === "round") return L > 0 && W > 0 ? +(Math.PI * W * L * Q).toFixed(3) : null;
    if (L > 0 && W > 0 && H > 0) return +(2 * (W + H) * L * Q).toFixed(3);
    if (L > 0 && W > 0) return +(L * W * Q).toFixed(3);
    return null;
  }
  if (u === "Sq.m") {
    if (c === "round") return L > 0 && W > 0 ? +(Math.PI * W * L * Q * 0.0929).toFixed(3) : null;
    if (L > 0 && W > 0 && H > 0) return +(2 * (W + H) * L * Q * 0.0929).toFixed(3);
    if (L > 0 && W > 0) return +(L * W * Q * 0.0929).toFixed(3);
    return null;
  }
  if (u === "Rmt") return L > 0 ? +(L * Q).toFixed(3) : (Q > 1 ? Q : null);
  return Q > 0 ? Q : null;
}

function hint(row) {
  const u = row.unit;
  if (u === "Sq.ft" || u === "Sq.m") {
    if (row.calc === "round") return "π×D×L×Qty";
    return parseFloat(row.H) > 0 ? "2(W+H)×L×Qty" : "L×W×Qty";
  }
  if (u === "Rmt") return "L×Qty";
  return "= Qty";
}

export default function App() {
  const [rows, setRows] = useState(() =>
    CATEGORIES.flatMap(cat => cat.items.slice(0, 1).map(i => newRow(i.name, i.unit, i.calc, cat.id)))
  );
  const [openCats, setOpenCats] = useState(() =>
    Object.fromEntries(CATEGORIES.map(c => [c.id, true]))
  );
  const [proj, setProj] = useState({
    name: "", client: "", site: "", by: "",
    date: new Date().toISOString().slice(0, 10), rev: "R0"
  });

  const setField = useCallback((id, field, val) =>
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r)), []);
  const delRow = useCallback((id) => setRows(prev => prev.filter(r => r.id !== id)), []);
  const addRow = useCallback((name, unit, calc, catId) =>
    setRows(prev => [...prev, newRow(name, unit, calc, catId)]), []);

  const exportPDF = () => {
    const css = `*{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial,sans-serif;font-size:10px;color:#000;background:#fff;padding:16px}
    h1{font-size:15px;color:#1e3a8a}p.sub{font-size:10px;color:#555;margin-bottom:10px}
    .info{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px}
    .ib{border:1px solid #ccc;padding:4px 8px;border-radius:4px;font-size:9px}
    .ib b{display:block;color:#1e40af;font-size:8px;text-transform:uppercase;margin-bottom:2px}
    table{width:100%;border-collapse:collapse;margin-bottom:10px}
    th{background:#1e3a8a;color:#fff;padding:4px 6px;text-align:left;font-size:9px}
    td{padding:3px 5px;border-bottom:1px solid #e5e7eb;font-size:9px}
    .cat{background:#dbeafe;font-weight:bold;color:#1e3a8a;padding:3px 6px}
    .strow td{background:#f0fdf4;font-weight:bold}
    .sign{display:flex;justify-content:space-between;margin-top:20px;border-top:1px solid #ccc;padding-top:10px}
    .sign div{width:30%;text-align:center;font-size:9px}
    .sign div p{border-top:1px solid #000;margin-top:20px;padding-top:4px}`;

    let body = `<h1>❄️ ${COMPANY}</h1><p class="sub">HVAC | Cleanroom | Pharma Solutions — Measurement Sheet</p>
    <div class="info">
      <div class="ib"><b>Project</b>${proj.name||"—"}</div>
      <div class="ib"><b>Client</b>${proj.client||"—"}</div>
      <div class="ib"><b>Site</b>${proj.site||"—"}</div>
      <div class="ib"><b>Prepared By</b>${proj.by||"—"}</div>
      <div class="ib"><b>Date</b>${proj.date}</div>
      <div class="ib"><b>Revision</b>${proj.rev}</div>
    </div>
    <table><thead><tr><th>Sr</th><th>Item Name</th><th>Location</th><th>L</th><th>W/D</th><th>H</th><th>Qty</th><th>Unit</th><th>Calculated</th><th>Remarks</th></tr></thead><tbody>`;

    let sr = 1;
    CATEGORIES.forEach(cat => {
      const cr = rows.filter(r => r.catId === cat.id);
      if (!cr.length) return;
      body += `<tr><td class="cat" colspan="10">${cat.icon} ${cat.label} — ${cat.subtitle}</td></tr>`;
      cr.forEach(r => {
        const v = compute(r);
        body += `<tr><td>${sr++}</td><td>${r.name||"—"}</td><td>${r.location||"—"}</td><td>${r.L||"—"}</td><td>${r.W||"—"}</td><td>${r.H||"—"}</td><td>${r.qty||1}</td><td>${r.unit}</td><td><b>${v!=null?v.toLocaleString():"—"}</b></td><td>${r.remarks||""}</td></tr>`;
      });
      const tot = cr.reduce((s,r) => s+(compute(r)||0), 0);
      if (tot > 0) body += `<tr class="strow"><td colspan="8" style="text-align:right;padding-right:8px">Sub-Total →</td><td><b>${tot.toLocaleString()}</b></td><td></td></tr>`;
    });
    body += `</tbody></table>
    <div class="sign"><div><p>Prepared By</p></div><div><p>Checked By</p></div><div><p>Approved By</p></div></div>`;

    const w = window.open("","_blank","width=900,height=700");
    if (!w) { alert("Please allow popups for PDF export."); return; }
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Coolrite Measurement</title><style>${css}</style></head><body>${body}</body></html>`);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 500);
  };

  const exportCSV = () => {
    const header = ["Sr","Category","Item Name","Location","L","W/D","H","Qty","Unit","Calculated","Remarks"];
    const lines = [header.join(",")];
    let sr = 1;
    CATEGORIES.forEach(cat => {
      const cr = rows.filter(r => r.catId === cat.id);
      cr.forEach(r => {
        const v = compute(r);
        const row2 = [sr++, cat.label, `"${r.name}"`, `"${r.location}"`, r.L, r.W, r.H, r.qty||1, r.unit, v??0, `"${r.remarks}"`];
        lines.push(row2.join(","));
      });
    });
    const blob = new Blob([lines.join("\n")], { type:"text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Coolrite_${proj.name||"Sheet"}_${proj.date}.csv`;
    a.click();
  };

  const totalRows = rows.length;
  const filledRows = rows.filter(r => compute(r) != null).length;

  const S = {
    app: { minHeight:"100vh", background:"#0f172a", color:"#e2e8f0", fontFamily:"'Segoe UI',sans-serif", fontSize:13 },
    topbar: { background:"#1e293b", borderBottom:"2px solid #3b82f6", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 },
    logo: { display:"flex", alignItems:"center", gap:12 },
    logoBox: { width:44, height:44, borderRadius:10, background:"linear-gradient(135deg,#1d4ed8,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 },
    body: { maxWidth:1400, margin:"0 auto", padding:16 },
    card: { background:"#1e293b", borderRadius:12, padding:14, marginBottom:14, border:"1px solid #334155" },
    sectionLabel: { fontSize:11, fontWeight:700, color:"#60a5fa", textTransform:"uppercase", letterSpacing:2, marginBottom:10 },
    projGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:10 },
    lbl: { fontSize:10, color:"#94a3b8", marginBottom:3, display:"block" },
    inp: { width:"100%", background:"#0f172a", border:"1px solid #475569", borderRadius:6, padding:"6px 8px", color:"#e2e8f0", fontSize:12, outline:"none", boxSizing:"border-box" },
    catWrap: (c) => ({ border:`1px solid ${c}35`, borderRadius:10, marginBottom:12, overflow:"hidden" }),
    catHead: (c) => ({ background:`linear-gradient(90deg,${c}25,transparent)`, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", userSelect:"none" }),
    tbl: { width:"100%", borderCollapse:"collapse", fontSize:12 },
    th: (c) => ({ background:`${c}20`, padding:"6px 8px", textAlign:"left", fontSize:11, color:"#94a3b8", whiteSpace:"nowrap", fontWeight:600, borderBottom:`1px solid ${c}30` }),
    td: { padding:"5px 6px", borderBottom:"1px solid #1e293b", verticalAlign:"middle" },
    ci: { background:"#0f172a", border:"1px solid #2d3748", borderRadius:4, padding:"4px 6px", color:"#e2e8f0", fontSize:11, width:"100%", outline:"none", boxSizing:"border-box" },
    sel: { background:"#0f172a", border:"1px solid #3b82f6", borderRadius:4, padding:"4px 6px", color:"#93c5fd", fontSize:11, width:"100%", outline:"none", fontWeight:700, cursor:"pointer", boxSizing:"border-box" },
    addArea: (c) => ({ padding:"8px 12px", background:`${c}08`, borderTop:`1px solid ${c}20`, display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }),
    addBtn: (c) => ({ background:`${c}15`, border:`1px solid ${c}45`, color:c, borderRadius:6, padding:"3px 8px", fontSize:10, cursor:"pointer", whiteSpace:"nowrap" }),
    delBtn: { background:"none", border:"none", color:"#475569", fontSize:15, cursor:"pointer", padding:"0 4px", lineHeight:1 },
    summGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:10, marginTop:10 },
    summCard: (c) => ({ background:`${c}15`, border:`1px solid ${c}30`, borderRadius:8, padding:"10px 12px" }),
    btnGroup: { display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" },
    btn: (bg) => ({ background:bg, color:"#fff", border:"none", borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }),
  };

  return (
    <div style={S.app}>
      <div style={S.topbar}>
        <div style={S.logo}>
          <div style={S.logoBox}>❄️</div>
          <div>
            <div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>{COMPANY}</div>
            <div style={{ fontSize:11, color:"#93c5fd" }}>HVAC | Cleanroom | Pharma Solutions</div>
          </div>
        </div>
        <div style={S.btnGroup}>
          <div style={{ fontSize:11, color:"#64748b" }}>
            <span style={{ color:"#34d399", fontWeight:700 }}>{filledRows}</span>
            <span>/{totalRows} rows filled</span>
          </div>
          <button style={S.btn("linear-gradient(135deg,#065f46,#059669)")} onClick={exportCSV}>📊 Excel/CSV</button>
          <button style={S.btn("linear-gradient(135deg,#7f1d1d,#dc2626)")} onClick={exportPDF}>📄 PDF Print</button>
        </div>
      </div>

      <div style={S.body}>
        {/* Project Info */}
        <div style={S.card}>
          <div style={S.sectionLabel}>📋 Project Information</div>
          <div style={S.projGrid}>
            {[
              {k:"name",  l:"Project Name",   p:"e.g. HVAC Phase-1"},
              {k:"client",l:"Client Name",    p:"Client company"},
              {k:"site",  l:"Site / Location",p:"Site address"},
              {k:"by",    l:"Prepared By",    p:"Engineer name"},
              {k:"date",  l:"Date",           p:"",t:"date"},
              {k:"rev",   l:"Revision",       p:"R0"},
            ].map(f => (
              <div key={f.k}>
                <label style={S.lbl}>{f.l}</label>
                <input type={f.t||"text"} style={S.inp} value={proj[f.k]} placeholder={f.p}
                  onChange={e => setProj(p => ({...p,[f.k]:e.target.value}))} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {CATEGORIES.map(cat => {
          const catRows = rows.filter(r => r.catId === cat.id);
          const isOpen = openCats[cat.id];
          const subTotal = catRows.reduce((s,r) => s+(compute(r)||0), 0);
          return (
            <div key={cat.id} style={S.catWrap(cat.color)}>
              <div style={S.catHead(cat.color)} onClick={() => setOpenCats(o => ({...o,[cat.id]:!o[cat.id]}))}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>{cat.icon}</span>
                  <span style={{ fontWeight:700, fontSize:13, color:"#f1f5f9" }}>{cat.label}</span>
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{cat.subtitle}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:11, background:`${cat.color}25`, color:cat.color, padding:"2px 8px", borderRadius:10, fontWeight:600 }}>{catRows.length} rows</span>
                  {subTotal > 0 && <span style={{ fontSize:11, color:"#34d399", fontWeight:700 }}>= {subTotal.toLocaleString()}</span>}
                  <span style={{ color:"#475569", fontSize:11 }}>{isOpen?"▲":"▼"}</span>
                </div>
              </div>

              {isOpen && (
                <>
                  <div style={{ overflowX:"auto" }}>
                    <table style={S.tbl}>
                      <thead>
                        <tr>
                          {["#","Item Name","Location / Area","L (ft)","W / D (ft)","H (ft)","Qty","Unit ▾","Calculated","Formula","Remarks","✕"].map((h,i) => (
                            <th key={i} style={S.th(cat.color)}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {catRows.map((row, idx) => {
                          const val = compute(row);
                          return (
                            <tr key={row.id} style={{ background: idx%2===0?"transparent":"#ffffff05" }}>
                              <td style={{...S.td, color:"#475569", fontSize:11, textAlign:"center", width:28}}>{idx+1}</td>
                              <td style={{...S.td, minWidth:155}}>
                                <input style={S.ci} value={row.name} placeholder="Item name" onChange={e => setField(row.id,"name",e.target.value)} />
                              </td>
                              <td style={{...S.td, minWidth:120}}>
                                <input style={S.ci} value={row.location} placeholder="Location / Area" onChange={e => setField(row.id,"location",e.target.value)} />
                              </td>
                              <td style={{...S.td, width:72}}>
                                <input style={{...S.ci, textAlign:"center"}} type="number" value={row.L} placeholder="L" onChange={e => setField(row.id,"L",e.target.value)} />
                              </td>
                              <td style={{...S.td, width:72}}>
                                <input style={{...S.ci, textAlign:"center"}} type="number" value={row.W} placeholder="W/D" onChange={e => setField(row.id,"W",e.target.value)} />
                              </td>
                              <td style={{...S.td, width:72}}>
                                <input style={{...S.ci, textAlign:"center"}} type="number" value={row.H} placeholder="H" onChange={e => setField(row.id,"H",e.target.value)} />
                              </td>
                              <td style={{...S.td, width:65}}>
                                <input style={{...S.ci, textAlign:"center"}} type="number" value={row.qty} placeholder="Qty" onChange={e => setField(row.id,"qty",e.target.value)} />
                              </td>
                              <td style={{...S.td, width:88}}>
                                <select style={S.sel} value={row.unit} onChange={e => setField(row.id,"unit",e.target.value)}>
                                  {ALL_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                              </td>
                              <td style={{...S.td, width:88, textAlign:"center"}}>
                                <span style={{ fontWeight:700, fontSize:13, color: val!=null?"#34d399":"#475569" }}>
                                  {val!=null ? val.toLocaleString() : "—"}
                                </span>
                              </td>
                              <td style={{...S.td, width:95, textAlign:"center"}}>
                                <span style={{ fontSize:9, color:"#475569", fontStyle:"italic" }}>{hint(row)}</span>
                              </td>
                              <td style={{...S.td, minWidth:100}}>
                                <input style={S.ci} value={row.remarks} placeholder="Remarks" onChange={e => setField(row.id,"remarks",e.target.value)} />
                              </td>
                              <td style={{...S.td, width:30, textAlign:"center"}}>
                                <button style={S.delBtn} onClick={() => delRow(row.id)}>✕</button>
                              </td>
                            </tr>
                          );
                        })}
                        {catRows.length === 0 && (
                          <tr><td colSpan={12} style={{ padding:"12px", textAlign:"center", color:"#334155", fontSize:11 }}>
                            No rows yet — click buttons below to add items
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div style={S.addArea(cat.color)}>
                    <span style={{ fontSize:10, color:"#64748b" }}>+ Add:</span>
                    {cat.items.map(item => (
                      <button key={item.name} style={S.addBtn(cat.color)} onClick={() => addRow(item.name, item.unit, item.calc, cat.id)}>
                        {item.name}
                      </button>
                    ))}
                    <button style={{...S.addBtn(cat.color), fontStyle:"italic", opacity:0.7}} onClick={() => addRow("", "Nos", "nos", cat.id)}>
                      + Custom Row
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Summary */}
        <div style={S.card}>
          <div style={S.sectionLabel}>📊 Summary</div>
          <div style={S.summGrid}>
            {CATEGORIES.map(cat => {
              const cr = rows.filter(r => r.catId === cat.id);
              const tot = cr.reduce((s,r) => s+(compute(r)||0), 0);
              const filled = cr.filter(r => compute(r)!=null).length;
              return (
                <div key={cat.id} style={S.summCard(cat.color)}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                    <span style={{ fontSize:14 }}>{cat.icon}</span>
                    <span style={{ fontSize:11, fontWeight:600, color:"#e2e8f0" }}>{cat.label}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:10, color:"#64748b" }}>{filled}/{cr.length} rows</span>
                    <span style={{ fontSize:15, fontWeight:800, color: tot>0?"#34d399":"#334155" }}>
                      {tot>0 ? tot.toLocaleString() : "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign:"center", fontSize:11, color:"#1e293b", paddingBottom:20 }}>
          Coolrite Engineers · HVAC Measurement System v2.0
        </div>
      </div>
    </div>
  );
}

