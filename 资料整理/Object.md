### Object 方法
#### Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    const target = { a: 1, b: 2 };
    const source = { b: 4, c: 5 };
    Object.assign(target, source) === target  //true

#### Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

    class Point {
        constructor(x,y) {
            this.x = x
            this.y = y
        }
        calArea() {
            return this.x*this.y
        }
    }
    let point_1 = new Point(1,2)
    Object.getPrototypeOf(point_1)  // {constructor: ƒ, calArea: ƒ}

    let point_2 = Object.create(point_1)

    point_2.calArea()   // 2
    point_2 instanceof Point  //true
#### Object.getPrototypeOf() 返回指定对象的原型

#### Object.defineProperty(object, prop, descriptor)  方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。 set,get 和  value，writable 不能并存
    const object1 = {};

    Object.defineProperty(object1, 'property1', {
        value: 42,
        writable: false,   // 
        configurable: false,  //
        enumerable: false,
        set() {
            this
        },
        get() {
            this
        }
    });

    object1.property1 = 77;
    // throws an error in strict mode

    console.log(object1.property1);
    // expected output: 42
#### Object.defineProperties(obj, props) 直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
    var obj = {};
    Object.defineProperties(obj, {
        'property1': {
            value: true,
            writable: true
        },
        'property2': {
            value: 'Hello',
            writable: false
        }
        // etc. etc.
    });
#### Object.getOwnPropertyDescriptor() 指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
#### Object.getOwnPropertyDescriptors() 用来获取一个对象的所有自身属性的描述符。
#### Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。区别Object.keys()
#### Object.prototype.hasOwnProperty() 返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。 





#### Object.prototype.toString() 方法返回一个表示该对象的字符串。

    let obj = {name: 'haizhou'} 
    obj.toString() // [object Object]

    let arr = [1,2,3,4]
    arr.toString() // '1,2,3,4'

    let arr = []
    arr.toString() // ""

    function fn() {}
    fn.toString() //  "function fn() {}"

    let str = '123123'
    str.toString() // '123123'

    let num = 123
    num.toString()


#### object.valueOf() 返回值为该对象的原始值。
    let obj = {name: 'haizhou'} 
    obj.valueOf() // { name: 'haizhou'} 

    let arr = [1,2,3,4]
    arr.valueOf() // [1,2,3,4]

    let arr = []
    arr.valueOf() // []

    function fn() {}
    fn.valueOf() //  "function fn() {}"

    let str = '123123'
    str.valueOf() // '123123'
    let num = 123
    num.valueOf() // 123

    Array	返回数组对象本身。
    Boolean	布尔值。
    Date	存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。
    Function	函数本身。
    Number	数字值。
    Object	对象本身。这是默认情况。
    String	字符串值。
    Math 和 Error 对象没有 valueOf 方法。

#### object.keys() 返回可枚举的属性
##### Example 1
    class Person {
        constructor(name,age) {
            this.name = name
            this.age = age
        }
        say() {
            console.log(this.name)
        }
    }
    Person.prototype.isHuman = true
    let haizhou = new Person('haizhou', 18)

    Object.defineProperty(haizhou, '_name', {
        enumerable: false,
        get() {
            return 'name: ' + this.name
        },
        set(value) {
            this.name = value
        }
    })
    
    for(var i in haizhou) {
        console.log(i)
    }
    // "name", "age", 'isHuman'
    Object.keys(haizhou)  // ["name", "age"]
    Object.getOwnPropertyNames(haizhou)  // ["name", "age", "_name"]
#### Object.values() 返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

    Object.values(haizhou)  //["haizhou", 18, "name: haizhou"]
#### Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
    const object1 = {
        a: 'somestring',
        b: 42
    };
    for (const [key, value] of Object.entries(object1)) {
        console.log(`${key}: ${value}`);
    }

    // expected output:
    // "a: somestring"
    // "b: 42"

#### Object.keys(), Object.getOwnProperties(), for...in区别
* Object.keys()  可枚举，不包含原型链
* Object.getOwnProperties() 包含不可枚举，不包含原型链
* for ... in  可枚举，含原型链
* in 操作符
