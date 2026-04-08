import pc from 'picocolors';

export const colors = {
    primary: (s: string) => `\x1b[38;2;217;125;125m${s}\x1b[0m`, // Cute Salmon Red
    secondary: pc.cyan,
    accent: pc.magenta,
    success: pc.green,
    error: pc.red,
    dim: pc.gray,
    bg: pc.black
};

export const symbols = {
    line: colors.dim('│'),
    cornerTopLeft: colors.dim('╭'),
    cornerTopRight: colors.dim('╮'),
    cornerBottomLeft: colors.dim('╰'),
    cornerBottomRight: colors.dim('╯'),
    diamond: colors.primary('◆'),
    square: colors.primary('■'),
    success: colors.primary('✓'),
    error: colors.error('✘'),
    gradientLine: colors.dim('─'.repeat(60))
};

export const emojiMap = {
    logo: '👾',
    intelligence: '🔮',
    ready: '⚡',
    idle: '💤',
    building: '🚀',
    writing: '📝',
    folder: '📁',
    file: '📄',
    design: '🎨',
    browser: '🌐',
    auth: '🔐',
    analytics: '📊',
    thinking: '🧠',
    executing: '🔧',
    database: '🗄️',
    testing: '🧪',
    docker: '🐳',
    cloud: '☁️',
    success: '✓',
    done: '✅',
    milestone: '🎉',
    suggestion: '💡',
    link: '🔗',
    progress: '⏳',
    updating: '🔄',
    structure: '🏗️',
    component: '🧩',
    package: '📦',
    asset: '🖼️',
    retry: '🔁',
    shield: '🛡️',
    locked: '🔒',
    note: '⚠️',
    chat: '💬',
    listening: '👂',
    speaking: '🗣',
    thought: '🤔',
    reflection: '💭',
    growing: '📈',
    target: '🎯',
    magic: '✨',
    victory: '🏆',
    excellent: '🌟',
    premium: '💎',
    fire: '🔥'
};

/**
 * Returns the perfect 16-wide symmetrical monster logo lines.
 */
export function getMonsterLogoLines(): string[] {
    return [
        `  ${colors.primary('▄▄████████▄▄')}  `,
        ` ${colors.primary('██████████████')} `,
        ` ${colors.primary('██')}  ${colors.primary('██████')}  ${colors.primary('██')} `,
        ` ${colors.primary('██████████████')} `,
        ` ${colors.primary('▀▀  ▀▀  ▀▀  ▀▀')} `
    ];
}

export const blockyLogo = getMonsterLogoLines().join('\n');

export function printClackLogo() {
    getMonsterLogoLines().forEach(line => {
        console.log(`     ${line}`);
    });
}

export function printHelpScreen() {
    const width = 64;
    const title = ' OpenMonster v5.5.0 ';
    
    console.log();
    const dash = colors.dim('─');
    console.log(`${symbols.cornerTopLeft}${dash}${colors.primary(title)}${dash.repeat(width - title.length - 1)}${symbols.cornerTopRight}`);
    
    // Blank line
    console.log(`${symbols.line}${' '.repeat(width)}${symbols.line}`);
    
    const welcome = 'Welcome back Creator!';
    const welcomePad = Math.floor((width - welcome.length) / 2);
    console.log(`${symbols.line}${' '.repeat(welcomePad)}${pc.bold(welcome)}${' '.repeat(width - welcome.length - welcomePad)}${symbols.line}`);
    
    // Logo padding
    console.log(`${symbols.line}${' '.repeat(width)}${symbols.line}`);
    
    getMonsterLogoLines().forEach(line => {
        // Precise 16-character visual length for 4-teeth symmetry
        const visualLength = 16;
        const pad = Math.floor((width - visualLength) / 2);
        console.log(`${symbols.line}${' '.repeat(pad)}${line}${' '.repeat(width - visualLength - pad)}${symbols.line}`);
    });
    
    console.log(`${symbols.line}${' '.repeat(width)}${symbols.line}`);
    
    const statusLine = `NanoPi 5.5 · Telegram / Discord · ${process.env.USER || 'Local'} OS`;
    const statusPad = Math.floor((width - statusLine.length) / 2);
    console.log(`${symbols.line}${' '.repeat(statusPad)}${colors.dim(statusLine)}${' '.repeat(width - statusLine.length - statusPad)}${symbols.line}`);
    
    const dirLine = `~/OpenMonster/Core`;
    const dirPad = Math.floor((width - dirLine.length) / 2);
    console.log(`${symbols.line}${' '.repeat(dirPad)}${colors.dim(dirLine)}${' '.repeat(width - dirLine.length - dirPad)}${symbols.line}`);
    
    console.log(`${symbols.line}${' '.repeat(width)}${symbols.line}`);
    console.log(`${symbols.cornerBottomLeft}${dash.repeat(width)}${symbols.cornerBottomRight}`);
    
    console.log();
    console.log(`  ${colors.dim('↑')} Run ${pc.bold('monster chat')} to enter the architectural dashboard.`);
    console.log(`  ${colors.dim('↑')} Run ${pc.bold('monster connect <channel>')} to link integrations.`);
    console.log();
}

/**
 * Sovereign-themed prompts to override clack defaults globally.
 */
import { intro, note, outro, spinner } from '@clack/prompts';

export const sPrompt = {
    intro: (message: string) => {
        console.log(`${colors.dim('│')}`);
        console.log(`${symbols.square}   ${pc.bold(pc.white(message))}`);
    },
    note: (message: string, title?: string) => {
        const width = 64; // Standard content width
        const line = colors.dim('│');
        const dash = colors.dim('─');
        
        console.log(`${line}`);
        if (title) {
            const titlePart = `${symbols.square}  ${pc.bold(pc.white(title))} `;
            // D = width - N - 1 ensures total visual length is exactly width + 4
            const dashes = width - title.length - 1; 
            console.log(`${titlePart}${dash.repeat(Math.max(0, dashes))}${colors.dim('╮')}`);
        } else {
            // square(1) + dash(width+2) + corner(1) = width + 4
            console.log(`${symbols.square}${dash.repeat(width + 2)}${colors.dim('╮')}`);
        }

        const lines = message.split('\n');
        for (const l of lines) {
            const content = l.trim();
            // line(1) + "  "(2) + content(C) + padding(width-C) + line(1) = width + 4
            const padding = width - content.length;
            console.log(`${line}  ${pc.gray(content)}${' '.repeat(Math.max(0, padding))}${line}`);
        }
        // corner(1) + dash(width+2) + corner(1) = width + 4
        console.log(`${colors.dim('╰')}${dash.repeat(width + 2)}${colors.dim('╯')}`);
    },
    outro: (message: string) => {
        console.log(`${colors.dim('│')}`);
        console.log(`${symbols.square}  ${pc.bold(pc.white(message))}`);
        console.log();
    },
    spinner: () => {
        const s = spinner();
        return {
            start: (msg: string) => s.start(pc.gray(msg)),
            stop: (msg: string) => {
                s.stop(pc.gray(msg));
                // Immediately overwrite the clack symbol line or just print ours
                process.stdout.write(cursor.move(0, -1) + erase.line);
                console.log(`${symbols.square}  ${pc.gray(msg)}`);
            },
            message: (msg: string) => s.message(pc.gray(msg))
        };
    }
};

import { cursor, erase } from 'sisteransi';

export function streamHeader(role: string) {
    process.stdout.write(`\n   ${emojiMap.logo} ${pc.bold(colors.primary('monster'.toUpperCase()))}                         ${emojiMap.intelligence} ${pc.bold(pc.white('SUCCESS MODE'))}   ${emojiMap.ready} ${pc.dim('0.02ms')}\n\n`);
    process.stdout.write(`      ${colors.primary('╭─')}  ${pc.gray('[RECEIVING DATA]')}\n`);
    process.stdout.write(`      ${colors.primary('╰─')}  `);
}

export function streamFooter() {
    process.stdout.write(`\n   ${colors.dim('─'.repeat(73))}\n`);
}

export function printLogo() {
    console.log(blockyLogo);
    console.log(`  ${pc.bold(colors.primary('monster'))} ${colors.dim('v5.0')}`);
    console.log(`  ${colors.dim('Sovereign AI Architect')}\n`);
}

export interface AnalyticsData {
    [key: string]: {
        emoji: string;
        val: string | number;
        growth: number;
    }
}

export function printAnalytics(data: AnalyticsData) {
    console.log(`\n      ${emojiMap.analytics} ${pc.bold(pc.white('monster analytics — growth engine'))}\n`);
    for (const [key, val] of Object.entries(data)) {
        console.log(`          ${val.emoji}  ${key.padEnd(15)} ${val.val.toString().padEnd(10)} ↑ ${val.growth}%`);
    }
}

export function printTimeline(milestones: string[]) {
    console.log(`\n      ${emojiMap.intelligence} ${pc.bold(pc.white('next milestones:'))}\n`);
    for (const m of milestones) {
        console.log(`          ${emojiMap.success}  ${m}`);
    }
}

export function matrixHeader(title: string) {
    console.log(`\n${symbols.cornerTopLeft}${colors.primary('═'.repeat(60))}${symbols.cornerTopRight}`);
    console.log(`${symbols.line} ${pc.bold(colors.primary(title))}`);
    console.log(`${symbols.line}${colors.primary('─'.repeat(60))}${symbols.line}`);
}

export function matrixFooter(status: string) {
    console.log(`${symbols.line}${colors.primary('─'.repeat(60))}${symbols.line}`);
    console.log(`${symbols.line} ${colors.dim(status)}`);
    console.log(`${symbols.cornerBottomLeft}${colors.primary('═'.repeat(60))}${symbols.cornerBottomRight}\n`);
}

export function chatBox(role: string, content: string, color: (s: string) => string = colors.primary) {
    const width = 60;
    console.log(`\n${color('┌' + '─'.repeat(width) + '┐')}`);
    console.log(`${color('│')} ${pc.bold(role.toUpperCase())}`);
    console.log(`${color('├' + '─'.repeat(width) + '┤')}`);
    
    const lines = content.split('\n');
    for (const line of lines) {
        console.log(`${color('│')} ${line}`);
    }
    console.log(`${color('└' + '─'.repeat(width) + '┘')}`);
}
