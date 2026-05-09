#!/usr/bin/env node
/**
 * Basic HTML sanity check — required files exist and declare HTML5.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  path.join(root, 'index.html'),
  path.join(root, 'pages', 'about.html'),
  path.join(root, 'pages', 'projects.html'),
  path.join(root, 'pages', 'skills.html'),
  path.join(root, 'pages', 'certifications.html'),
  path.join(root, 'pages', 'contact.html'),
];

let failed = false;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing: ${path.relative(root, file)}`);
    failed = true;
    continue;
  }
  const head = fs.readFileSync(file, 'utf8').slice(0, 500).toLowerCase();
  if (!head.includes('<!doctype html') && !head.includes('<!doctype')) {
    console.error(`No doctype in: ${path.relative(root, file)}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('✓ HTML validation passed');
