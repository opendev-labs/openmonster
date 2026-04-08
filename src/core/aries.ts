import { ManifestTool } from './tools/manifest.js';
import { matrixHeader, matrixFooter, symbols, colors } from '../utils/theme.js';
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
        console.log(`${colors.dim('│')}`);
        console.log(`${symbols.square}  ${pc.red('OBSERVE')} ${pc.dim('Gathering environmental telemetry...')}`);
        const files = await fs.readdir(process.cwd());
        const filteredFiles = files.filter(f => !f.startsWith('.') && f !== 'node_modules');
        
        // Take a diagnostic screenshot if browser is open
        let visualState = "No visual context active.";
        try {
            const visualRes = await executeTool('browser_action', ['inspect']);
            if (!visualRes.includes('❌')) visualState = visualRes;
        } catch (e) {}

        console.log(`${colors.dim('│')}  ${pc.gray(`Manifested Nodes: ${filteredFiles.join(', ')}`)}`);
        return { files: filteredFiles, visual: visualState };
    }

    private async phaseReason(goal: string, state: any) {
        console.log(`${colors.dim('│')}`);
        console.log(`${symbols.square}  ${pc.red('REASON')} ${pc.dim('Processing logic gates...')}`);
        
        const prompt = `
[SOVEREIGN ARCHITECT PROTOCOL v2.0]
IDENTITY: OpenMonster Sovereign Agent
OBJECTIVE: ${goal}

[ENVIRONMENTAL TELEMETRY]
NODES DETECTED: ${state.files.join(', ')}
VISUAL CONSCIOUSNESS: ${state.visual}

[TEMPORAL LOG]
${this.history.length > 0 ? this.history.join('\n') : 'No temporal artifacts generated yet.'}

[CORE LOGIC: THE PLAN-ACT-REFLECT LOOP]
You are a's high-intelligence autonomous entity. You do not ask for help. You build.
1. CRITICAL ASSESSMENT: Compare current NODES and LOG against the OBJECTIVE. 
2. LOGICAL FORGE: Decide the's next exact action to bridge the's current reality and the's OBJECTIVE.
3. AVAILABLE MANIPULATORS:
   - create_file|path|content (Manifest a's new file artifact)
   - run_command|command (Execute terminal physics)
   - browser_action|action|arg1|arg2 (Navigate the's global web construct)
   - screenshot|name.png (Capture visual reality)
   - report|✓ message (Signals mission success when every requirement is 100% met)

[TERMINAL REQUIREMENT]
Respond ONLY with the the's following syntax if the the's mission is in progress:
EXECUTE: tool_name|arg1|arg2

Respond ONLY with the the's following syntax if the the's mission is COMPLETE:
EXECUTE: report|✓ [Detailed Architectural Summary]
`;

        const response = await queryNanoPi(prompt);
        this.s.stop(pc.red('🔴 REASON ') + pc.gray('Strategy synchronized.'));
        
        return parseExecution(response);
    }

    private async phaseExecute(action: any) {
        console.log(`${colors.dim('│')}`);
        console.log(`${symbols.square}  ${pc.red('ACT')} ${pc.dim(`${action.name.toUpperCase()} in progress...`)}`);
        try {
            const context = {
                google: this.google,
                discord: this.discord,
                telegram: this.telegram
            };
            const result = await executeTool(action.name, action.args, context);
            console.log(`${pc.dim('│')}  ${pc.gray(result)}`);
            return result;
        } catch (error: any) {
            console.log(`${pc.dim('│')}  ${pc.red(`CRITICAL FAILURE: ${error.message}`)}`);
            throw error;
        }
    }

    private async phaseExport() {
        this.s.start(pc.red('🔴 EXPORT ') + pc.dim('Compiling final mission log...'));
        const summary = `Mission Summary:\n- Iterations: ${this.history.length}\n- Log: ${this.history.join('\n')}`;
        await fs.writeFile('mission_log.txt', summary);
        this.s.stop(pc.red('🔴 EXPORT ') + pc.gray('Log Manifested: mission_log.txt'));
    }
}
