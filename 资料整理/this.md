## 关于this
### 默认绑定  
    默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

### 隐式绑定
    函数的调用是在某个对象上触发的，即调用位置上存在上下文对象，典型的形式为 obj.fun()

### new绑定
    使用new来调用函数，会自动执行下面的操作：
* 创建一个新对象
* 将构造函数的作用域赋值给新对象，即this指向这个新对象
* 执行构造函数中的代码
* 返回新对象

### 硬绑定
* call  执行函数
* apply 执行函数，参数数组 
* bind  不执行函数

### 例题
    var number = 5;
    var obj = {
        number: 3,
        fn1: (function () {
            var number;
            this.number *= 2;
            number = number * 2;
            number = 3;
            return function () {
                var num = this.number;
                this.number *= 2;
                console.log(num);
                number *= 3;
                console.log(number);
            }
        })()
    }
    var fn1 = obj.fn1;
    fn1.call(null);
    obj.fn1();
    console.log(window.number);



