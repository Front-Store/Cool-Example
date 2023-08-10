const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// // 文件解析配置
// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   module: {
//     // 默认支持 json js 文件
//     rules: [
//       //webpack import时 解析.css文件
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       //webpack import时 解析图片
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: ["file-loader"],
//       },
//       //webpack import时 解析 字体文件
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/,
//         use: ["file-loader"],
//       },
//       //webpack import时 解析 .csv文件
//       {
//         test: /\.(csv|tsv)$/,
//         use: ["csv-loader"],
//       },
//       //webpack import时 解析 .xml文件
//       {
//         test: /\.xml$/,
//         use: ["xml-loader"],
//       },
//       // webpack es5语法转换，
//       {
//         test: /\.js$/,
//         // include 仅在需要时 进行启动
//         include: path.resolve(__dirname, "src"),
//         loader: "babel-loader",
//       },
//     ],
//   },
// };

// // 多入口打包
// module.exports = {
//   // 设置为开发模式
//   mode: "development",
//   entry: {
//     index: "./src/index.js",
//     print: "./src/print.js",
//   },
//   // optimization: {
//   //   runtimeChunk: "single",
//   // },
//   // 开发服务器((dev server)  npm install --save-dev webpack-dev-server
//   // 开发模式下 将打包的代码还原 更容易地追踪错误和警告
//   // 非常消耗资源
//   devtool: "inline-source-map",
//   devServer: {
//     // 修改文件后 实时刷新html（不用手动刷新即可看到修改的代码）
//     static: "./dist",
//   },
//   plugins: [
//     // build 仅仅打包 entry里面的引用，当修改output 目录名称后，index.html将找不到引用
//     // 每次build时生成一个新的index.html，更新引用--且文件被压缩
//     new HtmlWebpackPlugin({
//       title: "Development",
//     }),
//   ],
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist"),
//     // 每次打包时 清理dist目录所有文件 包括index.html（默认dist目录的文件会越来越多）
//     clean: true,
//     publicPath: "/",
//   },
// };

// // 代码分离
// module.exports = {
//   mode: "development",
//   entry: {
//     index: {
//       import: "./src/index.js",
//       // 共享打包的代码   -- 防止依赖的文件 反复引用
//       dependOn: "shared",
//     },
//     another: {
//       import: "./src/another-module.js",
//       // 共享打包的代码   -- 防止依赖的文件 反复引用
//       dependOn: "shared",
//     },
//     shared: "lodash",
//   },
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   // 生成动态文件
//   optimization: {
//     runtimeChunk: "single",
//   },
// };

// // 代码抽离
// module.exports = {
//   mode: "development",
//   entry: {
//     index: "./src/index.js",
//     another: "./src/another-module.js",
//   },
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   optimization: {
//     // 将公共依赖（多个入口文件，引用了相同的依赖）打包到单独的文件中，从入口文件代码中抽离出来。
//     splitChunks: {
//       chunks: "all",
//     },
//   },
//   plugins: [
//     // build 仅仅打包 entry里面的引用，当修改output 目录名称后，index.html将找不到引用
//     // 每次build时生成一个新的index.html，更新引用--且文件被压缩
//     new HtmlWebpackPlugin({
//       title: "Development",
//     }),
//   ],
// };

// // 缓存
// module.exports = {
//   entry: "./src/index.js",
//   plugins: [
//     // build 仅仅打包 entry里面的引用，当修改output 目录名称后，index.html将找不到引用
//     // 每次build时生成一个新的index.html，更新引用--且文件被压缩
//     new HtmlWebpackPlugin({
//       // 界面的title
//       title: "Caching",
//     }),
//   ],
//   output: {
//     filename: "[name].[contenthash].js",
//     path: path.resolve(__dirname, "dist"),
//     // 每次打包时 清理dist目录所有文件 包括index.html（默认dist目录的文件会越来越多）
//     clean: true,
//   },

//   // 将公共依赖（多个文件，引用了相同的依赖）打包到单独的文件中，从入口文件（main.js）代码中抽离出来。
//   optimization: {
//     // 将打包的文件输入到 runtime 临时缓存文件
//     runtimeChunk: "single",

//     // 数据更改触发动态打包时，静态引入的模块hash文件名不改变
//     // 用于静态文件缓存，除非文件被修改，不然不再加入打包行列
//     moduleIds: "deterministic",

//     // 分块打包设置
//     splitChunks: {
//       // 将引入的node_modules文件 单独打包，减少浏览器在文件修改后的变更请求
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: "vendors",
//           // 组块
//           chunks: "all",
//         },
//       },
//     },
//   },
// };

// // 代码分离打包-避免重复引入
// module.exports = {
//   entry: "./src/index.js",
//   plugins: [
//     // build 仅仅打包 entry里面的引用，当修改output 目录名称后，index.html将找不到引用
//     // 每次build时生成一个新的index.html，更新引用--且文件被压缩
//     new HtmlWebpackPlugin({
//       // 界面的title
//       title: "Caching",
//     }),
//   ],
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "webpack-numbers.js",
//     // 每次打包时 清理dist目录所有文件 包括index.html（默认dist目录的文件会越来越多）
//     clean: true,
//     library: {
//       name: "webpackNumbers",
//       type: "umd",
//     },

//     // 外部的包（如果项目已经引用过了，则此时打包不会再重复打包）
//     externals: {
//       lodash: {
//         commonjs: "lodash",
//         commonjs2: "lodash",
//         amd: "lodash",
//         root: "_",
//       },
//     },
//   },
// };

// 热更新配置
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    app: "./src/index.js",
  },

  // 开发环境 inline-source-map
  // 生产环境 source-map
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
