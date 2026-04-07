import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import pc from 'picocolors';
import { chromium, Browser, Page } from 'playwright';

let sharedBrowser: Browser | null = null;
let sharedContext: any | null = null;
let sharedPage: Page | null = null;

async function getBrowserPage() {
    if (!sharedBrowser) {
        sharedBrowser = await chromium.launch({ 
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        
        sharedContext = await sharedBrowser.newContext({
            viewport: { width: 1280, height: 720 },
            recordVideo: {
                dir: path.join(process.cwd(), 'dist', 'output', 'recordings'),
                size: { width: 1280, height: 720 }
            }
        });
        
        sharedPage = await sharedContext.newPage();
    }
    return sharedPage!;
}

export async function cleanupBrowser() {
    if (sharedBrowser) {
        await sharedBrowser.close();
        sharedBrowser = null;
        sharedContext = null;
        sharedPage = null;
    }
}

export async function executeTool(toolName: string, ...args: string[]) {
    console.log(pc.red('║ ') + pc.bold(`EXECUTING TOOL: ${toolName.toUpperCase()}`));
    
    const normalizedName = toolName.toLowerCase()
        .replace(/^execute_/, '')
        .replace(/^manifest_/, '');

    try {
        switch (normalizedName) {
            case 'create_file':
            case 'write_file':
                const [filePath, ...contentParts] = args;
                const content = contentParts.join('|');
                await fs.ensureDir(path.dirname(filePath));
                await fs.writeFile(filePath, content);
                return `✓ Manifested Node: ${filePath}`;

            case 'run_command':
                const cmd = args.join(' ');
                const { stdout, stderr } = await execa(cmd, { shell: true });
                return stdout || stderr || '✓ Execution Reality Stabilized.';

            case 'browser_action':
                const [action, ...actionArgs] = args;
                const page = await getBrowserPage();
                
                switch (action.toLowerCase()) {
                    case 'goto':
                        const url = actionArgs[0];
                        await page.goto(url, { waitUntil: 'load', timeout: 45000 });
                        return `✓ Navigated to ${url}`;
                    
                    case 'type':
                        const [selector, text] = actionArgs;
                        await page.waitForSelector(selector, { timeout: 15000 });
                        await page.fill(selector, text); // fill is more robust than type
                        return `✓ Typed "${text}" into ${selector}`;
                    
                    case 'click':
                        const clickSelector = actionArgs[0];
                        await page.waitForSelector(clickSelector, { timeout: 15000 });
                        await page.click(clickSelector);
                        return `✓ Clicked ${clickSelector}`;

                    case 'press':
                        const key = actionArgs[0];
                        await page.keyboard.press(key);
                        return `✓ Pressed ${key} on keyboard`;

                    case 'scroll':
                        await page.evaluate(() => window.scrollBy(0, 500));
                        return `✓ Scrolled down 500px`;

                    case 'inspect':
                        // Return a compressed accessibility tree or DOM summary
                        const tree = await (page as any).accessibility.snapshot();
                        return JSON.stringify(tree, null, 2).slice(0, 1000) + '... [TRUNCATED]';
                    
                    case 'screenshot':
                        const scPath = actionArgs[0] || `verify-${Date.now()}.png`;
                        const fullPath = path.join(process.cwd(), 'dist', 'output', 'screenshots', scPath);
                        await fs.ensureDir(path.dirname(fullPath));
                        await page.screenshot({ path: fullPath, fullPage: true });
                        return `✓ Screenshot captured: ${scPath}`;

                    case 'close':
                        await cleanupBrowser();
                        return `✓ Browser closed. Lifecycle terminated.`;
                    
                    default:
                        return `❌ Unknown browser action: ${action}`;
                }

            case 'build_project':
                const buildRes = await execa('npm run build', { shell: true });
                return buildRes.stdout || '✓ System Structure Optimized.';

            case 'deploy_docker':
                const tag = args[0] || 'openmonster-v5';
                const dockerRes = await execa(`docker build -t ${tag} .`, { shell: true });
                return dockerRes.stdout || '✓ Containerized Reality Exported.';

            default:
                return `❌ Unknown tool: ${toolName}`;
        }
    } catch (error: any) {
        console.error(pc.red(`❌ Tool Error (${toolName}):`), error);
        return `❌ Tool Failure: ${error.message}`;
    }
}

export function parseExecution(response: string) {
    // Look for EXECUTE: tool_name|path|content
    const execMatch = response.match(/EXECUTE:\s*(\w+)\|([^|]+)\|(.*)/s);
    if (execMatch) {
        return {
            name: execMatch[1],
            args: [execMatch[2], execMatch[3]]
        };
    }
    // Fallback for tools with fewer args
    const simpleMatch = response.match(/EXECUTE:\s*(\w+)\|(.+)/);
    if (simpleMatch) {
        return {
            name: simpleMatch[1],
            args: simpleMatch[2].split('|')
        };
    }
    return null;
}
