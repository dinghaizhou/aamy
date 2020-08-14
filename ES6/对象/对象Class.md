// ES5
    // function Point(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }
    // Point.prototype.toString = function () {
    //     return '(' + this.x + ', ' + this.y + ')';
    // };
    // var p1 = new Point(1, 2);
    // var p2 = new Point(2, 3);

    // console.log(Point.prototype.constructor == Point)          // true
    // console.log(p1 instanceof Point)                // true

    // ES6
    // 方案一
    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
        }
        toString() {
            return '(' + this.x + ', ' + this.y + ')'
        }
    }

    let p1 = new Point(1, 2)
    console.log(typeof Point)                            // "function"
    console.log(Point === Point.prototype.constructor)   // true
    // 事实上，类的所有方法都定义在类的prototype属性上面。
    let p2 = new p1.constructor(1, 2)
    console.log(p2)

    // 方案二
    class Ball {
        constructor() {
            // ...
        }
    }
    console.log(Ball.name)
    Object.assign(Ball.prototype, {
        toString() { },
        toValue() { }
    });



    // 区别：
    // 1. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
    // Object.keys(Point.prototype)  
    // []
    // Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]
    // toString方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。
    // var Point = function (x, y) {};
    // Point.prototype.toString = function() {};
    // Object.keys(Point.prototype)    // ["toString"]
    // Object.getOwnPropertyNames(Point.prototype)     // ["constructor","toString"]

    // 2.类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

    // 静态方法