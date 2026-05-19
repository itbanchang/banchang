/*!
 * BCH 360° — Overview · Service Lines · Age-breakdown popup overlay v01
 * Each of the 12 Service Line cards becomes clickable → opens a popup showing
 * visits + revenue split by 4 Thai life-stage age groups:
 *   วัยเด็ก (0-14) · วัยรุ่น (15-24) · วัยแรงงาน (25-59) · วัยสูงอายุ (60+)
 *
 * Mounts via DOM detection — no React state mutation. Idempotent.
 */
(function() {
  'use strict';
  if (window.__ovAgeOverlayMounted) return;
  window.__ovAgeOverlayMounted = true;

  // Label (Thai exactly as shown in the dashboard) → API service code
  var SERVICE_MAP = {
    'เภสัชกรรม': 'pharmacy',
    'ห้องปฏิบัติการ': 'lab',
    'รังสีวิทยา': 'xray',
    'ทันตกรรม': 'dental',
    'กายภาพบำบัด': 'pt',
    'แพทย์แผนไทย': 'thaimed',
    'PMC ออฟฟิศซินโดรม': 'dept_140',
    'PMC กายภาพบ้านฉาง': 'dept_143',
    'PMC กายภาพ GC': 'dept_145',
    'ไตเทียม': 'dept_040',
    'ฉีดยาทำแผล': 'dept_053',
    'Sleep Test': 'dept_130',
  };

  var COLORS = {
    child: '#10b981', // green
    youth: '#0ea5e9', // sky
    working: '#7c3aed', // violet
    elderly: '#ea580c', // orange
    unknown: '#94a3b8', // gray
  };

  var STYLE = [
    '.ov-age-modal-bg{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);animation:ovAgeFade .15s ease-out}',
    '@keyframes ovAgeFade{from{opacity:0}to{opacity:1}}',
    '.ov-age-modal{background:var(--md-surface,#fff);border:1px solid var(--md-border,#e5e7eb);border-radius:14px;padding:20px 24px;max-width:580px;width:92vw;box-shadow:0 20px 60px rgba(0,0,0,.25);color:var(--md-text-primary,#0f172a);font-family:Kanit,Sarabun,Noto Sans Thai,sans-serif}',
    '.ov-age-modal h3{margin:0 0 4px;font-size:16px;font-weight:900}',
    '.ov-age-modal .ov-age-sub{font-size:11px;color:var(--md-text-tertiary,#6b7280);margin-bottom:14px}',
    '.ov-age-table{width:100%;border-collapse:collapse;font-size:12px;font-variant-numeric:tabular-nums}',
    '.ov-age-table th{font-weight:800;color:var(--md-text-tertiary,#6b7280);text-transform:uppercase;font-size:10px;padding:6px 8px;text-align:left;border-bottom:1px solid var(--md-border,#e5e7eb)}',
    '.ov-age-table td{padding:8px;border-bottom:1px dashed var(--md-border,#e5e7eb)}',
    '.ov-age-table tr:last-child td{border-bottom:none}',
    '.ov-age-table .num{text-align:right}',
    '.ov-age-bar{height:8px;border-radius:4px;background:rgba(148,163,184,.18);overflow:hidden;margin-top:3px}',
    '.ov-age-bar-fill{height:100%;border-radius:4px;transition:width .3s ease-out}',
    '.ov-age-chip{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:middle}',
    '.ov-age-total{font-size:12px;font-weight:800;border-top:2px solid var(--md-border,#e5e7eb);padding-top:8px;margin-top:6px;display:flex;justify-content:space-between;color:var(--md-text-primary,#0f172a)}',
    '.ov-age-close{position:absolute;top:12px;right:14px;border:none;background:transparent;cursor:pointer;font-size:22px;color:var(--md-text-tertiary,#6b7280);line-height:1}',
    '.ov-age-close:hover{color:var(--md-text-primary,#0f172a)}',
    '.ov-age-loading{text-align:center;padding:24px;color:var(--md-text-tertiary,#6b7280);font-size:12px}',
    '.ov-age-error{color:#dc2626;font-size:12px;padding:14px;background:rgba(220,38,38,.06);border:1px solid #dc262640;border-radius:8px}',
    /* Markers retained for click delegation only — visual styles removed because
       OSM01 (merged Service Lines section) renders its own clickable cards with a
       built-in hint div. Old hidden cards don't need visible cues, and sidebar nav
       items that share the same Thai labels (ทันตกรรม/รังสีวิทยา/...) must NOT get
       a "👆 คลิกดูตามช่วงอายุ" tooltip from a leftover ::after pseudo-element. */
    '[data-ov-age-clickable="1"] span[style*="font-size: 24px"],[data-ov-age-clickable="1"] span[style*="font-size:24px"]{font-size:14px !important;line-height:1.25 !important}',
  ].join('');

  function injectStyle() {
    if (document.getElementById('ov-age-overlay-style')) return;
    var s = document.createElement('style');
    s.id = 'ov-age-overlay-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toLocaleString('th-TH');
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

  // Detect whether a card lives in the MTD section by walking up the DOM
  // looking for a nearby section header containing "เดือนนี้" / "เดือน".
  function detectPeriod(card) {
    // Walk up to the section block (parent of card grid), then look for section header siblings
    var node = card;
    for (var depth = 0; depth < 8 && node && node !== document.body; depth++) {
      // Search prior siblings for a section header text containing "เดือน"
      var sib = node.previousElementSibling;
      while (sib) {
        var text = (sib.textContent || '');
        if (text.indexOf('เดือนนี้') !== -1 || text.indexOf('Service Lines · visits เดือน') !== -1) {
          return 'mtd';
        }
        if (text.indexOf('วันนี้ — Service Lines') !== -1 || text.indexOf('วันนี้ — Service') !== -1) {
          return 'today';
        }
        sib = sib.previousElementSibling;
      }
      node = node.parentElement;
    }
    return 'today'; // default
  }

  // Test if an element is inside the dashboard's left sidebar (Sidebar.jsx)
  // Sidebar items match the same Thai labels as Service Lines cards, so we must
  // exclude them to avoid mistakenly attaching the "คลิกดูตามช่วงอายุ" hint.
  function isInsideSidebar(el) {
    var node = el;
    while (node && node !== document.body) {
      // Standard semantic elements
      var tag = (node.tagName || '').toUpperCase();
      if (tag === 'NAV' || tag === 'ASIDE') return true;
      // Role attribute
      var role = node.getAttribute && node.getAttribute('role');
      if (role === 'navigation' || role === 'menu' || role === 'menubar' || role === 'menuitem') return true;
      // Class-name hints
      var cls = (node.className && typeof node.className === 'string') ? node.className.toLowerCase() : '';
      if (cls && (cls.indexOf('sidebar') !== -1 || cls.indexOf('side-nav') !== -1 || cls.indexOf('nav-menu') !== -1)) return true;
      // Width hint — sidebars are typically narrow (≤280px) and tall
      if (node.offsetWidth && node.offsetWidth > 0 && node.offsetWidth <= 280 && node.offsetHeight > 400) {
        // Only consider as sidebar if it has many children (a menu list)
        if (node.children && node.children.length >= 6) return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  // Find ALL KPIBlock roots that match a given label text (Today + MTD both)
  function findAllCardsByLabel(labelText) {
    var matches = [];
    var seen = new Set();
    var spans = document.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      var sp = spans[i];
      var t = (sp.textContent || '').trim();
      if (t !== labelText) continue;
      // Skip sidebar menu items that share the same Thai label
      if (isInsideSidebar(sp)) continue;
      var node = sp;
      while (node && node !== document.body) {
        var style = node.getAttribute && node.getAttribute('style') || '';
        if (style.indexOf('border-radius') !== -1 && style.indexOf('padding') !== -1) {
          if (!seen.has(node)) {
            seen.add(node);
            matches.push(node);
          }
          break;
        }
        node = node.parentElement;
      }
    }
    return matches;
  }

  function attachClickHandlers() {
    var changed = 0;
    Object.keys(SERVICE_MAP).forEach(function(label) {
      var code = SERVICE_MAP[label];
      var cards = findAllCardsByLabel(label);
      cards.forEach(function(card) {
        if (card.dataset.ovAgeClickable === '1') return;
        card.dataset.ovAgeClickable = '1';
        card.dataset.ovAgeCode = code;
        card.dataset.ovAgeLabel = label;
        card.dataset.ovAgePeriod = detectPeriod(card); // 'today' | 'mtd'
        changed++;
      });
    });
    return changed;
  }

  // Bangkok-aware date helpers (UTC offset +7)
  function bkkToday() {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok'
    }).format(new Date());
  }

  function bkkMonthStart() {
    var today = bkkToday(); // YYYY-MM-DD
    return today.slice(0, 7) + '-01';
  }

  // Click delegation removed — OSM01 (merged Service Lines section) handles all
  // Service Lines card clicks directly via its own event listener, calling
  // window.__ovAgeOpenModal(...) below. Keeping delegation here caused sidebar
  // menu items with matching Thai labels to incorrectly trigger the age modal.

  // Internal: open modal with explicit date range
  // Public API: window.__ovAgeOpenModal(code, label, from, to, periodLabel)
  function openAgeModalRange(code, label, from, to, periodLabel) {
    closeAgeModal();
    var bg = document.createElement('div');
    bg.className = 'ov-age-modal-bg';
    bg.id = 'ov-age-modal-bg';
    bg.addEventListener('click', function(e) {
      if (e.target === bg) closeAgeModal();
    });

    var subLabel = periodLabel || '📅';
    var modal = document.createElement('div');
    modal.className = 'ov-age-modal';
    modal.style.position = 'relative';
    modal.innerHTML =
      '<button class="ov-age-close" aria-label="ปิด">×</button>' +
      '<h3>📊 ' + esc(label) + ' — แยกตามช่วงอายุ</h3>' +
      '<div class="ov-age-sub" id="ov-age-sub">' + subLabel + ' · กำลังโหลด…</div>' +
      '<div id="ov-age-body" class="ov-age-loading">⏳ กำลังโหลดข้อมูล…</div>';
    bg.appendChild(modal);
    document.body.appendChild(bg);

    modal.querySelector('.ov-age-close').addEventListener('click', closeAgeModal);
    document.addEventListener('keydown', escClose);

    var url = '/api/overview/service-line-age/' + encodeURIComponent(code) +
      '?from=' + encodeURIComponent(from) + '&to=' + encodeURIComponent(to);

    fetch(url, {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(r.status);
      })
      .then(function(data) {
        renderAgeData(modal, data, subLabel);
      })
      .catch(function(err) {
        var body = modal.querySelector('#ov-age-body');
        if (body) body.innerHTML = '<div class="ov-age-error">โหลดข้อมูลไม่สำเร็จ (' + esc(String(err)) + ')</div>';
      });
  }
  // Expose for the merged-section overlay
  window.__ovAgeOpenModal = openAgeModalRange;

  // Back-compat: period-based opener (today | mtd) for legacy cards
  function openAgeModal(code, label, period) {
    var today = bkkToday();
    if (period === 'mtd') {
      openAgeModalRange(code, label, bkkMonthStart(), today, '📅 เดือนนี้');
    } else {
      openAgeModalRange(code, label, today, today, '📅 วันนี้');
    }
  }

  function renderAgeData(modal, data, periodLabel) {
    var sub = modal.querySelector('#ov-age-sub');
    var body = modal.querySelector('#ov-age-body');
    if (!sub || !body) return;

    var rangeText = data.is_range ?
      data.from + ' → ' + data.to :
      (data.from || data.date || '—');
    sub.textContent = (periodLabel || '📅') + ' · ' + rangeText + ' · รวม ' + fmt(data.total_visits) + ' visit / ' + fmt(data.total_revenue) + ' บาท';

    var groups = data.age_groups || [];
    var maxVisits = Math.max(1, groups.reduce(function(m, g) {
      return Math.max(m, g.visits || 0);
    }, 0));

    var rowsHtml = groups.map(function(g) {
      var pct = maxVisits > 0 ? (g.visits / maxVisits * 100) : 0;
      var color = COLORS[g.age_group] || COLORS.unknown;
      return [
        '<tr>',
        '<td><span class="ov-age-chip" style="background:' + color + '"></span><b>' + esc(g.label) + '</b>',
        '<div class="ov-age-bar"><div class="ov-age-bar-fill" style="width:' + pct.toFixed(1) + '%;background:' + color + '"></div></div>',
        '</td>',
        '<td class="num"><b style="color:' + color + '">' + fmt(g.visits) + '</b><div style="font-size:9px;color:var(--md-text-tertiary,#6b7280)">visits</div></td>',
        '<td class="num"><b>' + fmt(g.revenue) + '</b><div style="font-size:9px;color:var(--md-text-tertiary,#6b7280)">บาท</div></td>',
        '</tr>'
      ].join('');
    }).join('');

    body.innerHTML =
      '<table class="ov-age-table">' +
      '<thead><tr><th>ช่วงอายุ</th><th class="num">Visits</th><th class="num">รายได้</th></tr></thead>' +
      '<tbody>' + rowsHtml + '</tbody>' +
      '</table>' +
      '<div class="ov-age-total">' +
      '<span>รวมทั้งหมด</span>' +
      '<span>' + fmt(data.total_visits) + ' visit · ' + fmt(data.total_revenue) + ' บาท</span>' +
      '</div>';
  }

  function closeAgeModal() {
    var bg = document.getElementById('ov-age-modal-bg');
    if (bg) bg.remove();
    document.removeEventListener('keydown', escClose);
  }

  function escClose(e) {
    if (e.key === 'Escape') closeAgeModal();
  }

  // Scan DOM periodically (cheap — only marks new cards)
  function startObserver() {
    var root = document.getElementById('root') || document.body;
    var pending = null;

    function tick() {
      pending = null;
      try {
        attachClickHandlers();
      } catch (e) {
        /* silent */ }
    }
    new MutationObserver(function() {
      if (pending) return;
      pending = setTimeout(tick, 200);
    }).observe(root, {
      childList: true,
      subtree: true
    });
    // Initial run
    setTimeout(tick, 400);
  }

  function boot() {
    injectStyle();
    startObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();