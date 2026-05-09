#!/usr/bin/env node
/**
 * Build Script — Ridwan Akinfenwa Portfolio
 * Copies and processes source files into /dist
 */

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..');
const DIST = path.join(SRC, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  const size = (fs.statSync(dest).size / 1024).toFixed(1);
  console.log(`  ✓ ${path.relative(SRC, dest)} (${size}KB)`);
}

function copyDir(srcDir, destDir, exts) {
  if (!fs.existsSync(srcDir)) return;
  const files = fs.readdirSync(srcDir);
  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile, exts);
    } else if (!exts || exts.some(e => file.endsWith(e))) {
      copyFile(srcFile, destFile);
    }
  });
}

// Clean dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
ensureDir(DIST);

console.log('\n🏗  Building portfolio...\n');

// Copy HTML files
console.log('📄 HTML files:');
copyFile(path.join(SRC, 'index.html'), path.join(DIST, 'index.html'));

const pagesDir = path.join(SRC, 'pages');
const distPages = path.join(DIST, 'pages');
ensureDir(distPages);
['about.html', 'projects.html', 'skills.html', 'certifications.html', 'contact.html'].forEach(file => {
  copyFile(path.join(pagesDir, file), path.join(distPages, file));
});

// Copy CSS
console.log('\n🎨 CSS files:');
copyDir(path.join(SRC, 'css'), path.join(DIST, 'css'), ['.css']);

// Copy JS
console.log('\n⚡ JavaScript files:');
copyDir(path.join(SRC, 'js'), path.join(DIST, 'js'), ['.js']);

// Copy assets if they exist
if (fs.existsSync(path.join(SRC, 'assets'))) {
  console.log('\n🖼  Assets:');
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
}

// Write build metadata
const meta = {
  buildTime: new Date().toISOString(),
  version: require('../package.json').version,
  environment: process.env.NODE_ENV || 'development',
};
fs.writeFileSync(path.join(DIST, 'build-meta.json'), JSON.stringify(meta, null, 2));

console.log('\n✅ Build complete! Output → /dist\n');
console.log(`   Build time: ${meta.buildTime}`);
console.log(`   Environment: ${meta.environment}\n`);
