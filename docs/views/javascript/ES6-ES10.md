--- 
title: ES6、ES7、ES8、ES9、ES10新特性 
date: 2019-07-15
categories: 
 - Javascript
tags: 
 - ES6
---


## 概述

ES全称ECMAScript，ECMAScript是ECMA制定的标准化脚本语言。目前JavaScript使用的ECMAScript版本为ECMAScript-262。   

ECMAScript 标准建立在一些原有的技术上，最为著名的是 JavaScript (网景) 和 JScript (微软)。它最初由网景的 Brendan Eich 发明，第一次出现是在网景的 Navigator 2.0 浏览器上。Netscape 2.0 以及微软 Internet Explorer 3.0 后序的所有浏览器上都有它的身影。

## ES6新特性（2015）

ES6的特性比较多，在 ES5 发布近 6 年（2009-11 至 2015-6）之后才将其标准化。两个发布版本之间时间跨度很大，所以ES6中的特性比较多。   

在这里列举几个常用的：   


- 类（class）
- 模块化（module）
- 箭头函数（=>）
- 函数的默认参数
- 模版字符串
- 解构赋值
- 延展操作符
- 对象属性简写
- Promise
- Let 与 Const

### 1.类（class）

对熟悉Java，object-c，c#等纯面向对象语言的开发者来说，都会对class有一种特殊的情怀。ES6 引入了class（类），让JavaScript的面向对象编程变得更加简单和易于理解。


<<< @/tpl/EcmaScript/es6-class.js

### 2.模块化(Module)

ES5不支持原生的模块化，在ES6中模块作为重要的组成部分被添加进来。模块的功能主要由 export 和 import 组成。每一个模块都有自己单独的作用域，模块之间的相互调用关系是通过 export 来规定模块对外暴露的接口，通过import来引用其它模块提供的接口。同时还为模块创造了命名空间，防止函数的命名冲突。

#### 导出(export)

ES6允许在一个模块中使用export来导出多个变量或函数。

**导出变量**

~~~ js
// test.js
export var name = 'jorry'
~~~

> 提示：ES6不仅支持变量的导出，也支持常量的导出。 export const sqrt = Math.sqrt;  //导出常量


ES6将一个文件视为一个模块，上面的模块通过 export 向外输出了一个变量。一个模块也可以同时往外面输出多个变量。

~~~ js
// test.js
var name = "jorry"
var age = "24"
export {name, age}
~~~


** 导出函数**

~~~ js
// main.js
export function myModule(someArg){
    return someArg
}
~~~

#### 导入(import)

定义好模块的输出以后就可以在另外一个模块通过import引用。

~~~ js
import {myModule} from 'myModule';// main.js
import {name,age} from 'test';// test.js
~~~

> 提示:一条import 语句可以同时导入默认函数和其它变量。import defaultMethod, { otherMethod } from 'xxx.js';


### 3.箭头（Arrow）函数
这是ES6中最令人激动的特性之一。=>不只是关键字function的简写，它还带来了其它好处。箭头函数与包围它的代码共享同一个this,能帮你很好的解决this的指向问题。有经验的JavaScript开发者都熟悉诸如var self = this;或var that = this这种引用外围this的模式。但借助=>，就不需要这种模式了。

#### 箭头函数的结构

箭头函数的箭头=>之前是一个空括号、单个的参数名、或用括号括起的多个参数名，而箭头之后可以是一个表达式（作为函数的返回值），或者是用花括号括起的函数体（需要自行通过return来返回值，否则返回的是undefined）。

~~~ js 
// 箭头函数的例子
() => 1
v => v+1
(a,b) => a+b
() => {
    alert('foo')
}
e =>{
    if(e == 0){
        return 0
    }
    return 1000/e
}
~~~

> 提示：不论是箭头函数还是bind，每次被执行都返回的是一个新的函数引用，因此如果你还需要函数的引用去做一些别的事情（譬如卸载监听器），那么你必须自己保存这个引用


#### 卸载监听器时的陷阱

 - **错误的做法**

~~~ js
// React Native
class PauseMenu extends React.Component{
    componentWillMount(){
        AppStateIOS.addEventListener('change', this.onAppPaused.bind(this));
    }
    componentWillUnmount(){
        AppStateIOS.removeEventListener('change', this.onAppPaused.bind(this));
    }
    onAppPaused(event){
    }
}
~~~

 - **正确的做法**

~~~ js
// React Native
class PauseMenu extends React.Component{
    constructor(props){
        super(props);
        this._onAppPaused = this.onAppPaused.bind(this);
    }
    componentWillMount(){
        AppStateIOS.addEventListener('change', this._onAppPaused);
    }
    componentWillUnmount(){
        AppStateIOS.removeEventListener('change', this._onAppPaused);
    }
    onAppPaused(event){
    }
}
~~~

除上述的做法外，我们还可以这样做：

~~~ js
// React Native
class PauseMenu extends React.Component{
    componentWillMount(){
        AppStateIOS.addEventListener('change', this.onAppPaused);
    }
    componentWillUnmount(){
        AppStateIOS.removeEventListener('change', this.onAppPaused);
    }

    onAppPaused = (event) => {
        //把函数直接作为一个arrow function的属性来定义，初始化的时候就绑定好了this指针
    }
}
~~~


> 【需要注意的是】：不论是bind还是箭头函数，每次被执行都返回的是一个新的函数引用，因此如果你还需要函数的引用去做一些别的事情（譬如卸载监听器），那么你必须自己保存这个引用。


### 4.函数参数默认值

ES6支持在定义函数的时候为其设置默认值：

~~~ js
function foo(height = 50, color = 'red')
{
    // ...
}
~~~

不使用默认值：

~~~ js
function foo(height, color)
{
    var height = height || 50;
    var color = color || 'red';
    //...
}
~~~

这样写一般没问题，但当参数的布尔值为false时，就会有问题了。比如，我们这样调用foo函数：

~~~ js
foo(0, "")
~~~

因为0的布尔值为false，这样height的取值将是50。同理color的取值为‘red’。   

所以说，函数参数默认值不仅能是代码变得更加简洁而且能规避一些问题。


### 5.模板字符串

ES6支持模板字符串，使得字符串的拼接更加的简洁、直观。

#### 不使用模板字符串：

~~~ js
var name = 'Your name is ' + first + ' ' + last + '.'
~~~

#### 使用模板字符串：

~~~ js
var name = `Your name is ${first} ${last}.`
~~~

在ES6中通过${}就可以完成字符串的拼接，只需要将变量放在大括号之中。


### 6.解构赋值

 解构赋值语法是JavaScript的一种表达式，可以方便的从数组或者对象中快速提取值赋给定义的变量

#### 获取数组中的值

~~~ js
var foo = ['one', 'two', 'three', 'four']
var [one, two, three]
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"


// 如果你要忽略某些值，你可以按照下面的写法获取你想要的值
var [first, , , last] = foo;
console.log(first); // "one"
console.log(last); // "four"


//你也可以这样写
var a, b; //先声明变量

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
~~~

如果没有从数组中的获取到值，你可以为变量设置一个默认值。

~~~ js
var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
~~~

通过解构赋值可以方便的交换两个变量的值。

~~~ js
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
~~~

#### 获取对象中的值
 ~~~ js
const student = {
    name: 'tom',
    age: '18',
    city: 'beijing'
}
const {name, age, city} = student
console.log(name); // "tom"
console.log(age); // "18"
console.log(city); // "beijing"
 ~~~

### 7.延展操作符(Spread operator)

延展操作符 **...** 可以相爱函数调用、数组构造时，将数组表达式或者string在语言层面展开；还可以在构造对象时，将对象表达式按key-value的方式展开。

#### 语法

> 函数调用：

~~~ js
myFunction(...paramesObj)
~~~

> 数组构造或字符串：

~~~ js
[...iterableObj, '4', ...'hello', 6];
~~~


> 构造对象时,进行克隆或者属性拷贝（ECMAScript 2018规范新增特性）：

~~~ js
let objClone = { ...obj };
~~~


#### 应用场景

> 在函数调用时使用延展操作符

~~~ js
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];

//不使用延展操作符
console.log(sum.apply(null, numbers));

//使用延展操作符
console.log(sum(...numbers)); // 6
~~~

> 构造数组

没有展开语法的时候，只能组合使用 push，splice，concat 等方法，来将已有数组元素变成新数组的一部分。有了展开语法, 构造新数组会变得更简单、更优雅：

~~~ js
const stuendts = ['Jine','Tom'];
const persons = ['Tony',... stuendts,'Aaron','Anna'];
conslog.log(persions)// ["Tony", "Jine", "Tom", "Aaron", "Anna"]
~~~

和参数列表的展开类似, ... 在构造数组时, 可以在任意位置多次使用。

> 数组拷贝

~~~ js
var arr = [1, 2, 3];
var arr2 = [...arr]; // 等同于 arr.slice()
arr2.push(4);
console.log(arr2) //[1, 2, 3, 4]
~~~


展开语法和 Object.assign() 行为一致, 执行的都是浅拷贝(只遍历一层)。

> 连接多个数组

~~~ js
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2]; // 将 arr2 中所有元素附加到 arr1 后面并返回
//等同于
var arr4 = arr1.concat(arr2);
~~~

在ECMAScript 2018中延展操作符增加了对对象的支持

~~~ js
var obj1 = {foo: 'bar', x:42}
var obj2 = {foo: 'var', y:13}
var cloneObj = {...obj1}  // { foo: "bar", x: 42 }
var mergedObj = { ...obj1, ...obj2 };
// 合并后的对象: { foo: "baz", x: 42, y: 13 }
~~~

#### 在React中的应用

通常我们在封装一个组件时，会对外公开一些 props 用于实现功能。大部分情况下在外部使用都应显示的传递 props 。但是当传递大量的props时，会非常繁琐，这时我们可以使用 ...(延展操作符,用于取出参数对象的所有可遍历属性) 来进行传递。   

一般情况下我们应该这样写

~~~ js
<CustomComponent name ='Jine' age ={21} />
~~~


> 使用 ... ，等同于上面的写法

~~~ js
const params = {
    name: 'Jine',
    age: 21
}
<CustomComponent {...params}></CustomComponent>
~~~

> 配合解构赋值避免传入一些不需要的参数

~~~ js
var params = {
	name: '123',
	title: '456',
	type: 'aaa'
}
var { type, ...other } = params;
<CustomComponent type='normal' number={2} {...other} />
//等同于
<CustomComponent type='normal' number={2} name='123' title='456' />
~~~


### 8.对象属性简写

在ES6中允许我们在设置一个对象的属性的时候不指定属性名。

> 不使用ES6

~~~ js
const name='Ming',age='18',city='Shanghai';
   
const student = {
    name:name,
    age:age,
    city:city
};
console.log(student); //{name: "Ming", age: "18", city: "Shanghai"}
~~~

对象中必须包含属性和值，显得非常冗余。

> 使用ES6

~~~ js
const name='Ming',age='18',city='Shanghai';
  
const student = {
    name,
    age,
    city
};
console.log(student);  //{name: "Ming", age: "18", city: "Shanghai"}
~~~

对象中直接写变量，非常简洁。


### 9.Promise

Promise 是异步编程的一种解决方案，比传统的解决方案callback更加的优雅。它最早由社区提出和实现的，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

> 不使用ES6

嵌套两个setTimeout回调函数：

~~~ js
setTimeout(function(){
    console.log('hello') // // 1秒后输出"Hello"

    setTimeout(function(){
        console.log('Hi'); // 2秒后输出"Hi"
    }, 1000)
}, 1000)
~~~

> 使用ES6

<<< @/tpl/EcmaScript/es6-promise.js

上面的的代码使用两个then来进行异步编程串行化，避免了回调地狱


### 10.支持let与const

在之前JS是没有块级作用域的，const与let填补了这方便的空白，const与let都是块级作用域。

> 使用var定义的变量为函数级作用域：

~~~ js
{
  var a = 10;
}

console.log(a); // 输出10
~~~

> 使用let与const定义的变量为块级作用域：


~~~ js
{
  let a = 10;
}

console.log(a); // ReferenceError: a is not defined
~~~


## ES7新特性（2016）

ES2016添加了两个小的特性来说明标准化过程：

- 数组includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。
- a ** b指数运算符，它与 Math.pow(a, b)相同。

### 1.Array.prototype.includes()

includes() 函数用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。   

includes 函数与 indexOf 函数很相似，下面两个表达式是等价的：

~~~ js
arr.includes(x)
arr.indexOf(x) >= 0
~~~

接下来我们来判断数字中是否包含某个元素：

> 在ES7之前的做法

使用indexOf()验证数组中是否存在某个元素，这时需要根据返回值是否为-1来判断：

~~~ js
let arr = ['react', 'angular', 'vue'];

if (arr.indexOf('react') !== -1)
{
    console.log('react存在');
}
~~~

> 使用ES7的includes()

使用includes()验证数组中是否存在某个元素，这样更加直观简单：

~~~ js
let arr = ['react', 'angular', 'vue'];

if (arr.includes('react'))
{
    console.log('react存在');
}
~~~

### 2.指数操作符

在ES7中引入了指数运算符**，**具有与Math.pow(..)等效的计算结果。

> 不使用指数操作符

使用自定义的递归函数calculateExponent或者Math.pow()进行指数运算：

~~~ js
function calculateExponent(base, exponent)
{
    if (exponent === 1)
    {
        return base;
    }
    else
    {
        return base * calculateExponent(base, exponent - 1);
    }
}

console.log(calculateExponent(2, 10)); // 输出1024
console.log(Math.pow(2, 10)); // 输出1024
~~~

> 使用指数操作符

使用指数运算符**，就像+、-等操作符一样：

~~~ js
console.log(2**10);// 输出1024
~~~

## ES8新特性（2017）

- async/await
- Object.values()
- Object.entries()
- String padding: padStart()和padEnd()，填充字符串达到当前长度
- 函数参数列表结尾允许逗号
- Object.getOwnPropertyDescriptors()
- ShareArrayBuffer和Atomics对象，用于从共享内存位置读取和写入

### 1.async/await

在ES8中加入了对async/await的支持，也就我们所说的异步函数，这是一个很实用的功能。 async/await将我们从头痛的回调地狱中解脱出来了，使整个代码看起来很简洁

> 使用async/await与不使用async/await的差别：

<<< @/tpl/EcmaScript/es6-async-await.js


#### async/await的几种应用场景

> 获取异步函数的返回值

异步函数本身会返回一个Promise，所以我们可以通过then来获取异步函数的返回值。

~~~ js
async function charCountAdd(data1, data2){
    const d1 = await charCount(data1);
    const d2 = await charCount(data2);
    return d1 + d2
}
charCountAdd('Hello','Hi').then(console.log);//通过then获取异步函数的返回值。
function charCount(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.length);
        }, 1000);
    });
}
~~~

> async/await在并发场景中的应用

对于上述的例子，我们调用await两次，每次都是等待1秒一共是2秒，效率比较低，而且两次await的调用并没有依赖关系，那能不能让其并发执行呢，答案是可以的，接下来我们通过Promise.all来实现await的并发调用

~~~ js
saync function chartCountAdd(data1, data2) {
    const [d1, d2] = await Promise.all([charCount(data1),charCount(data2)])
    return d1 + d2
}
charCountAdd('Hello','Hi').then(console.log);
function charCount(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.length);
        }, 1000);
    });
}
~~~

通过上述代码我们实现了两次charCount的并发调用，Promise.all接受的是一个数组，它可以将数组中的promise对象并发执行；

> async/await的几种错误处理方式

**第一种：捕捉整个async/await函数的错误**

~~~ js
async function charCountAdd(data1, data2) {
    const d1=await charCount(data1);
    const d2=await charCount(data2);
    return d1+d2;
}
charCountAdd('Hello','Hi')
    .then(console.log)
    .catch(console.log);//捕捉整个async/await函数的错误

function charCount(data) {
    ...
}
~~~

这种方式可以捕捉整个charCountAdd运行过程中出现的错误，错误可能是由charCountAdd本身产生的，也可能是由对data1的计算中或data2的计算中产生的。

**第二种：捕捉单个的await表达式的错误**

~~~ js
async function charCountAdd(data1, data2) {
    const d1 = await chartCount(data1)
        .catch(e=>console.log('e'))
    const d2 = await chartCount(data2)
        .catch(e=>console.log('e'))

    return d1+d2
}
charCountAdd('Hello','Hi').then(console.log);
function charCount(data) {
    ...
}
~~~

通过这种方式可以捕捉每一个await表达式的错误，如果既要捕捉每一个await表达式的错误，又要捕捉整个charCountAdd函数的错误，可以在调用charCountAdd的时候加个catch。

~~~ js
...
charCountAdd('Hello','Hi')
    .then(console.log)
    .catch(console.log); //捕捉整个async/await函数的错误
...
~~~

**第三种：同时捕捉多个的await表达式的错误**

~~~ js
async function charCountAdd(data1, data2) {
    let d1,d2;
    try {
        d1=await charCount(data1);
        d2=await charCount(data2);
    }catch (e){
        console.log('e');
    }
    return d1+d2;
}
charCountAdd('Hello','Hi')
    .then(console.log);

function charCount(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.length);
        }, 1000);
    });
}
~~~

### 2.Object.entries()

Object.entries()函数返回一个给定对象自身可枚举属性的键值对的数组。    

~~~ js
// 假设我们要遍历如下对象obj的所有值
const obj = {a: 1, b: 2, c: 3};
~~~

> 不使用Object.entries() :ES7

~~~ js
Object.keys(obj).forEach(key=>{
	console.log('key:'+key+' value:'+obj[key]);
})
//key:a value:1
//key:b value:2
//key:c value:3
~~~


> 使用Object.entries() :ES8

~~~ js
for(let [key,value] of Object.entries(obj1)){
	console.log(`key: ${key} value:${value}`)
}
//key:a value:1
//key:b value:2
//key:c value:3
~~~

### 3.Object.values()

Object.values()是一个与Object.keys()类似的新函数，但返回的是Object自身属性的所有值，不包括继承的值。

> 不使用Object.values() :ES7

~~~ js
const vals=Object.keys(obj).map(key=>obj[key]);
console.log(vals);//[1, 2, 3]
~~~

> 使用Object.values() :ES8

~~~ js
const values=Object.values(obj);
console.log(values); //[1, 2, 3]
~~~

从上述代码中可以看出Object.values()为我们省去了遍历key，并根据这些key获取value的步骤。


### 4.String padding

在ES8中String新增了两个实例函数String.prototype.padStart和String.prototype.padEnd，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。

> String.padStart(targetLength,[padString])

- targetLength:当前字符串需要填充到目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString:(可选)填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。

~~~ js
console.log('0.0'.padStart(4,'10')) //10.0
console.log('0.0'.padStart(20))// 0.00    
~~~

> String.padEnd(targetLength,padString])

- targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString:(可选) 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "；

~~~ js
console.log('0.0'.padEnd(4,'0')) //0.00    
console.log('0.0'.padEnd(10,'0'))//0.00000000
~~~


### 5.函数参数列表结尾允许逗号

主要作用是方便使用git进行多人协作开发时修改同一个函数减少不必要的行变更。

> 不使用ES8


~~~ js
//程序员A
var f = function(a,
  b
   ) { 
  ...
  }

//程序员B
var f = function(a,
  b,   //变更行
  c   //变更行
   ) { 
  ...
  }

//程序员C
var f = function(a,
  b,
  c,   //变更行
  d   //变更行
   ) { 
  ...
  }
~~~

> 使用ES8

~~~ js
//程序员A
var f = function(a,
  b,
   ) { 
  ...
  }

//程序员B
var f = function(a,
  b,
  c,   //变更行
   ) { 
  ...
  }

//程序员C
var f = function(a,
  b,
  c,
  d,   //变更行
   ) { 
  ...
  }
~~~

### 6.Object.getOwnPropertyDescriptors()

Object.getOwnPropertyDescriptors()函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

> 函数原型：

~~~ js
Object.getOwnPropertyDescriptors(obj)
~~~

返回obj对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

~~~ js
const obj2 = {
	name: 'Jine',
	get age() { return '18' }
};
Object.getOwnPropertyDescriptors(obj2)
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){}, //the getter function
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//		value:"Jine",
//		writable:true
//   }
// }
~~~






