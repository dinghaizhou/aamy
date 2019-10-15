'use strict'

let 
    fs = require('fs'), 
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || '.')

console.log('Static root dir' + root);

var server = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    var filepath = path.join(root, pathname)

    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + req.url);
            // 发送200响应:
            res.writeHead(200);
            // 将文件流导向res:
            fs.createReadStream(filepath).pipe(res);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + req.url);
            // 发送404响应:
            res.writeHead(404);
            res.end('404 Not Found');
        }
    });


})

server.listen(8080);
