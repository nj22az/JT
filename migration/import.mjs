import {cp,mkdir,mkdtemp,readFile,rm,access,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';

const root=process.cwd(),pin='49c5d845128c49f73dd81b07778ad5c6f2a990fc';
try {await access(join(root,'index.html'));throw Error('Town already exists; import is one-time only.');}
catch(error){if(error.code!=='ENOENT')throw error;}
const temp=await mkdtemp(join(tmpdir(),'jt-import-')),source=join(temp,'source');
try {
 execFileSync('git',['clone','--depth=1','--filter=blob:none','--no-checkout','https://github.com/nj22az/nj22az.github.io.git',source],{stdio:'inherit'});
 execFileSync('git',['-C',source,'sparse-checkout','set','johansson-town','thuans-storage'],{stdio:'inherit'});
 execFileSync('git',['-C',source,'fetch','--depth=1','origin',pin],{stdio:'inherit'});
 execFileSync('git',['-C',source,'checkout',pin],{stdio:'inherit'});
 const paths=execFileSync('git',['-C',source,'ls-files','-z','johansson-town','thuans-storage'],{encoding:'utf8'}).split('\0').filter(Boolean);
 for(const path of paths){
  const target=path.replace(/^johansson-town\//,'');
  if(target.startsWith('runtime/'))continue; // Build only the current graph in this new repository.
  await mkdir(dirname(join(root,target)),{recursive:true});
  await cp(join(source,path),join(root,target));
 }
 const overrides=JSON.parse(await readFile(new URL('./overrides.json',import.meta.url),'utf8'));
 for(const [path,content] of Object.entries(overrides)){
  const target=resolve(root,path);
  if(!target.startsWith(root+'/'))throw Error('Invalid migration path');
  await mkdir(dirname(target),{recursive:true});await writeFile(target,content);
 }
 console.log('Imported source '+pin+'; build:pages will generate both current runtimes.');
}finally{await rm(temp,{recursive:true,force:true});}
