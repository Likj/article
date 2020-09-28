const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});

function log(param) {
  console.log(param);
}

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
/**

按照上面的测试用例，实现 createFlow：

flow 是指一系列 effects 组成的逻辑片段。
flow 支持嵌套。
effects 的执行只需要支持串行。
*/

function getType(param) {
  if (typeof param === "function") {
    return "function";
  }
  if (typeof param === "object" && typeof param.then === "function") {
    return "promise";
  }
  if (typeof param === "object" && typeof param.run === "function") {
    return "flowType";
  }
  if (Array.isArray(param)) {
    return "array";
  }
}

function createFlowV1(flows) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      for (const flow of flows) {
        const actionMap = {
          array: () => createFlow(flow),
          promise: async () => await flow.then(),
          function: async () => await flow(),
        };
        const actionType = getType(flow);
        await actionMap[actionType]();
      }
      return resolve();
      // return
    } catch (e) {
      return reject(e);
    }
  });
  return {
    run: (resolve) => promise.then(resolve),
    then: (resolve) => promise.then(resolve),
  };
}

function createFlow(flows = []) {
  const copyFlow = flows.slice(0);
  const noob = () => {};
  async function run(callBack = noob) {
    while (copyFlow.length) {
      const flow = copyFlow.shift();
      const actionMap = {
        array: async () => await createFlow(flow).run(),
        promise: async () => await flow.then,
        function: async () => await flow(),
        flowType: async () => await flow.run(),
      };

      const actionType = getType(flow);
      await actionMap[actionType]();
    }
    await callBack();
  }
  return {
    run,
  };
}
