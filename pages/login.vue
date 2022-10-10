<template>
  <div>
      <input v-model="email" placeholder="Please enter your email"></input>
    <button @click="signIn">Sign In</button>
  </div>
</template>

<script>
import {store} from "@/store"
import {Loading} from "element-ui";
export default {
  name: "login",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async signIn() {
      // const loadingInstance = Loading.service({
      //   text: "Processing",
      // })
      const error =await this.$Supabase.signIn(this.email);

      if(error){
        // loadingInstance.close()
        // this.$message.error("Something went wrong")
      }
      else
      {
        loadingInstance.close()
        // this.$notify({
        //   title: 'Success',
        //   message: `A conformation email has been sent to ${this.email}`,
        //   type: 'success'
        // });
      }
    }
  }
}
</script>

<style scoped>

</style>
