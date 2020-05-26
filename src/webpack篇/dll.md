1. 引入webpack.DllPlugin 参数 简化的webpack 配置，先行打包一遍，entry 仅仅是lib 库js 出口是vendor_library  ;不需要loader 处理，一般都是node_modules文件 先打包到一个文件夹下面
2. 正式打包过程。entry output module 都不用管，plugin新增 两个plugin 1. new webpack.DllReferencePlugin  webpack.DllReferencePlugin  插件是 将 项目里用到vendor_library的地方 不再参与打包 配置context 和
manifest  2. 引入 add-assert-html-plugin 将vendor_library文件引入html