// productsData.js - Comprehensive Industrial Products Catalog for CoolRite Engineers

import mainImg from "../Assets/GI_DUCT_Manufacturing_Products.jpg";
import soundProof from "../Assets/Sound Proof Insulation.jpg";
import armaflex from "../Assets/Armaflex Cold Insulation Work.jpg";
import kitchenHood from "../Assets/kitchenhood-manufacturing-trading-dubai.jpg";

import as2 from "../Assets/as2.jpg";
import as3 from "../Assets/as3.jpg";
import as4 from "../Assets/as4.jpg";
import as5 from "../Assets/as5.jpg";
import as6 from "../Assets/as6.jpg";
import as7 from "../Assets/as7.jpg";
import as8 from "../Assets/as8.jpg";
import as9 from "../Assets/as9.jpg";
import as10 from "../Assets/as10.jpg";
import as11 from "../Assets/as11.jpg";
import as12 from "../Assets/as12.jpg";

export const productCategories = [
  { id: "all", name: "All Products", icon: "FaThLarge" },
  { id: "hvac", name: "1. Mechanical / HVAC", icon: "FaFan" },
  { id: "electrical", name: "2. Electrical", icon: "FaBolt" },
  { id: "plumbing", name: "3. Plumbing / MEP", icon: "FaWater" },
  { id: "firefighting", name: "4. Fire Fighting", icon: "FaFireExtinguisher" },
  { id: "laser", name: "5. CNC Laser Cutting", icon: "FaCrosshairs" },
  { id: "sheetmetal", name: "6. Sheet Metal Manufacturing", icon: "FaIndustry" }
];

export const allProducts = [
  /* ═══════════════════════════════════════════════════════════════
   * 1. MECHANICAL / HVAC
   * ═══════════════════════════════════════════════════════════════ */
  {
    id: "hvac-1",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "AHU Components",
    shortDesc: "Double skin Air Handling Unit panels, blower sections, cooling coils, and condensate drain pans.",
    image: as6,
    material: "Aluzinc / GI / SS 304",
    thickness: "0.8mm to 2.0mm",
    finish: "Powder Coated / Mill Finish",
    applications: "Pharma plants, commercial buildings, cleanrooms",
    standards: "IS / SMACNA / Eurovent compliant",
    features: [
      "Thermal break double-skin construction with PUF insulation",
      "Corrosion-resistant stainless steel & aluzinc materials",
      "Precision CNC punched fan mounts & access door panels",
      "Vibration-isolated motor and blower mounting frames"
    ]
  },
  {
    id: "hvac-2",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "HVAC Ducting & Fittings",
    shortDesc: "Rectangular, round & spiral galvanised iron (GI) ducting, transitions, plenums & elbows.",
    image: mainImg,
    material: "Galvanised Iron (GI) / Pre-Insulated (PI)",
    thickness: "24G, 22G, 20G, 18G, 16G (0.6mm - 1.6mm)",
    finish: "Zinc Coated 120-275 GSM",
    applications: "Industrial ventilation, air conditioning, pharma HVAC",
    standards: "SMACNA / IS 655 Class A/B/C",
    features: [
      "Factory fabricated with 4-bolt TDF/TDC flange joints",
      "Airtight lock seams minimizing air leakage to <1%",
      "Custom radius elbows, reducers, boots & offset transitions",
      "Reinforced stiffeners for high static pressure systems"
    ]
  },
  {
    id: "hvac-3",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Dampers",
    shortDesc: "Volume control dampers (VCD), motorized fire & smoke dampers, gravity louvers & non-return dampers.",
    image: as4,
    material: "GI Sheet / Aluminium / Stainless Steel",
    thickness: "1.0mm to 1.6mm extruded/formed",
    finish: "Galvanized / Anodized / Powder Coated",
    applications: "HVAC duct balancing, fire safety isolation",
    standards: "UL 555 / CBRI fire rating certified",
    features: [
      "Opposed blade & parallel blade airflow regulation",
      "Thermal fuse link (72°C / 90°C) or motorized spring return actuators",
      "Low air leakage neoprene & silicone blade tip seals",
      "Heavy-duty quadrant lock levers for manual balancing"
    ]
  },
  {
    id: "hvac-4",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Louvers",
    shortDesc: "Weather louvers, acoustic louvers, sand trap louvers & architectural intake/exhaust louvers.",
    image: as7,
    material: "Extruded Aluminium / GI Sheet / SS 304",
    thickness: "1.2mm to 2.5mm",
    finish: "Powder Coated (RAL colors) / Anodized",
    applications: "Plant rooms, exterior building facades, AHU intakes",
    standards: "AMCA 500-L Rain & Wind Resistance",
    features: [
      "Rain defense blade profile preventing water ingress",
      "Bird & insect mesh screens in aluminium/SS",
      "Acoustic insulated blade variants for noise attenuation",
      "Modular design for large structural wall openings"
    ]
  },
  {
    id: "hvac-5",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Diffusers & Grilles",
    shortDesc: "Linear slot diffusers, round ceiling diffusers, double deflection supply & return grilles, jet nozzles.",
    image: as2,
    material: "Extruded Aluminium / Mild Steel",
    thickness: "1.0mm to 1.5mm",
    finish: "Pure White Powder Coated (RAL 9010 / 9016)",
    applications: "Corporate offices, hospitals, auditoriums, malls",
    standards: "ASHRAE 70 / ISO 5219 Airflow Testing",
    features: [
      "Adjustable horizontal & vertical deflection aerofoil blades",
      "Removable core for easy installation and maintenance",
      "Integrated opposed blade damper (OBD) volume controllers",
      "High throw jet nozzles for stadiums and high-ceiling halls"
    ]
  },
  {
    id: "hvac-6",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Filters & Filter Housings",
    shortDesc: "Pre-filters G4, Microvee F7/F9, HEPA filters H13/H14 & Bag-In-Bag-Out (BIBO) housings.",
    image: as5,
    material: "GI / Stainless Steel 304 / 316L",
    thickness: "1.2mm to 2.0mm",
    finish: "Electro-polished / Powder Coated",
    applications: "Pharma cleanrooms, sterile processing, bio-labs",
    standards: "EN 1822 / ISO 16890 / GMP Class A-D",
    features: [
      "Zero-bypass knife-edge gel/gasket seal housings",
      "Differential pressure gauge ports (Magnehelic gauge ready)",
      "High dust holding capacity synthetic & fiberglass media",
      "BIBO containment filter housings for hazardous particulate isolation"
    ]
  },
  {
    id: "hvac-7",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Fan / Ventilation Components",
    shortDesc: "Centrifugal blower housings, axial fan casings, inline duct fans & industrial exhaust hoods.",
    image: kitchenHood,
    material: "Mild Steel / Galvanised Steel / SS 304",
    thickness: "1.6mm to 4.0mm",
    finish: "Epoxy Coated / Hot Dip Galvanized",
    applications: "Industrial fumes, kitchen ventilation, factory exhaust",
    standards: "AMCA 210 / IS 4894 Blower Standards",
    features: [
      "Dynamically balanced aerofoil and backward curved impellers",
      "Vibration isolator spring mounts & flexible duct connectors",
      "Heavy gauge scroll casing with inspection clean-out doors",
      "High temperature smoke extraction ratings (300°C for 2 hrs)"
    ]
  },
  {
    id: "hvac-8",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Acoustic Products",
    shortDesc: "Rectangular & circular duct silencers, sound attenuators, acoustic panels & chiller enclosures.",
    image: soundProof,
    material: "Perforated GI Sheet / Acoustic Rockwool",
    thickness: "0.8mm to 1.5mm casing with 50-100mm infill",
    finish: "Zinc Coated / Powder Coated",
    applications: "Plant rooms, studios, DG sets, HVAC duct attenuation",
    standards: "ASTM E477 / ISO 7235 Sound Attenuation",
    features: [
      "High density sound absorbing mineral wool (48-96 kg/m³)",
      "Non-hygroscopic tissue facing preventing fiber erosion",
      "Low pressure drop aerodynamic splitter baffles",
      "Insertion loss rating from 15 dB to 40 dB across all octaves"
    ]
  },
  {
    id: "hvac-9",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Cleanroom Products",
    shortDesc: "Dynamic/Static Pass Boxes, Laminar Air Flow (LAF) hoods, sterile garment cabinets & cleanroom plenums.",
    image: as12,
    material: "Stainless Steel 304 / 316L (Mirror/Matt Finish)",
    thickness: "1.2mm to 1.5mm",
    finish: "Satin 240 Grit / Mirror Finish",
    applications: "Pharmaceutical manufacturing, biotechnology, semiconductor",
    standards: "US FED STD 209E / ISO 14644-1 (Class 5 to 8)",
    features: [
      "Electromagnetic / Mechanical door interlock system",
      "UV germicidal lighting with interlocking hour meter",
      "Mini-pleat HEPA filter module with DOP test port",
      "Coved internal corners (R20) for easy cleaning and zero dirt accumulation"
    ]
  },
  {
    id: "hvac-10",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Insulation Accessories",
    shortDesc: "Nitrile rubber sheets, XLPE foam, fiberglass tissue, aluminum cladding sheets & vapor barrier tapes.",
    image: armaflex,
    material: "Closed-cell Elastomeric / XLPE / Aluminum 26G",
    thickness: "6mm, 9mm, 13mm, 19mm, 25mm, 32mm, 50mm",
    finish: "Class 0 / Class 1 Fire Retardant",
    applications: "Chilled water piping, duct thermal insulation, boilers",
    standards: "BS 476 Part 6 & 7 / ASTM C534",
    features: [
      "High thermal resistance (low thermal conductivity k-value)",
      "Built-in continuous vapor barrier preventing condensation",
      "Factory laminated aluminum foil (ALUPRO / Reinforced Kraft)",
      "Self-adhesive high bond insulation backing"
    ]
  },
  {
    id: "hvac-11",
    category: "hvac",
    categoryName: "Mechanical / HVAC",
    name: "Supports, Brackets & Accessories",
    shortDesc: "Unistrut channels, threaded rod hangers, clevis hangers, beam clamps & vibration damping isolators.",
    image: as8,
    material: "Mild Steel / Galvanised Steel / SS 304",
    thickness: "2.0mm to 5.0mm (heavy gauge)",
    finish: "Hot Dip Galvanized / Zinc Electroplated",
    applications: "Duct suspension, piping routes, AHU ceiling suspensions",
    standards: "MSS SP-58 / SMACNA Seismic Restraints",
    features: [
      "Heavy load bearing capacity with high safety factor",
      "Continuous slotted C-channel profiles for flexible alignment",
      "Anti-vibration rubber gaskets for acoustic decoupling",
      "Anti-corrosive zinc plating for 15+ years service life"
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
   * 2. ELECTRICAL
   * ═══════════════════════════════════════════════════════════════ */
  {
    id: "elec-1",
    category: "electrical",
    categoryName: "Electrical",
    name: "Electrical Enclosures",
    shortDesc: "IP55/IP65/IP66 sheet metal wall mounting and floor standing electrical enclosures.",
    image: as3,
    material: "CRCA Mild Steel / GI / SS 304",
    thickness: "1.2mm, 1.6mm, 2.0mm",
    finish: "Thermoset Epoxy Polyester Powder Coated (RAL 7035)",
    applications: "Industrial power distribution, control automation, outdoor panels",
    standards: "IEC 60529 / IP65 / IS 13947",
    features: [
      "Polyurethane (PU) continuous liquid gasket for IP66 sealing",
      "Concealed 120-degree hinges with interchangeable door swings",
      "Heavy-duty 3-point latching handle with key lock",
      "Pre-fitted zinc-plated component mounting gear tray"
    ]
  },
  {
    id: "elec-2",
    category: "electrical",
    categoryName: "Electrical",
    name: "Junction Boxes",
    shortDesc: "Custom fabricated terminal junction boxes with pre-punched knockouts and sealing gaskets.",
    image: as10,
    material: "CRCA Sheet Steel / SS 304 / Aluminium",
    thickness: "1.2mm to 1.6mm",
    finish: "Powder Coated / Brushed Stainless",
    applications: "Electrical wiring branches, sensor terminal routing",
    standards: "IP55 / IP65 Weatherproof",
    features: [
      "Captive stainless steel cover screws",
      "Earthing studs provided on body and lid",
      "Internal DIN rail mounting provisions",
      "Cable gland knockouts on top, bottom, and side faces"
    ]
  },
  {
    id: "elec-3",
    category: "electrical",
    categoryName: "Electrical",
    name: "Control Boxes & Desks",
    shortDesc: "PLC control desks, automation consoles, push button stations & mimic operator panels.",
    image: as9,
    material: "CRCA Sheet / SS 304",
    thickness: "1.6mm to 2.5mm",
    finish: "Two-Tone Powder Coated / Industrial Texture",
    applications: "Factory automation, SCADA systems, machinery controls",
    standards: "IS 8623 / IEC 61439 Form 2/3/4",
    features: [
      "Ergonomic angled console desk with gas-spring assisted lids",
      "Laser cut cutouts for HMIs, push buttons, indicators & meters",
      "Removable modular gland plates with foam gaskets",
      "Integrated cooling fan louvers and filter vents"
    ]
  },
  {
    id: "elec-4",
    category: "electrical",
    categoryName: "Electrical",
    name: "Panel Boxes & LT Distribution Boards",
    shortDesc: "Main LT distribution panel enclosures, motor control center (MCC) & power control center (PCC) boxes.",
    image: as11,
    material: "CRCA / High Tensile Steel",
    thickness: "1.6mm, 2.0mm, 2.5mm",
    finish: "7-Tank Pre-treated Powder Coated (RAL 7032 / 7035)",
    applications: "Commercial substations, factory electrical rooms, DG synchronization",
    standards: "IEC 61439-1/2 / Short Circuit withstand tested",
    features: [
      "Modular compartmentalized Form 3b / 4b design",
      "Heavy-duty copper/aluminum busbar chamber support structure",
      "Cable alley and vertical dropper wire management compartments",
      "Lifting eyebolts and heavy channel base frames"
    ]
  },
  {
    id: "elec-5",
    category: "electrical",
    categoryName: "Electrical",
    name: "Meter Boxes",
    shortDesc: "Single phase and 3-phase digital energy meter boxes, multi-metering cabinets with transparent viewing windows.",
    image: as5,
    material: "CRCA Sheet / Polycarbonate Viewing Window",
    thickness: "1.2mm to 1.6mm",
    finish: "Weatherproof Outdoor Powder Coated",
    applications: "Residential societies, commercial complexes, industrial sub-metering",
    standards: "State Electricity Board (SEB) / DISCOM Approved",
    features: [
      "Tamper-proof sealing arrangement with padlock facility",
      "High-impact UV-stabilized polycarbonate window for meter reading",
      "Incoming/outgoing MCB/MCCB isolation partition",
      "Concealed internal wiring and earthing busbar"
    ]
  },
  {
    id: "elec-6",
    category: "electrical",
    categoryName: "Electrical",
    name: "Cable Trays (Perforated & Ladder)",
    shortDesc: "Heavy-duty perforated, ladder type, and wire mesh cable management trays.",
    image: as8,
    material: "Galvanised Iron / Mild Steel / SS 304 / Aluminium",
    thickness: "1.2mm, 1.5mm, 2.0mm, 2.5mm, 3.0mm",
    finish: "Pre-Galvanized / Hot Dip Galvanized (BS EN ISO 1461) / Powder Coated",
    applications: "Power cable routing, IT data cables, industrial plants",
    standards: "NEMA VE-1 / IEC 61537 / IS 1079",
    features: [
      "High load bearing capacity over 1.5m to 3.0m support spans",
      "Smooth rounded edges protecting cable insulation from snagging",
      "Engineered ventilation slots for heat dissipation of power lines",
      "Standard 2.5m and 3.0m length segments with pre-punched connector holes"
    ]
  },
  {
    id: "elec-7",
    category: "electrical",
    categoryName: "Electrical",
    name: "Cable Tray Fittings",
    shortDesc: "Horizontal 90° bends, vertical inside/outside risers, tees, crosses, reducers & coupler plates.",
    image: as4,
    material: "Pre-Galvanised / Hot Dip Galvanised Steel",
    thickness: "1.2mm to 2.5mm",
    finish: "Hot Dip Galvanised / Zinc Plated",
    applications: "Cable tray routing changes, vertical risers, elevation drops",
    standards: "IEC 61537 Cable Management",
    features: [
      "Precision radius design maintaining permissible cable bending radius",
      "Easy bolt-on installation with standard fish plates & carriage bolts",
      "Available in matching widths from 50mm to 1000mm",
      "Pre-fabricated cover fittings for weather and dust protection"
    ]
  },
  {
    id: "elec-8",
    category: "electrical",
    categoryName: "Electrical",
    name: "Mounting Plates & Sub-Panels",
    shortDesc: "Galvanized and powder-coated gear trays, internal partition barriers, and DIN rail mounting plates.",
    image: as2,
    material: "Galvanised Steel / CRCA Steel",
    thickness: "1.5mm, 2.0mm, 2.5mm, 3.0mm",
    finish: "Electro-Galvanized (Yellow/White Passivation)",
    applications: "Inside electrical panels, control panels, switchgear mounting",
    standards: "IS 513 / RoHs Compliant",
    features: [
      "High rigidity with folded 4-side perimeter stiffener ribs",
      "Grid marked pre-punched holes for flexible component mounting",
      "Heavy load support for contactors, transformers, and VFD drives",
      "Direct grounding conductive connection"
    ]
  },
  {
    id: "elec-9",
    category: "electrical",
    categoryName: "Electrical",
    name: "DB / Panel Enclosures",
    shortDesc: "Modular distribution boards, consumer units, and outdoor feeder pillars.",
    image: as3,
    material: "CRCA Sheet Steel",
    thickness: "1.2mm to 1.6mm",
    finish: "Powder Coated Off-White / Light Grey",
    applications: "Lighting distribution, power socket circuits, floor DBs",
    standards: "IS 8623 / IEC 60439",
    features: [
      "Reversible double door design (inner acrylic shield / outer metal door)",
      "Insulated busbar system with high short circuit capacity",
      "Adjustable depth pan assembly for simple breaker alignment",
      "Ample cabling space for top/bottom conduit entries"
    ]
  },
  {
    id: "elec-10",
    category: "electrical",
    categoryName: "Electrical",
    name: "Instrument Boxes",
    shortDesc: "Protective sheet metal enclosures for pressure transmitters, flow meters, sensors, and recorders.",
    image: as6,
    material: "Stainless Steel 304 / 316 / CRCA Steel",
    thickness: "1.2mm to 1.5mm",
    finish: "PU Painted / Glass Bead Blasted",
    applications: "Process industries, chemical plants, boiler houses",
    standards: "IP65 / Flameproof Ex-d compatible housings",
    features: [
      "Front toughened glass display viewing window",
      "Sunshade canopy roof for outdoor process installations",
      "Neoprene gasket sealing against moisture, chemical vapors, and dust",
      "Internal 2-inch pipe mounting bracket assembly"
    ]
  },
  {
    id: "elec-11",
    category: "electrical",
    categoryName: "Electrical",
    name: "Machine & Equipment Housings",
    shortDesc: "Custom built heavy sheet metal protective housings and enclosures for industrial machinery controllers.",
    image: as11,
    material: "CRCA Mild Steel / SS 304",
    thickness: "1.6mm to 3.0mm",
    finish: "Industrial Polyurethane / Epoxy Powder Coated",
    applications: "CNC machinery, packaging machines, textile equipment",
    standards: "CE Mark Safety Directives / ISO 9001",
    features: [
      "Custom laser cut vents with replaceable dust filter elements",
      "Removable lift-off side and rear maintenance panels",
      "Reinforced base skid frame for vibration dampening",
      "Integrated cable management ducting channels"
    ]
  },
  {
    id: "elec-12",
    category: "electrical",
    categoryName: "Electrical",
    name: "Custom Electrical Sheet-Metal Parts",
    shortDesc: "Busbar support clamps, wire ducts, DIN brackets, terminal covers, and cable gland plates.",
    image: as7,
    material: "Copper, Aluminium, Brass, CRCA, SS",
    thickness: "0.8mm to 6.0mm",
    finish: "Tin Plated / Silver Plated / Zinc Plated / Powder Coated",
    applications: "OEM electrical panel builders, switchgear manufacturing",
    standards: "Custom engineering as per CAD drawings",
    features: [
      "High precision CNC punching and press brake bending",
      "Clinch nut and stud welding integration",
      "Deburred and chamfered edges preventing electrical shorts",
      "Batch production with 100% dimensional tolerance compliance"
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
   * 3. PLUMBING / MEP
   * ═══════════════════════════════════════════════════════════════ */
  {
    id: "plumb-1",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Pipe Supports",
    shortDesc: "Heavy-duty base supports, saddle clamps, roller pipe chairs, and adjustable pipe pedestals.",
    image: as9,
    material: "Carbon Steel / Mild Steel / Hot Dip Galvanised",
    thickness: "4.0mm to 10.0mm",
    finish: "Hot Dip Galvanised / Red Oxide Primer",
    applications: "Chilled water piping, steam lines, plumbing risers",
    standards: "MSS SP-58 / MSS SP-69 Type 24/26",
    features: [
      "Supports pipe sizes from 15mm NB to 600mm NB (1/2\" to 24\")",
      "Thermal expansion roller bearings for hot/cold pipe movement",
      "Height adjustable threaded jack mechanism for precision leveling",
      "Heavy channel and I-beam structural base plates"
    ]
  },
  {
    id: "plumb-2",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Pipe Clamps",
    shortDesc: "Rubber lined EPDM split clamps, heavy duty riser clamps, U-bolts & beam clamps.",
    image: as4,
    material: "Mild Steel / Galvanised Steel / SS 304",
    thickness: "2.0mm to 5.0mm",
    finish: "Electro-Galvanized (8-12 microns) / HDG",
    applications: "Plumbing drainage, water supply, HVAC condenser lines",
    standards: "DIN 4109 (Acoustic De-coupling)",
    features: [
      "EPDM rubber lining absorbs vibration and reduces noise up to 18 dB",
      "Side locking screws with captive plastic washers",
      "Dual threaded M8/M10 connection nut for hanging rod flexibility",
      "High tensile yield strength resisting pipe surge loads"
    ]
  },
  {
    id: "plumb-3",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Brackets (MEP Structural)",
    shortDesc: "Cantilever arm brackets, triangular wall supports, 45° gusset brackets, and framing channels.",
    image: as8,
    material: "Structural Mild Steel (IS 2062 Grade)",
    thickness: "2.5mm to 6.0mm",
    finish: "Hot Dip Galvanized / Epoxy Paint",
    applications: "Wall mounted pipe racks, cable tray runs, duct supports",
    standards: "BS 6946 / IS 800 Structural Standards",
    features: [
      "Welded channel base with slotted anchor hole fixing",
      "Engineered for high moment and cantilever shear loads",
      "Pre-punched channel slots for direct clamp attachments",
      "Available in standard lengths from 150mm to 1000mm"
    ]
  },
  {
    id: "plumb-4",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Hangers (Clevis & Swivel)",
    shortDesc: "Adjustable clevis pipe hangers, swivel ring hangers, teardrop band hangers & pear hangers.",
    image: as10,
    material: "Carbon Steel / Pre-Galvanized Steel",
    thickness: "2.0mm to 4.0mm",
    finish: "Zinc Plated / Hot Dip Galvanized",
    applications: "Suspended overhead piping, drainage lines, HVAC water pipes",
    standards: "MSS SP-58 Type 1 / UL Listed",
    features: [
      "Vertical height adjustment after pipe installation",
      "Hinged bottom bolt allowing easy pipe laying without disassembling",
      "Prevents pipe displacement under thermal movement",
      "Compatible with M8, M10, M12, M16 threaded rods"
    ]
  },
  {
    id: "plumb-5",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Sleeves (Wall & Floor Penetration)",
    shortDesc: "Galvanized and mild steel pipe passing sleeves, puddle flanges & core penetration collars.",
    image: as5,
    material: "GI Pipe / MS Seamless Pipe / SS 304",
    thickness: "2.0mm to 4.5mm (Class B / Class C)",
    finish: "Hot Dip Galvanised / Bitumen Coated",
    applications: "Slab and wall pipe penetrations, basement retaining walls",
    standards: "NBC / IS 1239 / ASTM A53",
    features: [
      "Continuous welded center water-stop puddle flange ring",
      "Allows pipe thermal movement while ensuring watertight seal",
      "Smooth internal bore preventing pipe jacket damage",
      "Available in lengths matching slab/wall thicknesses (100mm to 600mm)"
    ]
  },
  {
    id: "plumb-6",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Cover Plates & Escutcheons",
    shortDesc: "Architectural floor and wall escutcheon flange cover plates in stainless steel and chrome finish.",
    image: as2,
    material: "Stainless Steel 304 / Chrome Plated Brass",
    thickness: "0.8mm to 1.2mm",
    finish: "Mirror Polished / Satin Brushed / Chrome Plated",
    applications: "Cleanroom pipe wall penetrations, luxury hotel plumbing",
    standards: "Pharma GMP Cleanroom Finishes",
    features: [
      "Split two-piece design with snap-lock tabs for retrofitting",
      "Beveled edge profile concealing rough core drill holes",
      "Tight silicone gasket seal preventing air and pest infiltration",
      "Corrosion-proof against aggressive cleaning detergents"
    ]
  },
  {
    id: "plumb-7",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Access Panels (Drywall & Ceiling)",
    shortDesc: "Flush metal access doors, gypsum-insert ceiling panels, and inspection hatches for MEP valves.",
    image: as12,
    material: "Galvanised Steel / Aluminium Extrusion",
    thickness: "1.0mm to 1.5mm",
    finish: "Powder Coated White / Paint-Ready",
    applications: "Ceiling MEP valves, drywall plumbing shafts, electrical risers",
    standards: "Acoustic / Fire rated options available",
    features: [
      "Touch-latch push-to-open or screwdriver cam lock mechanisms",
      "Concealed pivot pin hinges with 120° opening angle",
      "Removable door leaf for unobstructed full cavity access",
      "Perimeter acoustic and dust seal gasket"
    ]
  },
  {
    id: "plumb-8",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Drain & Utility Covers",
    shortDesc: "Stainless steel perforated floor drains, cleanouts, trench drain grates & heavy duty sump covers.",
    image: as7,
    material: "Stainless Steel 304 / 316 / Cast Iron / MS",
    thickness: "2.0mm to 6.0mm",
    finish: "Electro-polished / Hot Dip Galvanized",
    applications: "Pharma production halls, commercial kitchens, plant rooms",
    standards: "EN 1253 / ASME A112.6.3",
    features: [
      "Laser cut anti-slip slotted and perforated patterns",
      "Integrated removable sediment collection basket and water seal trap",
      "Heavy wheel load ratings up to Class C 250 kN",
      "Chemical and acid resistant stainless steel construction"
    ]
  },
  {
    id: "plumb-9",
    category: "plumbing",
    categoryName: "Plumbing / MEP",
    name: "Custom Plumbing Supports",
    shortDesc: "Manifold distribution headers, pump vibration base skids, expansion loop guides & riser anchors.",
    image: as11,
    material: "IS 2062 Grade Steel / Seamless Pipe",
    thickness: "Heavy Structural Gauge (4mm - 12mm)",
    finish: "Epoxy Primer & Polyurethane Topcoat",
    applications: "Plumbing pump houses, central heating manifolds, boiler feeds",
    standards: "Custom engineering as per MEP consultant drawings",
    features: [
      "Precision fabricated flanged nozzle outlets with NDT tested welds",
      "Calculated load bearing for hydraulic thrust and water hammer shock",
      "Inertia base frames filled with concrete for heavy pump dampening",
      "Complete assembly with anchor bolts and isolation pads"
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
   * 4. FIRE FIGHTING
   * ═══════════════════════════════════════════════════════════════ */
  {
    id: "fire-1",
    category: "firefighting",
    categoryName: "Fire Fighting",
    name: "Fire Pipe Supports & Hangers",
    shortDesc: "Heavy duty UL/FM listed clevis hangers, loop hangers, beam clamps & riser pipe clamps.",
    image: as9,
    material: "High Tensile Carbon Steel",
    thickness: "2.5mm to 6.0mm",
    finish: "Zinc Electroplated / Red Epoxy Powder Coated",
    applications: "Fire sprinkler networks, hydrant mains, foam deluge systems",
    standards: "NFPA 13 / UL 203 / FM 1951 Approved",
    features: [
      "Tested to withstand 5 times the weight of water-filled pipe + 250 lbs",
      "Knurled swivel nut for rapid single-handed height adjustments",
      "Locknut fastening preventing loosening under seismic vibrations",
      "Red signal powder coating for quick inspection compliance"
    ]
  },
  {
    id: "fire-2",
    category: "firefighting",
    categoryName: "Fire Fighting",
    name: "Fire Brackets & Seismic Sway Braces",
    shortDesc: "Lateral and longitudinal seismic sway brace attachments, structural beam clamps & wall cantilever brackets.",
    image: as8,
    material: "Ductile Iron / Forged Steel / Structural MS",
    thickness: "4.0mm to 8.0mm",
    finish: "Hot Dip Galvanised / Red Powder Coated",
    applications: "Seismic restraint of fire lines, high-rise building risers",
    standards: "NFPA 13 Seismic Chapter / FM 1950",
    features: [
      "Rigid multi-angle clamping to structural I-beams and concrete ceilings",
      "Shear bolt heads that snap off at designated torque for foolproof inspection",
      "Universal design for pipe sizes from 25mm to 200mm (1\" to 8\")",
      "Restrains dynamic shock loads during water hammer and earth tremors"
    ]
  },
  {
    id: "fire-3",
    category: "firefighting",
    categoryName: "Fire Fighting",
    name: "Equipment Mounting Plates",
    shortDesc: "Fire pump base plates, jockey pump mounting skids, diesel engine controller brackets & valve stands.",
    image: as3,
    material: "Heavy Structural Steel (IS 2062)",
    thickness: "6.0mm to 16.0mm base plates",
    finish: "Fire Red (RAL 3000) Polyurethane Coated",
    applications: "Fire pump houses, hydropneumatic pressure systems",
    standards: "TAC / NBC / NFPA 20 Standards",
    features: [
      "CNC milled and drilled for precision pump and motor shaft alignment",
      "Grout holes and leveling screw provisions for rigid concrete anchoring",
      "Vibration dampening ribbed structural reinforcement",
      "Resistant to high torque motor start vibrations"
    ]
  },
  {
    id: "fire-4",
    category: "firefighting",
    categoryName: "Fire Fighting",
    name: "Fire-Rated Enclosure Components",
    shortDesc: "Fire hose reel cabinets, fire extinguisher boxes, breeching inlet enclosures & hydrant valve covers.",
    image: as6,
    material: "CRCA Mild Steel / Stainless Steel 304",
    thickness: "1.2mm, 1.6mm, 2.0mm",
    finish: "Signal Red (RAL 3000) High Gloss Epoxy Polyester Powder Coated",
    applications: "Commercial towers, industrial plants, shopping malls, airports",
    standards: "IS 884 / IS 5290 / BS 5041",
    features: [
      "Full metal door or wire-mesh / break-glass key viewing window",
      "180-degree swinging hose reel bracket arm",
      "Stainless steel slam-catch lock and chrome-plated hinges",
      "Weatherproof outdoor canopy models with continuous rubber door seals"
    ]
  },
  {
    id: "fire-5",
    category: "firefighting",
    categoryName: "Fire Fighting",
    name: "Fire-Rated Access Panels",
    shortDesc: "1-Hour and 2-Hour fire-rated certified access doors for drywall and masonry fire shafts.",
    image: as12,
    material: "Galvanised Steel with Ceramic Fiber Infill",
    thickness: "1.5mm casing with 40mm fire insulation",
    finish: "Intumescent Powder Coated / Paint Grade",
    applications: "Fire riser shafts, smoke exhaust duct dampers, hotel corridors",
    standards: "BS 476 Part 22 / IS 3614 / UL 10B Fire Test (2 Hours)",
    features: [
      "Self-expanding intumescent perimeter seals expand 20x under heat to block smoke",
      "Self-closing spring-assisted concealed heavy pivot hinges",
      "Keyed master security cam lock mechanism",
      "Insulated door leaf maintains cool unexposed face temperature"
    ]
  },
  {
    id: "fire-6",
    category: "firefighting",
    categoryName: "Fire Fighting",
    name: "Custom Fabricated Fire Components",
    shortDesc: "2-way and 4-way breeching inlet headers, test header manifolds, foam tank skids & sprinkler risers.",
    image: as11,
    material: "Seamless Carbon Steel (ASTM A106 / IS 1239 Heavy)",
    thickness: "Class C Heavy Gauge",
    finish: "Hydrostatic Tested & Fire Red Epoxy Coated",
    applications: "Fire fighting pump house manifolds, deluge valve headers",
    standards: "Hydrostatically pressure tested to 25 bar (350 psi)",
    features: [
      "CNC cut branch nozzles with certified 100% full-penetration welding",
      "Victaulic grooved ends or ANSI B16.5 class 150/300 flanged connections",
      "Pre-welded pressure gauge, flow switch, and drain valve outlets",
      "Supplied with manufacturer test certificate and third-party inspection"
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
   * 5. CNC LASER CUTTING
   * ═══════════════════════════════════════════════════════════════ */
  {
    id: "laser-1",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "MS Laser Cutting",
    shortDesc: "High precision fiber laser cutting of Mild Steel (MS) sheets & heavy plates up to 20mm thickness.",
    image: as4,
    material: "Mild Steel (IS 2062, CRCA, HRCA, Corten)",
    thickness: "0.5mm to 20.0mm",
    finish: "Clean Burr-Free Cut Edge, Ready for Welding/Bending",
    applications: "Industrial machinery, automotive chassis, heavy structural fabrications",
    standards: "ISO 9013 Thermal Cutting Class 1 / Tolerance ±0.05mm",
    features: [
      "Nitrogen & Oxygen high-pressure cutting for dross-free edge finish",
      "Ultra-fine kerf width minimizing material waste with auto-nesting software",
      "Perforations, intricate contour geometries, and small hole piercing (0.5x thickness)",
      "High speed batch production with optical positioning cameras"
    ]
  },
  {
    id: "laser-2",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "GI Laser Cutting",
    shortDesc: "Precision Galvanised Iron (GI) laser cutting with zero zinc burning and oxide-free edges.",
    image: mainImg,
    material: "Galvanised Iron (GI) Sheets (GP / GC)",
    thickness: "0.6mm to 4.0mm",
    finish: "Clean Zinc-Preserved Cut Edges",
    applications: "HVAC duct fittings, electrical enclosures, cable trays, bracketry",
    standards: "Zero-Dross Nitrogen Assist Cutting",
    features: [
      "High frequency fiber laser pulse technology prevents zinc vapor disruption",
      "Retains galvanizing layer protection right to the cut perimeter",
      "Fast lead times for HVAC duct transitions, flanges, and louvers",
      "CAD-to-machine direct execution from DXF/DWG files"
    ]
  },
  {
    id: "laser-3",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "SS Laser Cutting",
    shortDesc: "Stainless Steel 304, 316, and 316L fiber laser cutting with pure nitrogen assist for mirror-smooth edges.",
    image: as10,
    material: "Stainless Steel 304, 304L, 316, 316L, 430",
    thickness: "0.5mm to 12.0mm",
    finish: "Bright, Oxide-Free Nitrogen Cut (No Pickling Needed)",
    applications: "Pharma cleanrooms, food processing, architectural facades, chemical tanks",
    standards: "Pharma GMP Grade / Dairy Standard 3-A",
    features: [
      "100% oxide-free shiny edge suitable for direct orbital welding",
      "Special protective film laser piercing capability without peeling plastic coating",
      "Smooth micro-finish with no heat distortion on thin decorative sheets",
      "Tight dimensional tolerances ±0.03mm for mechanical parts"
    ]
  },
  {
    id: "laser-4",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Aluminium Laser Cutting",
    shortDesc: "Burr-free, non-reflective laser cutting of Aluminium alloys (1xxx, 3xxx, 5xxx, 6xxx series).",
    image: as2,
    material: "Aluminium Sheets & Plates (Alloy 1050, 3003, 5052, 6061, 6082)",
    thickness: "0.8mm to 10.0mm",
    finish: "Burr-Free, Smooth Edge",
    applications: "Aerospace brackets, EV battery enclosures, heat sinks, architectural panels",
    standards: "High-Beam Quality Solid-State Fiber Laser",
    features: [
      "Anti-reflection optical technology prevents laser back-scatter damage",
      "High edge perpendicularity and roundness on tapped hole pilot piercings",
      "Excellent surface finish for subsequent anodizing or powder coating",
      "Lightweight components for transport and electrical busbars"
    ]
  },
  {
    id: "laser-5",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Custom Profile Cutting",
    shortDesc: "Complex mathematical curves, interlocking tab-and-slot designs, and artistic patterns.",
    image: as7,
    material: "MS, SS, GI, Aluminium, Brass, Copper",
    thickness: "0.5mm to 20.0mm",
    finish: "Precision Edge Profiling",
    applications: "Architectural decorative screens, gear teeth, specialized gaskets, logos",
    standards: "Direct CNC conversion from Vector CAD (.DXF, .DWG, .AI, .STEP)",
    features: [
      "Micro-joint placement for secure extraction of tiny precision components",
      "Tab-and-slot self-aligning 3D assembly design ready",
      "Continuous contouring with zero stop-start burn marks on sharp corners",
      "Full capability for bevel cuts and chamfer profiles"
    ]
  },
  {
    id: "laser-6",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Plates & Base Plates",
    shortDesc: "Structural base plates, anchor plates, column footings, and gusset connection plates.",
    image: as9,
    material: "Mild Steel IS 2062 Grade E250 / E350",
    thickness: "3.0mm to 20.0mm",
    finish: "Deburred, Shot Blasted / Primer Coated",
    applications: "Building columns, heavy machinery footings, pipe rack supports",
    standards: "IS 2062 / ASTM A36",
    features: [
      "Slotted anchor bolt holes cut with precision for site adjustment ease",
      "Centerline and alignment markings engraved directly by laser",
      "Heavy load bearing capacity with zero thermal deformation",
      "Beveled edge preparation for heavy structural full-penetration welding"
    ]
  },
  {
    id: "laser-7",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Laser Cut Brackets",
    shortDesc: "Multi-axis folded structural brackets, motor mounting feet & reinforced angle supports.",
    image: as8,
    material: "MS / GI / SS 304",
    thickness: "1.5mm to 8.0mm",
    finish: "Zinc Plated / Powder Coated / Raw",
    applications: "HVAC equipment mounts, electrical panel framing, conveyor brackets",
    standards: "CNC Laser Cut + CNC Press Brake Synchronized",
    features: [
      "Cut and formed under one roof with high repeatability",
      "Embossed stiffening ribs for maximum load-to-weight ratio",
      "Counterbore and countersunk screw holes cut directly",
      "Batch serialized laser part numbering on request"
    ]
  },
  {
    id: "laser-8",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Flanges (Duct & Pipe)",
    shortDesc: "Companion flanges, slip-on pipe flanges, duct connection rings & blanking blind flanges.",
    image: as5,
    material: "MS Plate / SS 304 / Galvanised Steel",
    thickness: "2.0mm to 16.0mm",
    finish: "Machined Face / Laser Cut",
    applications: "HVAC circular ducts, industrial exhaust stacks, piping manifolds",
    standards: "ANSI B16.5 / BS 4504 / DIN 2501 / SMACNA Flanges",
    features: [
      "Accurate pitch circle diameter (PCD) bolt hole laser positioning",
      "Concentric inner bore matching standard pipe and duct sizes",
      "Weld-ready neck preparation with smooth outer perimeter",
      "Custom non-standard rectangular and oval flange geometries"
    ]
  },
  {
    id: "laser-9",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Perforated & Decorative Panels",
    shortDesc: "Custom pattern perforated acoustic panels, ventilation grilles, and architectural facade screens.",
    image: as12,
    material: "Aluminium / SS 304 / GI / MS",
    thickness: "0.8mm to 3.0mm",
    finish: "Anodized / PVDF Coated / Powder Coated",
    applications: "Acoustic ceiling panels, building facades, radiator grilles, partition screens",
    standards: "Custom Free Air Ratio (FAR) from 15% to 65%",
    features: [
      "Geometric, hexagonal, square, round, and parametric custom perforations",
      "Solid border margins around panel edges for secure frame attachment",
      "Flatness leveling to prevent oil-canning and bowing",
      "Integrated hanging slots and folded edge returns"
    ]
  },
  {
    id: "laser-10",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Machine Covers & Safety Guards",
    shortDesc: "Safety interlock machine covers, mesh inspection windows, and protective belt/chain shrouds.",
    image: as3,
    material: "Mild Steel / Stainless Steel / Clear Polycarbonate Hybrid",
    thickness: "1.2mm to 3.0mm",
    finish: "Safety Yellow (RAL 1023) / Textured Black",
    applications: "Factory machinery safety, packaging equipment, rotary motor guards",
    standards: "OSHA 1910.212 / ISO 14120 Machine Guarding",
    features: [
      "Laser slotted ventilation slots sized to prevent human finger reach to hazards",
      "Quick release captive quarter-turn fasteners for rapid maintenance",
      "Hinged inspection access doors with microswitch mounting brackets",
      "Heavy duty structural rigidity against accidental impacts"
    ]
  },
  {
    id: "laser-11",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Motor & Compressor Bases",
    shortDesc: "Heavy duty vibration isolator mounting bases, motor slide rails, and compressor pump skids.",
    image: as11,
    material: "Heavy Plate Steel (IS 2062)",
    thickness: "5.0mm to 16.0mm",
    finish: "Anti-Corrosion Epoxy Primer + Polyurethane",
    applications: "Chiller compressor mounts, air handling unit blowers, industrial pumps",
    standards: "Vibration isolation standards (ISO 10816)",
    features: [
      "Precision laser cut motor tensioning adjustment slots",
      "Reinforced corner gussets preventing torsional twisting under startup torque",
      "Pre-drilled anchor bolt and anti-vibration spring mount holes",
      "Integrated leveling jack bolts for easy site alignment"
    ]
  },
  {
    id: "laser-12",
    category: "laser",
    categoryName: "CNC Laser Cutting",
    name: "Custom DXF Cutting & Batch Production",
    shortDesc: "Direct CAD-to-Laser manufacturing for OEM batch production and same-day prototypes.",
    image: as6,
    material: "All Sheet Metals (MS, SS, GI, Al, Brass)",
    thickness: "0.5mm to 20.0mm",
    finish: "As Specified by Client Drawing",
    applications: "OEM contract manufacturing, product R&D, industrial spare parts",
    standards: "Strict QA tolerance inspection with CMM & digital calipers",
    features: [
      "Send DXF/DWG file ➔ Instant nesting optimization & price quote",
      "High volume automated sheet loaders for 24/7 continuous batch runs",
      "Same day rapid prototyping turnaround for engineering validations",
      "Full material test certificates (MTC) and quality compliance reports"
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
   * 6. GENERAL SHEET METAL MANUFACTURING
   * ═══════════════════════════════════════════════════════════════ */
  {
    id: "sheet-1",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Sheet Metal Boxes",
    shortDesc: "Custom fabricated utility boxes, battery cases, IP-rated enclosures, and tool storage boxes.",
    image: as3,
    material: "CRCA / GI / Aluminium / SS 304",
    thickness: "1.0mm to 2.0mm",
    finish: "Powder Coated / Silk Screen Printed",
    applications: "Electronics, energy storage, field toolboxes, industrial accessories",
    standards: "IP54 / IP65 Enclosure Standards",
    features: [
      "Folded double-edge seam construction for maximum box rigidity",
      "Heavy duty stainless steel toggle latches and padlock eyes",
      "Reinforced carry handles and internal partition organizers",
      "Weather-sealed neoprene gasket lids"
    ]
  },
  {
    id: "sheet-2",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Industrial Cabinets & Racks",
    shortDesc: "Floor standing server racks, tool storage lockers, chemical safety cabinets & telecom enclosures.",
    image: as10,
    material: "High Tensile Steel Sheet / SS 304",
    thickness: "1.2mm, 1.6mm, 2.0mm",
    finish: "Durable Texture Powder Coated (RAL 7035 / 9005)",
    applications: "Server rooms, workshops, pharmaceutical clean storage, telecom nodes",
    standards: "19-Inch EIA-310-D / IP55 Weatherproof",
    features: [
      "Adjustable 19-inch mounting vertical pillars with U-marking numbers",
      "Perforated mesh ventilated doors with 3-point swing handles",
      "Cable entry brush plates at top and bottom base plates",
      "Castor wheels with leveling feet for effortless positioning"
    ]
  },
  {
    id: "sheet-3",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Equipment Covers & Shrouds",
    shortDesc: "Protective weather shrouds, rain hoods, fan cowls, and heat exchanger aesthetic covers.",
    image: as7,
    material: "Aluminium / GI / Polyurethane Coated Steel",
    thickness: "1.2mm to 2.5mm",
    finish: "Weatherproof UV-Resistant Powder Coating",
    applications: "Rooftop HVAC units, outdoor condensing units, generators",
    standards: "AMCA Rain Protection / IPX4 Weatherproof",
    features: [
      "Aerodynamic low-drag louvers for high airflow heat rejection",
      "Drip edge overhang design channeling rainwater away from internal electricals",
      "Quick access inspection latches for maintenance",
      "Sound deadening internal acoustic lining options"
    ]
  },
  {
    id: "sheet-4",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Safety Guards & Barriers",
    shortDesc: "OSHA compliant machine perimeter guards, conveyor safety railings & robotic cell fencing.",
    image: as8,
    material: "Steel Tube Frame + Expanded Metal Mesh / Sheet Metal",
    thickness: "1.6mm to 3.0mm",
    finish: "High-Visibility Safety Yellow & Black",
    applications: "Automated factory floors, conveyors, stamping presses, robotic arms",
    standards: "ISO 14120 / OSHA 1910 Safety Guards",
    features: [
      "Modular inter-locking panel sections for rapid factory layout assembly",
      "Safety interlock switch mounting plates ready for emergency circuit cutoff",
      "Heavy base anchor plates for rigid floor bolt-down stability",
      "Ergonomic smooth edges with zero exposed weld burrs"
    ]
  },
  {
    id: "sheet-5",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Heavy-Duty Brackets & Mounts",
    shortDesc: "Precision CNC sheared, punched, laser cut & press brake formed mounting brackets.",
    image: as4,
    material: "MS / GI / SS 304 / Aluminium",
    thickness: "1.5mm to 8.0mm",
    finish: "Electro-Zinc Plated / Hot Dip Galvanized / E-Coated",
    applications: "Structural framing, automotive sub-assemblies, equipment mounting",
    standards: "Custom CAD / CAM Manufacturing",
    features: [
      "Tight bend angle precision with CNC crowning compensation",
      "Extruded threaded holes and clinch studs pre-installed",
      "High repeatability across 10,000+ unit production batches",
      "Custom laser deburring and radiused stress relief corners"
    ]
  },
  {
    id: "sheet-6",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Structural Frames & Chassis",
    shortDesc: "Welded square/rectangular tube and angle iron structural chassis, machine beds & skids.",
    image: as11,
    material: "IS 4923 Hollow Sections / IS 2062 Plates",
    thickness: "2.0mm to 6.0mm wall thickness",
    finish: "Shot Blasted, Epoxy Primed & Polyurethane Topcoat",
    applications: "AHU base frames, chiller skids, conveyor frames, generator canopies",
    standards: "AWS D1.1 Structural Welding Standards",
    features: [
      "MIG/TIG welded on precision fixtured welding tables with zero warping",
      "Machined leveling pads for precision equipment alignment",
      "Integrated forklift pockets and heavy crane lifting lugs",
      "Anti-corrosive multi-layer industrial coating system"
    ]
  },
  {
    id: "sheet-7",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Modular Panels & Fascias",
    shortDesc: "Architectural wall cladding panels, instrument fascia plates, and acoustic partition panels.",
    image: as2,
    material: "Aluminium Composite (ACP) / SS 304 / GI / CRCA",
    thickness: "0.8mm to 2.0mm",
    finish: "PVDF / Anodized / Powder Coated / Hairline Finish",
    applications: "Building facades, cleanroom walls, generator canopies, control rooms",
    standards: "ASTM E84 Class A Fire Rated",
    features: [
      "Interlocking tongue-and-groove joint system with concealed fasteners",
      "Reinforced internal hat-channel stiffeners for wind load resistance",
      "Precision laser cut openings for gauges, displays, and switches",
      "Durable weather and scratch resistant surface finishes"
    ]
  },
  {
    id: "sheet-8",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Drip Pans & Condensate Trays",
    shortDesc: "Stainless steel and GI drain pans, secondary chemical containment trays & oil drip collectors.",
    image: as5,
    material: "Stainless Steel 304 / 316 / Heavy GI",
    thickness: "1.2mm to 2.0mm",
    finish: "Seamless TIG Welded & Water-Leak Tested",
    applications: "Under AHU cooling coils, commercial AC units, transformers, chemical barrels",
    standards: "ASHRAE 62.1 Condensate Drainage / EPA Secondary Containment",
    features: [
      "Precision pitched dual slope base ensuring zero standing stagnant water",
      "All-welded watertight corners tested with dye-penetrant leak checks",
      "Standard BSP threaded drain socket nipple pre-welded",
      "Corrosion-proof stainless steel impervious to bio-growth and chemical acids"
    ]
  },
  {
    id: "sheet-9",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Blower & Equipment Housings",
    shortDesc: "Spiral centrifugal blower scroll housings, motor protective cowls & turbine enclosures.",
    image: as6,
    material: "CRCA Mild Steel / SS 304 / Corten Steel",
    thickness: "1.6mm to 4.0mm",
    finish: "Epoxy Enamel Painted / Hot Dip Galvanised",
    applications: "Air handling units, industrial dust collection blowers, furnace forced draft fans",
    standards: "AMCA Aerodynamic Scroll Profiles",
    features: [
      "Aerodynamic logarithmic spiral scroll casing maximizing airflow efficiency",
      "Continuous seal welded airtight seams for high static pressure ratings",
      "Bolted inspection door for easy impeller cleaning and maintenance",
      "Flanged intake and discharge connections ready for duct attachment"
    ]
  },
  {
    id: "sheet-10",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Industrial Chutes, Hoppers & Silos",
    shortDesc: "Heavy gauge material handling hoppers, conical transitions, discharge chutes & bins.",
    image: as9,
    material: "Mild Steel / Hardox Abrasion Resistant Steel / SS 304",
    thickness: "2.5mm to 8.0mm",
    finish: "Epoxy Lined / Food Grade Polished",
    applications: "Pharma bulk powder handling, grain processing, chemical plants, packaging",
    standards: "GMP / ISO 9001",
    features: [
      "Smooth internal weld seams polished flush to prevent material bridging and clumping",
      "Conical and square-to-round transitions formed with high dimensional precision",
      "Slide gate damper and butterfly valve flange connections",
      "Heavy angle stiffening rings around upper and lower perimeters"
    ]
  },
  {
    id: "sheet-11",
    category: "sheetmetal",
    categoryName: "General Sheet Metal Manufacturing",
    name: "Custom Sheet Metal Products",
    shortDesc: "End-to-end bespoke sheet metal engineering fabricated strictly to client drawings and specifications.",
    image: as12,
    material: "MS, SS, GI, Aluminium, Brass, Copper",
    thickness: "0.5mm to 20.0mm",
    finish: "Any standard industrial finish (Plated, Painted, Powder Coated, Anodized)",
    applications: "Turnkey engineering projects across Baddi, Himachal Pradesh, Chandigarh, and Punjab",
    standards: "100% Customized to client BOQ & engineering specs",
    features: [
      "Complete in-house CAD drafting, laser profiling, CNC bending & welding",
      "Rapid turnaround from prototype to mass production runs",
      "Strict quality control with dimensional inspection reports",
      "Fast delivery across North India industrial hubs"
    ]
  }
];
