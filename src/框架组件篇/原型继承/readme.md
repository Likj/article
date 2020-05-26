> 1. 构造函数，就是生成对象的 函数工厂； 生成的对象就是实例对象，构造函数属性，即this上绑定的属性。是实例对象上添加属性。 独有属性，
> 2. prototype原型，就是复制一个新对象的 模版，是构造函数的一个属性，是构造函数 生成对象的时候参考的模版；
> 3. 实例对象的__proto__ 即 这个对象的原型链对象。也即是生成当前对象的模版。一般是直接生成此实例对象的构造函数的prototype；

## <> 1. 原型继承
```
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
console.log(child1.__proto__.constructor); // Person函数，其实child.__proto__上面没有constructor；会继续往上一层__proto__上面找

```
### 特点
> 1. 子类继承父类的构造函数属性，父类的原型属性.

### 缺点
> 1. 子类无法向父类传参数
> 2. 父类所有的属性都是通过原型传递给子类，所有子类公有
> 3. 父构造函数属性也是通过原型传递给子类，所有子类公有，子类修改原型属性的时候，所有的子类都受到影响，不是私有属性。

## <> 2. 构造函数继承
```
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

```
### 特点
> 1. 子类可以继承多个父类，子类call 多个父构造函数，
> 2. 子类没有继承父类原型的属性
> 3. 子类可以向父类传入参数
> 4. 父构造函数属性，通过子构造函数传递给子类实例子。子类是私有
### 缺点
> 1. 无法继承父原型属性
> 2. 

## <> 3. 组合继承
```
function Person(loves) {
    this.name = 'person';
    this.loves = loves;
}
Person.prototype.sex = 'man';

function Child() {
    Person.call(this, 'sjh');
    this.age = '23'
}
Child.prototype = new Person();
var child1 = new Child();
console.log(child1.__proto__) // Person的实例
console.log(child1.__proto__.constructor) // Person函数，因为child1.__proto__上面没有construtor 再往上一层找
console.log(child1.__proto__ === Child.prototype) // true
console.log(child1.__proto__.__proto__ === Person.prototype) // true
```

### 特点
> 1. 可以向父类传入参数，也可以继承父原型属性；也可继承父亲构造函数属性
> 2. 子类实例上面，有子类构造函数属性，父类构造函数属性，
> 3. 子类第一层原型链对象，__proto__上面，有父构造函数属性，是一个父实例
> 4. 子类第二层原型链对象，__proto__.__proto__上面。是父原型的对象。有父原型属性
> 5. 父构造函数属性通过子构造函数传递给子类。子类是私有，
> 6. 父原型属性通过子类原型的 上一层原型链传递给子类。子类实例子是共享的。
### 缺点
> 1. 

## 原型式 包装继承
```
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
```
