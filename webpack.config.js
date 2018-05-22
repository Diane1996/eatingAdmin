// const proxy = require('http-proxy-middleware');

// const currentIP = require('address').ip();
// const context = ['/admin'];

module.exports = {
  devServer: {
    id: '127.0.0.1',
    port: 8888,
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1:8360',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ''
        }
      }
    }
  }
};
