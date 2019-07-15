// 构造函数
class Animal {
    constructor(name, color) {
        this.name = name
        this.color = color
    }

    // toString 是原型对象上的属性
    toString() {
        console.log('name:' + this.name + ',color:' + this.color);
    }
}

// 实例化Animal
var animal = new Animal('dog', 'white')
animal.toString()

// hasOwnProperty 方法返回一个布尔值，指示对象自身属性是否具有指定的属性
console.log(animal.hasOwnProperty('name'));   // true
console.log(animal.hasOwnProperty('toString'));  // false
console.log(animal.__proto__.hasOwnProperty('toString')); // true
// console.log(animal);

class Cat extends Animal {
    constructor(action) {
        super('cat', 'white')
        this.action = action
    }

    toString(){
        console.log(super.toString());
    }
}

var cat = new Cat('catch')
cat.toString();

// instanceof 运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
console.log(cat instanceof Cat , 'instanceof');  // true
console.log(cat instanceof Animal);  // true
// console.log(cat);
