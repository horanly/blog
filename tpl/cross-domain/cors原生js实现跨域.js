//原生ajax
var xhr = new XMLHttpRequest()

// 前端设置是否带cookie
xhr.withCredentials = true

xhr.open('post', 'http://www.domain2.com:8080/login', true)

xhr.setRequestHeader('Content-Type', 'applicaltion/x-www-form-urlencoded')
xhr.send('user=admin')

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
}
