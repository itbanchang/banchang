import mysql from 'mysql2/promise';
import fs from 'fs';

async function generateDataDictionary() {
    const connectionConfig = {
        host: process.env.MYSQL_HOST || '10.109.0.33',
        user: process.env.MYSQL_USER || 'dataaudit',
        password: process.env.MYSQL_PASS || 'dataaudit',
        database: process.env.MYSQL_DB || 'bchhosxpxe',
    };

    const tablesToInspect = [
        'ovst', 'vn_stat', 'patient', 'ipt', 'an_stat',
        'opdscreen', 'iptdiag', 'ovstdiag', 'ward',
        'kskdepartment', 'opduser', 'pttype', 'service_time'
    ];

    try {
        const pool = mysql.createPool(connectionConfig);
        let markdown = '# BCH 360° Intelligence - Data Dictionary\n\n';
        markdown += `Generated on: ${new Date().toLocaleString()}\n`;
        markdown += `Database: ${connectionConfig.database} (${connectionConfig.host})\n\n`;

        for (const tableName of tablesToInspect) {
            console.log(`Inspecting table: ${tableName}...`);
            const [columns] = await pool.query(`SHOW FULL COLUMNS FROM ${tableName}`);

            markdown += `## Table: ${tableName}\n\n`;
            markdown += '| Column | Type | Null | Key | Default | Extra | Comment |\n';
            markdown += '|--------|------|------|-----|---------|-------|---------|\n';

            for (const col of columns) {
                markdown += `| ${col.Field} | ${col.Type} | ${col.Null} | ${col.Key} | ${col.Default || ''} | ${col.Extra} | ${col.Comment || ''} |\n`;
            }
            markdown += '\n';
        }

        fs.writeFileSync('C:\\BCH 360° Intelligence V.10\\data_dictionary.md', markdown);
        console.log('Data Dictionary generated successfully: data_dictionary.md');

        await pool.end();
    } catch (error) {
        console.error('Error generating Data Dictionary:', error);
    }
}

generateDataDictionary();
