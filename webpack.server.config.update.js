// const proxy = require('http-proxy-middleware');

const currentIP = require('address').ip();
const context = ['/admin'];

module.exports = {
  proxy: {
    path: '/',
    context: context,
    changeOrigin: true,
    target: 'http://' + currentIP + ':8360',
    host: '127.0.0.1',
  }
};
