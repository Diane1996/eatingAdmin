// const proxy = require('http-proxy-middleware');

const currentIP = require('address').ip();
const context = ['/admin'];

module.exports = {
  // devServer: {
    proxy: [{
      // path: '*',
      context: context,
      changeOrigin: true,
      target: 'http://' + currentIP + ':8360',
      // host: '192.168.1.213',
    }]
  // }
};
