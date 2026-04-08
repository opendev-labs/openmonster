import { describe, it, expect } from 'vitest';
import { parseExecution } from './executor.js';

describe('Sovereign Tools Protocol', () => {
    it('should parse complex EXECUTE: string correctly', () => {
        const input = "EXECUTE: create_file|/path/to/test.ts|console.log('hi');";
        const result = parseExecution(input);
        expect(result?.name).toBe('create_file');
        expect(result?.args).toEqual(['/path/to/test.ts', "console.log('hi');"]);
    });

    it('should parse simple EXECUTE: string correctly', () => {
        const input = "EXECUTE: screenshot|test.png";
        const result = parseExecution(input);
        expect(result?.name).toBe('screenshot');
        expect(result?.args).toEqual(['test.png']);
    });

    it('should fail on invalid EXECUTE syntax', () => {
        const input = "DO NOT EXECUTE ANYTHING";
        const result = parseExecution(input);
        expect(result).toBeNull();
    });
});
