
var script = document.createElement('script')
script.type = 'text/javascript'

// 传递一个回调函数名给后端，方便后端返回是执行这个在前端定义的回调函数

script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback'

document.head.appendChild(script)

// 回调函数执行

function handleCallback (res){
    console.log(res);
}

