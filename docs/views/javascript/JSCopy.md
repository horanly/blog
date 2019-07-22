--- 
title: JS中赋值·浅拷贝·深拷贝 
date: 2019-07-12
categories: 
 - Javascript
tags: 
 - 拷贝
---

## 数据类型与堆栈的关系

### 基本类型与引用类型

- 基本类型：undefined，null，boolean，string，number,symbol
  
- 引用类型：object，array，date，function，regexp

### 存储方式

- 基本类型：基本类型值在内存中占据固定大小，保存在栈内存中（不包含闭包中的变量）

![ZvgOtU.jpg](https://s2.ax1x.com/2019/07/19/ZvgOtU.jpg)

- 引用类型：引用类型的值是对象，保存在堆内存中。而栈内存存储的是对象的变量标识符以及对象在堆内存中的存储地址（引用），引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。


![ZvgLkT.jpg](https://s2.ax1x.com/2019/07/19/ZvgLkT.jpg)

注意：   

- 闭包中的变量并不保存在栈内存中，而是保存在堆内存中。这一点比较好想，如果闭包中的变量保存在了栈内存中，随着外层中的函数从调用栈中销毁，变量肯定也会被销毁，但是如果保存在了堆内存中，内存函数仍然访问外层已销毁函数中的变量。

 ~~~ js
function A(){
    let a='koala'
    function B(){
        console.log(a)
    }
    return B()
}
A() // koala
 ~~~  

## 赋值操作

### 基本数据类型复制

~~~ js
let a = 'koala'
let b = a
b = 'Chameleon'
console.log(a) // koala
~~~

![ZvgXhF.png](https://s2.ax1x.com/2019/07/19/ZvgXhF.png)

**结论：** 在栈内存中的数据发生数据变化的时候，系统会自动为新的变量分配一个新的值在栈内存中，两个变量相互独立，互不影响的。

### 引用数据类型复制

~~~ js
let a = {x:'koala', y:'chameleon'}
let b = a
b.x = 'dog'
console.log(a.x) // dog
~~~

![Zvgx1J.png](https://s2.ax1x.com/2019/07/19/Zvgx1J.png)

**结论：** 引用类型的复制，同样为新的变量b分配一个新的值，保存在栈内存中，不同的是这个变量对应的具体值不在栈中，栈中只是一个地址指针。两个变量地址指针相同，指向堆内存中的对象，因此b.x发生改变的时候，a.x也发生了改变。


## 浅拷贝的实现方式

### 1.Object.assign()

> 语法：Object.assign(target, ...sources)

ES6中拷贝对象的方法，接受的第一个参数是拷贝的目标target，剩下的参数是拷贝的源对象sources（可以是多个）

~~~ js
let target = {};
let source = { a:'koala', b:{name:'前端知识收藏'}};
Object.assign(target ,source);
console.log(target); // { a: 'koala', b: { name: '前端知识收藏' } }
source.a = 'smallKoala';
source.b.name = '前端知识收藏哦'
console.log(source); // { a: 'smallKoala', b: { name: '前端知识收藏哦' } }
console.log(target); // { a: 'koala', b: { name: '前端知识收藏哦' } }
~~~

从打印结果可以看出，Object.assign 是一个浅拷贝，它只是在根属性创建了一个新的对象，但是对于属性的值是对象的话只会拷贝一份相同的内存地址。

- Object.assign注意事项

1. 只拷贝源对象的自身属性（不拷贝继承属性）  
2. 它不会拷贝对象不可枚举的属性
3. undefined 和 null 无法转成对象，它们不能作为 object.assign 参数，但是可以作为源对象

~~~ js
Object.assign(undefined) // 报错
Object.assign(null) // 报错
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
~~~

4. 属性名为 Symbol 值的属性，可以被 Object.assign 拷贝


### 2.Array.prototype.slice()

~~~ js
let a = [1,3,5, { x:1 }]
let b = Array.prototype.slice.call(a)
b[0] = 2
console.log(a); // [ 1, 3, 5, { x: 1 } ];
console.log(b); // [ 2, 3, 5, { x: 1 } ];
~~~

Array.prototype.slice.call()可以理解为：改变数组的slice方法的作用域，在特定作用域中去调用slice方法，call（）方法的第二个参数表示传递给slice的参数即截取数组的起始位置。


### 3.Array.prototype.concat()

> var new_array = old_array.concat(value1[, value2[, ...[, valueN]]]) 参数：将数组和/或值连接成新数组

~~~ js
let array = [{a: 1}, {b: 2}];
let array1 = [{c: 3},{d: 4}];
let array2=array.concat(array1);
array1[0].c=123;
console.log(array2);// [ { a: 1 }, { b: 2 }, { c: 123 }, { d: 4 } ]
console.log(array1);// [ { c: 123 }, { d: 4 } ]
~~~

Array.prototype.concat 也是一个浅拷贝，只是在根属性创建了一个新的对象，但是对于属性的值是对象的话只会拷贝一份相同的内存地址。

### 4. ...扩展运算符

> var cloneObj = { ...obj };

~~~ js
let obj = {a:1,b:{c:1}}
let obj2 = {...obj};
obj.a=2;
console.log(obj); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}

obj.b.c = 2;
console.log(obj); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}
~~~

扩展运算符也是浅拷贝，对于值是对象的属性无法完全拷贝成2个不同对象,但是如果属性都是基本类型的值的话,使用扩展运算符也是优势方便的地方。

### 自己实现一个浅拷贝

实现原理：新的对象复制已有对象中非对象属性的值和对象属性的引用,也就是说对象属性并不复制到内存。

~~~ js
function cloneShallow(source){
    var target = {}
    for(var key in source){
        if(Object.prototype.hasOwnProperty.call(source,key)){
            target[key] = source[key]
        }
    }
    return target
}
~~~

> 语法：obj.hasOwnProperty(prop)
> prop是要检测的属性字符串名称或者Symbol

该函数返回值为布尔值，所有继承了 Object 的对象都会继承到 hasOwnProperty 方法


## 深拷贝的实现方式

### 1.JSON.parse(JSON.stringify())

~~~ js
let arr = [1, 3, {
    username: 'koala'
}]

let arr4 = JSON.parse(JSON.string(arr))
arr4[2].uaername = 'dancan'
console.log(arr, arr4)
~~~

原理： 用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。    

> 这种方法虽然可以实现数组或对象深拷贝,但不能处理函数

~~~ js
let arr = [1, 3, {
    username: ' kobe'
},function(){}];

let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)
~~~

这是因为JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，不能接受函数

### 2.手写递归方法

递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝

~~~ js
// 【方法一】
// 定义检测数据类型的功能函数
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}
//实现深度克隆---对象/数组
function clone (target){
    // 判断拷贝的数据类型
    // 初始化变量result 成为最终克隆的数据
    let result, targetType = checkedType(target)

    if(targetType === 'Object'){
        result = {}
    } else if(targetType === 'Array'){
        result = []
    } else {
       return target
    }

    // 遍历目标数据
    for (let i in target){
        //获取遍历数据结构的每一项值。
        let value = target[i]
        //判断目标结构里的每一值是否存在对象/数组
        if (checkedType(value) === 'Object' ||
          checkedType(value) === 'Array') { //对象/数组里嵌套了对象/数组
            //继续遍历获取到value值
            result[i] = clone(value)
        } else { //获取到value值是基本的数据类型或者是函数。
            result[i] = value;
        }
    }
    return result
}
~~~


~~~ js
// 【方法二】
 //定义检测数据类型的功能函数
    function isObject(obj) {
	    return typeof obj === 'object' && obj != null;
    }
   function cloneDeep(source) {

    if (!isObject(source)) return source; // 非对象返回自身
      
    var target = Array.isArray(source) ? [] : {};
    for(var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = cloneDeep(source[key]); // 注意这里
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
~~~

### 3.函数库lodash

该函数库也有提供_.cloneDeep用来做 Deep Copy

~~~ js
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
// false
~~~

## 总结

![Zvgvp4.png](https://s2.ax1x.com/2019/07/19/Zvgvp4.png)