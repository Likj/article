function createFlow(effects = []) {
  let sources = effects.slice().flat();
  function run(callback) {
    while (sources.length) {
      const task = sources.shift();
      if (typeof task === "function") {
        const res = task();
        if (res?.then) {
          res.then(createFlow(sources).run);
          break;
        }
      } else if (task?.isFlow) {
        task.run(createFlow(sources).run);
        break;
      }
    }
    // 在所有任务执行完毕后 执行传入的回调函数
    callback?.();
  }
  return {
    run,
    isFlow: true,
  };
}

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
createFlow([
  () => console.log("a"),
  () => console.log("b"),
  createFlow([() => console.log("c")]),
  [() => delay().then(() => console.log("d")), () => console.log("e")],
]).run();
/**
   * 
  
  作者：晨曦时梦见兮
  链接：https://juejin.im/post/6860646761392930830
  来源：掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
   * 
  */
