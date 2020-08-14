let promise = new Promise((resolve, reject)=> {
    setTimeout(() => {
        resolve('hahaha')
    }, 100)
}) 
console.log(33)

setTimeout(() => {
    promise.catch((res) => {
        console.log(res)
    })
}, 500)




