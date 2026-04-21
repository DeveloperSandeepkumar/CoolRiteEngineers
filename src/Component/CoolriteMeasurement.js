import { useState, useCallback, useRef } from "react";

// ─── SheetJS via CDN (loaded once) ────────────────────────────────────────────
const loadXLSX = () =>
  new Promise((resolve) => {
    if (window.XLSX) return resolve(window.XLSX);
    const s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => resolve(window.XLSX);
    document.head.appendChild(s);
  });

// ─── Constants ─────────────────────────────────────────────────────────────────
const ALL_UNITS = [
  "m²","ft²","m","ft","Nos","kg","Set","Lot","Pair","Box","Roll","Lm","ltr",
];

const CATEGORIES = [
  {
    id: "gi_duct", icon: "◻️", label: "GI Ducting",
    sub: "Supply / Return / Exhaust", color: "#2f81f7",
    items: [
      { name: "GI Rectangular Duct",        unit: "m²", calc: "rect"  },
      { name: "GI Round / Spiral Duct",     unit: "m²", calc: "round" },
      { name: "TDF Duct",                   unit: "m²", calc: "rect"  },
      { name: "TDC Duct",                   unit: "m²", calc: "rect"  },
      { name: "Pre-Insulated Duct (PIR)",   unit: "m²", calc: "rect"  },
      { name: "Powder Coated Duct",         unit: "m²", calc: "rect"  },
      { name: "SS Duct (Critical Zones)",   unit: "m²", calc: "rect"  },
      { name: "Fume Exhaust Duct",          unit: "m²", calc: "rect"  },
    ],
  },
  {
    id: "duct_fit", icon: "🔀", label: "Duct Fittings",
    sub: "Fabricated Items", color: "#3fb950",
    items: [
      { name: "Elbow 90°",          unit: "Nos", calc: "nos" },
      { name: "Elbow 45°",          unit: "Nos", calc: "nos" },
      { name: "Radius Bend",        unit: "Nos", calc: "nos" },
      { name: "Reducer – Eccentric",unit: "Nos", calc: "nos" },
      { name: "Reducer – Concentric",unit:"Nos", calc: "nos" },
      { name: "Tee",                unit: "Nos", calc: "nos" },
      { name: "Offset",             unit: "Nos", calc: "nos" },
      { name: "Transition Piece",   unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "air_term", icon: "🌬️", label: "Air Terminals",
    sub: "Diffusers / Grilles", color: "#bc8cff",
    items: [
      { name: "Ceiling Diffuser – 4-Way", unit: "Nos", calc: "nos" },
      { name: "Linear Slot Diffuser",     unit: "Nos", calc: "nos" },
      { name: "Return Air Grille",        unit: "Nos", calc: "nos" },
      { name: "Exhaust Air Grille",       unit: "Nos", calc: "nos" },
      { name: "Egg Crate Grille",         unit: "Nos", calc: "nos" },
      { name: "Perforated Diffuser",      unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "dampers", icon: "🧰", label: "Dampers",
    sub: "Volume / Fire / Smoke", color: "#d29922",
    items: [
      { name: "Volume Control Damper (VCD)", unit: "Nos", calc: "nos" },
      { name: "Opposed Blade Damper",        unit: "Nos", calc: "nos" },
      { name: "Fire Damper",                 unit: "Nos", calc: "nos" },
      { name: "Smoke Damper",                unit: "Nos", calc: "nos" },
      { name: "Motorized Damper",            unit: "Nos", calc: "nos" },
      { name: "Back Draft Damper",           unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "insulation", icon: "🧵", label: "Insulation",
    sub: "Duct / Pipe / Cladding", color: "#56d364",
    items: [
      { name: "Duct Insulation – Nitrile Rubber", unit: "m²", calc: "sqm" },
      { name: "Duct Insulation – Glass Wool",     unit: "m²", calc: "sqm" },
      { name: "Pipe Insulation – Nitrile",        unit: "m",  calc: "len" },
      { name: "Pipe Insulation – Armaflex",       unit: "m",  calc: "len" },
      { name: "Aluminum Cladding",                unit: "m²", calc: "sqm" },
      { name: "Vapor Barrier",                    unit: "m²", calc: "sqm" },
    ],
  },
  {
    id: "pipes", icon: "🔵", label: "Piping – CPVC / GI / PPR",
    sub: "Water Supply & Distribution", color: "#39c5cf",
    items: [
      { name: "CPVC Pipe",     unit: "m", calc: "len" },
      { name: "GI Pipe – Class B", unit: "m", calc: "len" },
      { name: "PPR Pipe",      unit: "m", calc: "len" },
      { name: "UPVC Pipe",     unit: "m", calc: "len" },
      { name: "HDPE Pipe",     unit: "m", calc: "len" },
      { name: "SS Pipe (304)", unit: "m", calc: "len" },
      { name: "Cu Pipe – Type L", unit: "m", calc: "len" },
    ],
  },
  {
    id: "pipe_fit", icon: "🔩", label: "Pipe Fittings",
    sub: "Elbows / Tees / Reducers", color: "#58a6ff",
    items: [
      { name: "Elbow 90°",             unit: "Nos", calc: "nos" },
      { name: "Elbow 45°",             unit: "Nos", calc: "nos" },
      { name: "Tee",                   unit: "Nos", calc: "nos" },
      { name: "Reducer (Concentric)",  unit: "Nos", calc: "nos" },
      { name: "Union",                 unit: "Nos", calc: "nos" },
      { name: "Flange",                unit: "Nos", calc: "nos" },
      { name: "End Cap",               unit: "Nos", calc: "nos" },
      { name: "Coupling",              unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "valves", icon: "🚿", label: "Valves & Strainers",
    sub: "Ball / Gate / Check / NRV", color: "#fb8500",
    items: [
      { name: "Ball Valve",               unit: "Nos", calc: "nos" },
      { name: "Gate Valve",               unit: "Nos", calc: "nos" },
      { name: "Globe Valve",              unit: "Nos", calc: "nos" },
      { name: "Check Valve (NRV)",        unit: "Nos", calc: "nos" },
      { name: "Butterfly Valve",          unit: "Nos", calc: "nos" },
      { name: "Y-Strainer",               unit: "Nos", calc: "nos" },
      { name: "Pressure Reducing Valve",  unit: "Nos", calc: "nos" },
      { name: "Safety Relief Valve",      unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "drainage", icon: "🌊", label: "Drainage & Sewer",
    sub: "Soil / Waste / Storm", color: "#006adb",
    items: [
      { name: "UPVC Soil Pipe",     unit: "m",   calc: "len" },
      { name: "UPVC Waste Pipe",    unit: "m",   calc: "len" },
      { name: "CI Pipe (Soil Stack)",unit:"m",   calc: "len" },
      { name: "Floor Drain / Trap", unit: "Nos", calc: "nos" },
      { name: "Roof Drain",         unit: "Nos", calc: "nos" },
      { name: "Inspection Chamber", unit: "Nos", calc: "nos" },
      { name: "Manhole",            unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "sanitary", icon: "🚽", label: "Sanitary Fixtures",
    sub: "WC / Basin / Urinal", color: "#d2a8ff",
    items: [
      { name: "WC (Close Coupled)",      unit: "Nos", calc: "nos" },
      { name: "WC (Wall Hung)",          unit: "Nos", calc: "nos" },
      { name: "Wash Basin – Counter Top",unit: "Nos", calc: "nos" },
      { name: "Urinal",                  unit: "Nos", calc: "nos" },
      { name: "Kitchen Sink",            unit: "Nos", calc: "nos" },
      { name: "Floor Mounted Trap",      unit: "Nos", calc: "nos" },
      { name: "Water Closet Seat",       unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "conduit", icon: "⚡", label: "Conduit & Trunking",
    sub: "EMT / PVC / Cable Tray", color: "#e3b341",
    items: [
      { name: "PVC Conduit",             unit: "m", calc: "len" },
      { name: "EMT Conduit",             unit: "m", calc: "len" },
      { name: "Flexible Conduit",        unit: "m", calc: "len" },
      { name: "Cable Tray – Perforated", unit: "m", calc: "len" },
      { name: "Cable Tray – Ladder Type",unit: "m", calc: "len" },
      { name: "PVC Trunking",            unit: "m", calc: "len" },
    ],
  },
  {
    id: "cables", icon: "🔌", label: "Cables & Wiring",
    sub: "LV / MV / Control", color: "#f0883e",
    items: [
      { name: "LV Power Cable (Cu / XLPE)", unit: "m", calc: "len" },
      { name: "Control Cable (Multi-core)", unit: "m", calc: "len" },
      { name: "Fire Alarm Cable",           unit: "m", calc: "len" },
      { name: "Data Cable – CAT6",          unit: "m", calc: "len" },
      { name: "Earthing Cable",             unit: "m", calc: "len" },
      { name: "Armoured Cable (SWA)",       unit: "m", calc: "len" },
    ],
  },
  {
    id: "panels", icon: "🗄️", label: "Panels & Equipment",
    sub: "DB / MDB / Switchgear", color: "#ff7b72",
    items: [
      { name: "Main Distribution Board (MDB)", unit: "Nos", calc: "nos" },
      { name: "Sub-Distribution Board (SDB)",  unit: "Nos", calc: "nos" },
      { name: "MCB / MCCB",                    unit: "Nos", calc: "nos" },
      { name: "ACB / RCCB",                    unit: "Nos", calc: "nos" },
      { name: "Isolator",                      unit: "Nos", calc: "nos" },
      { name: "PLC Panel",                     unit: "Nos", calc: "nos" },
      { name: "UPS Panel",                     unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "lighting", icon: "💡", label: "Lighting Fixtures",
    sub: "LED / Emergency / Outdoor", color: "#ffa657",
    items: [
      { name: "LED Panel Light",        unit: "Nos", calc: "nos" },
      { name: "LED Downlight",          unit: "Nos", calc: "nos" },
      { name: "LED Street Light",       unit: "Nos", calc: "nos" },
      { name: "Emergency Light",        unit: "Nos", calc: "nos" },
      { name: "Exit Sign Light",        unit: "Nos", calc: "nos" },
      { name: "Explosion-Proof Light",  unit: "Nos", calc: "nos" },
      { name: "Flood Light",            unit: "Nos", calc: "nos" },
    ],
  },
  {
    id: "fire", icon: "🔴", label: "Fire Protection",
    sub: "Sprinkler / Hydrant / Detection", color: "#f85149",
    items: [
      { name: "Sprinkler Head – Pendant",  unit: "Nos", calc: "nos" },
      { name: "Sprinkler Head – Upright",  unit: "Nos", calc: "nos" },
      { name: "Fire Hydrant (Indoor)",     unit: "Nos", calc: "nos" },
      { name: "Fire Extinguisher",         unit: "Nos", calc: "nos" },
      { name: "Smoke Detector",            unit: "Nos", calc: "nos" },
      { name: "Heat Detector",             unit: "Nos", calc: "nos" },
      { name: "Manual Call Point",         unit: "Nos", calc: "nos" },
      { name: "Alarm Bell / Sounder",      unit: "Nos", calc: "nos" },
      { name: "GI Pipe – Black (Fire Main)",unit: "m",  calc: "len" },
    ],
  },
  {
    id: "pharma", icon: "🧪", label: "Pharma / Cleanroom",
    sub: "HEPA / LAF / Cleanroom", color: "#ff6e96",
    items: [
      { name: "HEPA Filter Box",        unit: "Nos", calc: "nos" },
      { name: "Terminal HEPA Housing",  unit: "Nos", calc: "nos" },
      { name: "Laminar Air Flow (LAF)", unit: "Nos", calc: "nos" },
      { name: "Dynamic Pass Box",       unit: "Nos", calc: "nos" },
      { name: "Static Pass Box",        unit: "Nos", calc: "nos" },
      { name: "DOP Test Port",          unit: "Nos", calc: "nos" },
      { name: "Pressure Tap Point",     unit: "Nos", calc: "nos" },
      { name: "SS Cleanroom Panel",     unit: "m²",  calc: "sqm" },
    ],
  },
  {
    id: "supports", icon: "🔗", label: "Supports & Accessories",
    sub: "Hangers / Brackets / Anchors", color: "#8b949e",
    items: [
      { name: "MS Angle Support", unit: "kg",  calc: "nos" },
      { name: "Threaded Rod",     unit: "Nos", calc: "nos" },
      { name: "Hanger / Clevis", unit: "Nos", calc: "nos" },
      { name: "Anchor Bolt",     unit: "Nos", calc: "nos" },
      { name: "Pipe Clamp",      unit: "Nos", calc: "nos" },
      { name: "Nut & Bolt Set",  unit: "Set", calc: "nos" },
    ],
  },
];

// ─── Compute (all dims in mm → output unit) ────────────────────────────────────
function compute(row) {
  const L = parseFloat(row.L) || 0;
  const W = parseFloat(row.W) || 0;
  const H = parseFloat(row.H) || 0;
  const Q = parseFloat(row.qty) || 1;
  const u = row.unit;
  const c = row.calc;
  const mmToM  = 0.001;
  const mmToFt = 0.00328084;

  if (u === "m²" || u === "ft²") {
    const conv = u === "m²" ? mmToM * mmToM : mmToFt * mmToFt;
    if (c === "round") return L > 0 && W > 0 ? +(Math.PI * W * L * Q * conv).toFixed(4) : null;
    if (L > 0 && W > 0 && H > 0) return +(2 * (W + H) * L * Q * conv).toFixed(4);
    if (L > 0 && W > 0)          return +(L * W * Q * conv).toFixed(4);
    return null;
  }
  if (u === "m" || u === "Lm")  return L > 0 ? +(L * mmToM  * Q).toFixed(3) : (Q > 1 ? +Q : null);
  if (u === "ft")               return L > 0 ? +(L * mmToFt * Q).toFixed(3) : (Q > 1 ? +Q : null);
  return Q > 0 ? +Q : null;
}

function hint(row) {
  const u = row.unit;
  if (u === "m²" || u === "ft²") {
    if (row.calc === "round") return `π×D×L×Q→${u}`;
    return parseFloat(row.H) > 0 ? `2(W+H)×L×Q→${u}` : `L×W×Q→${u}`;
  }
  if (["m", "ft", "Lm"].includes(u)) return `L(mm)→${u}`;
  return "= Qty";
}

let _id = 1;
function newRow(name, unit, calc, catId) {
  return { id: _id++, catId, name, location: "", L: "", W: "", H: "", qty: "", unit, calc, remarks: "" };
}

// ─── Styles (CSS-in-JS object) ─────────────────────────────────────────────────
const T = {
  // colours
  bg:       "#0d1117",
  surface:  "#161b22",
  surface2: "#1c2333",
  border:   "#30363d",
  border2:  "#21262d",
  text:     "#e6edf3",
  muted:    "#7d8590",
  dim:      "#484f58",
  accent:   "#2f81f7",
  green:    "#3fb950",
  red:      "#f85149",
  yellow:   "#e3b341",
};

const S = {
  app: {
    minHeight: "100vh",
    background: T.bg,
    color: T.text,
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    fontSize: 13,
  },
  topbar: {
    position: "sticky", top: 0, zIndex: 100,
    background: "rgba(13,17,23,0.96)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${T.border}`,
    padding: "0 24px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 16, height: 60,
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  brandIcon: {
    width: 36, height: 36, borderRadius: 8,
    background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
  },
  brandName:  { fontSize: 16, fontWeight: 700, letterSpacing: -0.3 },
  brandSub:   { fontSize: 10, color: T.muted, marginTop: 1 },
  topActions: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  pill: {
    background: T.surface2, border: `1px solid ${T.border}`,
    borderRadius: 20, padding: "4px 12px",
    fontSize: 11, color: T.muted, fontFamily: "monospace",
  },
  btnCsv: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "7px 14px", borderRadius: 7, border: "1px solid #2ea043",
    background: "#1a4731", color: "#3fb950",
    fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  btnPdf: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "7px 14px", borderRadius: 7, border: `1px solid #b62324`,
    background: "#3d1616", color: "#f85149",
    fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  body: { maxWidth: 1440, margin: "0 auto", padding: "20px 24px 60px" },
  unitNote: {
    background: "rgba(210,153,34,0.08)", border: "1px solid rgba(210,153,34,0.25)",
    borderRadius: 8, padding: "9px 14px", marginBottom: 14,
    fontSize: 11, color: "#e3b341", display: "flex", alignItems: "center", gap: 8,
  },
  card: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: 10, padding: "16px 20px", marginBottom: 16,
  },
  cardTitle: {
    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: 1.5, color: T.muted, marginBottom: 14,
    display: "flex", alignItems: "center", gap: 7,
  },
  projGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(175px,1fr))", gap: 12 },
  projLabel: { display: "block", fontSize: 10, color: T.muted, marginBottom: 5, fontWeight: 500 },
  projInput: {
    width: "100%", background: T.bg, border: `1px solid ${T.border}`,
    borderRadius: 6, padding: "7px 10px", color: T.text,
    fontFamily: "inherit", fontSize: 12, outline: "none",
    boxSizing: "border-box",
  },
  catBlock: (c) => ({
    border: `1px solid ${c}35`, borderRadius: 10, marginBottom: 12, overflow: "hidden",
  }),
  catHeader: (c) => ({
    background: `linear-gradient(90deg,${c}12,transparent)`,
    padding: "11px 16px", display: "flex", alignItems: "center",
    justifyContent: "space-between", cursor: "pointer", userSelect: "none",
  }),
  tblWrap: { overflowX: "auto", borderTop: `1px solid ${T.border2}` },
  tbl: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: (c) => ({
    padding: "7px 9px", textAlign: "left", fontSize: 10, fontWeight: 600,
    color: T.muted, textTransform: "uppercase", letterSpacing: 0.5,
    whiteSpace: "nowrap", background: T.surface2,
    borderBottom: `1px solid ${c}30`,
  }),
  td: { padding: "5px 7px", borderBottom: `1px solid ${T.border2}`, verticalAlign: "middle" },
  ci: {
    background: T.bg, border: "1px solid transparent", borderRadius: 5,
    padding: "5px 7px", color: T.text, fontFamily: "inherit",
    fontSize: 11, width: "100%", outline: "none", boxSizing: "border-box",
  },
  ciNum: {
    background: T.bg, border: "1px solid transparent", borderRadius: 5,
    padding: "5px 7px", color: T.text, fontFamily: "monospace",
    fontSize: 11, width: "100%", outline: "none", boxSizing: "border-box",
    textAlign: "right",
  },
  sel: {
    background: T.bg, border: `1px solid ${T.accent}`, borderRadius: 5,
    padding: "5px 7px", color: "#93c5fd",
    fontFamily: "inherit", fontSize: 11, width: "100%",
    outline: "none", fontWeight: 700, cursor: "pointer", boxSizing: "border-box",
  },
  delBtn: {
    background: "none", border: "none", color: T.dim,
    fontSize: 14, cursor: "pointer", padding: "2px 6px",
    borderRadius: 4,
  },
  addArea: (c) => ({
    padding: "9px 14px", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
    borderTop: `1px solid ${c}20`,
  }),
  addItemBtn: {
    background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 6,
    padding: "3px 9px", fontSize: 10, color: T.muted, cursor: "pointer",
    fontFamily: "inherit", whiteSpace: "nowrap",
  },
  summGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
    gap: 10, marginTop: 12,
  },
  summCard: (c) => ({
    background: T.surface2, border: `1px solid ${c}30`, borderRadius: 8, padding: "12px 14px",
  }),
  footer: { textAlign: "center", fontSize: 10, color: T.dim, paddingBottom: 20, marginTop: 8 },
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function Row({ row, idx, color, onField, onDel }) {
  const val = compute(row);
  const evenBg = idx % 2 === 0 ? undefined : { background: "rgba(255,255,255,0.012)" };
  return (
    <tr style={evenBg}>
      <td style={{ ...S.td, color: T.dim, fontSize: 10, textAlign: "center", width: 26 }}>{idx + 1}</td>
      <td style={{ ...S.td, minWidth: 160 }}>
        <input style={S.ci} value={row.name} placeholder="Item name"
          onChange={(e) => onField(row.id, "name", e.target.value)} />
      </td>
      <td style={{ ...S.td, minWidth: 120 }}>
        <input style={S.ci} value={row.location} placeholder="Location / Zone"
          onChange={(e) => onField(row.id, "location", e.target.value)} />
      </td>
      {["L", "W", "H"].map((f) => (
        <td key={f} style={{ ...S.td, width: 78 }}>
          <input style={S.ciNum} type="number" value={row[f]} placeholder={`${f} mm`}
            onChange={(e) => onField(row.id, f, e.target.value)} />
        </td>
      ))}
      <td style={{ ...S.td, width: 65 }}>
        <input style={S.ciNum} type="number" value={row.qty} placeholder="Qty"
          onChange={(e) => onField(row.id, "qty", e.target.value)} />
      </td>
      <td style={{ ...S.td, width: 82 }}>
        <select style={S.sel} value={row.unit}
          onChange={(e) => onField(row.id, "unit", e.target.value)}>
          {ALL_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      </td>
      <td style={{ ...S.td, width: 90, textAlign: "right",
        fontFamily: "monospace", fontWeight: 700, fontSize: 12,
        color: val != null ? T.green : T.dim }}>
        {val != null ? val.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}
      </td>
      <td style={{ ...S.td, width: 50, textAlign: "center" }}>
        <span style={{
          fontSize: 9, background: "rgba(47,129,247,0.1)", color: T.accent,
          border: "1px solid rgba(47,129,247,0.2)", borderRadius: 4,
          padding: "1px 5px", fontWeight: 600, whiteSpace: "nowrap",
        }}>{row.unit}</span>
      </td>
      <td style={{ ...S.td, width: 95 }}>
        <span style={{ fontSize: 9, color: T.dim, fontFamily: "monospace", fontStyle: "italic" }}>
          {hint(row)}
        </span>
      </td>
      <td style={{ ...S.td, minWidth: 100 }}>
        <input style={S.ci} value={row.remarks} placeholder="Remarks"
          onChange={(e) => onField(row.id, "remarks", e.target.value)} />
      </td>
      <td style={{ ...S.td, width: 32, textAlign: "center" }}>
        <button style={S.delBtn} onClick={() => onDel(row.id)}>✕</button>
      </td>
    </tr>
  );
}

function CategoryBlock({ cat, rows, open, onToggle, onField, onDel, onAdd }) {
  const catRows = rows.filter((r) => r.catId === cat.id);
  const unitTotals = [...new Set(catRows.map((r) => r.unit))].reduce((acc, u) => {
    const s = catRows.filter((r) => r.unit === u).reduce((sum, r) => sum + (compute(r) || 0), 0);
    if (s > 0) acc.push(`${s.toLocaleString(undefined, { maximumFractionDigits: 3 })} ${u}`);
    return acc;
  }, []);

  const filled = catRows.filter((r) => compute(r) != null).length;

  return (
    <div style={S.catBlock(cat.color)}>
      <div style={S.catHeader(cat.color)} onClick={onToggle}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9" }}>{cat.icon} {cat.label}</span>
          <span style={{ fontSize: 11, color: T.muted }}>{cat.sub}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 10, padding: "2px 9px", borderRadius: 10, fontWeight: 600,
            background: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}35`,
          }}>
            {catRows.length} rows · {filled} filled
          </span>
          {unitTotals.length > 0 && (
            <span style={{ fontSize: 11, color: T.green, fontWeight: 700, fontFamily: "monospace" }}>
              {unitTotals.join("  |  ")}
            </span>
          )}
          <span style={{ color: T.dim, fontSize: 10, transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none" }}>▼</span>
        </div>
      </div>

      {open && (
        <>
          <div style={S.tblWrap}>
            <table style={S.tbl}>
              <thead>
                <tr>
                  {["#","Item Name","Location / Zone","L (mm)","W/D (mm)","H (mm)","Qty","Unit","Result","Out","Formula","Remarks",""].map((h, i) => (
                    <th key={i} style={S.th(cat.color)}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catRows.length === 0 ? (
                  <tr>
                    <td colSpan={13} style={{ padding: 16, textAlign: "center", color: T.dim, fontSize: 11 }}>
                      No rows yet — add items below
                    </td>
                  </tr>
                ) : (
                  <>
                    {catRows.map((row, idx) => (
                      <Row key={row.id} row={row} idx={idx} color={cat.color}
                        onField={onField} onDel={onDel} />
                    ))}
                    {unitTotals.length > 0 && (
                      <tr style={{ background: "rgba(63,185,80,0.07)" }}>
                        <td colSpan={8} style={{ ...S.td, textAlign: "right", paddingRight: 12,
                          color: T.muted, fontSize: 10, fontWeight: 700 }}>SUB-TOTAL →</td>
                        <td colSpan={5} style={{ ...S.td, color: T.green,
                          fontFamily: "monospace", fontSize: 11, fontWeight: 700 }}>
                          {unitTotals.join("  |  ")}
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div style={S.addArea(cat.color)}>
            <span style={{ fontSize: 10, color: T.dim }}>+ Add:</span>
            {cat.items.map((item) => (
              <button key={item.name} style={S.addItemBtn}
                onClick={() => onAdd(item.name, item.unit, item.calc, cat.id)}>
                {item.name}
              </button>
            ))}
            <button style={{ ...S.addItemBtn, color: T.accent, borderColor: `${T.accent}50` }}
              onClick={() => onAdd("", "Nos", "nos", cat.id)}>
              + Custom Row
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [rows, setRows] = useState(() =>
    CATEGORIES.flatMap((cat) =>
      cat.items.slice(0, 1).map((i) => newRow(i.name, i.unit, i.calc, cat.id))
    )
  );
  const [openCats, setOpenCats] = useState(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.id, true]))
  );
  const [proj, setProj] = useState({
    name: "", client: "", site: "", consult: "",
    by: "", date: new Date().toISOString().slice(0, 10), rev: "R0", contract: "",
  });

  const setField = useCallback((id, field, val) =>
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: val } : r)), []);
  const delRow  = useCallback((id) => setRows((prev) => prev.filter((r) => r.id !== id)), []);
  const addRow  = useCallback((name, unit, calc, catId) =>
    setRows((prev) => [...prev, newRow(name, unit, calc, catId)]), []);
  const toggle  = useCallback((id) =>
    setOpenCats((o) => ({ ...o, [id]: !o[id] })), []);

  const totalRows  = rows.length;
  const filledRows = rows.filter((r) => compute(r) != null).length;

  // ── Excel Export ─────────────────────────────────────────────────────────────
  const handleExcel = async () => {
    const XLSX = await loadXLSX();

    const wb = XLSX.utils.book_new();

    // Sheet 1 – Project Info
    const infoData = [
      ["MEP MEASUREMENT SHEET — Professional Edition"],
      ["All dimensional inputs (L, W/D, H) are in MILLIMETRES (mm)"],
      [],
      ["Field", "Value"],
      ["Project Name",  proj.name    || "—"],
      ["Client / Owner",proj.client  || "—"],
      ["Site / Location",proj.site   || "—"],
      ["MEP Consultant", proj.consult|| "—"],
      ["Prepared By",   proj.by      || "—"],
      ["Date",          proj.date    || "—"],
      ["Revision",      proj.rev     || "R0"],
      ["Contract No.",  proj.contract|| "—"],
    ];
    const wsInfo = XLSX.utils.aoa_to_sheet(infoData);
    wsInfo["!cols"] = [{ wch: 20 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, wsInfo, "Project Info");

    // Sheet 2 – Measurement Data
    const header = ["Sr.No","Category","Discipline","Item Name","Location / Zone",
      "L (mm)","W / D (mm)","H (mm)","Qty","Unit","Calculated Result","Remarks"];
    const data = [header];
    let sr = 1;
    CATEGORIES.forEach((cat) => {
      const cr = rows.filter((r) => r.catId === cat.id);
      cr.forEach((r) => {
        const val = compute(r);
        data.push([
          sr++, cat.label, cat.sub, r.name || "—", r.location || "—",
          r.L !== "" ? parseFloat(r.L) : "",
          r.W !== "" ? parseFloat(r.W) : "",
          r.H !== "" ? parseFloat(r.H) : "",
          parseFloat(r.qty) || 1, r.unit,
          val !== null ? val : "", r.remarks || "",
        ]);
      });
      if (cr.length) {
        const units = [...new Set(cr.map((r) => r.unit))];
        units.forEach((u) => {
          const sum = cr.filter((r) => r.unit === u).reduce((s, r) => s + (compute(r) || 0), 0);
          if (sum > 0) data.push(["", "", `SUB-TOTAL: ${cat.label}`, "", "", "", "", "", "", u, sum, ""]);
        });
        data.push([]);
      }
    });
    const wsData = XLSX.utils.aoa_to_sheet(data);
    wsData["!cols"] = [
      { wch: 7 }, { wch: 22 }, { wch: 22 }, { wch: 32 }, { wch: 22 },
      { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 7 }, { wch: 7 }, { wch: 16 }, { wch: 22 },
    ];
    XLSX.utils.book_append_sheet(wb, wsData, "Measurement Data");

    // Sheet 3 – Summary
    const summData = [["Category","Discipline","Total Rows","Filled","Totals by Unit"]];
    CATEGORIES.forEach((cat) => {
      const cr = rows.filter((r) => r.catId === cat.id);
      const filled = cr.filter((r) => compute(r) != null).length;
      const totals = [...new Set(cr.map((r) => r.unit))].map((u) => {
        const s = cr.filter((r) => r.unit === u).reduce((sum, r) => sum + (compute(r) || 0), 0);
        return s > 0 ? `${s.toLocaleString(undefined, { maximumFractionDigits: 3 })} ${u}` : null;
      }).filter(Boolean).join(" | ");
      summData.push([cat.label, cat.sub, cr.length, filled, totals || "—"]);
    });
    const wsSumm = XLSX.utils.aoa_to_sheet(summData);
    wsSumm["!cols"] = [{ wch: 24 }, { wch: 28 }, { wch: 12 }, { wch: 12 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, wsSumm, "Summary");

    const fname = `MEP_Sheet_${(proj.name || "Project").replace(/[^a-z0-9]/gi, "_")}_${proj.date}.xlsx`;
    XLSX.writeFile(wb, fname);
  };

  // ── PDF Export ────────────────────────────────────────────────────────────────
  const handlePDF = () => {
    const p = proj;
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'DM Sans',Arial,sans-serif;font-size:9px;color:#1a1a2e;background:#fff;padding:16px 20px}
      .doc-header{display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #1e3a8a;padding-bottom:11px;margin-bottom:12px}
      .doc-logo{width:42px;height:42px;border-radius:9px;background:linear-gradient(135deg,#1d4ed8,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:22px;margin-right:12px}
      .doc-company{font-size:17px;font-weight:800;color:#1e3a8a;letter-spacing:-0.4px}
      .doc-sub{font-size:8.5px;color:#64748b;margin-top:2px}
      .doc-badge{background:#dbeafe;color:#1e40af;border:1px solid #93c5fd;border-radius:4px;padding:1px 6px;font-size:7.5px;font-weight:700;margin-top:3px;display:inline-block}
      .doc-right{text-align:right;font-size:8px;color:#64748b;line-height:1.6}
      .doc-right strong{color:#1e3a8a;font-size:9.5px;display:block}
      .proj-block{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:7px;padding:9px 12px;margin-bottom:12px}
      .pf{border-right:1px solid #e2e8f0;padding-right:8px}.pf:last-child{border:none}
      .pf-l{font-size:7px;text-transform:uppercase;letter-spacing:.7px;color:#94a3b8;margin-bottom:2px;font-weight:600}
      .pf-v{font-size:9px;font-weight:600;color:#1e293b}
      .note{background:#fffbeb;border-left:3px solid #d97706;padding:5px 9px;margin-bottom:11px;font-size:8px;color:#92400e;border-radius:0 4px 4px 0}
      .sec{margin-bottom:12px;break-inside:avoid}
      .sec-hdr{display:flex;align-items:center;gap:7px;padding:5px 9px;border-radius:5px 5px 0 0}
      .dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
      .sec-name{font-weight:700;font-size:9.5px}
      .sec-sub{font-size:8px;color:#64748b;margin-left:3px}
      table{width:100%;border-collapse:collapse;font-size:8px}
      thead th{padding:4px 6px;text-align:left;font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.3px;border-bottom:1px solid}
      tbody td{padding:3.5px 5px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
      tbody tr:nth-child(even) td{background:#f8fafc}
      .rc{color:#94a3b8;text-align:center;width:22px}
      .nr{text-align:right;font-family:'JetBrains Mono',monospace}
      .vc{text-align:right;font-family:'JetBrains Mono',monospace;font-weight:700}
      .utag{background:#dbeafe;color:#1d4ed8;border-radius:3px;padding:1px 3px;font-size:7px;font-weight:600}
      .strow td{font-weight:700;background:#f0fdf4!important;border-top:1px solid #86efac;font-size:7.5px}
      .summ-hdr{background:#f0f9ff;padding:5px 9px;border-radius:5px 5px 0 0;margin-top:8px}
      .sign{display:flex;justify-content:space-between;margin-top:20px;border-top:1px solid #e2e8f0;padding-top:10px}
      .sbox{width:28%;text-align:center}
      .sline{border-top:1px solid #64748b;margin-top:20px;padding-top:4px;font-size:7.5px;color:#64748b}
      .stitle{font-size:8px;font-weight:600;color:#1e3a8a;margin-bottom:1px}
      .doc-footer{margin-top:12px;border-top:1px solid #e2e8f0;padding-top:5px;display:flex;justify-content:space-between;font-size:7px;color:#94a3b8}
      @media print{body{padding:8px 12px}@page{margin:10mm;size:A4 landscape}}
    `;

    let body = `
    <div class="doc-header">
      <div style="display:flex;align-items:center">
        <div class="doc-logo">🔧</div>
        <div>
          <div class="doc-company">MEP Measurement Sheet</div>
          <div class="doc-sub">Multi-Discipline · HVAC · Plumbing · Electrical · Fire · Cleanroom</div>
          <div class="doc-badge">ALL DIMS IN MILLIMETRES (mm)</div>
        </div>
      </div>
      <div class="doc-right">
        <strong>${p.name || "—"}</strong>
        ${p.client || "—"} · ${p.site || "—"}<br>
        Rev: ${p.rev || "R0"} · ${p.date}<br>
        Contract: ${p.contract || "—"}
      </div>
    </div>
    <div class="proj-block">
      <div class="pf"><div class="pf-l">Project</div><div class="pf-v">${p.name||"—"}</div></div>
      <div class="pf"><div class="pf-l">Client</div><div class="pf-v">${p.client||"—"}</div></div>
      <div class="pf"><div class="pf-l">Site / Location</div><div class="pf-v">${p.site||"—"}</div></div>
      <div class="pf"><div class="pf-l">Consultant</div><div class="pf-v">${p.consult||"—"}</div></div>
      <div class="pf"><div class="pf-l">Prepared By</div><div class="pf-v">${p.by||"—"}</div></div>
      <div class="pf"><div class="pf-l">Date</div><div class="pf-v">${p.date}</div></div>
      <div class="pf"><div class="pf-l">Revision</div><div class="pf-v">${p.rev||"R0"}</div></div>
      <div class="pf" style="border:none"><div class="pf-l">Contract No.</div><div class="pf-v">${p.contract||"—"}</div></div>
    </div>
    <div class="note">⚠️ All dimensional inputs (L, W/D, H) are entered in <strong>MILLIMETRES (mm)</strong>. Results auto-converted to the selected output unit (m², ft², m, ft, etc.).</div>
    `;

    let sr = 1;
    CATEGORIES.forEach((cat) => {
      const cr = rows.filter((r) => r.catId === cat.id);
      if (!cr.length) return;
      body += `
      <div class="sec">
        <div class="sec-hdr" style="background:${cat.color}18">
          <div class="dot" style="background:${cat.color}"></div>
          <span class="sec-name" style="color:${cat.color}">${cat.icon} ${cat.label}</span>
          <span class="sec-sub">— ${cat.sub}</span>
        </div>
        <table>
          <thead style="background:${cat.color}20;color:${cat.color};border-bottom-color:${cat.color}40">
            <tr>
              <th class="rc">#</th>
              <th style="min-width:140px">Item Name</th>
              <th style="min-width:100px">Location / Zone</th>
              <th class="nr" style="width:58px">L (mm)</th>
              <th class="nr" style="width:58px">W/D (mm)</th>
              <th class="nr" style="width:58px">H (mm)</th>
              <th class="nr" style="width:40px">Qty</th>
              <th style="width:38px">Unit</th>
              <th class="vc" style="width:75px">Calculated</th>
              <th style="min-width:90px">Remarks</th>
            </tr>
          </thead>
          <tbody>`;
      cr.forEach((r) => {
        const val = compute(r);
        body += `<tr>
          <td class="rc">${sr++}</td>
          <td>${r.name || "—"}</td>
          <td>${r.location || "—"}</td>
          <td class="nr">${r.L || "—"}</td>
          <td class="nr">${r.W || "—"}</td>
          <td class="nr">${r.H || "—"}</td>
          <td class="nr">${parseFloat(r.qty) || 1}</td>
          <td><span class="utag">${r.unit}</span></td>
          <td class="vc" style="color:${val != null ? "#16a34a" : "#94a3b8"}">
            ${val != null ? val.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}
          </td>
          <td>${r.remarks || ""}</td>
        </tr>`;
      });
      const units = [...new Set(cr.map((r) => r.unit))];
      units.forEach((u) => {
        const sum = cr.filter((r) => r.unit === u).reduce((s, r) => s + (compute(r) || 0), 0);
        if (sum > 0) {
          body += `<tr class="strow">
            <td colspan="8" style="text-align:right;padding-right:9px;color:#065f46">Sub-Total (${u}) →</td>
            <td class="vc" style="color:#16a34a">${sum.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${u}</td>
            <td></td>
          </tr>`;
        }
      });
      body += `</tbody></table></div>`;
    });

    // Grand summary table
    body += `
    <div class="summ-hdr"><span style="font-weight:700;color:#1e3a8a;font-size:9px">📊 Grand Summary</span></div>
    <table>
      <thead style="background:#dbeafe;color:#1e40af;border-bottom-color:#93c5fd">
        <tr><th>Category</th><th>Discipline</th><th>Rows</th><th>Filled</th><th>Totals by Unit</th></tr>
      </thead>
      <tbody>`;
    CATEGORIES.forEach((cat) => {
      const cr = rows.filter((r) => r.catId === cat.id);
      if (!cr.length) return;
      const filled = cr.filter((r) => compute(r) != null).length;
      const totals = [...new Set(cr.map((r) => r.unit))].map((u) => {
        const s = cr.filter((r) => r.unit === u).reduce((sum, r) => sum + (compute(r) || 0), 0);
        return s > 0 ? `${s.toLocaleString(undefined, { maximumFractionDigits: 3 })} ${u}` : null;
      }).filter(Boolean).join(" | ");
      body += `<tr>
        <td style="font-weight:600;color:${cat.color}">${cat.icon} ${cat.label}</td>
        <td>${cat.sub}</td>
        <td class="nr">${cr.length}</td>
        <td class="nr">${filled}</td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:7.5px">${totals || "—"}</td>
      </tr>`;
    });
    body += `</tbody></table>
    <div class="sign">
      <div class="sbox"><div class="stitle">Prepared By</div><div class="sline">${p.by || "_______________"}</div></div>
      <div class="sbox"><div class="stitle">Checked By</div><div class="sline">_______________</div></div>
      <div class="sbox"><div class="stitle">Approved By</div><div class="sline">_______________</div></div>
    </div>
    <div class="doc-footer">
      <span>MEP Measurement Sheet · Professional Edition · All dims in mm · Auto-converted to output unit</span>
      <span>${p.rev || "R0"} · ${p.date} · ${p.contract || "—"}</span>
    </div>`;

    const w = window.open("", "_blank", "width=1100,height=800");
    if (!w) { alert("Please allow popups for PDF export."); return; }
    w.document.write(
      `<!DOCTYPE html><html><head><meta charset="utf-8">` +
      `<title>MEP Sheet – ${p.name || "Project"}</title>` +
      `<style>${css}</style></head><body>${body}</body></html>`
    );
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 800);
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={S.app}>
      {/* Topbar */}
      <div style={S.topbar}>
        <div style={S.brand}>
          <div style={S.brandIcon}>🔧</div>
          <div>
            <div style={S.brandName}>MEP Measurement Sheet</div>
            <div style={S.brandSub}>Multi-discipline · All inputs in mm</div>
          </div>
        </div>
        <div style={S.topActions}>
          <div style={S.pill}>
            <span style={{ color: T.green, fontWeight: 700 }}>{filledRows}</span>
            /{totalRows} rows filled
          </div>
          <button style={S.btnCsv} onClick={handleExcel}>📊 Excel</button>
          <button style={S.btnPdf} onClick={handlePDF}>📄 PDF</button>
        </div>
      </div>

      <div style={S.body}>
        {/* Unit note */}
        <div style={S.unitNote}>
          ⚠️ All dimensional inputs (L, W/D, H) are in{" "}
          <strong>millimetres (mm)</strong>. Results auto-converted to your chosen output unit.
        </div>

        {/* Project Info */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ width: 3, height: 12, background: T.accent, borderRadius: 2, display: "block" }} />
            Project Information
          </div>
          <div style={S.projGrid}>
            {[
              { k: "name",     l: "Project Name",   p: "e.g. MEP Package – Block A" },
              { k: "client",   l: "Client / Owner",  p: "Client company" },
              { k: "site",     l: "Site / Location", p: "Site address" },
              { k: "consult",  l: "MEP Consultant",  p: "Consultant firm" },
              { k: "by",       l: "Prepared By",     p: "Engineer name" },
              { k: "date",     l: "Date",            p: "", t: "date" },
              { k: "rev",      l: "Revision",        p: "R0" },
              { k: "contract", l: "Contract No.",    p: "Contract / PO No." },
            ].map((f) => (
              <div key={f.k}>
                <label style={S.projLabel}>{f.l}</label>
                <input
                  type={f.t || "text"} style={S.projInput}
                  value={proj[f.k]} placeholder={f.p}
                  onChange={(e) => setProj((pp) => ({ ...pp, [f.k]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {CATEGORIES.map((cat) => (
          <CategoryBlock
            key={cat.id} cat={cat} rows={rows}
            open={openCats[cat.id]}
            onToggle={() => toggle(cat.id)}
            onField={setField} onDel={delRow} onAdd={addRow}
          />
        ))}

        {/* Summary */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ width: 3, height: 12, background: T.green, borderRadius: 2, display: "block" }} />
            Summary
          </div>
          <div style={S.summGrid}>
            {CATEGORIES.map((cat) => {
              const cr = rows.filter((r) => r.catId === cat.id);
              const filled = cr.filter((r) => compute(r) != null).length;
              const totals = [...new Set(cr.map((r) => r.unit))].map((u) => {
                const s = cr.filter((r) => r.unit === u).reduce((sum, r) => sum + (compute(r) || 0), 0);
                return s > 0 ? `${s.toLocaleString(undefined, { maximumFractionDigits: 3 })} ${u}` : null;
              }).filter(Boolean).join(", ");
              return (
                <div key={cat.id} style={S.summCard(cat.color)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                    <span>{cat.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: cat.color }}>{cat.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 10, color: T.muted }}>{filled}/{cr.length} rows</span>
                    <span style={{
                      fontFamily: "monospace", fontSize: 13, fontWeight: 800,
                      color: totals ? T.green : T.dim,
                    }}>
                      {totals || "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={S.footer}>
          MEP Measurement Sheet · Professional Edition · All dims in mm
        </div>
      </div>
    </div>
  );
}
