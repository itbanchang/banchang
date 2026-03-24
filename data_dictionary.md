# BCH 360° Intelligence - Data Dictionary

Generated on: 5/3/2569 19:55:14
Database: bchhosxpxe (10.1.0.3)

## Table: ovst

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| hos_guid | varchar(38) | NO | PRI |  |  |  |
| vn | varchar(13) | YES | UNI |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| an | varchar(9) | YES | MUL |  |  |  |
| vstdate | date | YES | MUL |  |  |  |
| vsttime | time | YES |  |  |  |  |
| doctor | varchar(7) | YES | MUL |  |  |  |
| hospmain | varchar(9) | YES |  |  |  |  |
| hospsub | varchar(9) | YES |  |  |  |  |
| oqueue | int(11) | YES |  |  |  |  |
| ovstist | char(10) | YES |  |  |  |  |
| ovstost | varchar(4) | YES |  |  |  |  |
| pttype | char(2) | YES | MUL |  |  |  |
| pttypeno | varchar(50) | YES | MUL |  |  |  |
| rfrics | char(1) | YES |  |  |  |  |
| rfrilct | varchar(9) | YES |  |  |  |  |
| rfrocs | char(1) | YES |  |  |  |  |
| rfrolct | varchar(9) | YES |  |  |  |  |
| spclty | char(2) | YES | MUL |  |  |  |
| rcpt_disease | varchar(100) | YES |  |  |  |  |
| hcode | varchar(5) | YES | MUL |  |  |  |
| cur_dep | char(3) | YES | MUL |  |  |  |
| cur_dep_busy | char(1) | YES |  |  |  |  |
| last_dep | char(3) | YES |  |  |  |  |
| cur_dep_time | time | YES |  |  |  |  |
| rx_queue | int(11) | YES |  |  |  |  |
| diag_text | varchar(250) | YES |  |  |  |  |
| pt_subtype | tinyint(4) | YES |  | 0 |  |  |
| main_dep | char(3) | YES |  |  |  |  |
| main_dep_queue | int(11) | YES |  |  |  |  |
| finance_summary_date | date | YES |  |  |  |  |
| visit_type | char(1) | YES |  |  |  |  |
| node_id | char(1) | YES |  |  |  |  |
| contract_id | int(11) | YES |  |  |  |  |
| waiting | char(1) | YES |  |  |  |  |
| rfri_icd10 | varchar(6) | YES |  |  |  |  |
| o_refer_number | int(11) | YES | MUL |  |  |  |
| has_insurance | char(1) | YES |  |  |  |  |
| i_refer_number | varchar(25) | YES | MUL |  |  |  |
| refer_type | char(1) | YES |  |  |  |  |
| o_refer_dep | varchar(5) | YES |  |  |  |  |
| staff | varchar(25) | YES | MUL |  |  |  |
| command_doctor | varchar(6) | YES |  |  |  |  |
| send_person | varchar(150) | YES |  |  |  |  |
| pt_priority | int(11) | YES |  |  |  |  |
| finance_lock | char(1) | YES |  |  |  |  |
| oldcode | varchar(20) | YES | MUL |  |  |  |
| sign_doctor | varchar(10) | YES |  |  |  |  |
| anonymous_visit | char(1) | YES | MUL |  |  |  |
| anonymous_vn | varchar(12) | YES | MUL |  |  |  |
| pt_capability_type_id | int(11) | YES |  |  |  |  |
| at_hospital | char(1) | YES |  |  |  |  |
| ovst_key | varchar(40) | YES |  |  |  |  |
| hos_type | varchar(10) | YES | MUL |  |  |  |
| frequency | varchar(2) | YES |  |  |  |  |
| hos_guid_frequency | varchar(2) | YES |  |  |  |  |

## Table: vn_stat

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| vn | varchar(13) | NO | PRI |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| pdx | varchar(6) | YES |  |  |  |  |
| gr504 | smallint(6) | YES |  |  |  |  |
| lastvisit | smallint(6) | YES |  | 0 |  |  |
| accident_code | varchar(6) | YES |  |  |  |  |
| dx_doctor | varchar(7) | YES |  |  |  |  |
| dx0 | varchar(6) | YES |  |  |  |  |
| dx1 | varchar(6) | YES |  |  |  |  |
| dx2 | varchar(6) | YES |  |  |  |  |
| dx3 | varchar(6) | YES |  |  |  |  |
| dx4 | varchar(6) | YES |  |  |  |  |
| dx5 | varchar(6) | YES |  |  |  |  |
| sex | char(1) | YES |  |  |  |  |
| age_y | smallint(6) | YES |  | 0 |  |  |
| age_m | smallint(6) | YES |  | 0 |  |  |
| age_d | smallint(6) | YES |  | 0 |  |  |
| aid | varchar(6) | YES |  |  |  |  |
| moopart | varchar(5) | YES |  |  |  |  |
| count_in_month | smallint(6) | YES |  | 0 |  |  |
| count_in_year | smallint(6) | YES |  | 0 |  |  |
| pttype | char(2) | YES | MUL |  |  |  |
| income | double(15,3) | YES |  | 0.000 |  |  |
| paid_money | double(15,3) | YES |  | 0.000 |  |  |
| remain_money | double(15,3) | YES |  | 0.000 |  |  |
| uc_money | double(15,3) | YES |  | 0.000 |  |  |
| item_money | double(15,3) | YES |  | 0.000 |  |  |
| dba | tinyint(4) | YES |  |  |  |  |
| spclty | char(2) | YES |  |  |  |  |
| vstdate | date | YES | MUL |  |  |  |
| op0 | varchar(6) | YES |  |  |  |  |
| op1 | varchar(6) | YES |  |  |  |  |
| op2 | varchar(6) | YES |  |  |  |  |
| op3 | varchar(6) | YES |  |  |  |  |
| op4 | varchar(6) | YES |  |  |  |  |
| op5 | varchar(6) | YES |  |  |  |  |
| rcp_no | varchar(10) | YES |  |  |  |  |
| print_count | tinyint(4) | YES |  | 0 |  |  |
| print_done | char(1) | YES |  |  |  |  |
| pttype_in_region | char(1) | YES |  |  |  |  |
| pttype_in_chwpart | char(1) | YES |  |  |  |  |
| pcode | char(2) | YES | MUL |  |  |  |
| hcode | varchar(5) | YES |  |  |  |  |
| inc01 | double(15,3) | YES |  | 0.000 |  |  |
| inc02 | double(15,3) | YES |  | 0.000 |  |  |
| inc03 | double(15,3) | YES |  | 0.000 |  |  |
| inc04 | double(15,3) | YES |  | 0.000 |  |  |
| inc05 | double(15,3) | YES |  | 0.000 |  |  |
| inc06 | double(15,3) | YES |  | 0.000 |  |  |
| inc07 | double(15,3) | YES |  | 0.000 |  |  |
| inc08 | double(15,3) | YES |  | 0.000 |  |  |
| inc09 | double(15,3) | YES |  | 0.000 |  |  |
| inc10 | double(15,3) | YES |  | 0.000 |  |  |
| inc11 | double(15,3) | YES |  | 0.000 |  |  |
| inc12 | double(15,3) | YES |  | 0.000 |  |  |
| inc13 | double(15,3) | YES |  | 0.000 |  |  |
| inc14 | double(15,3) | YES |  | 0.000 |  |  |
| inc15 | double(15,3) | YES |  | 0.000 |  |  |
| inc16 | double(15,3) | YES |  | 0.000 |  |  |
| hospmain | varchar(9) | YES | MUL |  |  |  |
| hospsub | varchar(9) | YES | MUL |  |  |  |
| pttypeno | varchar(20) | YES |  |  |  |  |
| pttype_expire | date | YES |  |  |  |  |
| cid | varchar(13) | YES | MUL |  |  |  |
| main_pdx | char(3) | YES |  |  |  |  |
| inc17 | double(15,3) | YES |  | 0.000 |  |  |
| inc_drug | double(15,3) | YES |  | 0.000 |  |  |
| inc_nondrug | double(15,3) | YES |  | 0.000 |  |  |
| pt_subtype | tinyint(4) | YES |  |  |  |  |
| rcpno_list | varchar(100) | YES |  |  |  |  |
| ym | varchar(7) | YES | MUL |  |  |  |
| node_id | char(1) | YES |  |  |  |  |
| ill_visit | char(1) | YES |  |  |  |  |
| count_in_day | tinyint(4) | YES |  | 0 |  |  |
| pttype_begin | date | YES |  |  |  |  |
| lastvisit_hour | int(11) | YES |  | 0 |  |  |
| rcpt_money | double(15,3) | YES |  | 0.000 |  |  |
| discount_money | double(15,3) | YES |  | 0.000 |  |  |
| old_diagnosis | char(1) | YES |  |  |  |  |
| debt_id_list | varchar(50) | YES | MUL |  |  |  |
| vn_guid | varchar(38) | YES |  |  |  |  |
| lastvisit_vn | varchar(13) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| rx_license_no | varchar(15) | YES |  |  |  |  |
| lab_paid_ok | char(1) | YES |  |  |  |  |
| xray_paid_ok | char(1) | YES |  |  |  |  |

## Table: patient

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| hos_guid | varchar(38) | NO | PRI |  |  |  |
| hn | varchar(9) | NO | UNI |  |  |  |
| pname | varchar(25) | YES | MUL |  |  |  |
| fname | varchar(100) | YES | MUL |  |  |  |
| lname | varchar(100) | YES | MUL |  |  |  |
| occupation | varchar(4) | YES |  |  |  |  |
| citizenship | char(3) | YES |  |  |  |  |
| birthday | date | YES |  |  |  |  |
| addrpart | varchar(50) | YES |  |  |  |  |
| moopart | char(3) | YES |  |  |  |  |
| tmbpart | char(2) | YES |  |  |  |  |
| amppart | char(2) | YES | MUL |  |  |  |
| chwpart | char(2) | YES | MUL |  |  |  |
| bloodgrp | varchar(20) | YES |  |  |  |  |
| clinic | varchar(100) | YES | MUL |  |  |  |
| deathday | date | YES | MUL |  |  |  |
| drugallergy | varchar(250) | YES |  |  |  |  |
| familyno | int(11) | YES |  |  |  |  |
| fathername | varchar(100) | YES |  |  |  |  |
| firstday | date | YES | MUL |  |  |  |
| hometel | varchar(50) | YES |  |  |  |  |
| informaddr | varchar(200) | YES |  |  |  |  |
| informname | varchar(100) | YES |  |  |  |  |
| informrelation | varchar(50) | YES |  |  |  |  |
| informtel | varchar(50) | YES |  |  |  |  |
| marrystatus | char(1) | YES |  |  |  |  |
| mathername | varchar(100) | YES |  |  |  |  |
| hn_int | int(11) | YES |  |  |  |  |
| nationality | char(3) | YES |  |  |  |  |
| opdlocation | varchar(50) | YES |  |  |  |  |
| pttype | char(2) | YES | MUL |  |  |  |
| religion | char(2) | YES |  |  |  |  |
| sex | char(1) | YES |  |  |  |  |
| spsname | varchar(100) | YES |  |  |  |  |
| truebirthday | char(1) | YES |  |  |  |  |
| workaddr | varchar(50) | YES |  |  |  |  |
| worktel | varchar(20) | YES |  |  |  |  |
| hcode | varchar(5) | YES | MUL |  |  |  |
| cid | varchar(13) | YES | MUL |  |  |  |
| hid | int(11) | YES |  |  |  |  |
| educate | char(1) | YES |  |  |  |  |
| family_status | char(1) | YES |  |  |  |  |
| labor_type | char(1) | YES |  |  |  |  |
| last_update | datetime | YES | MUL |  |  |  |
| type_area | char(1) | YES |  |  |  |  |
| road | varchar(50) | YES |  |  |  |  |
| father_cid | varchar(13) | YES |  |  |  |  |
| mother_cid | varchar(13) | YES |  |  |  |  |
| couple_cid | varchar(13) | YES |  |  |  |  |
| person_type | char(2) | YES |  |  |  |  |
| private_doctor_name | varchar(75) | YES |  |  |  |  |
| legal_action | char(1) | YES |  |  |  |  |
| death_code504 | char(2) | YES |  |  |  |  |
| death_diag | varchar(6) | YES |  |  |  |  |
| node_id | char(1) | YES |  |  |  |  |
| admit | char(1) | YES |  |  |  |  |
| midname | varchar(25) | YES |  |  |  |  |
| po_code | varchar(5) | YES |  |  |  |  |
| fatherlname | varchar(100) | YES |  |  |  |  |
| motherlname | varchar(100) | YES |  |  |  |  |
| spslname | varchar(100) | YES |  |  |  |  |
| country | char(2) | YES |  |  |  |  |
| email | varchar(50) | YES |  |  |  |  |
| birthtime | time | YES |  |  |  |  |
| mother_hn | varchar(9) | YES |  |  |  |  |
| last_visit | date | YES | MUL |  |  |  |
| death | char(1) | YES |  |  |  |  |
| height | int(11) | YES |  |  |  |  |
| inregion | char(1) | YES |  |  |  |  |
| reg_time | time | YES |  |  |  |  |
| oldcode | varchar(50) | YES | MUL |  |  |  |
| lang | char(2) | YES |  |  |  |  |
| gov_chronic_id | varchar(10) | YES |  |  |  |  |
| in_cups | char(1) | YES |  |  |  |  |
| patient_type_id | tinyint(4) | YES |  |  |  |  |
| addr_soi | varchar(100) | YES |  |  |  |  |
| work_addr | varchar(230) | YES |  |  |  |  |
| father_hn | varchar(9) | YES |  |  |  |  |
| alias_name | varchar(100) | YES |  |  |  |  |
| destroyed | char(1) | YES |  |  |  |  |
| old_addr | varchar(250) | YES |  |  |  |  |
| fname_soundex | varchar(50) | YES | MUL |  |  |  |
| lname_soundex | varchar(50) | YES | MUL |  |  |  |
| bloodgroup_rh | varchar(5) | YES |  |  |  |  |
| passport_no | varchar(25) | YES | MUL |  |  |  |
| addressid | varchar(6) | YES |  |  |  |  |
| mobile_phone_number | varchar(50) | YES |  |  |  |  |
| anonymous_person | char(1) | YES |  |  |  |  |
| hospital_department_id | int(11) | YES |  |  |  |  |
| membercard_no | varchar(15) | YES | MUL |  |  |  |
| ec_fname | varchar(50) | YES |  |  |  |  |
| ec_lname | varchar(50) | YES |  |  |  |  |
| ec_relation_type_id | int(11) | YES |  |  |  |  |
| patient_color_id | int(11) | YES |  |  |  |  |
| number_of_relatives | int(11) | YES |  |  |  |  |
| birth_order | int(11) | YES |  |  |  |  |
| person_labor_type_id | int(11) | YES |  |  |  |  |
| is_card_destroy | char(1) | YES |  |  |  |  |
| card_destroy_date | date | YES |  |  |  |  |
| g6pd | char(1) | YES |  |  |  |  |
| full_name | varchar(150) | YES |  |  |  |  |
| vid | varchar(8) | YES |  |  |  |  |

## Table: ipt

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| an | varchar(9) | NO | PRI |  |  |  |
| admdoctor | varchar(7) | YES | MUL |  |  |  |
| dchdate | date | YES | MUL |  |  |  |
| dchstts | char(10) | YES | MUL |  |  |  |
| dchtime | time | YES |  |  |  |  |
| dchtype | char(10) | YES |  |  |  |  |
| dthdiagdct | varchar(7) | YES |  |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| ivstist | char(2) | YES |  |  |  |  |
| ivstost | varchar(4) | YES |  |  |  |  |
| lockdx | tinyint(4) | YES |  |  |  |  |
| prediag | varchar(250) | YES |  |  |  |  |
| pttype | char(2) | YES | MUL |  |  |  |
| regdate | date | YES | MUL |  |  |  |
| regtime | time | YES | MUL |  |  |  |
| rfrics | char(1) | YES |  |  |  |  |
| rfrilct | varchar(9) | YES |  |  |  |  |
| rfrocs | char(1) | YES |  |  |  |  |
| rfrolct | varchar(9) | YES |  |  |  |  |
| spclty | char(2) | YES | MUL |  |  |  |
| vn | varchar(13) | YES | MUL |  |  |  |
| ward | varchar(4) | YES | MUL |  |  |  |
| rcpt_disease | varchar(100) | YES |  |  |  |  |
| dch_doctor | varchar(7) | YES |  |  |  |  |
| ipt_type | tinyint(4) | YES | MUL |  |  |  |
| iref_type | varchar(4) | YES |  |  |  |  |
| ipacc | int(11) | YES |  |  |  |  |
| act_money_limit | double(15,3) | YES |  |  |  |  |
| drg | varchar(5) | YES |  |  |  |  |
| mdc | char(2) | YES |  |  |  |  |
| rw | double(15,5) | YES |  |  |  |  |
| wtlos | double(15,3) | YES |  |  |  |  |
| ot | int(11) | YES |  |  |  |  |
| result | char(1) | YES |  |  |  |  |
| gravidity | tinyint(4) | YES |  |  |  |  |
| parity | tinyint(4) | YES |  |  |  |  |
| living_children | tinyint(4) | YES |  |  |  |  |
| rxdoctor | varchar(7) | YES |  |  |  |  |
| staff | varchar(25) | YES |  |  |  |  |
| bw | int(11) | YES |  |  |  |  |
| first_ward | varchar(4) | YES |  |  |  |  |
| refer_out_number | varchar(15) | YES |  |  |  |  |
| incharge_doctor | varchar(7) | YES |  |  |  |  |
| an_guid | varchar(38) | YES | MUL |  |  |  |
| an_lock | char(1) | YES |  |  |  |  |
| ergent | char(1) | YES |  |  |  |  |
| chart_state | char(1) | YES |  |  |  |  |
| receive_chart_date_time | datetime | YES |  |  |  |  |
| receive_chart_staff | varchar(25) | YES |  |  |  |  |
| receive_chart_note | varchar(100) | YES |  |  |  |  |
| adjrw | double(15,5) | YES |  |  |  |  |
| ipt_spclty | char(2) | YES |  |  |  |  |
| finance_lock | char(1) | YES |  |  |  |  |
| last_check_autoincome | datetime | YES |  |  |  |  |
| admit_fee_guid | varchar(38) | YES |  |  |  |  |
| leave_home_day | int(11) | YES |  |  |  |  |
| operation_status | char(1) | YES |  |  |  |  |
| finance_summary_date | date | YES |  |  |  |  |
| estimate_discharge_date | date | YES |  |  |  |  |
| old_cause_revisit | char(1) | YES |  |  |  |  |
| finance_transfer | char(1) | YES |  |  |  |  |
| provision_dx | varchar(200) | YES |  |  |  |  |
| dw_hhc_list_id | int(11) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES |  |  |  |  |
| hos_guid_ext | varchar(64) | YES | MUL |  |  |  |
| body_height | int(11) | YES |  |  |  |  |
| update_datetime | datetime | YES |  |  |  |  |
| cur_dep_code | char(3) | YES |  |  |  |  |
| finance_status_flag | int(11) | YES |  |  |  |  |
| ipt_admit_type_id | int(11) | YES |  |  |  |  |
| no_visit | char(1) | YES |  |  |  |  |
| no_food | char(1) | YES |  |  |  |  |
| confirm_discharge | char(1) | YES | MUL |  |  |  |
| lab_status | char(1) | YES |  |  |  |  |
| xray_status | char(1) | YES |  |  |  |  |
| grouper_version | varchar(15) | YES |  |  |  |  |
| grouper_err | int(11) | YES |  |  |  |  |
| grouper_warn | int(11) | YES |  |  |  |  |
| grouper_actlos | int(11) | YES |  |  |  |  |
| auto_charge_amount | double(15,3) | YES |  |  |  |  |
| provision_dx_icd | varchar(9) | YES |  |  |  |  |
| ipt_cause_type_id | int(11) | YES |  |  |  |  |
| ipt_severe_type_id | int(11) | YES |  |  |  |  |
| ipt_cause_type_note | varchar(150) | YES |  |  |  |  |
| followup | char(1) | YES |  |  |  |  |
| dch_severe_type_id | int(11) | YES |  |  |  |  |
| opd_finance_wait_tr | double(15,3) | YES |  |  |  |  |
| home_leave_status | char(1) | YES |  |  |  |  |
| grouper_adjrw_price | double(15,3) | YES |  |  |  |  |
| reimburse_price | double(15,3) | YES |  |  |  |  |
| oldcode | varchar(20) | YES |  |  |  |  |
| data_ok | char(1) | YES | MUL |  |  |  |
| data_exp_date | date | YES | MUL |  |  |  |
| ipt_summary_status_id | int(11) | YES |  |  |  |  |
| no_charge_room | char(1) | YES |  |  |  |  |
| rx_home_med | char(1) | YES |  |  |  |  |
| hhc_hospcode | varchar(9) | YES |  |  |  |  |
| operation_status_id | int(11) | YES |  |  |  |  |
| ipd_nurse_eval_range_code | char(2) | YES |  |  |  |  |
| cur_bedno | varchar(6) | YES |  |  |  |  |
| plan_admit | char(1) | YES |  |  |  |  |
| ODS | varchar(3) | YES |  |  |  |  |

## Table: an_stat

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| an | varchar(9) | NO | PRI |  |  |  |
| pdx | varchar(6) | YES |  |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| dx0 | varchar(6) | YES |  |  |  |  |
| dx1 | varchar(6) | YES |  |  |  |  |
| dx2 | varchar(6) | YES |  |  |  |  |
| dx3 | varchar(6) | YES |  |  |  |  |
| dx4 | varchar(6) | YES |  |  |  |  |
| dx5 | varchar(6) | YES |  |  |  |  |
| sex | char(1) | YES |  |  |  |  |
| age_y | tinyint(4) | YES |  | 0 |  |  |
| age_m | tinyint(4) | YES |  | 0 |  |  |
| age_d | tinyint(4) | YES |  | 0 |  |  |
| aid | varchar(6) | YES |  |  |  |  |
| count_in_month | tinyint(4) | YES |  | 0 |  |  |
| count_in_year | tinyint(4) | YES |  | 0 |  |  |
| pttype | char(2) | YES | MUL |  |  |  |
| income | double(15,3) | YES |  | 0.000 |  |  |
| lastvisit | int(11) | YES |  | 0 |  |  |
| regdate | date | YES | MUL |  |  |  |
| dchdate | date | YES | MUL |  |  |  |
| admdate | int(11) | YES |  |  |  |  |
| drg | varchar(6) | YES |  |  |  |  |
| rw | double(15,5) | YES |  |  |  |  |
| los | double(15,3) | YES |  |  |  |  |
| ot | double(15,3) | YES |  |  |  |  |
| spclty | char(2) | YES |  |  |  |  |
| ward | varchar(4) | YES |  |  |  |  |
| print_done | char(1) | YES |  |  |  |  |
| print_count | tinyint(4) | YES |  | 0 |  |  |
| paid_money | double(22,3) | YES |  | 0.000 |  |  |
| remain_money | double(22,3) | YES |  | 0.000 |  |  |
| uc_money | double(22,3) | YES |  | 0.000 |  |  |
| item_money | double(22,3) | YES |  | 0.000 |  |  |
| pttype_in_region | char(1) | YES |  |  |  |  |
| pcode | char(2) | YES | MUL |  |  |  |
| op0 | varchar(6) | YES |  |  |  |  |
| op1 | varchar(6) | YES |  |  |  |  |
| op2 | varchar(6) | YES |  |  |  |  |
| op3 | varchar(6) | YES |  |  |  |  |
| op4 | varchar(6) | YES |  |  |  |  |
| op5 | varchar(6) | YES |  |  |  |  |
| op6 | varchar(6) | YES |  |  |  |  |
| inc01 | double(15,3) | YES |  | 0.000 |  |  |
| inc02 | double(15,3) | YES |  | 0.000 |  |  |
| inc03 | double(15,3) | YES |  | 0.000 |  |  |
| inc04 | double(15,3) | YES |  | 0.000 |  |  |
| inc05 | double(15,3) | YES |  | 0.000 |  |  |
| inc06 | double(15,3) | YES |  | 0.000 |  |  |
| inc07 | double(15,3) | YES |  | 0.000 |  |  |
| inc08 | double(15,3) | YES |  | 0.000 |  |  |
| inc09 | double(15,3) | YES |  | 0.000 |  |  |
| inc10 | double(15,3) | YES |  | 0.000 |  |  |
| inc11 | double(15,3) | YES |  | 0.000 |  |  |
| inc12 | double(15,3) | YES |  | 0.000 |  |  |
| inc13 | double(15,3) | YES |  | 0.000 |  |  |
| inc14 | double(15,3) | YES |  | 0.000 |  |  |
| inc15 | double(15,3) | YES |  | 0.000 |  |  |
| inc16 | double(15,3) | YES |  | 0.000 |  |  |
| dx_doctor | varchar(7) | YES |  |  |  |  |
| vn | varchar(13) | YES |  |  |  |  |
| inc17 | double(15,3) | YES |  | 0.000 |  |  |
| rcpno_list | varchar(100) | YES |  |  |  |  |
| pttypeno | varchar(25) | YES |  |  |  |  |
| moopart | char(3) | YES |  |  |  |  |
| gr504 | smallint(6) | YES |  |  |  |  |
| accident_code | varchar(6) | YES |  |  |  |  |
| lastvisit_hour | int(11) | YES |  | 0 |  |  |
| rcpt_money | double(15,3) | YES |  | 0.000 |  |  |
| discount_money | double(15,3) | YES |  | 0.000 |  |  |
| old_diagnosis | char(1) | YES |  |  |  |  |
| debt_id_list | varchar(50) | YES |  |  |  |  |
| admit_hour | int(11) | YES |  |  |  |  |
| an_guid | varchar(38) | YES |  |  |  |  |
| admdate_cut24 | int(11) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| debt_money | double(15,3) | YES |  | 0.000 |  |  |
| opd_wait_money | double(15,3) | YES |  | 0.000 |  |  |
| presc_ned_incomplete | char(1) | YES |  |  |  |  |
| last_sync_datetime | datetime | YES |  |  |  |  |
| rx_license_no | varchar(15) | YES |  |  |  |  |
| has_refill_medplan | char(1) | YES |  |  |  |  |
| has_med_recon | char(1) | YES |  |  |  |  |
| pttype_list_text | varchar(200) | YES |  |  |  |  |
| diag_text_list | varchar(200) | YES |  |  |  |  |
| last_bps | int(11) | YES |  |  |  |  |
| last_bpd | int(11) | YES |  |  |  |  |
| last_temperature | double(15,1) | YES |  |  |  |  |
| last_sos_score | int(11) | YES |  |  |  |  |
| iclaim_list_text | varchar(50) | YES |  |  |  |  |

## Table: opdscreen

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| hos_guid | varchar(38) | NO | PRI |  |  |  |
| vn | varchar(13) | YES | UNI |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| vstdate | date | YES | MUL |  |  |  |
| vsttime | time | YES |  |  |  |  |
| begintime | time | YES |  |  |  |  |
| outtime | time | YES |  |  |  |  |
| endtime | time | YES |  |  |  |  |
| bpd | double(15,3) | YES |  |  |  |  |
| bps | double(15,3) | YES |  |  |  |  |
| bw | double(15,3) | YES |  |  |  |  |
| cc | text | YES |  |  |  |  |
| hr | double(15,3) | YES |  |  |  |  |
| pe | text | YES |  |  |  |  |
| pulse | double(15,3) | YES |  |  |  |  |
| temperature | double(15,3) | YES |  |  |  |  |
| note | text | YES |  |  |  |  |
| rr | double(15,3) | YES |  |  |  |  |
| cc_begin_date | date | YES |  |  |  |  |
| cc_cause_of_visit | varchar(250) | YES |  |  |  |  |
| cc_sign | varchar(250) | YES |  |  |  |  |
| cc_duration | varchar(150) | YES |  |  |  |  |
| cc_position | varchar(250) | YES |  |  |  |  |
| cc_note | text | YES |  |  |  |  |
| his_begin_date | date | YES |  |  |  |  |
| his_frequency | varchar(250) | YES |  |  |  |  |
| his_severity | varchar(250) | YES |  |  |  |  |
| his_cause | varchar(250) | YES |  |  |  |  |
| his_expand | varchar(250) | YES |  |  |  |  |
| his_cause_increase | varchar(250) | YES |  |  |  |  |
| his_cause_decrease | varchar(250) | YES |  |  |  |  |
| his_related_sign | varchar(250) | YES |  |  |  |  |
| height | int(11) | YES | MUL |  |  |  |
| screen_dep | char(3) | YES |  |  |  |  |
| waiting | char(1) | YES |  |  |  |  |
| fbs | double(15,3) | YES |  |  |  |  |
| help1 | char(1) | YES |  |  |  |  |
| help2 | char(1) | YES |  |  |  |  |
| help3 | char(1) | YES |  |  |  |  |
| help4 | char(1) | YES |  |  |  |  |
| help1_time | time | YES |  |  |  |  |
| help1_bps | int(11) | YES |  |  |  |  |
| help1_bpd | int(11) | YES |  |  |  |  |
| help2_time | time | YES |  |  |  |  |
| help2_temp | double(15,3) | YES |  |  |  |  |
| help3_icode | varchar(100) | YES |  |  |  |  |
| help3_time | time | YES |  |  |  |  |
| help3_qty | tinyint(4) | YES |  |  |  |  |
| help4_note | text | YES |  |  |  |  |
| advice1 | char(1) | YES |  |  |  |  |
| advice2 | char(1) | YES |  |  |  |  |
| advice3 | char(1) | YES |  |  |  |  |
| advice4 | char(1) | YES |  |  |  |  |
| advice5 | char(1) | YES |  |  |  |  |
| advice6 | char(1) | YES |  |  |  |  |
| advice7 | char(1) | YES |  |  |  |  |
| cradle | char(1) | YES |  |  |  |  |
| pe_ga | char(1) | YES |  |  |  |  |
| pe_heent | char(1) | YES |  |  |  |  |
| pe_heart | char(1) | YES |  |  |  |  |
| pe_lung | char(1) | YES |  |  |  |  |
| pe_ab | char(1) | YES |  |  |  |  |
| pe_ext | char(1) | YES |  |  |  |  |
| pe_neuro | char(1) | YES |  |  |  |  |
| pe_ga_text | varchar(250) | YES |  |  |  |  |
| pe_heent_text | varchar(250) | YES |  |  |  |  |
| pe_heart_text | varchar(250) | YES |  |  |  |  |
| pe_lung_text | varchar(250) | YES |  |  |  |  |
| pe_ab_text | varchar(250) | YES |  |  |  |  |
| pe_neuro_text | varchar(250) | YES |  |  |  |  |
| pe_ext_text | varchar(250) | YES |  |  |  |  |
| bmi | double(15,3) | YES |  |  |  |  |
| tg | double(15,3) | YES |  |  |  |  |
| hdl | double(15,3) | YES |  |  |  |  |
| glucurine | char(1) | YES |  |  |  |  |
| blank1 | char(1) | YES |  |  |  |  |
| bun | double(15,3) | YES |  |  |  |  |
| creatinine | double(15,3) | YES |  |  |  |  |
| ua | double(15,3) | YES |  |  |  |  |
| hba1c | double(15,3) | YES |  |  |  |  |
| riskdm | char(1) | YES |  |  |  |  |
| skin_color | varchar(20) | YES |  |  |  |  |
| found_amphetamine | char(1) | YES |  |  |  |  |
| pregnancy | char(1) | YES |  |  |  |  |
| advice7_note | varchar(250) | YES |  |  |  |  |
| checkup | char(1) | YES |  |  |  |  |
| er_note | text | YES |  |  |  |  |
| found_allergy | char(1) | YES |  |  |  |  |
| hpi | text | YES |  |  |  |  |
| pmh | text | YES |  |  |  |  |
| fh | text | YES |  |  |  |  |
| sh | text | YES |  |  |  |  |
| ros | text | YES |  |  |  |  |
| tc | double(15,3) | YES |  |  |  |  |
| ldl | double(15,3) | YES |  |  |  |  |
| ast | double(15,3) | YES |  |  |  |  |
| alt | double(15,3) | YES |  |  |  |  |
| symptom | varchar(200) | YES |  |  |  |  |
| walk_id | int(11) | YES |  |  |  |  |
| peak_flow | int(11) | YES |  |  |  |  |
| cholesterol | double(15,3) | YES |  |  |  |  |
| waist | double(15,3) | YES |  |  |  |  |
| advice8 | char(1) | YES |  |  |  |  |
| breast_feeding | char(1) | YES |  |  |  |  |
| cradle_lie | char(1) | YES |  |  |  |  |
| pain_score | int(11) | YES |  |  |  |  |
| pefr | int(11) | YES |  |  |  |  |
| opdscreen_patient_type_id | int(11) | YES |  |  |  |  |
| creatinine_kidney_percent | double(15,3) | YES |  |  |  |  |
| sodium | double(15,3) | YES |  |  |  |  |
| chloride | double(15,3) | YES |  |  |  |  |
| potassium | double(15,3) | YES |  |  |  |  |
| tco2 | double(15,3) | YES |  |  |  |  |
| smoking_type_id | int(11) | YES |  |  |  |  |
| drinking_type_id | int(11) | YES |  |  |  |  |
| pulse_regulation_type_id | int(11) | YES |  |  |  |  |
| spo2 | double(15,3) | YES |  |  |  |  |
| urine_albumin | double(15,3) | YES |  |  |  |  |
| urine_creatinine | double(15,3) | YES |  |  |  |  |
| pefr_percent | double(15,3) | YES |  |  |  |  |
| macro_albumin | int(11) | YES |  |  |  |  |
| micro_albumin | int(11) | YES |  |  |  |  |
| egfr | double(15,3) | YES |  |  |  |  |
| hb | double(15,3) | YES |  |  |  |  |
| upcr | double(15,3) | YES |  |  |  |  |
| bicarb | double(15,3) | YES |  |  |  |  |
| phosphate | double(15,3) | YES |  |  |  |  |
| pth | double(15,3) | YES |  |  |  |  |
| pe_gy | char(1) | YES |  |  |  |  |
| pe_gy_text | varchar(250) | YES |  |  |  |  |
| pe_gu | char(1) | YES |  |  |  |  |
| pe_gu_text | varchar(250) | YES |  |  |  |  |
| pe_gi | char(1) | YES |  |  |  |  |
| pe_gi_text | varchar(250) | YES |  |  |  |  |
| bsa | double(15,3) | YES |  |  |  |  |
| pe_head | char(1) | YES |  |  |  |  |
| pe_head_text | varchar(250) | YES |  |  |  |  |
| pe_skin | char(1) | YES |  |  |  |  |
| pe_skin_text | varchar(250) | YES |  |  |  |  |
| g6pd | char(1) | YES |  |  |  |  |
| pe_rtf | longtext | YES |  |  |  |  |
| o2sat | int(11) | YES |  |  |  |  |
| pe_pv | char(1) | YES |  |  |  |  |
| pe_pv_text | varchar(250) | YES |  |  |  |  |
| pe_pr | char(1) | YES |  |  |  |  |
| pe_pr_text | varchar(250) | YES |  |  |  |  |
| pe_gen | char(1) | YES |  |  |  |  |
| pe_gen_text | varchar(250) | YES |  |  |  |  |
| pre_pain_score | int(11) | YES |  |  |  |  |
| post_pain_score | int(11) | YES |  |  |  |  |
| head_cricumference | double(15,2) | YES |  |  |  |  |
| fev1_percent | double(15,3) | YES |  |  |  |  |
| pe_rtf_blob | longblob | YES |  |  |  |  |
| bp_stable | char(1) | YES |  |  |  |  |
| pe_chest | char(1) | YES |  |  |  |  |
| pe_chest_text | varchar(150) | YES |  |  |  |  |
| lmp_date | date | YES |  |  |  |  |
| opdscreen_bp_loc_type_id | int(11) | YES |  |  |  |  |
| menstrual_cycle_type_id | int(11) | YES |  |  |  |  |
| adherence_percent | double(15,3) | YES |  |  |  |  |
| fev1_fevc | double(15,3) | YES |  |  |  |  |
| vaccine_screen_type_id | int(11) | YES |  |  |  |  |
| development_screen_type_id | int(11) | YES |  |  |  |  |
| ambu | char(1) | YES |  |  |  |  |
| update_datetime | datetime | YES |  |  |  |  |
| hos_type | varchar(10) | YES |  |  |  |  |
| inr | double(15,3) | YES |  |  |  |  |
| rosendaal_ttr | double(15,3) | YES |  |  |  |  |
| inr_has_bled | int(11) | YES |  |  |  |  |

## Table: iptdiag

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| ipt_diag_id | int(11) | NO | PRI |  |  |  |
| an | varchar(9) | YES | MUL |  |  |  |
| diagtype | char(2) | YES |  |  |  |  |
| doctor | varchar(7) | YES | MUL |  |  |  |
| icd10 | varchar(9) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| staff | varchar(25) | YES |  |  |  |  |
| hn | varchar(9) | YES |  |  |  |  |
| entry_datetime | datetime | YES |  |  |  |  |
| modify_datetime | datetime | YES |  |  |  |  |
| diagnosis_note | varchar(250) | YES |  |  |  |  |
| dx_guid | varchar(38) | YES | MUL |  |  |  |
| diag_no | int(11) | YES |  |  |  |  |

## Table: ovstdiag

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| ovst_diag_id | int(11) | NO | PRI |  |  |  |
| vn | varchar(13) | YES | MUL |  |  |  |
| icd10 | varchar(9) | YES | MUL |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| vstdate | date | YES | MUL |  |  |  |
| vsttime | time | YES |  |  |  |  |
| diagtype | char(2) | YES |  |  |  |  |
| icd103 | char(3) | YES |  |  |  |  |
| hcode | varchar(5) | YES |  |  |  |  |
| doctor | varchar(6) | YES | MUL |  |  |  |
| episode | tinyint(4) | YES |  |  |  |  |
| ext_code | char(2) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| dep_flag | char(2) | YES |  |  |  |  |
| ovst_oper_type | int(11) | YES |  |  |  |  |
| staff | varchar(25) | YES |  |  |  |  |
| dx_guid | varchar(38) | YES |  |  |  |  |
| lock_dx | char(1) | YES |  |  |  |  |
| dx_code_note | varchar(100) | YES |  |  |  |  |
| ovstdiag_severe_type_id | int(11) | YES | MUL |  |  |  |
| diag_no | int(11) | YES |  |  |  |  |
| update_datetime | datetime | YES |  |  |  |  |
| confirm | char(1) | YES |  |  |  |  |
| confirm_staff | varchar(25) | YES |  |  |  |  |
| opi_guid | varchar(38) | YES |  |  |  |  |
| sct_id | varchar(18) | YES |  |  |  |  |

## Table: ward

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| ward | varchar(4) | NO | PRI |  |  |  |
| name | varchar(250) | YES | MUL |  |  |  |
| old_code | varchar(15) | YES | MUL |  |  |  |
| spclty | char(2) | YES |  |  |  |  |
| bedcount | int(11) | YES |  |  |  |  |
| shortname | varchar(20) | YES |  |  |  |  |
| sss_code | varchar(10) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| ward_export_code | varchar(50) | YES |  |  |  |  |
| ward_active | char(1) | YES |  |  |  |  |
| ipd_rx_shift_type_id | int(11) | YES |  |  |  |  |
| select_bedno_from_layout | char(1) | YES |  |  |  |  |
| ip_key | varchar(50) | YES |  |  |  |  |
| strict_access | char(1) | YES |  |  |  |  |
| lock_bedcount | char(1) | YES |  |  |  |  |
| real_bedcount | int(11) | YES |  |  |  |  |

## Table: kskdepartment

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| depcode | char(3) | NO | PRI |  |  |  |
| department | varchar(150) | YES | MUL |  |  |  |
| roomno | varchar(5) | YES |  |  |  |  |
| doctor_code | varchar(7) | YES |  |  |  |  |
| online_time | datetime | YES | MUL |  |  |  |
| on_desk | char(1) | YES |  |  |  |  |
| spclty | char(2) | YES |  |  |  |  |
| screen_visible | char(1) | YES |  |  |  |  |
| doctor_visible | char(1) | YES |  |  |  |  |
| registry_visible | char(1) | YES |  |  |  |  |
| rx_visible | char(1) | YES |  |  |  |  |
| status_open | char(1) | YES |  |  |  |  |
| cashier_visible | char(1) | YES |  |  |  |  |
| medication_check | char(1) | YES |  |  |  |  |
| can_print_sticker | char(1) | YES |  |  |  |  |
| depcode_active | char(1) | YES |  |  |  |  |
| hospital_department_id | int(11) | YES |  |  |  |  |
| print_sticker_check | char(1) | YES |  |  |  |  |
| ot_service_pay | char(1) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| oldcode | varchar(25) | YES |  |  |  |  |
| dep_confirm_code | varchar(10) | YES |  |  |  |  |
| ipd_visible | char(1) | YES |  |  |  |  |
| department_active | char(1) | YES | MUL |  |  |  |
| opd_file_tracking | char(1) | YES |  |  |  |  |
| second_line_text | varchar(100) | YES |  |  |  |  |
| df_percent | double(15,3) | YES |  |  |  |  |
| df_dec_price | char(1) | YES |  |  |  |  |
| current_waiting_time | int(11) | YES |  |  |  |  |
| auto_confirm_medpay | char(1) | YES |  |  |  |  |
| stock_department_id | int(11) | YES |  |  |  |  |
| default_stock_department_id | int(11) | YES |  |  |  |  |
| display_order | int(11) | YES |  |  |  |  |
| check_spclty_wb | char(1) | YES |  |  |  |  |
| refer_point | varchar(5) | YES |  |  |  |  |
| emp_dep_id | int(11) | YES | MUL |  |  |  |
| force_select_doctor | char(1) | YES |  |  |  |  |
| auto_apply_stock_department | char(1) | YES |  |  |  |  |
| force_select_clinic_doctor | char(1) | YES |  |  |  |  |
| show_all_advice_item | char(1) | YES |  |  |  |  |
| show_doctor_regist_queue | char(1) | YES |  |  |  |  |
| opd_qs_location_id | int(11) | YES |  |  |  |  |
| opd_qs_room_id | int(11) | YES |  |  |  |  |
| display_text | varchar(250) | YES |  |  |  |  |
| inv_no_warn_qty0 | char(1) | YES |  |  |  |  |
| force_dx_entry | char(1) | YES |  |  |  |  |
| force_nhso_authen_visit | char(1) | YES |  |  |  |  |
| check_missmatch_spclty | char(1) | YES |  |  |  |  |
| check_missmatch_depcode | char(1) | YES |  |  |  |  |
| ot_service_icode | varchar(7) | YES |  |  |  |  |
| force_screen_smoking | char(1) | YES |  |  |  |  |
| phone_number | varchar(50) | YES |  |  |  |  |
| force_doctor_pe_entry | char(1) | YES |  |  |  |  |
| show_nhso_fee_schedule | char(1) | YES |  |  |  |  |
| show_nhso_confirm_service | char(1) | YES |  |  |  |  |
| claim_nhso_fs_104 | char(1) | YES |  |  |  |  |
| send_moph_dental | char(1) | YES |  |  |  |  |
| home_visit_ai_analyze | char(1) | YES |  |  |  |  |

## Table: opduser

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| loginname | varchar(250) | NO | PRI |  |  |  |
| name | varchar(250) | YES | MUL |  |  |  |
| password | varchar(250) | YES | MUL |  |  |  |
| passweb | varchar(250) | YES |  |  |  |  |
| accessright | text | YES |  |  |  |  |
| department | varchar(250) | YES | MUL |  |  |  |
| departmentposition | varchar(250) | YES |  |  |  |  |
| entryposition | varchar(250) | YES |  |  |  |  |
| picture | longblob | YES |  |  |  |  |
| startfullscreen | char(1) | YES |  |  |  |  |
| doctorcode | varchar(15) | YES | MUL |  |  |  |
| drug_access_level | tinyint(4) | YES |  |  |  |  |
| groupname | varchar(250) | YES | MUL |  |  |  |
| visible_menu | text | YES |  |  |  |  |
| viewallmenu | char(1) | YES |  |  |  |  |
| lab_staff | char(1) | YES |  |  |  |  |
| hospital_department_id | int(11) | YES |  |  |  |  |
| nhso_user | varchar(250) | YES |  |  |  |  |
| nhso_password | varchar(250) | YES |  |  |  |  |
| max_station | int(11) | YES |  |  |  |  |
| show_tip | char(1) | YES |  |  |  |  |
| password_expire_date | date | YES |  |  |  |  |
| password_recheck_date | int(11) | YES |  |  |  |  |
| new_password_date | date | YES |  |  |  |  |
| check_lab_password | char(1) | YES |  |  |  |  |
| pcu_user | char(1) | YES |  |  |  |  |
| account_disable | char(1) | YES |  |  |  |  |
| restrict_ward_access | char(1) | YES |  |  |  |  |
| real_staff | char(1) | YES |  |  |  |  |
| restrict_clinic_access | char(1) | YES |  |  |  |  |
| no_lab_result_display | char(1) | YES |  |  |  |  |
| no_doctor_consult_display | char(1) | YES |  |  |  |  |
| no_announce_display | char(1) | YES |  |  |  |  |
| announce_read_count | int(11) | YES |  |  |  |  |
| xray_staff | char(1) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |
| lab_check_password | char(1) | YES |  |  |  |  |
| cid | varchar(13) | YES | MUL |  |  |  |
| hos_guid_ext | varchar(64) | YES | MUL |  |  |  |
| auto_logout_minute | int(11) | YES |  |  |  |  |
| iclaim_jwt | text | YES |  |  |  |  |
| moph_acc_user | varchar(50) | YES |  |  |  |  |
| moph_acc_password | varchar(250) | YES |  |  |  |  |
| send_moph_otp | char(1) | YES |  |  |  |  |
| password_text | varchar(32) | YES |  |  |  |  |

## Table: pttype

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| pttype | char(2) | NO | PRI |  |  |  |
| name | varchar(250) | YES | MUL |  |  |  |
| editmask | varchar(100) | YES |  |  |  |  |
| isuse | char(1) | YES | MUL |  |  |  |
| pcode | char(2) | YES | MUL |  |  |  |
| requirecode | char(1) | YES |  |  |  |  |
| doctor_fee | char(1) | YES |  |  |  |  |
| fee_code | varchar(7) | YES |  |  |  |  |
| discount | int(11) | YES |  |  |  |  |
| contract | char(1) | YES |  |  |  |  |
| paidst | char(2) | YES |  |  |  |  |
| in_region | char(1) | YES |  |  |  |  |
| uc | char(1) | YES |  |  |  |  |
| require_hcode | char(1) | YES |  |  |  |  |
| oldcode | varchar(5) | YES |  |  |  |  |
| fee_code2 | varchar(7) | YES |  |  |  |  |
| price_type | int(11) | YES |  |  |  |  |
| debtor | char(1) | YES |  |  |  |  |
| noexpire | char(1) | YES |  |  |  |  |
| hipdata_code | varchar(6) | YES | MUL |  |  |  |
| min_age | int(11) | YES |  |  |  |  |
| max_age | int(11) | YES |  |  |  |  |
| bill_sss | char(1) | YES |  |  |  |  |
| bill_type | int(11) | YES |  |  |  |  |
| hipdata_pttype | char(3) | YES |  |  |  |  |
| use_contract_id | char(1) | YES |  |  |  |  |
| yearly_charge | char(1) | YES |  |  |  |  |
| yearly_charge_icode1 | varchar(7) | YES |  |  |  |  |
| yearly_charge_icode2 | varchar(7) | YES |  |  |  |  |
| region_type | int(11) | YES |  |  |  |  |
| pttype_group1 | char(3) | YES |  |  |  |  |
| pttype_group2 | char(3) | YES |  |  |  |  |
| pttype_guid | varchar(38) | YES | MUL |  |  |  |
| max_debt_money | double(15,3) | YES |  |  |  |  |
| allow_finance_edit | char(1) | YES |  |  |  |  |
| print_csmb_statement | char(1) | YES |  |  |  |  |
| pttype_information | longtext | YES |  |  |  |  |
| fee_code_paidst | char(2) | YES |  |  |  |  |
| fee_code2_paidst | char(2) | YES |  |  |  |  |
| debt_due_day | int(11) | YES |  |  |  |  |
| rx_pay_debit_tr | char(1) | YES |  |  |  |  |
| separate_rcpno | char(1) | YES |  |  |  |  |
| rcp_bookno | int(11) | YES |  |  |  |  |
| separate_debt_id | char(1) | YES |  |  |  |  |
| admit_fee_code | varchar(7) | YES |  |  |  |  |
| use_package | char(1) | YES |  |  |  |  |
| charge_df_perday | char(1) | YES |  |  |  |  |
| nhso_code | char(2) | YES | MUL |  |  |  |
| ipd_hour_cut | int(11) | YES |  |  |  |  |
| pttype_spp_id | int(11) | YES | MUL |  |  |  |
| print_presc_ned | char(1) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES |  |  |  |  |
| sks_benefit_plan_type_id | int(11) | YES |  |  |  |  |
| pttype_std_code | char(4) | YES |  |  |  |  |
| export_eclaim | char(1) | YES |  |  |  |  |
| round_money | varchar(1) | YES |  |  |  |  |
| pttype_price_policy_type_id | int(11) | YES |  |  |  |  |
| emp_privilege | char(1) | YES |  |  |  |  |
| is_pttype_plan | char(1) | YES |  |  |  |  |
| finance_round_money | varchar(1) | YES |  |  |  |  |
| emp_financial | char(1) | YES |  |  |  |  |
| pttype_price_group_id | int(11) | YES |  |  |  |  |
| calc_discount | char(1) | YES |  |  |  |  |
| debt_finance_limit | double(15,3) | YES |  |  |  |  |
| debt_finance_pttype | char(2) | YES |  |  |  |  |
| opbkk_type_code | varchar(2) | YES |  |  |  |  |
| ipd_bedcharge_24 | char(1) | YES |  |  |  |  |
| nhso_subinscl | varchar(3) | YES | MUL |  |  |  |
| grouper_version | int(11) | YES |  |  |  |  |
| rx_queue_group_id | int(11) | YES |  |  |  |  |
| inc_round_money | varchar(1) | YES |  |  |  |  |
| hospmain_list | varchar(100) | YES |  |  |  |  |
| grouper_release | varchar(5) | YES |  |  |  |  |
| check_nhso_auth | char(1) | YES |  |  |  |  |
| pttype_upp_type_id | int(11) | YES |  |  |  |  |
| acc_code_opd | varchar(20) | YES |  |  |  |  |
| acc_name_opd | varchar(250) | YES |  |  |  |  |
| acc_code_ipd | varchar(20) | YES |  |  |  |  |
| acc_name_ipd | varchar(200) | YES |  |  |  |  |
| pttype_eclaim_id | varchar(2) | YES |  |  |  |  |
| default_request_funds | char(1) | YES |  |  |  |  |
| SubInscl | varchar(40) | YES |  |  |  |  |

## Table: service_time

| Column | Type | Null | Key | Default | Extra | Comment |
|--------|------|------|-----|---------|-------|---------|
| vn | varchar(13) | NO | PRI |  |  |  |
| hn | varchar(9) | YES | MUL |  |  |  |
| vstdate | date | YES | MUL |  |  |  |
| vsttime | time | YES |  |  |  |  |
| service1 | time | YES |  |  |  |  |
| service2 | time | YES |  |  |  |  |
| service3 | time | YES |  |  |  |  |
| service4 | time | YES |  |  |  |  |
| service5 | time | YES |  |  |  |  |
| service6 | time | YES |  |  |  |  |
| service7 | time | YES |  |  |  |  |
| service8 | time | YES |  |  |  |  |
| staff | varchar(20) | YES |  |  |  |  |
| service9 | time | YES |  |  |  |  |
| service10 | time | YES |  |  |  |  |
| rx_time_type | char(2) | YES | MUL |  |  |  |
| service11 | time | YES |  |  |  |  |
| service12 | time | YES |  |  |  |  |
| service13 | time | YES |  |  |  |  |
| service14 | time | YES |  |  |  |  |
| service15 | time | YES |  |  |  |  |
| service16 | time | YES |  |  |  |  |
| service17 | time | YES |  |  |  |  |
| service18 | time | YES |  |  |  |  |
| service19 | time | YES |  |  |  |  |
| last_send_time | datetime | YES |  |  |  |  |
| service1_dep | char(3) | YES |  |  |  |  |
| service2_dep | char(3) | YES |  |  |  |  |
| service3_dep | char(3) | YES |  |  |  |  |
| service4_dep | char(3) | YES |  |  |  |  |
| service5_dep | char(3) | YES |  |  |  |  |
| service6_dep | char(3) | YES |  |  |  |  |
| service7_dep | char(3) | YES |  |  |  |  |
| service8_dep | char(3) | YES |  |  |  |  |
| service9_dep | char(3) | YES |  |  |  |  |
| service10_dep | char(3) | YES |  |  |  |  |
| service11_dep | char(3) | YES |  |  |  |  |
| service12_dep | char(3) | YES |  |  |  |  |
| service13_dep | char(3) | YES |  |  |  |  |
| service14_dep | char(3) | YES |  |  |  |  |
| service15_dep | char(3) | YES |  |  |  |  |
| service16_dep | char(3) | YES |  |  |  |  |
| service17_dep | char(3) | YES |  |  |  |  |
| service18_dep | char(3) | YES |  |  |  |  |
| service19_dep | char(3) | YES |  |  |  |  |
| service20 | time | YES |  |  |  |  |
| service20_dep | char(3) | YES |  |  |  |  |
| hos_guid | varchar(38) | YES | MUL |  |  |  |

---

# Development Phases - 360° Intelligence Dashboard

## Overview

This document outlines the structured development roadmap divided into 3 phases:
- **Phase 1 (Security & Stabilization):** 2-3 weeks - Critical security fixes, foundation hardening
- **Phase 2 (Core Enhancement):** 4-6 weeks - Feature development, data structures, real-time capabilities
- **Phase 3 (Advanced Features):** 8-12 weeks - Population health, predictive analytics, TypeScript migration

---

## 🔴 PHASE 1: Security Hardening & Stabilization (2-3 weeks)

**Objective:** Remove production-blocking security vulnerabilities and establish solid foundation for Phase 2-3

### 1.1 Remove Authentication Bypass [CRITICAL - BLOCKER]

**File:** `server/middleware/rbac.js` (lines 29-33)

**Problem:** Anonymous users without JWT tokens get director-level access via fallback assignment

**Current Code (BROKEN):**
```javascript
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = { id: 'demo', username: 'demo', role: 'director', full_name: 'Demo User' };
    return next();  // ← SECURITY HOLE: Anyone gets director access!
}
```

**Fixed Code:**
```javascript
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Missing or invalid JWT token'
    });
}
```

**Testing:** All unauthenticated REST endpoints must return 401 Unauthorized

**Acceptance Criteria:**
- [ ] Curl `curl -X GET http://localhost:4000/api/finance/monthly-summary` returns 401
- [ ] Valid JWT tokens still work correctly
- [ ] Role assignments work as expected for authenticated users

---

### 1.2 Migrate User Passwords to Database [CRITICAL - BLOCKER]

**Files to Update:**
- `server/routes/auth.js` (lines 12-31: remove USERS array)
- `server/db/migrations/001_migrate_default_users.sql` (new file)

**Problem:** 5 hardcoded user credentials stored in code: BCH@dm1n2026!, BCHd1r3ct0r!, etc.

**Current Code (BROKEN):**
```javascript
const USERS = [
    { username: 'admin', password_hash: bcrypt.hashSync('BCH@dm1n2026!', 10) },
    { username: 'director', password_hash: bcrypt.hashSync('BCHd1r3ct0r!', 10) },
    // ... 3 more hardcoded passwords
];
```

**Fixed Code Pattern:**
```javascript
// server/routes/auth.js - Updated login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    
    // Query from opduser table instead of hardcoded array
    const user = await dbQueryOne(
        'SELECT loginname, password, name, doctorcode, accessright FROM opduser WHERE loginname = ?',
        [username]
    );
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password (needs to be hashed in database)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check if password change required on first login
    if (user.password_change_required === 'Y') {
        return res.status(403).json({ 
            error: 'Password change required',
            requiresPasswordChange: true,
            tempToken: jwt.sign({ username: user.loginname }, process.env.JWT_SECRET, { expiresIn: '15m' })
        });
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { 
            username: user.loginname, 
            name: user.name,
            role: mapAccessRightToRole(user.accessright)
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
    
    res.json({ token, user: { username: user.loginname, name: user.name } });
});
```

**Migration File:** `server/db/migrations/001_migrate_default_users.sql`
```sql
-- Alter opduser table to support password change requirement
ALTER TABLE opduser ADD COLUMN password_change_required CHAR(1) DEFAULT 'Y' AFTER password;

-- Update existing default users with hashed passwords
UPDATE opduser SET password = ?, password_change_required = 'N' WHERE loginname = 'admin';  -- Hash: BCH@dm1n2026!
UPDATE opduser SET password = ?, password_change_required = 'N' WHERE loginname = 'director';  -- Hash: BCHd1r3ct0r!
-- ... update other 3 default users

-- Add index for faster login lookups
CREATE INDEX idx_opduser_loginname ON opduser(loginname);
```

**Subtask 1.2.1: Force Password Change on First Login**
- Add POST `/api/auth/change-password` endpoint
- Check `password_change_required` flag after successful login
- Return 403 with temp token if flag set
- Temp token valid only for password change endpoint (15 min expiry)

**Acceptance Criteria:**
- [ ] Login endpoint queries opduser table (not hardcoded USERS array)
- [ ] Old passwords still work after migration (backward compatible)
- [ ] First-time users forced to change password
- [ ] Passwords properly bcrypt-hashed in database
- [ ] Migration script runs without errors

---

### 1.3 Implement HTTPS/TLS [CRITICAL]

**File:** `server/server.js` (lines 56-60)

**Current Code (HTTP ONLY):**
```javascript
const server = createServer(app);  // ← No SSL/TLS
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

**Fixed Code:**
```javascript
const isProduction = process.env.NODE_ENV === 'production';

let server;
if (isProduction) {
    // Production: Use HTTPS with certificates
    const fs = require('fs');
    const https = require('https');
    
    const sslKeyPath = process.env.SSL_KEY_PATH;
    const sslCertPath = process.env.SSL_CERT_PATH;
    
    if (!sslKeyPath || !sslCertPath) {
        console.error('ERROR: SSL_KEY_PATH and SSL_CERT_PATH required in production');
        process.exit(1);
    }
    
    const options = {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath)
    };
    
    server = https.createServer(options, app);
    
    // Redirect HTTP to HTTPS
    const httpServer = createServer((req, res) => {
        res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
        res.end();
    });
    httpServer.listen(80, () => {
        console.log('HTTP → HTTPS redirect listening on port 80');
    });
} else {
    // Development: Use HTTP
    server = createServer(app);
}

server.listen(port, () => {
    console.log(`Server running on ${isProduction ? 'HTTPS' : 'HTTP'} port ${port}`);
});
```

**Environment Setup for Production:**
```bash
# Generate self-signed certificate (for development/testing)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Or use Let's Encrypt certificate for production
# Set environment variables:
export NODE_ENV=production
export SSL_KEY_PATH=/etc/ssl/private/key.pem
export SSL_CERT_PATH=/etc/ssl/certs/cert.pem
export JWT_SECRET=<long-random-string-min-32-chars>
```

**Testing:**
- [ ] `curl https://localhost:4000` works (HTTPS connection)
- [ ] `curl http://localhost:4000` redirects to HTTPS
- [ ] Development server still uses HTTP without SSL vars

**Acceptance Criteria:**
- [ ] All production deployments require HTTPS
- [ ] HTTP connections redirected to HTTPS (port 80 → 443)
- [ ] Certificate paths loaded from environment variables
- [ ] Development mode uses HTTP (no HTTPS required)

---

### 1.4 Implement Data Masking Middleware [PDPA Compliance]

**New File:** `server/middleware/dataMasking.js`

**Purpose:** Enforce role-based data filtering for patient information (PDPA compliance)

```javascript
// server/middleware/dataMasking.js

/**
 * Masks patient data based on user role and PDPA requirements
 * - Clinical staff: Full patient data + vitals
 * - Finance: Only HN + demographics (no personal identifiers)
 * - Director/Admin: Aggregated data only
 */

function maskPatientData(patient, userRole) {
    if (!patient) return null;
    
    switch(userRole) {
        case 'clinical':
        case 'nursing':
            // Clinical staff can see all patient data including vitals
            return {
                hn: patient.hn,
                fname: patient.fname,
                lname: patient.lname,
                age_y: patient.age_y,
                sex: patient.sex,
                bloodgrp: patient.bloodgrp,
                birthday: patient.birthday,
                pttype: patient.pttype,
                g6pd: patient.g6pd,
                allergies: patient.drugallergy,
                // NO: cid, contact info, full cid
            };
            
        case 'finance':
            // Finance staff can see HN, age, pttype, and debt info only
            return {
                hn: patient.hn,
                age_y: patient.age_y,
                sex: patient.sex,
                pttype: patient.pttype,
                cid_last4: patient.cid ? patient.cid.slice(-4) : null,  // Last 4 digits only
                // NO: name, contact info, address, medical data
            };
            
        case 'director':
        case 'admin':
            // Directors can see aggregated data only, not individual records
            // Individual patient records should go through aggregation endpoints
            return {
                hn: patient.hn,
                age_bucket: Math.floor(patient.age_y / 10) * 10 + '-' + (Math.floor(patient.age_y / 10) + 1) * 10,  // Bucketed age
                sex: patient.sex,
                pttype: patient.pttype,
                // NO: any identifiable data
            };
            
        default:
            // Unknown role - return empty object (deny by default)
            return null;
    }
}

function maskPatientList(patients, userRole) {
    return patients.map(p => maskPatientData(p, userRole)).filter(p => p !== null);
}

module.exports = {
    maskPatientData,
    maskPatientList
};
```

**Routes to Update (add masking before response):**

1. `server/routes/clinical.js`
```javascript
router.get('/patients/:hn', authenticate, async (req, res) => {
    const patient = await dbQueryOne('SELECT * FROM patient WHERE hn = ?', [req.params.hn]);
    const masked = maskPatientData(patient, req.user.role);
    res.json(masked);
});
```

2. `server/routes/ipd.js`
```javascript
router.get('/occupancy', authenticate, async (req, res) => {
    const patients = await dbQuery(`
        SELECT i.an, p.hn, p.fname, p.lname, p.age_y, p.sex, i.ward
        FROM ipt i
        JOIN patient p ON i.hn = p.hn
        WHERE i.dchdate IS NULL
    `);
    const masked = maskPatientList(patients, req.user.role);
    res.json(masked);
});
```

**Acceptance Criteria:**
- [ ] Clinical staff see full patient data in charts
- [ ] Finance staff cannot see patient names or contact info
- [ ] Directors only see aggregated summary data
- [ ] All /api/clinic/* endpoints apply masking
- [ ] All /api/ipd/* endpoints apply masking
- [ ] All /api/opd/* endpoints apply masking

---

### 1.5 Hardened Environment Validation [Startup Check]

**File:** `server/server.js` - Add at top before app initialization

```javascript
// server/server.js - Environment validation

const requiredEnvVars = [
    'JWT_SECRET',
    'MYSQL_HOST',
    'MYSQL_USER',
    'MYSQL_PASS',
    'MYSQL_DB',
    'SERVER_IP',
    'NODE_ENV'
];

// Check production-specific requirements
if (process.env.NODE_ENV === 'production') {
    requiredEnvVars.push('SSL_KEY_PATH', 'SSL_CERT_PATH');
}

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
    console.error(`❌ FATAL: Missing required environment variables:`);
    missingVars.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
}

// Validate JWT_SECRET strength
if (process.env.JWT_SECRET.length < 32) {
    console.error(`❌ FATAL: JWT_SECRET must be at least 32 characters (currently ${process.env.JWT_SECRET.length})`);
    process.exit(1);
}

console.log(`✅ Environment validation passed`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   MYSQL: ${process.env.MYSQL_HOST}:3306/${process.env.MYSQL_DB}`);
console.log(`   SSL: ${process.env.NODE_ENV === 'production' ? 'ENABLED' : 'DISABLED (dev only)'}`);
```

**Acceptance Criteria:**
- [ ] Server exits with error message if any required env var missing
- [ ] JWT_SECRET must be 32+ characters
- [ ] Production mode requires SSL certificates
- [ ] Development mode can run without SSL
- [ ] Clear console message showing environment validation status

---

### 1.6 Add Structured Logging with Winston [Best Practice]

**New File:** `server/logger.js`

```javascript
// server/logger.js

const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'bch-360-api' },
    transports: [
        // File transportation
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 5242880,  // 5MB
            maxFiles: 5
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 5242880,
            maxFiles: 10
        })
    ]
});

// Console output in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
```

**Update Files:** Replace all `console.log()` calls with `logger.info()`, etc.

```javascript
// Before:
console.log('Database connected');
console.error('Query failed:', error);

// After:
logger.info('Database connected', { host: process.env.MYSQL_HOST });
logger.error('Query failed', { error: error.message, query: sql });
```

**Acceptance Criteria:**
- [ ] INFO logs: API requests, database operations, authentication events
- [ ] ERROR logs: Failed queries, authentication failures, system errors
- [ ] Log files created in `logs/` directory (5MB rotation)
- [ ] Console output in development, file output in production
- [ ] Structured JSON logs for ELK/monitoring integration

---

## Summary: Phase 1 Deliverables

| Task | File(s) | Duration | Risk | Status |
|------|---------|----------|------|--------|
| Remove auth bypass | rbac.js | 30 min | 🔴 Critical | ⏳ Blocked |
| Migrate passwords to DB | auth.js, migration SQL | 4h | 🔴 Critical | ⏳ Blocked |
| Implement HTTPS | server.js | 2h | 🔴 Critical | ⏳ Blocked |
| Add data masking | dataMasking.js, (6 routes) | 6h | 🟡 High | ⏳ Blocked |
| Environment validation | server.js | 1h | 🟡 High | ⏳ Blocked |
| Structured logging | logger.js, (12 files) | 3h | 🟢 Medium | ⏳ Blocked |
| **TOTAL** | | **16.5h / ~2-3 weeks** | | |

---

## 🟡 PHASE 2: Core Features Enhancement (4-6 weeks)

**Objective:** Add vital signs time-series, debt aging, real-time occupancy, and input validation

*Dependencies: Phase 1 must be complete*

### 2.1 Create Vital Signs Time-Series Table [Clinical Safety]

**Problem:** AN_STAT only stores LAST vital signs snapshot (last_bps, last_bpd, last_temperature), no history for EWS trending

**New Table:** `ipt_vitals`

```sql
-- server/db/migrations/002_create_ipt_vitals.sql

CREATE TABLE ipt_vitals (
    ipt_vital_id INT AUTO_INCREMENT PRIMARY KEY,
    an VARCHAR(9) NOT NULL,
    hn VARCHAR(9),
    check_datetime DATETIME NOT NULL,
    
    -- Vital signs (NEWS2 parameters)
    rr DOUBLE,           -- Respiratory rate
    spo2 DOUBLE,         -- Oxygen saturation
    bps INT,            -- Systolic BP
    bpd INT,            -- Diastolic BP
    pulse INT,          -- Heart rate
    temperature DOUBLE,  -- Body temperature
    
    -- AI/Risk scoring
    news2_score INT,
    news2_risk_level VARCHAR(20),  -- 'low', 'medium', 'high', 'critical'
    
    -- Audit
    created_by VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    KEY idx_an_datetime (an, check_datetime),
    KEY idx_risk_level (news2_risk_level, check_datetime),
    KEY idx_hn (hn),
    
    FOREIGN KEY (an) REFERENCES ipt(an)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create view for last 24h vitals per patient
CREATE VIEW ipt_vital_last24h AS
SELECT 
    an, hn,
    MAX(check_datetime) as last_check_time,
    COUNT(*) as check_count,
    MIN(news2_score) as min_news2,
    MAX(news2_score) as max_news2,
    AVG(news2_score) as avg_news2,
    MAX(IF(news2_risk_level='critical', 1, 0)) as had_critical
FROM ipt_vitals
WHERE check_datetime > DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY an, hn;
```

**New Endpoints:**

1. **POST** `/api/ipd/vitals` - Log new vital signs
```javascript
router.post('/vitals', authenticate, async (req, res) => {
    const { an, hn, rr, spo2, bps, bpd, pulse, temperature } = req.body;
    
    // Validate input
    if (!an || rr == null || spo2 == null || bps == null || bpd == null || 
        pulse == null || temperature == null) {
        return res.status(400).json({ error: 'Missing required vital signs' });
    }
    
    // Calculate NEWS2 score
    const news2 = calculateNEWS2({ rr, spo2, bps, bpd, pulse, temperature });
    
    // Insert into ipt_vitals
    await dbQuery(`
        INSERT INTO ipt_vitals 
        (an, hn, check_datetime, rr, spo2, bps, bpd, pulse, temperature, 
         news2_score, news2_risk_level, created_by)
        VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [an, hn, rr, spo2, bps, bpd, pulse, temperature, 
        news2.total_score, news2.risk_level, req.user.username]);
    
    // Alert if critical
    if (news2.risk_level === 'critical') {
        io.emit('clinical_alert', {
            type: 'HIGH_EWS',
            an: an,
            hn: hn,
            news2_score: news2.total_score,
            timestamp: new Date()
        });
    }
    
    res.json({ success: true, news2_score: news2.total_score, risk_level: news2.risk_level });
});
```

2. **GET** `/api/ipd/:an/vitals-history` - 24h vital trend
```javascript
router.get('/:an/vitals-history', authenticate, async (req, res) => {
    const vitals = await dbQuery(`
        SELECT check_datetime, rr, spo2, bps, bpd, pulse, temperature, 
               news2_score, news2_risk_level
        FROM ipt_vitals
        WHERE an = ? AND check_datetime > DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ORDER BY check_datetime ASC
    `, [req.params.an]);
    
    res.json(vitals);
});
```

3. **GET** `/api/ipd/high-risk-patients` - Filter by latest NEWS2
```javascript
router.get('/high-risk-patients', authenticate, async (req, res) => {
    const patients = await dbQuery(`
        SELECT DISTINCT i.an, p.hn, p.fname, p.lname, p.age_y,
               iv.check_datetime, iv.news2_score, iv.news2_risk_level
        FROM ipt i
        JOIN patient p ON i.hn = p.hn
        JOIN ipt_vitals iv ON i.an = iv.an
        WHERE i.dchdate IS NULL
        AND (iv.news2_score >= 5 OR iv.news2_risk_level IN ('high', 'critical'))
        AND iv.check_datetime = (
            SELECT MAX(check_datetime) FROM ipt_vitals iv2 WHERE iv2.an = i.an
        )
        ORDER BY iv.news2_score DESC
    `);
    
    res.json(maskPatientList(patients, req.user.role));
});
```

**Integration with NEWS2 Engine:**
```javascript
// server/ai/ewsEngine.js - Already implemented
function calculateNEWS2(vitals) {
    let score = 0;
    let breakdown = {};
    
    // Respiratory rate scoring (3 points max)
    if (vitals.rr <= 8 || vitals.rr >= 25) score += 3;
    else if (vitals.rr >= 21 && vitals.rr <= 24) score += 2;
    else if (vitals.rr >= 9 && vitals.rr <= 11) score += 1;
    
    // ... other vital sign scoring ...
    
    const risk_level = score >= 7 ? 'critical' : 
                       score >= 5 ? 'high' : 
                       score >= 3 ? 'medium' : 'low';
    
    return { total_score: score, risk_level, breakdown };
}
```

**Acceptance Criteria:**
- [ ] ipt_vitals table created and indexed
- [ ] POST endpoint logs vital signs with NEWS2 calculation
- [ ] GET history endpoint returns 24h trend data
- [ ] High-risk patients filterable by NEWS2 score
- [ ] Critical alerts trigger WebSocket notifications
- [ ] Role-based data masking applied to patient names

---

### 2.2 Add Debt Aging Analysis [Financial Management]

**Problem:** No visibility into aging of accounts receivable; remain_money in vn_stat/an_stat doesn't show timing

**New Table:** `patient_debt_history`

```sql
-- server/db/migrations/003_create_debt_history.sql

CREATE TABLE patient_debt_history (
    debt_id INT AUTO_INCREMENT PRIMARY KEY,
    an VARCHAR(9),
    vn VARCHAR(13),
    hn VARCHAR(9) NOT NULL,
    
    -- Debt tracking
    original_amount DOUBLE(15, 3),
    remain_amount DOUBLE(15, 3),
    due_date DATE NOT NULL,
    
    -- Timeline
    created_date DATE NOT NULL DEFAULT CURDATE(),
    paid_date DATE,
    payment_amount DOUBLE(15, 3),
    payment_method VARCHAR(20),  -- 'cash', 'installment', 'waived', 'written_off'
    
    -- Aging calculation
    days_overdue INT GENERATED ALWAYS AS (
        CASE 
            WHEN paid_date IS NOT NULL THEN 0
            ELSE DATEDIFF(CURDATE(), due_date)
        END
    ) STORED,
    
    aging_bucket VARCHAR(20) GENERATED ALWAYS AS (
        CASE
            WHEN paid_date IS NOT NULL THEN 'paid'
            WHEN DATEDIFF(CURDATE(), due_date) < 0 THEN 'not_due'
            WHEN DATEDIFF(CURDATE(), due_date) <= 30 THEN '0-30_days'
            WHEN DATEDIFF(CURDATE(), due_date) <= 60 THEN '31-60_days'
            WHEN DATEDIFF(CURDATE(), due_date) <= 90 THEN '61-90_days'
            ELSE '>90_days'
        END
    ) STORED,
    
    -- Audit
    created_by VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    KEY idx_hn (hn),
    KEY idx_due_date (due_date),
    KEY idx_aging_bucket (aging_bucket),
    KEY idx_created_date (created_date),
    KEY idx_unpaid (paid_date, remain_amount),
    
    FOREIGN KEY (hn) REFERENCES patient(hn)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create summary view for aging dashboard
CREATE VIEW debt_aging_summary AS
SELECT 
    aging_bucket,
    COUNT(DISTINCT hn) as patient_count,
    COUNT(*) as debt_incident_count,
    SUM(remain_amount) as total_debt_amount,
    MIN(due_date) as oldest_debt_date,
    AVG(remain_amount) as avg_debt_amount
FROM patient_debt_history
WHERE paid_date IS NULL
GROUP BY aging_bucket;
```

**New Endpoints:**

1. **GET** `/api/finance/debt-aging` - Aging analysis
```javascript
router.get('/debt-aging', authenticate, requireRole('finance'), async (req, res) => {
    const summary = await dbQuery(`
        SELECT aging_bucket, patient_count, debt_incident_count, 
               total_debt_amount, oldest_debt_date, avg_debt_amount
        FROM debt_aging_summary
    `);
    
    res.json(summary);
});
```

2. **GET** `/api/finance/debt-aging/details` - Detailed patient list
```javascript
router.get('/debt-aging/details', authenticate, requireRole('finance'), async (req, res) => {
    const bucket = req.query.bucket || '>90_days';  // Filter by aging bucket
    
    const details = await dbQuery(`
        SELECT pdh.debt_id, pdh.hn, p.fname, p.lname, pdh.remain_amount,
               pdh.due_date, pdh.days_overdue, pdh.aging_bucket,
               pdh.created_date, pdh.payment_method
        FROM patient_debt_history pdh
        JOIN patient p ON pdh.hn = p.hn
        WHERE pdh.aging_bucket = ? AND pdh.paid_date IS NULL
        ORDER BY pdh.days_overdue DESC
        LIMIT 100
    `, [bucket]);
    
    res.json(maskPatientList(details, req.user.role));
});
```

3. **POST** `/api/finance/debt-aging/record-payment` - Log debt payment
```javascript
router.post('/debt-aging/record-payment', authenticate, requireRole('finance'), async (req, res) => {
    const { debt_id, payment_amount, payment_method, payment_date } = req.body;
    
    const updated = await dbQuery(`
        UPDATE patient_debt_history 
        SET paid_date = ?, payment_amount = ?, payment_method = ?
        WHERE debt_id = ?
    `, [payment_date || new Date(), payment_amount, payment_method, debt_id]);
    
    res.json({ success: true, updated_debt_id: debt_id });
});
```

**Acceptance Criteria:**
- [ ] patient_debt_history table tracks all outstanding debts
- [ ] Aging buckets (0-30, 31-60, 61-90, >90 days) calculated automatically
- [ ] Debt aging summary endpoint returns pie chart data
- [ ] Finance staff can view detailed patient debt list by aging bucket
- [ ] Payment recording updates paid_date and payment_amount
- [ ] Dashboard chart shows debt distribution by aging bracket

---

### 2.3 Real-Time Occupancy Synchronization [Bed Management]

**Problem:** Occupancy dashboard static; requires manual refresh to see bed changes

**Solution:** Cache occupancy every 30 minutes with WebSocket updates

```javascript
// server/jobs/syncOccupancy.js - New file

const cron = require('node-cron');
const db = require('../db/mysql.js');

// Run every 30 minutes
const job = cron.schedule('*/30 * * * *', async () => {
    console.log('[OCCUPANCY] Syncing IPD occupancy...');
    
    try {
        const currentOccupancy = await db.dbQuery(`
            SELECT 
                i.an, i.ward, i.cur_bedno,
                DATEDIFF(NOW(), i.regdate) as stay_days,
                p.hn, p.fname, p.lname, p.age_y, p.sex,
                i.drg, ans.last_sos_score as risk_flag,
                ans.last_bps, ans.last_bpd, ans.last_temperature
            FROM ipt i
            JOIN patient p ON i.hn = p.hn
            LEFT JOIN an_stat ans ON i.an = ans.an
            WHERE i.dchdate IS NULL
            ORDER BY i.ward, CAST(i.cur_bedno AS UNSIGNED)
        `);
        
        // Group by ward
        const occupancyByWard = {};
        currentOccupancy.forEach(occ => {
            if (!occupancyByWard[occ.ward]) {
                occupancyByWard[occ.ward] = [];
            }
            occupancyByWard[occ.ward].push(occ);
        });
        
        // Cache in memory/Redis
        global.occupancyCache = {
            lastUpdated: new Date(),
            data: occupancyByWard,
            totalOccupied: currentOccupancy.length
        };
        
        console.log(`[OCCUPANCY] Updated ${currentOccupancy.length} beds across ${Object.keys(occupancyByWard).length} wards`);
        
        // Broadcast via WebSocket
        if (global.io) {
            global.io.emit('occupancy_updated', {
                timestamp: new Date(),
                totalOccupied: currentOccupancy.length,
                byWard: Object.keys(occupancyByWard).map(ward => ({
                    ward,
                    occupied: occupancyByWard[ward].length
                }))
            });
        }
        
    } catch(error) {
        logger.error('[OCCUPANCY] Sync failed', { error: error.message });
    }
});

module.exports = { job };
```

**New Endpoint:**

```javascript
// server/routes/ipd.js - Add occupancy endpoint

router.get('/occupancy-now', authenticate, (req, res) => {
    // Return cached occupancy (instant response)
    if (!global.occupancyCache) {
        return res.status(503).json({ error: 'Occupancy data not yet cached' });
    }
    
    res.json({
        lastUpdated: global.occupancyCache.lastUpdated,
        totalOccupied: global.occupancyCache.totalOccupied,
        byWard: global.occupancyCache.data
    });
});
```

**Acceptance Criteria:**
- [ ] syncOccupancy.js runs every 30 minutes
- [ ] Occupancy cached in memory for instant API response
- [ ] WebSocket event emitted after each sync
- [ ] Frontend updates occupancy map without full page refresh
- [ ] Timestamp shows when data was last updated

---

### 2.4 Input Validation on All Query Parameters [Security]

**File:** Create/expand `server/middleware/validate.js`

```javascript
// server/middleware/validate.js

const z = require('zod');

/**
 * Middleware factory for query/body parameter validation
 * @param {z.ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
function validate(schema) {
    return (req, res, next) => {
        try {
            const validated = schema.parse(req.query);  // or req.body for POST
            req.validated = validated;
            next();
        } catch(error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: 'Invalid parameters',
                    details: error.errors.map(e => ({
                        field: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            res.status(500).json({ error: 'Validation error' });
        }
    };
}

module.exports = { validate };
```

**Apply to Routes:**

```javascript
// server/routes/finance.js - Example application

const { validate } = require('../middleware/validate.js');
const z = require('zod');

// Validation schemas
const monthlyQuerySchema = z.object({
    year: z.coerce.number().int().min(2000).max(2100).optional(),
});

const claimsQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(1000).default(100),
    offset: z.coerce.number().int().min(0).default(0),
    dateFrom: z.string().date().optional(),
    dateTo: z.string().date().optional(),
});

const debtAging QuerySchema = z.object({
    bucket: z.enum(['0-30_days', '31-60_days', '61-90_days', '>90_days']).optional(),
    limit: z.coerce.number().int().min(1).max(500).default(100),
});

// Routes with validation
router.get('/monthly-summary', authenticate, validate(monthlyQuerySchema), async (req, res) => {
    // req.validated now contains sanitized params
    const { year } = req.validated;
    // ... route logic
});

router.get('/claims', authenticate, validate(claimsQuerySchema), async (req, res) => {
    const { limit, offset, dateFrom, dateTo } = req.validated;
    // ... route logic
});

router.get('/debt-aging/details', authenticate, validate(debtAgingQuerySchema), async (req, res) => {
    const { bucket } = req.validated;
    // ... route logic
});
```

**Acceptance Criteria:**
- [ ] All routes with query params use Zod validation
- [ ] Invalid parameters return 400 with clear error messages
- [ ] Number ranges enforced (e.g., year 2000-2100)
- [ ] Date formats validated (ISO 8601)
- [ ] Enum fields restrict to allowed values
- [ ] No SQL injection possible through invalid params

---

### 2.5 Add Request ID Tracking [Observability]

**File:** `server/server.js` - Add early middleware

```javascript
// server/server.js

const { v4: uuidv4 } = require('uuid');

// Add request ID tracking
app.use((req, res, next) => {
    req.id = req.headers['x-request-id'] || uuidv4();
    res.setHeader('X-Request-ID', req.id);
    
    logger.info(`${req.method} ${req.path}`, {
        requestId: req.id,
        ip: req.ip,
        user: req.user?.username || 'anonymous'
    });
    
    // Track response time
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.path} completed`, {
            requestId: req.id,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });
    
    next();
});
```

**Acceptance Criteria:**
- [ ] Every request gets unique X-Request-ID header
- [ ] Header preserved through distributed tracing
- [ ] Request IDs logged with all output
- [ ] Response times tracked and logged
- [ ] Dashboard can filter logs by request ID

---

### 2.6 Enable Content-Security-Policy [Security]

**File:** `server/server.js` - Replace helmet CSP configuration

```javascript
// server/server.js - Line 72

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],  // React requires unsafe-inline for dev
            connectSrc: [
                "'self'", 
                "ws://localhost:*",  // WebSocket for development
                "wss://localhost:*"  // WebSocket secure for production
            ],
            imgSrc: ["'self'", "data:"],
            styleSrc: ["'self'", "'unsafe-inline'"],  // Tailwind requires unsafe-inline
            fontSrc: ["'self'"],
            frameSrc: ["'none'"],  // Prevent click-jacking
            objectSrc: ["'none'"]  // Prevent plugin-based attacks
        }
    }
}));
```

**Acceptance Criteria:**
- [ ] CSP headers present in all responses
- [ ] No inline scripts allowed (except React)
- [ ] WebSocket connections work for real-time features
- [ ] External resources restricted to localhost in dev
- [ ] Browser console shows no CSP violations

---

## Summary: Phase 2 Deliverables

| Task | File(s) | Duration | Dependencies |
|------|---------|----------|---|
| Vital signs time-series | ipt_vitals table, 3 endpoints | 8h | Phase 1 ✅ |
| Debt aging analysis | patient_debt_history table, 3 endpoints | 6h | Phase 1 ✅ |
| Real-time occupancy sync | syncOccupancy.js, 1 endpoint | 4h | Phase 1 ✅ |
| Input validation | validate.js middleware, apply to 6 routes | 5h | Phase 1 ✅ |
| Request ID tracking | Middleware, logging integration | 2h | Phase 1 ✅ |
| Content-Security-Policy | helmet config in server.js | 1h | Phase 1 ✅ |
| **TOTAL** | | **26h / ~4-6 weeks** | |

---

## 🟢 PHASE 3: Advanced Features & Optimization (8-12 weeks)

**Objective:** Population health management, predictive analytics, code modernization

*Dependencies: Phase 2 must be complete*

### 3.1 NCD Chronic Disease Registry [Population Health]

Build comprehensive chronic disease tracking for DM, HT, CKD, COPD, IHD, Stroke

**New Tables:**
```sql
CREATE TABLE ncd_patient (
    ncd_reg_id INT AUTO_INCREMENT PRIMARY KEY,
    hn VARCHAR(9) NOT NULL,
    ncd_type VARCHAR(10) NOT NULL,  -- 'DM', 'HT', 'CKD', 'COPD', 'IHD', 'STROKE'
    registration_date DATE DEFAULT CURDATE(),
    last_visit_date DATE,
    status VARCHAR(20),  -- 'active', 'lost_to_followup', 'discharged', 'deceased'
    risk_level INT,
    KEY (hn, ncd_type), KEY (registration_date), KEY (status)
);

CREATE TABLE ncd_follow_up (
    followup_id INT AUTO_INCREMENT PRIMARY KEY,
    ncd_reg_id INT NOT NULL,
    hn VARCHAR(9),
    visit_date DATE,
    visit_type VARCHAR(20),  -- 'routine', 'urgent', 'teleconsult'
    fbs DOUBLE, hba1c DOUBLE, bps INT, bpd INT,
    weight DOUBLE, ldl DOUBLE,
    medication_adherence INT,  -- 0-100%
    complication_flag CHAR(1),
    next_visit_date DATE,
    created_by VARCHAR(25),
    FOREIGN KEY (ncd_reg_id) REFERENCES ncd_patient(ncd_reg_id)
);

CREATE TABLE ncd_risk_score (
    risk_id INT AUTO_INCREMENT PRIMARY KEY,
    hn VARCHAR(9),
    calculated_date DATE DEFAULT CURDATE(),
    cvd_risk_percent INT,  -- 10-year CVD risk
    ckd_risk_stage INT,    -- CKD eGFR stage
    mortality_risk_percent INT,
    KEY (hn, calculated_date)
);
```

**New Endpoints:**
- GET /api/ncd/registry - All patients with NCD
- GET /api/ncd/overdue-followup - Patients >30 days since visit
- GET /api/ncd/risk-stratification - High/medium/low risk breakdown
- POST /api/ncd/register - Enroll new patient
- POST /api/ncd/followup - Log visit

### 3.2 Pregnancy Follow-Up Registry [Maternal Health]

Track continuum of maternal care from OPD through IPD delivery

### 3.3 TypeScript Migration [Code Quality]

Gradual migration to TypeScript:
- Phase 3a: db/, middleware/, ai/ modules (Week 1-2)
- Phase 3b: routes/ modules (Week 3-4)
- Phase 3c: React components to .tsx (Week 5+)

### 3.4 Community Health Center Integration [Scalability]

Link primary care follow-ups to community health volunteers

### 3.5 Advanced Analytics Dashboard [Executive Insights]

Add 30/90-day trends, YoY comparisons, predictions

---

End of Development Phases

