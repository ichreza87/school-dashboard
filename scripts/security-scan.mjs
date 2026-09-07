import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = path.resolve('..');
const patterns = [/api[_-]?key/i, /password\s*[:=]/i, /secret/i, /private[_-]?key/i, /NIK\s*[:=]\s*\d{16}/];
let found=false;
function scanDir(dir){
  for(const e of fs.readdirSync(dir, {withFileTypes:true})){
    if(e.name.startsWith('.git')|| e.name==='node_modules' || e.name==='dist') continue;
    const p=path.join(dir,e.name);
    if(e.isDirectory()) scanDir(p);
    else if(e.isFile() && /\.(ts|js|json|md|env)$/.test(e.name)){
      const c=fs.readFileSync(p,'utf8');
      for(const pat of patterns){ if(pat.test(c) && !p.includes('.example') && !p.includes('seed.ts') && !p.includes('security-scan')){ console.log(`⚠️  Possible secret pattern ${pat} in ${p}`); found=true; } }
    }
  }
}
console.log('Scanning for secrets/data nyata...');
scanDir(root);
if(found) console.log('Scan selesai: ada temuan, periksa manual.');
else console.log('✓ Tidak ada credential / data nyata terdeteksi.');
