# BCH 360° Intelligence - Data Dictionary

Generated on: 2026-04-23T14:51:26.131Z
Database: bchhosxpxe (10.109.0.33)
Total tables: 6566 • Core deep-dived: 35

> Full core detail in `docs/data-dictionary/core-tables.md` • browsable in `docs/data-dictionary/index.html`

## Top 50 tables by estimated row count

| Table | Rows (est) | Data | Index | Engine |
|-------|-----------:|-----:|------:|--------|
| `opitemrece` | 8,819,617 | 3.20 GB | 13.75 GB | InnoDB |
| `lab_order` | 8,655,153 | 1.00 GB | 717.5 MB | InnoDB |
| `opi_dispense` | 6,800,690 | 2.02 GB | 686.6 MB | InnoDB |
| `rdu_incident_detail` | 4,775,123 | 588.0 MB | 146.2 MB | InnoDB |
| `report_access_log` | 3,915,389 | 406.9 MB | 392.9 MB | InnoDB |
| `ovstdiag` | 2,730,865 | 275.8 MB | 800.6 MB | InnoDB |
| `patient_emr_log` | 2,696,917 | 170.7 MB | 106.8 MB | InnoDB |
| `ovst_doctor_sign` | 2,631,165 | 175.7 MB | 453.2 MB | InnoDB |
| `opd_opi_hos_guid_transfer` | 2,607,778 | 481.6 MB | 1.08 GB | InnoDB |
| `fdh_send_log` | 2,174,832 | 216.7 MB | 0 B | InnoDB |
| `opd_dep_queue` | 1,550,377 | 89.6 MB | 485.8 MB | InnoDB |
| `visit_pttype` | 1,538,751 | 161.9 MB | 429.7 MB | InnoDB |
| `lab_lis_track` | 1,535,130 | 325.8 MB | 148.8 MB | InnoDB |
| `opitemrece_doctor_confirm` | 1,510,461 | 223.7 MB | 199.7 MB | InnoDB |
| `opdscreen_cc_list` | 1,388,142 | 131.6 MB | 57.6 MB | InnoDB |
| `ovst` | 1,350,096 | 543.5 MB | 2.89 GB | InnoDB |
| `lab_app_order` | 1,293,563 | 96.6 MB | 71.7 MB | InnoDB |
| `key_lock` | 1,257,920 | 90.7 MB | 122.4 MB | InnoDB |
| `opdscreen` | 1,236,040 | 799.9 MB | 655.3 MB | InnoDB |
| `opd_opi_fn_cr_detail` | 1,187,631 | 119.6 MB | 32.1 MB | InnoDB |
| `ovst_service_time` | 1,160,368 | 120.6 MB | 49.6 MB | InnoDB |
| `opd_opi_fn_tr_detail` | 1,148,234 | 137.7 MB | 55.6 MB | InnoDB |
| `rcpt_debt_detail` | 1,104,600 | 74.6 MB | 57.1 MB | InnoDB |
| `incoth` | 1,101,679 | 105.5 MB | 1.05 GB | InnoDB |
| `opd_opi_finance_summary` | 1,072,317 | 379.9 MB | 62.1 MB | InnoDB |
| `ipt_opi_hos_guid_transfer` | 1,065,251 | 134.9 MB | 270.6 MB | InnoDB |
| `opitemrece_sticker_stat` | 1,035,294 | 142.9 MB | 103.9 MB | InnoDB |
| `ovst_service_time_uni` | 1,014,030 | 75.6 MB | 64.7 MB | InnoDB |
| `user_mru_search` | 968,185 | 50.6 MB | 26.6 MB | InnoDB |
| `vn_stat` | 947,257 | 473.0 MB | 412.8 MB | InnoDB |
| `inc_opd_stat` | 941,070 | 455.0 MB | 125.3 MB | InnoDB |
| `ovst_seq` | 939,453 | 278.0 MB | 129.3 MB | InnoDB |
| `ovst_patient_record` | 909,064 | 364.0 MB | 0 B | InnoDB |
| `patient_history_hpi` | 896,535 | 327.8 MB | 81.2 MB | InnoDB |
| `user_mru_list` | 890,802 | 174.7 MB | 76.6 MB | InnoDB |
| `ptnote_view` | 880,244 | 49.6 MB | 23.5 MB | InnoDB |
| `medpay_ipd` | 876,479 | 163.7 MB | 325.8 MB | InnoDB |
| `lab_head_ext` | 869,754 | 46.6 MB | 56.6 MB | InnoDB |
| `ipd_do_nurse_plan` | 842,801 | 72.6 MB | 105.3 MB | InnoDB |
| `opi_dispense_dru` | 834,464 | 117.7 MB | 38.6 MB | InnoDB |
| `lab_head` | 702,077 | 200.9 MB | 269.1 MB | InnoDB |
| `lab_order_service` | 694,017 | 109.6 MB | 157.8 MB | InnoDB |
| `ovst_copy1` | 674,908 | 52.6 MB | 282.7 MB | InnoDB |
| `lab_head_summary` | 650,689 | 43.6 MB | 0 B | InnoDB |
| `moph_phr_transfer` | 632,549 | 963.7 MB | 142.4 MB | InnoDB |
| `opd_opi_fn_tr_list` | 553,129 | 33.6 MB | 32.1 MB | InnoDB |
| `opd_opi_fn_cr_list` | 550,810 | 44.6 MB | 43.6 MB | InnoDB |
| `ovst_vn` | 537,641 | 25.6 MB | 0 B | InnoDB |
| `service_time` | 502,782 | 55.6 MB | 98.3 MB | InnoDB |
| `ovst_queue_check` | 494,280 | 21.5 MB | 13.5 MB | InnoDB |
