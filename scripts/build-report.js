#!/usr/bin/env node
/**
 * Append simple build report next to dist output.
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(path.resolve(__dirname, '..'), 'dist');
const reportPath = path.join(dist, 'build-report.json');

if (!fs.existsSync(dist)) {
  console.error('dist/ missing — run npm run build first');
  process.exit(1);
}

const report = {
  generatedAt: new Date().toISOString(),
  note: 'Portfolio static build — see build-meta.json for version',
};
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log('✓ Build report written to', path.relative(path.join(dist, '..'), reportPath));
