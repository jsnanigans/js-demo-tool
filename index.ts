// CLI tool, runs a JS file every time a file changes in a directory

import * as fs from 'fs';
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as child_process from 'child_process'; 
import chalk from 'chalk';
import {highlight} from 'cli-highlight';

const args = process.argv.slice(2);
const filePattern = args[0];
const dir = './topics'

if (!filePattern) {
  console.log('missing file pattern');
  process.exit(1);
}

const files = fs.readdirSync(dir);
// fuzzy find file
const file = files.find(f => f.includes(filePattern));

if (!file) {
  console.log('no file found');
  process.exit(1);
}

const watcher = chokidar.watch(dir, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

function printHeader() {
  const time = new Date().toLocaleTimeString();
  console.log(`${chalk.bgCyan(time)} ${chalk.green(file)}`);
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
