// CLI tool, runs a JS file every time a file changes in a directory

import * as fs from 'fs';
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as child_process from 'child_process'; 
import chalk from 'chalk';
import {highlight} from 'cli-highlight';

const args = process.argv.slice(2);
const file = args[0];
const dir = './topics'

if (!file) {
  console.log('Usage: node index.js <directory> <file>');
  process.exit(1);
}


const watcher = chokidar.watch(dir, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

function printHeader() {
  console.log(`${chalk.bgCyan(Date.now())} ${chalk.green(file)}`);
  console.log();
}

function handleFileChange(filePath: string) {
  if (path.basename(filePath) === file) {
    console.clear();
    printHeader();
    child_process.exec(`bun ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(highlight(stdout, {language: 'js', ignoreIllegals: true}));
    });
  }
}

watcher.on('change', handleFileChange);


handleFileChange(path.join(dir, file));
