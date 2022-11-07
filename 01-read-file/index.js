const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf-8');
const { stdout } = process;
readableStream.pipe(stdout)
    