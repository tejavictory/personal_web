<template>
<div id="temp" class="ui pointing stackable container big menu">
  <div class="header item">
    Codeword App
  </div>
    <a class="item" v-on:click="setActive('insdash')" :class="{ active: isActive('insdash') }">
          <router-link to="/InsDash"> Instructor Dashboard </router-link>
    </a>
    <a class="item" v-on:click="setActive('studash')" :class="{ active: isActive('studash') }">
          <router-link to="/InsStu"> Student Dashboard </router-link>
    </a>
    <a class="item" v-on:click="setActive('cdwd')" :class="{ active: isActive('cdwd') }">
          <router-link to="/Codewords"> Codewords Dashboard</router-link>
    </a>
  <div class="right menu">
    <a class="item" v-on:click="logout">
      Logout
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'InsNav',
  data() {
    return {
      activeItem: 'insdash'
    }
  },
  components: {

  },
  methods: {
        logout() {
            sessionStorage.removeItem('auth-token')
            this.$router.push('/login')
        },
        isActive: function (menuItem) {
            return this.activeItem === menuItem
        },
        setActive: function (menuItem) {
            this.activeItem = menuItem
        }
  }
}
</script>

<style scoped>
*{
  color: black;
}
#temp{
  background-color:#97CAEF
}
a:hover{
  color: rgb(16, 56, 104);
}
.header.item{
  background-color: rgb(16, 56, 104);
  color: white;
}
</style>