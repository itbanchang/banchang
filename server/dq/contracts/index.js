// ============================================================
// DQ Schema Contracts — each contract validates a HOSxP table
// ============================================================
import { check as checkOvst } from './ovst.js';
import { check as checkIpt } from './ipt.js';
import { check as checkOpitemrece } from './opitemrece.js';

export async function checkAllContracts() {
    const results = await Promise.all([
        checkOvst(),
        checkIpt(),
        checkOpitemrece(),
    ]);
    return results.map(r => ({ ...r, check: `contract.${r.table}` }));
}
