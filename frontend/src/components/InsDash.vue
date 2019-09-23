<template>
    <div class="ui container">
        <p> Instructor Dashboard Construction in progress... </p>
        <div class="ui top attached button" tabindex="0" v-on:click="showModal">Add Course</div>
        <br/>
        <div class="ui stackable four column grid">            
            <InsCourse
                v-for="item in courses"
                :key="item.id"
                :course="item"
            />
        </div>
        <CourseModal/>
        <EditCourse/>
    </div>
</template>

<script>
import InsCourse from './InsCourse.vue'
import CourseModal from './CourseModal.vue'
import EditCourse from './EditCourse.vue'

export default {
    name: 'InsDash',
    data() {
        return{
            courses: []
        }
    },
    components: {
        InsCourse,
        CourseModal,
        EditCourse
    },
    mounted:function() {
        this.fetchCourses()
    },
    methods: {
        showModal: function() {
            $('#createCourse').modal('show')
        },
        fetchCourses() {
            axios.get('/courses').then(response => {
                this.$store.commit('changeCourses',response.data.data)
                this.courses = response.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>