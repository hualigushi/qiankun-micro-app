//webpack运行时的publicPath
//设置public-path 让子应用的资源src地址指向子应用的域名地址
//如主应用访问http://localhost:8086/vue2-app/  ，那子应用资源文件地址就是 http://127.0.0.1:8082/js/app.js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}