<template>
  <Nuxt/>
</template>

<script>

export default {
  name: "default.vue",
  mounted() {
    const supabaseUrl = this.$config.VUE_SUPABASE_URL;
    const supabaseKey = this.$config.VUE_SUPABASE_KEY;
    this.$Supabase.init(supabaseUrl, supabaseKey)
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
