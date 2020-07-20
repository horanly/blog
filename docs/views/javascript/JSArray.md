--- 
title: js数组常用方法
date: 2020-07-08
categories: 
 - Javascript
tags: 
 - js数组
---

[![UVDnFP.png](https://s1.ax1x.com/2020/07/08/UVDnFP.png)](https://imgchr.com/i/UVDnFP)

> 为了简单记忆，方便查找，将主要方法分为三类： 数组可遍历方法，会修改原数组的方法，返回新数组方法。

## 一、遍历方法

js中遍历数组并不会改变原始数组的方法总共有12个

```js
ES5:
forEach、every、some、filter、map、reduce、reduceRight

ES6：
find、findIndex、keys、values、entries

```

### 1、forEach()
 1. 语法：
 
 ```js
  array.forEach(callback(currentValue, index, arr), thisArg)
 ```

2. 参数

```js
  callback: 为数组中每个元素执行的函数，该函数接收一至三个参数
            currentValue 数组中正在处理的当前元素
            index （可选）数组中正在处理的当前元素的索引
            arr（可选）forEach() 方法正在操作的数组
  thisArg   可选参数，当前执行回调函数callback，用作this值 
```
### 2、every()

1. 定义
 
  **测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。**

2. 语法

```js
  array.every(function(currentValue, index, arr), thisArg)
```
3. 参数

```js
  callback:为数组中每个元素执行的函数，该函数接收一至三个参数
            currentValue 数组中正在处理的当前元素
            index（可选）数组中正在处理的当前元素的索引
            arr（可选） every() 方法正在操作的数组
  thisArg   可选参数,当执行回调函数callback,用作this值
```
4. 用法
  ```js
    function isBigEnougn (element, index, array) {
      return element >=10
    }
    [12, 5, 8, 130].every(isBigEnougn)  // false
    [12,15,18,20].every(isBigEnougn) // true
  ```

### 3、some()
1. 定义

 **测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值**

2. 语法

```js
 array.some(function(currentValue, index, arr), thisArg)
```

3. 参数

```js
  callback:为数组中每个元素执行的函数，该函数接收一至三个参数
          currentValue 数组中正在处理的当前
          index (可选)  数组中正在处理的当前元素的索引
          arr (可选)    some() 方法正在操作的数组
  thisArg    可选参数,当执行回调函数callback,用作this值
```
4. 用法

```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```
### 4、filter()
1. 定义

**创建一个新数组，其中包含通过所提供函数实现的测试的所有元素。**

2. 语法

```js
let newArray = array.filter(function(currentValue, index, arr), thisArg)
```
3. 参数

```js
 callback:为数组中每个元素执行的函数，该函数接收一至三个参数
 		  currentValue 数组中正在处理的当前元素
 		  index (可选)  数组中正在处理的当前元素的索引
 		  arr (可选)    filter() 方法正在操作的数组
 thisArg      可选参数,当执行回调函数callback,用作this值
```

4. 用法

```js
function isBigEnough(element) {
  return element >= 10;
}

var filtered = [12,5,8,20].filter(isBigEnough)
// filtered [12, 20]

var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Array filters items based on search criteria (query)
 */

fucntion filterItems(query){
  return filters.filter(function(el){
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1
  })
}

filterItems('ap')   // ['apple', 'grapes']
filterItems('an')   // ['banana', 'mango', 'orange']

```
### 5、map()

1. 定义

**创建一个新数组，其结果是该数组中的每个元素是调用一次提供的回调函数后的返回值。**
 
2. 语法

```js
  let newArray = array.map(function(currentValue, index, arr), thisArg)
```
3. 参数

```js
  callback:为数组中每个元素执行的函数，该函数接收一至三个参数
 		  currentValue 数组中正在处理的当前元素
 		  index (可选)  数组中正在处理的当前元素的索引
 		  arr (可选)    map() 方法正在操作的数组
 thisArg      可选参数,当执行回调函数callback,用作this值
```

4. 用法

```js
// 数组中每个元素的平方根
var numbers = [1, 4, 9]
var roots = numbers.map(Math.sqrt)
console.log(roots)  //  [1, 2, 3]

var numberD = [1, 4, 9]
var doubles = numberD.map(function(num){
  return num * 2
})
console.log(doubles) // [2, 8, 18]

``` 

### 6、reduce()

1. 定义

**对数组中的每个元素执行一个由你提供的reduce函数（升序执行），将其结果汇总为单个返回值。**

2. 语法

```js
let result = array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)
```

3. 参数

```js
callback:为数组中每个元素执行的函数，该函数接收一至4个参数
        accumulator 累计器
        currentValue  当前值
        currentIndex  当前索引
        array 数组
        initialValue  作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
```
4. 用法

```js
const arr = [3,5,1,4,2]
const a = arr.reduce((t,v) => t + v)

```

### 7、reduceRight()

1. 定义

**接受一个函数作为累加器和数组的每个值（从右到左）为单个值。将其结果汇总为单个返回值**

2. 语法

```js
let result = array.reduceRight(callback(accumulator, currentValue, currentIndex, array), initialValue)
```

3. 参数

```js
callback:为数组中每个元素执行的函数，该函数接收一至4个参数
 		  accumulator 上一次调用回调函数时，回调函数返回的值。
			currentValue 当前值
			currentIndex 当前索引
			array 数组
      initialValue 首次调用 callback 函数时，累加器 accumulator 的值。如果未提供该初始值，则将使用数组中的最后一个元素，并跳过该元素。
```

4. 用法

```js
var a = ['1', '2', '3', '4', '5']
var left = a.reduce(function(prev, cur) { return prev + cur; })
var right = a.reduceRight(function(prev, cur) { return prev + cur; })

console.log(left);  // "12345"
console.log(right); // "54321"

```

### 8、find findIndex

1. 定义

```js
find: 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
findIndex: 数组中通过提供测试函数的第一个元素的索引。否则，返回-1。
```

2. 语法

```js
let ele = array.find(function(elemnet, index, arr), thisArg)
let eleIndex = array.findIndex(function(elemnet, index, arr), thisArg)
```

3. 参数

```js
 callback:为数组中每个元素执行的函数，该函数接收一至三个参数
 		  elemnet 数组中正在处理的当前元素
 		  index (可选)  数组中正在处理的当前元素的索引
 		  arr (可选)    find方法正在操作的数组
      thisArg       可选参数,当执行回调函数callback,用作this值
```

4. find用法

```js
// 寻找数组中的质数
function isPrime (element, index, array) {
  var start = 2
  while (start <= Math.sqrt(element)){
    if (element % start ++ < 1) {
      return false
    }
  }
  return element > 1
}
console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```

5. findIndex用法：

```js
//找数组中首个质数元素的索引 不存在素数返回-1
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}
console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

### 9、keys & values & entries

1. 定义

``` js
keys() 方法返回一个包含数组中每个索引键的 Array Iterator 对象
values() 方法返回一个新的 Array Itertor 对象，该对象包含数组每个索引的值
entries() 方法返回一个新的 Array Itertor 对象，该对象包含数组中每个索引的键/值对
```

2. 语法

```js
arr.entries()
```

3. 用法

```js
// 三者用法相似，举其中一个例子说明
const array1 = ['a', 'b', 'c']
const array1 = ['a', 'b', 'c'];
const iterator1 = array1.entries();
const iterator2 = array1.values();
const iterator3 = array1.keys();
console.log(iterator1);
```

## 二、改变原始数组方法

### 1、splice

1. 定义

**通过删除或者替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容**
> 注意此方法会改变原数组

2. 语法

```js
array.splice(start,deleteCount,item1,.....,itemX)
```

3. 参数

```js
start: 指定修改的开始位置（从0计数）
      1. 如果超出了数组的长度，则从数组末尾开始添加内容
      2. 如果是负值，则表示从数组末位的第几位（从-1计数，这意味着-n 是倒数第n个元素，并且等价于array.length-n）
      3. 如果负数的绝对值大于数组的长度，则表示开始位置为第0位
deleteCount(可选)：整数，表示要移除的数组元素个数
      1. 如果 deleteCount 大于start之后的元素的总数，则从start后面的元素都将被删除(含第 start 位)
      2. 如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
      3. 如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
item1, item2, ...(可选) 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
```

4. 用法

```js
//从第 2 位开始删除 0 个元素，插入“drum”
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed =  myFish.spilce(2, 0 , "drum")

// 从第 2 位开始删除 0 个元素，插入“drum” 和 "guitar"
var removed2 = myFish.splice(2, 0, 'drum', 'guitar');

// 从第 2 位开始删除 1 个元素，插入“trumpet”
var removed3 = myFish.splice(2, 1, "trumpet");

// 从第 0 位开始删除 2 个元素，插入"parrot"、"anemone"和"blue"
var removed4 = myFish.splice(0, 2, "parrot", "anemone", "blue");

// 从倒数第 2 位开始删除 1 个元素
var removed5 = myFish.splice(-2, 1);

// 从第 2 位开始删除所有元素
var removed6 = myFish.splice(2);
```

### 2、sort

1. 定义

**对数组的元素进行排序**

2. 语法

```js
arr.sort([compareFunction])
```

3. 参数

```js
compareFunction 可选
1. 用来指定按某种顺序进行排序的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
2. 指明了compareFunction，
3. 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
4. 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
5. 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
```

4. 用法

```js
var numbers = [4,2,5,1,3]
numbers.sort((a,b) => a - b)
console.log(numbers);

// [1, 2, 3, 4, 5]
```

### 3、pop

1. 定义

**从数组中删除最后一个元素，并返回该元素的值。**
> 此方法更改数组的长度

2. 语法

```js
arr.pop()
// 从数组中删除的元素（当数组为空时返回undefined）
```

3. 描述

```js
1. pop方法从一个数组中删除并返回最后一个元素。
2. pop方法根据 length 属性来确定最后一个元素的位置。
3. 如果不包含length 属性或length 属性不能被转成一个数值，会将length置为0，并返回undefined
4. 如果你在一个空数组上调用 pop(),它返回 undefined
```

4. 用法

```js
let myFish = ["angel", "clown", "mandarin", "surgeon"];
let popped = myFish.pop();
console.log(myFish);
// ["angel", "clown", "mandarin"]

console.log(popped);
// surgeon
```

### 4、shift()

1. 定义

**从数组中删除第一个元素，并返回该元素的值**

> 此方法更改数组的长度

2. 语法

```js
arr.shift()
// 从数组中删除的元素；如果数组为空则返回undefined
```

3. 描述

```js
1. shift 方法移除索引为 0 的元素（即第一个元素），并返回被移除的元素，其他元素的索引值随之减1
2. 如果 length 属性的值为 0 （长度为0），则返回undefined
3. shift 方法并不局限于数组，这个方法能够通过call 或者apply 方法作用于类似数组的对象上
4. 对于没有length属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义
```

4. 用法

```js
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 shift 之前: ' + myFish);
// "调用 shift 之前: angel,clown,mandarin,surgeon

var shifted = myFish.shift();

console.log('调用 shift 之后: ' + myFish);
// "调用 shift 之后: clown,mandarin,surgeon"

console.log('被删除的元素: ' + shifted);
// "被删除的元素: angel"

```

### 5、unshift()

1. 定义

**将一个或多个元素添加到数组的开头，并返回该数组的新长度**

> 该方法修改原有数组

2. 语法

```js
arr.unshift(element1, ..., elementN)
// element要添加到数组开头的元素或多个元素
```

3. 描述

```js
1. unshift 方法会在调用它的类数组对象的开始位置插入给定的参数
2. unshift 特意被设计成具有通用性，这个方法能够通过call 或者apply 方法作用于类数组对象上
3. 不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。
4. 注意, 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致
5. 传入多个参数调用一次 unshift ，和传入一个参数调用多次 unshift (例如，循环调用)，它们将得到不同的结果
```

4. 用法

```js
 let arr = [4,5,6]
 arr.unshift(1,2,3);
 console.log(arr); // [1, 2, 3, 4, 5, 6]

 arr = [4,5,6]; // 重置数组
 arr.unshift(1);
 arr.unshift(2);
 arr.unshift(3);
 console.log(arr); // [3, 2, 1, 4, 5, 6]
```

### 6、push()

1. 定义

**将一个或多个元素添加到数组的末尾，并返回该数组的新长度**

2. 语法

```js
arr.push(element1, ..., elementN)
// element要添加到数组末尾的元素或多个元素。
// 放回值:当调用该方法时，新的 length 属性值将被返回。
```

3. 描述

```js
1. push 方法具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。
2. push 方法根据 length 属性来决定从哪里开始插入给定的值。
3. 如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
```

4. 用法

```js
// 添加元素到数组

var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports);
// ["soccer", "baseball", "football", "swimming"]

console.log(total);  
// 4

```

### 7、reverse()

1. 定义

**将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。**

> 该方法会改变原数组

2. 语法

```js
arr.reverse()
// 放回值：颠倒后的数组
```

3. 描述

```js
1. reverse 方法颠倒数组中元素的位置，改变了数组，并返回该数组的引用。
2. reverse方法是特意类化的；此方法可被 called 或 applied于类似数组对象。
3. 对象如果不包含反映一系列连续的、基于零的数值属性中的最后一个长度的属性，则该对象可能不会以任何有意义的方式运行。
```

4. 用法

```js
// 颠倒数组中的元素
const a = [1, 2, 3]
console.log(a) // [1, 2, 3]

a.reverse()
console.log(a); // [3, 2, 1]

// 颠倒类数组中的元素
const a = {0: 1, 1: 2, 2: 3, length: 3}
console.log(a); // {0: 1, 1: 2, 2: 3, length: 3}

Array.prototype.reverse.call(a)
console.log(a); // {0: 3, 1: 2, 2: 1, length: 3}
```

### 8、copyWithin()

1. 定义

**浅复制数组的一部门到同一数组中的另一个位置，并返回它，不会改变原数组的长度**

2. 语法

```js
array.copyWithin(target, start = 0, end = this.length)
// 放回值:改变后的数组。
```

3. 参数

```js
target
1. 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
2. 如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。

start
1. 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
2. 如果 start 被忽略，copyWithin 将会从0开始复制。
end
1. 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
2. 如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。
```

### 9、fill()

1. 定义

**用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引**

2. 语法

```js
arr.fill(value, start, end )
// 放回值:修改后的数组。
```

3. 参数

```js
value
1. 用来填充数组元素的值。

start (可选)
1. 起始索引，默认值为0。

end  (可选)
1. 终止索引，默认值为 this.length。
```

4. 描述

```js
1. 如果 start 是个负数, 则开始索引会被自动计算成为 length+start，其中 length 是 this 对象的 length 属性值
2. fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。
3. fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。
4. 当一个对象被传递给 fill方法的时候, 填充数组的是这个对象的引用。
```

5. 用法

```js
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
// Objects by reference.
var arr = Array(3).fill({}) // [{}, {}, {}];
// 需要注意如果fill的参数为引用类型，会导致都执行都一个引用类型
// 如 arr[0] === arr[1] 为true
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

## 三、不改变原始数组方法

### 1、slice

1. 定义

**返回一个新的数组对象，这一对象是一个由begin和end 决定的原数组的浅拷贝（包括begin，不包括end）。原数组不会被改变**

2. 语法

```js
arr.slice([begin[, end]])
```

3. 参数

```js
begin (可选)
1. 提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。
2. 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取
3. slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）
4. 如果省略 begin，则 slice 从索引 0 开始。
5. 如果 begin 大于原数组的长度，则会返回空数组。

end   (可选)
1. slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）
2. 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。
3. 如果 end 被省略，则 slice 会一直提取到原数组末尾。
4. 如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。
```

4. 用法

```js
// 返回现有数组的一部分
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']

// 当数组中存在引用类型的值时，浅拷贝的是引用类型地址
// 使用 slice 方法从 myCar 中创建一个 newCar。
var myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } };
var myCar = [myHonda, 2, "cherry condition", "purchased 1997"];
var newCar = myCar.slice(0, 2);
newCar[0].color = 'blue';
console.log(myHonda.color)  // bule

// 类数组对象转换为数组
function list() {
  return Array.prototype.slice.call(arguments);
}
var list1 = list(1, 2, 3); // [1, 2, 3]
//你也可以简单的使用 [].slice.call(arguments) 来代替
```

### 2、join

1. 定义

**将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符**

2. 语法

```js
arr.join(separator)
```

3. 参数

```js
separator (可选)
指定一个字符串来分隔数组的每个元素。
如果需要，将分隔符转换为字符串。
如果缺省该值，数组元素用逗号（,）分隔。
如果separator是空字符串("")，则所有元素之间都没有任何字符。
```

4. 用法

```js
// 使用四种不同的分隔符连接数组元素
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"

// 连接类数组对象
function f(a, b, c) {
  var s = Array.prototype.join.call(arguments);
  console.log(s); // '1,a,true'
}
f(1, 'a', true);
```

### 3、toString

1. 定义

**返回一个字符串，表示指定的数组及其元素。**

2. 语法

```js
arr.toString()
```

> 当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

3. 用法

```js
const array1 = [1, 2, 'a', '1a'];
console.log(array1.toString());
// expected output: "1,2,a,1a"
```

### 4、concat

1. 定义

**用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。**

2. 语法

```js
var newArr =oldArray.concat(arrayX,arrayX,......,arrayX)
```

3. 参数

```js
arrayx(可选)
将数组和/或值连接成新数组。
如果省略了valueN参数参数，则concat会返回一个它所调用的已存在的数组的浅拷贝。
```

4. 用法

```js
// 以下代码将两个数组合并为一个新数组：
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];

alpha.concat(numeric);
// result in ['a', 'b', 'c', 1, 2, 3]

// 连接三个数组
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];
var nums = num1.concat(num2, num3);
console.log(nums);
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 将值连接到数组

var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]
```

5. 注意

- concat方法不会改变this或任何作为参数提供的数组，而是返回一个浅拷贝
- concat将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
- 数组/值在连接时保持不变。此外，对于新数组的任何操作（仅当元素不是对象引用时）都不会对原始数组产生影响，反之亦然。

### 5、indexOf

1. 定义

**返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1**

2. 语法

```js
array.indexOf(searchElement,fromIndex)
```

3. 参数

```js
searchElement  (必选)  要查找的元素
fromIndex
1. 开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。
2. 如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找
3.  注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.
4. 采用的是严格等于 ===
```

4. 用法

```js
// indexOf方法确定多个值在数组中的位置
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0

// 找出指定元素出现的所有位置
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]

// indexOf()不能识别NaN
let a = ['啦啦', 2, 4, 24, NaN]
console.log(a.indexOf('啦')); // -1
console.log(a.indexOf(NaN)); // -1
console.log(a.indexOf('啦啦')); // 0
```

### 6、lastIndexOf

1. 定义

**返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。**

2. 语法

```js
arr.lastIndexOf(searchElement,fromIndex)
```

3. 参数

```js
searchElement  (必选)  要查找的元素
fromIndex
1. 从此位置开始逆向查找
2. 默认为数组的长度减 1(arr.length - 1)，即整个数组都被查找
3.  如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移
4. 即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。
```

4. 用法

```js
// 数组中该元素最后一次出现的索引，如未找到返回-1。
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3
```
