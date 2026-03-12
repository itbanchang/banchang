import fs from 'fs';

let lines = fs.readFileSync('server/server.js', 'utf8').split('\n');

const startIndex = 455; // Line 456 (0-indexed 455)
const endIndex = 2866; // Line 2867 (0-indexed 2866)

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

lines.splice(startIndex, endIndex - startIndex, insertText);

const importTarget = "import authRoutes from './routes/auth.js';";
const importIdx = lines.findIndex(l => l.includes(importTarget));

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
