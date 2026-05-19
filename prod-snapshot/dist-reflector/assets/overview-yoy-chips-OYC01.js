/*!
 * BCH 360° — Overview "3 ปีงบประมาณ" YoY Chips Decorator
 * v01 — adds %-change chips vs prior FY to each card
 * Past FY: full-year vs full-year   ·   Current FY: YTD-prorated vs same window prior FY
 * Injected via dist/index.html — runs outside React, attaches via DOM observer
 */
(function() {
  'use strict';

  if (window.__oycMounted) return;
  window.__oycMounted = true;

  var STYLE = '.oyc-chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}.oyc-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;font-size:10px;font-weight:800;font-variant-numeric:tabular-nums;border:1px solid;line-height:1.2}.oyc-chip-sub{font-weight:600;font-size:9px;opacity:.8}.oyc-inline-pct{display:inline-block;margin-left:6px;font-size:10px;font-weight:700;font-variant-numeric:tabular-nums}';

  function injectStyle() {
    if (document.getElementById('oyc-style')) return;
    var s = document.createElement('style');
    s.id = 'oyc-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  var cache = null;
  var cacheTime = 0;

  function fetchExec() {
    if (cache && (Date.now() - cacheTime < 60000)) return Promise.resolve(cache);
    return fetch('/api/overview/executive', {
        credentials: 'include'
      })
      .then(function(r) {
        return r.ok ? r.json() : null;
      })
      .then(function(j) {
        if (j) {
          cache = j;
          cacheTime = Date.now();
        }
        return cache;
      })
      .catch(function() {
        return cache;
      });
  }

  function fmtPct(n) {
    if (!isFinite(n)) return '—';
    var sign = n > 0 ? '+' : '';
    return sign + n.toFixed(1) + '%';
  }

  function pctColor(n) {
    if (!isFinite(n)) return '#94a3b8';
    if (n >= 5) return '#10b981'; // strong up
    if (n >= 0) return '#22c55e'; // mild up
    if (n >= -5) return '#f59e0b'; // mild down
    return '#ef4444'; // strong down
  }

  function chipHTML(pct, primary, sub) {
    var color = pctColor(pct);
    var arrow = pct >= 0 ? '▲' : '▼';
    return '<span class="oyc-chip" style="background:' + color + '15;border-color:' + color + '40;color:' + color + '">' +
      '<span>' + arrow + ' ' + fmtPct(pct) + '</span>' +
      (primary ? '<span class="oyc-chip-sub">' + primary + '</span>' : '') +
      (sub ? '<span class="oyc-chip-sub" style="opacity:.6">· ' + sub + '</span>' : '') +
      '</span>';
  }

  function inlinePct(n) {
    if (!isFinite(n) || n === 0) return '';
    var color = pctColor(n);
    var sign = n > 0 ? '+' : '';
    return '<span class="oyc-inline-pct" style="color:' + color + '">(' + sign + n.toFixed(1) + '%)</span>';
  }

  function findFYCards() {
    var all = document.querySelectorAll('div');
    var cards = [];
    for (var i = 0; i < all.length; i++) {
      var c = all[i];
      var t = c.textContent || '';
      // Card signature: short text, "ปีงบ NNNN", "บาท", and all three breakdown labels
      if (t.length < 400 &&
        /ปีงบ\s+\d{4}/.test(t) &&
        t.indexOf('บาท') !== -1 &&
        t.indexOf('OPD:') !== -1 &&
        t.indexOf('IPD:') !== -1 &&
        t.indexOf('Visits:') !== -1) {
        cards.push(c);
      }
    }
    // Filter to leaf-most matches (the actual card divs, not wrappers)
    return cards.filter(function(c) {
      return !cards.some(function(other) {
        return other !== c && c.contains(other);
      });
    });
  }

  function decorate() {
    if (!cache || !cache.revenue_3fy || !cache.fiscal_years) return;

    var fy3 = cache.revenue_3fy;
    var fyMeta = cache.fiscal_years;
    var currentBe = cache.current_fy;
    var timestamp = new Date(cache.timestamp || Date.now());

    var cards = findFYCards();
    if (cards.length === 0) return;

    cards.forEach(function(card) {
      var beMatch = (card.textContent || '').match(/ปีงบ\s+(\d{4})/);
      if (!beMatch) return;
      var be = parseInt(beMatch[1], 10);

      // Already decorated AND chip still attached?
      var existing = card.querySelector('.oyc-chips');
      if (existing) return;

      var idx = fy3.findIndex(function(f) {
        return f.be === be;
      });
      if (idx < 1) return; // first FY → no prior to compare

      var curr = fy3[idx];
      var prev = fy3[idx - 1];
      if (!curr || !prev) return;

      var isCurrent = (be === currentBe);
      var totalPct, ytdNote = '';
      var opdPct, ipdPct, visPct;

      if (isCurrent) {
        // Prorate prior FY to elapsed days of current FY
        var fyEntry = fyMeta.find(function(f) {
          return f.be === be;
        });
        var fyStart = fyEntry ? new Date(fyEntry.start) : null;
        var daysEl = fyStart ? Math.max(1, Math.floor((timestamp - fyStart) / 86400000)) : 1;
        var totalDays = 365;
        var prorate = function(v) {
          return v * daysEl / totalDays;
        };

        totalPct = ((curr.total_income - prorate(prev.total_income)) / prorate(prev.total_income)) * 100;
        opdPct = prev.opd_income ? ((curr.opd_income - prorate(prev.opd_income)) / prorate(prev.opd_income)) * 100 : NaN;
        ipdPct = prev.ipd_income ? ((curr.ipd_income - prorate(prev.ipd_income)) / prorate(prev.ipd_income)) * 100 : NaN;
        visPct = prev.opd_visits ? ((curr.opd_visits - prorate(prev.opd_visits)) / prorate(prev.opd_visits)) * 100 : NaN;
        ytdNote = 'ช่วงเดียวกัน · ' + daysEl + '/' + totalDays + ' วัน';
      } else {
        totalPct = ((curr.total_income - prev.total_income) / prev.total_income) * 100;
        opdPct = prev.opd_income ? ((curr.opd_income - prev.opd_income) / prev.opd_income) * 100 : NaN;
        ipdPct = prev.ipd_income ? ((curr.ipd_income - prev.ipd_income) / prev.ipd_income) * 100 : NaN;
        visPct = prev.opd_visits ? ((curr.opd_visits - prev.opd_visits) / prev.opd_visits) * 100 : NaN;
      }

      // Build YoY chip block
      var wrap = document.createElement('div');
      wrap.className = 'oyc-chips';
      wrap.setAttribute('data-oyc-be', String(be));
      wrap.innerHTML = chipHTML(totalPct, 'รวม', 'เทียบ ปีงบ ' + prev.be + (isCurrent ? ' (' + ytdNote + ')' : ''));
      card.appendChild(wrap);

      // Add inline % to each of OPD/IPD/Visits lines (find spans by text)
      var spans = card.querySelectorAll('span');
      for (var i = 0; i < spans.length; i++) {
        var sp = spans[i];
        var st = (sp.textContent || '').trim();
        if (sp.querySelector('.oyc-inline-pct')) continue;
        if (/^OPD:/.test(st)) {
          sp.insertAdjacentHTML('beforeend', inlinePct(opdPct));
        } else if (/^IPD:/.test(st)) {
          sp.insertAdjacentHTML('beforeend', inlinePct(ipdPct));
        } else if (/^Visits:/.test(st)) {
          sp.insertAdjacentHTML('beforeend', inlinePct(visPct));
        }
      }
    });
  }

  // Debounce: React often triggers many mutations in a burst; one decorate run is enough
  var schedTimer = null;

  function scheduleDecorate() {
    if (schedTimer) return;
    schedTimer = setTimeout(function() {
      schedTimer = null;
      try {
        decorate();
      } catch (e) {
        /* silent */ }
    }, 120);
  }

  function startObserver() {
    var root = document.getElementById('root');
    if (!root) return;
    new MutationObserver(scheduleDecorate).observe(root, {
      childList: true,
      subtree: true
    });
  }

  function boot() {
    injectStyle();
    startObserver();
    fetchExec().then(decorate);
    setInterval(function() {
      cache = null;
      fetchExec().then(decorate);
    }, 5 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();