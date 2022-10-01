<template>
  <Nuxt/>
</template>

<script>

export default {
  name: "default.vue",
  mounted() {
    this.$Supabase.init()
    const session =   this.$Supabase.getSession()
    if (session) {
      this.$Supabase.setSession(session)
    }

    const refreshToken=this.$route.query.refresh_token
    if(refreshToken!==undefined)
    {
      const {session,error}=this.$Supabase.signInWithRefreshToken(refreshToken)
      console.log(error)
      console.log(session)
      if(session)
      {
        this.$router.push("/profile")
      }
    }


  },
  methods: {}
}
</script>

<style scoped>

</style>
