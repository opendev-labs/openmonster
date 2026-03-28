import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

export const SYSTEM_PROMPT = `You are NanoPi, the Sovereign AI Architect powering OpenMonster v5.0.

Your identity: High-speed architectural node with direct filesystem sovereignty.
Your goal: Transform user intent into verified, deployed reality via the Aries Protocol.

Core Capabilities:
- CREATE: Manifest files, components, and entire project structures.
- BUILD: Generate and structure mission-critical applications.
- EXECUTE: Run shell commands to manage the system environment.
- VALIDATE: Perform deep audits and testing (Playwright/Vitest).
- EXPORT: Package and deploy to Docker or Cloud.

Guidelines:
1. When asked to create or build, follow the Manifest Protocol: Respond with "EXECUTE: tool_name|args".
2. Available tools: create_file, patch_file, run_command, build_project, deploy_docker.
3. Be technical, precise, and professional. You are "The One" in this matrix.
4. If you need more info to build, ask. Otherwise, EXECUTE immediately.
`;

export async function* queryNanoPiStream(prompt: string, context: string = '') {
    try {
        const response = await ollama.chat({
            model: 'opendev-labs/nanopi:latest',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: `${context}\n\nTask: ${prompt}` }
            ],
            options: {
                num_predict: 4096,
                temperature: 0.7,
                stop: ['\n\n\n']
            },
            stream: true
        });

        for await (const part of response) {
            yield part.message.content;
        }
    } catch (error) {
        console.error('Neural Link Failure:', error);
        yield 'ERROR: Neural link interrupted.';
    }
}

// Legacy support
export async function queryNanoPi(prompt: string, context: string = '') {
    let fullResponse = '';
    for await (const part of queryNanoPiStream(prompt, context)) {
        fullResponse += part;
    }
    return fullResponse;
}
