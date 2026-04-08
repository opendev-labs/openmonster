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
            headless: true,
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

export interface ToolContext {
    google?: any;
    discord?: any;
    telegram?: any;
}

export async function executeTool(toolName: string, args: string[], context?: ToolContext) {
    console.log(pc.red('║ ') + pc.bold(`EXECUTING TOOL: ${toolName.toUpperCase()}`));
    
    const normalizedName = toolName.toLowerCase()
        .replace(/^execute_/, '')
        .replace(/^manifest_/, '');

    try {
        switch (normalizedName) {
            case 'create_file':
            case 'write_file': {
                const [filePath, ...contentParts] = args;
                const content = contentParts.join('|');
                await fs.ensureDir(path.dirname(filePath));
                await fs.writeFile(filePath, content);
                return `✓ Manifested Node: ${filePath}`;
            }

            case 'run_command': {
                const cmd = args.join(' ');
                const { stdout, stderr } = await execa(cmd, { shell: true, reject: false });
                if (stderr && !stdout) return `✘ Feedback Error: ${stderr}`;
                return stdout || stderr || '✓ Execution Reality Stabilized.';
            }

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

                    case 'inspect': {
                        // Enhanced Visual Consciousness for Headless Mode
                        let tree = null;
                        try {
                            const pageAny = page as any;
                            if (pageAny.accessibility) {
                                tree = await pageAny.accessibility.snapshot();
                            }
                        } catch (e) {
                            console.log("Accessibility snapshot failed:", e);
                        }
                        const title = await page.title();
                        const url = page.url();
                        return JSON.stringify({ title, url, tree }, null, 2).slice(0, 2000) + '... [TRUNCATED]';
                    }
                    
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

            case 'google_calendar': {
                if (!context?.google) return "❌ Google channel not initialized.";
                await context.google.createCalendarEvent(args[0], new Date(args[1]), new Date(args[2] || Date.now() + 3600000));
                return `✓ Calendar Event manifested: ${args[0]}`;
            }

            case 'report': {
                return args.join(' ');
            }

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
