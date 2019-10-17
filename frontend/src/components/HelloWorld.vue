<template>
  <div class="ui container">
    <router-link to="/login"><button class="ui large button">Login</button></router-link><br/><br/>
    <router-link to="/signup"><button class="ui large button">Register</button></router-link>
    <router-link to="/resetpwd"><button class="ui large button">Reset Password</button></router-link>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ui.button{
  background-color: rgb(44, 44, 102);
  width: 200px;
  color: white
}
</style>
