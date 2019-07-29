
// 重写数组的Symbol.iterator,让 for of失效
/*
function createIterator() {
    let index = 0;
    var that = this
    return {
        next: function() {
            return index++ == that.length ? 
            {value: undefined, done: true} : {value: 3, done: false}
        }
    }
}
Array.prototype[Symbol.iterator] = createIterator
let arr = [1,2,3]
let iterator = arr[Symbol.iterator]()


for (var item of arr) {
    console.log(item)
}
*/

// 给对象的原型上加Symbol.iterator，使对象可以实用for of

// 不加下面的代码，对象for of 会报错
Object.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
var obj = {
    1: 1,
    2: 2,
    3: 3
}
for (var item of obj) {
    console.log(item)
}
console.log(3)




