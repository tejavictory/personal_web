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
import Secure from '@/components/Secure'
import Welcome from '@/components/Welcome'
import CodewordSets from '@/components/CodewordSets'
import Confirm from '@/components/Confirm'
import ResetPwdFinal from '@/components/ResetPwdFinal'

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
      path: '/reset/:token',
      component: ResetPwdFinal
    },
    {
      path: '/confirm/:token',
      component: Confirm,
    },
    {
      path: '/secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
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
        },
        {
          path: '/InsStu',
          component: InsStu
        },
        {
          path: '/Codewords',
          component: CodewordSets
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
      path: '/welcome',
      component: Welcome
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

