/* ===== Flight Plan JS — CA48/RAF2919 ===== */

// ── Thai airports (shared by multiple fields) ─────────────────────────────────
const THAI_APTS = [
  ['VTBL','Lop Buri — Wing 2 RTAF'],
  ['VTPP','Phitsanulok — Wing 46 RTAF'],
  ['VTPH','Hua Hin — Wing 5 RTAF'],
  ['VTBU','U-Tapao — Wing 21 RTAF'],
  ['VTUO','Korat — Wing 1 RTAF'],
  ['VTCC','Chiang Mai — Wing 41 RTAF'],
  ['VTUD','Udon Thani — Wing 23 RTAF'],
  ['VTUU','Ubon Ratchathani — Wing 21 RTAF'],
  ['VTBS','Suvarnabhumi (BKK)'],
  ['VTBD','Don Mueang (DMK)'],
  ['VTSP','Phuket International'],
  ['VTSG','Krabi International'],
  ['VTSM','Koh Samui'],
  ['VTSE','Trang'],
  ['VTST','Nakhon Si Thammarat'],
  ['VTSK','Narathiwat'],
  ['VTSH','Songkhla / Hat Yai'],
  ['VTPO','Chiang Rai — Mae Fah Luang'],
  ['VTPN','Nan Nakhon'],
  ['VTPU','Phrae'],
  ['VTPE','Mae Sot (Tak)'],
  ['VTPC','Phichit'],
  ['VTPF','Nakhon Sawan'],
  ['VTPB','Phetchabun'],
  ['VTUI','Khon Kaen'],
  ['VTUK','Nakhon Ratchasima'],
  ['VTUL','Loei'],
  ['VTUS','Sakon Nakhon'],
  ['VTUQ','Roi Et'],
  ['VTUW','Mukdahan'],
  ['ZZZZ','ไม่อยู่ในรายการ / Unknown'],
];

// ── Dropdown options per field id ─────────────────────────────────────────────
const CB_OPTS = {
  f8r: [
    ['I','IFR — Instrument Flight Rules'],
    ['V','VFR — Visual Flight Rules'],
    ['Y','IFR ก่อน แล้วเปลี่ยน VFR'],
    ['Z','VFR ก่อน แล้วเปลี่ยน IFR'],
  ],
  f8t: [
    ['S','Scheduled Air Service'],
    ['N','Non-scheduled Air Transport'],
    ['G','General Aviation'],
    ['M','Military'],
    ['X','Other'],
  ],
  f9t: [
    ['EC35','EC135 Helicopter'],
    ['B412','Bell 412'],
    ['EC72','EC725 Caracal'],
    ['S70I','S-70i Black Hawk'],
    ['S92A','S-92A Helibus'],
  ],
  f9w: [
    ['J','J — Super (A380, AN-124 ฯลฯ)'],
    ['H','H — Heavy (≥136,000 kg)'],
    ['M','M — Medium'],
    ['L','L — Light (<7,000 kg)'],
  ],
  f10c: [
    ['S',  'Standard (VHF RTF, VOR, ILS)'],
    ['N',  'Nil — ไม่มีอุปกรณ์'],
    ['R',  'PBN Approved'],
    ['G',  'GNSS'],
    ['SR', 'Standard + PBN'],
    ['SG', 'Standard + GNSS'],
    ['SRG','Standard + PBN + GNSS'],
    ['D',  'DME'],
    ['F',  'ADF'],
    ['H',  'HF RTF'],
    ['O',  'VOR only'],
    ['T',  'TACAN'],
    ['U',  'UHF RTF'],
    ['V',  'VHF RTF'],
    ['W',  'RVSM Approved'],
    ['X',  'MNPS Approved'],
    ['Z',  'Other (ระบุใน Field 18)'],
  ],
  f10s: [
    ['N', 'N — Nil (ไม่มี Transponder)'],
    ['A', 'A — Mode A (4096 codes)'],
    ['C', 'C — Mode A + C (Altitude)'],
    ['S', 'S — Mode S (Elementary)'],
    ['B1','B1 — ADS-B out (1090 ES)'],
    ['B2','B2 — ADS-B in/out (1090 ES)'],
    ['U1','U1 — ADS-B out (UAT)'],
    ['D1','D1 — ADS-B out (VDL Mode 4)'],
    ['SC','SC — Mode S + TCAS'],
    ['SP','SP — Mode S + ACAS/TCAS'],
  ],
  f13d: THAI_APTS,
  f16d: THAI_APTS,
  f16a: THAI_APTS,
  f16b: THAI_APTS,
  f15s: [
    ['N0060','60 kts'],
    ['N0080','80 kts'],
    ['N0100','100 kts'],
    ['N0110','110 kts'],
    ['N0120','120 kts'],
    ['N0130','130 kts'],
    ['N0150','150 kts'],
    ['N0180','180 kts'],
    ['N0200','200 kts'],
    ['N0250','250 kts'],
    ['N0280','280 kts'],
    ['N0300','300 kts'],
    ['K0200','200 km/h'],
    ['K0250','250 km/h'],
    ['K0300','300 km/h'],
    ['M050', 'Mach 0.50'],
    ['M070', 'Mach 0.70'],
    ['M082', 'Mach 0.82'],
  ],
  f15l: [
    ['VFR', 'VFR'],
    ['A015','1,500 ft'],
    ['A020','2,000 ft'],
    ['A025','2,500 ft'],
    ['A030','3,000 ft'],
    ['A040','4,000 ft'],
    ['A050','5,000 ft'],
    ['A060','6,000 ft'],
    ['A070','7,000 ft'],
    ['A080','8,000 ft'],
    ['A090','9,000 ft'],
    ['A100','10,000 ft'],
    ['A120','12,000 ft'],
    ['F150','FL150'],
    ['F180','FL180'],
    ['F200','FL200'],
    ['F240','FL240'],
    ['F280','FL280'],
    ['F310','FL310'],
    ['F350','FL350'],
    ['F390','FL390'],
  ],
};

// ── Character-box registry ────────────────────────────────────────────────────
const CB = {};

function initCharBoxes() {
  document.querySelectorAll('.cbwrap[data-max]').forEach(wrap => {
    const max = parseInt(wrap.dataset.max, 10);
    const id  = wrap.dataset.id;

    const row = document.createElement('div');
    row.className = 'cbr';

    const cells = [];
    for (let i = 0; i < max; i++) {
      const c = document.createElement('div');
      c.className = 'cbc';
      cells.push(c);
      row.appendChild(c);
    }
    wrap.appendChild(row);

    const inp = document.createElement('input');
    inp.type      = 'text';
    inp.maxLength = max;
    inp.className = 'cbinput';
    inp.id        = id;
    inp.autocomplete = 'off';
    inp.autocorrect  = 'off';
    inp.autocapitalize = 'characters';
    inp.spellcheck = false;
    wrap.appendChild(inp);

    CB[id] = { input: inp, cells, row };

    inp.addEventListener('focus', () => {
      row.classList.add('focused');
      refreshCursor(id);
      if (CB_OPTS[id]) showDropdown(id, wrap);
    });
    inp.addEventListener('blur', () => {
      row.classList.remove('focused');
      cells.forEach(c => c.classList.remove('cur'));
      // Small delay lets pointerdown on dd-item fire before hiding
      setTimeout(hideDropdown, 120);
    });
    inp.addEventListener('input', () => {
      inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      syncCells(id);
      updatePreview();
      if (CB_OPTS[id]) filterDropdown(id, inp.value);
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Escape') hideDropdown();
      if (e.key === 'ArrowDown') { e.preventDefault(); ddFocusFirst(); }
    });
    inp.addEventListener('keyup',  () => refreshCursor(id));
    inp.addEventListener('click',  () => refreshCursor(id));
  });
}

function syncCells(id) {
  const { input, cells } = CB[id];
  const chars = input.value.split('');
  cells.forEach((c, i) => { c.textContent = chars[i] || ''; });
  refreshCursor(id);
}

function refreshCursor(id) {
  const { input, cells } = CB[id];
  const pos = Math.min(input.selectionStart || input.value.length, cells.length - 1);
  cells.forEach((c, i) => c.classList.toggle('cur', i === pos && document.activeElement === input));
}

function cbVal(id) {
  return CB[id] ? CB[id].input.value.toUpperCase() : '';
}

function cbSet(id, val) {
  if (!CB[id]) return;
  CB[id].input.value = (val || '').toUpperCase().slice(0, CB[id].input.maxLength);
  syncCells(id);
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
let _ddActiveId = null;

function createDropdownEl() {
  const dd = document.createElement('div');
  dd.id = 'cb-dropdown';
  dd.className = 'cb-dropdown';
  dd.style.display = 'none';
  document.body.appendChild(dd);
  return dd;
}

function getDD() {
  return document.getElementById('cb-dropdown') || createDropdownEl();
}

function showDropdown(id, wrap) {
  _ddActiveId = id;
  const rect = wrap.getBoundingClientRect();
  const dd = getDD();
  dd.style.left     = rect.left + window.scrollX + 'px';
  dd.style.top      = rect.bottom + window.scrollY + 4 + 'px';
  dd.style.minWidth = Math.max(rect.width + 4, 200) + 'px';
  dd.style.display  = 'block';
  filterDropdown(id, CB[id]?.input.value || '');
}

function hideDropdown() {
  getDD().style.display = 'none';
  _ddActiveId = null;
}

function filterDropdown(id, query) {
  const dd = getDD();
  if (dd.style.display === 'none') return;
  const opts = CB_OPTS[id];
  if (!opts) return;
  const q = query.toUpperCase();
  const filtered = q
    ? opts.filter(([v, l]) => v.startsWith(q) || l.toUpperCase().includes(q))
    : opts;

  dd.innerHTML = '';
  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'cb-dd-empty';
    empty.textContent = 'ไม่พบรายการ';
    dd.appendChild(empty);
    return;
  }
  filtered.forEach(([v, l]) => {
    const item = document.createElement('div');
    item.className = 'cb-dd-item';
    item.tabIndex  = -1;
    item.innerHTML = `<span class="cb-dd-code">${v}</span><span class="cb-dd-label">${l}</span>`;
    // pointerdown prevents blur on cbinput before we can select
    item.addEventListener('pointerdown', e => {
      e.preventDefault();
      cbSet(id, v);
      hideDropdown();
      updatePreview();
      // Return focus to the input after selection
      if (CB[id]) CB[id].input.focus();
    });
    // Arrow key navigation inside dropdown
    item.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); (item.nextElementSibling || item).focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); (item.previousElementSibling || item).focus(); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cbSet(id, v); hideDropdown(); updatePreview(); }
      if (e.key === 'Escape') { hideDropdown(); if (CB[id]) CB[id].input.focus(); }
    });
    dd.appendChild(item);
  });
}

function ddFocusFirst() {
  const dd = getDD();
  if (dd.style.display === 'none') return;
  const first = dd.querySelector('.cb-dd-item');
  if (first) first.focus();
}

// ── Checkbox ──────────────────────────────────────────────────────────────────
function toggleChk(el) { el.classList.toggle('on'); updatePreview(); }
function chkVal(id) { return document.getElementById(id)?.classList.contains('on') ? 1 : 0; }
function chkSet(id, on) { const el = document.getElementById(id); if (el) { if (on) el.classList.add('on'); else el.classList.remove('on'); } }

// ── Plain input helpers ───────────────────────────────────────────────────────
function tv(id)      { return (document.getElementById(id)?.value || '').trim().toUpperCase(); }
function tset(id, v) { const el = document.getElementById(id); if (el) el.value = v || ''; }

// ── FPL Preview string ────────────────────────────────────────────────────────
function buildFPL() {
  const f7  = cbVal('f7')  || '?';
  const f8r = cbVal('f8r') || '?';
  const f8t = cbVal('f8t') || '?';
  const f9n = cbVal('f9n');
  const f9t = cbVal('f9t') || '?';
  const f9w = cbVal('f9w') || '?';
  const f10c = cbVal('f10c') || '?';
  const f10s = cbVal('f10s') || '?';
  const f13d = cbVal('f13d') || '?';
  const f13t = cbVal('f13t') || '?';
  const f15s = cbVal('f15s') || '?';
  const f15l = cbVal('f15l') || '?';
  const f15r = tv('f15r') || '?';
  const f16d = cbVal('f16d') || '?';
  const f16e = cbVal('f16e') || '?';
  const f16a = cbVal('f16a');
  const f16b = cbVal('f16b');
  const f18  = tv('f18') || '0';
  const f19e = cbVal('f19e') || '?';
  const f19p = cbVal('f19p') || '?';
  const color = tv('f-color');
  const rmk   = tv('f-rmk');
  const pic   = tv('f-pic');

  const emer = [chkVal('chk-uhf')?'U':'', chkVal('chk-vhf')?'V':'', chkVal('chk-elt')?'E':''].filter(Boolean).join('');
  let dest16 = `${f16d}/${f16e}`;
  if (f16a) dest16 += ` ${f16a}`;
  if (f16b) dest16 += ` ${f16b}`;

  return `(FPL-${f7}-${f8r}${f8t}\n-${f9n}${f9t}/${f9w}\n-${f10c}/${f10s}\n-${f13d}/${f13t}\n-${f15s}${f15l} ${f15r}\n-${dest16}\n-${f18})\nE/${f19e} P/${f19p}${emer?' R/'+emer:''}${color?' A/'+color:''}${rmk?' N/'+rmk:''}${pic?' C/'+pic:''}`;
}

function updatePreview() {
  const el = document.getElementById('fpl-preview');
  if (el) el.textContent = buildFPL();
}

// ── Load example (VTBL→VTPP, EC35, RTAF) ─────────────────────────────────────
function loadExample() {
  cbSet('f7',   'SCL130');
  cbSet('f8r',  'I');
  cbSet('f8t',  'M');
  cbSet('f9n',  '01');
  cbSet('f9t',  'EC35');
  cbSet('f9w',  'L');
  cbSet('f10c', 'S');
  cbSet('f10s', 'C');
  cbSet('f13d', 'VTBL');
  cbSet('f13t', '0200');
  cbSet('f15s', 'N0120');
  cbSet('f15l', 'A080');
  tset('f15r',  'TL W9 PEBLI');
  cbSet('f16d', 'VTPP');
  cbSet('f16e', '0050');
  cbSet('f16a', 'VTPO');
  cbSet('f16b', 'VTBL');
  tset('f18',   'RMK DEP 21/02 RMK REG 20202 OPR RTAF RMK REQ 2 ILS APPROCHES REQ JET A1 REFUELING');
  cbSet('f19e', '0230');
  cbSet('f19p', '005');
  chkSet('chk-uhf',     true);
  chkSet('chk-vhf',     true);
  chkSet('chk-elt',     true);
  chkSet('chk-polar',   true);
  chkSet('chk-polar2',  true);
  chkSet('chk-desert',  true);
  chkSet('chk-maritime',true);
  chkSet('chk-jungle',  true);
  chkSet('chk-jck',     true);
  chkSet('chk-light',   true);
  chkSet('chk-fluor',   true);
  chkSet('chk-juhf',    true);
  chkSet('chk-jvhf',    true);
  chkSet('chk-ding',    true);
  tset('f-color',  'GREY ROYAL THAI AIR FORCE');
  tset('f-pic',    'SCHMIDT');
  tset('f-filedby','SCHMIDT');
  tset('f-space',  'Please provide a telephone number so our operators can contact you if needed\n+66 825893932');
  updatePreview();
}

// ── Clear form ────────────────────────────────────────────────────────────────
function clearForm() {
  if (!confirm('ล้างข้อมูลทั้งหมด?')) return;
  Object.keys(CB).forEach(id => { CB[id].input.value = ''; syncCells(id); });
  document.querySelectorAll('.chk').forEach(el => el.classList.remove('on'));
  document.querySelectorAll('.fta, .fti').forEach(el => { el.value = ''; });
  updatePreview();
}

// ── PDF Export ────────────────────────────────────────────────────────────────
function exportPDF() {
  const form = document.getElementById('icao-form');
  const f7   = cbVal('f7') || 'FPL';
  const dep  = cbVal('f13d') || 'ZZZZ';
  const dest = cbVal('f16d') || 'ZZZZ';
  const time = cbVal('f13t') || '0000';

  const opt = {
    margin:      [5, 5, 5, 5],
    filename:    `FPL_${f7}_${dep}-${dest}_${time}Z.pdf`,
    image:       { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const wrapper = form.closest('.icao-wrapper');
  const origBg  = wrapper.style.background;
  wrapper.style.background = 'white';

  html2pdf().set(opt).from(form).save().then(() => {
    wrapper.style.background = origBg;
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCharBoxes();
  updatePreview();
  createDropdownEl();

  document.querySelectorAll('.fta, .fti').forEach(el => {
    el.addEventListener('input', () => {
      const s = el.selectionStart, e2 = el.selectionEnd;
      el.value = el.value.toUpperCase();
      el.setSelectionRange(s, e2);
      updatePreview();
    });
  });

  // Close dropdown on click outside
  document.addEventListener('pointerdown', e => {
    const dd = document.getElementById('cb-dropdown');
    if (!dd) return;
    if (!dd.contains(e.target) && !e.target.classList.contains('cbinput')) {
      hideDropdown();
    }
  });
});
