import fs from 'fs';

const lines = fs.readFileSync('server/server.js', 'utf8').split('\n');

const opdIdx = lines.findIndex(l => l.includes('app.get(\'/api/opd/today\','));
const debugIdx = lines.findIndex(l => l.includes('Diagnostic: All specialties'));
const ewsStartIdx = lines.findIndex(l => l.includes('app.get(\'/api/ai/ews/summary\''));

console.log('opdIdx', opdIdx);
console.log('debugIdx', debugIdx);
console.log('ewsStartIdx', ewsStartIdx);
