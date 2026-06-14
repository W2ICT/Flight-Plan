/* ===== Enroute Chart — Thailand Aviation Map ===== */

// ── Data ──────────────────────────────────────────────────────────────────────

const AIRPORTS = [
  // === RTAF Military ===
  { icao:'VTBL', name:'Lop Buri', thai:'ลพบุรี', type:'military', wing:'Wing 2 / 102 Sqn', lat:14.8745, lng:100.6617, elev:93,  rwy:'27/09 · 6,562ft', freq:'119.1 APP · 118.3 TWR' },
  { icao:'VTPP', name:'Phitsanulok', thai:'พิษณุโลก', type:'military', wing:'Wing 46', lat:16.7828, lng:100.2779, elev:154, rwy:'36/18 · 9,843ft', freq:'120.9 APP · 118.1 TWR' },
  { icao:'VTUQ', name:'Nakhon Ratchasima', thai:'นครราชสีมา (โคราช)', type:'military', wing:'Wing 1', lat:14.9495, lng:102.0799, elev:729, rwy:'04/22 · 9,843ft', freq:'119.7 APP · 121.5 TWR' },
  { icao:'VTCC', name:'Chiang Mai', thai:'เชียงใหม่', type:'joint', wing:'Wing 41 / Civil', lat:18.7668, lng:98.9625,  elev:1036,rwy:'18/36 · 10,000ft', freq:'121.0 APP · 118.1 TWR' },
  { icao:'VTUU', name:'Ubon Ratchathani', thai:'อุบลราชธานี', type:'joint', wing:'Wing 21 / Civil', lat:15.2512, lng:104.8701, elev:406, rwy:'05/23 · 9,843ft', freq:'120.7 APP · 118.3 TWR' },
  { icao:'VTUD', name:'Udon Thani', thai:'อุดรธานี', type:'joint', wing:'Wing 23 / Civil', lat:17.3864, lng:102.7883, elev:579, rwy:'12/30 · 10,000ft', freq:'121.1 APP · 118.1 TWR' },
  { icao:'VTSH', name:'Hat Yai', thai:'หาดใหญ่', type:'joint', wing:'Wing 56 / Civil', lat:6.9320,  lng:100.3928, elev:90,  rwy:'08/26 · 9,843ft', freq:'119.5 APP · 118.1 TWR' },
  { icao:'VTBU', name:'U-Tapao', thai:'อู่ตะเภา', type:'joint', wing:'Wing 6 / RTNAF / Civil', lat:12.6795, lng:101.0050, elev:42,  rwy:'18/36 · 11,483ft', freq:'119.7 APP · 118.3 TWR' },
  { icao:'VTPB', name:'Prachinburi', thai:'ปราจีนบุรี', type:'military', wing:'RTAF Base', lat:14.1497, lng:101.3167, elev:100, rwy:'07/25', freq:'Contact VTBL' },
  { icao:'VTML', name:'Lop Buri Army Avn', thai:'ลพบุรี ทบ.', type:'military', wing:'Royal Thai Army', lat:14.8800, lng:100.6800, elev:93,  rwy:'27/09', freq:'Army Freq' },
  { icao:'VTCK', name:'Khon Kaen', thai:'ขอนแก่น', type:'joint', wing:'Wing 6 Det / Civil', lat:16.4665, lng:102.7836, elev:670, rwy:'05/23 · 9,843ft', freq:'119.9 APP · 118.3 TWR' },
  { icao:'VTCI', name:'Chiang Rai', thai:'เชียงราย', type:'civil', wing:'Civil', lat:19.9523, lng:99.8830,  elev:1276,rwy:'03/21 · 9,843ft', freq:'119.3 APP · 118.1 TWR' },
  // === Civil ===
  { icao:'VTBS', name:'Suvarnabhumi', thai:'สุวรรณภูมิ', type:'civil', wing:'Civil (AOT)', lat:13.6811, lng:100.7470, elev:5,   rwy:'01L/19R · 12,139ft', freq:'124.35 APP · 118.1 TWR' },
  { icao:'VTBD', name:'Don Mueang', thai:'ดอนเมือง', type:'civil', wing:'Civil (AOT)', lat:13.9126, lng:100.6067, elev:9,   rwy:'03L/21R · 11,483ft', freq:'120.5 APP · 118.1 TWR' },
  { icao:'VTSP', name:'Phuket', thai:'ภูเก็ต', type:'civil', wing:'Civil (AOT)', lat:8.1132,  lng:98.3169,  elev:82,  rwy:'09/27 · 9,843ft', freq:'119.1 APP · 118.1 TWR' },
  { icao:'VTSM', name:'Koh Samui', thai:'เกาะสมุย', type:'civil', wing:'Civil (Bangkok Airways)', lat:9.5478,  lng:100.0614, elev:64,  rwy:'17/35 · 7,054ft', freq:'120.7 APP · 118.5 TWR' },
  { icao:'VTSV', name:'Surat Thani', thai:'สุราษฎร์ธานี', type:'civil', wing:'Civil (AOT)', lat:9.1326,  lng:99.1356,  elev:20,  rwy:'04/22 · 9,843ft', freq:'119.5 APP · 118.1 TWR' },
  { icao:'VTSR', name:'Ranong', thai:'ระนอง', type:'civil', wing:'Civil', lat:9.7778,  lng:98.5853,  elev:57,  rwy:'11/29 · 5,906ft', freq:'119.5 APP' },
  { icao:'VTSG', name:'Krabi', thai:'กระบี่', type:'civil', wing:'Civil (AOT)', lat:8.0992,  lng:98.9863,  elev:82,  rwy:'15/33 · 9,843ft', freq:'119.3 APP · 118.1 TWR' },
  { icao:'VTST', name:'Trang', thai:'ตรัง', type:'civil', wing:'Civil', lat:7.5087,  lng:99.6166,  elev:148, rwy:'07/25 · 6,890ft', freq:'119.7 APP' },
  { icao:'VTSN', name:'Nakhon Si Thammarat', thai:'นครศรีธรรมราช', type:'civil', wing:'Civil', lat:8.5396,  lng:99.9447,  elev:13,  rwy:'03/21 · 9,843ft', freq:'119.5 APP' },
  { icao:'VTSO', name:'Narathiwat', thai:'นราธิวาส', type:'civil', wing:'Civil', lat:6.5199,  lng:101.7423, elev:16,  rwy:'07/25 · 9,843ft', freq:'119.3 APP' },
  { icao:'VTSK', name:'Pattani', thai:'ปัตตานี', type:'civil', wing:'Civil', lat:6.7856,  lng:101.1542, elev:8,   rwy:'06/24 · 5,085ft', freq:'Contact Narathiwat' },
  { icao:'VTSE', name:'Chumphon', thai:'ชุมพร', type:'civil', wing:'Civil', lat:10.7112, lng:99.3617,  elev:9,   rwy:'03/21 · 6,890ft', freq:'119.5 APP' },
  { icao:'VTPH', name:'Hua Hin', thai:'หัวหิน', type:'civil', wing:'Civil (Royal Thai Aviation Dept)', lat:12.6362, lng:99.9515,  elev:62,  rwy:'03/21 · 6,890ft', freq:'118.5 APP · 118.3 TWR' },
  { icao:'VTCL', name:'Lampang', thai:'ลำปาง', type:'civil', wing:'Civil', lat:18.2709, lng:99.5042,  elev:811, rwy:'16/34 · 7,546ft', freq:'119.1 APP' },
  { icao:'VTPO', name:'Sukhothai', thai:'สุโขทัย', type:'civil', wing:'Civil (Bangkok Airways)', lat:17.2381, lng:99.8180,  elev:179, rwy:'01/19 · 6,890ft', freq:'119.3 APP' },
  { icao:'VTPL', name:'Loei', thai:'เลย', type:'civil', wing:'Civil', lat:17.4394, lng:101.7221, elev:860, rwy:'06/24 · 6,890ft', freq:'119.5 APP' },
  { icao:'VTUO', name:'Buriram', thai:'บุรีรัมย์', type:'civil', wing:'Civil', lat:15.2295, lng:103.2532, elev:590, rwy:'09/27 · 9,843ft', freq:'119.3 APP' },
  { icao:'VTUK', name:'Nakhon Phanom', thai:'นครพนม', type:'civil', wing:'Civil', lat:17.3838, lng:104.6430, elev:587, rwy:'14/32 · 9,843ft', freq:'119.5 APP' },
  { icao:'VTUP', name:'Nan', thai:'น่าน', type:'civil', wing:'Civil', lat:18.8077, lng:100.7833, elev:1040,rwy:'02/20 · 6,890ft', freq:'119.1 APP' },
  { icao:'VTPU', name:'Sakon Nakhon', thai:'สกลนคร', type:'civil', wing:'Civil', lat:17.1951, lng:104.1194, elev:529, rwy:'12/30 · 5,905ft', freq:'Contact Udon' },
  { icao:'VTPR', name:'Roi Et', thai:'ร้อยเอ็ด', type:'civil', wing:'Civil', lat:16.1168, lng:103.7737, elev:451, rwy:'08/26 · 6,890ft', freq:'119.3 APP' },
];

const NAVAIDS = [
  // VOR/DME
  { id:'BKK', name:'Bangkok', type:'VOR', lat:13.6636, lng:100.7636, freq:'116.7', range:200 },
  { id:'CNX', name:'Chiang Mai', type:'VOR', lat:18.7669, lng:98.9625,  freq:'112.7', range:200 },
  { id:'PKT', name:'Phuket', type:'VOR', lat:8.1131,  lng:98.3169,  freq:'113.3', range:200 },
  { id:'HDY', name:'Hat Yai', type:'VOR', lat:6.9320,  lng:100.3928, freq:'115.1', range:200 },
  { id:'UTH', name:'Udon Thani', type:'VOR', lat:17.3864, lng:102.7883, freq:'117.2', range:200 },
  { id:'UBP', name:'Ubon', type:'VOR', lat:15.2512, lng:104.8701, freq:'114.5', range:200 },
  { id:'KKC', name:'Khon Kaen', type:'VOR', lat:16.4665, lng:102.7836, freq:'116.3', range:200 },
  { id:'NST', name:'Nakhon Si Thammarat', type:'VOR', lat:8.5396,  lng:99.9447,  freq:'115.7', range:150 },
  { id:'KBI', name:'Krabi', type:'VOR', lat:8.0992,  lng:98.9863,  freq:'113.7', range:150 },
  { id:'SMI', name:'Samui', type:'VOR', lat:9.5478,  lng:100.0614, freq:'114.9', range:150 },
  { id:'SUR', name:'Surat Thani', type:'VOR', lat:9.1326,  lng:99.1356,  freq:'117.5', range:150 },
  { id:'CMU', name:'Chiang Mai (Inner)', type:'NDB', lat:18.7900, lng:98.9450,  freq:'362', range:100 },
  { id:'NKR', name:'Nakhon Ratchasima', type:'NDB', lat:14.9495, lng:102.0799, freq:'395', range:100 },
  { id:'HHN', name:'Hua Hin', type:'NDB', lat:12.6362, lng:99.9515,  freq:'350', range:100 },
  { id:'LPT', name:'Lampang', type:'NDB', lat:18.2709, lng:99.5042,  freq:'330', range:100 },
  { id:'PHS', name:'Phitsanulok', type:'NDB', lat:16.7828, lng:100.2779, freq:'384', range:100 },
  { id:'LPB', name:'Lop Buri', type:'NDB', lat:14.8745, lng:100.6617, freq:'326', range:100 },
];

const WAYPOINTS = [
  { id:'BARON', lat:14.5667, lng:101.3000, type:'INT' },
  { id:'OKNAT', lat:15.9000, lng:100.9833, type:'INT' },
  { id:'BINON', lat:16.9500, lng:100.3833, type:'INT' },
  { id:'BOBOP', lat:13.3167, lng:100.9167, type:'INT' },
  { id:'EGEMA', lat:12.5000, lng:99.6667,  type:'INT' },
  { id:'DAGSO', lat:11.5000, lng:99.5000,  type:'INT' },
  { id:'ERLAN', lat:10.0000, lng:99.0000,  type:'INT' },
  { id:'ELBOA', lat:9.0000,  lng:98.7500,  type:'INT' },
  { id:'EMARA', lat:7.5000,  lng:99.5000,  type:'INT' },
  { id:'ENEMA', lat:17.0000, lng:102.0000, type:'INT' },
  { id:'EVASI', lat:15.5000, lng:103.5000, type:'INT' },
  { id:'BUNAS', lat:13.0000, lng:102.5000, type:'INT' },
  { id:'AGEBA', lat:11.8333, lng:101.8333, type:'INT' },
  { id:'EKSOL', lat:18.5000, lng:99.5000,  type:'INT' },
  { id:'FALAM', lat:19.5000, lng:100.5000, type:'INT' },
];

const AIRWAYS = [
  { id:'A1',   name:'Airway A1 (Bangkok–Chiang Mai)',  color:'#60a5fa', coords:[ [13.6636,100.7636],[14.8745,100.6617],[15.9000,100.9833],[16.7828,100.2779],[17.0000,100.1000],[18.7669,98.9625] ] },
  { id:'A464', name:'Airway A464 (Bangkok–Udon)',       color:'#34d399', coords:[ [13.6636,100.7636],[14.5667,101.3000],[15.9000,100.9833],[16.4665,102.7836],[17.3864,102.7883] ] },
  { id:'B334', name:'Airway B334 (Chiang Mai–Kanchanaburi)', color:'#f472b6', coords:[ [18.7669,98.9625],[17.4394,101.7221],[15.8000,101.0000],[14.0000,99.6000],[13.0833,99.8333] ] },
  { id:'G221', name:'Airway G221 (Bangkok–Penang)',     color:'#fb923c', coords:[ [13.6636,100.7636],[12.6362,99.9515],[11.0000,99.3000],[9.1326,99.1356],[8.5396,99.9447],[6.9320,100.3928],[5.4667,100.3333] ] },
  { id:'R474', name:'Airway R474 (Bangkok–Yangon)',     color:'#a78bfa', coords:[ [13.6636,100.7636],[14.0000,100.0000],[15.0000,99.0000],[16.5000,97.6000] ] },
  { id:'N892', name:'Airway N892 (Bangkok–Ho Chi Minh)', color:'#fbbf24', coords:[ [13.6636,100.7636],[13.0000,102.5000],[11.5000,104.0000],[10.8183,106.6520] ] },
  { id:'M771', name:'Airway M771 (East Corridor)',       color:'#6ee7b7', coords:[ [13.6636,100.7636],[14.5667,101.3000],[15.2512,104.8701],[17.0000,106.0000] ] },
];

// Bangkok FIR boundary (simplified)
const FIR_BOUNDARY = [
  [20.5,97.5],[20.5,100.0],[19.5,100.5],[19.0,101.5],[18.0,103.0],
  [17.5,104.5],[16.5,105.5],[15.0,105.5],[13.0,104.0],[11.0,103.5],
  [9.5,103.0],[8.0,103.0],[6.5,102.0],[5.5,101.5],[4.5,100.5],
  [4.5,98.5],[5.0,97.5],[7.0,97.5],[8.5,97.0],[10.0,97.5],
  [12.0,98.0],[13.5,98.0],[15.0,98.5],[16.0,98.0],[17.0,97.5],
  [18.5,97.5],[20.5,97.5],
];

// ── Map init ──────────────────────────────────────────────────────────────────
const map = L.map('map', {
  center: [13.5, 101.0],
  zoom: 7,
  zoomControl: true,
  doubleClickZoom: false,
});

// Base layer — dark CartoDB
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap © CARTO',
  subdomains: 'abcd', maxZoom: 14,
}).addTo(map);

// ── Layer groups ──────────────────────────────────────────────────────────────
const layers = {
  airports:  L.layerGroup().addTo(map),
  military:  L.layerGroup().addTo(map),
  navaids:   L.layerGroup().addTo(map),
  waypoints: L.layerGroup().addTo(map),
  airways:   L.layerGroup().addTo(map),
  fir:       L.layerGroup().addTo(map),
};

// ── Layer visibility state ────────────────────────────────────────────────────
const layerVisible = { airports:true, military:true, navaids:true, waypoints:true, airways:true, fir:true };

function toggleLayer(name) {
  layerVisible[name] = !layerVisible[name];
  const chip = document.getElementById('chip-' + name);
  if (layerVisible[name]) { map.addLayer(layers[name]); chip.classList.add('active'); }
  else { map.removeLayer(layers[name]); chip.classList.remove('active'); }
}

// ── Draw FIR boundary ─────────────────────────────────────────────────────────
L.polygon(FIR_BOUNDARY, {
  color: '#fb923c', weight: 1.5, opacity: 0.5,
  fill: true, fillColor: '#fb923c', fillOpacity: 0.04,
  dashArray: '6 4',
}).bindPopup('<div class="popup-header"><span style="color:#fb923c;">Bangkok FIR (VTBB)</span></div><div style="font-size:12px;color:var(--text-secondary);">Flight Information Region<br>Bangkok ACC · 128.5 / 133.0 / 126.2 MHz</div>').addTo(layers.fir);

// ── Draw airways ──────────────────────────────────────────────────────────────
AIRWAYS.forEach(aw => {
  const line = L.polyline(aw.coords, {
    color: aw.color, weight: 1.8, opacity: 0.5, dashArray: '8 4',
  });
  line.bindTooltip(`<b style="color:${aw.color}">${aw.id}</b> — ${aw.name}`, { sticky: true });
  line.addTo(layers.airways);
});

// ── SVG icon helpers ──────────────────────────────────────────────────────────
function airportIcon(type) {
  const colors = { civil:'#3b82f6', military:'#ef4444', joint:'#f59e0b' };
  const c = colors[type] || '#3b82f6';
  const shape = type === 'military'
    ? `<rect x="3" y="3" width="18" height="18" fill="${c}" opacity="0.9" rx="2"/>`
    : `<circle cx="12" cy="12" r="9" fill="${c}" opacity="0.9"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    ${shape}
    <text x="12" y="16" text-anchor="middle" font-size="10" font-family="Arial" font-weight="bold" fill="white">✈</text>
  </svg>`;
  return L.divIcon({
    className: '', html: svg, iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -14],
  });
}

function navaidIcon(type) {
  const isVOR = type === 'VOR';
  const c = isVOR ? '#a78bfa' : '#818cf8';
  const shape = isVOR
    ? `<polygon points="12,2 22,22 2,22" fill="none" stroke="${c}" stroke-width="2"/><polygon points="12,6 19,20 5,20" fill="${c}" opacity="0.3"/>`
    : `<circle cx="12" cy="12" r="8" fill="none" stroke="${c}" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="${c}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">${shape}</svg>`;
  return L.divIcon({ className:'', html:svg, iconSize:[22,22], iconAnchor:[11,11], popupAnchor:[0,-13] });
}

function waypointIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
    <line x1="7" y1="0" x2="7" y2="14" stroke="#34d399" stroke-width="1.5"/>
    <line x1="0" y1="7" x2="14" y2="7" stroke="#34d399" stroke-width="1.5"/>
    <circle cx="7" cy="7" r="2" fill="#34d399"/>
  </svg>`;
  return L.divIcon({ className:'', html:svg, iconSize:[14,14], iconAnchor:[7,7], popupAnchor:[0,-9] });
}

// ── Render airports ───────────────────────────────────────────────────────────
AIRPORTS.forEach(ap => {
  const isMil = ap.type === 'military';
  const targetLayer = isMil ? layers.military : layers.airports;
  const badge = isMil
    ? `<span class="popup-military">RTAF MILITARY</span>`
    : ap.type === 'joint'
    ? `<span class="popup-military">JOINT-USE</span>`
    : `<span class="popup-civilian">CIVIL</span>`;

  const popup = `
    <div style="min-width:200px;">
      <div class="popup-icao">${ap.icao}</div>
      <div class="popup-name">${ap.name} · ${ap.thai}</div>
      ${badge}
      <div class="popup-row"><span class="popup-key">Unit/Wing</span><span class="popup-val">${ap.wing}</span></div>
      <div class="popup-row"><span class="popup-key">Elevation</span><span class="popup-val">${ap.elev} ft</span></div>
      <div class="popup-row"><span class="popup-key">Runway</span><span class="popup-val">${ap.rwy || '-'}</span></div>
      <div class="popup-row"><span class="popup-key">Freq</span><span class="popup-val">${ap.freq || '-'}</span></div>
      <div class="popup-row"><span class="popup-key">Coord</span><span class="popup-val">${ap.lat.toFixed(4)}°N ${ap.lng.toFixed(4)}°E</span></div>
    </div>`;

  L.marker([ap.lat, ap.lng], { icon: airportIcon(ap.type) })
    .bindPopup(popup, { maxWidth: 280 })
    .addTo(targetLayer);

  // Label
  L.marker([ap.lat, ap.lng], {
    icon: L.divIcon({
      className: '',
      html: `<div style="font-family:monospace;font-size:10px;font-weight:700;color:${isMil?'#ef4444':ap.type==='joint'?'#f59e0b':'#60a5fa'};white-space:nowrap;margin-left:14px;margin-top:-5px;text-shadow:0 0 4px #000,0 0 4px #000;">${ap.icao}</div>`,
      iconSize: [60, 12], iconAnchor: [0, 6],
    }),
    interactive: false,
  }).addTo(targetLayer);
});

// ── Render navaids ────────────────────────────────────────────────────────────
NAVAIDS.forEach(nav => {
  const popup = `
    <div>
      <div style="font-size:15px;font-weight:800;font-family:monospace;color:#a78bfa;">${nav.id}</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;">${nav.name} · ${nav.type}</div>
      <div class="popup-row"><span class="popup-key">Frequency</span><span class="popup-val">${nav.freq} MHz</span></div>
      <div class="popup-row"><span class="popup-key">Range</span><span class="popup-val">${nav.range} NM</span></div>
      <div class="popup-row"><span class="popup-key">Position</span><span class="popup-val">${nav.lat.toFixed(4)}N ${nav.lng.toFixed(4)}E</span></div>
    </div>`;

  L.marker([nav.lat, nav.lng], { icon: navaidIcon(nav.type) })
    .bindPopup(popup)
    .addTo(layers.navaids);

  L.marker([nav.lat, nav.lng], {
    icon: L.divIcon({
      className: '',
      html: `<div style="font-family:monospace;font-size:9px;font-weight:700;color:#a78bfa;white-space:nowrap;margin-left:12px;margin-top:-4px;text-shadow:0 0 4px #000,0 0 4px #000;">${nav.id}<br><span style="color:#6b7280;font-size:8px;">${nav.freq}</span></div>`,
      iconSize: [60, 20], iconAnchor: [0, 10],
    }),
    interactive: false,
  }).addTo(layers.navaids);
});

// ── Render waypoints ──────────────────────────────────────────────────────────
WAYPOINTS.forEach(wp => {
  L.marker([wp.lat, wp.lng], { icon: waypointIcon() })
    .bindTooltip(`<b style="color:#34d399">${wp.id}</b>`, { permanent: false, sticky: true })
    .addTo(layers.waypoints);

  L.marker([wp.lat, wp.lng], {
    icon: L.divIcon({
      className: '',
      html: `<div style="font-family:monospace;font-size:9px;font-weight:600;color:#34d399;white-space:nowrap;margin-left:9px;margin-top:-4px;text-shadow:0 0 4px #000,0 0 4px #000;">${wp.id}</div>`,
      iconSize: [50, 10], iconAnchor: [0, 5],
    }),
    interactive: false,
  }).addTo(layers.waypoints);
});

// ── Mouse coordinate display ──────────────────────────────────────────────────
map.on('mousemove', e => {
  const lat = e.latlng.lat.toFixed(4);
  const lng = e.latlng.lng.toFixed(4);
  const latStr = lat >= 0 ? lat + '°N' : Math.abs(lat) + '°S';
  const lngStr = lng >= 0 ? lng + '°E' : Math.abs(lng) + '°W';
  document.getElementById('coordDisplay').textContent = `${latStr}  ${lngStr}`;
});

// ── Distance measure (double-click two points) ────────────────────────────────
let measurePoints = [];
let measureMarkers = [];
let measureLine = null;

map.on('dblclick', e => {
  measurePoints.push(e.latlng);
  const dot = L.circleMarker(e.latlng, {
    radius: 5, color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 1, weight: 2,
  }).addTo(map);
  measureMarkers.push(dot);

  if (measurePoints.length === 2) {
    if (measureLine) map.removeLayer(measureLine);
    measureLine = L.polyline(measurePoints, { color:'#3b82f6', weight:2, dashArray:'5 4', opacity:0.8 }).addTo(map);

    const d = measurePoints[0].distanceTo(measurePoints[1]);
    const nm  = (d / 1852).toFixed(1);
    const km  = (d / 1000).toFixed(1);
    const disp = document.getElementById('distanceDisplay');
    disp.textContent = `${nm} NM  (${km} km)`;
    disp.style.display = 'block';
    document.getElementById('clearMeasureBtn').style.display = '';

    measurePoints = [];
  }
  L.DomEvent.stopPropagation(e);
});

function clearMeasure() {
  measurePoints = [];
  measureMarkers.forEach(m => map.removeLayer(m));
  measureMarkers = [];
  if (measureLine) { map.removeLayer(measureLine); measureLine = null; }
  document.getElementById('distanceDisplay').style.display = 'none';
  document.getElementById('clearMeasureBtn').style.display = 'none';
}

function resetView() {
  map.setView([13.5, 101.0], 7);
}

// ── Search ────────────────────────────────────────────────────────────────────
const ALL_SEARCHABLE = [
  ...AIRPORTS.map(a => ({ ...a, kind:'airport', display:`${a.icao} — ${a.name} (${a.thai})` })),
  ...NAVAIDS.map(n  => ({ ...n, lat:n.lat, lng:n.lng, kind:'navaid',   display:`${n.id} — ${n.name} ${n.type} ${n.freq} MHz` })),
  ...WAYPOINTS.map(w => ({ ...w, kind:'waypoint', display:`${w.id} — Waypoint` })),
];

function onSearch(q) {
  const box = document.getElementById('searchResults');
  if (!q || q.length < 2) { box.style.display = 'none'; return; }
  const ql = q.toUpperCase();
  const results = ALL_SEARCHABLE.filter(x =>
    (x.icao || x.id || '').toUpperCase().includes(ql) ||
    (x.name  || '').toUpperCase().includes(ql) ||
    (x.thai  || '').includes(q)
  ).slice(0, 10);

  if (!results.length) { box.style.display = 'none'; return; }
  box.innerHTML = results.map(r => `
    <div class="search-result-item" onclick="goTo(${r.lat}, ${r.lng}, '${r.display.replace(/'/g,"\\'")}')">
      <div class="sri-icao">${r.icao || r.id}</div>
      <div class="sri-name">${r.name || ''} ${r.thai ? '· '+r.thai : ''}</div>
    </div>`).join('');
  box.style.display = 'block';
}

function goTo(lat, lng, label) {
  map.setView([lat, lng], 11);
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').style.display = 'none';
  L.popup().setLatLng([lat, lng]).setContent(`<div style="font-weight:700;font-size:13px;">${label}</div>`).openOn(map);
}

// Close search on map click
map.on('click', () => { document.getElementById('searchResults').style.display = 'none'; });
document.addEventListener('click', e => {
  if (!e.target.closest('.map-search')) document.getElementById('searchResults').style.display = 'none';
});
