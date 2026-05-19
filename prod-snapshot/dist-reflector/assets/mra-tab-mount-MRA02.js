/*!
 * BCH 360° — Medical Record Audit (MRA) Tab — vanilla DOM UI
 * Mounts inside MRAuditTab React shim via window.__mraMount(el)
 * Sections: (1) KPI strip · (2) Monthly trend · (3) Defects Content/Format
 *           · (4) By-ward + By-doctor · (5) Records to fix table
 */
(function() {
  'use strict';

  if (window.__mraMountInitialized) return;
  window.__mraMountInitialized = true;

  // ── inline styles ──
  var STYLE = '.mra-card{background:var(--md-surface);border:1px solid var(--md-border);border-radius:12px;padding:14px 16px}.mra-card-h{font-size:11px;font-weight:900;letter-spacing:.05em;text-transform:uppercase;color:var(--md-text-secondary);margin-bottom:8px;display:flex;align-items:center;gap:8px}.mra-kpi-num{font-size:24px;font-weight:900;color:var(--md-text-primary);font-variant-numeric:tabular-nums;line-height:1.05}.mra-kpi-sub{font-size:11px;color:var(--md-text-tertiary);font-weight:600;margin-top:3px}.mra-grid{display:grid;gap:12px}.mra-bar{height:8px;border-radius:4px;background:rgba(148,163,184,.18);overflow:hidden}.mra-bar-fill{height:100%;border-radius:4px}.mra-tbl{width:100%;border-collapse:collapse;font-size:12px;font-variant-numeric:tabular-nums}.mra-tbl th{text-align:left;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--md-text-tertiary);padding:6px 8px;border-bottom:1.5px solid var(--md-border)}.mra-tbl td{padding:6px 8px;border-bottom:1px solid var(--md-border);color:var(--md-text-primary)}.mra-tbl tr:hover td{background:rgba(148,163,184,.06)}.mra-pill{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:800}.mra-spin{display:inline-block;width:12px;height:12px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:mra-spin .6s linear infinite;vertical-align:middle}@keyframes mra-spin{to{transform:rotate(360deg)}}';

  function injectStyle() {
    if (document.getElementById('mra-style')) return;
    var s = document.createElement('style');
    s.id = 'mra-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
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

  function fmt(v) {
    if (v == null || isNaN(v)) return '—';
    return Number(v).toLocaleString('th-TH');
  }

  function fmtPct(n) {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toFixed(1) + '%';
  }

  // Color thresholds: red < 50, amber < 75, green < 90, emerald ≥ 90
  function gradeColor(pct) {
    if (pct >= 90) return '#059669';
    if (pct >= 75) return '#10b981';
    if (pct >= 50) return '#f59e0b';
    return '#ef4444';
  }

  function thaiMonth(ym) {
    // ym = "2026-05"
    var parts = ym.split('-');
    var y = parseInt(parts[0]) + 543;
    var months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    var m = months[parseInt(parts[1]) - 1] || parts[1];
    return m + ' ' + String(y).slice(-2);
  }

  // ── Period helpers (computed on construct) ──
  function _ymd(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + dd;
  }

  function _computePeriod(mode, customStart, customEnd) {
    var today = new Date();
    var todayStr = _ymd(today);
    if (mode === 'today') return {
      start: todayStr,
      end: todayStr,
      days: 1,
      label: 'วันนี้'
    };
    if (mode === 'yesterday') {
      var y = new Date(today);
      y.setDate(y.getDate() - 1);
      var ys = _ymd(y);
      return {
        start: ys,
        end: ys,
        days: 1,
        label: 'เมื่อวาน'
      };
    }
    if (mode === 'mtd') {
      var som = new Date(today.getFullYear(), today.getMonth(), 1);
      var soms = _ymd(som);
      var d = Math.round((today - som) / 86400000) + 1;
      return {
        start: soms,
        end: todayStr,
        days: d,
        label: 'MTD (เดือนนี้)'
      };
    }
    if (mode === '7d') {
      var s = new Date(today);
      s.setDate(s.getDate() - 6);
      return {
        start: _ymd(s),
        end: todayStr,
        days: 7,
        label: '7 วันล่าสุด'
      };
    }
    if (mode === '30d') {
      var s = new Date(today);
      s.setDate(s.getDate() - 29);
      return {
        start: _ymd(s),
        end: todayStr,
        days: 30,
        label: '30 วันล่าสุด'
      };
    }
    if (mode === 'custom' && customStart && customEnd) {
      var sd = new Date(customStart);
      var ed = new Date(customEnd);
      var d = Math.max(1, Math.round((ed - sd) / 86400000) + 1);
      return {
        start: customStart,
        end: customEnd,
        days: d,
        label: 'กำหนดเอง'
      };
    }
    // default fallback
    return {
      start: todayStr,
      end: todayStr,
      days: 1,
      label: 'วันนี้'
    };
  }

  // ── State ──
  var state = {
    el: null,
    timer: null,
    analytics: null,
    records: null,
    // Period selector — replaces the old days-only approach
    periodMode: 'mtd', // today | yesterday | mtd | 7d | 30d | custom
    customStart: '', // YYYY-MM-DD (only used when periodMode='custom')
    customEnd: '',
    // Derived period (start, end, days, label) — computed by _computePeriod()
    period: null,
    days: 30, // kept as backward-compat alias for display
    section: 'sany', // 'sany' = สนย. / 'sapsach' = สปสช.
    // Section 1 (สนย.) state
    icdType: 'ipd', // 'ipd' | 'opd'
    icdAuditIpd: null,
    icdAuditOpd: null,
    icdLoading: false,
    icdError: null,
    // Phase 1B — Data Quality Form (auto-derive)
    dqType: 'ipd', // 'ipd' | 'opd'
    dqIpd: null,
    dqOpd: null,
    dqLoading: false,
    dqError: null,
    // Phase 1C — Error Symbols Distribution
    esType: 'ipd', // 'ipd' | 'opd'
    esIpd: null,
    esOpd: null,
    esLoading: false,
    esError: null,
    // Symbol detail modal
    esDetailSymbol: null, // current symbol code if modal open
    esDetailData: null,
    esDetailLoading: false,
    esDetailError: null,
    // Section 2 (สปสช. 2563) state
    sapsach: null, // summary data
    sapsachLoading: false,
    sapsachError: null,
    // Modal state (per-AN manual audit)
    modalAn: null, // current AN being audited (null = closed)
    modalDetail: null, // detail data for modal
    modalLoading: false,
    modalError: null,
    modalDirty: false, // any unsaved changes
    modalSaving: false,
    sort: {
      ward: 'total',
      doctor: 'total'
    },
    loading: false,
    error: null,
  };

  // ── HTML builders ──

  function sectionHeader() {
    var subtitle = state.section === 'sany' ?
      'ตรวจสอบคุณภาพข้อมูล + การให้รหัส ICD ตามเกณฑ์ สำนักนโยบายและยุทธศาสตร์ (สนย.) เล่มน้ำเงิน 2558' :
      'ตรวจสอบคุณภาพการบันทึกเวชระเบียน ตามเกณฑ์ Medical Record Audit Guideline 2563 (สปสช. + สรพ.)';
    return '<div style="margin-bottom:14px;padding:14px 18px;border-radius:14px;background:linear-gradient(135deg,rgba(124,58,237,.10) 0%, var(--md-surface) 100%);border:1.5px solid rgba(124,58,237,.30);border-left:5px solid #7c3aed">' +
      '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
      '<span style="font-size:28px">📇</span>' +
      '<div style="flex:1;min-width:280px">' +
      '<div style="font-size:18px;font-weight:900;color:#7c3aed">Medical Record Audit (MRA)</div>' +
      '<div style="font-size:12px;color:var(--md-text-secondary);font-weight:600;margin-top:2px">' + esc(subtitle) + '</div>' +
      '</div>' +
      windowSelector() +
      '</div>' +
      '</div>' +
      subTabSelector();
  }

  function subTabSelector() {
    var sections = [{
        id: 'sany',
        label: 'มาตรฐาน สนย.',
        sub: 'คุณภาพข้อมูล + รหัส ICD',
        icon: '📊'
      },
      {
        id: 'sapsach',
        label: 'มาตรฐาน สปสช.',
        sub: 'คุณภาพเวชระเบียน 2563',
        icon: '📋'
      }
    ];
    return '<div style="display:flex;gap:8px;margin-bottom:14px;padding:4px;background:var(--md-surface);border:1px solid var(--md-border);border-radius:12px">' +
      sections.map(function(s) {
        var active = s.id === state.section;
        return '<button data-mra-section="' + s.id + '" style="flex:1;padding:10px 16px;border-radius:10px;border:0;cursor:pointer;text-align:left;font-family:inherit;' +
          'background:' + (active ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent') + ';' +
          'color:' + (active ? '#fff' : 'var(--md-text-primary)') + ';' +
          'box-shadow:' + (active ? '0 2px 8px rgba(124,58,237,0.30)' : 'none') + '">' +
          '<div style="display:flex;align-items:center;gap:10px">' +
          '<span style="font-size:20px">' + s.icon + '</span>' +
          '<div>' +
          '<div style="font-size:13px;font-weight:900;line-height:1.2">' + esc(s.label) + '</div>' +
          '<div style="font-size:10px;font-weight:600;opacity:' + (active ? '0.85' : '0.65') + ';margin-top:2px">' + esc(s.sub) + '</div>' +
          '</div>' +
          '</div>' +
          '</button>';
      }).join('') +
      '</div>';
  }

  function placeholderCard(title, subtitle, phases, color) {
    var c = color || '#7c3aed';
    return '<div style="padding:32px 24px;background:var(--md-surface);border:1.5px dashed ' + c + '66;border-radius:14px;text-align:center">' +
      '<div style="font-size:48px;margin-bottom:8px">🚧</div>' +
      '<div style="font-size:16px;font-weight:900;color:var(--md-text-primary);margin-bottom:6px">' + esc(title) + '</div>' +
      '<div style="font-size:12px;color:var(--md-text-secondary);max-width:560px;margin:0 auto 14px">' + esc(subtitle) + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;max-width:480px;margin:0 auto;text-align:left">' +
      phases.map(function(p) {
        return '<div style="padding:10px 14px;background:' + c + '10;border-radius:8px;border-left:3px solid ' + c + '">' +
          '<div style="font-size:12px;font-weight:800;color:var(--md-text-primary)">📌 ' + esc(p.title) + '</div>' +
          '<div style="font-size:11px;color:var(--md-text-secondary);margin-top:2px">' + esc(p.desc) + '</div>' +
          '</div>';
      }).join('') +
      '</div>' +
      '</div>';
  }

  function sanySectionContent() {
    // Phase 1A: ICD Quality Audit (active)
    var html = icdAuditPanel();
    // Phase 1B: Data Quality Form (Auto-derive, active)
    html += '<div style="margin-top:14px"></div>';
    html += dqFormPanel();
    // Phase 1C: Error Symbols Distribution (active)
    html += '<div style="margin-top:14px"></div>';
    html += errorSymbolsPanel();
    return html;
  }

  function compactPlaceholder(title, desc, color) {
    return '<div style="padding:16px;background:var(--md-surface);border:1.5px dashed ' + color + '44;border-radius:12px">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
      '<span style="font-size:20px">🚧</span>' +
      '<div style="font-size:13px;font-weight:900;color:var(--md-text-primary)">' + esc(title) + '</div>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--md-text-secondary);padding-left:28px">' + esc(desc) + '</div>' +
      '</div>';
  }

  function severityPill(sev) {
    var map = {
      high: {
        bg: '#ef444420',
        fg: '#ef4444',
        label: 'สูง'
      },
      medium: {
        bg: '#f59e0b20',
        fg: '#f59e0b',
        label: 'กลาง'
      },
      low: {
        bg: '#94a3b820',
        fg: '#94a3b8',
        label: 'ต่ำ'
      }
    };
    var s = map[sev] || map.low;
    return '<span class="mra-pill" style="background:' + s.bg + ';color:' + s.fg + '">' + s.label + '</span>';
  }

  function icdAuditPanel() {
    var typeUpper = state.icdType === 'opd' ? 'OPD' : 'IPD';
    var audit = state.icdType === 'opd' ? state.icdAuditOpd : state.icdAuditIpd;

    // Header + toggle
    var html = '<div class="mra-card" style="margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">' +
      '<div>' +
      '<div style="font-size:14px;font-weight:900;color:var(--md-text-primary)">📊 ICD Quality Audit · ' + typeUpper + '</div>' +
      '<div style="font-size:11px;color:var(--md-text-tertiary);font-weight:600">เกณฑ์ สนย. 2558 · B-rules + C1 · ' + state.days + ' วันย้อนหลัง</div>' +
      '</div>' +
      '<div style="display:flex;gap:4px;background:var(--md-surface-2,rgba(0,0,0,0.04));padding:3px;border-radius:10px;border:1px solid var(--md-border)">' + ['ipd', 'opd'].map(function(t) {
        var active = t === state.icdType;
        return '<button data-mra-icd-type="' + t + '" style="padding:5px 14px;border-radius:8px;font-size:11px;font-weight:800;border:0;cursor:pointer;background:' + (active ? '#7c3aed' : 'transparent') + ';color:' + (active ? '#fff' : 'var(--md-text-secondary)') + '">' + t.toUpperCase() + '</button>';
      }).join('') +
      '</div>' +
      '</div>';

    if (state.icdLoading && !audit) {
      html += '<div style="padding:24px;text-align:center;color:var(--md-text-tertiary);font-size:12px"><span class="mra-spin"></span> กำลังโหลดข้อมูล...</div>';
    } else if (state.icdError) {
      html += '<div style="padding:16px;background:#ef444410;border:1px solid #ef444444;border-radius:8px;color:#ef4444;font-size:12px">⚠️ โหลดข้อมูลล้มเหลว · ' + esc(state.icdError) + '</div>';
    } else if (audit) {
      var rules = (audit.applicable_rules || []).map(function(r) {
        var e = (audit.errors_by_rule || {})[r] || {};
        return {
          rule: r,
          label: e.label,
          severity: e.severity,
          count: e.count || 0,
          pct: e.pct_of_encounters || 0,
          examples: e.examples || []
        };
      });
      var totalErrors = rules.reduce(function(s, r) {
        return s + r.count;
      }, 0);
      var c1 = audit.poor_quality_codes_c1 || {
        total: 0,
        pct_of_codes: 0,
        by_code: []
      };
      var sc = audit.score || 0;
      var color = gradeColor(sc);

      // Hero strip
      html += '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:stretch">' +
        '<div style="flex:0 0 200px;padding:14px;background:' + color + '12;border:1.5px solid ' + color + '40;border-radius:10px;display:flex;flex-direction:column;justify-content:center">' +
        '<div class="mra-card-h" style="margin-bottom:4px">SCORE / GRADE</div>' +
        '<div style="display:flex;align-items:baseline;gap:8px">' +
        '<div style="font-size:30px;font-weight:900;color:' + color + ';line-height:1">' + fmtPct(sc) + '</div>' +
        '<div style="font-size:22px;font-weight:900;color:' + color + ';border:2px solid currentColor;border-radius:8px;padding:0 10px;line-height:1.05">' + esc(audit.grade || '-') + '</div>' +
        '</div>' +
        '<div class="mra-kpi-sub">เป้า ≥ ' + fmtPct(audit.target_score || 95) + '</div>' +
        '</div>' +
        '<div style="flex:1;min-width:110px"><div class="mra-card-h">Encounter</div><div class="mra-kpi-num">' + fmt(audit.total_encounters) + '</div><div class="mra-kpi-sub">AN ' + fmt(audit.total_ans) + '</div></div>' +
        '<div style="flex:1;min-width:110px"><div class="mra-card-h">ICD codes</div><div class="mra-kpi-num">' + fmt(audit.total_codes) + '</div><div class="mra-kpi-sub">รวมทุก type</div></div>' +
        '<div style="flex:1;min-width:110px"><div class="mra-card-h">ผิดเกณฑ์ B</div><div class="mra-kpi-num" style="color:' + (totalErrors > 0 ? '#f59e0b' : '#10b981') + '">' + fmt(totalErrors) + '</div><div class="mra-kpi-sub">รวมทุก rule</div></div>' +
        '<div style="flex:1;min-width:110px"><div class="mra-card-h">C1 ด้อยคุณภาพ</div><div class="mra-kpi-num" style="color:' + ((c1.total || 0) > 0 ? '#f59e0b' : '#10b981') + '">' + fmt(c1.total || 0) + '</div><div class="mra-kpi-sub">' + fmtPct(c1.pct_of_codes || 0) + ' ของรหัส</div></div>' +
        '</div>';
    }
    html += '</div>'; // close header card

    if (audit) {
      // B-rules table
      var rules2 = (audit.applicable_rules || []).map(function(r) {
        var e = (audit.errors_by_rule || {})[r] || {};
        return {
          rule: r,
          label: e.label,
          severity: e.severity,
          count: e.count || 0,
          pct: e.pct_of_encounters || 0
        };
      });
      html += '<div class="mra-card" style="margin-bottom:12px">' +
        '<div class="mra-card-h">🔎 ผลตรวจ B-rules (เกณฑ์ สนย. หน้า 134-138)</div>' +
        '<table class="mra-tbl" style="margin-top:6px">' +
        '<thead><tr><th>Rule</th><th>คำอธิบาย</th><th>ระดับ</th><th style="text-align:right">จำนวน</th><th style="text-align:right">% encounter</th></tr></thead>' +
        '<tbody>' + rules2.map(function(r) {
          var rowColor = r.pct > 5 ? '#ef4444' : (r.count > 0 ? '#f59e0b' : 'var(--md-text-primary)');
          return '<tr>' +
            '<td style="font-weight:900;font-family:monospace">' + esc(r.rule) + '</td>' +
            '<td>' + esc(r.label || '') + '</td>' +
            '<td>' + severityPill(r.severity) + '</td>' +
            '<td style="text-align:right;font-weight:900;color:' + rowColor + '">' + fmt(r.count) + '</td>' +
            '<td style="text-align:right;color:' + rowColor + '">' + fmtPct(r.pct) + '</td>' +
            '</tr>';
        }).join('') + '</tbody>' +
        '</table>' +
        '</div>';

      // C1 codes table
      var c1b = (audit.poor_quality_codes_c1 || {}).by_code || [];
      html += '<div class="mra-card" style="margin-bottom:12px">' +
        '<div class="mra-card-h">⚠️ รหัสด้อยคุณภาพ (C1: ไม่บอกชนิด/ตำแหน่งโรค)</div>' +
        (c1b.length ?
          '<table class="mra-tbl" style="margin-top:6px"><thead><tr><th>รหัส</th><th>คำบรรยาย</th><th style="text-align:right">จำนวน</th><th style="text-align:right">% ของรหัส</th></tr></thead><tbody>' +
          c1b.map(function(c) {
            return '<tr><td style="font-family:monospace;font-weight:900">' + esc(c.code) + '</td><td>' + esc(c.label || '') + '</td><td style="text-align:right;font-weight:900">' + fmt(c.count) + '</td><td style="text-align:right">' + fmtPct(c.pct_of_codes || 0) + '</td></tr>';
          }).join('') +
          '</tbody></table>' :
          '<div style="font-size:12px;color:var(--md-text-tertiary);padding:8px">— ไม่พบรหัสด้อยคุณภาพ —</div>') +
        '</div>';
    }

    return html;
  }

  function periodQueryParams() {
    var p = state.period || _computePeriod(state.periodMode, state.customStart, state.customEnd);
    return 'start_date=' + p.start + '&end_date=' + p.end;
  }

  function applyPeriodChange() {
    // Recompute period + invalidate all caches + re-fetch active section
    state.period = _computePeriod(state.periodMode, state.customStart, state.customEnd);
    state.days = state.period.days;
    state.icdAuditIpd = null;
    state.icdAuditOpd = null;
    state.dqIpd = null;
    state.dqOpd = null;
    state.esIpd = null;
    state.esOpd = null;
    state.sapsach = null;
    if (state.section === 'sany') {
      fetchIcdAudit(state.icdType);
      fetchDqForm(state.dqType);
      fetchErrorSymbols(state.esType);
    } else if (state.section === 'sapsach') {
      fetchSapsach();
    } else {
      render();
    }
  }

  function friendlyHttpErr(prefix, r) {
    if (r.status === 401) return 'Session หมดอายุ — กรุณา Ctrl+Shift+R เพื่อ login ใหม่';
    if (r.status === 403) return 'ไม่มีสิทธิ์เข้าถึง (CSRF/role) — ลอง Ctrl+Shift+R';
    if (r.status === 404) return prefix + ' ไม่พบ endpoint';
    if (r.status >= 500) return 'Server error (HTTP ' + r.status + ') — ลองใหม่ภายหลัง';
    return prefix + ' HTTP ' + r.status;
  }

  // ── Authed fetch with auto-refresh on 401 ──
  // Flow: original request → 401 → POST /api/auth/refresh → retry original
  //       If refresh also fails → bubble up 401 (user needs to re-login fully)
  var _refreshInFlight = null;

  function _refreshAccessToken() {
    if (_refreshInFlight) return _refreshInFlight;
    var csrf = getCookie('csrf_token');
    _refreshInFlight = fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: csrf ? {
        'X-CSRF-Token': csrf
      } : {},
    }).then(function(r) {
      _refreshInFlight = null;
      return r.ok;
    }).catch(function() {
      _refreshInFlight = null;
      return false;
    });
    return _refreshInFlight;
  }

  function authedFetch(url, opts) {
    opts = opts || {};
    opts.credentials = 'include';
    return fetch(url, opts).then(function(r) {
      if (r.status !== 401) return r;
      // Try refresh once then retry
      return _refreshAccessToken().then(function(ok) {
        if (!ok) return r;
        return fetch(url, opts);
      });
    });
  }

  function fetchIcdAudit(type) {
    state.icdLoading = true;
    state.icdError = null;
    render();
    authedFetch('/api/mr-audit/icd-quality-audit?type=' + type + '&' + periodQueryParams(), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error(friendlyHttpErr('icd-quality-audit', r)));
      })
      .then(function(data) {
        state.icdLoading = false;
        if (type === 'opd') state.icdAuditOpd = data;
        else state.icdAuditIpd = data;
        render();
      })
      .catch(function(err) {
        state.icdLoading = false;
        state.icdError = err.message || String(err);
        render();
      });
  }

  // Phase 1B — Data Quality Form (auto-derive)
  function fetchDqForm(type) {
    state.dqLoading = true;
    state.dqError = null;
    render();
    authedFetch('/api/mr-audit/data-quality-form?type=' + type + '&' + periodQueryParams(), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error(friendlyHttpErr('data-quality-form', r)));
      })
      .then(function(data) {
        state.dqLoading = false;
        if (type === 'opd') state.dqOpd = data;
        else state.dqIpd = data;
        render();
      })
      .catch(function(err) {
        state.dqLoading = false;
        state.dqError = err.message || String(err);
        render();
      });
  }

  function dqGradeColor(grade) {
    if (grade === 'A') return {
      bg: 'linear-gradient(135deg,#10b981,#059669)',
      light: '#10b98115',
      text: '#059669'
    };
    if (grade === 'B') return {
      bg: 'linear-gradient(135deg,#3b82f6,#2563eb)',
      light: '#3b82f615',
      text: '#2563eb'
    };
    if (grade === 'C') return {
      bg: 'linear-gradient(135deg,#f59e0b,#d97706)',
      light: '#f59e0b15',
      text: '#d97706'
    };
    return {
      bg: 'linear-gradient(135deg,#ef4444,#dc2626)',
      light: '#ef444415',
      text: '#dc2626'
    };
  }

  function dqSectionBar(sec) {
    var pct = sec.avg_pct || 0;
    var col = pct >= 85 ? '#10b981' : pct >= 70 ? '#3b82f6' : pct >= 50 ? '#f59e0b' : '#ef4444';
    var width = Math.max(2, Math.min(100, pct));
    var naBadge = sec.naAble && sec.na > 0 ?
      '<span style="margin-left:6px;padding:1px 6px;background:#94a3b820;color:#64748b;font-size:9px;font-weight:700;border-radius:4px">NA ' + sec.na + '</span>' :
      '';
    return '<div style="margin-bottom:10px">' +
      '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">' +
      '<span style="font-size:11px;font-weight:800;color:var(--md-text-secondary);min-width:50px">' + esc(String(sec.code).toUpperCase()) + '</span>' +
      '<span style="flex:1;font-size:11px;color:var(--md-text-primary)">' + esc(sec.label) + naBadge + '</span>' +
      '<span style="font-size:11px;font-weight:900;color:' + col + '">' + (sec.avg != null ? sec.avg.toFixed(2) : '—') + ' / ' + sec.max + '</span>' +
      '<span style="font-size:10px;font-weight:700;color:var(--md-text-secondary);min-width:48px;text-align:right">(' + pct.toFixed(1) + '%)</span>' +
      '</div>' +
      '<div style="background:var(--md-bg);height:8px;border-radius:4px;overflow:hidden">' +
      '<div style="width:' + width + '%;height:100%;background:' + col + ';border-radius:4px;transition:width .3s"></div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-top:3px;font-size:10px;color:var(--md-text-secondary)">' +
      '<span>เต็ม ' + (sec.full_count || 0) + ' รายการ</span>' +
      '<span>·</span>' +
      '<span>ขาด ' + (sec.zero_count || 0) + ' รายการ</span>' +
      '</div>' +
      '</div>';
  }

  function dqFormPanel() {
    var typeUpper = state.dqType === 'opd' ? 'OPD' : 'IPD';
    var dq = state.dqType === 'opd' ? state.dqOpd : state.dqIpd;
    var formCode = state.dqType === 'opd' ? 'A1' : 'IPD';
    var maxLabel = state.dqType === 'opd' ? '17 pts' : '27 pts';

    var html = '<div style="background:var(--md-surface);border:1.5px solid var(--md-border);border-radius:14px;overflow:hidden">';

    // Header
    html += '<div style="padding:14px 18px;background:linear-gradient(135deg,#7c3aed10,#a855f710);border-bottom:1.5px solid var(--md-border)">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<span style="font-size:22px">📝</span>' +
      '<div style="flex:1;min-width:240px">' +
      '<div style="font-size:14px;font-weight:900;color:#7c3aed">Phase 1B · คุณภาพการบันทึกข้อมูล (Form ' + formCode + ' · max ' + maxLabel + ')</div>' +
      '<div style="font-size:10px;color:var(--md-text-secondary);font-weight:600;margin-top:2px">เกณฑ์ สนย. เล่มน้ำเงิน 2558 · <strong>Auto-derive</strong> จาก HOSxP — ตรวจ existence ของ field (ไม่ได้วัด clinical quality)</div>' +
      '</div>' +
      // Type toggle (IPD/OPD)
      '<div style="display:flex;gap:4px;background:var(--md-surface);padding:3px;border-radius:10px;border:1px solid var(--md-border)">' + ['ipd', 'opd'].map(function(t) {
        var active = t === state.dqType;
        return '<button data-mra-dq-type="' + t + '" style="padding:6px 14px;border-radius:7px;border:0;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;' +
          'background:' + (active ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent') + ';' +
          'color:' + (active ? '#fff' : 'var(--md-text-primary)') + '">' + t.toUpperCase() + '</button>';
      }).join('') +
      '</div>' +
      '</div>' +
      '</div>';

    if (state.dqLoading && !dq) {
      html += '<div style="padding:32px;text-align:center;color:var(--md-text-secondary);font-size:13px">⏳ กำลังประเมินคุณภาพการบันทึกข้อมูล ' + typeUpper + '...</div>';
      html += '</div>';
      return html;
    }
    if (state.dqError) {
      html += '<div style="padding:24px;background:#ef444410;border-left:4px solid #ef4444">' +
        '<div style="font-size:13px;font-weight:800;color:#ef4444;margin-bottom:4px">เกิดข้อผิดพลาด</div>' +
        '<div style="font-size:11px;color:var(--md-text-secondary)">' + esc(state.dqError) + '</div>' +
        '</div>';
      html += '</div>';
      return html;
    }
    if (!dq) {
      html += '<div style="padding:24px;text-align:center;color:var(--md-text-secondary);font-size:12px">ไม่มีข้อมูล</div>';
      html += '</div>';
      return html;
    }

    // Hero strip: score + grade + counts
    var grade = dq.grade || 'D';
    var gc = dqGradeColor(grade);
    html += '<div style="padding:16px 18px;display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;border-bottom:1px solid var(--md-border)">' +
      // Grade big
      '<div style="background:' + gc.bg + ';color:#fff;border-radius:12px;padding:12px 18px;text-align:center;min-width:90px">' +
      '<div style="font-size:32px;font-weight:900;line-height:1">' + grade + '</div>' +
      '<div style="font-size:10px;font-weight:700;opacity:.9;margin-top:2px">Grade</div>' +
      '</div>' +
      // Score + pct
      '<div>' +
      '<div style="display:flex;align-items:baseline;gap:8px">' +
      '<span style="font-size:28px;font-weight:900;color:var(--md-text-primary)">' + (dq.avg_score != null ? dq.avg_score.toFixed(1) : '—') + '</span>' +
      '<span style="font-size:13px;color:var(--md-text-secondary);font-weight:700">/ ' + dq.max_score + ' pts</span>' +
      '<span style="font-size:14px;font-weight:900;color:' + gc.text + ';margin-left:8px">' + (dq.pct != null ? dq.pct.toFixed(1) : '—') + '%</span>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--md-text-secondary);font-weight:600;margin-top:3px">คะแนนเฉลี่ยต่อ ' + (state.dqType === 'opd' ? 'visit' : 'AN') + ' (' + state.days + ' วันล่าสุด)</div>' +
      '</div>' +
      // Counts
      '<div style="display:flex;gap:10px">' +
      '<div style="padding:8px 14px;background:' + gc.light + ';border-radius:8px;text-align:center;min-width:80px">' +
      '<div style="font-size:18px;font-weight:900;color:' + gc.text + '">' + (dq.count || 0).toLocaleString() + '</div>' +
      '<div style="font-size:9px;color:var(--md-text-secondary);font-weight:700;margin-top:2px">' + (state.dqType === 'opd' ? 'visits' : 'AN') + '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Sections breakdown
    html += '<div style="padding:18px">';
    html += '<div style="font-size:12px;font-weight:800;color:var(--md-text-primary);margin-bottom:10px">รายละเอียดต่อหมวด</div>';
    var secs = (dq.sections || []);
    if (secs.length === 0) {
      html += '<div style="font-size:11px;color:var(--md-text-secondary)">ไม่มีข้อมูลหมวด</div>';
    } else {
      var midpoint = Math.ceil(secs.length / 2);
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">';
      html += '<div>' + secs.slice(0, midpoint).map(dqSectionBar).join('') + '</div>';
      html += '<div>' + secs.slice(midpoint).map(dqSectionBar).join('') + '</div>';
      html += '</div>';
    }
    html += '</div>';

    // Footer note
    html += '<div style="padding:10px 18px;background:#fbbf2410;border-top:1px solid var(--md-border);font-size:10px;color:var(--md-text-secondary)">' +
      '<strong>⚠️ หมายเหตุ:</strong> ' + esc(dq.note || '') +
      '</div>';

    html += '</div>';
    return html;
  }

  // Phase 1C — Error Symbols Distribution
  function fetchErrorSymbols(type) {
    state.esLoading = true;
    state.esError = null;
    render();
    authedFetch('/api/mr-audit/error-symbols?type=' + type + '&' + periodQueryParams(), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error(friendlyHttpErr('error-symbols', r)));
      })
      .then(function(data) {
        state.esLoading = false;
        if (type === 'opd') state.esOpd = data;
        else state.esIpd = data;
        render();
      })
      .catch(function(err) {
        state.esLoading = false;
        state.esError = err.message || String(err);
        render();
      });
  }

  function fetchErrorSymbolDetail(symbol) {
    state.esDetailSymbol = symbol;
    state.esDetailLoading = true;
    state.esDetailError = null;
    state.esDetailData = null;
    render();
    authedFetch('/api/mr-audit/error-symbols-detail?symbol=' + encodeURIComponent(symbol) + '&type=' + state.esType + '&' + periodQueryParams(), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error(friendlyHttpErr('detail', r)));
      })
      .then(function(data) {
        state.esDetailLoading = false;
        state.esDetailData = data;
        render();
      })
      .catch(function(err) {
        state.esDetailLoading = false;
        state.esDetailError = err.message || String(err);
        render();
      });
  }

  function guidanceCard(g, sym) {
    if (!g) return '';
    var sev = g.severity || 'medium';
    var sevColor = sev === 'high' ? '#ef4444' :
      sev === 'medium' ? '#f59e0b' :
      sev === 'good' ? '#10b981' :
      sev === 'manual' ? '#a855f7' :
      '#3b82f6';
    var sevLabel = sev === 'high' ? 'ความรุนแรงสูง · แก้ทันที' :
      sev === 'medium' ? 'ความรุนแรงกลาง' :
      sev === 'good' ? 'ผ่านมาตรฐาน' :
      sev === 'manual' ? 'ต้อง manual review' :
      'ทั่วไป';

    var html = '<div style="margin:14px 20px;border:1.5px solid ' + sevColor + '60;border-left:5px solid ' + sevColor + ';background:' + sevColor + '08;border-radius:10px;overflow:hidden">' +
      // Header
      '<div style="padding:10px 14px;background:' + sevColor + '12;display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<span style="font-size:22px">🤖</span>' +
      '<div style="font-size:13px;font-weight:900;color:' + sevColor + ';flex:1">AI แนะนำแนวทางแก้ไข · Symbol ' + esc(sym) + '</div>' +
      '<span style="padding:3px 10px;background:' + sevColor + ';color:#fff;font-size:10px;font-weight:800;border-radius:6px">' + sevLabel + '</span>' +
      '</div>' +
      // Summary
      '<div style="padding:12px 14px;font-size:12px;color:var(--md-text-primary);line-height:1.6;font-weight:600">' +
      esc(g.summary || '') +
      '</div>';

    // Per-code fixes (Symbol C)
    if (g.perCodeFixes && g.perCodeFixes.length > 0) {
      html += '<div style="padding:0 14px 4px">' +
        '<div style="font-size:11px;font-weight:800;color:var(--md-text-primary);margin-bottom:6px">📋 วิธีแก้ตามรหัส:</div>' +
        '<table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:8px">' +
        '<thead><tr style="background:' + sevColor + '15">' +
        '<th style="padding:6px 8px;text-align:left;font-weight:800;color:' + sevColor + ';width:80px">รหัส</th>' +
        '<th style="padding:6px 8px;text-align:left;font-weight:800;color:' + sevColor + ';width:200px">ความหมาย</th>' +
        '<th style="padding:6px 8px;text-align:left;font-weight:800;color:' + sevColor + '">แนวทางแก้</th>' +
        '</tr></thead><tbody>';
      g.perCodeFixes.forEach(function(f) {
        html += '<tr style="border-top:1px solid var(--md-border)">' +
          '<td style="padding:6px 8px;font-family:monospace;font-weight:800;color:' + sevColor + '">' + esc(f.code) + '</td>' +
          '<td style="padding:6px 8px;color:var(--md-text-secondary)">' + esc(f.label) + '</td>' +
          '<td style="padding:6px 8px;color:var(--md-text-primary)">' + esc(f.fix) + '</td>' +
          '</tr>';
      });
      html += '</tbody></table></div>';
    }

    // Action steps
    if (g.actions && g.actions.length > 0) {
      html += '<div style="padding:4px 14px 12px">' +
        '<div style="font-size:11px;font-weight:800;color:var(--md-text-primary);margin-bottom:6px">✅ ขั้นตอนการแก้ไข:</div>' +
        '<ol style="margin:0;padding-left:22px;font-size:11px;color:var(--md-text-primary);line-height:1.7">' +
        g.actions.map(function(a) {
          return '<li>' + esc(a) + '</li>';
        }).join('') +
        '</ol>' +
        '</div>';
    }

    // Responsible
    if (g.responsible) {
      html += '<div style="padding:8px 14px;background:' + sevColor + '10;border-top:1px solid ' + sevColor + '30;font-size:11px">' +
        '<span style="color:var(--md-text-secondary);font-weight:700">👤 ผู้รับผิดชอบ: </span>' +
        '<span style="color:' + sevColor + ';font-weight:800">' + esc(g.responsible) + '</span>' +
        '</div>';
    }

    html += '</div>';
    return html;
  }

  function esDetailModal() {
    var d = state.esDetailData;
    var sym = state.esDetailSymbol;
    var html = '<div style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px">' +
      '<div style="background:var(--md-surface);border-radius:16px;max-width:1000px;width:100%;max-height:88vh;overflow:hidden;display:flex;flex-direction:column;border:2px solid #a855f7">' +
      // Header
      '<div style="padding:14px 20px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;display:flex;align-items:center;gap:14px">' +
      '<span style="font-size:36px;font-weight:900;line-height:1">' + esc(sym || '') + '</span>' +
      '<div style="flex:1">' +
      '<div style="font-size:16px;font-weight:900">' + esc(d ? d.label : 'Symbol ' + sym) + '</div>' +
      '<div style="font-size:11px;opacity:0.9;margin-top:2px">' + esc(d ? d.desc : '') + ' · ' + state.esType.toUpperCase() + '</div>' +
      '</div>' +
      '<button data-mra-es-modal-close="1" style="border:0;background:rgba(255,255,255,0.2);color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:18px">✕</button>' +
      '</div>';

    if (state.esDetailLoading) {
      html += '<div style="padding:50px;text-align:center;color:var(--md-text-secondary)">⏳ กำลังโหลดรายละเอียด...</div></div></div>';
      return html;
    }
    if (state.esDetailError) {
      html += '<div style="padding:30px;background:#ef444410">' +
        '<div style="font-size:13px;font-weight:800;color:#ef4444">เกิดข้อผิดพลาด</div>' +
        '<div style="font-size:11px;color:var(--md-text-secondary);margin-top:4px">' + esc(state.esDetailError) + '</div>' +
        '</div></div></div>';
      return html;
    }
    if (!d) {
      html += '<div style="padding:50px;text-align:center;color:var(--md-text-secondary)">ไม่มีข้อมูล</div></div></div>';
      return html;
    }

    // NA symbol — show explanation + AI guidance
    if (d.kind === 'na') {
      html += '<div style="padding:18px 20px 0;background:#94a3b810">' +
        '<div style="font-size:14px;font-weight:800;color:var(--md-text-primary);margin-bottom:8px">⚠ ระบบ auto ตรวจไม่ได้</div>' +
        '<div style="font-size:12px;color:var(--md-text-secondary);line-height:1.6">' + esc(d.note || '') + '</div>' +
        '</div>';
      html += guidanceCard(d.guidance, sym);
      html += '<div style="padding:14px 20px;border-top:1px solid var(--md-border);display:flex;justify-content:flex-end">' +
        '<button data-mra-es-modal-close="1" style="padding:9px 18px;border:1px solid var(--md-border);border-radius:8px;background:transparent;color:var(--md-text-primary);cursor:pointer;font-family:inherit;font-size:12px;font-weight:700">ปิด</button>' +
        '</div>';
      html += '</div></div>';
      return html;
    }

    // Stats strip
    html += '<div style="padding:12px 20px;background:var(--md-bg);border-bottom:1px solid var(--md-border);display:flex;align-items:center;gap:18px;flex-wrap:wrap">' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">ทั้งหมด</span>' +
      '<div style="font-size:22px;font-weight:900">' + (d.total || 0).toLocaleString() + ' รายการ</div></div>' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">แสดง</span>' +
      '<div style="font-size:14px;font-weight:800">' + (d.returned || 0).toLocaleString() + (d.note ? ' (' + d.total + ' ทั้งหมด)' : '') + '</div></div>' +
      '<div style="flex:1"></div>' +
      '<div style="font-size:11px;color:var(--md-text-secondary);font-weight:700">' + d.days + ' วันล่าสุด · ' + state.esType.toUpperCase() + '</div>' +
      '</div>';

    // Scrollable body (guidance + records)
    html += '<div style="flex:1;overflow-y:auto">';

    // AI guidance section
    html += guidanceCard(d.guidance, sym);

    // Records table
    html += '<div style="margin:14px 20px 0;padding-bottom:6px;font-size:11px;font-weight:800;color:var(--md-text-secondary)">📋 รายการที่พบ (' + (d.records ? d.records.length : 0) + ')</div>';
    if (!d.records || d.records.length === 0) {
      html += '<div style="padding:40px;text-align:center;color:var(--md-text-secondary)">' +
        '<div style="font-size:48px;margin-bottom:8px">✓</div>' +
        '<div style="font-size:14px;font-weight:800">ไม่พบรายการที่ติด ' + sym + '</div>' +
        '<div style="font-size:11px;margin-top:4px">ในช่วงเวลานี้</div>' +
        '</div>';
    } else {
      var encLabel = state.esType === 'opd' ? 'VN' : 'AN';
      var dateLabel = state.esType === 'opd' ? 'วันที่ตรวจ' : 'วันจำหน่าย';
      var deptLabel = state.esType === 'opd' ? 'คลินิก' : 'วอร์ด';
      var isBSymbol = sym === 'B';
      html += '<table style="width:100%;border-collapse:collapse;font-size:11px">' +
        '<thead style="position:sticky;top:0;background:var(--md-bg);z-index:1">' +
        '<tr style="text-align:left;border-bottom:1.5px solid var(--md-border)">' +
        '<th style="padding:9px 12px;font-weight:800;color:var(--md-text-secondary)">' + encLabel + '</th>' +
        '<th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary)">HN</th>' +
        '<th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary)">' + dateLabel + '</th>' +
        '<th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary)">' + deptLabel + '</th>' +
        '<th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary)">แพทย์</th>' +
        (isBSymbol ?
          '<th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary)">รหัสที่มี</th><th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary);text-align:center">จำนวน</th>' :
          '<th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary)">ICD-10</th><th style="padding:9px 8px;font-weight:800;color:var(--md-text-secondary);text-align:center">diagtype</th>') +
        '</tr>' +
        '</thead>' +
        '<tbody>';
      d.records.forEach(function(r) {
        html += '<tr style="border-bottom:1px solid var(--md-border)">' +
          '<td style="padding:6px 12px;font-family:monospace;font-weight:700">' + esc(r.encounter || '') + '</td>' +
          '<td style="padding:6px 8px;font-family:monospace;color:var(--md-text-secondary)">' + esc(r.hn || '') + '</td>' +
          '<td style="padding:6px 8px;color:var(--md-text-secondary)">' + esc(String(r.event_date || '').slice(0, 10)) + '</td>' +
          '<td style="padding:6px 8px">' + esc(r.dept || '') + '</td>' +
          '<td style="padding:6px 8px;color:var(--md-text-secondary)">' + esc(r.doctor || '') + '</td>' +
          (isBSymbol ?
            '<td style="padding:6px 8px;font-family:monospace;font-size:10px">' + esc(r.icd10 || '') + '</td>' +
            '<td style="padding:6px 8px;text-align:center;font-weight:700">' + (r.code_count || 0) + '</td>' :
            '<td style="padding:6px 8px;font-family:monospace;font-weight:700;color:#7c3aed">' + esc(r.icd10 || '') + '</td>' +
            '<td style="padding:6px 8px;text-align:center">' + esc(r.diagtype || '') + '</td>') +
          '</tr>';
      });
      html += '</tbody></table>';
    }
    html += '</div>'; // end scroll

    html += '<div style="padding:10px 20px;border-top:1px solid var(--md-border);background:var(--md-bg);display:flex;justify-content:space-between;align-items:center">' +
      '<div style="font-size:10px;color:var(--md-text-secondary)">' + esc(d.note || '') + '</div>' +
      '<button data-mra-es-modal-close="1" style="padding:8px 16px;border:1px solid var(--md-border);border-radius:8px;background:transparent;color:var(--md-text-primary);cursor:pointer;font-family:inherit;font-size:12px;font-weight:700">ปิด</button>' +
      '</div>';

    html += '</div></div>';
    return html;
  }

  function errorSymbolsPanel() {
    var typeUpper = state.esType === 'opd' ? 'OPD' : 'IPD';
    var es = state.esType === 'opd' ? state.esOpd : state.esIpd;

    var html = '<div style="background:var(--md-surface);border:1.5px solid var(--md-border);border-radius:14px;overflow:hidden">';

    html += '<div style="padding:14px 18px;background:linear-gradient(135deg,#7c3aed10,#ec489910);border-bottom:1.5px solid var(--md-border)">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<span style="font-size:22px">🎯</span>' +
      '<div style="flex:1;min-width:240px">' +
      '<div style="font-size:14px;font-weight:900;color:#7c3aed">Phase 1C · Error Symbols Distribution (Y/A/B/C/D/E/F/G/H)</div>' +
      '<div style="font-size:10px;color:var(--md-text-secondary);font-weight:600;margin-top:2px">เกณฑ์ สนย. Form A2/A4 หน้า 134-138 + 151-152 · จำแนกรหัสแต่ละตัวเข้า symbol</div>' +
      '</div>' +
      '<div style="display:flex;gap:4px;background:var(--md-surface);padding:3px;border-radius:10px;border:1px solid var(--md-border)">' + ['ipd', 'opd'].map(function(t) {
        var active = t === state.esType;
        return '<button data-mra-es-type="' + t + '" style="padding:6px 14px;border-radius:7px;border:0;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;' +
          'background:' + (active ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent') + ';' +
          'color:' + (active ? '#fff' : 'var(--md-text-primary)') + '">' + t.toUpperCase() + '</button>';
      }).join('') +
      '</div>' +
      '</div>' +
      '</div>';

    if (state.esLoading && !es) {
      html += '<div style="padding:32px;text-align:center;color:var(--md-text-secondary);font-size:13px">⏳ กำลังจำแนก Error Symbols ' + typeUpper + '...</div>';
      html += '</div>';
      return html;
    }
    if (state.esError) {
      html += '<div style="padding:24px;background:#ef444410;border-left:4px solid #ef4444">' +
        '<div style="font-size:13px;font-weight:800;color:#ef4444;margin-bottom:4px">เกิดข้อผิดพลาด</div>' +
        '<div style="font-size:11px;color:var(--md-text-secondary)">' + esc(state.esError) + '</div>' +
        '</div></div>';
      return html;
    }
    if (!es) {
      html += '<div style="padding:24px;text-align:center;color:var(--md-text-secondary);font-size:12px">ไม่มีข้อมูล</div></div>';
      return html;
    }

    // Hero: totals
    html += '<div style="padding:14px 18px;display:flex;gap:18px;align-items:center;flex-wrap:wrap;border-bottom:1px solid var(--md-border)">' +
      '<div style="display:flex;gap:14px">' +
      '<div><div style="font-size:22px;font-weight:900;color:var(--md-text-primary)">' + (es.total_encounters || 0).toLocaleString() + '</div>' +
      '<div style="font-size:10px;color:var(--md-text-secondary);font-weight:700;margin-top:2px">' + (state.esType === 'opd' ? 'visits' : 'AN') + '</div></div>' +
      '<div><div style="font-size:22px;font-weight:900;color:var(--md-text-primary)">' + (es.total_codes || 0).toLocaleString() + '</div>' +
      '<div style="font-size:10px;color:var(--md-text-secondary);font-weight:700;margin-top:2px">codes</div></div>' +
      '</div>' +
      '<div style="flex:1;min-width:200px;text-align:right;font-size:11px;color:var(--md-text-secondary);font-weight:600">เวลาวิเคราะห์: ' + es.days + ' วันล่าสุด</div>' +
      '</div>';

    // Symbol cards grid
    html += '<div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">';

    (es.symbols || []).forEach(function(s) {
      var dim = s.kind === 'na';
      var hasErr = s.kind === 'error' && s.count > 0;
      var bgGrad = s.code === 'Y' ?
        'linear-gradient(135deg,' + s.color + '15,' + s.color + '05)' :
        (dim ? 'var(--md-bg)' : (hasErr ? s.color + '10' : 'var(--md-bg)'));
      var borderColor = dim ? 'var(--md-border)' : (s.color + (hasErr ? '60' : '30'));
      html += '<button data-mra-es-card="' + s.code + '" style="padding:12px 14px;background:' + bgGrad + ';border:1.5px solid ' + borderColor + ';border-radius:10px;position:relative;cursor:pointer;text-align:left;font-family:inherit;transition:transform .15s,box-shadow .15s" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(124,58,237,0.15)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
        '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px">' +
        '<span style="font-size:24px;font-weight:900;color:' + (dim ? 'var(--md-text-secondary)' : s.color) + ';line-height:1">' + s.code + '</span>' +
        '<span style="font-size:13px;font-weight:900;color:var(--md-text-primary);line-height:1.1;flex:1">' + esc(s.label) + '</span>' +
        '</div>' +
        '<div style="display:flex;align-items:baseline;gap:4px;margin-bottom:4px">' +
        '<span style="font-size:18px;font-weight:900;color:' + (dim ? 'var(--md-text-secondary)' : s.color) + '">' + (s.count || 0).toLocaleString() + '</span>' +
        '<span style="font-size:10px;color:var(--md-text-secondary);font-weight:700">/ ' + (s.denom || 0).toLocaleString() + '</span>' +
        '<span style="margin-left:auto;font-size:11px;font-weight:800;color:' + (dim ? 'var(--md-text-secondary)' : s.color) + '">' + (s.pct != null ? s.pct.toFixed(2) : '—') + '%</span>' +
        '</div>' +
        '<div style="font-size:9.5px;color:var(--md-text-secondary);line-height:1.4">' + esc(s.desc) + '</div>' +
        '<div style="position:absolute;bottom:6px;right:8px;font-size:9px;color:' + s.color + '60;font-weight:700">คลิกดู →</div>' +
        (dim ? '<span style="position:absolute;top:8px;right:8px;padding:1px 5px;background:#94a3b820;color:#64748b;font-size:8px;font-weight:800;border-radius:3px">NA</span>' : '') +
        '</button>';
    });

    html += '</div>';

    html += '<div style="padding:10px 18px;background:#fbbf2410;border-top:1px solid var(--md-border);font-size:10px;color:var(--md-text-secondary)">' +
      '<strong>⚠️ หมายเหตุ:</strong> ' + esc(es.note || '') +
      '</div>';

    html += '</div>';
    return html;
  }

  // ── Section 2 (สปสช. 2563) helpers ──

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function fetchSapsach() {
    state.sapsachLoading = true;
    state.sapsachError = null;
    render();
    authedFetch('/api/mr-audit/sapsach-summary?' + periodQueryParams(), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error(friendlyHttpErr('sapsach-summary', r)));
      })
      .then(function(data) {
        state.sapsachLoading = false;
        state.sapsach = data;
        render();
      })
      .catch(function(err) {
        state.sapsachLoading = false;
        state.sapsachError = err.message || String(err);
        render();
      });
  }

  function fetchSapsachDetail(an) {
    state.modalAn = an;
    state.modalLoading = true;
    state.modalError = null;
    state.modalDetail = null;
    state.modalDirty = false;
    render();
    authedFetch('/api/mr-audit/sapsach-detail/' + encodeURIComponent(an), {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error(friendlyHttpErr('sapsach-detail', r)));
      })
      .then(function(data) {
        state.modalLoading = false;
        state.modalDetail = data;
        render();
      })
      .catch(function(err) {
        state.modalLoading = false;
        state.modalError = err.message || String(err);
        render();
      });
  }

  function saveSapsachScores() {
    if (!state.modalAn || !state.modalDetail) return;
    var csrf = getCookie('csrf_token');
    if (!csrf) {
      state.modalError = 'CSRF token missing — กรุณา reload หน้า';
      render();
      return;
    }
    // Flatten grid to array
    var grid = state.modalDetail.manualAudit.grid;
    var scores = [];
    Object.keys(grid).forEach(function(code) {
      grid[code].forEach(function(cell, idx) {
        // Only save cells that have been touched (any non-undefined cell goes)
        scores.push({
          section_code: code,
          criterion_no: idx + 1,
          score: cell.score,
          comment: cell.comment || null,
        });
      });
    });
    state.modalSaving = true;
    render();
    authedFetch('/api/mr-audit/sapsach-score/' + encodeURIComponent(state.modalAn), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        credentials: 'include',
        body: JSON.stringify({
          scores: scores
        }),
      })
      .then(function(r) {
        state.modalSaving = false;
        if (!r.ok) return Promise.reject(new Error(friendlyHttpErr('save scores', r)));
        state.modalDirty = false;
        // Re-fetch to refresh aggregate
        return fetchSapsachDetail(state.modalAn);
      })
      .catch(function(err) {
        state.modalSaving = false;
        state.modalError = err.message;
        render();
      });
  }

  function saveSapsachOverall(finding, comment) {
    if (!state.modalAn) return;
    var csrf = getCookie('csrf_token');
    if (!csrf) {
      state.modalError = 'CSRF token missing — กรุณา reload หน้า';
      render();
      return;
    }
    authedFetch('/api/mr-audit/sapsach-overall/' + encodeURIComponent(state.modalAn), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        credentials: 'include',
        body: JSON.stringify({
          finding: finding,
          comment: comment || null
        }),
      })
      .then(function(r) {
        if (!r.ok) return Promise.reject(new Error(friendlyHttpErr('save overall', r)));
        return fetchSapsachDetail(state.modalAn);
      })
      .catch(function(err) {
        state.modalError = err.message;
        render();
      });
  }

  function prefillSingleAn(an) {
    var csrf = getCookie('csrf_token');
    if (!csrf) {
      alert('CSRF token missing — กรุณา reload หน้า');
      return;
    }
    if (!confirm('AI Pre-fill จะใส่คะแนน auto-derive ~46 จุด สำหรับ AN ' + an + '\nคะแนน manual ที่บันทึกไว้แล้วจะไม่ถูกทับ\nดำเนินการ?')) return;
    state.modalSaving = true;
    render();
    authedFetch('/api/mr-audit/sapsach-auto-prefill?an=' + encodeURIComponent(an), {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrf
        },
        credentials: 'include',
      })
      .then(function(r) {
        state.modalSaving = false;
        if (!r.ok) return r.json().then(function(e) {
          return Promise.reject(new Error(e.error || 'HTTP ' + r.status));
        });
        return r.json();
      })
      .then(function(data) {
        alert('AI Pre-fill เสร็จ: ' + data.scores_inserted + ' จุดที่ใส่ใหม่');
        // Reload detail to show new scores
        return fetchSapsachDetail(an);
      })
      .catch(function(err) {
        state.modalSaving = false;
        state.modalError = err.message;
        render();
      });
  }

  function prefillBatch() {
    var csrf = getCookie('csrf_token');
    if (!csrf) {
      alert('CSRF token missing — กรุณา reload หน้า');
      return;
    }
    var p = state.period || _computePeriod(state.periodMode, state.customStart, state.customEnd);
    if (!confirm('AI Pre-fill ทั้งหมด: รัน auto-derive สำหรับทุก AN ใน ช่วง ' + p.start + ' ถึง ' + p.end + ' (' + p.label + ')\nAN ที่มี manual scores แล้วจะถูกข้าม\nดำเนินการ? (อาจใช้เวลา ~30 วินาที)')) return;
    state.sapsachLoading = true;
    render();
    authedFetch('/api/mr-audit/sapsach-auto-prefill?' + periodQueryParams(), {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrf
        },
        credentials: 'include',
      })
      .then(function(r) {
        if (!r.ok) return r.json().then(function(e) {
          return Promise.reject(new Error(e.error || 'HTTP ' + r.status));
        });
        return r.json();
      })
      .then(function(data) {
        alert('AI Pre-fill batch เสร็จ:\n' + data.ans_processed + ' AN processed\n' + data.scores_inserted + ' จุดที่ใส่ใหม่\n' + (data.ans_skipped || 0) + ' AN ข้าม (มี manual scores)');
        // Reload summary
        state.sapsach = null;
        fetchSapsach();
      })
      .catch(function(err) {
        state.sapsachLoading = false;
        state.sapsachError = err.message;
        render();
      });
  }

  function sapsachStatusColor(st) {
    if (st === 'present') return {
      bg: '#10b98115',
      fg: '#059669',
      label: 'มี'
    };
    if (st === 'partial') return {
      bg: '#f59e0b15',
      fg: '#d97706',
      label: 'ขาด'
    };
    if (st === 'missing') return {
      bg: '#ef444415',
      fg: '#dc2626',
      label: 'ไม่มี'
    };
    if (st === 'na') return {
      bg: 'var(--md-bg)',
      fg: '#94a3b8',
      label: 'N/A'
    };
    return {
      bg: 'var(--md-bg)',
      fg: '#94a3b8',
      label: '—'
    };
  }

  function sapsachContent() {
    var d = state.sapsach;
    var html = '';
    // Header card
    html += '<div style="margin-bottom:14px;padding:14px 18px;border-radius:14px;background:linear-gradient(135deg,rgba(168,85,247,.10) 0%, var(--md-surface) 100%);border:1.5px solid rgba(168,85,247,.30);border-left:5px solid #a855f7">' +
      '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
      '<span style="font-size:28px">📋</span>' +
      '<div style="flex:1;min-width:280px">' +
      '<div style="font-size:16px;font-weight:900;color:#a855f7">Section 2 · มาตรฐาน สปสช. (MRA Guideline 2563)</div>' +
      '<div style="font-size:11px;color:var(--md-text-secondary);font-weight:600;margin-top:2px">12 IPD content sections × 9 criteria (~106 จุดตรวจ) · Grade A ≥85% / B 70-84% / C 50-69% / D &lt;50%</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    if (state.sapsachLoading && !d) {
      html += '<div style="padding:40px;text-align:center;color:var(--md-text-secondary)">⏳ กำลังโหลด สปสช. 2563...</div>';
      return html;
    }
    if (state.sapsachError) {
      html += '<div style="padding:24px;background:#ef444410;border-left:4px solid #ef4444;border-radius:8px">' +
        '<div style="font-size:13px;font-weight:800;color:#ef4444">เกิดข้อผิดพลาด</div>' +
        '<div style="font-size:11px;color:var(--md-text-secondary);margin-top:4px">' + esc(state.sapsachError) + '</div>' +
        '</div>';
      return html;
    }
    if (!d) {
      html += '<div style="padding:24px;text-align:center;color:var(--md-text-secondary)">ไม่มีข้อมูล</div>';
      return html;
    }

    // Phase 2A: Section overview panel
    html += '<div style="background:var(--md-surface);border:1.5px solid var(--md-border);border-radius:14px;overflow:hidden;margin-bottom:14px">';
    html += '<div style="padding:12px 18px;background:linear-gradient(135deg,#a855f710,#7c3aed10);border-bottom:1.5px solid var(--md-border);display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<span style="font-size:20px">📊</span>' +
      '<div style="flex:1;min-width:240px">' +
      '<div style="font-size:13px;font-weight:900;color:#a855f7">Phase 2A · 12 หัวข้อ Content Review (Auto-derive)</div>' +
      '<div style="font-size:10px;color:var(--md-text-secondary);font-weight:600;margin-top:2px">ตรวจ existence ใน HOSxP — ระบุ section ที่มี/ขาด/N/A · Full audit ใช้ Manual กรอกในตาราง</div>' +
      '</div>' +
      '<button data-mra-prefill-batch="1" style="padding:8px 14px;border:0;border-radius:8px;background:linear-gradient(135deg,#06b6d4,#0891b2);color:#fff;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;white-space:nowrap">✨ AI Pre-fill ทั้งหมด</button>' +
      '<div style="text-align:right;font-size:11px;color:var(--md-text-secondary);font-weight:700">รวม ' + (d.total_ans || 0).toLocaleString() + ' AN · ' + d.days + ' วัน</div>' +
      '</div>';

    // Section bars
    html += '<div style="padding:14px 18px;display:grid;grid-template-columns:1fr 1fr;gap:10px 18px">';
    (d.sections || []).forEach(function(s) {
      var ad = s.autoDerive || {};
      var total = (ad.present || 0) + (ad.partial || 0) + (ad.missing || 0);
      var ppct = total > 0 ? (ad.present / total * 100) : 0;
      var rpct = total > 0 ? (ad.partial / total * 100) : 0;
      var col = ppct >= 85 ? '#10b981' : ppct >= 70 ? '#3b82f6' : ppct >= 50 ? '#f59e0b' : '#ef4444';
      var naBadge = (s.naAble && ad.na > 0) ? '<span style="margin-left:6px;padding:1px 5px;background:#94a3b820;color:#64748b;font-size:9px;font-weight:700;border-radius:4px">NA ' + ad.na + '</span>' : '';
      html += '<div style="margin-bottom:6px">' +
        '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:3px">' +
        '<span style="font-size:11px;font-weight:800;color:var(--md-text-secondary);min-width:54px">' + esc(s.code) + '</span>' +
        '<span style="flex:1;font-size:11px;color:var(--md-text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(s.label) + naBadge + '</span>' +
        '<span style="font-size:11px;font-weight:900;color:' + col + '">' + (ad.presentPct != null ? ad.presentPct.toFixed(1) : '—') + '%</span>' +
        '</div>' +
        '<div style="background:var(--md-bg);height:8px;border-radius:4px;overflow:hidden;display:flex">' +
        '<div style="width:' + Math.max(0, Math.min(100, ppct)) + '%;height:100%;background:' + col + '"></div>' +
        '<div style="width:' + Math.max(0, Math.min(100 - ppct, rpct)) + '%;height:100%;background:#f59e0b80"></div>' +
        '</div>' +
        '<div style="display:flex;gap:8px;margin-top:3px;font-size:9.5px;color:var(--md-text-secondary)">' +
        '<span>มี ' + (ad.present || 0) + '</span><span>·</span>' +
        '<span>ขาด ' + (ad.partial || 0) + '</span><span>·</span>' +
        '<span>ไม่มี ' + (ad.missing || 0) + '</span>' +
        '</div>' +
        '</div>';
    });
    html += '</div>';

    // Phase 2D: Manual audit overall finding stats
    var ms = d.manualAuditStats || {};
    var of = ms.overallFindings || {};
    html += '<div style="padding:12px 18px;background:#fbbf2410;border-top:1px solid var(--md-border)">' +
      '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
      '<div style="font-size:11px;font-weight:800;color:var(--md-text-primary)">📝 Manual Audit (Phase 2C+2D):</div>' +
      '<div style="font-size:11px;color:var(--md-text-secondary)"><strong>' + (ms.totalAuditedAns || 0) + '</strong> AN audited</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
      '<span style="padding:3px 8px;background:#10b98120;color:#059669;border-radius:4px;font-size:10px;font-weight:800">No issue: ' + (of.no_issue || 0) + '</span>' +
      '<span style="padding:3px 8px;background:#f59e0b20;color:#d97706;border-radius:4px;font-size:10px;font-weight:800">In question: ' + (of.in_question || 0) + '</span>' +
      '<span style="padding:3px 8px;background:#ef444420;color:#dc2626;border-radius:4px;font-size:10px;font-weight:800">Inadequate: ' + (of.inadequate || 0) + '</span>' +
      '</div>' +
      '</div>' +
      '</div>';
    html += '</div>'; // end Phase 2A panel

    // Phase 2C: AN list with "ตรวจ 2563" buttons
    html += '<div style="background:var(--md-surface);border:1.5px solid var(--md-border);border-radius:14px;overflow:hidden">';
    html += '<div style="padding:12px 18px;background:linear-gradient(135deg,#a855f710,#ec489910);border-bottom:1.5px solid var(--md-border);display:flex;align-items:center;gap:10px">' +
      '<span style="font-size:20px">📋</span>' +
      '<div style="flex:1">' +
      '<div style="font-size:13px;font-weight:900;color:#a855f7">Phase 2C · รายการ AN เพื่อทำ Manual Audit</div>' +
      '<div style="font-size:10px;color:var(--md-text-secondary);font-weight:600;margin-top:2px">คลิก "ตรวจ 2563" เพื่อเปิด modal ให้คะแนน 12 หัวข้อ × 9 เกณฑ์ + Overall Finding</div>' +
      '</div>' +
      '</div>';

    html += '<div style="max-height:480px;overflow-y:auto">' +
      '<table style="width:100%;border-collapse:collapse;font-size:11px">' +
      '<thead style="position:sticky;top:0;background:var(--md-surface);z-index:1;border-bottom:1.5px solid var(--md-border)">' +
      '<tr style="text-align:left">' +
      '<th style="padding:8px 12px;font-weight:800;color:var(--md-text-secondary)">AN</th>' +
      '<th style="padding:8px 8px;font-weight:800;color:var(--md-text-secondary)">HN</th>' +
      '<th style="padding:8px 8px;font-weight:800;color:var(--md-text-secondary)">วันจำหน่าย</th>' +
      '<th style="padding:8px 8px;font-weight:800;color:var(--md-text-secondary)">วอร์ด</th>' +
      '<th style="padding:8px 8px;font-weight:800;color:var(--md-text-secondary)">แพทย์</th>' +
      '<th style="padding:8px 8px;font-weight:800;color:var(--md-text-secondary);text-align:center">LOS</th>' +
      '<th style="padding:8px 8px;font-weight:800;color:var(--md-text-secondary);text-align:center">Sections status</th>' +
      '<th style="padding:8px 12px;font-weight:800;color:var(--md-text-secondary);text-align:right">Action</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    (d.sample || []).forEach(function(r) {
      var statusPills = '';
      (d.sections || []).forEach(function(s) {
        var st = r.sections[s.code];
        var sc = sapsachStatusColor(st);
        statusPills += '<span title="' + esc(s.code) + ' = ' + sc.label + '" style="display:inline-block;width:8px;height:8px;background:' + sc.fg + '40;border:1px solid ' + sc.fg + ';border-radius:2px;margin-right:1px"></span>';
      });
      var auditedBadge = r.manualAudited ?
        '<span style="margin-right:6px;padding:2px 6px;background:#10b98120;color:#059669;font-size:9px;font-weight:800;border-radius:4px">✓ Audited</span>' :
        '';
      html += '<tr style="border-bottom:1px solid var(--md-border)">' +
        '<td style="padding:7px 12px;font-family:monospace;font-weight:700">' + esc(r.an) + '</td>' +
        '<td style="padding:7px 8px;font-family:monospace;color:var(--md-text-secondary)">' + esc(r.hn || '') + '</td>' +
        '<td style="padding:7px 8px;color:var(--md-text-secondary)">' + esc(String(r.dchdate || '').slice(0, 10)) + '</td>' +
        '<td style="padding:7px 8px">' + esc(r.ward || '') + '</td>' +
        '<td style="padding:7px 8px;color:var(--md-text-secondary)">' + esc(r.doctor || '') + '</td>' +
        '<td style="padding:7px 8px;text-align:center;font-weight:700">' + r.los_days + '</td>' +
        '<td style="padding:7px 8px;text-align:center">' + statusPills + '</td>' +
        '<td style="padding:7px 12px;text-align:right;white-space:nowrap">' + auditedBadge +
        '<button data-mra-audit-an="' + esc(r.an) + '" style="padding:5px 12px;border:0;border-radius:6px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;cursor:pointer;font-family:inherit;font-size:10px;font-weight:800">ตรวจ 2563 →</button>' +
        '</td>' +
        '</tr>';
    });

    html += '</tbody></table></div>';
    html += '<div style="padding:8px 18px;background:var(--md-bg);font-size:9.5px;color:var(--md-text-secondary)">' +
      '<strong>หมายเหตุ:</strong> ' + esc(d.note || '') +
      '</div>';
    html += '</div>'; // end AN list

    return html;
  }

  function sapsachModal() {
    var an = state.modalAn;
    var det = state.modalDetail;
    var html = '<div id="mra-sapsach-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px">' +
      '<div style="background:var(--md-surface);border-radius:16px;max-width:1100px;width:100%;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;border:2px solid #a855f7">' +
      // Header
      '<div style="padding:14px 20px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;display:flex;align-items:center;gap:14px">' +
      '<span style="font-size:28px">📋</span>' +
      '<div style="flex:1">' +
      '<div style="font-size:16px;font-weight:900">ตรวจ MRA 2563 · AN ' + esc(an) + '</div>' +
      '<div style="font-size:11px;opacity:0.9;margin-top:2px">เกณฑ์ สปสช. 2563 · 12 หัวข้อ × 9 เกณฑ์</div>' +
      '</div>' +
      '<button data-mra-prefill-single="1" style="padding:6px 12px;border:0;background:rgba(255,255,255,0.2);color:#fff;border-radius:8px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800">✨ AI Pre-fill</button>' +
      '<button data-mra-modal-close="1" style="border:0;background:rgba(255,255,255,0.2);color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:18px">✕</button>' +
      '</div>';

    if (state.modalLoading) {
      html += '<div style="padding:50px;text-align:center;color:var(--md-text-secondary)">⏳ กำลังโหลด...</div>';
      html += '</div></div>';
      return html;
    }
    if (state.modalError) {
      html += '<div style="padding:30px;background:#ef444410">' +
        '<div style="font-size:13px;font-weight:800;color:#ef4444">เกิดข้อผิดพลาด</div>' +
        '<div style="font-size:11px;color:var(--md-text-secondary);margin-top:4px">' + esc(state.modalError) + '</div>' +
        '</div>';
      html += '</div></div>';
      return html;
    }
    if (!det) {
      html += '<div style="padding:50px;text-align:center;color:var(--md-text-secondary)">ไม่มีข้อมูล</div>';
      html += '</div></div>';
      return html;
    }

    // Patient + aggregate strip
    var p = det.patient;
    var agg = det.manualAudit.aggregate;
    var grade = agg.grade;
    var gradeColor = '#94a3b8';
    if (grade === 'A') gradeColor = '#10b981';
    else if (grade === 'B') gradeColor = '#3b82f6';
    else if (grade === 'C') gradeColor = '#f59e0b';
    else if (grade === 'D') gradeColor = '#ef4444';

    html += '<div style="padding:14px 20px;background:var(--md-bg);border-bottom:1px solid var(--md-border);display:flex;gap:18px;align-items:center;flex-wrap:wrap">' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">HN</span><div style="font-family:monospace;font-weight:800">' + esc(p.hn || '') + '</div></div>' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">ward</span><div style="font-weight:800">' + esc(p.ward || '') + '</div></div>' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">admit</span><div style="font-weight:800;font-size:11px">' + esc(String(p.regdate || '').slice(0, 10)) + '</div></div>' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">discharge</span><div style="font-weight:800;font-size:11px">' + esc(String(p.dchdate || '').slice(0, 10)) + '</div></div>' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">LOS</span><div style="font-weight:800">' + p.los_days + ' วัน</div></div>' +
      '<div><span style="font-size:11px;color:var(--md-text-secondary);font-weight:700">แพทย์</span><div style="font-weight:800">' + esc(p.doctor || '') + '</div></div>' +
      '<div style="flex:1"></div>' +
      // Grade
      '<div style="background:' + gradeColor + ';color:#fff;border-radius:10px;padding:8px 16px;text-align:center;min-width:80px">' +
      '<div style="font-size:24px;font-weight:900;line-height:1">' + (grade || '—') + '</div>' +
      '<div style="font-size:9px;font-weight:700;margin-top:2px;opacity:0.9">Manual Grade</div>' +
      '</div>' +
      // Score summary
      '<div>' +
      '<div style="font-size:11px;color:var(--md-text-secondary);font-weight:700">manual score</div>' +
      '<div style="font-size:14px;font-weight:900">' + (agg.passes || 0) + ' / ' + (agg.total || 0) + ' (' + (agg.passPct != null ? agg.passPct.toFixed(1) + '%' : '—') + ')</div>' +
      '</div>' +
      '</div>';

    // Sections + criteria grid
    html += '<div style="flex:1;overflow-y:auto;padding:14px 20px">';
    (det.sections || []).forEach(function(s) {
      var crits = det.criteria[s.code] || [];
      var gridRow = det.manualAudit.grid[s.code] || [];
      var autoStatus = det.autoDerive.sections[s.code];
      var autoCol = sapsachStatusColor(autoStatus);
      html += '<div style="margin-bottom:18px;border:1px solid var(--md-border);border-radius:10px;overflow:hidden">' +
        '<div style="padding:8px 12px;background:' + autoCol.bg + ';border-bottom:1px solid var(--md-border);display:flex;align-items:center;gap:10px">' +
        '<span style="font-weight:900;color:#a855f7;min-width:54px">' + esc(s.code) + '</span>' +
        '<span style="flex:1;font-weight:800;font-size:12px">' + esc(s.label) + '</span>' +
        '<span style="font-size:10px;font-weight:700;color:' + autoCol.fg + ';padding:2px 8px;background:' + autoCol.fg + '20;border-radius:4px">Auto: ' + autoCol.label + '</span>' +
        (s.naAble ? '<span style="font-size:9px;background:#94a3b820;color:#64748b;padding:2px 6px;border-radius:4px;font-weight:700">NA-able</span>' : '') +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:var(--md-bg);font-size:10px;color:var(--md-text-secondary)">' +
        '<th style="padding:6px 8px;text-align:left;width:32px">#</th>' +
        '<th style="padding:6px 8px;text-align:left">เกณฑ์</th>' +
        '<th style="padding:6px 8px;text-align:center;width:200px">คะแนน</th>' +
        '</tr></thead><tbody>';
      crits.forEach(function(cr, idx) {
        var cell = gridRow[idx] || {
          score: null
        };
        var isAuto = cell.updated_by === 'auto';
        var autoBadge = isAuto ? '<span title="AI Pre-fill" style="margin-left:6px;padding:1px 5px;background:#06b6d420;color:#0891b2;font-size:9px;font-weight:800;border-radius:3px">✨ Auto</span>' : '';
        html += '<tr style="border-top:1px solid var(--md-border)' + (isAuto ? ';background:#06b6d408' : '') + '">' +
          '<td style="padding:5px 8px;font-weight:700;color:var(--md-text-secondary)">' + (idx + 1) + '</td>' +
          '<td style="padding:5px 8px;font-size:11px">' + esc(cr) + autoBadge + '</td>' +
          '<td style="padding:5px 8px;text-align:center">' + ['1', '0', 'na'].map(function(v) {
            var label = v === '1' ? 'ผ่าน' : v === '0' ? 'ไม่ผ่าน' : 'N/A';
            var active = (v === '1' && cell.score === 1) || (v === '0' && cell.score === 0) || (v === 'na' && cell.score == null);
            var col = v === '1' ? '#10b981' : v === '0' ? '#ef4444' : '#94a3b8';
            return '<button data-mra-cell="' + esc(s.code) + '_' + idx + '_' + v + '" style="padding:3px 10px;border:1.5px solid ' + col + (active ? '' : '40') + ';border-radius:5px;background:' + (active ? col : 'transparent') + ';color:' + (active ? '#fff' : col) + ';cursor:pointer;font-family:inherit;font-size:10px;font-weight:800;margin:0 2px">' + label + '</button>';
          }).join('') +
          '</td>' +
          '</tr>';
      });
      html += '</tbody></table>' +
        '</div>';
    });
    html += '</div>'; // end body scroll

    // Footer: overall finding + save buttons
    var overall = det.overall || {};
    html += '<div style="padding:14px 20px;border-top:1.5px solid var(--md-border);background:var(--md-bg)">' +
      '<div style="font-size:12px;font-weight:900;color:var(--md-text-primary);margin-bottom:8px">📌 Overall Finding (Phase 2D)</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">' + [{
          v: 'no_issue',
          l: '✓ No significant issue',
          col: '#10b981'
        },
        {
          v: 'in_question',
          l: '? Certain issues in question',
          col: '#f59e0b'
        },
        {
          v: 'inadequate',
          l: '✗ Documentation inadequate',
          col: '#ef4444'
        },
      ].map(function(o) {
        var active = overall.finding === o.v;
        return '<button data-mra-overall="' + o.v + '" style="padding:8px 14px;border:1.5px solid ' + o.col + (active ? '' : '40') + ';border-radius:8px;background:' + (active ? o.col : 'transparent') + ';color:' + (active ? '#fff' : o.col) + ';cursor:pointer;font-family:inherit;font-size:11px;font-weight:800">' + o.l + '</button>';
      }).join('') +
      '</div>' +
      (overall.updated_by ? '<div style="font-size:10px;color:var(--md-text-secondary);margin-bottom:8px">Last by: ' + esc(overall.updated_by) + ' · ' + esc(overall.updated_at) + '</div>' : '') +
      '<div style="display:flex;gap:8px;justify-content:flex-end;align-items:center">' +
      (state.modalSaving ? '<span style="font-size:11px;color:var(--md-text-secondary)">⏳ กำลังบันทึก...</span>' : '') +
      '<button data-mra-modal-close="1" style="padding:9px 18px;border:1px solid var(--md-border);border-radius:8px;background:transparent;color:var(--md-text-primary);cursor:pointer;font-family:inherit;font-size:12px;font-weight:700">ปิด</button>' +
      '<button data-mra-save-scores="1" style="padding:9px 18px;border:0;border-radius:8px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;cursor:pointer;font-family:inherit;font-size:12px;font-weight:800">💾 บันทึกคะแนน</button>' +
      '</div>' +
      '</div>';

    html += '</div></div>'; // close inner + outer divs
    return html;
  }

  function sapsachPlaceholder() {
    return placeholderCard(
      'Section 2: มาตรฐาน สปสช. (Medical Record Audit Guideline 2563)',
      'อยู่ระหว่างพัฒนา · จะครอบคลุม 4 ส่วน ตามเกณฑ์ MRA Guideline 2563 (สปสช. + สรพ.):',
      [{
          title: 'Phase 2A: 12 หัวข้อ Content Review (IPD)',
          desc: 'DS1, DS2, Hx, PE, Progress, Op, OB, Nurse, Consultation, Anesthetic, Rehab, Informed Consent'
        },
        {
          title: 'Phase 2B: Sum/Full Score + Grade A/B/C/D',
          desc: 'คะแนนเต็มขั้นต่ำ 56 · grade A (≥85%) / B (70-84%) / C (50-69%) / D (<50%)'
        },
        {
          title: 'Phase 2C: Sidecar Manual Audit (12×9 grid)',
          desc: 'ผู้ตรวจ MR คลิกบันทึกคะแนนต่อ AN เก็บลง SQLite warehouse'
        },
        {
          title: 'Phase 2D: Overall Finding (3 ตัวเลือก)',
          desc: 'Documentation inadequate / No significant issue / Certain issues in question'
        }
      ],
      '#a855f7'
    );
  }

  function windowSelector() {
    var opts = [{
        v: 'today',
        l: 'วันนี้'
      },
      {
        v: 'yesterday',
        l: 'เมื่อวาน'
      },
      {
        v: 'mtd',
        l: 'MTD (เดือนนี้)'
      },
      {
        v: '7d',
        l: '7 วันล่าสุด'
      },
      {
        v: '30d',
        l: '30 วันล่าสุด'
      },
      {
        v: 'custom',
        l: 'กำหนดเอง'
      },
    ];
    var pills = '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
      '<div style="font-size:11px;font-weight:800;color:var(--md-text-secondary)">📅 ช่วงเวลาวิเคราะห์</div>' +
      '<div style="display:flex;gap:4px;background:var(--md-surface);padding:3px;border-radius:10px;border:1px solid var(--md-border);flex-wrap:wrap">' +
      opts.map(function(o) {
        var active = o.v === state.periodMode;
        return '<button data-mra-period="' + o.v + '" style="padding:6px 10px;border-radius:8px;font-size:11px;font-weight:800;border:0;cursor:pointer;font-family:inherit;' +
          'background:' + (active ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent') + ';' +
          'color:' + (active ? '#fff' : 'var(--md-text-secondary)') + '">' + esc(o.l) + '</button>';
      }).join('') +
      '</div>' +
      '</div>';
    if (state.periodMode === 'custom') {
      pills += '<div style="margin-top:6px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">' +
        '<input type="date" id="mra-custom-start" value="' + esc(state.customStart || '') + '" style="padding:5px 8px;border:1px solid var(--md-border);border-radius:6px;background:var(--md-bg);color:var(--md-text-primary);font-family:inherit;font-size:11px">' +
        '<span style="font-size:11px;color:var(--md-text-secondary)">ถึง</span>' +
        '<input type="date" id="mra-custom-end" value="' + esc(state.customEnd || '') + '" style="padding:5px 8px;border:1px solid var(--md-border);border-radius:6px;background:var(--md-bg);color:var(--md-text-primary);font-family:inherit;font-size:11px">' +
        '<button data-mra-custom-apply="1" style="padding:5px 12px;border:0;border-radius:6px;background:#7c3aed;color:#fff;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800">🔄 โหลด</button>' +
        '</div>';
    }
    return pills;
  }

  function kpiStrip(k) {
    if (!k) return '';
    var items = [{
        label: 'จำหน่ายทั้งหมด',
        value: fmt(k.total),
        sub: state.days + ' วันย้อนหลัง',
        color: '#7c3aed'
      },
      {
        label: 'สมบูรณ์ 100%',
        value: fmt(k.complete) + ' (' + fmtPct(k.complete_pct) + ')',
        sub: 'ผ่านครบ 4 ตัวชี้วัด',
        color: gradeColor(k.complete_pct)
      },
      {
        label: 'คะแนนเฉลี่ย',
        value: fmtPct(k.avg_score),
        sub: 'จาก 100',
        color: gradeColor(k.avg_score)
      },
      {
        label: 'แพทย์เซ็นสรุปแล้ว',
        value: fmt(k.doc_confirmed) + ' (' + fmtPct(k.doc_confirmed_pct) + ')',
        sub: 'confirm_final_summary',
        color: gradeColor(k.doc_confirmed_pct)
      },
      {
        label: 'ตรวจสอบโดย MR แล้ว',
        value: fmt(k.hosxp_audited) + ' (' + fmtPct(k.audited_pct) + ')',
        sub: 'confirm_audit_summary',
        color: gradeColor(k.audited_pct)
      },
      {
        label: 'ลง Code แล้ว',
        value: fmt(k.coding_done) + ' (' + fmtPct(k.coding_pct) + ')',
        sub: 'confirm_coding_summary',
        color: gradeColor(k.coding_pct)
      },
    ];
    return '<div class="mra-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));margin-bottom:14px">' +
      items.map(function(it) {
        return '<div class="mra-card" style="border-left:4px solid ' + it.color + '">' +
          '<div class="mra-card-h" style="color:' + it.color + '">' + esc(it.label) + '</div>' +
          '<div class="mra-kpi-num">' + it.value + '</div>' +
          '<div class="mra-kpi-sub">' + esc(it.sub) + '</div>' +
          '</div>';
      }).join('') +
      '</div>';
  }

  function monthlyTrend(rows) {
    if (!Array.isArray(rows) || rows.length === 0) {
      return '<div class="mra-card" style="margin-bottom:14px"><div class="mra-card-h">📈 แนวโน้มความสมบูรณ์รายเดือน</div><div style="font-size:12px;color:var(--md-text-tertiary)">— ไม่มีข้อมูลในช่วงนี้ —</div></div>';
    }
    var W = 760,
      H = 180,
      pad = {
        t: 20,
        r: 20,
        b: 30,
        l: 36
      };
    var xs = rows.length;
    var stepX = (W - pad.l - pad.r) / Math.max(1, xs - 1);

    // Two series: complete_pct (purple) + avg_score (cyan)
    function pointsFor(key) {
      return rows.map(function(r, i) {
        var x = pad.l + i * stepX;
        var pct = Number(r[key]) || 0;
        var y = pad.t + (1 - pct / 100) * (H - pad.t - pad.b);
        return {
          x: x,
          y: y,
          val: pct,
          label: thaiMonth(r.ym),
          total: r.total
        };
      });
    }
    var ptsComplete = pointsFor('complete_pct');
    var ptsAvg = pointsFor('avg_score');

    function polyline(pts, color) {
      var d = pts.map(function(p, i) {
        return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1);
      }).join(' ');
      return '<path d="' + d + '" stroke="' + color + '" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>';
    }

    function dots(pts, color) {
      return pts.map(function(p) {
        return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="3" fill="' + color + '"/>' +
          '<title>' + esc(p.label) + ': ' + p.val.toFixed(1) + '%  (n=' + p.total + ')</title>';
      }).join('');
    }

    function xLabels(pts) {
      return pts.map(function(p) {
        return '<text x="' + p.x.toFixed(1) + '" y="' + (H - 8) + '" fill="var(--md-text-tertiary)" font-size="10" text-anchor="middle">' + esc(p.label) + '</text>';
      }).join('');
    }
    var yLabels = [0, 25, 50, 75, 100].map(function(v) {
      var y = pad.t + (1 - v / 100) * (H - pad.t - pad.b);
      return '<text x="' + (pad.l - 6) + '" y="' + (y + 3) + '" fill="var(--md-text-tertiary)" font-size="10" text-anchor="end">' + v + '%</text>' +
        '<line x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' + y + '" y2="' + y + '" stroke="var(--md-border)" stroke-width="0.5" stroke-dasharray="2,3"/>';
    }).join('');

    return '<div class="mra-card" style="margin-bottom:14px">' +
      '<div class="mra-card-h">📈 แนวโน้มความสมบูรณ์รายเดือน · ' + rows.length + ' เดือน' +
      '<span style="margin-left:auto;display:flex;gap:14px;font-weight:600;text-transform:none;letter-spacing:0;color:var(--md-text-secondary)">' +
      '<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:10px;height:3px;background:#7c3aed;border-radius:2px"></span>สมบูรณ์ 100%</span>' +
      '<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:10px;height:3px;background:#06b6d4;border-radius:2px"></span>คะแนนเฉลี่ย</span>' +
      '</span>' +
      '</div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block">' +
      yLabels +
      polyline(ptsAvg, '#06b6d4') + dots(ptsAvg, '#06b6d4') +
      polyline(ptsComplete, '#7c3aed') + dots(ptsComplete, '#7c3aed') +
      xLabels(ptsComplete) +
      '</svg>' +
      '</div>';
  }

  function defectBreakdown(db, total_defects, total_records) {
    if (!db) return '';
    var c = db.content || {},
      f = db.format || {};
    var rows = [{
        cat: 'Content',
        label: '❌ ไม่มี Primary Diagnosis (PDX)',
        n: c.pdx_missing || 0,
        color: '#dc2626'
      },
      {
        cat: 'Content',
        label: '❌ ไม่มี Discharge Summary',
        n: c.dch_summary_missing || 0,
        color: '#ea580c'
      },
      {
        cat: 'Content',
        label: '❌ ไม่มี Discharge Planning',
        n: c.dch_plan_missing || 0,
        color: '#d97706'
      },
      {
        cat: 'Format',
        label: '⚠️ Nurse Notes ครอบคลุมไม่ครบทุกวันนอน',
        n: f.nurse_notes_insufficient || 0,
        color: '#0891b2'
      },
    ];
    var max = Math.max.apply(null, rows.map(function(r) {
      return r.n;
    }).concat([1]));

    function row(r) {
      var pctOfTotal = total_records > 0 ? (r.n / total_records * 100) : 0;
      var w = max > 0 ? (r.n / max * 100) : 0;
      return '<div style="display:grid;grid-template-columns:90px 1fr 110px 70px;gap:10px;align-items:center;padding:6px 0">' +
        '<span class="mra-pill" style="background:' + r.color + '20;color:' + r.color + ';text-align:center">' + r.cat + '</span>' +
        '<span style="font-size:12px;font-weight:600;color:var(--md-text-primary)">' + esc(r.label) + '</span>' +
        '<div class="mra-bar"><div class="mra-bar-fill" style="width:' + w.toFixed(1) + '%;background:' + r.color + '"></div></div>' +
        '<span style="text-align:right;font-size:12px;font-weight:800;color:' + r.color + '">' + fmt(r.n) + ' <span style="color:var(--md-text-tertiary);font-weight:600;font-size:10px">(' + pctOfTotal.toFixed(1) + '%)</span></span>' +
        '</div>';
    }

    return '<div class="mra-card" style="margin-bottom:14px">' +
      '<div class="mra-card-h">🔍 การวิเคราะห์ข้อบกพร่อง — Content vs Format <span style="margin-left:auto;font-weight:700;color:var(--md-text-tertiary);text-transform:none">รวม ' + fmt(total_defects) + ' ครั้ง จาก ' + fmt(total_records) + ' รายการ</span></div>' +
      rows.map(row).join('') +
      '</div>';
  }

  function byWardTable(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return '';
    return '<div class="mra-card" style="margin-bottom:14px">' +
      '<div class="mra-card-h">🏥 สรุปรายแผนก (Ward) · ' + rows.length + ' แผนก</div>' +
      '<table class="mra-tbl"><thead><tr>' +
      '<th>แผนก</th>' +
      '<th style="text-align:right">จำนวน</th>' +
      '<th style="text-align:right">สมบูรณ์ 100%</th>' +
      '<th style="text-align:right">คะแนนเฉลี่ย</th>' +
      '<th style="text-align:right">PDX</th>' +
      '<th style="text-align:right">Sum</th>' +
      '<th style="text-align:right">Nurse</th>' +
      '<th style="text-align:right">Plan</th>' +
      '</tr></thead><tbody>' +
      rows.map(function(w) {
        var c = gradeColor(w.complete_pct);
        var s = gradeColor(w.avg_score);
        return '<tr>' +
          '<td><strong>' + esc(w.ward_name) + '</strong> <span style="color:var(--md-text-tertiary);font-size:10px">(' + esc(w.ward) + ')</span></td>' +
          '<td style="text-align:right">' + fmt(w.total) + '</td>' +
          '<td style="text-align:right;font-weight:800;color:' + c + '">' + fmt(w.complete) + ' <span style="font-size:10px;color:var(--md-text-tertiary)">(' + fmtPct(w.complete_pct) + ')</span></td>' +
          '<td style="text-align:right;font-weight:800;color:' + s + '">' + fmtPct(w.avg_score) + '</td>' +
          '<td style="text-align:right">' + fmt(w.defects.pdx) + '</td>' +
          '<td style="text-align:right">' + fmt(w.defects.dch_summary) + '</td>' +
          '<td style="text-align:right">' + fmt(w.defects.nurse_notes) + '</td>' +
          '<td style="text-align:right">' + fmt(w.defects.dch_plan) + '</td>' +
          '</tr>';
      }).join('') +
      '</tbody></table>' +
      '<div style="margin-top:8px;font-size:10px;color:var(--md-text-tertiary);font-style:italic">คอลัมน์ข้อบกพร่อง: PDX = ไม่มี Primary Diagnosis · Sum = ไม่มี Discharge Summary · Nurse = Nurse Notes ไม่ครอบคลุม LOS · Plan = ไม่มี Discharge Planning</div>' +
      '</div>';
  }

  function byDoctorTable(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return '';
    return '<div class="mra-card" style="margin-bottom:14px">' +
      '<div class="mra-card-h">🩺 สรุปรายแพทย์ (Discharging Physician) · TOP ' + rows.length + ' (≥ 3 จำหน่าย)</div>' +
      '<table class="mra-tbl"><thead><tr>' +
      '<th>แพทย์</th>' +
      '<th style="text-align:right">จำนวน</th>' +
      '<th style="text-align:right">สมบูรณ์ 100%</th>' +
      '<th style="text-align:right">คะแนนเฉลี่ย</th>' +
      '<th style="text-align:right">PDX</th>' +
      '<th style="text-align:right">Sum</th>' +
      '<th style="text-align:right">Plan</th>' +
      '</tr></thead><tbody>' +
      rows.map(function(d) {
        var c = gradeColor(d.complete_pct);
        var s = gradeColor(d.avg_score);
        return '<tr>' +
          '<td><strong>' + esc(d.name) + '</strong> <span style="color:var(--md-text-tertiary);font-size:10px">(' + esc(d.code) + ')</span></td>' +
          '<td style="text-align:right">' + fmt(d.total) + '</td>' +
          '<td style="text-align:right;font-weight:800;color:' + c + '">' + fmt(d.complete) + ' <span style="font-size:10px;color:var(--md-text-tertiary)">(' + fmtPct(d.complete_pct) + ')</span></td>' +
          '<td style="text-align:right;font-weight:800;color:' + s + '">' + fmtPct(d.avg_score) + '</td>' +
          '<td style="text-align:right">' + fmt(d.defects.pdx) + '</td>' +
          '<td style="text-align:right">' + fmt(d.defects.dch_summary) + '</td>' +
          '<td style="text-align:right">' + fmt(d.defects.dch_plan) + '</td>' +
          '</tr>';
      }).join('') +
      '</tbody></table>' +
      '</div>';
  }

  function recordsTable(rows) {
    if (!Array.isArray(rows) || rows.length === 0) {
      return '<div class="mra-card"><div class="mra-card-h">📋 รายการเวชระเบียนที่ต้องแก้ไข</div><div style="font-size:12px;color:var(--md-text-tertiary)">— ไม่มีรายการที่ความสมบูรณ์ < 75% ใน 30 วันล่าสุด —</div></div>';
    }
    return '<div class="mra-card">' +
      '<div class="mra-card-h">📋 รายการเวชระเบียนที่ต้องแก้ไข · ความสมบูรณ์ < 75% · 30 วันล่าสุด · ' + rows.length + ' รายการ</div>' +
      '<div style="overflow-x:auto;max-height:520px;overflow-y:auto">' +
      '<table class="mra-tbl"><thead style="position:sticky;top:0;background:var(--md-surface);z-index:1"><tr>' +
      '<th>AN</th>' +
      '<th>HN</th>' +
      '<th>ผู้ป่วย</th>' +
      '<th>แผนก</th>' +
      '<th>D/C</th>' +
      '<th style="text-align:right">LOS</th>' +
      '<th style="text-align:right">Score</th>' +
      '<th style="text-align:center">PDX</th>' +
      '<th style="text-align:center">Sum</th>' +
      '<th style="text-align:center">Nurse</th>' +
      '<th style="text-align:center">Plan</th>' +
      '</tr></thead><tbody>' +
      rows.map(function(r) {
        var c = r.completeness || {};
        var s = gradeColor(c.score || 0);

        function flag(v) {
          return v ? '<span style="color:#10b981;font-weight:900">✓</span>' : '<span style="color:#ef4444;font-weight:900">✗</span>';
        }
        return '<tr>' +
          '<td><strong>' + esc(r.an) + '</strong></td>' +
          '<td style="color:var(--md-text-tertiary)">' + esc(r.hn) + '</td>' +
          '<td>' + esc(r.pt_name) + '</td>' +
          '<td><span style="font-size:11px">' + esc(r.ward_name || r.ward) + '</span></td>' +
          '<td>' + esc(r.dchdate || '—') + '</td>' +
          '<td style="text-align:right">' + fmt(r.los_days) + '</td>' +
          '<td style="text-align:right;font-weight:800;color:' + s + '">' + (c.score != null ? c.score + '%' : '—') + '</td>' +
          '<td style="text-align:center">' + flag(c.pdx) + '</td>' +
          '<td style="text-align:center">' + flag(c.dch_summary) + '</td>' +
          '<td style="text-align:center">' + flag(c.nurse_notes) + '</td>' +
          '<td style="text-align:center">' + flag(c.dch_plan) + '</td>' +
          '</tr>';
      }).join('') +
      '</tbody></table></div>' +
      '</div>';
  }

  function loadingShell() {
    return '<div class="mra-card" style="padding:40px 24px;text-align:center;color:var(--md-text-tertiary)">' +
      '<span class="mra-spin" style="color:#7c3aed"></span>' +
      '<span style="margin-left:10px;font-weight:600">กำลังโหลดข้อมูลตรวจสอบเวชระเบียน… (อาจใช้เวลา 5-10 วินาที)</span>' +
      '</div>';
  }

  function errorShell(msg) {
    return '<div class="mra-card" style="padding:24px;border-color:#ef4444;background:rgba(239,68,68,.05)"><div style="color:#ef4444;font-weight:800">⚠️ โหลดข้อมูลล้มเหลว</div><div style="margin-top:6px;font-size:12px;color:var(--md-text-secondary)">' + esc(msg || 'unknown') + '</div></div>';
  }

  // ── Fetching ──
  function refresh() {
    if (!state.el) return;
    if (state.section === 'sany') {
      // Phase 1A: fetch ICD audit สำหรับ type ปัจจุบัน หาก data ยังไม่มี
      var have = state.icdType === 'opd' ? state.icdAuditOpd : state.icdAuditIpd;
      if (!have && !state.icdLoading) fetchIcdAudit(state.icdType);
      // Phase 1B: fetch DQ form สำหรับ type ปัจจุบัน หาก data ยังไม่มี
      var haveDq = state.dqType === 'opd' ? state.dqOpd : state.dqIpd;
      if (!haveDq && !state.dqLoading) fetchDqForm(state.dqType);
      // Phase 1C: fetch Error Symbols สำหรับ type ปัจจุบัน หาก data ยังไม่มี
      var haveEs = state.esType === 'opd' ? state.esOpd : state.esIpd;
      if (!haveEs && !state.esLoading) fetchErrorSymbols(state.esType);
      render();
      return;
    }
    if (state.section === 'sapsach') {
      // Section 2 (สปสช.) — lazy fetch summary
      if (!state.sapsach && !state.sapsachLoading) fetchSapsach();
      render();
      return;
    }
    state.loading = true;
    state.error = null;
    render();

    Promise.all([
      authedFetch('/api/mr-audit/analytics?days=' + state.days, {
        credentials: 'include'
      }).then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error('analytics HTTP ' + r.status));
      }),
      authedFetch('/api/mr-audit/list?days=30&completeness_max=74&limit=200', {
        credentials: 'include'
      }).then(function(r) {
        return r.ok ? r.json() : Promise.reject(new Error('list HTTP ' + r.status));
      }),
    ]).then(function(results) {
      state.analytics = results[0];
      state.records = results[1].rows || [];
      state.loading = false;
      render();
    }).catch(function(err) {
      state.loading = false;
      state.error = err.message || String(err);
      render();
    });
  }

  function render() {
    if (!state.el) return;
    var html = sectionHeader();
    if (state.section === 'sany') {
      // Section 1: สนย. — Phase 1A (ICD Audit) active + 1B/1C placeholders
      html += sanySectionContent();
      if (state.esDetailSymbol) html += esDetailModal();
    } else if (state.section === 'sapsach') {
      // Section 2: สปสช. (Medical Record Audit Guideline 2563) — Phase 2A/2B/2C/2D
      html += sapsachContent();
      if (state.modalAn) html += sapsachModal();
    } else if (state.section === 'sapsach_legacy_unused') {
      // Section 2: สปสช. — เนื้อหา 4 ตัวชี้วัด เดิม (รอ Phase 2A redesign เป็น 12 หัวข้อ)
      if (state.loading && !state.analytics) {
        html += loadingShell();
      } else if (state.error) {
        html += errorShell(state.error);
      } else if (state.analytics) {
        var a = state.analytics;
        html += kpiStrip(a.kpis);
        html += monthlyTrend(a.monthly_trend);
        html += defectBreakdown(a.defect_breakdown, a.total_defects, a.kpis ? a.kpis.total : 0);
        html += '<div class="mra-grid" style="grid-template-columns:1fr 1fr;align-items:start">' +
          byWardTable(a.by_ward) +
          byDoctorTable(a.by_doctor) +
          '</div>';
        html += recordsTable(state.records || []);
        html += '<div style="margin-top:8px;font-size:10px;color:var(--md-text-tertiary);font-style:italic;text-align:right">ที่มา: ' + esc(a.data_source || '') + ' · อัปเดต ' + new Date(a.generated_at || Date.now()).toLocaleString('th-TH') + '</div>';
      }
    }
    state.el.innerHTML = html;

    // wire period selector pills
    var periodBtns = state.el.querySelectorAll('[data-mra-period]');
    for (var i = 0; i < periodBtns.length; i++) {
      (function(btn) {
        btn.onclick = function() {
          var m = btn.getAttribute('data-mra-period');
          if (m && m !== state.periodMode) {
            state.periodMode = m;
            if (m !== 'custom') {
              applyPeriodChange();
            } else {
              // Just re-render to show date pickers; user must click "โหลด"
              render();
            }
          }
        };
      })(periodBtns[i]);
    }
    // wire custom-date apply button
    var applyBtn = state.el.querySelector('[data-mra-custom-apply]');
    if (applyBtn) applyBtn.onclick = function() {
      var s = state.el.querySelector('#mra-custom-start');
      var e = state.el.querySelector('#mra-custom-end');
      if (!s || !e || !s.value || !e.value) {
        alert('กรุณาเลือกวันที่เริ่มและสิ้นสุด');
        return;
      }
      if (s.value > e.value) {
        alert('วันที่เริ่มต้องไม่หลังวันที่สิ้นสุด');
        return;
      }
      state.customStart = s.value;
      state.customEnd = e.value;
      applyPeriodChange();
    };

    // wire sub-tab selector
    var sectionBtns = state.el.querySelectorAll('[data-mra-section]');
    for (var j = 0; j < sectionBtns.length; j++) {
      (function(btn) {
        btn.onclick = function() {
          var s = btn.getAttribute('data-mra-section');
          if (s && s !== state.section) {
            state.section = s;
            if (s === 'sany') {
              // Lazy fetch ICD + DQ + ES if not loaded
              var have = state.icdType === 'opd' ? state.icdAuditOpd : state.icdAuditIpd;
              if (!have && !state.icdLoading) fetchIcdAudit(state.icdType);
              var haveDq = state.dqType === 'opd' ? state.dqOpd : state.dqIpd;
              if (!haveDq && !state.dqLoading) fetchDqForm(state.dqType);
              var haveEs = state.esType === 'opd' ? state.esOpd : state.esIpd;
              if (!haveEs && !state.esLoading) fetchErrorSymbols(state.esType);
            } else if (s === 'sapsach') {
              if (!state.sapsach && !state.sapsachLoading) fetchSapsach();
            }
            render();
          }
        };
      })(sectionBtns[j]);
    }

    // wire ICD type toggle (IPD/OPD)
    var icdTypeBtns = state.el.querySelectorAll('[data-mra-icd-type]');
    for (var k = 0; k < icdTypeBtns.length; k++) {
      (function(btn) {
        btn.onclick = function() {
          var t = btn.getAttribute('data-mra-icd-type');
          if (t && t !== state.icdType) {
            state.icdType = t;
            var have = t === 'opd' ? state.icdAuditOpd : state.icdAuditIpd;
            if (!have) fetchIcdAudit(t);
            else render();
          }
        };
      })(icdTypeBtns[k]);
    }

    // wire DQ form type toggle (IPD/OPD)
    var dqTypeBtns = state.el.querySelectorAll('[data-mra-dq-type]');
    for (var kdq = 0; kdq < dqTypeBtns.length; kdq++) {
      (function(btn) {
        btn.onclick = function() {
          var t = btn.getAttribute('data-mra-dq-type');
          if (t && t !== state.dqType) {
            state.dqType = t;
            var have = t === 'opd' ? state.dqOpd : state.dqIpd;
            if (!have) fetchDqForm(t);
            else render();
          }
        };
      })(dqTypeBtns[kdq]);
    }

    // wire ES (Error Symbols) type toggle (IPD/OPD)
    var esTypeBtns = state.el.querySelectorAll('[data-mra-es-type]');
    for (var kes = 0; kes < esTypeBtns.length; kes++) {
      (function(btn) {
        btn.onclick = function() {
          var t = btn.getAttribute('data-mra-es-type');
          if (t && t !== state.esType) {
            state.esType = t;
            var have = t === 'opd' ? state.esOpd : state.esIpd;
            if (!have) fetchErrorSymbols(t);
            else render();
          }
        };
      })(esTypeBtns[kes]);
    }

    // wire symbol card clicks → open detail modal
    var esCardBtns = state.el.querySelectorAll('[data-mra-es-card]');
    for (var ecb = 0; ecb < esCardBtns.length; ecb++) {
      (function(btn) {
        btn.onclick = function() {
          var sym = btn.getAttribute('data-mra-es-card');
          if (sym) fetchErrorSymbolDetail(sym);
        };
      })(esCardBtns[ecb]);
    }

    // wire ES modal close
    var esModalCloseBtns = state.el.querySelectorAll('[data-mra-es-modal-close]');
    for (var emc = 0; emc < esModalCloseBtns.length; emc++) {
      (function(btn) {
        btn.onclick = function() {
          state.esDetailSymbol = null;
          state.esDetailData = null;
          state.esDetailError = null;
          render();
        };
      })(esModalCloseBtns[emc]);
    }

    // (period change invalidation handled by applyPeriodChange())

    // wire AN audit buttons (Section 2 — open modal)
    var auditBtns = state.el.querySelectorAll('[data-mra-audit-an]');
    for (var ai = 0; ai < auditBtns.length; ai++) {
      (function(btn) {
        btn.onclick = function() {
          var an = btn.getAttribute('data-mra-audit-an');
          if (an) fetchSapsachDetail(an);
        };
      })(auditBtns[ai]);
    }

    // wire modal close
    var closeBtns = state.el.querySelectorAll('[data-mra-modal-close]');
    for (var ci = 0; ci < closeBtns.length; ci++) {
      (function(btn) {
        btn.onclick = function() {
          state.modalAn = null;
          state.modalDetail = null;
          state.modalError = null;
          state.modalDirty = false;
          // Refresh summary list so newly-audited AN gets green badge
          fetchSapsach();
        };
      })(closeBtns[ci]);
    }

    // wire cell buttons (set score for criterion)
    var cellBtns = state.el.querySelectorAll('[data-mra-cell]');
    for (var cbi = 0; cbi < cellBtns.length; cbi++) {
      (function(btn) {
        btn.onclick = function() {
          var key = btn.getAttribute('data-mra-cell'); // FORMAT: SECCODE_idx_v
          if (!state.modalDetail) return;
          var parts = key.split('_');
          var v = parts[parts.length - 1];
          var idx = parseInt(parts[parts.length - 2]);
          var code = parts.slice(0, parts.length - 2).join('_');
          var newScore = v === '1' ? 1 : v === '0' ? 0 : null;
          var grid = state.modalDetail.manualAudit.grid[code];
          if (grid && grid[idx]) {
            grid[idx].score = newScore;
            state.modalDirty = true;
            render();
          }
        };
      })(cellBtns[cbi]);
    }

    // wire save scores
    var saveBtn = state.el.querySelector('[data-mra-save-scores]');
    if (saveBtn) saveBtn.onclick = function() {
      saveSapsachScores();
    };

    // wire AI Pre-fill batch (Phase 2A panel)
    var prefillBatchBtn = state.el.querySelector('[data-mra-prefill-batch]');
    if (prefillBatchBtn) prefillBatchBtn.onclick = function() {
      prefillBatch();
    };

    // wire AI Pre-fill single (modal header)
    var prefillSingleBtn = state.el.querySelector('[data-mra-prefill-single]');
    if (prefillSingleBtn) prefillSingleBtn.onclick = function() {
      if (state.modalAn) prefillSingleAn(state.modalAn);
    };

    // wire overall finding
    var overallBtns = state.el.querySelectorAll('[data-mra-overall]');
    for (var oi = 0; oi < overallBtns.length; oi++) {
      (function(btn) {
        btn.onclick = function() {
          var v = btn.getAttribute('data-mra-overall');
          saveSapsachOverall(v, null);
        };
      })(overallBtns[oi]);
    }
  }

  // ── Public mount/unmount API used by React shim ──
  window.__mraMount = function(el) {
    injectStyle();
    state.el = el;
    // Initialize period if not yet computed
    if (!state.period) state.period = _computePeriod(state.periodMode, state.customStart, state.customEnd);
    state.days = state.period.days;
    refresh();
    if (state.timer) clearInterval(state.timer);
    state.timer = setInterval(refresh, 2 * 60 * 1000); // 2 min auto-refresh
  };

  window.__mraUnmount = function() {
    state.el = null;
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  };

  // ── Self-mount via MutationObserver (replaces deprecated overlay-MRA01) ──
  // Finds the MRA tab DOM via signature text "MEDICAL RECORD AUDIT", hides
  // the React placeholder, and mounts the new UI inside a wrap element.
  function findSignatureEl() {
    // MRAuditTab-MRAUD003 renders the exact phrase "Medical Record Audit (MRA)"
    // — the sidebar tab label is "MRA — Medical Record Audit" (no parens),
    // so this strict regex distinguishes the two.
    // Also require the element to be visible (offsetParent !== null) so we
    // skip cached/hidden DOM nodes (e.g., closed drawer items).
    var all = document.querySelectorAll('div, h1, h2, h3, span');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var t = (el.textContent || '').trim();
      if (t.length > 200) continue;
      if (!/Medical Record Audit \(MRA\)/i.test(t)) continue;
      if (el.offsetParent === null) continue; // not visible
      return el;
    }
    return null;
  }

  function findTabContainer(sigEl) {
    var el = sigEl;
    var main = document.querySelector('main');
    while (el && el !== main && el !== document.body) {
      if (el.parentElement === main) return el;
      el = el.parentElement;
    }
    el = sigEl;
    while (el && el.children && el.children.length < 3) el = el.parentElement;
    return el || sigEl;
  }

  function applySelfMount() {
    var sigEl = findSignatureEl();
    if (!sigEl) return false;
    var container = findTabContainer(sigEl);
    if (!container) return false;
    if (container.dataset.mraMounted === '1' && container.querySelector('.mra-self-wrap')) return true;

    // Hide existing children
    for (var i = 0; i < container.children.length; i++) {
      var c = container.children[i];
      if (c.classList && c.classList.contains('mra-self-wrap')) continue;
      if (c.classList && c.classList.contains('mra-overlay-wrap')) {
        c.remove(); // remove old overlay-MRA01 artifacts
        continue;
      }
      c.style.display = 'none';
    }

    var wrap = container.querySelector('.mra-self-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'mra-self-wrap';
      container.appendChild(wrap);
    }
    container.dataset.mraMounted = '1';
    window.__mraMount(wrap);
    return true;
  }

  var selfMountTimer = null;

  function scheduleSelfMount() {
    if (selfMountTimer) return;
    selfMountTimer = setTimeout(function() {
      selfMountTimer = null;
      try {
        applySelfMount();
      } catch (e) {
        /* silent */ }
    }, 120);
  }

  function bootSelfMount() {
    var root = document.getElementById('root');
    if (!root) {
      setTimeout(bootSelfMount, 200);
      return;
    }
    scheduleSelfMount();
    new MutationObserver(scheduleSelfMount).observe(root, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSelfMount);
  } else {
    bootSelfMount();
  }
})();