#!/usr/bin/env node
/**
 * Performance budget — total dist size (rough cap).
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(path.resolve(__dirname, '..'), 'dist');
const MAX_MB = 25; // PDFs in assets can be large

function dirSize(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) total += dirSize(p);
    else total += st.size;
  }
  return total;
}

const bytes = dirSize(dist);
const mb = bytes / (1024 * 1024);
console.log(`dist/ size: ${mb.toFixed(2)} MB (limit ${MAX_MB} MB)`);

if (bytes > MAX_MB * 1024 * 1024) {
  console.error('Size budget exceeded');
  process.exit(1);
}
console.log('✓ Size check passed');
