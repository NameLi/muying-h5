'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: "html",
  publicPath: "/",
  devServer: {
    open: true,
    port: 8102
  },
  chainWebpack: (config) => {
    config.module
      .rule("scss")
      .oneOf("vue")
      .use("px2rem")
      .loader("px2rem-loader")
      .before("postcss-loader")
      .options({
        remUnit: 75,
        remPrecision: 8,
      })
      .end()
      .rule("js")
      .include.add("/packages")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options;
      });
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src'),
        'images': resolve('src/assets/images'),
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      // css: {
      //   // 这里的选项会传递给 css-loader
      //   importLoaders: 1,
      // },
      sass: {
        prependData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },
};
