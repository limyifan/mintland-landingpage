<template>
  <el-main>
    <div v-if="user">
      <h1 >Welcome to Mintland: {{user.email}}<br/></h1>
      <h1 > id: {{user.id}}<br/></h1>
      <h2>Session expired at : {{timeConverter($supabase.session.expires_at)}}</h2>
      <el-button type="danger" @click="signOut">Sign Out</el-button>
    </div>
    <div v-else>
     <h1>You are not signed in yet. Please <a href="/login">Sign In</a></h1>
    </div>
  </el-main>
</template>

<script>
import {store} from "@/store"
export default {
  name: "profile",
  mounted() {
    const session = window.localStorage.getItem('supabase.auth.token')
    if (session) {
      console.log("dafdasf")
      this.$supabase.setSession(JSON.parse(session))
    }
  },
  data() {
    return {
      email: "",
    };
  },
  computed: {
    user: {
      get: function() {
        return store.getters["user/user"];
      },
      set: function() {
      }
    }
  },
  methods: {
    async signOut() {
      const error = await this.$supabase.signOut()
      if (error) {
        this.$message.error("Something went wrong")
      } else {
        window.location.reload()

      }
    },
    timeConverter(UNIX_timestamp){
      let a = new Date(UNIX_timestamp * 1000);
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let hour = a.getHours();
      let min = a.getMinutes();
      let sec = a.getSeconds();
      let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    },
    async signIn() {
      await this.$supabase.signIn(this.email);
    }
  }
}
</script>

<style scoped>

</style>
