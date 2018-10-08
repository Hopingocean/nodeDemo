'use strict';

var greet = require('./hello');
var s = 'Lee';
greet(s);

// node 全局对象
global.console;
process.version;
process.platform;
process.arch;
process.cwd(); // 当前工作目录
// process.chdir('/node_demo'); // 切换当前工作目录

// process.nextTick()将在下一轮事件循环中调用
process.nextTick(function () {
  console.log('2');
})
console.log('1');

// 程序即将退出时的回调函数
process.on('exit', function (code) {
  console.log('exit:' + code);
})

if (typeof(window) === 'undefined') {
  console.log('node.js');
} else {
  console.log('browser');
}
