import { describe, it, expect, vi } from 'vitest';
import { getMonsterLogoLines } from './theme.js';

describe('Sovereign Visual Engine', () => {
    it('should generate a perfectly symmetrical 16-wide logo', () => {
        const lines = getMonsterLogoLines();
        expect(lines).toHaveLength(5);
        
        lines.forEach(line => {
            // Visual length ignoring ANSI colors
            const visualLength = line.replace(/\x1b\[[0-9;]*m/g, '').length;
            expect(visualLength).toBe(16);
        });
    });

    it('should have 4 symmetrical teeth in the last row', () => {
        const lastRow = getMonsterLogoLines()[4];
        const plain = lastRow.replace(/\x1b\[[0-9;]*m/g, '');
        // "  ▀▀  ▀▀  ▀▀  ▀▀  "
        expect(plain).toContain('▀▀  ▀▀  ▀▀  ▀▀');
    });
});
