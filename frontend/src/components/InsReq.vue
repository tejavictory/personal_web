<template>
    <div>
        <br/>
        <div class="ui segment container">
            <h2>Instructor Requests.... Under Construction</h2>
            <table class="ui single line table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users"
                    :key="item.id"
                    :user="item">
                <td>{{ item.firstname + ' ' + item.lastname }}</td>
                <td>
                    <button class="ui button blue" v-on:click="approve"><i class="check circle icon"></i></button>
                    <button class="ui button red" v-on:click="reject"><i class="close icon"></i></button>
                </td>
                </tr>
            </tbody>
            </table>           
        </div>
    </div>
</template>

<script>
export default {
    name: 'InsReq',
    data() {
        return {
            users: []
        }
    },
    mounted:function() {
        this.fetchUsers()
    },
    methods: {
        delUser: function() {

        },
        fetchUsers: function() {
            axios.get('/reqUsers', {
                headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    }
                // params: {
                //         email: this.$store.getters.useremail || localStorage.getItem('useremail')
                //     }
           }).then(response => {
                // this.$store.commit('changeCourses',response.data.data)
                this.users = response.data.data
            })
        }
    }
}
</script>