/*!
 * BCH 360° — Disease Surveillance Banner (vanilla JS, edit-on-prod injection)
 * พรบ. โรคติดต่อ พ.ศ. 2558 — ม.3 (อันตราย) + ม.5 (เฝ้าระวัง)
 * Injected via dist/index.html — runs outside React tree, mounts above <main>
 */
(function() {
  'use strict';

  if (window.__dsvBannerMounted) return;
  window.__dsvBannerMounted = true;

  var KEYFRAMES = '@keyframes dsv-pulse-crit{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.5)}50%{box-shadow:0 0 0 8px rgba(220,38,38,0)}}@keyframes dsv-pulse-warn{0%,100%{box-shadow:0 0 0 0 rgba(217,119,6,.4)}50%{box-shadow:0 0 0 6px rgba(217,119,6,0)}}@keyframes dsv-siren{0%,100%{transform:scale(1) rotate(-8deg);opacity:1}25%{transform:scale(1.18) rotate(8deg);opacity:1}50%{transform:scale(.95) rotate(-8deg);opacity:.65}75%{transform:scale(1.18) rotate(8deg);opacity:1}}.dsv-banner-crit{animation:dsv-pulse-crit 1.5s ease-in-out infinite}.dsv-banner-warn{animation:dsv-pulse-warn 2s ease-in-out infinite}.dsv-siren{animation:dsv-siren 1s ease-in-out infinite;display:inline-block}';

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

  function rowHTML(d, color) {
    return '<div style="display:flex;align-items:center;gap:8px;font-size:11px;padding:4px 6px;border-radius:4px;background:' + color + '08">' +
      '<span style="width:6px;height:6px;border-radius:50%;background:' + color + ';flex-shrink:0"></span>' +
      '<span style="flex:1;font-weight:700;color:var(--md-text-primary)">' + esc(d.th) + '</span>' +
      '<span style="font-size:10px;color:var(--md-text-tertiary)">ICD: ' + esc((d.codes || []).join(', ')) + '</span>' +
      '<span style="font-weight:900;color:' + color + ';min-width:36px;text-align:right">' + fmt(d.patients) + ' ราย</span>' +
      (d.latest_date ?
        '<span style="font-size:10px;color:var(--md-text-tertiary);min-width:78px;text-align:right">ล่าสุด ' + esc(d.latest_date) + '</span>' :
        '') +
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
      '<div style="display:flex;flex-direction:column;gap:4px">' +
      info.dangerous.map(function(d) {
        return rowHTML(d, '#dc2626');
      }).join('') +
      '</div>';

    var watchRows = (info.watch || []).length === 0 ?
      '<div style="font-size:11px;color:var(--md-text-tertiary);font-style:italic">ไม่พบในรอบ 30 วัน ✅</div>' :
      '<div style="display:flex;flex-direction:column;gap:4px">' +
      info.watch.slice(0, 10).map(function(d) {
        return rowHTML(d, '#d97706');
      }).join('') +
      '</div>';

    var generated = '';
    try {
      generated = new Date(info.generated_at).toLocaleString('th-TH');
    } catch (e) {}

    var detailsBlock = expanded ?
      '<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
      '<div style="background:var(--md-surface);border-radius:8px;padding:10px;border:1px solid #dc262625">' +
      '<div style="font-size:11px;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">🩸 โรคติดต่ออันตราย (ม.3) — พรบ. โรคติดต่อ พ.ศ. 2558</div>' +
      dangerousRows +
      '</div>' +
      '<div style="background:var(--md-surface);border-radius:8px;padding:10px;border:1px solid #d9770625">' +
      '<div style="font-size:11px;font-weight:900;color:#d97706;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">👁️ โรคที่ต้องเฝ้าระวัง (ม.5) — TOP ' + Math.min(10, (info.watch || []).length) + '</div>' +
      watchRows +
      '</div>' +
      '<div style="grid-column:1 / span 2;font-size:10px;color:var(--md-text-tertiary);font-style:italic;text-align:right;margin-top:-4px">' +
      'ที่มา: HOSxP (ICD-10 จาก ovstdiag + an_stat.pdx) · อัปเดต ' + esc(generated) + ' · ทบทวนรายการ ICD-10 ใน server/data/diseaseSurveillanceCodes.js' +
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

  var state = {
    info: null,
    expanded: false
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

  function render() {
    var el = ensureContainer();
    if (!el) return;
    if (!state.info || state.info.level === 'none') {
      el.innerHTML = '';
      return;
    }
    el.innerHTML = bannerHTML(state.info, state.expanded);
    var btn = document.getElementById('dsv-toggle');
    if (btn) {
      btn.onclick = function() {
        state.expanded = !state.expanded;
        render();
      };
    }
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

  // Re-mount whenever React re-renders <main> (route change)
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