<template>
  <div>
    <div v-if="user">
      <h1 >Welcome to Mintland: {{user.email}}<br/></h1>
      <h1 > id: {{user.id}}<br/></h1>
      <h2>Session expired at : {{timeConverter($Supabase.getUserSessionExpirationTime())}}</h2>
      <button type="danger" @click="signOut">Sign Out</button>
    </div>
    <div v-else>
     <h1>You are not signed in yet. Please <a href="/login">Sign In</a></h1>
    </div>
  </div>
</template>

<script>
import {store} from "@/store"
export default {
  name: "profile",
  mounted() {
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
      const error = await this.$Supabase.signOut()
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
      await this.$Supabase.signIn(this.email);
    }
  }
}
</script>

<style scoped>

</style>
