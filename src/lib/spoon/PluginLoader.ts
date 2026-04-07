import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { spoonColors as colors } from './colors.js';

export class PluginLoader {
    private pluginDir: string;

    constructor() {
        this.pluginDir = path.join(os.homedir(), '.monster', 'plugins');
        this.ensureDir();
    }

    private ensureDir() {
        if (!fs.existsSync(this.pluginDir)) {
            fs.ensureDirSync(this.pluginDir);
        }
    }

    public async loadPlugins(program: any) {
        try {
            const files = fs.readdirSync(this.pluginDir);
            const jsFiles = files.filter(f => f.endsWith('.js') || f.endsWith('.ts'));

            if (jsFiles.length > 0) {
                console.log(`${colors.cyan}║ ${colors.white}MATRIX: Loading ${jsFiles.length} external consciousness modules...${colors.reset}`);
            }

            for (const file of jsFiles) {
                const pluginPath = path.join(this.pluginDir, file);
                try {
                    // In ESM, we use dynamic import
                    // We might need to handle absolute paths carefully
                    const plugin = await import(`file://${pluginPath}`);
                    if (typeof plugin.default === 'function') {
                        plugin.default(program);
                    }
                } catch (e: any) {
                    console.log(`${colors.red}║ ${colors.white}PLUGIN ERROR (${file}): ${e.message}${colors.reset}`);
                }
            }
        } catch (e) {}
    }
}
