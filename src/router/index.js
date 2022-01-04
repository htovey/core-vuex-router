import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/login/Auth.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AuthView',
    component: Auth
  },
  {
    path: '/admin',
    name: 'AdminDash',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboards/AdminDashView.vue')
  },
  {
    path: '/biz',
    name: 'BizDash',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboards/BizDashView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
