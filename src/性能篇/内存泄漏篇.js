/**
 * 引起内存泄漏的
 * 1. 循环引用
 * 2. 数组或者 对象的 key  子元素对象
*/

let obj = {
    c: 'test'
};

let o1 = {};
let o2 = {};
o1.a = o2;
o2.c = o1;


let array = [];
array.push(obj);
obj = null;
console.log(array[0])