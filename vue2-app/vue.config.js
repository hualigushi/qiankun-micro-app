const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name;

module.exports = {
  
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',//允许请求跨域
    },
  },
  chainWebpack: config => {
    // console.log('config====',config);
  //  config.module
  //   .rule('images')
  //   .use('url-loader')
  //   .loader('url-loader')
  //   .tap(options => {
  //     console.log('options========',options);
  //     return Object.assign(options, { limit: 1, esModule: false })
  //   })

      config.module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .set('parser', {
        dataUrlCondition: {
          maxSize: 1 // 10KiB
        }
      })

    },
  configureWebpack:{
    mode:'development',
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    },
  }
}
