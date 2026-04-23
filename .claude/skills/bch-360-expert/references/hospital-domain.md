# Hospital Domain Knowledge — HOSxP XE + Thai Clinical

This file contains the domain knowledge you need to read/write/interpret data from HOSxP XE (the Thai community hospital HIS) and to speak the clinical language the UI uses. Consult it before writing SQL or designing clinical logic.

## HOSxP XE at a glance

HOSxP XE is a Thai hospital information system built on MariaDB 5.x. It's the source of truth for patient visits, admissions, orders, billing, and pharmacy. The BCH 360° app reads from a slave replica — **never write**.

The authoritative reference for this deployment's actual schema is **`docs/data-dictionary/index.html`** (6,566 tables, 35 core deep-dived, PII masked). Regenerate with `node scripts/probes/generate_datadic_v2.mjs` after any HOSxP upgrade. The summaries below are the 20% of tables you'll touch 80% of the time — but always confirm against the live data dictionary.

## Key tables (the 20% you'll use 80% of the time)

### Patient identity (sensitive — PII)

- `person` — demographic master. Contains `cid` (national ID — PII, never log), `firstname`, `lastname`, `birthdate`. Join key: `person_id`.
- `patient` — hospital patient registry. Contains `hn` (hospital number — project treats as pseudonymous), linked to `person_id`.

### Visits

- `ovst` — OPD visit registry. One row per outpatient visit. Key columns:
  - `vn` — visit number (PK-ish)
  - `hn` — patient
  - `vstdate` — visit date
  - `vsttime` — arrival time
  - `dep` — department / clinic code (e.g., 001=GP, 003=Peds)
  - `pdx` — primary diagnosis (ICD-10)
  - `ovstost` — outcome status (00=new, 54=send to IPD, 61=admit, 89=referred, 99=done)
  - `doctor` — attending
- `er_regist` — ER registration. Key columns: `er_regist_id`, `vn`, `hn`, `register_time`, `triage_level` (1=resuscitation .. 5=non-urgent), `complaint`.
- `ipt` — IPD admission. Key columns: `an` (admission number), `hn`, `regdate`, `dchdate`, `ward`, `pdx`, `dchstat`, `dchtype`.
- `an_stat` — IPD admission statistics / DRG info.

### Orders & services

- `opitemrece` — itemized billing for both OPD + IPD. Join on `vn` or `an`. Key columns: `icode` (item code), `qty`, `sum_price`, `income_type`, `rcpno`. ~9M rows.
- **`service_time`** — OPD wait-time stage timestamps. Columns: `vn`, `hn`, `vstdate`, `vsttime`, `service1`..`service20` (time of day), `service1_dep`..`service20_dep` (depcode per stage). Stages vary per clinic but conventionally: `service1` = screening, `service2` = doctor, `service7` = pharmacy done. ~500K rows. **This is NOT `opd_service` (which does not exist on this instance).**
- `ovst_service_time` — newer event-log style: one row per stage event with `service_begin_datetime` + `service_end_datetime` + `ovst_service_time_type_code` (e.g. `OPD-SCREEN`, `OPD-DOCTOR`). ~1.2M rows. Use when you want event-level analysis rather than wide-row wait averages.
- `orderitem` — orders.

### Pharmacy

- **`opi_dispense`** — medications dispensed. Key columns: `icode`, `qty`, `price`, `modify_datetime`, `doctor`, `hos_guid`. Joins back to `ovst` via `hos_guid`, not `vn` directly. ~7.7M rows. **This is NOT `drug_receive` (which does not exist on this instance).**
- `opi_dispense_dru` — dispense line detail (qty breakdown, follow-up doses). ~850K rows.
- `drugitems` — drug master (~900 rows).

### Vital signs & clinical

- `opdscreen` — OPD screening vitals (`bps` systolic, `bpd` diastolic, `pulse`, `temperature`, `rr`, `o2sat`, `bw` body weight, `height`). ~1.4M rows.
- **IPD vitals — table name NOT YET CONFIRMED.** `ipt_vital_chart` is a PNG image store (not values). `vital_sign_ipd` does NOT exist. Likely candidates: nursing assessment tables or `asm_record_vital_sings`. Clinical metrics `news2` and `mortalityRisk` are stubbed until a HOSxP DBA confirms the structured table.

### Registrations / receipts

- `an_receipt` — IPD receipt header.
- `rcpt_print` / `rcpt_arc` — receipt archive.
- `financial_transaction` — finance-side.

### Geography / reference

- `kskdepartment` — department master.
- `ward` — ward master.
- `pttype` — patient insurance scheme (`10`=UC/"30 บาท", `71`=SSO, `80`=CSMBS, `A1`=self-pay, etc.).
- `holiday` — hospital holiday calendar. Project uses this to classify today as workday/holiday.

## Common SQL patterns

### Today's OPD count

```sql
SELECT COUNT(*) AS total
FROM ovst
WHERE vstdate = CURDATE()
```

### OPD wait-time (screening → doctor → pharmacy)

```sql
SELECT
  AVG(TIMESTAMPDIFF(MINUTE,
       CONCAT(o.vstdate,' ',o.vsttime),
       CONCAT(o.vstdate,' ',s.service1))) AS wait_to_screen,
  AVG(TIMESTAMPDIFF(MINUTE,
       CONCAT(o.vstdate,' ',s.service1),
       CONCAT(o.vstdate,' ',s.service2))) AS screen_to_doctor,
  AVG(TIMESTAMPDIFF(MINUTE,
       CONCAT(o.vstdate,' ',s.service2),
       CONCAT(o.vstdate,' ',s.service7))) AS doctor_to_pharmacy
FROM ovst o
JOIN opd_service s ON s.vn = o.vn
WHERE o.vstdate = CURDATE()
  AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61','89','54'))
```

### IPD length of stay distribution

```sql
SELECT
  ward,
  AVG(DATEDIFF(COALESCE(dchdate, CURDATE()), regdate)) AS avg_los,
  COUNT(*) AS admits
FROM ipt
WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY ward
```

### Readmission (30-day, same patient)

```sql
SELECT i1.hn, i1.an, i1.regdate, i1.dchdate, i2.an AS readmit_an, i2.regdate AS readmit_date
FROM ipt i1
JOIN ipt i2 ON i2.hn = i1.hn
            AND i2.regdate > i1.dchdate
            AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
```

### Revenue by fiscal year (Thai: Oct→Sep)

Use the helper:

```js
import { getRevenueFiscal } from '../helpers/fiscal.js';
const rev = await getRevenueFiscal({ year: 2568 /* พ.ศ. */ });
```

Don't roll your own fiscal math — `helpers/fiscal.js` handles B.E./C.E. conversion and Oct-start alignment.

## Clinical terminology — what the UI means

### Scores

- **NEWS2 / EWS** — National Early Warning Score 2. Range 0–20. Thresholds used in this project:
  - 0–2: routine monitoring ("ติดตามตามปกติ")
  - 3–4: every 4 hours ("ประเมินทุก 4 ชม.")
  - 5–6 or single red flag: every 1 hour + notify doctor ("แจ้งแพทย์เวร")
  - 7+: critical — call RRT/ICU ("เรียก RRT ทันที")
- **qSOFA** — quick SOFA for sepsis screening (3 components: RR ≥ 22, altered mental state, SBP ≤ 100).
- **Triage level** — 1 = resuscitation (life-threatening), 2 = emergent, 3 = urgent, 4 = less urgent, 5 = non-urgent. Lower = more acute.

### Reimbursement / DRG

- **DRG** — Diagnosis Related Group. Each admission maps to a DRG bucket that determines the reimbursement rate. Thai healthcare uses a national DRG list maintained by NHSO.
- **pttype** (patient type) — insurance scheme:
  - `10` / `UC` — หลักประกันสุขภาพถ้วนหน้า ("30 บาท"). Biggest scheme in community hospitals.
  - `71` / `SSO` — Social Security.
  - `80` / `CSMBS` — Civil Servant Medical Benefit.
  - Others: self-pay, migrant, private insurance.
- **Under-charging** — billable but not billed. One of the AI modules.
- **PPFS (Per-Patient Flat System)** / **Global Budget** — Thai hospital budget allocation models.

### Common Thai clinical terms (UI labels)

| Thai | English |
|------|---------|
| ผู้ป่วยนอก | OPD (Outpatient Department) |
| ผู้ป่วยใน | IPD (Inpatient) |
| ห้องฉุกเฉิน / ER | Emergency Room |
| แพทย์เวร | On-call / attending physician |
| พยาบาลเวร | On-call nurse |
| เตียงว่าง / เตียงคงเหลือ | available beds |
| การกลับมารักษาซ้ำ | readmission |
| ระยะเวลานอน / LOS | length of stay |
| รอคัดกรอง | awaiting triage / screening |
| กำลังตรวจ | being seen by doctor |
| รอรับยา | awaiting pharmacy |
| กลับบ้าน | discharged home |
| ส่งต่อ | referred out |
| โรคเรื้อรัง | non-communicable / chronic disease (NCD) |
| เวชระเบียน | medical records (MedRec) |
| คลินิก | clinic |
| แผนก | department |
| หอผู้ป่วย | ward |
| หน่วย | unit |
| ตรวจลับ | confidential / private clinic |

### NCD cluster (6 diseases tracked)

The NCD tab tracks six non-communicable diseases in a fixed order:

1. **DM** — เบาหวาน (Diabetes Mellitus)
2. **HT** — ความดันโลหิตสูง (Hypertension)
3. **IHD** — โรคหัวใจขาดเลือด (Ischemic Heart Disease)
4. **Stroke** — โรคหลอดเลือดสมอง
5. **COPD** — ปอดอุดกั้นเรื้อรัง
6. **CKD** — ไตเรื้อรัง (Chronic Kidney Disease)

Each has its own ICD-10 code families. `server/ai/ncdRiskEngine.js` handles scoring.

## Compliance & privacy

### PDPA (Thai GDPR-equivalent)

- Patient consent must be on file (tracked in `person` or a linked consent table).
- Right to erasure applies. Typically handled via anonymization, not deletion, to preserve clinical record integrity.
- Data subject access requests: the project supports a read-out flow via the Audit tab.

### Audit trail

- Every PII read should emit an audit entry (`req.audit('read:patient', { hn: hashHn })`).
- Retention: 7 years per MOH regulation.
- Stored in the sidecar SQLite DB (`better-sqlite3`), not HOSxP.

### What you can and can't log

| OK to log | DO NOT log |
|-----------|-----------|
| `hn` (pseudonymous) | `cid` (national ID) |
| Ward, department | Patient name |
| Aggregated counts | Address, phone, email |
| Age buckets | Exact DOB |
| DX code, triage level | Free-text notes |

### What you can send to Claude

Same table — Claude prompts are treated as potentially logged. Safer rule: send the minimum needed for the narrative, using the same allow-list above.

## HL7 FHIR

`server/middleware/fhir.js` has FHIR resource adapters for interop with external systems (MoH data lakes, regional HIE). If you need to export data, reuse those adapters rather than hand-rolling JSON.

## Units & formatting conventions

- **Currency**: THB (`฿`). Format compact (`฿1.2M`) at KPI level, full at line-item level.
- **Dates**: B.E. (พ.ศ. = C.E. + 543) for user-facing year labels when combined with revenue/fiscal reports. C.E. for internal timestamps and API payloads.
- **Time**: 24-hour. Thai users don't use AM/PM in clinical contexts.
- **Temperature**: °C (always — never °F).
- **Weight**: kg. Height: cm. BMI: one decimal.
- **Blood pressure**: mmHg, format `SBP/DBP` (e.g., `120/80`).
- **O2 saturation**: % integer.
