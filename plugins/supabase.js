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
    setSession(session) {
        this.session = session
        store.commit("user/SET_USER", this.session.currentSession.user);
    },
    async signIn(email) {
       const{error}= await this.supabase.auth.signIn({email});
       if(error){
           return error
       }
    }
}
