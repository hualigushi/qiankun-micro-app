import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import { registerMicroApps, start } from 'qiankun';
import { registerMicroApps, start } from './micro-fe';


registerMicroApps([
  {
    name: 'vue2-app', // app name registered
    entry: '//127.0.0.1:8082',//子应用HTML入口
    container: '#subappContainer',//渲染到指定容器中，container在主应用中
    activeRule: '/vue2-app/',//路由匹配规则
  },
  // {
  //   name: 'vue3-app',
  //   entry: '//127.0.0.1:8085',
  //   container: '#subappContainer2',
  //   activeRule: '/vue3-app',
  // },
]);


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

start();
