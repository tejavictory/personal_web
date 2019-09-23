import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LogInForm from '@/components/Auth/LogInForm'
import SignUpForm from '@/components/Auth/SignUpForm'
import ResetPassword from '@/components/Auth/ResetPassword'
import Instructor from '@/components/Instructor'
import Student from '@/components/Student'
import Admin from '@/components/Admin'
import InsStu from '@/components/InsStu'
import InsDash from '@/components/InsDash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      component: SignUpForm
    },
    {
      path: '/login',
      component: LogInForm
    },
    {
      path: '/resetpassword',
      component: ResetPassword
    },
    {
      path: '/Instructor',
      component: Instructor,
      props: true,
      children: [
        {
          path: '/InsStu',
          component: InsStu
        },
        {
          path: '/InsDash',
          component: InsDash
        }
      ]
    },
    {
      path: '/Student',
      component: Student
    },
    {
      path: '/Admin',
      component: Admin
    },    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
