import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie-page',
    name: 'movie-page',
    component: () => import(/* webpackChunkName: "movie-page" */ '../views/MoviePage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "register" */ '../views/LoginPage.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
