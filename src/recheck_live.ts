import { executeTool } from './core/tools/executor.js';
import pc from 'picocolors';

async function test() {
    console.log(pc.cyan('🌐 Checking Live Site for middleware changes...'));
    
    try {
        await executeTool('browser_action', ['goto', 'https://ml5v5.vercel.app']);
        await new Promise(r => setTimeout(r, 5000));
        const scRes = await executeTool('browser_action', ['screenshot', 'ml5v5-recheck.png']);
        console.log(pc.green(scRes));
        console.log(pc.cyan('✅ Re-check Complete.'));
    } catch (err: any) {
        console.error(pc.red('❌ Re-check Failed:'), err.message);
    } finally {
        process.exit(0);
    }
}

test();
