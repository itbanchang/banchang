# Accessibility — WCAG + Thai i18n for BCH 360°

Read this when auditing, reviewing, or implementing accessibility in the dashboard. Hospital staff include older clinicians, staff with mild visual impairment, and people using the app under fluorescent glare on a small screen. Accessibility here is about clinical safety, not a compliance checkbox.

## The non-negotiables

### 1. Keyboard navigation

- Every interactive element is reachable by Tab and operable by Enter / Space.
- Modal open: focus traps inside the modal; Escape closes.
- Modal close: focus returns to the element that opened it.
- Skip-link at the top: "ข้ามไปที่เนื้อหาหลัก" → jumps past the sidebar to the tab content.
- Tab order follows visual order — no `tabIndex > 0` hacks.

Check by:
- Disconnecting the mouse and walking through the app.
- Running `eslint-plugin-jsx-a11y` (`npm run lint`) — flags `div onClick`, missing labels, etc.

### 2. Focus visibility

- Every focusable element has a visible focus ring with ≥ 3:1 contrast against its background.
- Default Tailwind `focus:ring-2 focus:ring-primary-500 focus:ring-offset-2` is the baseline; don't `outline-none` without a replacement.
- Cards and big surfaces that are clickable need a focus ring (usually on the outer element).

### 3. Color contrast

- Body text: ≥ 4.5:1 against its background.
- Large text (≥ 18px or bold ≥ 14px): ≥ 3:1.
- UI components + graphical objects (icons that convey info, chart lines): ≥ 3:1.

Common traps in this codebase:

- `text-slate-400 dark:text-slate-500` on `bg-white dark:bg-slate-900` — borderline. Use `text-slate-600 dark:text-slate-300` for body, `text-slate-900 dark:text-slate-100` for headings.
- Amber-on-white for warning badges is often weak — pair with bold weight + icon.
- Status color on chart lines — if two series are distinguished only by color, also vary stroke pattern (`strokeDasharray`).

### 4. Color is never the only signal

Every status color must pair with:
- An icon (⚠️ 🚨 ✅ 📌 🛑).
- A label ("Critical", "Warning", "OK").
- Ideally both.

A colorblind user sees `red NEWS2 score` and `green NEWS2 score` the same way. They must also see the icon (⚠️) and the text ("Critical").

### 5. Motion and animation

- Respect `prefers-reduced-motion`. Wrap animations:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in, .animate-slide-up, .animate-slide-right, .animate-pulse-soft {
      animation: none;
    }
    * { transition-duration: 0.01ms !important; }
  }
  ```

- Never auto-play video. Never auto-scroll. Never auto-refresh the whole page.
- `animate-pulse-soft` on live indicators is OK at 2s — fast pulsing triggers motion sickness and can cause seizures.

### 6. Text sizing

- Minimum body size: 14px. Thai script at 12px becomes unreadable because tone marks overlap.
- Headings: 18–32px. Never body-sized headings.
- The UI must scale to 200% zoom without horizontal scroll (except on tables, which can scroll horizontally).
- Line-height ≥ 1.5 for Thai prose — required so tone marks (◌่ ◌้ ◌๊ ◌๋) and vowels (◌ิ ◌ี ◌ุ ◌ู) don't clip the line above/below.

### 7. Form inputs

- Every input has a real `<label>` or `aria-label`.
- Required fields marked with `*` AND `aria-required="true"`.
- Validation errors announced to screen readers via `aria-invalid` + `aria-describedby` linking to the error message.
- Error messages in Thai, specific ("กรุณากรอกเลขประชาชน 13 หลัก" not "ข้อมูลไม่ถูกต้อง").

### 8. Images and icons

- Decorative icons: `aria-hidden="true"`.
- Informative icons: `<img alt="…">` or `<span aria-label="…" role="img">`.
- Emoji used as a status indicator: pair with text for screen readers. `<span aria-label="โรงพยาบาล">🏥</span>` if the emoji conveys meaning; `aria-hidden` if it's decorative.

### 9. Links vs buttons

- Something that navigates → `<a href>` or the router equivalent.
- Something that triggers an action → `<button>`.
- Never `<div onClick>`. Screen readers and keyboards ignore divs.

### 10. ARIA — sparingly, correctly

- Don't add ARIA if the native HTML already conveys the semantics.
- `role="status"` for live regions (alert banners, data freshness).
- `role="alert"` for urgent messages that should interrupt (sepsis flag).
- `aria-live="polite"` for non-urgent updates (KPI ticking over).
- Don't overuse `aria-label` — it overrides the visible text and can confuse.

## Thai-specific accessibility

### Language tag

Set `<html lang="th">`. This tells screen readers to use Thai pronunciation and Thai-aware text segmentation.

For English-mixed content, wrap with `lang`:

```html
<p>คะแนน <span lang="en">NEWS2</span> = 7 (Critical)</p>
```

Without this, screen readers may read `NEWS2` letter-by-letter in Thai phonetics, which is gibberish.

### Thai typography

- **Font**: Noto Sans Thai + Inter. This combo renders both scripts at matched x-height, which is important for mixed Thai-English numbers.
- **Line-height**: ≥ 1.5 (see above). 1.6 is safer for prose.
- **Character spacing**: default is fine. Don't tighten `letter-spacing` on Thai — you'll break tone-mark positioning.
- **Bold**: Thai bold at small sizes becomes blobby. If a bold ≥ 14px looks muddy, drop to semibold (600) + increase size.

### Date/number formatting

Always locale-aware:

```js
Intl.NumberFormat('th-TH').format(1234567);                  // "1,234,567" (Thai-styled commas)
Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1234567); // "฿1,234,567.00"
Intl.DateTimeFormat('th-TH', { dateStyle: 'long' }).format(new Date());   // "23 เมษายน 2569"
```

For B.E. year specifically: `new Date().getFullYear() + 543`. Combine with the Intl formatter for full B.E. dates when the user context (revenue, fiscal) expects it.

### Input methods

Thai typists use keyboards with Thai layout. Some common issues:

- Don't force English-only input on fields like name, address — trust the system IME.
- For national ID (`cid`) fields, explicitly set `inputMode="numeric"` and `pattern="[0-9]{13}"` — don't rely on users switching IME.
- For search fields, allow both Thai and English queries (client-side lowercase both).

## WCAG level targeted

The project targets **WCAG 2.1 Level AA** as a baseline. Level AAA for contrast on critical alerts (sepsis, NEWS2 ≥ 7).

## Testing checklist for any PR

- [ ] `npm run lint` passes (jsx-a11y rules).
- [ ] Tab through the new surface — every interactive reachable.
- [ ] Open in a screen reader (NVDA on Windows, VoiceOver on Mac). Navigate one full task.
- [ ] Zoom to 200% — no broken layouts, no horizontal scroll except tables.
- [ ] Toggle dark mode — contrast holds.
- [ ] Test with `prefers-reduced-motion: reduce` — nothing animates in a distracting way.
- [ ] Remove color from the page (browser grayscale mode) — can you still read every status?

## Useful dev tools

- **axe DevTools** (browser extension) — catches ~30% of issues automatically.
- **Lighthouse Accessibility** (built into Chrome DevTools) — good for baseline audits.
- **WAVE** (WebAIM browser extension) — visualizes landmark + alt issues.
- **Windows Narrator / VoiceOver** — actual screen readers, closest to real user experience.

Don't treat automated tools as a pass/fail — they catch about a third of problems. The rest needs manual keyboard + screen reader testing.

## Common real-world issues in this codebase to watch for

Based on a quick pass through OPD/NCD/MedRec tabs:

- Some KPI cards use `<div onClick>` for drill-down. Migrate to `<button>` or add `role="button" tabIndex={0}` + `onKeyDown` for Enter/Space.
- A few charts have no `<title>` or `aria-label` — screen readers announce the chart as an unidentified image. Add `<div role="img" aria-label="กราฟ OPD รายชั่วโมง">` around the chart container.
- `AlertBanner` sometimes uses color alone — confirm the banner text includes the severity word ("สำคัญ", "เตือน").
- Form errors in `LoginForm` use red text without icon or aria-invalid — upgrade to match the `aria-describedby` pattern.
- Dark-mode contrast on some `text-slate-400` tails below 4.5:1 — bump to `text-slate-300`.

Any of these can be fixed in a single small PR and the lint rules will catch recurrence.
