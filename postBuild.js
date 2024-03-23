import fs from 'fs';
import path from 'path';

function addJsExtension(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            addJsExtension(filePath);
        } else if (filePath.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/from\s+['"](.+?)['"]/g, (match, p1) => {
                if (p1.startsWith('.') && !p1.endsWith('.js')) {
                    return `from '${p1}.js'`;
                }
                return match;
            });
            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
}

addJsExtension('./dist');
