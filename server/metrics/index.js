// ============================================================
// Metric Registry — central index (23 metrics)
// ============================================================

/** Load all metric modules once and return their definitions. */
export async function listMetrics() {
    const mods = await Promise.all([
        // OPD
        import('./opd/waitTime.js'),
        import('./opd/throughput.js'),
        import('./opd/dropout.js'),
        import('./opd/sla.js'),
        import('./opd/dpi.js'),
        import('./opd/revisit.js'),
        // IPD
        import('./ipd/los.js'),
        import('./ipd/readmission30d.js'),
        import('./ipd/occupancy.js'),
        import('./ipd/adjrw.js'),
        import('./ipd/cmi.js'),
        // ER
        import('./er/timeToDoctor.js'),
        import('./er/boarding.js'),
        import('./er/leftWithoutSeen.js'),
        import('./er/surge.js'),
        // Finance
        import('./finance/revenue.js'),
        import('./finance/denialRate.js'),
        import('./finance/underCharging.js'),
        import('./finance/arBalance.js'),
        import('./finance/collectionRate.js'),
        import('./finance/yoyGrowth.js'),
        // Clinical
        import('./clinical/news2.js'),
        import('./clinical/sepsisBundle.js'),
        import('./clinical/mortalityRisk.js'),
        // NCD
        import('./ncd/goalAttainment.js'),
        import('./ncd/hba1cControl.js'),
    ]);
    return mods.map(m => m.metric).filter(Boolean);
}

/** Convenience: a compute fn by metric id. */
export async function computeById(id, params) {
    const mapping = {
        // OPD
        'opd.waitTime.avgTotalMinutes': () => import('./opd/waitTime.js'),
        'opd.throughput.visitsPerHour': () => import('./opd/throughput.js'),
        'opd.dropout.rate': () => import('./opd/dropout.js'),
        'opd.sla.percent': () => import('./opd/sla.js'),
        'opd.dpi.compositeScore': () => import('./opd/dpi.js'),
        'opd.revisit.rate': () => import('./opd/revisit.js'),
        // IPD
        'ipd.los.averageDays': () => import('./ipd/los.js'),
        'ipd.readmission30d.rate': () => import('./ipd/readmission30d.js'),
        'ipd.occupancy.percent': () => import('./ipd/occupancy.js'),
        'ipd.adjrw.sum': () => import('./ipd/adjrw.js'),
        'ipd.cmi.caseMixIndex': () => import('./ipd/cmi.js'),
        // ER
        'er.timeToDoctor.minutes': () => import('./er/timeToDoctor.js'),
        'er.boarding.hours': () => import('./er/boarding.js'),
        'er.leftWithoutSeen.rate': () => import('./er/leftWithoutSeen.js'),
        'er.surge.ratio': () => import('./er/surge.js'),
        // Finance
        'finance.revenue.total': () => import('./finance/revenue.js'),
        'finance.denialRate.percent': () => import('./finance/denialRate.js'),
        'finance.underCharging.suspectCount': () => import('./finance/underCharging.js'),
        'finance.arBalance.total': () => import('./finance/arBalance.js'),
        'finance.collectionRate.percent': () => import('./finance/collectionRate.js'),
        'finance.yoyGrowth.percent': () => import('./finance/yoyGrowth.js'),
        // Clinical
        'clinical.news2.criticalCount': () => import('./clinical/news2.js'),
        'clinical.sepsisBundle.compliance': () => import('./clinical/sepsisBundle.js'),
        'clinical.mortalityRisk.highCount': () => import('./clinical/mortalityRisk.js'),
        // NCD
        'ncd.goalAttainment.rate': () => import('./ncd/goalAttainment.js'),
        'ncd.hba1cControl.average': () => import('./ncd/hba1cControl.js'),
    };
    const loader = mapping[id];
    if (!loader) throw new Error(`unknown metric id: ${id}`);
    const mod = await loader();
    return mod.compute(params);
}
