function step1(value) {
    setTimeout(() => {
        console.log(value)
        return 1
    }, 1000)
}
function step2(value) {
    setTimeout(() => {
        console.log(value + 1)
        return 2
    }, 2000)
}
function step3(value) {
    setTimeout(() => {
        console.log(value + 1)
        return 3
    }, 3000)
}
function step4(value) {
    setTimeout(() => {
        console.log(value + 1)
        return 4
    }, 4000)
}

function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step2(value2);
        var value4 = yield step3(value3);
        var value5 = yield step4(value4);
        console.log('end')
        // Do something with value4
    } catch (e) {
        // Handle any error from step1 through step4
    }
}

scheduler(longRunningTask(1));

function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}