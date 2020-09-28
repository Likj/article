function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
    var O = R.prototype;// 取 R 的显示原型
    L = L.__proto__;// 取 L 的隐式原型
    while (true) { 
      if (L === null) 
        return false; 
      if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
        return true; 
      L = L.__proto__; 
    } 
   }


// 实现继承的几种方式
// 1. 原型链继承
function Person(loves) {
    this.name = 'person';
    this.loves = loves;
}
Person.prototype.age = '12';

function Child() {
    this.sex = 'man'
}
Child.prototype = new Person();

var child1 = new Child();
var child2 = new Child();
child1.__proto__.age = '11'; // child2.age 也给修改啦，
console.log(child1.__proto__ === Child.prototype) // true
console.log(child1.__proto__ === Person.prototype) // false
console.log(child1.__proto__.__proto__ === Person.prototype) // true
console.log(child1.__proto__.__proto__.__proto__ === Object.prototype) // true
console.log(child1 instanceof Child); 
console.log(child1 instanceof Person);
console.log(child1 instanceof Object);
console.log(typeof child1) // object
console.log(Object.prototype.toString.call(child1)) // "[object Object]"
// 构造函数继承

function Person(loves) {
    this.name = 'person';
    this.loves = loves;
}
Person.prototype.sex = 'man'
function Child(loves) {
    Person.call(this, loves);
    this.age = '12';
}

var child1 = new Child('sjh');
console.log(child1.__proto__ === Child.prototype); // true
console.log(child1 instanceof Person) // false
console.log(child1.__proto__.constructor) // Child函数
// 组合继承
function Person(loves) {
    this.name = 'person';
    this.loves = loves;
}
Person.prototype.sex = 'man';

function Child() {
    Person.call(this, 'sjh');
    this.age = '23'
}
Child.prototype = new Person(); // 会占用内存

var child1 = new Child();
console.log(child1.__proto__) // Person的实例
console.log(child1.__proto__.constructor) // Person函数，因为child1.__proto__上面没有construtor 再往上一层找
console.log(child1.__proto__ === Child.prototype) // true
console.log(child1.__proto__.__proto__ === Person.prototype) // true

// 原型包装继承
function Person(loves) {
    this.name = 'person';
    this.loves = loves;
}
Person.prototype.sex = 'man';

function createFn(subObj) {
    function f() {}
    f.prototype = subObj;

    return new f();
}

var person = new Person('sjh');
var child1 = createFn(person);
var child2 = createFn(person);
console.log(child1.__proto__.__proto__ === Person.prototype);

// 组合寄生式继承

function createFn(subObj) {
    function f() {}
    f.prototype = subObj;
    return new f();
}

function Person(loves) {
    this.name = 'person';
    this.loves = loves;
}
Person.prototype.sex = 'man';

function Child() {
    this.age = '23';
}

Child.prototype = createFn(new Person('sjh'));
Child.prototype.constructor = Child; // 这一行关键，修改的是Child.prototype 但是不会影响到Person.prototype

var child1 = new Child();
var child2 = new Child();

console.log(child1.__proto__ === Child.prototype) // true
console.log(child1.__proto__.__proto__.__proto__ === Person.prototype) // true