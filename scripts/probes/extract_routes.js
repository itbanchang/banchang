import fs from 'fs';

const lines = fs.readFileSync('server/server.js', 'utf8').split('\n');

const sections = [
    { file: 'dental.js', start: 1607, end: 1999, prefix: 'dental' },
    { file: 'thaimedicine.js', start: 2004, end: 2207, prefix: 'thaimedicine' },
    { file: 'physicaltherapy.js', start: 2213, end: 2391, prefix: 'physicaltherapy' },
    { file: 'ncd.js', start: 2397, end: 2616, prefix: 'ncd' },
    { file: 'medrec.js', start: 2621, end: 2809, prefix: 'medrec' },
    { file: 'debug.js', start: 1567, end: 1606, prefix: 'debug' }
];

sections.forEach(sec => {
    const secLines = lines.slice(sec.start - 1, sec.end);
    let content = secLines.join('\n');
    const getRegex = new RegExp(`app\\.get\\('/api/${sec.prefix}/`, 'g');
    const postRegex = new RegExp(`app\\.post\\('/api/${sec.prefix}/`, 'g');
    content = content.replace(getRegex, `router.get('/`);
    content = content.replace(postRegex, `router.post('/`);
    if (sec.prefix === 'debug') {
        content = content.replace(/app\.get\('\/api\/debug\//g, `router.get('/`);
    }

    let aiImport = '';
    if (content.includes('ai.')) {
        aiImport = `\nimport ai from './ai.js';`;
    }

    const header = `import { Router } from 'express';\nimport { cached } from '../cache/staleCache.js';\nimport { dbQuery, dbQueryOne } from '../db/mysql.js';\nimport { getRevenueFiscal } from '../helpers/fiscal.js';${aiImport}\n\nconst router = Router();\n\n`;
    const footer = `\n\nexport default router;\n`;
    fs.writeFileSync('server/routes/' + sec.file, header + content + footer);
    console.log('Extracted', sec.file);
});
