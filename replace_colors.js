import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
const replacements = {
  'bg-red-800': 'bg-brand-500',
  'bg-red-900': 'bg-brand-900',
  'bg-red-500': 'bg-brand-500',
  'bg-red-600': 'bg-brand-500',
  'bg-red-200': 'bg-brand-200',
  'bg-red-100': 'bg-brand-100',
  'bg-red-50': 'bg-brand-50',
  'text-red-500': 'text-brand-600',
  'text-red-900': 'text-brand-800',
  'border-red-500': 'border-brand-500',
  'border-red-800': 'border-brand-500',
  'focus:border-red-800': 'focus:border-brand-500',
  'focus:ring-red-200': 'focus:ring-brand-200',
  'shadow-red-900': 'shadow-brand-900',
  'bg-red-600/10': 'bg-brand-500/10',
  'from-red-900/40': 'from-brand-900/40',
  'ring-red-200': 'ring-brand-200',
  'text-red-800': 'text-brand-700',
  'hover:border-red-800/30': 'hover:border-brand-500/30',
  'hover:border-red-800': 'hover:border-brand-500',
  'hover:text-red-800': 'hover:text-brand-700',
  'focus:ring-red-800': 'focus:ring-brand-500',
  'text-amber-500': 'text-brand-500',
  '%23991b1b': '%23F8B800',
  'shadow-red-100': 'shadow-brand-100'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, value);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
