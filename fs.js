'use strict';

// 异步读取文件
var fs = require('fs');
fs.readFile('hello.js', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})

// 异步读取二进制文件
fs.readFile('logo.png', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data); // data.toString('utf-8')
    console.log(data.length + 'bytes');
  }
})

// 同步读取文件
try {
  var data = fs.readFileSync('test.txt', 'utf-8');
  console.log(data);
} catch (error) {
  // 出错了
}

// 异步写文件
fs.writeFile('test.txt', 'writeFile', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('ok');
  }
})

// 同步写文件
fs.writeFileSync('test.txt', 'writeFileSync');

// 异步读取文件大小，创建时间等信息
fs.stat('test.txt', function (err, stat) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件
    console.log('isFile:' + stat.isFile());
    // 是否是目录
    console.log('isDirectory:' + stat.isDirectory());
    if (stat.isFile()) {
      // 文件大小
      console.log('size:' + stat.size);
      // 创建时间，Date对象
      console.log('birth time:' + stat.birthtime);
      // 修改时间
      console.log('modified time:' + stat.mtimeMs);
    }
  }
})

// 同步读取 statSync();