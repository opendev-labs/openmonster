import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import pc from 'picocolors';

export async function executeTool(toolName: string, ...args: string[]) {
    console.log(pc.red('║ ') + pc.bold(`EXECUTING TOOL: ${toolName.toUpperCase()}`));
    
    try {
        switch (toolName) {
            case 'create_file':
                const [filePath, ...contentParts] = args;
                const content = contentParts.join('|'); // Re-joining if content had pipes
                await fs.ensureDir(path.dirname(filePath));
                await fs.writeFile(filePath, content);
                return `✅ Created file: ${filePath}`;

            case 'run_command':
                const cmd = args.join(' ');
                const { stdout, stderr } = await execa(cmd, { shell: true });
                return stdout || stderr || '✅ Command executed.';

            case 'build_project':
                const buildRes = await execa('npm run build', { shell: true });
                return buildRes.stdout || '✅ Build complete.';

            case 'deploy_docker':
                const tag = args[0] || 'openmonster-v5';
                const dockerRes = await execa(`docker build -t ${tag} .`, { shell: true });
                return dockerRes.stdout || '✅ Docker image built.';

            default:
                return `❌ Unknown tool: ${toolName}`;
        }
    } catch (error: any) {
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
