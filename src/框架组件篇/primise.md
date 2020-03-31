# 面试题 结合事件循环
```
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
// result
script start
VM76:2 async1 start
VM76:7 async2
VM76:15 promise1
VM76:20 script end
VM76:4 async1 end
VM76:18 promise2
undefined
VM76:11 setTimeout
```
---
```
setTimeout(function(){
    console.log(1)
},0);
new Promise(function(resolve){
    console.log(2)
    for( var i=100000 ; i>0 ; i-- ){
        i==1 && resolve()
    }
    console.log(3)
}).then(function(){
    console.log(4)
});
console.log(5);

// 2 3 5 4 1 
```
---
## macrotask
> 1. setTimeout/setInterval
> 2. setImmediate
> 3. requestAnimationFrame
> 4. I/O
> 5. UI rendering
## microtask
> 1. process.nextTick
> 2. Promise
> 3. Object.observe
> 4. MutationObserver

---
### 1. 让一组异步函数顺序执行
```
const queue = () => {
  const list = []; // 队列
  let index = 0;  // 游标

  // next 方法
  const next = () => {
    if (index >= list.length - 1) return;    

    // 游标 + 1
    const cur = list[++index];
    cur(next);
  }

  // 添加任务
  const add = (...fn) => {
    list.push(...fn);
  }

  // 执行
  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  // 返回一个对象
  return {
    add,
    run,
  }
}

// 生成异步任务 
const async = (x) => {
  return (next) => {// 传入 next 函数
    setTimeout(() => {
      console.log(x);
      next();  // 异步任务完成调用
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.run();// 1, 2, 3, 4, 5, 6 隔一秒一个。

```
---
### 2. 增加暂停继续功能
```
const queue = () => {
  const list = [];
  let index = 0;
  let isStop = false;

  const next = () => {
    // 加限制
    if (index >= list.length - 1 || isStop) return;    
    const cur = list[++index];
    cur(next);
  }

  const add = (...fn) => {
    list.push(...fn);
  }

  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  const stop = () => {
    isStop = true;
  }

  const retry = () => {
    isStop = false;
    run();
  }

  const goOn = () => {
    isStop = false;
    next();
  }

  return {
    add,
    run,
    stop,
    retry,
    goOn,
  }
}

const async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x);
      next();
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.run();

setTimeout(() => {
  q.stop();
}, 3000)


setTimeout(() => {
  q.goOn();
}, 5000)

```
### 3. 实现并发，一次发送所有
```
const queue = () => {
  const list = [];
  let index = 0;
  let isStop = false;
  let isParallel = false;

  const next = () => {
    if (index >= list.length - 1 || isStop || isParallel) return;    
    const cur = list[++index];
    cur(next);
  }

  const add = (...fn) => {
    list.push(...fn);
  }

  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  const parallelRun = () => {
    isParallel = true;
    for(const fn of list) {
      fn(next);
    }
  }

  const stop = () => {
    isStop = true;
  }

  return {
    add,
    run,
    stop,
    parallelRun,
  }
}

const async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x);
      next();
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.parallelRun();
// 一秒后全部输出 1, 2, 3, 4, 5, 6

```
### thunk 实现
> thunk 其实是为了解决 “传名调用” 的。就是我传给函数 A 一个表达式作参数 x + 1，但是我不确定这个 x + 1 什么时候会用到，以及会不会用到，如果在传入就执行，这个求值是没有必要的。所以就出现了一个临时函数 Thunk，来保存这个表达式，传入函数 A 中，待需要时再调用。
> 
```
const thunk = () => {
  return x + 1;
};

const A = thunk => {
  return thunk() * 2;
}
```
### thunk generator版本
```
const coThunk = function(gen, ...params) {

  const g = gen(...params);

  const next = (...args) => { // args 用于接收参数
    const ret = g.next(...args);   // args 传给 g.next，即赋值给上一个 yield 的值。
    if(!ret.done) { // 去判断是否完成
      ret.value(next);  // ret.value 就是下一个 thunk 函数
    }
  }

  next(); // 先调用一波
}

// 返回 thunk 函数的 asyncFn
const asyncFn = (x) => {
  return (next) => { // 接收 next
    const data = x + 1;
    setTimeout(() => {
      next && next(data);
    }, 1000)
  }
}

const gen = function* (x) {
  const a = yield asyncFn(x);
  console.log(a);

  const b = yield asyncFn(a);
  console.log(b);

  const c = yield asyncFn(b);
  console.log(c);

  const d = yield asyncFn(c);
  console.log(d);

  console.log('done');
}

coThunk(gen, 1);
// 2, 3, 4, 5, done

```
### thunk promise 版本
```
// 定义 co
const coPromise = function(gen) {
// 为了执行后的结果可以继续 then
  return new Promise((resolve, reject) => {
    const g = gen();

    const next = (data) => { // 用于传递，只是换个名字
      const ret = g.next(data);
      if(ret.done) { // done 后去执行 resolve，即co().then(resolve)
        resolve(data); // 最好把最后一次的结果给它
        return;
      }
      ret.value.then((data) => { // then 中的第一个参数就是 promise 对象中的 resolve，data 用于接受并传递。
        next(data);  //调用下一次 next
      })
    }

    next();
  })
}

const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

const genP = function* () {
  const data1 = yield asyncPromise(1);
  console.log(data1);

  const data2 = yield asyncPromise(data1);
  console.log(data2);

  const data3 = yield asyncPromise(data2);
  console.log(data3);
}

coPromise(genP).then((data) => {
  setTimeout(() => {
    console.log(data + 1); // 5
  }, 1000)
});
// 一样的 2, 3, 4, 5
```
### thunk async/await 版本
```
// 定义 co
const coPromise = function(gen) {
// 为了执行后的结果可以继续 then
  return new Promise((resolve, reject) => {
    const g = gen();

    const next = (data) => { // 用于传递，只是换个名字
      const ret = g.next(data);
      if(ret.done) { // done 后去执行 resolve，即co().then(resolve)
        resolve(data); // 最好把最后一次的结果给它
        return;
      }
      ret.value.then((data) => { // then 中的第一个参数就是 promise 对象中的 resolve，data 用于接受并传递。
        next(data);  //调用下一次 next
      })
    }

    next();
  })
}

const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

const genP = function* () {
  const data1 = yield asyncPromise(1);
  console.log(data1);

  const data2 = yield asyncPromise(data1);
  console.log(data2);

  const data3 = yield asyncPromise(data2);
  console.log(data3);
}

coPromise(genP).then((data) => {
  setTimeout(() => {
    console.log(data + 1); // 5
  }, 1000)
});
//
const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

async function fn () {
  const data = await asyncPromise(1);
  console.log(data);
}
fn();


```
> 参考co库
### 
1. 请实现如下的函数，可以批量请求数据，所有的URL地址在urls参数中，同时可以通过max参数 控制请求的并发度。当所有的请求结束后，需要执行callback回调。发请求的函数可以直接使用fetch。

function sendRequest (urls: string[], max: number, callback: () => void) {

}
```
function sendRequest(arr, max, callback) {
        let fetchArr = [],  // 存储并发max的promise数组
            i = 0;

        function toFetch() {
            if (i === arr.length) {   // 所有的都处理完了， 返回一个resolve
                return Promise.resolve();
            }

            let one = fetch(arr[i++]); // 取出第i个url， 放入fetch里面 , 每取一次i++
            one.then( () => {fetchArr.splice(fetchArr.indexOf(one), 1)}); // 当promise执行完毕后，从数组删除
            fetchArr.push(one);  //将当前的promise存入并发数组中       其实将这个push放到上一行会更好理解，那样就是我们同步的思维顺序，先push进去，再等promise执行完了之后再删除。  但由于then是异步的，所以怎么放都可以。

            let p = Promise.resolve(); 
            if (fetchArr.length >= max) {     // 当并行数量达到最大后， 用race比较 第一个完成的， 然后再调用一下函数自身。
                p = Promise.race(fetchArr);
            }
            
            return p.then(() => toFetch()); // 16ms 

        }
        
        // arr循环完后， 现在fetchArr里面剩下最后max个promise对象， 使用all等待所有的都完成之后执行callback
        toFetch().then(() => Promise.all(fetchArr)).then(() => {
            callback();
        })
}
```
### promise.all 实现简版本
```
function all(iterable) {
  return new Promise((resolve, reject) => {
    let index = 0;
    for (const promise of iterable) {
      // Capture the current value of `index`
      const currentIndex = index;
      promise.then(
        (value) => {
          if (anErrorOccurred) return;
          result[currentIndex] = value;
          elementCount++;
          if (elementCount === result.length) {
            resolve(result);
          }
        },
        (err) => {
          if (anErrorOccurred) return;
          anErrorOccurred = true;
          reject(err);
        });
      index++;
    }
    if (index === 0) {
      resolve([]);
      return;
    }
    let elementCount = 0;
    let anErrorOccurred = false;
    const result = new Array(index);
  });
}
```
### promise.race 的简单实现。不执行安全检查
```
function race(iterable) {
  return new Promise((resolve, reject) => {
    for (const promise of iterable) {
      promise.then(
        (value) => {
          if (settlementOccurred) return;
          settlementOccurred = true;
          resolve(value);
        },
        (err) => {
          if (settlementOccurred) return;
          settlementOccurred = true;
          reject(err);
        });
    }
    let settlementOccurred = false;
  });
}

```

```
function resolveAfter(ms, value=undefined) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms);
  });
}

function timeout(timeoutInMs, promise) {
  return Promise.race([
    promise,
    resolveAfter(timeoutInMs,
      Promise.reject(new Error('Operation timed out'))),
  ]);
}
timeout(100, resolveAfter(2000, 'Result!'))
  .catch(err => assert.deepEqual(err, new Error('Operation timed out')));
```

function fun1() {
    for (var i = 0; i < 10; i++) {
        setTimeout(() => {
            console.log(i)
        }, 0)
    }
}
function fun12() {
    for (var i = 0; i < 10; i++) {
        const j = i;
        setTimeout(() => {
            console.log(j)
        }, 0)
    }
}
function fun13() {
    for (var i = 0; i < 10; i++ ) {
        (function(i){
            setTimeout(() => {
                console.log(i)
            }, 0)
        })(i)
    }
}
function fun2() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            console.log(i)
        }, 0)
    }
}
function fun21() {
    for (var i = 0; i < 10; i++) {
        Promise.resolve(i).then(result => {
            console.log(i)
        })
    }
}
function fun22() {
    for (let i = 0; i < 10; i++) {
        Promise.resolve(i).then(result => {
            console.log(i)
        })
    }
}





1. 比如 var p = Promise.resolve('传入的参数') 直接进入 p.then()
2. 比如 var p = Promise.reject('传入参数') 直接进入p.catch()
3. then 监听的是上一次 resolve里面的返回值，如果返回值是一个promise； 那么then 监听的是 promise的结果；
```
function resolveAfter(value) {
    return new Promise(resolve => {
        setTimeout(() => {resolve(value)}, 500)
    })
}
// then 监听的是 resolve('数据');  resolve 返回的是 '数据'
resolveAfter('数据').then(res => console.log('成功', res)).catch(err => console.log('失败', err))

// then 监听的是resolve(Promise.reject('失败信息'))  ; resolve 返回的是 Promise.reject(‘失败信息’); 是一个promise 直接走到catch里面
resolveAfter(Promise.reject('失败信息')).then(res => console.log('成功', res)).catch(err => console.log('失败', err))
```