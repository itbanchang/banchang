# RBAC Matrix — BCH 360° V.10

Read this before adding or changing role permissions. Every route should match the matrix or have an ADR exception.

## Roles

| Role | Description | Typical user |
|------|-------------|--------------|
| `admin` | Full access, including server settings + audit log | IT lead |
| `director` | Read all operational + financial views | Hospital director |
| `finance` | Revenue, AR, DRG, under-charging | Finance manager / coder |
| `clinical` | NEWS2, sepsis, LOS, readmission, bed mgmt | Clinical lead |
| `nurse` | Ward list, NEWS2 watchlist, pharmacy wait | Ward/OPD nurse |
| `opd` | OPD wait, queue, DPI | OPD staff |
| `ipd` | IPD admits, LOS, bed status | IPD staff |
| `er` | Triage queue, boarding, surge | ER staff |
| `dental`, `thaimed`, `phystherapy`, `ncd`, `medrec`, `xray`, `pharmacy`, `lab`, `quality` | Module-specific scope | Specialist staff |
| `ai` | AI module invocation | Internal role for AI routes |

## Endpoint permissions

| Endpoint group | admin | director | finance | clinical | nurse | module-staff |
|----------------|:-----:|:--------:|:-------:|:--------:|:-----:|:------------:|
| `/api/auth/*` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/api/dashboard/*` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `/api/executive/*` | ✓ | ✓ | ✓ | — | — | — |
| `/api/finance/*` | ✓ | ✓ | ✓ | — | — | — |
| `/api/report/*` | ✓ | ✓ | ✓ | — | — | — |
| `/api/briefing/*` | ✓ | ✓ | ✓ | ✓ | — | — |
| `/api/ipd/*` | ✓ | ✓ | ✓ | ✓ | ✓ (read) | — |
| `/api/er/*` | ✓ | ✓ | — | ✓ | ✓ (read) | — |
| `/api/clinical/*` | ✓ | ✓ | — | ✓ | ✓ (read) | — |
| `/api/opd/*` | ✓ | ✓ | ✓ | ✓ | ✓ (read) | opd |
| `/api/ncd/*` | ✓ | ✓ | — | ✓ | ✓ (read) | ncd |
| `/api/medrec/*` | ✓ | ✓ | ✓ (audit) | — | — | medrec |
| `/api/xray/*`, `/api/lab/*`, `/api/pharmacy/*` | ✓ | ✓ | ✓ (usage) | ✓ | — | matching module |
| `/api/quality/*` | ✓ | ✓ | — | ✓ | — | quality |
| `/api/ai/*` | ✓ | ✓ | ✓ | ✓ | — | ai |
| `/api/dq/*` | ✓ | — | — | — | — | — |
| `/api/rum`, `/api/rum/error` | (anon — rate-limited) | | | | | |
| `/api/infra/*`, `/api/debug/*`, `/api/system/*` | ✓ | — | — | — | — | — |

## Rules

1. **Default deny.** Every route starts with `authenticate` + `authorize([...])`. No exceptions for `/api/*` except auth + public health + RUM ingestion.
2. **Least privilege.** A role covers what its holder demonstrably needs, not what's convenient.
3. **Audit PII access.** Every route touching identifiable patient data emits an audit record via `auditMiddleware` + hashed `hn`.
4. **No role sharing.** Each staff member has an individual account.
5. **Reviewed quarterly.** Permission creep is real.

## Adding a role or permission

1. Open a PR updating this matrix + the RBAC middleware.
2. Cite the business need in PR description.
3. Review by the DPO + IT lead before merge.
4. If the permission grants access to new PII types, add to `docs/security/pdpa.md` inventory.

## See also

- Skill: `bch-security-compliance`
- `server/middleware/rbac.js` — enforcement code
- `server/middleware/audit.js` — audit logger
