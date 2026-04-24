import { dbQuery } from './server/db/mysql.js';
dbQuery("SELECT lo.lab_items_name_ref as name, lo.lab_order_result as result FROM lab_head lh JOIN lab_order lo ON lo.lab_order_number = lh.lab_order_number WHERE lh.hn = '000888483' AND lo.abnormal_result = 'Y'").then(console.log).catch(console.error).finally(() => process.exit(0));
