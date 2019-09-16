<template>
<div class="ui pointing stackable container big menu">
  <div class="header item">
    Codeword App
  </div>
    <a class="item" v-on:click="setActive('insdash')" :class="{ active: isActive('insdash') }">
          Instructor Dashboard
    </a>
    <a class="item" v-on:click="setActive('studash')" :class="{ active: isActive('studash') }">
      Student Dashboard
    </a>
  <div class="right menu">
    <a class="item">
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

</style>