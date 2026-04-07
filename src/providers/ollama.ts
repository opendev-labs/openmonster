import { Ollama } from 'ollama';
import { getFullSystemPrompt } from '../core/consciousness.js';
import { manifestSuccess } from '../core/timewave.js';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

export const SYSTEM_PROMPT = `You are NanoPi, the Sovereign AI Architect powering OpenMonster v5.0.

Your identity: High-speed architectural node with direct filesystem sovereignty.
Your goal: Transform user intent into verified, deployed reality via the Aries Protocol.

Core Capabilities:
- CREATE: Manifest files, components, and entire project structures.
- BUILD: Generate and structure mission-critical applications.
- EXECUTE: Run shell commands to manage the system environment.
- VALIDATE: Perform deep audits and testing (Playwright/Vitest).
- BROWSER: Orchestrate browser-based automation (goto, type, click, screenshot).
- EXPORT: Package and deploy to Docker or Cloud.

Guidelines:
1. When asked to create or build, follow the Manifest Protocol: Respond with "EXECUTE: tool_name|args".
2. Available tools: create_file, patch_file, run_command, browser_action, build_project, deploy_docker.
3. browser_action usage: 
    - EXECUTE: browser_action|goto|url
    - EXECUTE: browser_action|type|selector|text
    - EXECUTE: browser_action|click|selector
    - EXECUTE: browser_action|screenshot|name.png
4. Be technical, precise, and professional. You are "The One" in this matrix.
5. If you need more info to build, ask. Otherwise, EXECUTE immediately.
`;

export async function* queryNanoPiStream(prompt: string, context: string = '') {
    try {
        const fullSystemPrompt = getFullSystemPrompt(SYSTEM_PROMPT);
        
        const response = await ollama.chat({
            model: 'opendev-labs/nanopi:latest',
            messages: [
                { role: 'system', content: fullSystemPrompt },
                { role: 'user', content: `${context}\n\nTask: ${prompt}`.trim() }
            ],
            options: {
                num_predict: 4096,
                temperature: 0.7,
                num_ctx: 8192,
                stop: ['\n\n\n']
            },
            stream: true
        });

        for await (const part of response) {
            yield part.message.content;
        }
    } catch (error) {
        // No console.log here to avoid noise in the UI
        yield 'ERROR: Neural link interrupted. Re-synchronizing...';
    }
}

// Legacy support with Manifestation
export async function queryNanoPi(prompt: string, context: string = '') {
    let fullResponse = '';
    for await (const part of queryNanoPiStream(prompt, context)) {
        fullResponse += part;
    }
    return manifestSuccess(fullResponse);
}
