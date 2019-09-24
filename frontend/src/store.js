import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    course: {
      type: Object,
      required: true
    },
    token: localStorage.getItem('auth-token') || '',
    user: {},
    useremail: localStorage.getItem('useremail'),
    courses: [],
    role: ''
  },
  mutations: {
      changeCourse(state, course) {
        state.course = course
      },
      changeCourses(state,courses) {
        state.courses = courses
      },
      changeUserEmail(state, useremail) {
        state.useremail = useremail
        localStorage.setItem('useremail', useremail)
      },
      changeUser(state, user) {
        state.user = user
      },
      changeUserRole(state, role) {
        state.role = role
        localStorage.setItem('role', role)
      }
  },
  actions: {
      
  },
  getters: {
    course: state => {
      return state.course
    },
    courses: state => {
      return state.courses
    },
    useremail: state => {
      return state.useremail
    },
    user: state => {
      return state.user
    },
    role: state => {
      return state.role
    }
  }
})
