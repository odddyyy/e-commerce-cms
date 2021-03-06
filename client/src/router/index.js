import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Front',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("access_token")) {
      next({
        name: "Front"
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
