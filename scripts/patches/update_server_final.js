import fs from 'fs';

const lines = fs.readFileSync('server/server.js', 'utf8').split('\n');

const opdIdx = lines.findIndex(l => l.includes('// 🏥 OPD (Outpatient Department)'));
const eEndIdx = lines.findIndex(l => l.includes('// WebSocket — Real-time Updates'));

console.log('opdIdx', opdIdx);
console.log('eEndIdx', eEndIdx);

if (opdIdx !== -1 && eEndIdx !== -1) {
    const importIdx = lines.findIndex(l => l.includes("import clinicalRoutes from './routes/clinical.js';"));

    const insertText = [
        "app.use('/api/opd', opdRoutes);",
        "app.use('/api/ai', aiRoutes);",
        "app.use('/api/er', erRoutes);",
        "app.use('/api/dental', dentalRoutes);",
        "app.use('/api/thaimedicine', thaimedRoutes);",
        "app.use('/api/physicaltherapy', ptRoutes);",
        "app.use('/api/ncd', ncdRoutes);",
        "app.use('/api/medrec', medrecRoutes);",
        "app.use('/api/debug', debugRoutes);"
    ].join('\n') + '\n\n';

    let actualStart = opdIdx;
    while (actualStart > 0 && typeof lines[actualStart - 1] === 'string' && (lines[actualStart - 1].startsWith('//') || lines[actualStart - 1].trim() === '')) {
        actualStart--;
    }

    // Check if we already replaced
    if (!lines.some(l => l.includes("app.use('/api/opd', opdRoutes);"))) {
        lines.splice(actualStart, eEndIdx - actualStart, insertText);

        if (importIdx !== -1) {
            lines.splice(importIdx + 1, 0,
                "import opdRoutes from './routes/opd.js';\n" +
                "import aiRoutes from './routes/ai_routes.js';\n" +
                "import erRoutes from './routes/er.js';\n" +
                "import dentalRoutes from './routes/dental.js';\n" +
                "import thaimedRoutes from './routes/thaimedicine.js';\n" +
                "import ptRoutes from './routes/physicaltherapy.js';\n" +
                "import ncdRoutes from './routes/ncd.js';\n" +
                "import medrecRoutes from './routes/medrec.js';\n" +
                "import debugRoutes from './routes/debug.js';"
            );
        }

        fs.writeFileSync('server/server.js', lines.join('\n'));
        console.log('Successfully updated server.js');
    } else {
        console.log('Already updated or found opdRoutes use statement.');
    }
}
