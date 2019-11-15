import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/roomlist',
    name: 'roomlist',
    component: () => import(/* webpackChunkName: "roomList" */ '../views/roomList.vue')
  },
  {
    path: '/roomlist/:id',
    name: 'inroom',
    component: () => import(/* webpackChunkName: "inroom" */ '../views/inRoom.vue')
  },
  {
    path: '/gameroom',
    name: 'gameroom',
    component: () => import(/* webpackChunkName: "ingame" */ '../views/inGame.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
