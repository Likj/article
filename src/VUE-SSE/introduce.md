# 注意事项
> 1. vue 2.5以下异步加载只能用在路由上，2.5 以上可以任何地方使用。
> 2. 调用app.$amount 之前先调用 router.ready 在回掉里面执行$amount
> 3. beforeCreate created 生命周期会在node环境 执行，禁止使用客户端独有的API 对象，
> 4. window对象需要在lazy access 惰性访问中 使用，一些第三方库需要在node环境nock出来window
> 5. 自定义指令报错处理，a 使用抽象机制  b 开启server-slide version ;
> 6. 书写有效完整的html结构，例如 tbody  theader  这些virtual dom