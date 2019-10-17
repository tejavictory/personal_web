<template>
    <div class="ui container">
        <div id="temp" class="ui pointing stackable container big menu">
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
        <!-- <div class="ui segment" v-if="localstorage.getItem('reqstat')==='Pending'">
            Instructor Previleges Pending
        </div> -->
        <div>
            <button class="ui button blue" v-on:click="reqIns">Request Instructor Previleges</button>
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
        this.fetchReqStatus()
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
                        this.username = response.data.data.username
                        this.email = response.data.data.email
                        localStorage.setItem('username',response.data.data.username)
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
        },
        reqIns() {
            axios.post('/reqIns', {
            headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    },
                    username: this.$store.getters.username || localStorage.getItem('username'),
                    status: 'Pending'
           }).then(response => {
                this.insstat = response.data.data
            })
        },
        fetchReqStatus() {
            try{
            axios.get('/getreqstat/'+localStorage.getItem('username'), {
            headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    }
           }).then(response => {
                this.reqstat = response.data.status
                localStorage.setItem('reqstat',response.data.status)
            })
            }
            catch(error){
                localStorage.setItem('reqstat','error')
            }
        }
    }
}
</script>

<style scoped>
.header.item{
  background-color: rgb(16, 56, 104);
  color: white;
}
#temp{
  background-color:#97CAEF
}
</style>