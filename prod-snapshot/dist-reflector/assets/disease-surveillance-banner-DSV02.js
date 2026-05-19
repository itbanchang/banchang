/*!
 * BCH 360° — Disease Surveillance Banner (vanilla JS, edit-on-prod injection)
 * v02 — adds per-disease tambon drill-down
 * พรบ. โรคติดต่อ พ.ศ. 2558 — ม.3 (อันตราย) + ม.5 (เฝ้าระวัง)
 * Injected via dist/index.html — runs outside React tree, mounts above <main>
 */
(function() {
  'use strict';

  if (window.__dsvBannerMounted) return;
  window.__dsvBannerMounted = true;

  var KEYFRAMES = '@keyframes dsv-pulse-crit{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.5)}50%{box-shadow:0 0 0 8px rgba(220,38,38,0)}}@keyframes dsv-pulse-warn{0%,100%{box-shadow:0 0 0 0 rgba(217,119,6,.4)}50%{box-shadow:0 0 0 6px rgba(217,119,6,0)}}@keyframes dsv-siren{0%,100%{transform:scale(1) rotate(-8deg);opacity:1}25%{transform:scale(1.18) rotate(8deg);opacity:1}50%{transform:scale(.95) rotate(-8deg);opacity:.65}75%{transform:scale(1.18) rotate(8deg);opacity:1}}@keyframes dsv-spin{to{transform:rotate(360deg)}}.dsv-banner-crit{animation:dsv-pulse-crit 1.5s ease-in-out infinite}.dsv-banner-warn{animation:dsv-pulse-warn 2s ease-in-out infinite}.dsv-siren{animation:dsv-siren 1s ease-in-out infinite;display:inline-block}.dsv-row{cursor:pointer;transition:background .15s}.dsv-row:hover{filter:brightness(1.1)}.dsv-spin{display:inline-block;width:10px;height:10px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:dsv-spin .6s linear infinite;vertical-align:middle}.dsv-tambon-bar{height:6px;border-radius:3px;overflow:hidden;background:rgba(255,255,255,.08)}.dsv-tambon-bar-fill{height:100%;border-radius:3px}';

  function injectStyle() {
    if (document.getElementById('dsv-style')) return;
    var s = document.createElement('style');
    s.id = 'dsv-style';
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }

  function fmt(v) {
    if (v == null || isNaN(v)) return '—';
    return Number(v).toLocaleString('th-TH');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      } [c];
    });
  }

  function rowHTML(d, color, section) {
    var rowId = section + '_' + d.key;
    var expanded = !!state.tambonOpen[rowId];
    var loading = !!state.tambonLoading[rowId];
    var tambons = state.tambonData[rowId];

    return '<div data-dsv-row="' + esc(rowId) + '" data-dsv-section="' + esc(section) + '" data-dsv-key="' + esc(d.key) + '">' +
      '<div class="dsv-row" style="display:flex;align-items:center;gap:8px;font-size:11px;padding:4px 6px;border-radius:4px;background:' + color + '08">' +
      '<span style="width:14px;color:' + color + ';font-weight:900;text-align:center;flex-shrink:0">' + (expanded ? '▾' : '▸') + '</span>' +
      '<span style="width:6px;height:6px;border-radius:50%;background:' + color + ';flex-shrink:0"></span>' +
      '<span style="flex:1;font-weight:700;color:var(--md-text-primary)">' + esc(d.th) + '</span>' +
      '<span style="font-size:10px;color:var(--md-text-tertiary)">ICD: ' + esc((d.codes || []).join(', ')) + '</span>' +
      '<span style="font-weight:900;color:' + color + ';min-width:36px;text-align:right">' + fmt(d.patients) + ' ราย</span>' +
      (d.latest_date ?
        '<span style="font-size:10px;color:var(--md-text-tertiary);min-width:78px;text-align:right">ล่าสุด ' + esc(d.latest_date) + '</span>' :
        '<span style="min-width:78px"></span>') +
      '</div>' +
      (expanded ? tambonDrawerHTML(rowId, color, loading, tambons) : '') +
      '</div>';
  }

  function tambonDrawerHTML(rowId, color, loading, tambons) {
    if (loading) {
      return '<div style="margin:4px 0 6px 28px;padding:8px 10px;font-size:11px;color:var(--md-text-tertiary);background:' + color + '05;border-left:2px solid ' + color + '40;border-radius:0 6px 6px 0">' +
        '<span class="dsv-spin" style="color:' + color + '"></span> &nbsp; กำลังโหลดข้อมูลรายตำบล…' +
        '</div>';
    }
    if (!tambons) return '';
    if (tambons.length === 0) {
      return '<div style="margin:4px 0 6px 28px;padding:8px 10px;font-size:11px;color:var(--md-text-tertiary);background:' + color + '05;border-left:2px solid ' + color + '40;border-radius:0 6px 6px 0">— ไม่มีข้อมูลรายตำบล —</div>';
    }
    var max = tambons.reduce(function(m, t) {
      return Math.max(m, t.patients);
    }, 0) || 1;

    // Group: BCH catchment first (chwpart=21 amppart=02), then ระยอง อื่นๆ, then นอกจังหวัด
    function isBchCatchment(t) {
      return t.chwpart === '21' && t.amppart === '02';
    }

    function isRayongOther(t) {
      return t.chwpart === '21' && !isBchCatchment(t);
    }

    var inHouse = tambons.filter(isBchCatchment);
    var rayong = tambons.filter(isRayongOther);
    var outside = tambons.filter(function(t) {
      return !isBchCatchment(t) && !isRayongOther(t);
    });

    function tambonLine(t) {
      var pct = max ? Math.round((t.patients / max) * 100) : 0;
      var place = t.full_name ? esc(t.full_name) : ('ต.' + esc(t.tambon_name));
      return '<div style="display:grid;grid-template-columns:1fr 60px 78px;gap:8px;align-items:center;font-size:11px;padding:3px 6px">' +
        '<div style="min-width:0">' +
        '<div style="font-weight:700;color:var(--md-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + place + '</div>' +
        '<div class="dsv-tambon-bar" style="margin-top:2px"><div class="dsv-tambon-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
        '</div>' +
        '<div style="text-align:right;font-weight:900;color:' + color + ';white-space:nowrap">' + fmt(t.patients) + ' ราย</div>' +
        '<div style="text-align:right;font-size:10px;color:var(--md-text-tertiary);white-space:nowrap">' +
        (t.opd_visits ? 'OPD ' + fmt(t.opd_visits) : '') +
        (t.ipd_admissions ? ' · IPD ' + fmt(t.ipd_admissions) : '') +
        '</div>' +
        '</div>';
    }

    function groupBlock(title, list, badgeColor) {
      if (list.length === 0) return '';
      var totalPatients = list.reduce(function(s, t) {
        return s + t.patients;
      }, 0);
      return '<div style="margin-top:6px">' +
        '<div style="display:flex;align-items:center;gap:6px;font-size:10px;font-weight:900;color:' + badgeColor + ';text-transform:uppercase;letter-spacing:.05em;padding:2px 6px">' +
        '<span>' + title + '</span>' +
        '<span style="color:var(--md-text-tertiary);font-weight:700">· ' + list.length + ' ตำบล · ' + fmt(totalPatients) + ' ราย</span>' +
        '</div>' +
        list.map(tambonLine).join('') +
        '</div>';
    }

    return '<div style="margin:4px 0 8px 28px;padding:8px 8px 10px;background:' + color + '05;border-left:2px solid ' + color + '40;border-radius:0 6px 6px 0">' +
      groupBlock('📍 ในเขตอำเภอบ้านฉาง', inHouse, color) +
      groupBlock('🚗 ระยอง — อำเภออื่น', rayong, color) +
      groupBlock('🌐 นอกจังหวัดระยอง', outside, color) +
      '</div>';
  }

  function bannerHTML(info, expanded) {
    var crit = info.level === 'critical';
    var color = crit ? '#dc2626' : '#d97706';
    var bg = crit ? 'rgba(220,38,38,.08)' : 'rgba(217,119,6,.08)';
    var borderColor = crit ? '#dc262640' : '#d9770640';
    var icon = crit ? '🚨' : '⚠️';
    var headLabel = crit ?
      'พบรายงานโรคติดต่ออันตราย (ม.3) ในรอบ 30 วัน' :
      'มีรายงานโรคติดต่อที่ต้องเฝ้าระวัง (ม.5) ในรอบ 30 วัน';

    var dangerousRows = (info.dangerous || []).length === 0 ?
      '<div style="font-size:11px;color:var(--md-text-tertiary);font-style:italic">ไม่พบในรอบ 30 วัน — ปลอดภัย ✅</div>' :
      '<div style="display:flex;flex-direction:column;gap:2px">' +
      info.dangerous.map(function(d) {
        return rowHTML(d, '#dc2626', 'dangerous');
      }).join('') +
      '</div>';

    var watchRows = (info.watch || []).length === 0 ?
      '<div style="font-size:11px;color:var(--md-text-tertiary);font-style:italic">ไม่พบในรอบ 30 วัน ✅</div>' :
      '<div style="display:flex;flex-direction:column;gap:2px">' +
      info.watch.slice(0, 10).map(function(d) {
        return rowHTML(d, '#d97706', 'watch');
      }).join('') +
      '</div>';

    var generated = '';
    try {
      generated = new Date(info.generated_at).toLocaleString('th-TH');
    } catch (e) {}

    var detailsBlock = expanded ?
      '<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
      '<div style="background:var(--md-surface);border-radius:8px;padding:10px;border:1px solid #dc262625">' +
      '<div style="font-size:11px;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">🩸 โรคติดต่ออันตราย (ม.3) — พรบ. โรคติดต่อ พ.ศ. 2558 <span style="font-weight:700;color:var(--md-text-tertiary);text-transform:none;letter-spacing:0">· คลิกเพื่อดูรายตำบล</span></div>' +
      dangerousRows +
      '</div>' +
      '<div style="background:var(--md-surface);border-radius:8px;padding:10px;border:1px solid #d9770625">' +
      '<div style="font-size:11px;font-weight:900;color:#d97706;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">👁️ โรคที่ต้องเฝ้าระวัง (ม.5) — TOP ' + Math.min(10, (info.watch || []).length) + ' <span style="font-weight:700;color:var(--md-text-tertiary);text-transform:none;letter-spacing:0">· คลิกเพื่อดูรายตำบล</span></div>' +
      watchRows +
      '</div>' +
      '<div style="grid-column:1 / span 2;font-size:10px;color:var(--md-text-tertiary);font-style:italic;text-align:right;margin-top:-4px">' +
      'ที่มา: HOSxP (ICD-10 จาก ovstdiag + an_stat.pdx · ที่อยู่จาก patient + thaiaddress) · อัปเดต ' + esc(generated) +
      '</div>' +
      '</div>' :
      '';

    return '<div class="' + (crit ? 'dsv-banner-crit' : 'dsv-banner-warn') + '" style="padding:12px 16px;margin-bottom:12px;border-radius:12px;background:linear-gradient(135deg,' + bg + ' 0%, var(--md-surface) 100%);border:1.5px solid ' + borderColor + '">' +
      '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">' +
      '<span class="' + (crit ? 'dsv-siren' : '') + '" style="font-size:22px">' + icon + '</span>' +
      '<div style="flex:1;min-width:240px">' +
      '<div style="font-size:13px;font-weight:900;color:' + color + ';line-height:1.3">' + headLabel + '</div>' +
      '<div style="font-size:11px;font-weight:600;color:var(--md-text-secondary);margin-top:2px">' +
      'ม.3 อันตราย: <b style="color:#dc2626">' + esc(info.dangerous_diseases) + '</b> โรค · <b style="color:#dc2626">' + esc(info.dangerous_count) + '</b> ราย &nbsp;|&nbsp; ' +
      'ม.5 เฝ้าระวัง: <b style="color:#d97706">' + esc(info.watch_diseases) + '</b> โรค · <b style="color:#d97706">' + esc(info.watch_count) + '</b> ราย ' +
      '&nbsp; · ช่วง ' + esc(info.from) + ' → ' + esc(info.to) +
      '</div>' +
      '</div>' +
      '<button id="dsv-toggle" style="padding:6px 12px;border-radius:8px;font-size:11px;font-weight:800;border:1.5px solid ' + color + ';cursor:pointer;background:' + (expanded ? color : 'transparent') + ';color:' + (expanded ? '#fff' : color) + '">' +
      (expanded ? '▲ ซ่อนรายละเอียด' : '▼ ดูรายการ') +
      '</button>' +
      '</div>' +
      detailsBlock +
      '</div>';
  }

  // ── State ──
  var state = {
    info: null,
    expanded: false,
    tambonOpen: {}, // { 'dangerous_covid19': true }
    tambonLoading: {}, // { 'watch_hiv_new': true }
    tambonData: {}, // { 'watch_hiv_new': [...] }
  };
  var container = null;

  function ensureContainer() {
    if (container && document.body.contains(container)) return container;
    var main = document.querySelector('main');
    if (!main) return null;
    container = document.getElementById('dsv-banner-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dsv-banner-root';
      main.insertBefore(container, main.firstChild);
    } else if (container.parentNode !== main || container !== main.firstChild) {
      main.insertBefore(container, main.firstChild);
    }
    return container;
  }

  function attachHandlers() {
    var btn = document.getElementById('dsv-toggle');
    if (btn) {
      btn.onclick = function() {
        state.expanded = !state.expanded;
        render();
      };
    }
    var rows = document.querySelectorAll('[data-dsv-row]');
    for (var i = 0; i < rows.length; i++) {
      (function(rowWrap) {
        var clickable = rowWrap.querySelector('.dsv-row');
        if (!clickable) return;
        clickable.onclick = function() {
          var rowId = rowWrap.getAttribute('data-dsv-row');
          var section = rowWrap.getAttribute('data-dsv-section');
          var key = rowWrap.getAttribute('data-dsv-key');
          toggleTambon(rowId, section, key);
        };
      })(rows[i]);
    }
  }

  function render() {
    var el = ensureContainer();
    if (!el) return;
    if (!state.info || state.info.level === 'none') {
      el.innerHTML = '';
      return;
    }
    el.innerHTML = bannerHTML(state.info, state.expanded);
    attachHandlers();
  }

  function fetchActive() {
    fetch('/api/disease-surveillance/active', {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : null;
      })
      .then(function(j) {
        if (!j) return;
        state.info = j;
        render();
      })
      .catch(function() {
        /* silent */ });
  }

  function toggleTambon(rowId, section, key) {
    if (state.tambonOpen[rowId]) {
      // close
      state.tambonOpen[rowId] = false;
      render();
      return;
    }
    state.tambonOpen[rowId] = true;
    if (state.tambonData[rowId]) {
      render();
      return;
    }
    state.tambonLoading[rowId] = true;
    render();
    fetch('/api/disease-surveillance/by-tambon?key=' + encodeURIComponent(key) + '&section=' + encodeURIComponent(section), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : null;
      })
      .then(function(j) {
        state.tambonLoading[rowId] = false;
        state.tambonData[rowId] = (j && j.tambons) ? j.tambons : [];
        render();
      })
      .catch(function() {
        state.tambonLoading[rowId] = false;
        state.tambonData[rowId] = [];
        render();
      });
  }

  function startObserver() {
    var root = document.getElementById('root');
    if (!root) return;
    var obs = new MutationObserver(function() {
      if (!state.info) return;
      var el = ensureContainer();
      if (el && el.children.length === 0) render();
    });
    obs.observe(root, {
      childList: true,
      subtree: true
    });
  }

  function boot() {
    injectStyle();
    startObserver();
    fetchActive();
    setInterval(fetchActive, 5 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();