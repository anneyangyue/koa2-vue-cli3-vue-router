import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Register from './views/Login/Register.vue'
import Login from './views/Login/Login.vue'
import User from './views/User/User.vue'
import AddUser from './views/User/Add.vue'
import UpdataUser from './views/User/Updata.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          // component: Home
          component: User
        }, {
          path: '/about',
          name: 'about',
          // component: About
          component: User
        }, {
          path: '/user',
          name: 'user',
          component: User
        }, {
          path: '/user/add',
          name: 'addUser',
          component: AddUser
        }, {
          path: '/user/updata/:id',
          name: 'updataUser',
          component: UpdataUser
        }
      ]
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/logout',
      name: 'logout',
      redirect: '/login',
      component: Login
    }, {
      path: '/404',
      name: '404',
      component: NotFound
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
})
