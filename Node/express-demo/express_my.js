
function express() {
    var funcs = []; // 待执行的函数数组
    var app = function (req, res) {
        console.log(111)
        var i = 0;

        function next() {
            var task = funcs[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }
        console.log(3333)
        next();
    }
    app.use = function (task) {
        console.log(task)
        funcs.push(task);
    }
    return app;    // 返回实例
}
module.exports = express;
