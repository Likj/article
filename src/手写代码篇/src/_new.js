function _new(fn, ...args) {
    let context = new Object();
    context.__proto__ = fn.prototype;
    // let context = Object.create(fn.prototype);
    let result = fn.apply(context, args);
    return typeof result === 'object' ? result : context;
}

