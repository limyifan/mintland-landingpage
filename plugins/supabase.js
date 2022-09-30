import Vue from "vue";
import {createClient} from "@supabase/supabase-js";
import {store} from "~/store";

export const userPromise = {
    session: String,
    user: String,
    provider: String,
    url: String,
    error: String
}
Vue.prototype.$supabase = {
    supabase: null,
    session: null,

    init(supabaseUrl, supabaseKey) {
        this.supabase = createClient(supabaseUrl, supabaseKey)
    },
    getSession() {
      return this.supabase.session
    },
    setSession(session) {
        this.session = session
        store.commit("user/SET_USER", this.session.user);
    },
    async signIn(email) {
       const{error}= await this.supabase.auth.signIn({email});
       if(error){
           return error
       }
    },
    async signOut() {
        const {error} = await this.supabase.auth.signOut()
        if(error){
            return error
        }
    }
}
