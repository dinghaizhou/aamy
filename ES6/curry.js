function curry (fn) {
    const args1 = Array.prototype.slice.call(arguments, 1)
    console.log(arguments)
    return function () {
        console.log(arguments)
      const args2 = Array.from(arguments)
      const arr = args1.concat(args2)
      return fn.apply(this, arr)
    }
  }

  // 需要柯里化的sum函数
const sum = (a, b) => {
    return a + b
  }
let res = curry(sum, 1)(2)
console.log(res)