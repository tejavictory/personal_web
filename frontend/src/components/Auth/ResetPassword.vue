<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
        <!-- <h3>Reset Password</h3> -->
        <form class="ui form" @submit.prevent="reset">
            <div class="field">
                <label>Enter New Password: </label><input type="password"/>
            </div>
            <div class="field">
                <label>Confirm New Password: </label><input type="password"/>
            </div>
            <button class="ui button">Reset Password</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ResetPassword'
}
</script>

<style scoped>
.ui.button{
    background-color: rgb(10, 78, 138);
    color: white;
    float: right;
}
</style>