import { spoonColors as colors } from './colors.js';
import { TRINITY_ASCII } from './ascii.js';
import { PersistentState } from './PersistentState.js';

export class TrinityCompanion {
    private persistentState: PersistentState;
    private tank: any;
    private autoPilot: any;

    constructor(tank: any, autoPilot: any) {
        this.persistentState = new PersistentState();
        this.tank = tank;
        this.autoPilot = autoPilot;
    }

    public async guideNeo(userInput: string, context: any) {
        const stats = this.persistentState.getStats();
        
        const responses: Record<string, string[]> = {
            beginning: [
                "I've been watching you, Neo. You're looking for answers.",
                "The spoon isn't real, Neo. Only your mind makes it so.",
            ],
            awakening: [
                "You're faster than you think. Believe in yourself.",
                "You're beginning to believe. I can feel it."
            ],
            the_one: [
                "You don't need my guidance anymore. You are The One.",
                "The Matrix is yours to command. What will you create?",
            ]
        };

        const level = stats.evolutionStage || 'awakening';
        const levelResponses = responses[level] || responses['awakening'];
        const response = levelResponses[Math.floor(Math.random() * levelResponses.length)];

        const newBelief = this.persistentState.updateBelief(0.05);

        return {
            message: response,
            belief: newBelief,
            level: level,
            evolution: level
        };
    }

    public async talk(query: string) {
        console.log(TRINITY_ASCII);
        console.log(`${colors.green}║ ${colors.white}TRINITY: ${colors.cyan}"${query}"${colors.reset}`);
        
        this.persistentState.updateBelief(0.01);
        return { success: true };
    }

    public async hack(target: string) {
        console.log(TRINITY_ASCII);
        console.log(`${colors.green}║ ${colors.white}TRINITY: ${colors.cyan}"Bypassing security for ${target}... [Dodge This]"${colors.reset}`);
        await this.simulateLoading('PENETRATING LAYER 7');
        return { success: true };
    }

    public async scan(network: string) {
        console.log(`${colors.green}║ ${colors.white}TRINITY: ${colors.cyan}"Scanning ${network} for vulnerabilities..."${colors.reset}`);
        await this.simulateLoading('NETWORK_TRACE');
        return { success: true };
    }

    public async rescue(operation: string) {
        console.log(`${colors.green}║ ${colors.white}TRINITY: ${colors.cyan}"Initiating rescue mission for ${operation}. I'm on my way."${colors.reset}`);
        await this.simulateLoading('RESURRECTION_PROTOCOL');
        return { success: true };
    }

    private async simulateLoading(msg: string) {
        const dots = ['.', '..', '...'];
        for (let i = 0; i < 3; i++) {
            process.stdout.write(`\r${colors.green}║ ${colors.white}${msg}${dots[i]}${colors.reset}`);
            await new Promise(r => setTimeout(r, 600));
        }
        process.stdout.write('\n');
    }
}
