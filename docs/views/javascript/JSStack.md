--- 
title: JS堆、栈以及事件循环的概念 
date: 2019-07-11
categories: 
 - Javascript
tags: 
 - 堆栈
---

## JS内存机制

在JS中，每一个数据都需要一个内存空间。内存空间又被分为两种，栈内存(stack)与堆内存(heap)。

###  栈内存一般储存基础数据类型

>  Number String Null Undefined Boolean 
> (es6新引入了一种数据类型，Symbol)

数据在栈内存中的存储与使用方式类似于数据结构中的堆栈数据结构，遵循后进先出的原则。

### 堆内存一般储存引用数据类型

与其他语言不同，JS的引用数据类型，比如数组Array，它们值的大小是不固定的。引用数据类型的值是保存在堆内存中的对象。JavaScript不允许直接访问堆内存中的位置，因此我们不能直接操作对象的堆内存空间

## 浏览器的事件机制

~~~ js
console.log(1)
let promise = new Promise(function(resolve,reject){
    console.log(3)
    resolve(100)
}).then(function(data){
    console.log(100)
})
setTimeout(function(){
    console.log(4);
})
console.log(2)
~~~

> 上面这个demo的结果值是 1 3 2 100 4

![eiQqaj.jpg](https://s2.ax1x.com/2019/07/22/eiQqaj.jpg)

对象放在heap（堆）里，常见的基础类型和函数放在stack（栈）里，函数执行的时候在栈里执行。栈里函数执行的时候可能会调一些Dom操作，ajax操作和setTimeout定时器，这时候要等stack（栈）里面的所有程序先走（**注意：栈里的代码是先进后出**），走完后再走WebAPIs，WebAPIs执行后的结果放在callback queue（回调的队列里，注意：队列里的代码先放进去的先执行），也就是当栈里面的程序走完之后，再从任务队列中读取事件，将队列中的事件放到执行栈中依次执行，这个过程是循环不断的。

1. 所有同步任务都在主线程上执行，形成一个执行栈
2. 主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列之中放置一个事件。
3. 一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列,将队列中的事件放到执行栈中依次执行
4. 主线程从任务队列中读取事件，这个过程是循环不断的

栈的执行方式

~~~ js
var a = "tom"
function one(){
    let a = 1
    two()
    function two(){
        let b = 2
        three()
        function three(){
            console.log(b)
        }
    }
}
console.log(a)
one()
~~~

> 运行结果：tom  2

![eilFo9.jpg](https://s2.ax1x.com/2019/07/22/eilFo9.jpg)

执行栈里面最先放的是全局作用域（代码执行有一个全局文本的环境），然后再放one，one执行再把two放进来，two执行再把three放进来，一层叠一层。     

最先走的肯定是three，因为two要是先销毁了，那three的代码b就拿不到了，所以是先进后出（先进的后出），所以，three最先出，然后是two出，再是one出。

**那队列又是怎么一回事呢？**

例1：
~~~ js
console.log(1);
console.log(2);
setTimeout(function(){
    console.log(3);
})
setTimeout(function(){
    console.log(4);
})
console.log(5);
// 1 2 5 3 4
~~~

> 首先执行了栈里的代码，1 2 5。前面说到的settimeout会被放在队列里，当栈执行完了之后，从队列里添加到栈里执行（此时是依次执行），得到 3 4

例2：
~~~ js
console.log(1);
console.log(2);

setTimeout(function(){
    console.log(3);
    setTimeout(function(){
        console.log(6);
    })
})
setTimeout(function(){
    console.log(4);
    setTimeout(function(){
        console.log(7);
    })
})
console.log(5)
// 1 2 5 3 4 6 7  
~~~

> 同样，先执行栈里的同步代码 1 2 5. 再同样，最外层的settimeout会放在队列里，当栈里面执行完成以后，放在栈中执行，3 4。 而嵌套的2个settimeout，会放在一个新的队列中，去执行 6 7.

例3：
~~~ js
console.log(1);
console.log(2);

setTimeout(function(){
    console.log(3);
    setTimeout(function(){
        console.log(6);
    })
},400)
setTimeout(function(){
    console.log(4);
    setTimeout(function(){
        console.log(7);
    })
},100)
console.log(5)
// 1 2 5 4 7 3 6
~~~

> 这里的顺序是1，2，5，4，7，3，6。也就是只要两个set时间不一样的时候 ，就set时间短的先走完，包括set里面的回调函数，再走set时间长的。（因为只有当时间到了的时候，才会把set放到队列里面去）

例4：
~~~ js
setTimeout(function(){
    console.log('setTimeout')
},0)
for(var i = 0;i<10;i++){
    console.log(i)
}
~~~

> 运行结果：0 1 2 3 4 5 6 7 8 9 setTimeout

所以，得出结论，永远都是栈里的代码先行执行，再从队列中依次读事件，加入栈中执行      

stack（栈）里面都走完之后，就会依次读取任务队列,将队列中的事件放到执行栈中依次执行，这个时候栈中又出现了事件，这个事件又去调用了WebAPIs里的异步方法，那这些异步方法会在再被调用的时候放在队列里，然后这个主线程（也就是stack）执行完后又将从任务队列中依次读取事件，这个过程是循环不断的。

**再回到我们的第一个例子**

~~~ js
console.log(1)
let promise = new Promise(function(resolve,reject){
    console.log(3)
    resolve(100)
}).then(function(data){
    console.log(100)
})
setTimeout(function(){
    console.log(4);
})
console.log(2)
~~~

> 执行结果： 1 3 2 100 4

- 为什么setTimeout要在Promise.then之后执行呢？
- 为什么new Promise又在console.log(2)之前执行呢？

setTimeout是宏任务,而Promise.then是微任务 这里的new Promise()是同步的,所以是立即执行的。

## 宏任务和微任务

概念：微任务和宏任务都是属于队列，而不是放在栈中

~~~ js
console.log('1');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('2');
~~~

> 运行结果： 1 2 promise1 promise2 setTimeout

### 宏任务（task）

浏览器为了能够使得JS内部宏任务与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->…） 鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTMl。但是，setTimeout不一样，setTimeout的作用是等待给定的时间后为它的回调产生一个新的宏任务。这就是为什么打印‘setTimeout’在‘promise1 , promise2’之后。因为打印‘promise1 , promise2’是第一个宏任务里面的事情，而‘setTimeout’是另一个新的独立的任务里面打印的。

### 微任务 (Microtasks)

微任务通常来说就是需要在当前 task 执行结束后立即执行的任务 比如对一系列动作做出反馈，或者是需要异步的执行任务而又不需要分配一个新的 task，这样便可以减小一点性能的开销。只要执行栈中没有其他的js代码正在执行且每个宏任务执行完，微任务队列会立即执行。如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行。微任务包括了mutation observe的回调还有接下来的例子promise的回调。     

一旦一个pormise有了结果，或者早已有了结果（有了结果是指这个promise到了fulfilled或rejected状态），他就会为它的回调产生一个微任务，这就保证了回调异步的执行即使这个promise早已有了结果。所以对一个已经有了结果的**promise调用.then()**会立即产生一个微任务。这就是为什么‘promise1’,'promise2’会打印在‘script end’之后，因为所有微任务执行的时候，当前执行栈的代码必须已经执行完毕。‘promise1’,'promise2’会打印在‘setTimeout’之前是因为所有微任务总会在下一个宏任务之前全部执行完毕。

~~~ html
<div class="outer">
  <div class="inner"></div>
</div>
~~~

~~~ js
//  elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

//监听element属性变化
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// 
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
~~~

> click promise mutate click promise mutate (2) timeout
      
很好的解释了，setTimeout会在微任务（Promise.then、MutationObserver.observe）执行完成之后，加入一个新的宏任务中

~~~ js
console.log(1);
setTimeout(function(){
    console.log(2);
    Promise.resolve(1).then(function(){
        console.log('promise1')
    })
})
setTimeout(function(){
    console.log(3)
    Promise.resolve(1).then(function(){
        console.log('promise2')
    })
})
setTimeout(function(){
    console.log(4)
    Promise.resolve(1).then(function(){
        console.log('promise3')
    })
})
~~~

> 1 2 promise1 3 promise2 4 promise3

~~~ js
console.log(1);
setTimeout(function(){
    console.log(2);
    Promise.resolve(1).then(function(){
        console.log('promise1')

        setTimeout(function(){
            console.log(3)
            Promise.resolve(1).then(function(){
                console.log('promise2')
            })
        })

    })
})
~~~

> 1 2 promise1 3 promise2

## 总结回顾

- 栈：
  - 存储基础数据类型
  - 按值访问
  - 存储的值大小固定
  - 由系统自动分配内存空间
  - 空间小，运行效率高
  - 先进后出，后进先出
  - 栈中的DOM，ajax，setTimeout会依次进入到队列中,当栈中代码执行完毕后，再将队列中的事件放到执行栈中依次执行。
  - 微任务和宏任务

- 堆：
  - 存储引用数据类型
  - 按引用访问
  - 存储的值大小不定，可动态调整
  - 主要用来存放对象
  - 空间大，但是运行效率相对较低
  - 无序存储，可根据引用直接获取
      
      
> 作者：薄荷前端
链接：https://juejin.im/post/5b1deac06fb9a01e643e2a95
来源：掘金

