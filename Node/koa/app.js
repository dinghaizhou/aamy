// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const fs = require('fs')
// const bodyParser = require('koa-bodyparser');
// const controller = require('./controller');
// const nunjucks = require('nunjucks');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    port: config.port
});

console.log(sequelize)
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

var now = Date.now();

(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
})();

// app.use(bodyParser());
// add router middleware:
// app.use(controller());

// function createEnv(path, opts) {
//     var
//         autoescape = opts.autoescape === undefined ? true : opts.autoescape,
//         noCache = opts.noCache || false,
//         watch = opts.watch || false,
//         throwOnUndefined = opts.throwOnUndefined || false,
//         env = new nunjucks.Environment(
//             new nunjucks.FileSystemLoader(path, {
//                 noCache,  //不缓存
//                 watch, //监听
//             }), {
//                 autoescape, //是否转译
//                 throwOnUndefined  //当输出为 null 或 undefined 会抛出异常
//             });
//     if (opts.filters) {
//         for (var f in opts.filters) {
//             env.addFilter(f, opts.filters[f]);
//         }
//     }
//     return env;
// }

// var env = createEnv('views', {
//     watch: true,
//     filters: {
//         hex: function (n) {
//             return '0x' + n.toString(16);
//         }
//     }
// });

// var s = env.render('extend.html', { header: '小明', body: 'balabala' });
// console.log(s);

// 在端口3000监听:
app.listen(4000);
console.log('app started at port 4000...');