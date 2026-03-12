// ============================================================
// BCH 360° Intelligence V.10 — Data Lake (JSON-based)
// Long-term Storage for Trend Analysis (5-10 Years)
// ============================================================
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_LAKE_DIR = path.resolve(__dirname, '../../data_lake');

/**
 * Initialize Data Lake Directory
 */
export async function initDataLake() {
    try {
        await fs.mkdir(DATA_LAKE_DIR, { recursive: true });
        // Create subdirectories for years automatically
        const currentYear = new Date().getFullYear();
        await fs.mkdir(path.join(DATA_LAKE_DIR, currentYear.toString()), { recursive: true });
        console.log(`📂 Data Lake initialized at: ${DATA_LAKE_DIR}`);
    } catch (err) {
        console.error('❌ Failed to init Data Lake:', err);
    }
}

/**
 * Save snapshot of a KPI to Data Lake
 * @param {string} category - e.g., 'finance', 'opd', 'ipd'
 * @param {object} data - The data to archive
 */
export async function archiveSnapshot(category, data) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    const dir = path.join(DATA_LAKE_DIR, year);
    await fs.mkdir(dir, { recursive: true });

    const filename = `${category}_${year}${month}${day}.json`;
    const filepath = path.join(dir, filename);

    const payload = {
        meta: {
            timestamp: now.toISOString(),
            source: 'BCH-360-INTELLIGENCE-V10',
            category
        },
        payload: data
    };

    await fs.writeFile(filepath, JSON.stringify(payload, null, 2));
    console.log(`💾 Snapshot archived: ${filename}`);
}

/**
 * Read archived data for trend analysis
 */
export async function getTrendData(category, years = 5) {
    const results = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < years; i++) {
        const targetYear = (currentYear - i).toString();
        const dir = path.join(DATA_LAKE_DIR, targetYear);

        try {
            const files = await fs.readdir(dir);
            const catFiles = files.filter(f => f.startsWith(category)).sort();

            // Just take one snapshot per day or month... 
            // For now, let's just return the last snapshot of each month available
            for (const file of catFiles) {
                const content = await fs.readFile(path.join(dir, file), 'utf-8');
                results.push(JSON.parse(content));
            }
        } catch (e) {
            // Year directory might not exist
        }
    }
    return results;
}

export default { initDataLake, archiveSnapshot, getTrendData };
