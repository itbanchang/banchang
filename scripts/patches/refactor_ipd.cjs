const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'BCH 360° Intelligence V.10', 'src', 'components', 'IPDTab.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove duplicate "อัตราครองเตียง"
content = content.replace(
    /\{\s*title: 'อัตราครองเตียง',[\s\S]*?loading: loading\.bedOccupancy,\s*\},/s,
    ''
);

// 2. Remove IPD Executive Insight Hub
content = content.replace(
    /\{\/\* ━━ AI IPD Executive Intelligence Hub ━━ \*\/\}.*?\{\/\* AI Bed Demand Alert \*\/\}/s,
    '{/* AI Bed Demand Alert */}'
);

// 3. Extract Advanced Analytics logic
const advancedRegex = /\) : \(\(\) => \{\n\s+const a = ipdAnalytics \|\| \{\};\n\s+const wei = a\.wei \?\? 0;(.*?)\n\s+return \(\n\s+<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '1\.25rem' \}\}>/s;
const advMatch = content.match(advancedRegex);
let advLogic = advMatch ? advMatch[1] : '';

// 4. Extract Deep Root-Cause Analysis logic
const rcaRegex = /\{!loading\.ipdAnalytics && ipdAnalytics && \(\(\) => \{\n\s+const a = ipdAnalytics \|\| \{\};\n\s+const wei = a\.wei \?\? 0;(.*?)\n\s+return \(\n\s+<>\n\s+<div style=\{\{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' \}\}>/s;
const rcaMatch = content.match(rcaRegex);
let rcaLogic = rcaMatch ? rcaMatch[1] : '';

if (advMatch && rcaMatch) {
    // Generate hooks
    let hooks = `
    const advData = useMemo(() => {
        if (!ipdAnalytics) return null;
        const a = ipdAnalytics || {};
        const wei = a.wei ?? 0;
${advLogic}
        return {
            wei, weiColor, weiGrade, dashLen, circumference, r,
            weiRadar, admTrend, total, malePct,
            tier1Cards, tier2Cards, tier3Cards,
            a
        };
    }, [ipdAnalytics]);

    const rcaData = useMemo(() => {
        if (!ipdAnalytics || !bedSummary) return null;
        const a = ipdAnalytics || {};
        const wei = a.wei ?? 0;
${rcaLogic}
        return {
            problems, urgencyScore, urgencyColor, urgencyLabel, criticalCount, warningCount, chainItems, overstayPct, alosVar, turnover, occRate, dischNoonPct, wei, a
        };
    }, [ipdAnalytics, bedSummary]);
    `;

    // Insert hooks before return
    content = content.replace('    return (\n        <div className="space-y-4 animate-fade-in pb-8">', hooks + '\n    return (\n        <div className="space-y-4 animate-fade-in pb-8">');

    // Replace Advanced Analytics JSX rendering
    content = content.replace(advancedRegex,
        `) : (() => {
                    const advDataVars = advData;
                    if (!advDataVars) return null;
                    const { wei, weiColor, weiGrade, dashLen, circumference, r, weiRadar, admTrend, total, malePct, tier1Cards, tier2Cards, tier3Cards, a } = advDataVars;
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>`
    );

    // Replace RCA JSX rendering
    content = content.replace(rcaRegex,
        `{!loading.ipdAnalytics && rcaData && (() => {
                const { problems, urgencyScore, urgencyColor, urgencyLabel, criticalCount, warningCount, chainItems, overstayPct, alosVar, turnover, occRate, dischNoonPct, wei, a } = rcaData;
                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Refactoring complete");
} else {
    console.log("Could not find blocks to refactor", { adv: !!advMatch, rca: !!rcaMatch });
}
