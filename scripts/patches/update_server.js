import fs from 'fs';

const lines = fs.readFileSync('server/server.js', 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('// 🏥 OPD (Outpatient Department) — HOSxP XE'));
const endIdx = lines.findIndex(l => l.includes('// WebSocket — Real-time Updates + Alert Detection'));

console.log('startIdx:', startIdx);
console.log('endIdx:', endIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const originalText = lines.slice(startIdx - 1, endIdx - 1).join('\n');
    console.log('Removing', originalText.split('\n').length, 'lines.');

    // The exact text we want to insert
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

    lines.splice(startIdx - 1, endIdx - startIdx, insertText);

    // Add imports to the top
    const importIdx = lines.findIndex(l => l.includes("import clinicalRoutes from './routes/clinical.js';"));
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
    console.log('Update Complete.');
} else {
    console.log('Could not find start or end index.');
}
