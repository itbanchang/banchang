import mysql from 'mysql2/promise';

const p = mysql.createPool({ host: '10.1.0.3', user: 'dataaudit', password: 'dataaudit', database: 'bchhosxpxe' });

const yr = new Date().getFullYear();
const mo = new Date().getMonth() + 1;
const curStart = `${yr}-${String(mo).padStart(2,'0')}-01`;

console.log('Current month start:', curStart);

try {
    const [collectionRate] = await p.query(`
        SELECT
            COALESCE(SUM(income), 0) as billed,
            COALESCE(SUM(income - remain_money), 0) as collected
        FROM vn_stat
        WHERE vstdate >= ? AND vstdate < DATE_ADD(?, INTERVAL 1 MONTH) AND income > 0
    `, [curStart, curStart]);

    const [curMonth] = await p.query(`SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate < DATE_ADD(?, INTERVAL 1 MONTH)`, [curStart, curStart]);

    const billed = Number(collectionRate[0]?.billed || 0);
    const collected = Number(collectionRate[0]?.collected || 0);
    const collRate = billed > 0 ? Math.round((collected / billed) * 100) : 0;
    const curRev = Number(curMonth[0]?.r || 0);

    console.log('Collection Rate:', collRate + '%');
    console.log('Current Month Revenue:', (curRev / 1e6).toFixed(2) + ' million baht');
    console.log('Billed:', billed.toLocaleString());
    console.log('Collected:', collected.toLocaleString());

    // Previous month for growth calculation
    const prevMo = mo === 1 ? 12 : mo - 1;
    const prevYr = mo === 1 ? yr - 1 : yr;
    const prevStart = `${prevYr}-${String(prevMo).padStart(2,'0')}-01`;
    const prevEnd = curStart;

    const [prevMonth] = await p.query(`SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate < ?`, [prevStart, prevEnd]);
    const prevRev = Number(prevMonth[0]?.r || 0);
    const growthPct = prevRev > 0 ? Math.round(((curRev - prevRev) / prevRev) * 100) : 0;

    console.log('Previous Month Revenue:', (prevRev / 1e6).toFixed(2) + ' million baht');
    console.log('Growth Rate:', growthPct + '%');

    // Denial rate
    const [denialStats] = await p.query(`
        SELECT COUNT(*) as total, SUM(CASE WHEN remain_money > 0 THEN 1 ELSE 0 END) as denied
        FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND income > 0
    `);

    const deniedCount = Number(denialStats[0]?.denied || 0);
    const totalCount = Number(denialStats[0]?.total || 1);
    const denialRate = Math.round((deniedCount / totalCount) * 100);

    console.log('Denial Rate (last 30 days):', denialRate + '%');
    console.log('Cases with outstanding:', deniedCount.toLocaleString());
    console.log('Total cases:', totalCount.toLocaleString());

} catch (err) {
    console.error('Error:', err);
} finally {
    await p.end();
}