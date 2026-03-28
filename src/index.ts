#!/usr/bin/env node
import { Command } from 'commander';
import { intro, outro, text, isCancel, cancel, spinner } from '@clack/prompts';
import pc from 'picocolors';
import { AriesEngine } from './core/aries.js';
import { queryNanoPiStream } from './providers/ollama.js';
import { executeTool, parseExecution } from './core/tools/executor.js';
import { matrixHeader, matrixFooter, symbols } from './utils/theme.js';

const program = new Command();
const engine = new AriesEngine();

program
  .name('monster')
  .description('Sovereign AI Architect 👾')
  .version('5.0.0');

// OMEGA - Full Loop
program
  .command('omega')
  .description('Run the full Aries Protocol loop autonomously')
  .argument('<goal>', 'Mission objective')
  .action(async (goal) => {
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

// CHAT - Core Agent
program
  .command('chat')
  .description('Enter the architectural chat with NanoPi')
  .action(async () => {
    intro(pc.bgRed(pc.black(' OPENMONSTER SOVEREIGN LINK ')));
    const s = spinner();
    
    while (true) {
        const input = await text({
            message: pc.red('◆ ') + pc.bold('Mission Input'),
            placeholder: 'Command the architect...'
        });

        if (isCancel(input)) {
            outro(pc.red('Neural Link Severed.'));
            process.exit(0);
        }

        s.start(pc.red('Neural Inference [STREAMING]...'));
        
        let response = '';
        console.log(`\n${symbols.line} ${pc.bold(pc.red('NanoPi 👾'))} ${pc.gray('[SOVEREIGN BRAIN]')}`);
        process.stdout.write(`${symbols.line} `);

        for await (const part of queryNanoPiStream(input as string)) {
            process.stdout.write(part);
            response += part;
        }
        process.stdout.write('\n');
        s.stop(pc.red('Inference Complete.'));

        // Check for Tool Execution
        const tool = parseExecution(response);
        if (tool) {
            s.start(pc.red(`EXECUTING: ${tool.name}...`));
            const result = await executeTool(tool.name, ...tool.args);
            s.stop(pc.green('Execution Success.'));
            console.log(`${symbols.line} ${pc.green(result)}\n`);
        }
    }
  });

// Custom HELP
program.on('--help', () => {
  console.log(`
${symbols.cornerTop}${pc.red('═'.repeat(60))}
${symbols.line}  ${pc.bold('OPENMONSTER 👾 — Sovereign AI Architect v5.0')}
${symbols.line}${pc.red('─'.repeat(60))}
${symbols.line}
${symbols.line}  ${pc.bold('COMMANDS:')}
${symbols.line}    monster chat           → Agentic chat with execution
${symbols.line}    monster omega <goal>   → Full Aries Loop (Autopilot)
${symbols.line}    monster build <desc>   → Manifest from description
${symbols.line}    monster exec <cmd>     → Execute shell through NanoPi
${symbols.line}
${symbols.line}  ${pc.bold('PROTOCOL:')}
${symbols.line}    🔴 SENSE | 🔴 ARCHITECT | 🔴 MANIFEST | 🔴 VALIDATE | 🔴 EXPORT
${symbols.line}
${symbols.cornerBottom}${pc.red('═'.repeat(60))}
  `);
});

program.parse();
