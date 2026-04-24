// BCH 360° Intelligence V.10 - Query Performance Monitoring Script
// Analyzes database query patterns to identify slow queries and optimization opportunities
// Run this periodically to ensure query performance stays optimal

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

const LOG_DIR = 'c:\\BCH 360° Intelligence V.10\\logs';
const SLOW_QUERY_THRESHOLD_MS = 5000;  // Flag queries over 5 seconds
const TIMEOUT_THRESHOLD = 10;  // Alert if more than 10 timeouts in 1 hour

async function analyzeLogFile() {
    try {
        console.log('📊 BCH 360° Query Performance Analysis\n');
        
        // Read error log
        const errorLogPath = path.join(LOG_DIR, 'error.log');
        const errorLog = fs.readFileSync(errorLogPath, 'utf-8');
        
        // Count timeout errors
        const timeoutMatches = errorLog.match(/QUERY_TIMEOUT|max_statement_time exceeded/g) || [];
        const timeoutCount = timeoutMatches.length;
        
        console.log('⏱️  TIMEOUT ANALYSIS');
        console.log(`   Total timeout errors: ${timeoutCount}`);
        console.log(`   Threshold: ${TIMEOUT_THRESHOLD}/hour`);
        console.log(`   Status: ${timeoutCount > TIMEOUT_THRESHOLD * 24 ? '🔴 CRITICAL' : '🟢 OK'}\n`);
        
        // Read combined log
        const combinedLogPath = path.join(LOG_DIR, 'combined.log');
        const combinedLog = fs.readFileSync(combinedLogPath, 'utf-8');
        
        // Extract duration patterns
        const durationRegex = /"duration":"(\d+)ms"/g;
        const durations = [];
        let match;
        
        while ((match = durationRegex.exec(combinedLog)) !== null) {
            durations.push(parseInt(match[1]));
        }
        
        if (durations.length > 0) {
            durations.sort((a, b) => b - a);
            const slowQueries = durations.filter(d => d > SLOW_QUERY_THRESHOLD_MS);
            const avgDuration = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
            const maxDuration = durations[0];
            
            console.log('⚡ QUERY PERFORMANCE METRICS');
            console.log(`   Total requests analyzed: ${durations.length}`);
            console.log(`   Average response time: ${avgDuration}ms`);
            console.log(`   Slowest response: ${maxDuration}ms`);
            console.log(`   Slow queries (>${SLOW_QUERY_THRESHOLD_MS}ms): ${slowQueries.length}`);
            console.log(`   Slow query percentage: ${((slowQueries.length / durations.length) * 100).toFixed(1)}%\n`);
        }
        
        // Analyze endpoints
        console.log('📍 TOP ENDPOINTS');
        const endpointRegex = /"path":"([^"]+)"/g;
        const endpoints = {};
        
        while ((match = endpointRegex.exec(combinedLog)) !== null) {
            const endpoint = match[1];
            endpoints[endpoint] = (endpoints[endpoint] || 0) + 1;
        }
        
        const topEndpoints = Object.entries(endpoints)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        topEndpoints.forEach(([endpoint, count]) => {
            console.log(`   ${endpoint}: ${count} requests`);
        });
        console.log();
        
        // Recommendations
        console.log('💡 OPTIMIZATION RECOMMENDATIONS\n');
        
        if (timeoutCount > TIMEOUT_THRESHOLD * 24) {
            console.log('🔴 CRITICAL: High timeout rate detected');
            console.log('   Action: Increase database connection pool size or optimize slow queries\n');
        }
        
        const slowPercentage = durations.length > 0 
            ? (durations.filter(d => d > SLOW_QUERY_THRESHOLD_MS).length / durations.length) * 100 
            : 0;
        
        if (slowPercentage > 5) {
            console.log(`⚠️  WARNING: ${slowPercentage.toFixed(1)}% of queries are slow`);
            console.log('   Action: Profile database queries and add indexes for frequently used columns\n');
        }
        
        console.log('🔧 NEXT STEPS');
        console.log('   1. Enable MySQL slow_query_log to identify slow queries');
        console.log('   2. Add indexes on frequently filtered columns');
        console.log('   3. Review complex JOINs and optimize queries');
        console.log('   4. Consider implementing query result caching for expensive operations\n');
        
    } catch (error) {
        console.error('❌ Error analyzing logs:', error.message);
    }
}

// Run analysis
analyzeLogFile();
