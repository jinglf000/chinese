const fs = require('fs');
const iconv = require('iconv-lite');


const readStream = fs.createReadStream('./test.html');

let data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
});

readStream.on('end', () => {
  console.log(data);
  console.log(iconv.decode(data, 'utf-8'));
});

readStream.on('error', (err) => {
  console.error(err);
});

console.log('完毕');