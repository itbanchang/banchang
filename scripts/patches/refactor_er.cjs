const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/components/ERTab.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

const regexAdvStart = /const a = erAnalytics \|\| \{\};\s*const epi = a\.epi \?\? 0;/m;
const advMatch = content.match(regexAdvStart);

if (advMatch) {
    const afterStart = content.substring(advMatch.index);
    const endMatch = afterStart.match(/const tier3Cards = \[[\s\S]*?\}\s*\];\s*/);
    if (endMatch) {
        let block = afterStart.substring(0, endMatch.index + endMatch[0].length);

        let newBlock = `const advData = useMemo(() => {
        ${block.trim().split('\\n').map((line, i) => i === 0 ? line : '        ' + line.trim()).join('\\n')}
        return { a, epi, epiColor, epiGrade, dashLen, epiRadar, tier1Cards, tier2Cards, tier3Cards, circumference, r, ta };
    }, [erAnalytics]);

    if (!advData) return null;
    const { a, epi, epiColor, epiGrade, dashLen, epiRadar, tier1Cards, tier2Cards, tier3Cards, circumference, r, ta } = advData;
`;
        // Replace it
        content = content.replace(block, newBlock);
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log('advData refactoring successful.');
    } else {
        console.log('Could not find end of adv logic.');
    }
} else {
    console.log('Could not find start of adv logic.');
}

// Next, let's look for bottlenecks RCA
const rcaStartMatch = content.match(/const bn = state\.erBottlenecks\?\.averages \|\| \{\};\s*const problems = \[\];/);
if (rcaStartMatch) {
    const afterRcaStart = content.substring(rcaStartMatch.index);
    const rcaEndMatch = afterRcaStart.match(/const urgencyLabel = urgencyScore >= 7 \? '[^']+' : urgencyScore >= 4 \? '[^']+' : '[^']+';\s*/);
    if (rcaEndMatch) {
        let rcaBlock = afterRcaStart.substring(0, rcaEndMatch.index + rcaEndMatch[0].length);

        // We also need "const a = erAnalytics || {};" for rcaData context, or we can just pass erAnalytics
        let newRcaBlock = `const rcaData = useMemo(() => {
        const a = erAnalytics || {};
        ${rcaBlock.trim().split('\\n').map((line, i) => i === 0 ? line : '        ' + line.trim()).join('\\n')}
        return { problems, urgencyScore, urgencyColor, urgencyLabel, critCount, warnCount };
    }, [erAnalytics, state.erBottlenecks, erSurge, erTodayPatients]);

    if (!rcaData) return null;
    const { problems, urgencyScore, urgencyColor, urgencyLabel, critCount, warnCount } = rcaData;
`;
        content = content.replace(rcaBlock, newRcaBlock);
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log('rcaData refactoring successful.');
    } else {
        console.log('Could not find end of rca logic.');
    }
} else {
    console.log('Could not find start of rca logic.');
}
