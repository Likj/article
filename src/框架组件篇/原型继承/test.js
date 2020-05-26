

Function.prototype.myBind = function() {
    const obj = arguments[0];
    const params = [].slice.call(arguments, 1);
    const _this = this;
    
    function outer() {
        if (this instanceof outer) {
            return _this.apply(this, params.concat([].slice.call(arguments, 0)))
        }
        return _this.apply(obj, params.concat([].slice.call(arguments, 0)))
    }
    outer.prototype = _this.prototype;
    outer.prototype.constructor = outer;
    return outer;
}

function Animal(name, color) {
    this.name = name;
    this.color = color;
  }
Animal.prototype.say = function () {
    return `I'm a ${this.color} ${this.name}`;
};
const Cat = Animal.myBind(null, 'cat');
const cat = new Cat('white');
if (cat.say() === 'I\'m a white cat' &&
    cat instanceof Cat && cat instanceof Animal) {
    console.log('success');
}