const person = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = 2
        resolve(data)
      }, 1000)
    })
  }
  const add = (a) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = a + 3
        resolve(data)
      }, 1000)
    })
  }

  function *gen () {
    const res1 = yield person()
    console.log(res1)   // {name: 'keith', height: 180}
    const res2 = yield add(res1)
    console.log(res2)   // {name: 'keith', height: 180}
  }

  const g = gen()

  const run = gen => {
    const g = gen()

    const next = data => {
      let result = g.next(data)
      if (result.done) return result.value
      result.value.then(data => {
        next(data)
      })
    }
    next()
  }

  run(gen)