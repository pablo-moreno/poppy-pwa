import Vue from 'vue'
import Router from 'vue-router'
import { Home, LoginView, SignUpView } from './views'
import store from './store'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        protected: false
      }
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpView,
      meta: {
        protected: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        protected: true
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.protected) {
    if (store.state.auth.user) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router