/**
 * 如下为一段代码，请完善sum函数，使得 sum(1,2,3,4,5,6) 函数返回值为 21 ,
 * 需要在 sum 函数中调用 asyncAdd 函数，且不能修改asyncAdd函数
青铜难度， 输出时长大于6秒
白银难度， 输出时长大于3秒
王者难度， 输出时长大于1秒
 */
/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
  // 请在此处完善代码
  let i = 0;

  function PromiseResolve(result) {
    if (i >= rest.length) {
      return Promise.resolve(result);
    }
    return new Promise((resolve) => {
      asyncAdd(result, rest[i++], (error, sum) => {
        if (error) throw error;
        return resolve(sum);
      });
    }).then((sum) => {
      return PromiseResolve(sum);
    });
  }
  return PromiseResolve(0);
}

async function sum2(...rest) {
  return new Promise((resolve) => {
    function reaultCall(error, sum) {
      if (error) throw error;
      ind++;
      if (ind >= rest.length) {
        resolve(sum);
      }
      result.current = sum;
    }
    let result = {
      current: 0,
      toString() {
        return this.current;
      },
    };
    let ind = 0;
    function add() {}
    /**
     * 要想一秒输出结果，
     * 1. 并发，全部开始异步任务；
     * 2. 传入的参数，需要实时改变，每次要能拿到最新值。如果传入一个普通值，相当于闭包里面缓存啦
     * 3. 传入一个对象。引用类型，每次都是最新值，
     */
    var obj = { current: 1 };
    setTimeout(() => {
      console.log(obj.current, "最新值");
    }, 200);
    obj.current += 10;

    rest.map((item, index) => {
      // todo result 改成proxy 形式
      asyncAdd(result, item, reaultCall);
    });
  });
}

async function sum3(...rest) {
  return new Promise((resolve) => {
    function reaultCall(error, sum) {
      if (error) throw error;
      ind++;
      if (ind >= rest.length) {
        resolve(sum);
      }
      result.current = sum;
    }
    let result = {
      current: 0,
    };
    let ind = 0;
    let resultProxy = new Proxy(result, {
      get(target, prop) {
        if (prop === Symbol.toPrimitive) {
          return () => target.current;
        }
        return Reflect.get(target, prop);
      },
    });

    rest.map((item, index) => {
      // todo result 改成proxy 形式
      asyncAdd(resultProxy, item, reaultCall);
    });
  });
}

// 另一种 是 result / 2 分组， 先两两相加， 然后 再将每组的结果组成新result 递归 再加预计是3秒多

let start = window.performance.now();
sum(1, 2, 3, 4, 5, 6).then((res) => {
  // 请保
  console.log(res);
  console.log(`程序1执行共耗时: ${window.performance.now() - start}`);
});
start2 = window.performance.now();
ssum3(1, 2, 3, 4, 5, 6).then((res) => {
  // 请保
  console.log(res);
  console.log(`程序2执行共耗时: ${window.performance.now() - start2}`);
});
