// ============================================================
// Fixture factory for `ovst` rows (OPD visit)
// ============================================================
let idSeq = 1_000_000;

export function ovstFactory(overrides = {}) {
    const n = idSeq++;
    return {
        vn: `VN${String(n).padStart(9, '0')}`,
        hn: `HN${String(n % 100000).padStart(6, '0')}`,
        vstdate: new Date().toISOString().slice(0, 10),
        vsttime: '09:00:00',
        dep: '001',
        pdx: 'I10',
        ovstost: '99',
        doctor: 'DOC-001',
        ...overrides,
    };
}

/** Generate an array of ovst rows. */
export function ovstList(count, overrides = () => ({})) {
    return Array.from({ length: count }, (_, i) => ovstFactory({ ...(typeof overrides === 'function' ? overrides(i) : overrides) }));
}

/** Helper: build a completed visit with specific wait-time offsets. */
export function completedVisit({ waitTotalMin = 30, vstdate = '2026-04-23', vsttime = '09:00:00' } = {}) {
    const arrival = new Date(`${vstdate}T${vsttime}+07:00`);
    const service1 = addMin(arrival, 10);    // screening
    const service2 = addMin(arrival, 20);    // doctor
    const service7 = addMin(arrival, waitTotalMin);  // pharmacy
    return {
        ...ovstFactory({ vstdate, vsttime }),
        opd_service: {
            service1: toTime(service1),
            service2: toTime(service2),
            service7: toTime(service7),
        },
    };
}

function addMin(d, m) { return new Date(d.getTime() + m * 60_000); }
function toTime(d) { return d.toISOString().slice(11, 19); }
