<template>
    <div>
        <br/>
        <div class="ui container">
            <h2>Remove Users.... Under Construction</h2>
            <table class="ui single line table">
            <thead>
                <tr>
                <th style="background-color:rgba(0, 9, 61, 0.705);color:white">Name</th>
                <th style="background-color:rgba(0, 9, 61, 0.705);color:white">Role</th>
                <th style="background-color:rgba(0, 9, 61, 0.705);color:white">Email</th>
                <th style="background-color:rgba(0, 9, 61, 0.705);color:white"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users"
                    :key="item.id"
                    :user="item">
                <td>{{ item.firstname + ' ' + item.lastname }}</td>
                <td>{{ item.role_name }}</td>
                <td>{{ item.email }}</td>
                <td><button class="ui button inverted red" v-on:click="delUser"><i class="trash alternate outline icon"></i>Delete</button></td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RemoveUsers',
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
            axios.get('/users', {
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                    }
                // params: {
                //         email: this.$store.getters.useremail || sessionStorage.getItem('useremail')
                //     }
           }).then(response => {
                // this.$store.commit('changeCourses',response.data.data)
                this.users = response.data.data
            })
        }
    }
}
</script>

<style scoped>
tr{
    background-color: rgb(203, 228, 250);
}
</style>