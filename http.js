'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
// 导入http模块
var http = require('http');

// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir:' + root);

// 创建http server,并传入回调函数
var server = http.createServer(function (request, response) {
  // 回调函数接收request和response对象
  // // 获得HTTP请求的method和url
  // console.log(request.method + ':' + request.url);
  // // 将HTTP响应200写入response，同时设置Content-Type: text/html
  // response.writeHead(200, {'Content-Type': 'text/html'});
  // // 将HTTP响应的HTML内容写入response
  // response.end('<h1>Hello world!</h1>');

  // 获得URL的path，类似'/css/bootstrap.css'
  var pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似'/src/assets/css/bootstrap.css'
  var filepath = path.join(root, pathname);
  // 获取文件状态
  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在
      console.log('200' + request.url);
      // 发送200响应
      response.writeHead(200);
      // 将文件流导向response
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在
      console.log('404' + request.url);
      // 发送404响应
      response.writeHead(404);
      response.end('404 Not Found');
    }
  })
});

// 监听8080端口
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');

// // 文件服务器
// var url = require('url');
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

// var path = require('path');
// var workDir = path.resolve('.'); // 解析当前目录
// var filePath = path.join(workDir, 'pub', 'index.html');
