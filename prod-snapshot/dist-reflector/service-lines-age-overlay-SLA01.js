/*!
 * BCH 360° — Service Lines age-group drill-down overlay v01
 *
 * Adds clickable behavior to the 12 Service Lines KPI cards in the Overview tab.
 * On card click → fetches /api/overview/service-line-age/:code and displays a modal
 * with breakdown by Thai life-stage age groups:
 *   วัยเด็ก (0-14) · วัยรุ่น (15-24) · วัยแรงงาน (25-59) · สูงอายุ (60+)
 *
 * Standalone vanilla JS — no React. Pure DOM observer.
 */
(function () {
  'use strict';

  if (window.__svcAgeOverlayMounted) return;
  window.__svcAgeOverlayMounted = true;

  // Label → service-line code map
  var LABEL_TO_CODE = {
    'เภสัชกรรม':                'pharmacy',
    'ห้องปฏิบัติการ':            'lab',
    'รังสีวิทยา':                'xray',
    'ทันตกรรม':                 'dental',
    'กายภาพบำบัด':              'pt',
    'แพทย์แผนไทย':              'thaimed',
    'PMC ออฟฟิศซินโดรม':       'dept_140',
    'PMC กายภาพบ้านฉาง':       'dept_143',
    'PMC กายภาพ GC':            'dept_145',
    'ไตเทียม':                   'dept_040',
    'ฉีดยาทำแผล':                'dept_053',
    'Sleep Test':                'dept_130',
  };

  var STYLE = '\
.sla-modal-bg{position:fixed;inset:0;background:rgba(15,23,42,.72);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;animation:sla-fadein .15s}\
.sla-modal{background:var(--md-surface,#fff);color:var(--md-text-primary,#0f172a);border:1px solid var(--md-border,#e2e8f0);border-radius:16px;padding:24px;min-width:520px;max-width:680px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.4);font-family:Kanit,Sarabun,Noto Sans Thai,sans-serif;animation:sla-slidein .2s}\
.sla-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--md-border,#e2e8f0)}\
.sla-title{font-size:18px;font-weight:900;color:var(--md-text-primary,#0f172a);display:flex;align-items:center;gap:10px}\
.sla-title-icon{font-size:24px}\
.sla-close{cursor:pointer;background:none;border:1px solid var(--md-border,#e2e8f0);border-radius:8px;padding:4px 10px;font-size:14px;color:var(--md-text-secondary,#64748b)}\
.sla-close:hover{background:#f1f5f9;color:#0f172a}\
.sla-date{font-size:12px;color:var(--md-text-tertiary,#94a3b8);font-weight:600}\
.sla-loading{padding:30px;text-align:center;color:var(--md-text-tertiary,#94a3b8);font-size:13px}\
.sla-spin{display:inline-block;width:14px;height:14px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:sla-spin .6s linear infinite;vertical-align:middle;margin-right:8px}\
.sla-error{padding:24px;text-align:center;color:#dc2626;background:rgba(220,38,38,.05);border:1px solid rgba(220,38,38,.2);border-radius:10px}\
.sla-summary{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;padding:12px 14px;background:rgba(124,58,237,.05);border-radius:10px;border-left:4px solid #7c3aed}\
.sla-summary-item{font-size:12px}\
.sla-summary-item b{display:block;font-size:18px;font-weight:900;color:var(--md-text-primary,#0f172a);font-variant-numeric:tabular-nums;margin-top:2px}\
.sla-group{margin-bottom:14px;padding:12px 14px;border:1px solid var(--md-border,#e2e8f0);border-radius:10px;background:var(--md-surface,#fff)}\
.sla-group:hover{border-color:var(--md-text-tertiary,#94a3b8)}\
.sla-group-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}\
.sla-group-label{font-size:14px;font-weight:800;color:var(--md-text-primary,#0f172a)}\
.sla-group-icon{font-size:18px;margin-right:6px}\
.sla-group-metrics{display:grid;grid-template-columns:1fr 1fr;gap:10px}\
.sla-metric{padding:6px 8px;background:rgba(148,163,184,.06);border-radius:6px;font-size:11px;color:var(--md-text-secondary,#64748b)}\
.sla-metric b{display:block;font-weight:900;color:var(--md-text-primary,#0f172a);font-size:14px;font-variant-numeric:tabular-nums;margin-top:2px}\
.sla-bar{height:6px;background:rgba(148,163,184,.18);border-radius:3px;margin-top:6px;overflow:hidden}\
.sla-bar-fill{height:100%;border-radius:3px;transition:width .3s ease}\
.sla-footer{margin-top:14px;font-size:10px;color:var(--md-text-tertiary,#94a3b8);text-align:right;font-style:italic}\
.sla-card-clickable{cursor:pointer;transition:transform .12s,box-shadow .12s,border-color .12s}\
.sla-card-clickable:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(124,58,237,.15);border-color:#7c3aed}\
.sla-hint{position:absolute;top:6px;right:8px;font-size:10px;color:#7c3aed;font-weight:700;opacity:0;transition:opacity .15s;pointer-events:none}\
.sla-card-clickable:hover .sla-hint{opacity:1}\
@keyframes sla-spin{to{transform:rotate(360deg)}}\
@keyframes sla-fadein{from{opacity:0}to{opacity:1}}\
@keyframes sla-slidein{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}\
';

  function injectStyle() {
    if (document.getElementById('sla-overlay-style')) return;
    var s = document.createElement('style');
    s.id = 'sla-overlay-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toLocaleString('th-TH');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var GROUP_ICONS = {
    child: '👶',
    youth: '🧑‍🎓',
    working: '💼',
    elderly: '👴',
    unknown: '❓',
  };
  var GROUP_COLORS = {
    child: '#0ea5e9',
    youth: '#8b5cf6',
    working: '#0891b2',
    elderly: '#dc2626',
    unknown: '#94a3b8',
  };

  function renderModal(data, label) {
    var bg = document.createElement('div');
    bg.className = 'sla-modal-bg';
    bg.addEventListener('click', function (e) { if (e.target === bg) closeModal(); });

    var modal = document.createElement('div');
    modal.className = 'sla-modal';

    var totalV = data.total_visits || 0;
    var totalR = data.total_revenue || 0;

    var groupsHTML = (data.age_groups || []).map(function (g) {
      var vPct = totalV > 0 ? (g.visits / totalV * 100) : 0;
      var rPct = totalR > 0 ? (g.revenue / totalR * 100) : 0;
      var color = GROUP_COLORS[g.age_group] || '#7c3aed';
      var icon = GROUP_ICONS[g.age_group] || '👤';
      return '<div class="sla-group" style="border-left:4px solid ' + color + '">' +
        '<div class="sla-group-head">' +
          '<div class="sla-group-label"><span class="sla-group-icon">' + icon + '</span>' + esc(g.label) + '</div>' +
        '</div>' +
        '<div class="sla-group-metrics">' +
          '<div class="sla-metric">Visits<b>' + fmt(g.visits) + '</b>' +
            '<div class="sla-bar"><div class="sla-bar-fill" style="width:' + vPct + '%;background:' + color + '"></div></div>' +
            '<div style="font-size:10px;margin-top:3px;color:' + color + '">' + vPct.toFixed(1) + '%</div>' +
          '</div>' +
          '<div class="sla-metric">รายได้ (บาท)<b>' + fmt(g.revenue) + '</b>' +
            '<div class="sla-bar"><div class="sla-bar-fill" style="width:' + rPct + '%;background:' + color + '"></div></div>' +
            '<div style="font-size:10px;margin-top:3px;color:' + color + '">' + rPct.toFixed(1) + '%</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    modal.innerHTML =
      '<div class="sla-header">' +
        '<div class="sla-title"><span class="sla-title-icon">📊</span>' +
          esc(label || data.label) + ' — รายละเอียดแยกตามอายุ' +
          '<span class="sla-date" style="margin-left:8px">· ' + esc(data.date) + '</span>' +
        '</div>' +
        '<button class="sla-close" onclick="window.__slaClose()">✕ ปิด</button>' +
      '</div>' +
      '<div class="sla-summary">' +
        '<div class="sla-summary-item">รวม visits<b>' + fmt(totalV) + '</b></div>' +
        '<div class="sla-summary-item">รวมรายได้<b>' + fmt(totalR) + ' บาท</b></div>' +
      '</div>' +
      groupsHTML +
      '<div class="sla-footer">ข้อมูลจาก HOSxP XE · อายุคำนวณจาก patient.birthday ณ วันที่ ' + esc(data.date) + '</div>';

    bg.appendChild(modal);
    document.body.appendChild(bg);
    window.__slaModalEl = bg;
  }

  function closeModal() {
    if (window.__slaModalEl) {
      window.__slaModalEl.remove();
      window.__slaModalEl = null;
    }
  }
  window.__slaClose = closeModal;

  function renderLoading(label) {
    var bg = document.createElement('div');
    bg.className = 'sla-modal-bg';
    bg.addEventListener('click', function (e) { if (e.target === bg) closeModal(); });
    var modal = document.createElement('div');
    modal.className = 'sla-modal';
    modal.innerHTML =
      '<div class="sla-header"><div class="sla-title">📊 ' + esc(label) + '</div>' +
      '<button class="sla-close" onclick="window.__slaClose()">✕ ปิด</button></div>' +
      '<div class="sla-loading"><span class="sla-spin"></span>กำลังโหลดข้อมูล…</div>';
    bg.appendChild(modal);
    document.body.appendChild(bg);
    window.__slaModalEl = bg;
  }

  function renderError(label, msg) {
    closeModal();
    var bg = document.createElement('div');
    bg.className = 'sla-modal-bg';
    bg.addEventListener('click', function (e) { if (e.target === bg) closeModal(); });
    var modal = document.createElement('div');
    modal.className = 'sla-modal';
    modal.innerHTML =
      '<div class="sla-header"><div class="sla-title">📊 ' + esc(label) + '</div>' +
      '<button class="sla-close" onclick="window.__slaClose()">✕ ปิด</button></div>' +
      '<div class="sla-error">❌ โหลดข้อมูลไม่สำเร็จ: ' + esc(msg) + '</div>';
    bg.appendChild(modal);
    document.body.appendChild(bg);
    window.__slaModalEl = bg;
  }

  function openCard(code, label) {
    renderLoading(label);
    fetch('/api/overview/service-line-age/' + code, { credentials: 'include' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        closeModal();
        renderModal(data, label);
      })
      .catch(function (e) { renderError(label, e.message); });
  }

  function attachClickHandlers() {
    // Find all KPIBlock cards in DOM (look for h4 labels matching service line names)
    // KPIBlock structure: container has a label text node with one of our 12 names
    var allDivs = document.querySelectorAll('div');
    for (var i = 0; i < allDivs.length; i++) {
      var div = allDivs[i];
      if (div.dataset.slaWired === '1') continue;
      // Find the label text inside
      // Heuristic: look for direct text or child div text that matches a known label
      var labelText = null;
      var nodes = div.querySelectorAll('div, span');
      for (var j = 0; j < Math.min(nodes.length, 6); j++) {
        var t = (nodes[j].textContent || '').trim();
        if (LABEL_TO_CODE[t]) { labelText = t; break; }
      }
      if (!labelText) continue;
      // Verify this is the KPIBlock root (has a service-line-style structure)
      // Heuristic: contains "visit" or "บาท" text (one of the metric markers)
      var content = (div.textContent || '');
      if (!/visit\s*\/|บาท/.test(content)) continue;
      // Skip if div is too big (we want the card itself, not the parent grid)
      if (div.children.length > 6) continue;

      var code = LABEL_TO_CODE[labelText];
      div.dataset.slaWired = '1';
      div.dataset.slaCode = code;
      div.dataset.slaLabel = labelText;
      div.classList.add('sla-card-clickable');
      if (div.style.position !== 'relative' && div.style.position !== 'absolute') {
        div.style.position = 'relative';
      }
      var hint = document.createElement('div');
      hint.className = 'sla-hint';
      hint.textContent = '🔍 คลิกดูรายละเอียด';
      div.appendChild(hint);
      div.addEventListener('click', (function (c, l) {
        return function () { openCard(c, l); };
      })(code, labelText));
    }
  }

  var schedTimer = null;
  function scheduleAttach() {
    if (schedTimer) return;
    schedTimer = setTimeout(function () {
      schedTimer = null;
      try { attachClickHandlers(); } catch (e) { /* silent */ }
    }, 200);
  }

  function startObserver() {
    var root = document.getElementById('root');
    if (!root) return;
    new MutationObserver(scheduleAttach).observe(root, { childList: true, subtree: true });
  }

  function boot() {
    injectStyle();
    startObserver();
    setTimeout(attachClickHandlers, 400);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && window.__slaModalEl) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
