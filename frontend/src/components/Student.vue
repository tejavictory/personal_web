<template>
    <div class="ui container">
        <div class="ui pointing stackable container big menu">
        <div class="header item">
            Codeword App
        </div>
            <a class="item active" >
            Student Dashboard
            </a>
        <div class="right menu">
            <a class="item" @click="logout">
            Logout
            </a>
        </div>
        </div>
        <p> Student Dashboard Construction in progress... </p>
        <div class="ui stackable four column grid">
            <StuCourse
                v-for="item in courses"
                :key="item.id"
                :course="item"
                />
        </div>
    </div>
</template>

<script>
import StuCourse from './StuCourse.vue'

export default {
    name: 'Student',
    data() {
        return {
            courses: [],
        }
    },
    mounted:function() {
        this.fetchUserEmail()
        this.fetchUserCourses()
    },
    components: {
        StuCourse
    },
    methods: {
        logout() {
            localStorage.removeItem('auth-token')
            this.$router.push('/login')
        },
        fetchUserEmail() {
                const token = localStorage.getItem('auth-token')

                axios
                    .get('user/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        this.email = response.data.data.email
                        this.$store.commit('changeUserEmail',response.data.data.email)
                    })

        },
        fetchUserCourses() {
            axios.get('/usercourses', {
            headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    },
             params: {
                        email: this.$store.getters.useremail || localStorage.getItem('useremail')
                    }
           }).then(response => {
                // this.$store.commit('changeCourses',response.data.data)
                this.courses = response.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>