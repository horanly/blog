login(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('1001')
        }, 1000)
    })
}

getData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === '1001') {
                resolve('success')
            } else {
                reject('fail')
            }
        }, 1000)
    })
}

// 不使用 async/await
doLogin(userName) {
    this.login(userName).then(this.getData)
        .then((result) => {
            console.log(result);
        }).catch((err) => {

        });
}


// 使用async/await ES8
async doLogin2(userName) {
    const userId = await this.login(userName);
    const result = await this.getData(userId);
}

this.doLogin()
this.doLogin2()
