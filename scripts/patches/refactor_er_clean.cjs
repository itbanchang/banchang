const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/components/ERTab.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// The string we will inject hooks before
const renderMarker = '    return (\\r\\n        <div className="space-y-4 animate-fade-in pb-8">';
const fallbackRenderMarker = '    return (\\n        <div className="space-y-4 animate-fade-in pb-8">';
let injectMarker = content.includes(renderMarker) ? renderMarker : fallbackRenderMarker;

if (content.includes('const advData = useMemo')) {
    console.log('advData already refactored');
} else {
    // ADV DATA
    // Find the immediately invoked function
    const startPattern = /\)\s*:\s*\(\(\)\s*=>\s*\{[\r\n]+\s*const a = erAnalytics/m;
    const endPattern = /const tier3Cards[^\]]+\];/m;

    const startMatch = content.match(startPattern);
    const endMatch = content.match(endPattern);

    if (startMatch && endMatch) {
        const bodyStart = startMatch.index + startMatch[0].length - 'const a = erAnalytics'.length;
        const bodyEnd = endMatch.index + endMatch[0].length;

        const logicBody = content.substring(bodyStart, bodyEnd);

        const hookCode = `    const advData = useMemo(() => {
        ${logicBody}
        return { a, epi, epiColor, epiGrade, r, dashLen, circumference, epiRadar, ta, tier1Cards, tier2Cards, tier3Cards };
    }, [erAnalytics]);\n\n`;

        content = content.replace(injectMarker, hookCode + injectMarker);

        // Remove the old logic from JSX and replace with hook result extraction
        const oldLogicMatch = content.match(startPattern); // New match index
        const oldLogicEndMatch = content.match(endPattern);
        const toReplaceStart = oldLogicMatch.index + oldLogicMatch[0].length - 'const a = erAnalytics'.length;
        const toReplaceEnd = oldLogicEndMatch.index + oldLogicEndMatch[0].length;
        const toReplace = content.substring(toReplaceStart, toReplaceEnd);

        const replacement = `if(!advData) return null;\n                    const { a, epi, epiColor, epiGrade, r, dashLen, circumference, epiRadar, ta, tier1Cards, tier2Cards, tier3Cards } = advData;`;
        content = content.replace(toReplace, replacement);
        console.log('ADV Data refactored.');
    } else {
        console.log('ADV logic not found.');
    }
}

if (content.includes('const rcaData = useMemo')) {
    console.log('rcaData already refactored');
} else {
    // RCA DATA
    const rcaStartPattern = /&& \(\(\)\s*=>\s*\{[\r\n]+\s*const a = erAnalytics || \{\};[\r\n]+\s*const epi = a\.epi \?\? 0;/m;
    const rcaEndPattern = /const urgencyLabel = [^;]+;/m;

    const rcaStartMatch = content.match(rcaStartPattern);
    const rcaEndMatch = content.match(rcaEndPattern);

    if (rcaStartMatch && rcaEndMatch) {
        const bodyStart = rcaStartMatch.index + rcaStartMatch[0].length - 'const a = erAnalytics || {};'.length;
        const bodyEnd = rcaEndMatch.index + rcaEndMatch[0].length;

        const logicBody = content.substring(bodyStart, bodyEnd);

        const hookCode = `    const rcaData = useMemo(() => {
        ${logicBody}
        return { problems, critCount, warnCount, urgencyScore, urgencyColor, urgencyLabel };
    }, [erAnalytics, state.erBottlenecks, erSurge, erTodayPatients]);\n\n`;

        content = content.replace(injectMarker, hookCode + injectMarker);

        // Replace old logic in JSX
        const newStartMatch = content.match(rcaStartPattern);
        const newEndMatch = content.match(rcaEndPattern);

        const toReplaceStart = newStartMatch.index + newStartMatch[0].length - 'const a = erAnalytics || {};'.length;
        const toReplaceEnd = newEndMatch.index + newEndMatch[0].length;
        const toReplace = content.substring(toReplaceStart, toReplaceEnd);

        const replacement = `if(!rcaData) return null;\n                const { problems, critCount, warnCount, urgencyScore, urgencyColor, urgencyLabel } = rcaData;`;
        content = content.replace(toReplace, replacement);
        console.log('RCA Data refactored.');
    } else {
        console.log('RCA logic not found.');
    }
}

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Refactor script done.');
