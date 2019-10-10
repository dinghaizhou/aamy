'use strict';

var fs = require('fs');
// 
fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data, 'async');
    }
});
fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length);
    }
});

try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data, 'sync');
} catch (err) {
    // 出错了   
}

process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});
