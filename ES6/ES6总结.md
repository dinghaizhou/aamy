## ES6简介
* ECMAJavaScript是浏览器脚本语言的标准，ECMA是标准化组织。ECMAScript 和 JavaScript 的关系是，前者是后者的规格（标准），后者是前者的一种实现（另外的 ECMAScript实现还有JScript 和 ActionScript）。日常场合，这两个词是可以互换的。
* ES6 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）
### Babel
1. Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。
2. .babelrc，配置文件
3. @babel/cli，Babel 提供命令行工具@babel/cli，用于命令行转码。

        npm install --save-dev @babel/cli
        npx babel example.js -o compiled.js
4. babel-node，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。
5. babel/register，@babel/register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。

        require('@babel/register');
        require('./es6.js');
6. polyfill，babel只转换愈发，polyfill转换新api。包含core-js和regenerator-runtime两个模块。
        import 'core-js';
        import 'regenerator-runtime/runtime';
        // 或者
        require('core-js');
        require('regenerator-runtime/runtime);
按需引入需要配置
    "presets": [
        [
            "@babel/env",
            {
                "useBuiltIns": "usage",
                "debug": false,
                "corejs": 3
            }
        ]
    ],
7.  @babel/plugin-transform-runtime， 解决babel转换遗留问题：
* babel 的 polyfill 转译api时，直接修改了全局变量的原型，有可能会带来意想不到的问题。
* babel 转译 syntax 时，有时候会使用一些辅助的函数（helper）来帮忙，每个文件都会生成

    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
            "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
            }
        ]
    ]
    引入plugin-transform-runtime后，api 从之前的直接修改原型改为了从一个统一的模块中引入，避免了对全局变量及其原型的污染，解决了第一个问题。helpers从之前的原地定义改为了从一个统一的模块中引入，使得打包的结果中每个 helper 只会存在一个，解决了第二个问题


