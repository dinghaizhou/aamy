function fetch() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove({bio: '1223344'})
        }, 1000)
    })
}

function* gen(){
  var result = yield fetch();
  console.log(result.bio);
}

var g = gen();
var result = g.next();
result.value.then((data) => {
    g.next(data);
})
