import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () =>
        import(/* webpackChunkName: "logout" */ '@/views/Logout.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('getCurrentUser')
  const isLoggedIn = store.getters.isLoggedIn
  if (isLoggedIn && to.name === 'login') {
    next({ name: 'home' })
  }
  if (!isLoggedIn && to.name === 'logout') {
    next({ name: 'home' })
  }
  next()
})

export default router
