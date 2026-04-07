import fs from 'fs-extra';
import path from 'path';
import { spoonColors as colors } from './colors.js';

export interface SpoonState {
    belief: number;
    evolutionStage: string;
    projects: any[];
    operations: any[];
    trinityMemory: any[];
    morpheusGuidance: any[];
    oracleInsights: any[];
    ociDeployments: any[];
    pythonEnvironments: any[];
    aiModels: any[];
    mouseInsights: any[];
    browserAgents: any[];
    systemInfections: number;
    clisHarnessed: string[];
    apiKeys: Record<string, string>;
    assistantModel: string;
    totalCommands: number;
    realityManipulationLevel: string;
    agentEncounters: number;
    systemControl: number;
    hardlineTokens: number;
    isPhoneBoothEnabled: boolean;
    isTheOne: boolean;
    githubUser: string | null;
    githubToken: string | null;
    lastAscension: string;
}

export class PersistentState {
    private stateFile: string;
    public state: SpoonState;

    constructor() {
        this.stateFile = path.join(process.cwd(), '.spoon-state.json');
        this.state = this.loadState();
    }

    private loadState(): SpoonState {
        try {
            if (fs.existsSync(this.stateFile)) {
                const data = fs.readFileSync(this.stateFile, 'utf8');
                return JSON.parse(data);
            }
        } catch (e) {}

        return {
            belief: 0.45,
            evolutionStage: "awakening",
            projects: [],
            operations: [],
            trinityMemory: [],
            morpheusGuidance: [],
            oracleInsights: [],
            ociDeployments: [],
            pythonEnvironments: [],
            aiModels: [],
            mouseInsights: [],
            browserAgents: [],
            systemInfections: 0,
            clisHarnessed: [],
            apiKeys: {},
            assistantModel: 'anthropic/claude-3.5-sonnet',
            totalCommands: 23,
            realityManipulationLevel: "basic",
            agentEncounters: 0,
            systemControl: 0.45,
            hardlineTokens: 100,
            isPhoneBoothEnabled: false,
            isTheOne: false,
            githubUser: null,
            githubToken: null,
            lastAscension: new Date().toISOString()
        };
    }

    public saveState() {
        try {
            fs.writeFileSync(this.stateFile, JSON.stringify(this.state, null, 2));
        } catch (e: any) {
            console.log(`${colors.red}║ ${colors.white}Reality instability: ${e.message}${colors.reset}`);
        }
    }

    public getEvolutionStage(): string {
        if (this.state.belief < 0.3) return "beginning";
        if (this.state.belief < 0.7) return "awakening";
        return "the_one";
    }

    public updateBelief(increment: number = 0.05): number {
        const oldStage = this.getEvolutionStage();
        this.state.belief = Math.min(1, this.state.belief + increment);
        this.state.totalCommands += 1;
        this.state.systemControl = Math.min(1, this.state.systemControl + (increment * 0.8));

        const newStage = this.getEvolutionStage();
        if (oldStage !== newStage) {
            this.state.evolutionStage = newStage;
            this.state.lastAscension = new Date().toISOString();
            console.log(`${colors.cyan}║ ${colors.white}EVOLUTION: ${oldStage.toUpperCase()} → ${newStage.toUpperCase()}${colors.reset}`);
        }

        if (this.state.belief >= 0.8) this.state.realityManipulationLevel = "neo";
        else if (this.state.belief >= 0.6) this.state.realityManipulationLevel = "system_rewriting";
        else if (this.state.belief >= 0.4) this.state.realityManipulationLevel = "advanced";

        this.saveState();
        return this.state.belief;
    }

    public addProject(project: any) {
        this.state.projects.push({
            ...project,
            created: new Date().toISOString(),
            beliefLevel: this.state.belief
        });
        this.saveState();
    }

    public getStats() {
        return {
            ...this.state,
            projects: this.state.projects.length,
            operations: this.state.operations.length,
            memory: this.state.trinityMemory.length,
            oracleInsights: this.state.oracleInsights.length,
            githubToken: this.state.githubToken ? '****' + this.state.githubToken.slice(-4) : null
        };
    }
}
