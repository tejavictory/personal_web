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
    courses: []
  },
  mutations: {
      changeCourse(state, course) {
        state.course = course
      },
      changeCourses(state,courses) {
        state.courses = courses
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
    }
  }
})
