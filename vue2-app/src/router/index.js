import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: window.__POWERED_BY_QIANKUN__ ? '/vue2-app' : '/',
  // base:'/vue2-app',
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log('micro router to',to);
  console.log('micro router from',from);
  next()

})

export default router
