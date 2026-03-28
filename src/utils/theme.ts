import pc from 'picocolors';

export const symbols = {
    line: pc.red('║'),
    cornerTop: pc.red('╔'),
    cornerBottom: pc.red('╚'),
    diamond: pc.red('◆'),
    success: pc.green('✔'),
    error: pc.red('✘')
};

export function matrixHeader(title: string) {
    console.log(`\n${symbols.cornerTop}${pc.red('═'.repeat(60))}`);
    console.log(`${symbols.line} ${pc.bold(pc.red(title))}`);
    console.log(`${symbols.line}${pc.red('─'.repeat(60))}`);
}

export function matrixFooter(status: string) {
    console.log(`${symbols.line}${pc.red('─'.repeat(60))}`);
    console.log(`${symbols.line} ${pc.gray(status)}`);
    console.log(`${symbols.cornerBottom}${pc.red('═'.repeat(60))}\n`);
}
