import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Signin from '../components/Auth/Signin.vue'
import Signup from '../components/Auth/Signup.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router