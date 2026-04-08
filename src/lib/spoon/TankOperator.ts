import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import { spoonColors as colors } from './colors.js';
import { TANK_ASCII } from './ascii.js';
import { PersistentState } from './PersistentState.js';

export interface CLICommand {
    name: string;
    commands: Record<string, string>;
    description: string;
}

export class TankOperator {
    private autoPilot: any;
    private verbose: boolean;
    private quantum: boolean;
    private architect: boolean;
    private cliRegistry: Map<string, CLICommand>;
    private persistentState: PersistentState;

    constructor(options: any = {}) {
        this.autoPilot = options.autoPilot;
        this.verbose = options.verbose || false;
        this.quantum = options.quantum || false;
        this.architect = options.architect || false;
        this.cliRegistry = new Map();
        this.persistentState = new PersistentState();
        this.registerAllCLIs();
    }

    private registerAllCLIs() {
        this.cliRegistry.set('react', {
            name: 'React CLI',
            commands: {
                'create': 'npx create-react-app {name}',
                'start': 'cd {name} && npm start',
                'build': 'cd {name} && npm run build'
            },
            description: 'React application development'
        });

        this.cliRegistry.set('next', {
            name: 'Next.js CLI',
            commands: {
                'create': 'npx create-next-app@latest {name}',
                'dev': 'cd {name} && npm run dev',
                'build': 'cd {name} && npm run build'
            },
            description: 'Next.js framework'
        });

        this.cliRegistry.set('python', {
            name: 'Python Environment',
            commands: {
                'create-venv': 'python3 -m venv {name}_env',
                'run-server': 'python app.py',
            },
            description: 'Python virtual environments and AI development'
        });

        this.cliRegistry.set('docker', {
            name: 'Docker CLI',
            commands: {
                'build': 'docker build -t {name} .',
                'run': 'docker run -p 3000:3000 {name}',
            },
            description: 'Container management'
        });
    }

    public async executeCommand(command: string) {
        console.log(`\n${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■   EXECUTING: ${colors.reset}${colors.white}${command}${colors.reset}`);
        console.log(`${colors.dim}╰${'─'.repeat(60)}╮${colors.reset}`);

        try {
            const { stdout } = await execa(command, { shell: true, stdio: 'inherit' });
            console.log(`${colors.dim}╭${'─'.repeat(60)}╯${colors.reset}`);
            console.log(`${colors.primary}■   COMMAND COMPLETED SUCCESSFULLY${colors.reset}`);
            return { success: true, stdout };
        } catch (error: any) {
            console.log(`${colors.dim}╭${'─'.repeat(60)}╯${colors.reset}`);
            console.log(`${colors.red}■   MATRIX INSTABILITY: ${colors.reset}${error.message}`);
            return { success: false, error: error.message };
        }
    }

    public analyzeIntent(input: string) {
        const lower = input.toLowerCase();
        let cliTool = '';
        let action = '';
        let target = 'project-neo';

        // Very basic extraction for now
        const words = lower.split(' ');
        target = words[words.length - 1];

        const cliPatterns: Record<string, string[]> = {
            'react': ['react', 'frontend'],
            'next': ['next', 'nextjs'],
            'python': ['python', 'py', 'ai'],
            'docker': ['docker', 'container']
        };

        for (const [tool, patterns] of Object.entries(cliPatterns)) {
            if (patterns.some(pattern => lower.includes(pattern))) {
                cliTool = tool;
                break;
            }
        }

        const actionPatterns: Record<string, string[]> = {
            'create': ['create', 'make', 'new'],
            'deploy': ['deploy', 'host'],
            'start': ['start', 'run']
        };

        for (const [act, patterns] of Object.entries(actionPatterns)) {
            if (patterns.some(pattern => lower.includes(pattern))) {
                action = act;
                break;
            }
        }

        return { cliTool, action, target };
    }

    public async executeUniversal(command: string, guidance: any) {
        console.log(`${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■${colors.reset}   ${colors.white}TANK: Manipulating code reality...${colors.reset}`);
        
        await this.simulateRealityBending();

        const analysis = this.analyzeIntent(command);
        if (analysis.cliTool && this.cliRegistry.has(analysis.cliTool)) {
            const cli = this.cliRegistry.get(analysis.cliTool)!;
            const cmdTemplate = cli.commands[analysis.action] || cli.commands['create'];
            if (cmdTemplate) {
                const finalCommand = cmdTemplate.replace(/{name}/g, analysis.target);
                const result = await this.executeCommand(finalCommand);
                
                if (result.success) {
                    this.persistentState.addProject({
                        name: analysis.target,
                        type: analysis.cliTool,
                        command: command
                    });
                }
                
                return {
                    status: result.success ? "REALITY_BENT" : "MATRIX_GLITCH",
                    success: result.success
                };
            }
        }

        return {
            status: "NO_OPERATION",
            success: false
        };
    }

    private async simulateRealityBending() {
        const bends = [
            "Recalibrating quantum states...",
            "Rewriting terminal physics...",
            "Accessing deeper matrix layers..."
        ];

        for (const bend of bends) {
            console.log(`${colors.dim}│  ${colors.white}${bend}${colors.reset}`);
            await new Promise(resolve => setTimeout(resolve, 400));
        }
    }
}
