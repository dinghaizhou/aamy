'use strict';

var fs = require('fs');

// var data = 'Hello, Node.js Hello, Node.js Hello, Node.js';
// fs.writeFile('output.txt', data, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok.');
//     }
// });
try {
    fs.writeFileSync('output.txt', 'Hello, Node.js');
} catch(e) {
    console.log(e)
}
