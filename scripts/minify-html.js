#!/usr/bin/env node
/**
 * Light minification of HTML in /dist (runs after build).
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(path.resolve(__dirname, '..'), 'dist');

/** Strip comments only — avoids breaking inline scripts/styles. */
function minifyHtml(src) {
  return src.replace(/<!--[\s\S]*?-->/g, '').trim();
}

function walkHtml(dir) {
  if (!fs.existsSync(dir)) {
    console.error('dist/ missing — run npm run build first');
    process.exit(1);
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(full);
    else if (e.name.endsWith('.html')) {
      const raw = fs.readFileSync(full, 'utf8');
      fs.writeFileSync(full, minifyHtml(raw), 'utf8');
      console.log('  minified', path.relative(dist, full));
    }
  }
}

walkHtml(dist);
console.log('✓ HTML minify pass complete');
