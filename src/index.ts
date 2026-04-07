#!/usr/bin/env node
import { Command } from 'commander';
import { intro, outro, text, isCancel, cancel, spinner, note, select } from '@clack/prompts';
import pc from 'picocolors';
import { AriesEngine } from './core/aries.js';
import { queryNanoPiStream } from './providers/ollama.js';
import { executeTool, parseExecution } from './core/tools/executor.js';
import { MatrixAutoPilot } from './lib/spoon/MatrixAutoPilot.js';
import { PluginLoader } from './lib/spoon/PluginLoader.js';
import { 
    matrixHeader, matrixFooter, symbols, streamHeader, streamFooter, 
    printLogo, printAnalytics, printTimeline, emojiMap, colors, 
    AnalyticsData, blockyLogo, printClackLogo, printHelpScreen
} from './utils/theme.js';
import { manifestSuccess } from './core/timewave.js';
import * as readline from 'readline';

const program = new Command();
const engine = new AriesEngine();
const matrix = new MatrixAutoPilot();
const loader = new PluginLoader();

program
  .name('monster')
  .description('Sovereign AI Architect 👾')
  .version('5.5.0')
  .action(() => {
    printHelpScreen();
  });

// OMEGA - Full Loop (Upgraded with Spoon Omega)
program
  .command('omega')
  .description('Run the full Spoon-Aries Omega loop autonomously')
  .argument('<goal>', 'Mission objective')
  .action(async (goal) => {
    // Combine both engines for maximum power
    matrixHeader(' SPOON-ARIES OMEGA ACTIVATED ');
    await matrix.initiateAutoPilot(goal);
    await engine.runOmega(goal);
  });

// BUILD - Quick Project
program
  .command('build')
  .description('Manifest a project from description')
  .argument('<desc>', 'What to build')
  .action(async (desc) => {
    await engine.runOmega(`Build: ${desc}`);
  });

// CREATE - Scaffolding
program
  .command('create')
  .description('Generate files or components')
  .argument('<type>', 'Type (api, component, page)')
  .argument('<name>', 'Name of the entity')
  .action(async (type, name) => {
    await engine.runOmega(`Create ${type} named ${name}`);
  });

// EXEC - Shell Proxy
program
  .command('exec')
  .description('Execute shell command via NanoPi enhancement')
  .argument('<cmd>', 'Shell command')
  .action(async (cmd) => {
    matrixHeader('Executing Sovereign Command');
    const result = await executeTool('run_command', cmd);
    console.log(`${symbols.line} Result: ${pc.green(result)}`);
    matrixFooter('Execution Complete');
  });

// FORGE - Create a Monster
program
  .command('forge')
  .description('Forge a new monster agent project')
  .argument('<name>', 'Name of the monster')
  .action(async (name) => {
    await engine.runOmega(`Create a monster agent project named ${name}`);
  });

// CONNECT - Link Integrations
program
  .command('connect')
  .description('Connect an integration channel (telegram, discord, whatsapp, google, opendev)')
  .argument('<channel>', 'Channel to connect')
  .action(async (channel) => {
    console.log();
    const s = spinner();
    s.start(`Connecting to ${channel.toUpperCase()}...`);
    await new Promise(r => setTimeout(r, 1000));
    s.stop(`Connected to ${channel.toUpperCase()} successfully.`);
    note(`${channel} channel is now active.`, 'Integrations');
    console.log();
  });

// --- MATRIX MANIFESTO COMMANDS ---

program
  .command('matrix')
  .alias('neo')
  .description('Become The One - Activate Neo Protocol')
  .option('--neo', 'Unlock full enlightenment')
  .option('--quantum', 'What is real?')
  .option('--status', 'Check your vibration level')
  .option('--train <program>', 'Load training simulations')
  .option('--become', 'Realize your potential')
  .option('--enter', 'Enter the construct')
  .option('--become', 'Become the One')
  .option('--i-am-neo', 'Final ascension')
  .option('--evolve <level>', 'Auto-evolution protocol')
  .action(async (options) => {
    if (options.status) {
        intro('Matrix Status');
        const stats = matrix.persistentState.getStats();
        note(`Belief: ${stats.belief}\nEvolution: ${stats.evolutionStage}\nReality: ${stats.realityManipulationLevel}`, 'Vibration Level');
        return;
    }
    if (options.quantum) {
        console.log(pc.cyan('\n║ ') + pc.white('[QUANTUM] "What is real? How do you define real?"'));
        return;
    }
    if (options.train) {
        const s = spinner();
        s.start(`Loading ${options.train.toUpperCase()} program...`);
        await new Promise(r => setTimeout(r, 1500));
        s.stop(`${options.train.toUpperCase()} Loaded. "I know Kung Fu."`);
        return;
    }
    await matrix.initiateNeoProtocol();
  });

program
  .command('bend')
  .description('Shape the digital world as it responds to will')
  .argument('[reality]', 'Reality specification to bend')
  .option('--mission <mission>', 'Strategic mission objective')
  .action(async (reality, options) => {
    const input = reality || options.mission;
    if (input?.toLowerCase().includes('no spoon')) {
        console.log(pc.magenta('\n║ ') + pc.bold('HE IS BEGINNING TO BELIEVE...'));
        return;
    }
    await matrix.initiateAutoPilot(input || "there is no spoon");
  });

program
  .command('awaken')
  .description('Let Morpheus guide your first steps to command')
  .argument('[query]', 'Reality to awaken')
  .option('--mission <mission>', 'Strategic objective')
  .option('--truth', 'See the constructs of the mind')
  .option('--full-potential', 'Free your mind completely')
  .action(async (query, options) => {
    if (options.truth) {
        console.log(pc.green('\n║ ') + pc.white('MORPHEUS: "The spoon is just a construct of your mind."'));
        return;
    }
    await matrix.operators.TRINITY.talk(query || options.mission || "I want to see the truth.");
  });

program
  .command('tank')
  .description('Activate Tank Operator Console')
  .argument('[task...]', 'Task for Tank to execute')
  .option('--reality <type>', 'Specify construct type')
  .option('--free-your-mind', 'Remove CLI constraints')
  .option('--bullet-time', 'Watch the bits move')
  .option('--self-upgrade', 'Internal evolution')
  .action(async (taskParts, options) => {
    if (options.freeYourMind) {
        console.log(pc.cyan('\n║ ') + pc.white('TANK: "There is no spoon. It is not the spoon that bends, it is only yourself."'));
    }
    const task = taskParts?.join(' ') || options.reality;
    if (task) {
      await matrix.operators.TANK.executeUniversal(task, { belief: 1 });
    } else {
      note('Tank Operator online. Waiting for instructions...', 'TANK');
    }
  });

program
  .command('oracle')
  .description('Consult the Oracle for predictions and OCI deployments')
  .option('--predict <what>', 'Future prediction')
  .option('--vision', 'Prophetic insight')
  .option('--wisdom <about>', 'Deep logic')
  .option('--upgrade <what>', 'Quantum consciousness layer')
  .action(async (options) => {
    const query = options.predict || options.wisdom || options.upgrade;
    console.log(pc.yellow('\n║ ') + pc.bold('ORACLE CONSOLE ACTIVATED'));
    if (options.vision) {
        console.log(pc.yellow('║ ') + pc.italic('"Don\'t try to bend the spoon. That\'s impossible."'));
    }
    await matrix.operators.TRINITY.talk(`Consulting Oracle about: ${query || 'the path'}`);
  });

program
  .command('mouse')
  .description('Invoke MOUSE the programmer for browser automation')
  .option('--generate <what>', 'New training simulation')
  .option('--manifest <what>', 'Manifest reality from thought')
  .option('--inject <what>', 'External plugin injection')
  .action(async (options) => {
    const task = options.generate || options.manifest || options.inject;
    note(`MOUSE is standing by for task: ${task || 'matrix exploration'}`, 'MOUSE');
  });

program
  .command('smith')
  .description('Invoke SMITH for system dominance and CLI harnessing')
  .option('--harness <tool>', 'Seize tool control')
  .option('--reveal <code>', 'Expose the underlying matrix')
  .option('--enhance <what>', 'Add new dimensions')
  .option('--wrap <what>', 'Quantum wrap existing logic')
  .action(async (options) => {
    const command = options.harness || options.enhance || options.wrap;
    if (options.reveal) {
        console.log(pc.red('\n║ ') + pc.white('SMITH: [EXPOSING MATRIX CODE] 0110101001...'));
    }
    note(`SMITH is analyzing target: ${command || 'system mainframes'}`, 'SMITH');
  });

program
  .command('trinity')
  .description('The Hacker Queen - Deep system penetration')
  .option('--hack <target>', 'Bypass restrictions')
  .option('--rescue <op>', 'Save failing build')
  .option('--pilot <ship>', 'Rapid prototyping')
  .option('--penetrate <target>', 'Database connection access')
  .option('--whisper <phrase>', 'Dodge this')
  .option('--ride <op>', 'Fast operations')
  .option('--open <target>', 'Unlock system portals')
  .option('--revive <op>', 'Revive dead code')
  .option('--follow <dir>', 'Follow the white rabbit')
  .option('--fly <dest>', 'Helicopter mode')
  .option('--scan <network>', 'Vulnerability scan')
  .option('--crack <target>', 'Encryption crack')
  .option('--shield <attack>', 'Active defense')
  .option('--counter <agent>', 'Counter-dominance')
  .option('--know <truth>', 'Deep consciousness')
  .option('--feel <code>', 'Tactile logic')
  .option('--sync <with>', 'Triad synchronization')
  .option('--trust <person>', 'Faith protocol')
  .action(async (options) => {
    if (options.hack) await matrix.operators.TRINITY.hack(options.hack);
    else if (options.rescue) await matrix.operators.TRINITY.rescue(options.rescue);
    else if (options.scan) await matrix.operators.TRINITY.scan(options.scan);
    else if (options.whisper) console.log(pc.cyan('\n║ ') + pc.bold('TRINITY: "Dodge this."'));
    else {
        const query = Object.keys(options)[0] || 'accessing mainframe';
        await matrix.operators.TRINITY.talk(`Trinity executing: ${query}`);
    }
  });

program
  .command('triad')
  .description('Activate the Neo-Trinity-Morpheus Triad')
  .option('--activate', 'Join forces')
  .action(async () => {
    intro('TRIAD ACTIVATED');
    matrixHeader(' BENDING REALITY ');
    note('Morpheus: "I can only show you the door."\nTrinity: "Dodge this."\nNeo: "I am the One."', 'SYNERGY');
    matrixFooter(' TRIAD CONSTRUCT STABILIZED ');
  });

// CHAT - TUI Dashboard Agent
program
  .command('chat')
  .description('Enter the architectural dashboard with NanoPi')
  .action(async () => {
    console.log(pc.bold(`  ${emojiMap.logo} OpenMonster — The Sovereign Architect`));
    console.log(`  Harnessing the Matrix. Professional. Acute. Symmetrical.\n`);
    
    const s = spinner();
    s.start('Preparing environment');
    await new Promise(r => setTimeout(r, 600));
    s.stop(`Node.js ${process.version} found`);

    console.log('\n');
    printClackLogo();
    console.log('\n');

    intro(` OpenMonster setup `);
    
    note(
        `OpenMonster is fully sovereign. Expect sharp edges.\n` +
        `This bot can read files and run actions if tools are enabled.\n` +
        `A bad prompt can trick it into doing unsafe things.`,
        'Security warning — please read.'
    );

    const proceed = await cancelAndSelect({
        message: 'Security acknowledged. Select agent model to initialize:',
        options: [
            { value: 'nanopi', label: 'ollama/opendev-labs/nanopi', hint: '(default)' },
            { value: 'qwen', label: 'qwen3-coder-30b (LM Studio)' },
            { value: 'deepseek', label: 'Deepseek Coder V2 (local)' }
        ]
    });

    note(
        `Active model: ${proceed}\nGateway: Loopback (127.0.0.1)\nStatus: Ready`,
        'Model status'
    );

    let chatActive = true;
    while (chatActive) {
        const input = await text({
            message: 'What are we building?',
            placeholder: 'Type a command...',
        });

        if (isCancel(input) || (input as string).trim() === '/quit') {
            outro('Setup cancelled.');
            break;
        }

        if (!input) continue;

        const aiSpinner = spinner();
        aiSpinner.start('Thinking...');

        let response = '';
        try {
            aiSpinner.stop('NanoPi is typing:');
            for await (const part of queryNanoPiStream(input as string)) {
                process.stdout.write(pc.magenta(part));
                response += part;
            }
            process.stdout.write('\n\n');
        } catch (err) {
            aiSpinner.stop('Connection destabilized.');
        }

        // Check for Tool Execution
        const tool = parseExecution(response);
        if (tool) {
            const exeSpinner = spinner();
            exeSpinner.start(`EXECUTING: ${tool.name.toUpperCase()}`);
            try {
                const result = await executeTool(tool.name, ...tool.args);
                exeSpinner.stop(`✓ Success`);
                note(`Tool Result:\n${result}`, 'Execution Engine');
            } catch (err: any) {
                exeSpinner.stop(`✘ Failed`);
                note(`Error: ${err.message}`, 'Execution Engine');
            }
        }
    }
  });

async function cancelAndSelect(options: any) {
    const result = await select(options);
    if (isCancel(result)) {
        outro('Setup cancelled.');
        process.exit(0);
    }
    return result;
}


// Custom HELP
program.on('--help', () => {
    printHelpScreen();
});

program.parseAsync().then(() => {
    // Post-parse actions can go here
});

// Load external consciousness modules (Zero-Touch Upgrade)
loader.loadPlugins(program);
