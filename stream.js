'use strict';

var fs = require('fs');

// 流的方式读取文件
// var rs = fs.createReadStream('test.txt', 'utf-8');

// rs.on('data', function (chunk) {
//   console.log('DATA:');
//   console.log(chunk);
// });

// rs.on('end', function () {
//   console.log('END');
// })

// rs.on('error', function (err) {
//   console.log('ERROR: ' + err);
// })

// 流的方式写文件
// var ws = fs.createWriteStream('test.txt', 'utf-8');
// ws.write('使用stream写入文本数据...\n');
// ws.write('END.');
// ws.end();

// var ws2 = fs.createWriteStream('test2.txt');
// ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
// ws2.write(new Buffer('END', 'utf-8'));
// ws2.end();

// pipe
var rs1 = fs.createReadStream('test.txt');
var ws1 = fs.createWriteStream('test2.txt');
rs1.pipe(ws1);