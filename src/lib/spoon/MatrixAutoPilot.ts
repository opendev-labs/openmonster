import { spoonColors as colors } from './colors.js';
import { NEO_ASCII, TANK_ASCII } from './ascii.js';
import { PersistentState } from './PersistentState.js';
import { TankOperator } from './TankOperator.js';
import { TrinityCompanion } from './TrinityCompanion.js';

export class MatrixAutoPilot {
    public persistentState: PersistentState;
    public operators: {
        TANK: TankOperator;
        TRINITY: TrinityCompanion;
    };

    constructor(options: any = {}) {
        this.persistentState = new PersistentState();
        const tank = new TankOperator({ ...options, autoPilot: this });
        this.operators = {
            TANK: tank,
            TRINITY: new TrinityCompanion(tank, this)
        };
    }

    public async initiateNeoProtocol() {
        console.log(NEO_ASCII);
        console.log(`\n${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■${colors.reset}   ${colors.white}${colors.primary}NEO:${colors.reset} ${colors.white}"I know you're out there. I can feel you now."${colors.reset}`);

        const stats = this.persistentState.getStats();
        console.log(`${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■${colors.reset}   ${colors.white}${colors.cyan}SYSTEM:${colors.reset} ${colors.cyan}Analyzing reality constructs...${colors.reset}`);

        this.persistentState.updateBelief(0.2);
        this.persistentState.state.evolutionStage = "the_one";
        this.persistentState.saveState();

        console.log(`${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■${colors.reset}   ${colors.white}${colors.primary}NEO:${colors.reset} ${colors.cyan}"I'm going to show these people what you don't want them to see."${colors.reset}`);
        return { success: true, evolution: "the_one" };
    }

    public async initiateAutoPilot(neoCommand: string) {
        console.log(TANK_ASCII);
        console.log(`\n${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■${colors.reset}   ${colors.white}${colors.cyan}TANK:${colors.reset} ${colors.cyan}"I've got you, Neo. Initiating sequence..."${colors.reset}`);

        const guidance = await this.operators.TRINITY.guideNeo(neoCommand, { command: neoCommand });
        console.log(`${colors.dim}│${colors.reset}`);
        console.log(`${colors.primary}■${colors.reset}   ${colors.white}${colors.primary}TRINITY:${colors.reset} ${colors.cyan}"${guidance.message}"${colors.reset}`);

        // Route to the appropriate operator
        const result = await this.operators.TANK.executeUniversal(neoCommand, guidance);

        return {
            success: true,
            guidance: guidance,
            result: result,
            belief: guidance.belief,
            evolution: guidance.evolution
        };
    }
}
