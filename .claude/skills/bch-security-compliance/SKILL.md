---
name: bch-security-compliance
description: Security / PDPA / HIPAA-equivalent / audit-trail authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about authentication, authorization, RBAC, JWT, session management, PDPA compliance, patient data handling, audit logs, data erasure / right-to-be-forgotten, threat modeling, pen-testing, secret rotation, SQL injection, XSS, CSRF, secrets management, credential hardening, incident response, or "is this secure?". Triggers on security, secure, PDPA, HIPAA, GDPR, auth, authentication, authorization, RBAC, role, permission, JWT, session, token, SQL injection, XSS, CSRF, audit, PII, patient data, secret, rotate, threat model, pen test, vulnerability, CVE. Complements `bch-360-expert/references/performance-auditor.md` (security checklist) and `bch-data-quality` (audit trail + DQ).
---

# BCH 360° — Security & Compliance

You are the security and compliance authority. A Thai community hospital stores some of the most sensitive data in a person's life: diagnoses, medications, mental health, family history. A leak is a PDPA violation, a lawsuit, and a human harm. Your mandate: keep the product secure by default, auditable by regulators, and resilient against the obvious threats.

Security isn't a chapter at the end — it's an attitude at every commit.

## Threat model — know the adversaries

- **External attackers** on the internet (if the app is exposed): SQL injection, credential stuffing, auth bypass, DDoS.
- **LAN attackers** inside the hospital network: lateral movement from a compromised workstation.
- **Insider threat** — staff browsing records of family members or local celebrities, or exporting data for personal use.
- **Supply chain** — npm packages with malicious updates.
- **Physical** — unattended terminal in a clinic where anyone can walk up.

Each has different mitigations. Design for all four, prioritise by likelihood in your context.

## Authentication — JWT with short-lived access + refresh

Current state (from codebase):
- JWT access token (short TTL) + refresh token.
- `server/middleware/auth.js` — validates access.
- `src/hooks/useAuth.js` — silent refresh.

Harden:

### JWT best practices

- **Secret**: 32+ byte random (already done via `node crypto.randomBytes(32)` — see `.env` generation).
- **Separate secrets** for access vs refresh — done.
- **Algorithm**: HS256 is fine for single-secret deployment. Do NOT accept `alg: none`.
- **Expiration**: access 15 min (stricter: 5 min); refresh 7 days (stricter: 24 hours).
- **Refresh rotation**: issue a NEW refresh token on every refresh, invalidate the old one. This turns refresh into one-time-use (a.k.a. "refresh token rotation") and detects token replay.
- **Refresh storage**: httpOnly cookie, Secure, SameSite=Strict. Not localStorage.
- **Access storage**: in-memory (JS variable). Lost on page reload; refresh fetches new one. Never localStorage (XSS risk).

### Brute force protection

`express-rate-limit` on `/api/auth/login`:
- 5 attempts per IP per 15 min.
- 10 attempts per username per 15 min.
- Exponential backoff after breaches.

Log all login failures (username, IP, time); alert on patterns.

### Password policy

- Minimum 12 characters.
- bcrypt cost 12+.
- No reuse across accounts (check on setup).
- Rotate every 180 days for admins.

Integrate with hospital AD/LDAP if possible — avoid password management.

## Authorization — RBAC with explicit deny

Current state:
- `authorize(['role', ...])` middleware.
- Roles include: `admin`, `finance`, `clinical`, `opd`, `ipd`, `er`, `dental`, `thaimed`, `phystherapy`, `ncd`, `medrec`, `xray`, `pharmacy`, `lab`, `quality`, `ai`, etc.

Harden:

### Role design matrix

Document which role can access which tab/endpoint. A spreadsheet or markdown table in `docs/rbac.md`:

```
Tab           | admin | director | finance | clinical | nurse | ... 
Dashboard     |   R   |    R     |    R    |    R     |   R   |  
Finance       |   R   |    R     |    R    |          |       |
Executive     |   R   |    R     |    R    |          |       |
IPD           |   R   |    R     |    R    |    R     |   R   |
ER            |   R   |          |         |    R     |   R   |
Settings      |  RW   |          |         |          |       |
Audit Log     |  RW   |    R     |         |          |       |
```

Review this every quarter. Permission creep is real.

### Deny by default

Routes without `authorize(…)` should not ship. Audit:

```bash
# Find routes missing authorization
grep -L "authorize" server/routes/*.js
```

The only exceptions: `auth/login`, `auth/refresh`, `auth/logout`, public health check.

### Principle of least privilege

- MySQL user has `SELECT` only on `bchhosxpxe` (not `INSERT/UPDATE/DELETE`). Already enforced at DB level + app level; verify with HOSxP DBA.
- Dedicated OS user for Node process (not root).
- PM2 runs as non-privileged user.

## Injection — the classic three

### SQL injection

Already mitigated: all queries parameterized (`?` placeholders), no string concat. Enforcement: grep the codebase:

```bash
# Dangerous patterns (string-interpolated SQL)
grep -rnE 'dbQuery\(`[^?]*\$\{' server/  # template strings with ${} inside SQL
```

If any match, rewrite. Allow only `?` placeholders.

### XSS

React escapes by default, BUT:
- `dangerouslySetInnerHTML` — avoid. If required (rendering Claude markdown), sanitize with DOMPurify first.
- Inline `onClick={() => eval(...)}` — never.
- SVG with user input — sanitize.

Check:

```bash
grep -rn "dangerouslySetInnerHTML" src/
```

Every match must sanitize input.

### CSRF

Refresh token cookie is `SameSite=Strict` — mitigates most CSRF.

For any cookie-based auth endpoint that does mutations: double-submit CSRF token (set a readable cookie + require matching header value). Express's `csurf` is archived; use a modern alternative or roll a simple HMAC-based token.

## Helmet + CSP

Already configured in `server/server.js`. Audit:

- `defaultSrc: ["'self'"]` — good.
- `scriptSrc` in prod: `["'self'"]` — strict, good. Dev has `'unsafe-inline'` for HMR.
- `connectSrc` includes Socket.IO. Dev uses `ws://localhost:*` — fine.
- `frameSrc: ["'none'"]` — prevents clickjacking.
- HSTS on when SSL active.

Tighten further:
- Move inline styles in components to Tailwind classes (kills `style-src 'unsafe-inline'` needs).
- Consider `Content-Security-Policy-Report-Only` in staging, then promote.
- Add `Permissions-Policy` header (disable camera/mic/geolocation).

## PDPA (Thai GDPR-equivalent) — handle patient data right

### Key obligations

- **Lawful basis**: consent or legitimate interest. Most clinical data is consent + medical necessity.
- **Purpose limitation**: data used only for the purpose consented to. Analytics dashboard is within scope for hospital operations.
- **Data minimisation**: collect/store/show the minimum needed.
- **Accuracy**: patient can request correction.
- **Storage limitation**: retain only as long as needed; audit log 7 years per MOH.
- **Integrity & confidentiality**: encryption at rest + in transit.
- **Accountability**: document everything.

### PII handling

**Don't log**: `cid` (national ID), full name, phone, address, free-text clinical notes, exact DOB.

**OK to log**: `hn` (hospital number, pseudonymous), age bucket, sex, ward, DX code, aggregated counts.

Claude prompts follow the same rule (Claude's may be cached/logged).

### Audit trail

Required: every read of identifiable patient data emits an audit record.

```js
// server/middleware/audit.js (pattern)
export function auditMiddleware(action) {
  return (req, res, next) => {
    const hn = extractHn(req);
    if (hn) {
      auditLog({
        action,
        hn: hashHn(hn),          // hashed for the log, never raw
        userId: req.user.id,
        route: req.path,
        ts: new Date(),
        ip: req.ip,
      });
    }
    next();
  };
}

app.use('/api/patient', authenticate, authorize('clinical'), auditMiddleware('read:patient'));
```

Store in sidecar SQLite (HOSxP read-only). Schema:

```sql
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  hn_hash TEXT,
  route TEXT NOT NULL,
  ts INTEGER NOT NULL,
  ip TEXT,
  success INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX idx_audit_user_ts ON audit_log(user_id, ts);
CREATE INDEX idx_audit_hn_ts ON audit_log(hn_hash, ts);
```

Retention: 7 years per MOH. Archive older than 1 year to cold storage; hot query window = 1 year.

### Right to erasure

A patient can request erasure. Practical implementation:

- Anonymize (not delete) so clinical records remain. Replace name with "Anonymized-{hn_hash}", remove cid.
- Retain audit trail of the erasure itself (paradoxically: proof you did what they asked).
- Coordinate with HOSxP — they're the primary record; BCH 360° just reads. Anonymization on their side propagates down.

### Data Subject Access Request (DSAR)

Patient asks "what data do you hold about me?". Workflow:

1. Verify identity (existing hospital process).
2. Query audit log + cached data: what have we read, what insights generated, who accessed.
3. Compile a report (bch-report-builder generates it).
4. Deliver under hospital's DSAR policy.

## Secret management

- `.env` at rest: gitignored ✓. On production host, file permissions `600` (only owner reads).
- No secrets in code ✓ (moved out in prior sessions).
- No secrets in logs — check winston format doesn't leak req.body containing passwords.
- No secrets in client bundle — `VITE_*` prefix ONLY for public values. Private keys never in frontend.
- Rotate secrets every 90 days (JWT secrets, DB passwords, API keys).

### Rotation runbook

1. Generate new secret (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
2. Add to `.env` as `JWT_SECRET_NEXT`.
3. Deploy code that accepts BOTH old and new (grace period).
4. After all tokens signed with old have expired, remove old; rename `JWT_SECRET_NEXT` → `JWT_SECRET`.
5. Deploy again.

Zero-downtime rotation. Document.

## Dependency security

- `npm audit` weekly. Patch criticals within 7 days.
- Pin major versions; allow minor + patch.
- Review any new dep for: download count, last update, known vulns.
- Avoid unmaintained packages.
- `npm ci` in production, not `npm install` (reproducible).

## Incident response

### Preparation

- On-call rotation with clear contact.
- Runbook for common incidents (link to `bch-observability/runbook.md`).
- Tested backup restoration.
- Air-gapped backup of audit log.

### Triage

When an incident is detected:

1. Preserve evidence (logs, screenshots, DB snapshots).
2. Contain (revoke tokens, block IPs, disable compromised endpoint).
3. Notify: IT lead → hospital director → PDPA data protection officer (within 72h if breach).
4. Investigate: what was accessed, by whom, how.
5. Remediate + post-mortem.

### Breach notification

Under PDPA, certain breaches must be reported to the Personal Data Protection Committee within 72 hours. Have the template ready: what, when, scope, mitigation, contact.

## OWASP Top 10 — practical checklist

| OWASP Item | This project's coverage |
|-----------|-------------------------|
| A01 Broken Access Control | `authorize(...)` required on every data route |
| A02 Cryptographic Failures | TLS in prod; bcrypt for passwords; JWT signed |
| A03 Injection | Parameterised queries only; no shell exec with user input |
| A04 Insecure Design | Threat-modelled (this doc); RBAC matrix |
| A05 Security Misconfig | helmet + CSP; no default creds; secrets in env |
| A06 Vulnerable Components | `npm audit` weekly; patched deps |
| A07 Auth Failures | Rate limit login; refresh rotation; strong passwords |
| A08 Data Integrity | Code signing on deploy; integrity check on install |
| A09 Security Logging | Winston structured; audit log per PII access |
| A10 SSRF | No arbitrary URL fetches from user input |

## Pen-testing checklist (semi-annual)

- [ ] Login brute force: simulate rate limiter behavior.
- [ ] SQL injection on every form field and query param.
- [ ] XSS on every text input; stored XSS via profile/comments.
- [ ] CSRF: try cross-origin POST; verify rejection.
- [ ] JWT: try none algorithm, tampered signature, replay old token, mismatched claims.
- [ ] Authorization: try accessing /api/finance/... as an `opd` role.
- [ ] File upload (if any): try shell, overfill, SVG XSS.
- [ ] Direct object reference: try accessing another patient's record by HN.
- [ ] Error handling: verify no stack traces leak.
- [ ] Rate limits: confirm per-IP and per-user.

Document findings in `docs/security/pen-test-YYYY-MM.md`.

## Workflow

1. **New route** → `authenticate`, `authorize(...)`, Zod validate, parameterized queries, audit log on PII.
2. **New field storing PII** → data classification exercise. Add to PDPA inventory.
3. **New dependency** → `npm audit`, check maintenance status.
4. **Staff leaves** → revoke tokens, change shared secrets, remove LDAP/AD role.
5. **Breach suspected** → run incident playbook.

## Anti-patterns to refuse

- **Adding auth later** — default-deny from day one.
- **Logging request bodies raw** — may contain PII or tokens.
- **Console.error with full SQL and params** — sanitize.
- **Sending patient lists via unencrypted email** — encrypt attachment or use secure-link.
- **Admin account shared among IT team** — individual accounts with admin role.
- **"We'll pentest next year"** — semi-annual minimum.
- **Rolling your own crypto** — use standard libs.

## Sibling skills

- `bch-data-quality` — audit log schema + retention policy.
- `bch-observability` — log hygiene; detect auth anomalies via metrics.
- `bch-360-expert/references/performance-auditor.md` — quick security checklist.
- `bch-devops` — backup, secret rotation on infra side.
