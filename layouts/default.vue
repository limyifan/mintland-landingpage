<template>
  <Nuxt/>
</template>

<script>

export default {
  name: "default.vue",
  mounted() {
    const supabaseUrl = this.$config.VUE_SUPABASE_URL;
    const supabaseKey = this.$config.VUE_SUPABASE_KEY;
    this.$supabase.init(supabaseUrl, supabaseKey)
    // const session = window.localStorage.getItem('supabase.auth.token')
    // if (session) {
    //   this.$supabase.setSession(JSON.parse(session))
    // }
    const session =   this.$supabase.supabase.auth.session()
    if (session) {
      this.$supabase.setSession(session)
    }
    console.log("session1",session)


  },
  methods: {}
}
</script>

<style scoped>

</style>
