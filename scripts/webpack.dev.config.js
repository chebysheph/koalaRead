
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const PORT = 8888
const PORT = 3000;
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      // template: resolve('../public/index.html'),
      // template: resolve('../src/index.html'),
      template: resolve('../index.html'),
      mapConfig: 'http://192.168.0.1/map_config.js'
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/#/login`,
    }),
    // 分析代码
    // new BundleAnalyzerPlugin({ analyzerPort: 3015 }),
    
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name].1.0.js',
      path: './dll',
      entry: {
        dll: [
          'react',
          'react-dom',
          'react-router',
          'babel',
          'react-router-dom',
          'axios',
        ]
      },
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../src'),
    historyApiFallback: false,
    hot: false,
    host: '0.0.0.0',
    port: PORT,
  },
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
