import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getPackageJson() {
  try {
    const packageJsonPath = path.resolve(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson;
  } catch (error) {
    // @ts-ignore
    console.error('Error reading package.json:', error.message);
    throw error;
  }
}

export function getUserDataPath() {
    const appName = getPackageJson().name;
    let dataPath;

    switch (process.platform) {
        case 'darwin': // macOS
            dataPath = path.join(os.homedir(), 'Library', 'Application Support', appName);
            break;
        case 'win32': // Windows
            dataPath = path.join(process.env.APPDATA || os.homedir(), appName);
            break;
        case 'linux': // Linux
        default:
            dataPath = path.join(os.homedir(), '.config', appName); // or ~/.local/share
            break;
    }
    return dataPath;
}