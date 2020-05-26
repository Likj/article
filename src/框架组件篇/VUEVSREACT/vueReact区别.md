### vue 和react 编程范式区别
1. vue是 mvvm 双向数据绑定，react 针对view层。单向数据流
2. 模版语法不同，模版作用域不同
---

### eventLoop
1. micro-task:  mutationObserver, process.nextTick, Priomise， async/ await;
2. macro-task: setTimeout,  setImmediate, I/O; UIrender

## 虚拟列表
1. 计算可视窗口高度

## 缓存优先级
1. cache-control > expires > etag （if-none-match） > last-modified (if-modified-since)
2. 动态polyfill https://cdn.polyfill.io/v2/polyfill.min.js?features=Map,Set  polyfill.io动态服务