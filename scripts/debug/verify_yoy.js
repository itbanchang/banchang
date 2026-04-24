import mysql from 'mysql2/promise';

const p = mysql.createPool({ host: '10.1.0.3', user: 'dataaudit', password: 'dataaudit', database: 'bchhosxpxe' });

const yr = new Date().getFullYear();
const mo = new Date().getMonth() + 1;

try {
    // Year-to-date revenue (current year)
    const [ytdRevenue] = await p.query(`SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE YEAR(vstdate) = ? AND vstdate <= CURDATE()`, [yr]);
    // Year-to-date revenue (previous year, same period)
    const [prevYtdRevenue] = await p.query(`SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE YEAR(vstdate) = ? AND MONTH(vstdate) <= ? AND DAY(vstdate) <= DAY(CURDATE())`, [yr - 1, mo]);
    // A/R Balance (outstanding amounts)
    const [arBalance] = await p.query(`SELECT COALESCE(SUM(remain_money), 0) as ar_balance FROM vn_stat WHERE remain_money > 0`);

    const ytdRev = Number(ytdRevenue[0]?.r || 0);
    const prevYtdRev = Number(prevYtdRevenue[0]?.r || 0);
    const yoyGrowthPct = prevYtdRev > 0 ? Math.round(((ytdRev - prevYtdRev) / prevYtdRev) * 100) : 0;

    const arBalanceAmt = Number(arBalance[0]?.ar_balance || 0);
    const daysInPeriod = Math.ceil((new Date() - new Date(yr, 0, 1)) / (1000 * 60 * 60 * 24));
    const avgDailyRevenue = ytdRev / daysInPeriod;
    const daysInAr = avgDailyRevenue > 0 ? Math.round(arBalanceAmt / avgDailyRevenue) : 0;

    console.log('Year-to-date Revenue:', (ytdRev / 1e6).toFixed(2) + ' million baht');
    console.log('Previous Year YTD Revenue:', (prevYtdRev / 1e6).toFixed(2) + ' million baht');
    console.log('YoY Growth:', yoyGrowthPct + '%');
    console.log('A/R Balance:', (arBalanceAmt / 1e6).toFixed(2) + ' million baht');
    console.log('Days in Period:', daysInPeriod);
    console.log('Avg Daily Revenue:', Math.round(avgDailyRevenue).toLocaleString());
    console.log('Days in A/R:', daysInAr);

} catch (err) {
    console.error('Error:', err);
} finally {
    await p.end();
}