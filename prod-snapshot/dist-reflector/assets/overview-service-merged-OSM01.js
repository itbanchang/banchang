/*!
 * BCH 360° — Service Lines · Merged section overlay v01
 *
 * Hides the two separate "วันนี้ — Service Lines" and "Service Lines · visits เดือนนี้"
 * sections and replaces them with ONE unified section featuring a period selector:
 *   วันนี้ · เมื่อวาน · MTD (เดือนนี้) · 7 วันล่าสุด · 30 วันล่าสุด · กำหนดเอง
 *
 * Each of the 12 cards is clickable → opens the age-breakdown modal
 * (provided by overview-age-overlay-OAA01.js) with the current period range.
 *
 * Standalone vanilla JS — no React. MutationObserver-based mounting.
 */
(function() {
  'use strict';
  if (window.__svcMergedMounted) return;
  window.__svcMergedMounted = true;

  // ─── Date helpers (Bangkok timezone) ───────────────────────────────────────
  function bkkToday() {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok'
    }).format(new Date());
  }

  function bkkMonthStart() {
    return bkkToday().slice(0, 7) + '-01';
  }

  function bkkAddDays(iso, days) {
    var d = new Date(iso + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function bkkYesterday() {
    return bkkAddDays(bkkToday(), -1);
  }

  // ─── Period definitions ────────────────────────────────────────────────────
  function periodRange(key) {
    var today = bkkToday();
    switch (key) {
      case 'today':
        return {
          from: today, to: today, label: 'วันนี้'
        };
      case 'yesterday':
        return {
          from: bkkYesterday(), to: bkkYesterday(), label: 'เมื่อวาน'
        };
      case 'mtd':
        return {
          from: bkkMonthStart(), to: today, label: 'MTD (เดือนนี้)'
        };
      case 'last7':
        return {
          from: bkkAddDays(today, -6), to: today, label: '7 วันล่าสุด'
        };
      case 'last30':
        return {
          from: bkkAddDays(today, -29), to: today, label: '30 วันล่าสุด'
        };
      default:
        return {
          from: today, to: today, label: 'วันนี้'
        };
    }
  }

  // ─── Styles ────────────────────────────────────────────────────────────────
  // Header mirrors the standard SectionHeader component (src OverviewTab.jsx:508)
  // — gradient bar (4×24px purple→cyan) + icon 18px + label 15px/900 + sub 11px/600.
  var STYLE = [
    '.ov-svc-merged-section{margin-bottom:14px !important;margin-top:18px !important;font-family:Kanit,Sarabun,"Noto Sans Thai",sans-serif !important}',
    '.ov-svc-merged-header{display:flex !important;align-items:center !important;gap:10px !important;margin-bottom:10px !important;margin-top:4px !important;flex-wrap:wrap !important}',
    '.ov-svc-merged-bar{width:4px !important;height:24px !important;border-radius:99px !important;background:linear-gradient(180deg,#7c3aed,#0ea5e9) !important;flex-shrink:0 !important;display:inline-block !important}',
    '.ov-svc-merged-icon{font-size:18px !important;line-height:1 !important;flex-shrink:0 !important}',
    '.ov-svc-merged-title{font-size:15px !important;font-weight:900 !important;color:var(--md-text-primary) !important;white-space:nowrap !important;line-height:1.2 !important}',
    '.ov-svc-merged-sub{font-size:11px !important;color:var(--md-text-tertiary) !important;font-weight:600 !important;line-height:1.4 !important}',
    '.ov-svc-merged-controls{display:flex;align-items:center;gap:6px;margin-left:auto;flex-wrap:wrap}',
    '.ov-svc-period-btn{padding:5px 12px;border:1px solid var(--md-border);background:var(--md-surface);color:var(--md-text-secondary);font-size:11px;font-weight:700;border-radius:8px;cursor:pointer;font-family:inherit;transition:all .12s}',
    '.ov-svc-period-btn:hover{border-color:#3b82f6;color:#3b82f6}',
    '.ov-svc-period-btn.active{background:#3b82f6;color:#fff;border-color:#3b82f6;box-shadow:0 1px 3px rgba(59,130,246,.35)}',
    '.ov-svc-custom-row{display:flex;align-items:center;gap:6px;margin-left:auto;font-size:11px;color:var(--md-text-secondary)}',
    '.ov-svc-custom-row input{padding:4px 8px;border:1px solid var(--md-border);border-radius:6px;font-size:11px;font-family:inherit;background:var(--md-surface);color:var(--md-text-primary)}',
    '.ov-svc-custom-row button{padding:4px 12px;border:none;background:#3b82f6;color:#fff;font-size:11px;font-weight:700;border-radius:6px;cursor:pointer}',
    '.ov-svc-grid{display:grid;grid-template-columns:repeat(6, minmax(0, 1fr));gap:12px}',
    '@media (max-width:1100px){.ov-svc-grid{grid-template-columns:repeat(4, minmax(0,1fr))}}',
    '@media (max-width:760px){.ov-svc-grid{grid-template-columns:repeat(2, minmax(0,1fr))}}',
    '.ov-svc-card{padding:14px 16px;border-radius:12px;background:linear-gradient(135deg,var(--card-color)12 0%,transparent 100%);border:1px solid var(--card-color)30;border-left:4px solid var(--card-color);cursor:pointer;transition:transform .12s,box-shadow .12s;position:relative;min-width:0}',
    '.ov-svc-card:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,0,0,.10)}',
    '.ov-svc-card .head{display:flex;align-items:center;gap:6px;margin-bottom:4px}',
    '.ov-svc-card .icon{font-size:16px}',
    '.ov-svc-card .label{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--card-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}',
    '.ov-svc-card .open-pill{display:inline-flex;align-items:center;gap:3px;font-size:9px;font-weight:800;padding:2px 6px;border-radius:99;background:rgba(16,185,129,.12);color:#10b981;border:1px solid #10b98135;white-space:nowrap;flex-shrink:0}',
    '.ov-svc-card .open-pill .dot{width:6px;height:6px;border-radius:50%;background:#10b981;box-shadow:0 0 4px #10b981;animation:ov-svc-pulse 1.8s ease-in-out infinite}',
    '@keyframes ov-svc-pulse{0%,100%{opacity:1}50%{opacity:.4}}',
    '.ov-svc-card .close-pill{position:absolute;top:8px;right:10px;background:#f97316;border:2.5px solid #000;border-radius:6px;padding:3px 11px;color:#000;font-size:12px;font-weight:900;letter-spacing:.12em;line-height:1.3;box-shadow:0 0 0 1.5px rgba(249,115,22,.45),0 2px 5px rgba(0,0,0,.4);pointer-events:none;animation:ov-svc-blink 2.4s ease-in-out infinite;z-index:5}',
    '@keyframes ov-svc-blink{0%,100%{opacity:1}50%{opacity:.55}}',
    '.ov-svc-card .value{font-size:14px;font-weight:900;color:var(--md-text-primary);font-variant-numeric:tabular-nums;line-height:1.25;margin-top:2px}',
    '.ov-svc-card .sub{font-size:10px;font-weight:600;color:var(--md-text-tertiary);margin-top:4px}',
    '.ov-svc-card .hint{font-size:9px;color:var(--md-text-tertiary);opacity:.65;font-weight:600;margin-top:6px}',
    '.ov-svc-merged-loading{text-align:center;padding:30px;color:var(--md-text-tertiary);font-size:12px}',
    '.ov-svc-merged-error{text-align:center;padding:20px;color:#dc2626;font-size:12px;background:rgba(220,38,38,.06);border:1px solid #dc262640;border-radius:8px}',
    '[data-ov-svc-hide="1"]{display:none !important}',
    // Trend chip on each card: ↑ +12.3% (green) · ↓ -8.5% (red) · → ±0% (gray) · ใหม่ (blue)
    '.ov-svc-trend{display:inline-flex;align-items:center;gap:2px;font-size:10px;font-weight:800;padding:1px 5px;border-radius:99px;margin-left:6px;line-height:1.4;font-variant-numeric:tabular-nums;white-space:nowrap;vertical-align:middle}',
    '.ov-svc-trend.up{background:rgba(16,185,129,.13);color:#059669;border:1px solid #10b98140}',
    '.ov-svc-trend.down{background:rgba(220,38,38,.13);color:#dc2626;border:1px solid #dc262640}',
    '.ov-svc-trend.flat{background:rgba(120,120,120,.10);color:var(--md-text-tertiary);border:1px solid #88888830}',
    '.ov-svc-trend.new{background:rgba(59,130,246,.13);color:#2563eb;border:1px solid #3b82f640}',
    // AI insight banner above the grid
    '.ov-svc-insight{padding:10px 14px;border-radius:10px;background:linear-gradient(135deg,rgba(124,58,237,.08) 0%,rgba(14,165,233,.08) 100%);border:1px solid rgba(124,58,237,.18);margin-bottom:12px;font-size:12px;line-height:1.55;color:var(--md-text-primary);font-family:inherit;display:flex;flex-wrap:wrap;gap:10px;align-items:center}',
    '.ov-svc-insight .ai-tag{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:900;padding:2px 7px;border-radius:99px;background:linear-gradient(135deg,#7c3aed,#0ea5e9);color:#fff;letter-spacing:.05em;white-space:nowrap;flex-shrink:0}',
    '.ov-svc-insight .total{font-weight:700}',
    '.ov-svc-insight .mover{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:var(--md-surface);border:1px solid var(--md-border)}',
    '.ov-svc-insight .mover.up{color:#059669;border-color:#10b98140}',
    '.ov-svc-insight .mover.down{color:#dc2626;border-color:#dc262640}',
    '.ov-svc-insight .baseline{font-size:10px;color:var(--md-text-tertiary);font-weight:600;margin-left:auto}',
  ].join('');

  function injectStyle() {
    if (document.getElementById('ov-svc-merged-style')) return;
    var s = document.createElement('style');
    s.id = 'ov-svc-merged-style';
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

  // ─── State ─────────────────────────────────────────────────────────────────
  var state = {
    period: 'mtd', // safe default while we wait for global detection
    customFrom: bkkMonthStart(),
    customTo: bkkToday(),
    mounted: false,
    followGlobal: true, // auto-sync from top "ช่วงเวลาวิเคราะห์" selector
  };

  // ─── Detect & sync with global "ช่วงเวลาวิเคราะห์" period selector ────────
  // The dashboard has a top-bar selector with these EXACT same button labels.
  // We follow it automatically — clicking our local buttons will override.
  var GLOBAL_PERIOD_LABELS = {
    'วันนี้': 'today',
    'เมื่อวาน': 'yesterday',
    'MTD (เดือนนี้)': 'mtd',
    '7 วันล่าสุด': 'last7',
    '30 วันล่าสุด': 'last30',
    'กำหนดเอง': 'custom',
  };

  function findGlobalPeriodButtons() {
    var section = document.getElementById('ov-svc-merged-section');
    var btns = document.querySelectorAll('button');
    var matches = [];
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      // Exclude buttons inside our own section
      if (section && section.contains(b)) continue;
      var text = (b.textContent || '').trim();
      if (GLOBAL_PERIOD_LABELS.hasOwnProperty(text)) {
        matches.push({
          btn: b,
          period: GLOBAL_PERIOD_LABELS[text]
        });
      }
    }
    return matches;
  }

  function detectActiveGlobal() {
    var btns = findGlobalPeriodButtons();
    if (!btns.length) return null;
    // Active button in OverviewTab.jsx (line 1052-1055) is distinguished by:
    //   border: 1.5px solid #7c3aed  + color: #7c3aed (purple text)
    // — NOT background. (Background is #7c3aed15 = alpha 0.08, too faint to detect reliably.)
    // Strategy: pick the button whose text color is the purple accent #7c3aed
    // (rgb(124, 58, 237)) or anything close to it (saturated purple).
    var best = null;
    var bestScore = -1;
    for (var i = 0; i < btns.length; i++) {
      var cs = window.getComputedStyle(btns[i].btn);
      // Check text color — most reliable active indicator
      var color = cs.color || '';
      var m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) continue;
      var r = +m[1],
        g = +m[2],
        b2 = +m[3];
      // Active = purple-ish: r ~124, g ~58, b ~237 → r<g+50, b>r+50, b>g+100
      // Score by "purpleness" = b - g (high blue, low green = purple/violet)
      var purpleness = b2 - g;
      if (purpleness > bestScore) {
        bestScore = purpleness;
        best = btns[i];
      }
    }
    // Only return if we found a clearly purple-text button (score > 50 = significant blue dominance)
    return best && bestScore > 50 ? best.period : null;
  }

  function syncFromGlobal() {
    var active = detectActiveGlobal();
    if (!active || active === state.period) return false;
    state.period = active;
    return true;
  }

  function watchGlobalSelector() {
    // Strategy: click delegation on document.body — survives React re-renders
    // When user clicks any global period button (outside our section), we get notified
    // and re-fetch Service Lines data after a short delay (let React commit state first).
    document.body.addEventListener('click', function(e) {
      var btn = e.target.closest && e.target.closest('button');
      if (!btn) return;
      var section = document.getElementById('ov-svc-merged-section');
      if (section && section.contains(btn)) return; // skip our own buttons
      var text = (btn.textContent || '').trim();
      if (!GLOBAL_PERIOD_LABELS.hasOwnProperty(text)) return;
      var newPeriod = GLOBAL_PERIOD_LABELS[text];
      // Defer the refetch so React state + DOM are settled
      setTimeout(function() {
        state.period = newPeriod;
        var sec = document.getElementById('ov-svc-merged-section');
        if (sec) fetchAndRender(sec);
      }, 250);
    }, true);

    // Also poll the global custom date-range text every 1s for changes (custom mode)
    var lastRange = '';
    setInterval(function() {
      if (state.period !== 'custom') return;
      var custom = parseGlobalCustomRange();
      if (!custom) return;
      var key = custom.from + '|' + custom.to;
      if (key === lastRange) return;
      lastRange = key;
      var sec = document.getElementById('ov-svc-merged-section');
      if (sec) fetchAndRender(sec);
    }, 1000);
  }

  // ─── Find old sections to hide ─────────────────────────────────────────────
  function findOldSections() {
    // Old sections have SectionHeader components whose text contains specific markers
    var sections = [];
    var allSpans = document.querySelectorAll('span');
    for (var i = 0; i < allSpans.length; i++) {
      var s = allSpans[i];
      var t = (s.textContent || '').trim();
      if (t === 'วันนี้ — Service Lines' || t === 'Service Lines · visits เดือนนี้') {
        // Walk up to find the section block (typically grandparent of SectionHeader + grid)
        var hdr = s.parentElement; // SectionHeader root
        // The section block = parent containing both SectionHeader + grid below it
        // In React Fragment <></>, this might just be the SectionHeader + adjacent siblings
        var grid = hdr ? hdr.nextElementSibling : null;
        if (hdr && grid && grid.querySelectorAll && grid.querySelectorAll('div').length > 6) {
          sections.push({
            header: hdr,
            grid: grid
          });
        }
      }
    }
    return sections;
  }

  function hideOldSections() {
    var sections = findOldSections();
    sections.forEach(function(sec) {
      if (sec.header) sec.header.dataset.ovSvcHide = '1';
      if (sec.grid) sec.grid.dataset.ovSvcHide = '1';
    });
    return sections;
  }

  // ─── Render merged section ─────────────────────────────────────────────────
  function buildSelector() {
    var periods = [{
        key: 'today',
        label: 'วันนี้'
      },
      {
        key: 'yesterday',
        label: 'เมื่อวาน'
      },
      {
        key: 'mtd',
        label: 'MTD (เดือนนี้)'
      },
      {
        key: 'last7',
        label: '7 วันล่าสุด'
      },
      {
        key: 'last30',
        label: '30 วันล่าสุด'
      },
      {
        key: 'custom',
        label: 'กำหนดเอง'
      },
    ];
    return '<div class="ov-svc-merged-controls">' +
      periods.map(function(p) {
        var cls = 'ov-svc-period-btn' + (state.period === p.key ? ' active' : '');
        return '<button class="' + cls + '" data-period="' + p.key + '">' + esc(p.label) + '</button>';
      }).join('') +
      '</div>';
  }

  function buildCustomRow() {
    if (state.period !== 'custom') return '';
    return '<div class="ov-svc-custom-row" style="margin-top:8px">' +
      '<span>ตั้งแต่</span>' +
      '<input type="date" id="ov-svc-custom-from" value="' + esc(state.customFrom) + '">' +
      '<span>ถึง</span>' +
      '<input type="date" id="ov-svc-custom-to" value="' + esc(state.customTo) + '">' +
      '<button id="ov-svc-custom-apply">ใช้งาน</button>' +
      '</div>';
  }

  // Format a delta % into a trend chip. delta_pct === null = "ใหม่" (no baseline).
  function trendChip(deltaPct) {
    if (deltaPct === null || deltaPct === undefined) {
      return '<span class="ov-svc-trend new" title="ไม่มีข้อมูลในช่วงก่อนหน้า">✨ ใหม่</span>';
    }
    var n = Number(deltaPct);
    if (n > 0.5) return '<span class="ov-svc-trend up" title="เทียบช่วงก่อนหน้า">↑ +' + n.toFixed(1) + '%</span>';
    if (n < -0.5) return '<span class="ov-svc-trend down" title="เทียบช่วงก่อนหน้า">↓ ' + n.toFixed(1) + '%</span>';
    return '<span class="ov-svc-trend flat" title="ทรงตัวเทียบช่วงก่อนหน้า">→ ±0%</span>';
  }

  function buildCardHTML(line) {
    var visits = Number(line.visits || 0);
    var revenue = Number(line.revenue || 0);
    var isOpen = visits > 0;
    // Show trend chip only if the line has activity (revenue > 0). Tiny/zero lines get no chip
    // to avoid visual clutter on closed services.
    var trendHTML = revenue > 0 ? trendChip(line.delta_revenue_pct) : '';
    return '<div class="ov-svc-card" style="--card-color:' + line.color + '" ' +
      'data-ov-svc-code="' + esc(line.code) + '" ' +
      'data-ov-svc-label="' + esc(line.label) + '">' +
      (isOpen ?
        '<div class="head"><span class="icon">' + line.icon + '</span><span class="label">' + esc(line.label) + '</span>' +
        '<span class="open-pill"><span class="dot"></span>เปิด</span></div>' :
        '<div class="close-pill" title="ยังไม่มี visit">CLOSE</div>' +
        '<div class="head"><span class="icon">' + line.icon + '</span><span class="label">' + esc(line.label) + '</span></div>'
      ) +
      '<div class="value">' + fmt(visits) + ' visit / ' + fmt(revenue) + ' บาท' + trendHTML + '</div>' +
      '<div class="sub">' + esc(line.sub) + '</div>' +
      '<div class="hint">👆 คลิกดูตามช่วงอายุ</div>' +
      '</div>';
  }

  // Build the AI-insight banner shown above the 12-card grid.
  // Uses backend-computed summary { delta_revenue_pct, top_up[], top_down[], compare_from/to }.
  function buildInsightHTML(data) {
    var sum = data.summary || {};
    var totalDelta = sum.delta_revenue_pct;
    var totalLabel;
    if (totalDelta === null || totalDelta === undefined) {
      totalLabel = '<span class="total">ไม่มีข้อมูลในช่วงก่อนหน้าเพื่อเทียบ</span>';
    } else if (totalDelta > 0.5) {
      totalLabel = '<span class="total" style="color:#059669">📈 รายได้รวม <strong>เพิ่มขึ้น +' + totalDelta.toFixed(1) + '%</strong> เทียบช่วงก่อนหน้า</span>';
    } else if (totalDelta < -0.5) {
      totalLabel = '<span class="total" style="color:#dc2626">📉 รายได้รวม <strong>ลดลง ' + totalDelta.toFixed(1) + '%</strong> เทียบช่วงก่อนหน้า</span>';
    } else {
      totalLabel = '<span class="total">⚖️ รายได้รวมทรงตัว (±0%) เทียบช่วงก่อนหน้า</span>';
    }
    var moverHTML = '';
    (sum.top_up || []).forEach(function(m) {
      moverHTML += '<span class="mover up" title="แผนกที่โตเด่นชัด">🚀 ' + esc(m.label) + ' +' + m.delta_revenue_pct.toFixed(0) + '%</span>';
    });
    (sum.top_down || []).forEach(function(m) {
      moverHTML += '<span class="mover down" title="แผนกที่ลดเด่นชัด">🔻 ' + esc(m.label) + ' ' + m.delta_revenue_pct.toFixed(0) + '%</span>';
    });
    if (!moverHTML && (totalDelta !== null && totalDelta !== undefined)) {
      moverHTML = '<span class="mover" style="color:var(--md-text-tertiary)">— ไม่มีแผนกที่เปลี่ยนแปลงเด่นชัด (≥10%)</span>';
    }
    var baseline = data.compare_from && data.compare_to ?
      '<span class="baseline">เทียบ ' + esc(data.compare_from) + ' → ' + esc(data.compare_to) + ' (' + (data.period_days || '?') + ' วัน)</span>' :
      '';
    return '<div class="ov-svc-insight">' +
      '<span class="ai-tag">🤖 AI</span>' +
      totalLabel + moverHTML + baseline +
      '</div>';
  }

  // When global period === 'custom', parse the visible date-range text from the header
  // (looks like "2026-05-01 → 2026-05-15 (15 วัน) · เทียบ ...")
  function parseGlobalCustomRange() {
    var section = document.getElementById('ov-svc-merged-section');
    var all = document.querySelectorAll('div, span');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (section && section.contains(el)) continue;
      var t = (el.textContent || '');
      if (t.length > 300) continue;
      var m = t.match(/(\d{4}-\d{2}-\d{2})\s*[→\-]\s*(\d{4}-\d{2}-\d{2})/);
      if (m) return {
        from: m[1],
        to: m[2]
      };
    }
    return null;
  }

  function getCurrentRange() {
    if (state.period === 'custom') {
      var custom = parseGlobalCustomRange();
      if (custom) {
        return {
          from: custom.from,
          to: custom.to,
          label: 'กำหนดเอง · ' + custom.from + ' → ' + custom.to
        };
      }
      // Fallback: use stored or MTD
      return {
        from: state.customFrom,
        to: state.customTo,
        label: 'กำหนดเอง · ' + state.customFrom + ' → ' + state.customTo
      };
    }
    return periodRange(state.period);
  }

  function fetchAndRender(container) {
    var range = getCurrentRange();
    var grid = container.querySelector('#ov-svc-merged-grid');
    var sub = container.querySelector('#ov-svc-merged-sub');
    var insight = container.querySelector('#ov-svc-merged-insight');
    if (grid) grid.innerHTML = '<div class="ov-svc-merged-loading">⏳ กำลังโหลดข้อมูล…</div>';
    if (sub) sub.textContent = range.label + ' · กำลังโหลด…';
    if (insight) insight.innerHTML = '';

    fetch('/api/overview/service-lines-grid?from=' + encodeURIComponent(range.from) + '&to=' + encodeURIComponent(range.to), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(r.status);
      })
      .then(function(data) {
        var lines = data.lines || [];
        var totalVisits = lines.reduce(function(s, l) {
          return s + Number(l.visits || 0);
        }, 0);
        var totalRevenue = lines.reduce(function(s, l) {
          return s + Number(l.revenue || 0);
        }, 0);
        if (sub) sub.textContent = range.label + ' · ' + range.from + (data.is_range ? ' → ' + range.to : '') + ' · รวม ' + fmt(totalVisits) + ' visit / ' + fmt(totalRevenue) + ' บาท · 12 แผนก';
        if (insight) insight.innerHTML = buildInsightHTML(data);
        if (grid) grid.innerHTML = lines.map(buildCardHTML).join('');
      })
      .catch(function(err) {
        if (grid) grid.innerHTML = '<div class="ov-svc-merged-error">โหลดข้อมูลไม่สำเร็จ (' + esc(String(err)) + ')</div>';
      });
  }

  function mount(target) {
    if (state.mounted) return;
    state.mounted = true;

    var section = document.createElement('div');
    section.className = 'ov-svc-merged-section';
    section.id = 'ov-svc-merged-section';
    // Header structure matches src/components/OverviewTab.jsx SectionHeader (line 508)
    // Inline styles for highest CSS specificity — beats any parent stylesheet rules
    var STYLE_HEADER = 'display:flex;align-items:center;gap:12px;margin-bottom:12px;margin-top:6px;flex-wrap:wrap;font-family:Kanit,Sarabun,"Noto Sans Thai",sans-serif';
    var STYLE_BAR = 'width:5px;height:30px;border-radius:99px;background:linear-gradient(180deg,#7c3aed,#0ea5e9);flex-shrink:0;display:inline-block';
    var STYLE_ICON = 'font-size:22px;line-height:1;flex-shrink:0;font-family:inherit';
    var STYLE_TITLE = 'font-size:18px;font-weight:900;color:var(--md-text-primary);white-space:nowrap;line-height:1.2;font-family:inherit';
    var STYLE_SUB = 'font-size:12px;color:var(--md-text-tertiary);font-weight:600;line-height:1.4;font-family:inherit';
    section.innerHTML =
      '<div style="' + STYLE_HEADER + '">' +
      '<div style="' + STYLE_BAR + '"></div>' +
      '<span style="' + STYLE_ICON + '">🏢</span>' +
      '<span style="' + STYLE_TITLE + '">Service Lines</span>' +
      '<span style="' + STYLE_SUB + '">· แต่ละแผนกบริการ · 12 แผนก</span>' +
      '</div>' +
      '<div id="ov-svc-merged-sub" style="' + STYLE_SUB + ';margin-bottom:8px;margin-left:14px">กำลังโหลด…</div>' +
      '<div id="ov-svc-merged-insight"></div>' +
      '<div class="ov-svc-grid" id="ov-svc-merged-grid"><div class="ov-svc-merged-loading">⏳ กำลังโหลดข้อมูล…</div></div>';

    // Insert BEFORE the first old "วันนี้ Service Lines" section header
    target.parentElement.insertBefore(section, target);

    // Card click → open age modal with current global range
    section.addEventListener('click', function(e) {
      var card = e.target.closest && e.target.closest('.ov-svc-card');
      if (card) {
        e.preventDefault();
        e.stopPropagation();
        var code = card.dataset.ovSvcCode;
        var label = card.dataset.ovSvcLabel;
        var range = getCurrentRange();
        if (window.__ovAgeOpenModal) {
          window.__ovAgeOpenModal(code, label, range.from, range.to, range.label);
        }
      }
    });

    fetchAndRender(section);
  }

  // ─── Mount loop ────────────────────────────────────────────────────────────
  function tryMount() {
    var sections = findOldSections();
    if (sections.length === 0) return false;
    // Sync initial period from global selector BEFORE mount
    syncFromGlobal();
    // Hide old, insert new before the first one
    hideOldSections();
    mount(sections[0].header);
    // Start watching global selector for changes
    setTimeout(watchGlobalSelector, 300);
    return true;
  }

  function startObserver() {
    var root = document.getElementById('root') || document.body;
    var pending = null;

    function tick() {
      pending = null;
      try {
        if (!state.mounted) tryMount();
        else hideOldSections(); // keep old hidden if React re-renders
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