import { useEffect, useRef, useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#04090f;--panel:#08131e;--card:#0c1c2e;--border:rgba(0,200,255,0.12);
  --ice:#00c8ff;--warm:#ff6b2b;--green:#00e87a;--purple:#a78bfa;
  --muted:#4a7090;--text:#d4eaf8;--white:#f0f8ff;
}
body{font-family:'Syne',sans-serif;background:var(--bg);color:var(--text);height:100vh;overflow:hidden;}
.app{display:flex;height:100vh;}

/* SIDEBAR */
.sidebar{
  width:300px;flex-shrink:0;background:var(--panel);
  border-right:1px solid var(--border);display:flex;flex-direction:column;
  overflow-y:auto;
}
.sidebar-top{
  padding:16px 18px;border-bottom:1px solid var(--border);
  display:flex;align-items:center;gap:10px;
}
.logo-box{
  width:32px;height:32px;background:linear-gradient(135deg,#00c8ff,#0055aa);
  border-radius:7px;display:flex;align-items:center;justify-content:center;
  font-family:'Bebas Neue';font-size:13px;color:#fff;letter-spacing:1px;
  box-shadow:0 0 14px rgba(0,200,255,0.3);
}
.logo-name{font-family:'Bebas Neue';font-size:16px;letter-spacing:2px;}
.logo-name span{color:var(--ice);}
.sidebar-body{padding:16px;flex:1;display:flex;flex-direction:column;gap:14px;}
.sec-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.field{display:flex;flex-direction:column;gap:5px;}
.field label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);}
.field input,.field select{
  background:rgba(0,200,255,0.04);border:1px solid rgba(0,200,255,0.15);
  border-radius:7px;padding:8px 11px;color:var(--white);
  font-family:'JetBrains Mono';font-size:12px;outline:none;transition:border 0.2s;
}
.field input:focus,.field select:focus{border-color:var(--ice);}
.field select option{background:var(--panel);}
.input-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.btn-generate{
  width:100%;background:linear-gradient(135deg,#00c8ff,#0066bb);
  color:#fff;border:none;padding:12px;border-radius:9px;
  font-family:'Syne';font-size:13px;font-weight:700;cursor:pointer;
  letter-spacing:0.5px;transition:all 0.2s;box-shadow:0 4px 18px rgba(0,200,255,0.25);
  margin-top:4px;
}
.btn-generate:hover{transform:translateY(-1px);box-shadow:0 6px 26px rgba(0,200,255,0.4);}
.divider{border:none;border-top:1px solid var(--border);margin:4px 0;}
.results-panel{
  background:rgba(0,200,255,0.04);border:1px solid rgba(0,200,255,0.18);
  border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:8px;
}
.rrow{display:flex;justify-content:space-between;align-items:center;}
.rlabel{font-size:11px;color:var(--muted);}
.rval{font-family:'JetBrains Mono';font-size:13px;color:var(--ice);font-weight:500;}

/* LEGEND */
.legend{display:flex;flex-direction:column;gap:6px;}
.leg-row{display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--muted);}
.leg-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0;}

/* CANVAS AREA */
.canvas-wrap{flex:1;position:relative;background:var(--bg);}
canvas{display:block;width:100%!important;height:100%!important;}
.canvas-top{
  position:absolute;top:16px;left:16px;right:16px;
  display:flex;justify-content:space-between;align-items:flex-start;pointer-events:none;
}
.scene-title{
  background:rgba(4,9,15,0.8);backdrop-filter:blur(12px);
  border:1px solid var(--border);border-radius:10px;padding:10px 16px;
}
.scene-title h2{font-family:'Bebas Neue';font-size:20px;letter-spacing:2px;color:var(--white);}
.scene-title p{font-size:11px;color:var(--muted);margin-top:2px;}
.controls-hint{
  background:rgba(4,9,15,0.8);backdrop-filter:blur(12px);
  border:1px solid var(--border);border-radius:10px;padding:10px 14px;
  font-size:11px;color:var(--muted);line-height:1.7;
}
.controls-hint span{color:var(--ice);}
.view-btns{
  position:absolute;bottom:20px;right:20px;display:flex;gap:8px;flex-direction:column;
}
.vbtn{
  background:rgba(4,9,15,0.85);border:1px solid var(--border);
  color:var(--text);padding:8px 14px;border-radius:7px;cursor:pointer;
  font-size:11px;font-weight:600;font-family:'Syne';transition:all 0.2s;
  backdrop-filter:blur(10px);pointer-events:all;
}
.vbtn:hover{border-color:var(--ice);color:var(--ice);}
.badge-row{position:absolute;bottom:20px;left:16px;display:flex;gap:8px;flex-wrap:wrap;}
.badge{
  background:rgba(4,9,15,0.8);border:1px solid var(--border);
  border-radius:6px;padding:5px 10px;font-size:10px;font-weight:700;
  letter-spacing:1px;text-transform:uppercase;
}
`;

/* ── COMPUTE LAYOUT ──────────────────────────────────────────────── */
function computeLayout(p) {
  const L = parseFloat(p.length), W = parseFloat(p.width), H = parseFloat(p.height);
  const ach = parseFloat(p.ach);
  const volM3 = L * W * H;
  const volFt3 = volM3 * 35.3147;
  const cfm = (volFt3 * ach) / 60;
  const cms = cfm * 0.000472;

  // main duct runs along length at ~1/4 width
  const mainW = Math.max(0.3, Math.min(0.6, cfm / 3000));
  const mainH = mainW * 0.6;
  // branches every 3m
  const numBranch = Math.floor(L / 3);
  const branchW = mainW * 0.55;
  const branchH = mainH * 0.55;
  // diffusers
  const diffCols = Math.ceil(L / 4);
  const diffRows = Math.ceil(W / 4);
  const numDiff = diffCols * diffRows;
  const cfmPerDiff = cfm / numDiff;
  return { L, W, H, volM3, cfm, cms, numDiff, cfmPerDiff, mainW, mainH, branchW, branchH, numBranch, ach };
}

/* ── THREE.JS SCENE ──────────────────────────────────────────────── */
function buildScene(THREE, canvas, layout, isDark) {
  const { L, W, H, mainW, mainH, branchW, branchH, numBranch } = layout;

  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04090f);
  scene.fog = new THREE.FogExp2(0x04090f, 0.018);

  // camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  const diagonal = Math.sqrt(L * L + W * W + H * H);
  camera.position.set(L * 0.9, H * 1.6, W * 1.4);
  camera.lookAt(L / 2, H / 2, W / 2);

  // grid
  const grid = new THREE.GridHelper(Math.max(L, W) * 2.5, 20, 0x0a2040, 0x071828);
  grid.position.set(L / 2, 0, W / 2);
  scene.add(grid);

  // ── MATERIALS ──
  const matWall = new THREE.MeshPhysicalMaterial({ color: 0x0d2035, transparent: true, opacity: 0.22, roughness: 0.9, side: THREE.DoubleSide });
  const matFloor = new THREE.MeshPhysicalMaterial({ color: 0x071828, roughness: 0.8, metalness: 0.2 });
  const matMainDuct = new THREE.MeshPhysicalMaterial({ color: 0x00aacc, metalness: 0.7, roughness: 0.25, emissive: 0x003344 });
  const matBranch = new THREE.MeshPhysicalMaterial({ color: 0x008faa, metalness: 0.6, roughness: 0.3, emissive: 0x002233 });
  const matDiff = new THREE.MeshPhysicalMaterial({ color: 0x00e8ff, metalness: 0.4, roughness: 0.2, emissive: 0x004466 });
  const matAHU = new THREE.MeshPhysicalMaterial({ color: 0x1a3a5c, metalness: 0.6, roughness: 0.4 });
  const matAHUAccent = new THREE.MeshPhysicalMaterial({ color: 0x00c8ff, metalness: 0.8, roughness: 0.2, emissive: 0x002244 });
  const matReturn = new THREE.MeshPhysicalMaterial({ color: 0xff6b2b, metalness: 0.5, roughness: 0.35, emissive: 0x331100 });
  const matFlex = new THREE.MeshPhysicalMaterial({ color: 0x4a7a90, metalness: 0.3, roughness: 0.6, transparent: true, opacity: 0.85 });

  const addBox = (mat, x, y, z, w, h, d, castShadow = true) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); m.castShadow = castShadow; m.receiveShadow = true;
    scene.add(m); return m;
  };

  // ── ROOM ──
  // Floor
  addBox(matFloor, L / 2, 0, W / 2, L, 0.05, W, false);
  // Walls (transparent)
  addBox(matWall, L / 2, H / 2, 0, L, H, 0.08, false); // front
  addBox(matWall, L / 2, H / 2, W, L, H, 0.08, false); // back
  addBox(matWall, 0, H / 2, W / 2, 0.08, H, W, false); // left
  addBox(matWall, L, H / 2, W / 2, 0.08, H, W, false); // right
  // Ceiling wireframe
  const ceilEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(L, 0.05, W));
  const ceilLine = new THREE.LineSegments(ceilEdges, new THREE.LineBasicMaterial({ color: 0x1a4060, linewidth: 1 }));
  ceilLine.position.set(L / 2, H, W / 2); scene.add(ceilLine);

  // ── AHU UNIT ──
  const ahuW = Math.max(1.0, L * 0.12), ahuH = Math.max(0.8, H * 0.25), ahuD = Math.max(0.7, W * 0.1);
  const ahuX = 0.3, ahuY = ahuH / 2, ahuZ = W / 2;
  addBox(matAHU, ahuX, ahuY, ahuZ, ahuW, ahuH, ahuD);
  addBox(matAHUAccent, ahuX, ahuY + ahuH / 2 - 0.05, ahuZ, ahuW, 0.06, ahuD); // top strip
  addBox(matAHUAccent, ahuX + ahuW / 2 - 0.04, ahuY, ahuZ, 0.05, ahuH * 0.6, ahuD * 0.6); // face panel
  // AHU label plane
  const ahuGlow = new THREE.PointLight(0x00c8ff, 0.8, 2);
  ahuGlow.position.set(ahuX + 0.5, ahuY + ahuH * 0.4, ahuZ);
  scene.add(ahuGlow);

  // ── MAIN SUPPLY DUCT (runs along X at ceiling) ──
  const ductY = H - mainH / 2 - 0.1;
  const ductZ = W / 2;
  const mainDuctLen = L - ahuX - ahuW / 2;
  addBox(matMainDuct, ahuX + ahuW / 2 + mainDuctLen / 2, ductY, ductZ, mainDuctLen, mainH, mainW);

  // ── RETURN DUCT (at low level, opposite side) ──
  const retH = mainH * 0.75, retW = mainW * 0.75;
  const retY = H * 0.25;
  addBox(matReturn, ahuX + ahuW / 2 + mainDuctLen * 0.4, retY, W - 0.3, mainDuctLen * 0.7, retH, retW);

  // ── BRANCH DUCTS & DIFFUSERS ──
  const branchPositions = [];
  for (let i = 0; i < numBranch; i++) {
    const bx = ahuX + ahuW + 1.5 + i * (mainDuctLen / numBranch);
    if (bx > L - 0.5) continue;
    branchPositions.push(bx);
    // Branch along Z
    const branchLen = W - 1;
    addBox(matBranch, bx, ductY - branchH / 2, W / 2, branchW, branchLen, branchH);

    // Flex drops + Diffusers
    const numDrops = Math.max(2, Math.ceil(W / 3));
    for (let j = 0; j < numDrops; j++) {
      const dz = 1 + j * ((W - 2) / (numDrops - 1 || 1));
      const flexLen = H - ductY + 0.3;
      addBox(matFlex, bx, H - flexLen / 2, dz, 0.12, flexLen, 0.12); // flex duct drop
      addBox(matDiff, bx, 0.05, dz, 0.6, 0.05, 0.6); // diffuser on ceiling level (floor for now, will mirror)
      // Diffuser at ceiling
      const diff = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.6), matDiff);
      diff.position.set(bx, H - 0.04, dz);
      diff.castShadow = true; scene.add(diff);
      // Diffuser glow
      const dLight = new THREE.PointLight(0x00e8ff, 0.3, 1.5);
      dLight.position.set(bx, H - 0.2, dz);
      scene.add(dLight);
    }
  }

  // ── RETURN GRILLES ──
  const retGrillCount = Math.max(2, Math.floor(L / 4));
  for (let i = 0; i < retGrillCount; i++) {
    const gx = 1.5 + i * ((L - 2) / (retGrillCount - 1 || 1));
    addBox(matReturn, gx, H * 0.18, W - 0.08, 0.4, 0.3, 0.06);
  }

  // ── LIGHTS ──
  scene.add(new THREE.AmbientLight(0x0a2040, 1.2));
  const sun = new THREE.DirectionalLight(0x80ccff, 1.5);
  sun.position.set(L * 1.5, H * 2.5, W * 1.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x003355, 0.6);
  fill.position.set(-L, H, -W); scene.add(fill);

  // ── AXES HELPER ──
  const axes = new THREE.AxesHelper(1); axes.position.set(0, 0.1, 0); scene.add(axes);

  // ── ORBIT CONTROLS (manual) ──
  let isDragging = false, lastX = 0, lastY = 0;
  let theta = 0.55, phi = 0.72, radius = diagonal * 1.4;
  const center = new THREE.Vector3(L / 2, H / 2, W / 2);

  const updateCamera = () => {
    camera.position.set(
      center.x + radius * Math.sin(phi) * Math.sin(theta),
      center.y + radius * Math.cos(phi),
      center.z + radius * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(center);
  };
  updateCamera();

  canvas.addEventListener("mousedown", e => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener("mouseup", () => isDragging = false);
  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    theta -= (e.clientX - lastX) * 0.008;
    phi = Math.max(0.15, Math.min(Math.PI * 0.48, phi - (e.clientY - lastY) * 0.006));
    lastX = e.clientX; lastY = e.clientY; updateCamera();
  });
  canvas.addEventListener("wheel", e => {
    radius = Math.max(diagonal * 0.5, Math.min(diagonal * 2.8, radius + e.deltaY * 0.03));
    updateCamera(); e.preventDefault();
  }, { passive: false });

  // Touch
  let lastTouchDist = 0;
  canvas.addEventListener("touchstart", e => {
    if (e.touches.length === 1) { isDragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; }
    if (e.touches.length === 2) lastTouchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
  });
  canvas.addEventListener("touchmove", e => {
    if (e.touches.length === 1 && isDragging) {
      theta -= (e.touches[0].clientX - lastX) * 0.008;
      phi = Math.max(0.15, Math.min(Math.PI * 0.48, phi - (e.touches[0].clientY - lastY) * 0.006));
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; updateCamera();
    }
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      radius = Math.max(diagonal * 0.5, Math.min(diagonal * 2.8, radius - (d - lastTouchDist) * 0.04));
      lastTouchDist = d; updateCamera();
    }
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener("touchend", () => isDragging = false);

  // Resize
  const onResize = () => {
    const w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize); onResize();

  // Animate
  let frameId;
  const clock = new THREE.Clock();
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    // Subtle duct glow pulse
    matDiff.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.15;
    matMainDuct.emissiveIntensity = 0.2 + Math.sin(t * 1.3) * 0.08;
    renderer.render(scene, camera);
  };
  animate();

  return {
    dispose: () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    },
    setView: (v) => {
      if (v === "top") { theta = 0; phi = 0.05; }
      if (v === "front") { theta = 0; phi = Math.PI * 0.45; }
      if (v === "iso") { theta = 0.55; phi = 0.72; }
      if (v === "side") { theta = Math.PI / 2; phi = Math.PI * 0.4; }
      updateCamera();
    }
  };
}

/* ── MAIN COMPONENT ──────────────────────────────────────────────── */
export default function App() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [params, setParams] = useState({ length: 12, width: 8, height: 3.2, ach: 10, ductType: "rect", city: "Delhi" });
  const [layout, setLayout] = useState(null);
  const [threeReady, setThreeReady] = useState(false);
  const [generated, setGenerated] = useState(false);

  const set = k => e => setParams(p => ({ ...p, [k]: e.target.value }));

  // Load Three.js
  useEffect(() => {
    if (window.THREE) { setThreeReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => setThreeReady(true);
    document.head.appendChild(s);
  }, []);

  const generate = () => {
    if (!threeReady || !canvasRef.current) return;
    if (sceneRef.current) sceneRef.current.dispose();
    const ly = computeLayout(params);
    setLayout(ly);
    sceneRef.current = buildScene(window.THREE, canvasRef.current, ly, true);
    setGenerated(true);
  };

  // Auto-generate on load
  useEffect(() => { if (threeReady) generate(); }, [threeReady]);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-top">
            <div className="logo-box">CR</div>
            <div className="logo-name">Cool<span>Rite</span>Engineer</div>
          </div>
          <div className="sidebar-body">
            <div>
              <div className="sec-label">Room Dimensions</div>
              <div className="input-row" style={{ marginBottom: 10 }}>
                <div className="field"><label>Length (m)</label><input type="number" step="0.5" value={params.length} onChange={set("length")} /></div>
                <div className="field"><label>Width (m)</label><input type="number" step="0.5" value={params.width} onChange={set("width")} /></div>
              </div>
              <div className="field"><label>Ceiling Height (m)</label><input type="number" step="0.1" value={params.height} onChange={set("height")} /></div>
            </div>
            <hr className="divider" />
            <div>
              <div className="sec-label">Ventilation</div>
              <div className="field" style={{ marginBottom: 10 }}>
                <label>Air Changes / Hour (ACH)</label>
                <select value={params.ach} onChange={set("ach")}>
                  <option value={6}>6 — Storage</option>
                  <option value={8}>8 — Office (Low)</option>
                  <option value={10}>10 — Commercial</option>
                  <option value={12}>12 — Restaurant</option>
                  <option value={15}>15 — Retail / Mall</option>
                  <option value={20}>20 — Hospital</option>
                  <option value={30}>30 — Pharma GMP</option>
                </select>
              </div>
              <div className="field" style={{ marginBottom: 10 }}>
                <label>Duct Type</label>
                <select value={params.ductType} onChange={set("ductType")}>
                  <option value="rect">Rectangular GI</option>
                  <option value="circ">Circular / Spiral</option>
                  <option value="flex">Flexible Duct</option>
                </select>
              </div>
              <div className="field">
                <label>City</label>
                <select value={params.city} onChange={set("city")}>
                  {["Delhi","Mumbai","Pune","Hyderabad","Chennai","Kolkata","Bangalore"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button className="btn-generate" onClick={generate}>⚡ Generate 3D Layout</button>
            <hr className="divider" />
            {layout && (
              <div className="results-panel">
                <div className="sec-label">Calculated Values</div>
                <div className="rrow"><span className="rlabel">Room Volume</span><span className="rval">{layout.volM3.toFixed(1)} m³</span></div>
                <div className="rrow"><span className="rlabel">Total Airflow</span><span className="rval">{layout.cfm.toFixed(0)} CFM</span></div>
                <div className="rrow"><span className="rlabel">Airflow (m³/s)</span><span className="rval">{layout.cms.toFixed(3)}</span></div>
                <div className="rrow"><span className="rlabel">Design ACH</span><span className="rval">{layout.ach}/hr</span></div>
                <div className="rrow"><span className="rlabel">Supply Diffusers</span><span className="rval">{layout.numDiff} nos.</span></div>
                <div className="rrow"><span className="rlabel">CFM / Diffuser</span><span className="rval">{layout.cfmPerDiff.toFixed(0)}</span></div>
                <div className="rrow"><span className="rlabel">Main Duct Size</span><span className="rval">{(layout.mainW*1000).toFixed(0)}×{(layout.mainH*1000).toFixed(0)} mm</span></div>
                <div className="rrow"><span className="rlabel">Branch Size</span><span className="rval">{(layout.branchW*1000).toFixed(0)}×{(layout.branchH*1000).toFixed(0)} mm</span></div>
              </div>
            )}
            <div>
              <div className="sec-label" style={{ marginBottom: 8 }}>Legend</div>
              <div className="legend">
                <div className="leg-row"><div className="leg-dot" style={{ background: "#0a2a3a", border: "1px solid #1a4060" }} />Room Walls (transparent)</div>
                <div className="leg-row"><div className="leg-dot" style={{ background: "#1a3a5c" }} />AHU Unit</div>
                <div className="leg-row"><div className="leg-dot" style={{ background: "#00aacc" }} />Main Supply Duct</div>
                <div className="leg-row"><div className="leg-dot" style={{ background: "#008faa" }} />Branch Ducts</div>
                <div className="leg-row"><div className="leg-dot" style={{ background: "#4a7a90" }} />Flex Drop Ducts</div>
                <div className="leg-row"><div className="leg-dot" style={{ background: "#00e8ff" }} />Supply Diffusers</div>
                <div className="leg-row"><div className="leg-dot" style={{ background: "#ff6b2b" }} />Return Grilles</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D CANVAS */}
        <div className="canvas-wrap">
          <canvas ref={canvasRef} />
          <div className="canvas-top">
            <div className="scene-title">
              <h2>3D DUCT LAYOUT — {params.city}</h2>
              <p>{params.length}m × {params.width}m × {params.height}m &nbsp;|&nbsp; ACH: {params.ach} &nbsp;|&nbsp; {params.ductType === "rect" ? "Rectangular GI" : params.ductType === "circ" ? "Circular Spiral" : "Flexible"} Duct</p>
            </div>
            <div className="controls-hint">
              <span>🖱 Drag</span> to rotate &nbsp; <span>Scroll</span> to zoom<br />
              <span>Touch</span> pinch to zoom &nbsp; <span>Swipe</span> to rotate
            </div>
          </div>
          <div className="view-btns">
            {sceneRef.current && <>
              <button className="vbtn" onClick={() => sceneRef.current.setView("iso")}>⬛ Isometric</button>
              <button className="vbtn" onClick={() => sceneRef.current.setView("top")}>⬆ Top View</button>
              <button className="vbtn" onClick={() => sceneRef.current.setView("front")}>⬜ Front</button>
              <button className="vbtn" onClick={() => sceneRef.current.setView("side")}>◼ Side</button>
            </>}
          </div>
          <div className="badge-row">
            <span className="badge" style={{ color: "#00c8ff", borderColor: "rgba(0,200,255,0.25)" }}>ASHRAE 62.1</span>
            <span className="badge" style={{ color: "#00e87a", borderColor: "rgba(0,232,122,0.25)" }}>NBC 2016</span>
            <span className="badge" style={{ color: "#a78bfa", borderColor: "rgba(167,139,250,0.25)" }}>SMACNA</span>
            {!threeReady && <span className="badge" style={{ color: "#ff6b2b" }}>Loading Three.js…</span>}
          </div>
        </div>
      </div>
    </>
  );
}
