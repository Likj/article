
// 手写CO 简单版本
/**
 * 
const co = require('co');
co(function *() {
    const url = 'http://jasonplacerholder.typecoder.com/posts/1';
    const response = yield fetch(url);
    const post = yield response.json();
    const title = post.title;
    console.log('Title: ',title);
})
 * 
*/
function co (generat) {
    const iterator = generat();
    function autoRun(iteration) {
        if (iteration.done) {
            return iteration.value;
        }
        const nextPromise = iteration.value;
        nextPromise.then(val => {
            return autoRun(iterator.next(val));
        });
    }
    autoRun(iterator.next());
}


function run(generat) {
    const iterator = generat();
    function autoRun(iteration) {
        if(iteration.done) {return iteration.value}  //出口
        const anotherPromise = iteration.value;
        anotherPromise.then(x => {
            return autoRun(iterator.next(x))  //递归条件
        })
    }
    return autoRun(iterator.next()) 
}
