--- 
title: JS数据类型分类和判断
date: 2019-05-10
categories: 
 - Javascript
tags: 
 - 数据类型
---

## 数据类型

- 基本类型：undefined，null，boolean，string，number,symbol
  
- 引用类型：object，array，date，function，regexp

## 一、分类

从不同的角度对6种数据类型进行分类：

![ekQLid.png](https://s2.ax1x.com/2019/07/23/ekQLid.png)

## 二、判断

### 1、typeof

typeof返回一个表示数据类型的字符串，返回结果包括：number、string、boolean、object、undefined、function。typeof可以对基本类型number、string  、boolean、undefined做出准确的判断；而对于引用类型，除了function之外返回的都是object。但当我们需要知道某个对象的具体类型时，typeof就显得有些力不从心了。

~~~ js
typeof 1; // number 有效
typeof ‘ ’;//string 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof null; //object 无效
typeof new Function(); // function 有效
typeof [] ; //object 无效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效
~~~~

### 2、instanceof

当我们需要知道某个对象的具体类型时,可以用运算符 instanceof，instanceof操作符判断左操作数对象的原型链上是否有右边这个构造函数的prototype属性，也就是说指定对象是否是某个构造函数的实例，最后返回布尔值。      

检测的我们用一段伪代码来模拟instanceof内部执行过程：

~~~ js
instanceof (A,B) = {
    var L = A.__proto__;
    var R = B.prototype;
    if(L === R) {
        //A的内部属性__proto__指向B的原型对象
        return true;
    }
    return false;
}
~~~

从上述过程可以看出，当 A 的 __proto__ 指向 B 的 prototype 时，就认为A就是B的实例，我们再来看几个例子：

``` js
[] instanceof Array; //true
[] instanceof Object; //true
new Date() instanceof Date;//true
new Date() instanceof Object;//true
function Person(){};
new Person() instanceof Person;//true
new Person() instanceof Object;//true
```

我们发现，虽然 instanceof 能够判断出 [] 是Array的实例，但它认为 [] 也是Object的实例，为什么呢？ 我们来分析一下[]、Array、Object 三者之间的关系: 从instanceof 能够判断出 [].__proto__ 指向 Array.prototype， 而 Array.prototype.__proto__ 又指向了Object.prototype，Object.prototype.__proto__ 指向了null,标志着原型链的结束。因此，[]、Array、Object就形成了如下图所示的一条原型链：

![ekYtOI.jpg](https://s2.ax1x.com/2019/07/23/ekYtOI.jpg)


从原型链可以看出，[] 的 __proto__  直接指向Array.prototype, 间接指向Object.prototype, 所以按照 instanceof 的判断规则，[] 就是Object的实例。

> 注意:instanceof运算符只能用于对象，不适用原始类型的值。

``` js
'hello' instanceof String // false
null instanceof Object // false
undefined instanceof Object // false
```

字符串、null和undefined不是对象，所以返回false。

### 3、constructor

constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

``` js
var f = new F();
f.constructor === F;// true
```
但是 constructor 属性易变，不可信赖，这个主要体现在自定义对象上，当开发者重写prototype后，原有的constructor会丢失。

``` js
function F() {}
F.prototype = {
	_name: 'Eric',
};
var f = new F();
f.constructor === F; // false
```


### 4、Object.prototype.toString 

toString是Object原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是 toString运行时this指向的对象类型, 返回的类型格式为[object,xxx],xxx是具体的数据类型，其中包括：String,Number,Boolean,Undefined,Null,Function,Date,Array,RegExp,Error,HTMLDocument,... 基本上所有对象的类型都可以通过这个方法获取到。

``` js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object Window]
```

需要注意的是，必须通过Object.prototype.toString.call来获取，而不能直接 new Date().toString(), 从原型链的角度讲，所有对象的原型链最终都指向了Object, 按照JS变量查找规则，其他对象应该也可以直接访问到Object的toString方法，而事实上，大部分的对象都实现了自身的toString方法，这样就可能会导致Object的toString被终止查找，因此要用call来强制执行Object的toString方法。

### 数据类型检测终极方法

结合typeof, Object.prototype.toString这两个方法来实现一个 JavaScript 数据类型检测的终极方法。

``` js
/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
function type(obj) {
  return typeof obj !== "object" ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
```

### 数据类型的单独检测

有时我们希望直接判断一个数据是否是某个类型，那么我们可以单独实现这些判断某个数据类型的函数

<<< @/tpl/dataType/judgeDataType.js

## 三、总结：

1. typeof可以准确地判断出基本类型，但是对于引用类型除function之外返回的都是object；
2. 已知是引用类型的情况可以选用instanceof或constructor方法进行具体类型的判断：
3. instanceof是基于原型链的；
4. constructor 属性易变，不可信赖，为了规范，在重写对象原型时一般都需要重新给constructor赋值，以保证实例对象的类型不被改写；
5. Object.prototype.toString.call() 通用但很繁琐。
