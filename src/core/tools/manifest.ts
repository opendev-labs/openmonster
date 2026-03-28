import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';

export interface ManifestAction {
    file: string;
    content: string;
    action: 'create' | 'patch' | 'delete';
}

export class ManifestTool {
    async execute(actions: ManifestAction[]) {
        console.log(pc.red('║ ') + pc.bold('MANIFEST PROTOCOL: COMMENCING ATOMIC WRITE...'));
        
        for (const action of actions) {
            const fullPath = path.join(process.cwd(), action.file);
            
            try {
                if (action.action === 'create' || action.action === 'patch') {
                    await fs.ensureDir(path.dirname(fullPath));
                    await fs.writeFile(fullPath, action.content);
                    console.log(pc.red('║ ') + pc.green('✔ ') + pc.gray(`Manifested: ${action.file}`));
                } else if (action.action === 'delete') {
                    await fs.remove(fullPath);
                    console.log(pc.red('║ ') + pc.red('✘ ') + pc.gray(`Removed: ${action.file}`));
                }
            } catch (error: any) {
                console.log(pc.red('║ ') + pc.red('❗ ') + pc.bold(`Error: ${error.message}`));
            }
        }
    }
}
