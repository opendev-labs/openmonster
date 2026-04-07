import { ManifestTool } from './tools/manifest.js';
import { matrixHeader, matrixFooter, symbols } from '../utils/theme.js';
import { spinner } from '@clack/prompts';
import { queryNanoPi } from '../providers/ollama.js';
import { executeTool, parseExecution } from './tools/executor.js';
import pc from 'picocolors';
import fs from 'fs-extra';
import { DiscordChannel } from '../channels/discord.js';
import { TelegramChannel } from '../channels/telegram.js';
import { WhatsAppChannel } from '../channels/whatsapp.js';
import { GoogleChannel } from '../channels/google.js';

export class AriesEngine {
    private s = spinner();
    private manifestTool = new ManifestTool();
    private history: string[] = [];

    public discord = new DiscordChannel();
    public telegram = new TelegramChannel();
    public whatsapp = new WhatsAppChannel();
    public google = new GoogleChannel();

    async runOmega(goal: string) {
        matrixHeader(' OMEGA-ARIES PROTOCOL ACTIVATED ');
        
        let iteration = 0;
        const maxIterations = 10;
        let isComplete = false;

        while (iteration < maxIterations && !isComplete) {
            iteration++;
            console.log(pc.red('\n║ ') + pc.bold(`ITERATION ${iteration}/${maxIterations}`));

            // 1. OBSERVE (SENSE)
            const state = await this.phaseObserve();
            
            // 2. REASON (ARCHITECT)
            const action = await this.phaseReason(goal, state);
            
            if (!action) {
                console.log(pc.red('║ ') + pc.yellow('No execution detected. Stabilizing...'));
                isComplete = true;
                break;
            }

            // 3. EXECUTE (MANIFEST)
            const result = await this.phaseExecute(action);
            this.history.push(`Tool: ${action.name}, Result: ${result}`);

            if (result.includes('✓ Mission Accomplished') || result.includes('✓ Success')) {
                isComplete = true;
            }
        }

        // 4. EXPORT
        await this.phaseExport();

        matrixFooter(isComplete ? 'MISSION SUCCESS. SYSTEM UNLOCKED.' : 'MISSION ABORTED. RETRY PROTOCOL.');
    }

    private async phaseObserve() {
        this.s.start(pc.red('🔴 OBSERVE ') + pc.dim('Gathering environmental telemetry...'));
        const files = await fs.readdir(process.cwd());
        const filteredFiles = files.filter(f => !f.startsWith('.') && f !== 'node_modules');
        
        // Take a diagnostic screenshot if browser is open
        let visualState = "No visual context active.";
        try {
            const visualRes = await executeTool('browser_action', 'inspect');
            if (!visualRes.includes('❌')) visualState = visualRes;
        } catch (e) {}

        this.s.stop(pc.red('🔴 OBSERVE ') + pc.gray(`Manifested Nodes: ${filteredFiles.join(', ')}`));
        return { files: filteredFiles, visual: visualState };
    }

    private async phaseReason(goal: string, state: any) {
        this.s.start(pc.red('🔴 REASON ') + pc.dim('Processing logic gates...'));
        
        const prompt = `
Goal: ${goal}
Current Files: ${state.files.join(', ')}
Visual State: ${state.visual}
History: ${this.history.join('\n')}

Plan your next move. Use EXACTLY ONE of these tools:
- create_file|path|content
- run_command|command
- browser_action|action|arg1|arg2
- screenshot|name.png

Format: EXECUTE: tool_name|arg1|arg2
If the goal is fully achieved, respond with: EXECUTE: report|✓ Mission Accomplished.
`;

        const response = await queryNanoPi(prompt);
        this.s.stop(pc.red('🔴 REASON ') + pc.gray('Strategy synchronized.'));
        
        return parseExecution(response);
    }

    private async phaseExecute(action: any) {
        this.s.start(pc.red('🔴 EXECUTE ') + pc.dim(`${action.name.toUpperCase()} in progress...`));
        try {
            const result = await executeTool(action.name, ...action.args);
            this.s.stop(pc.red('🔴 EXECUTE ') + pc.gray(result));
            return result;
        } catch (error: any) {
            this.s.stop(pc.red('🔴 EXECUTE ') + pc.red(`CRITICAL FAILURE: ${error.message}`));
            return `Error: ${error.message}`;
        }
    }

    private async phaseExport() {
        this.s.start(pc.red('🔴 EXPORT ') + pc.dim('Compiling final mission log...'));
        const summary = `Mission Summary:\n- Iterations: ${this.history.length}\n- Log: ${this.history.join('\n')}`;
        await fs.writeFile('mission_log.txt', summary);
        this.s.stop(pc.red('🔴 EXPORT ') + pc.gray('Log Manifested: mission_log.txt'));
    }
}
