<template>
  <div>
    <h1>You have successfully login !</h1>
    <a @click="goToAvatarPage">Visit Profile Page</a>
  </div>
</template>

<script>
export default {
  name: "success",
  data() {
    return {
      refreshToken: "",
    }
  },
  mounted() {
    this.refreshToken = this.$Supabase.getRefreshToken()
  },
  methods:{
    goToAvatarPage: function () {
      window.href.location = "http://localhost:3000/?refreshToken=" + this.refreshToken
    }
  }
}
</script>

<style scoped>

</style>
