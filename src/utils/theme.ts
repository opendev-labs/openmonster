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
    line: colors.primary('║'),
    cornerTop: colors.primary('╔'),
    cornerBottom: colors.primary('╚'),
    diamond: colors.primary('◆'),
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

export const blockyLogo = `
       ${colors.primary('▄▄████████▄▄')}
     ${colors.primary('████████████████')}
     ${colors.primary('██')}${pc.black('▄▄')}${colors.primary('████████')}${pc.black('▄▄')}${colors.primary('██')}
     ${colors.primary('████████████████')}
       ${colors.primary('▀▀  ▀▀  ▀▀  ▀▀')}
`;

export function printClackLogo() {
    console.log(blockyLogo);
}

export function printHelpScreen() {
    const width = 64;
    const title = ' OpenMonster v5.0.0 ';
    
    console.log();
    console.log(`${colors.primary('╭')}${colors.dim('─')}${colors.primary(title)}${colors.dim('─'.repeat(width - title.length - 1))}${colors.primary('╮')}`);
    
    // Blank line
    console.log(`${colors.dim('│')}${' '.repeat(width)}${colors.dim('│')}`);
    
    const welcome = 'Welcome back Creator!';
    const welcomePad = Math.floor((width - welcome.length) / 2);
    console.log(`${colors.dim('│')}${' '.repeat(welcomePad)}${pc.bold(welcome)}${' '.repeat(width - welcome.length - welcomePad)}${colors.dim('│')}`);
    
    // Logo padding
    console.log(`${colors.dim('│')}${' '.repeat(width)}${colors.dim('│')}`);
    const logoLines = [
        `   ${colors.primary('▄▄████▄▄')}   `,
        ` ${colors.primary('████████████')} `,
        ` ${colors.primary('██')}  ${colors.primary('████')}  ${colors.primary('██')} `,
        ` ${colors.primary('████████████')} `,
        `  ${colors.primary('▀▀  ▀▀  ▀▀')}  `
    ];
    
    for (const line of logoLines) {
        // Perfect 14-character visual length for symmetry
        const visualLength = 14;
        const pad = Math.floor((width - visualLength) / 2);
        console.log(`${colors.dim('│')}${' '.repeat(pad)}${line}${' '.repeat(width - visualLength - pad)}${colors.dim('│')}`);
    }
    
    console.log(`${colors.dim('│')}${' '.repeat(width)}${colors.dim('│')}`);
    
    const statusLine = `NanoPi 5.0 · Telegram / Discord · ${process.env.USER || 'Local'} OS`;
    const statusPad = Math.floor((width - statusLine.length) / 2);
    console.log(`${colors.dim('│')}${' '.repeat(statusPad)}${colors.dim(statusLine)}${' '.repeat(width - statusLine.length - statusPad)}${colors.dim('│')}`);
    
    const dirLine = `~/OpenMonster/Core`;
    const dirPad = Math.floor((width - dirLine.length) / 2);
    console.log(`${colors.dim('│')}${' '.repeat(dirPad)}${colors.dim(dirLine)}${' '.repeat(width - dirLine.length - dirPad)}${colors.dim('│')}`);
    
    console.log(`${colors.dim('│')}${' '.repeat(width)}${colors.dim('│')}`);
    console.log(`${colors.primary('╰')}${colors.dim('─'.repeat(width))}${colors.primary('╯')}`);
    
    console.log();
    console.log(`  ${colors.dim('↑')} Run ${pc.bold('monster chat')} to enter the architectural dashboard.`);
    console.log(`  ${colors.dim('↑')} Run ${pc.bold('monster connect <channel>')} to link integrations.`);
    console.log();
}

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
    console.log(`\n${symbols.cornerTop}${colors.primary('═'.repeat(60))}`);
    console.log(`${symbols.line} ${pc.bold(colors.primary(title))}`);
    console.log(`${symbols.line}${colors.primary('─'.repeat(60))}`);
}

export function matrixFooter(status: string) {
    console.log(`${symbols.line}${colors.primary('─'.repeat(60))}`);
    console.log(`${symbols.line} ${colors.dim(status)}`);
    console.log(`${symbols.cornerBottom}${colors.primary('═'.repeat(60))}\n`);
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
