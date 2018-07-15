const program = require('commander');
const assert = require('assert');
const fs = require('fs');
const parse = require('.');

program
    .version('0.0.1')
    .option('-f, --file [file]', 'File path')
    .parse(process.argv);

const { file } = program;
assert.ok(file, 'Please specify a json file to parse')
const text = fs.readFileSync(file).toString();
const json = parse(text);
console.log(JSON.stringify(json, null, 4));

