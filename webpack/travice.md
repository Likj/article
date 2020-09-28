```
1. __webpack_modules__ 对象是一个所有的分析的需要加载打包的module 集合。moduleId是key 值是一个函数。接受三个参数，module, module.exports, __webpack__require ；函数的目的是给module 挂载包里export内容
2. __webpack_module_cache__ 是一个缓存模块是否加载的集合。
3. __webpack_require__ 加载函数。传入参数是moduleId ； 定义一个modules空对象，传入到 __webpack__modules__ 里面对应的moduleId的值函数。函数允许结束会给module.exports挂载内容。然后返回module
4. __webpack_require__.m __webpack_require__.m是指向__webpack__modules 对象的指针。
5. __webpack__require__.n 传入一个module  返回gettter  根据__esModule返回当前模块
6. __webpack__require__.d ( exports, definition ); 将definition上getOwnProperty 定义copy到exports 上。
7. __webpack__require__.f 是类似一个preset 前置处理器。__webpack__require__.e (chunkId) 每次调用，Object.keys(__webpack__require__.f);将chunkId  和reduce的 Array<Primise> 传入到前置对应到函数里面。
8. __webpack__require__.u 固定返回后缀是.js文件
9. __webpack__require__.g 返回global对象
10. __webpack__require__.o 调用Object.prototype.hasOwnProperty确认对象是否有key
11. __webpack__require__.r (exports) define __esModule true
12. __webpack_require__.f.overridables 重置处理器。installedModules 是缓存已加载模块 chunkMapping 是存放公共chunk; fallbackMapping 是installedModules没有的时候，获取里面的obj 值是加载的公共external部分
13. __webpack__require__.0 是存放


14. __webpack_require__.f.overridables (chunkId, promises) 将chunkMapping里面存放的chunkId  加载一下，installedModules加载过，就直接放promises 没有 从fallbackMapping里面取出需要overridables
,新建一个promise  赋给installedModule 当promise完成是，将installedModules[chunkId]修改成0；并且在__webpack__modules__[id:是需要overridables的external ] 注入加载函数。
fallbackMapping 里面缓存啦真正external 需要加载的内容;
chunkMapping 缓存啦公共需要加载的chunk;
执行__webpack__require__.f.overridables的过程  向__webpack__require.e ensure里面推送一个promise promise成功的时候会给__webpack__modules[id]增加一个key；是需要公共的chunkId;
真正加载的chunkId 优先从__webpack__require__.0里面查找，没有的时候从fallbackMap里面查找


15. __webpack__require__.p 是存放运行时publicPath


16. __webpack__require__.f.remotes 这个是模块联邦的关键。
里面installedModules 代表缓存已经安装的包。
里面的chunkMapping 代表的是需要处理remotes的chunkId 通常是__webpack__modules__里面的key；
里面的idToExternalAndNameMapping是将chunkMapping里面value值 也就是chunkId对应的需要加载的其他chunkList的Array做的映射。真正需要加载的chunk模块集合
idToExternalAndNameMapping 里面 值数组 是['remote-overrides', 'remote/lib', '某个特定的内容'];
第一项 是share里面 external配置项。需要Object.assign到  __webpack__require__.0里面; (LibName) 参数是接受一个库 返回当前库。如果当前库提供了override方法即调用
第二项。是remote的库文件
前两项目 都在__webpack__modules__里面有体现，第一项给module.exports挂载的是一个函数，接受Lab作为参数，并返回Lab 但是调用啦Lab的override方法。将主项目share的配置项合并到__webpack__require__.0;并且返回Lab
第3项目； 是主项目加载过的模块;会转换成 get方法去获取模块
执行的顺序是，先执行 主项目配置的share模块的 __webpack__module__的chunk得到一个函数，  然后将Lab模块加载，当作参数传入上一个函数；；最后调用Lab的get()子目录的方式。
如果是同步就同步加载，异步就异步加载
加载成功后。将chunkMap里面 chunk对应的 remote的 chunk key 注入到__webpack__module__ 里面去。module.exports = get的到函数的运行结果







调用__webpack__require__.e会创建script标签。加载js进入

webpackJsonpCallBack() 函数是给 webpackJsonpzcomp 数组的push操作做拦截. 加载的第三方的sctipt 标签；可以将内容导出到主main里面，或者说父子通信的桥梁关键\

17.
__webpack__require__.f.j 模块;目的就是创建标签到html; jsonp chunk loading

声明啦一个全局数组 webpackJsonpapp 这个数据里面 缓存需要动态加载的其他module；
然后给当前数组的push方法 重写；webpackJsonpCallback；如果不是prefetching preload 就用webpackJsonpCallback方式加载script
默认加载超时是120S 2分钟结束;


```
