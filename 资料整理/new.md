### 关于new

#### 普通工厂函数
    function createPerson(name,sex){
        return {
            name:name,
            sex:sex
        };
    }
    var p =createPerson('张三','男');

#### 构造函数
- 构造函数创建一个空对象
- 构造函数里的this指向该空对象
- 空对象的内部原型指向构造函数的原型对象
- 构造函数执行完之后, 如果没有return的话, 就把该空对象返回  

    function Person(name) {
        this.name = name
        return this // 默认
    }
    let person_1 = new Person('Lily')
    person_1.constructor === Person // true

#### Class
    class Person {
        // sex = "Anonymous"
        constructor(name, age) {
            // 实例属性
            this.name = name
            this.age = age
        }
        // 原型属性
        say() {
            console.log(this.name + '今年' + this.age + '岁')
        }
    }
    let person_01 = new Person('Tom', '21')
    let person_02 = new Person('Lily', '18')
    console.log(Object.keys(person_01))  //['name', 'key']
    console.log(Object.getOwnPropertyNames(person_01))  //['name', 'key']
    console.log('name' in person_01)  // true
    console.log('say' in person_01)  // true
    console.log(person_01.hasOwnProperty('name'))    // true
    console.log(person_01.hasOwnProperty('say'))     // false
    console.log(Object.keys(person_01.__proto__)) //[]
    console.log(Object.getOwnPropertyNames(person_01.__proto__)) //[]





