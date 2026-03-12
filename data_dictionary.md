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

