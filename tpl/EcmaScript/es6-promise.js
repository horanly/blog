var waitSecond = new Promise(function(resolve, reject){
    setTimeout(resolve, 1000)
})

waitSecond.then(function(){
    console.log("Hello"); // 1秒后输出"Hello"
    return waitSecond
}).then(function(){
    console.log("Hi"); // 2秒后输出"Hi"
})
