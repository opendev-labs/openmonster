import { TextPrompt as V, SelectPrompt as k, isCancel as G } from "@clack/core";
import e from "picocolors";
import { symbols, colors } from "./theme.js";

// Sovereign Colors
const primaryColor = (s: string) => `\x1b[38;2;217;125;125m${s}\x1b[0m`;

const line = colors.dim('│');
const dash = colors.dim('─');
const d = colors.dim('╰');

export const sovereignText = (options: { message: string; placeholder?: string }) => {
    return new V({
        validate: (v: string | undefined) => !v ? "Manifestation required." : undefined,
        placeholder: options.placeholder,
        render() {
            const sym = this.state === 'cancel' ? e.red('■') : symbols.square;
            const header = `${line}\n${sym}  ${e.bold(e.white(options.message))}\n`;
            
            if (this.state === 'submit') {
                return `${header}${line}  ${e.dim(this.value || options.placeholder)}`;
            }
            if (this.state === 'cancel') {
                return `${header}${line}  ${e.strikethrough(e.dim(this.value ?? ""))}`;
            }
            
            return `${header}${line}  ${(this as any).valueWithCursor || e.dim(options.placeholder ?? "_")}\n${e.cyan(line)}`;
        }
    }).prompt();
};

export const sovereignSelect = (options: { message: string, options: { value: string, label: string, hint?: string }[] }) => {
    const renderOption = (opt: any, isActive: boolean) => {
        const char = isActive ? e.green('■') : e.dim('□');
        const label = isActive ? e.green(opt.label) : e.dim(opt.label);
        const hint = opt.hint ? e.dim(` (${opt.hint})`) : '';
        return `${char} ${label}${hint}`;
    };

    return new k({
        options: options.options,
        render() {
            const sym = this.state === 'cancel' ? e.red('■') : symbols.square;
            const header = `${line}\n${sym}  ${e.bold(e.white(options.message))}\n`;

            if (this.state === 'submit') {
                const opt = this.options[this.cursor];
                return `${header}${line}  ${e.dim(opt.label)}`;
            }
            if (this.state === 'cancel') {
                return `${header}${line}  ${e.strikethrough(e.dim("Selection aborted"))}`;
            }

            return `${header}${this.options.map((o, i) => `${e.cyan(line)}  ${renderOption(o, i === this.cursor)}`).join('\n')}\n${e.cyan(line)}`;
        }
    }).prompt();
};
