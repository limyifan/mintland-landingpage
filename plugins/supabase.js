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
Vue.prototype.$Supabase = {
    supabase: null,

    init(supabaseUrl, supabaseKey) {
        this.supabase = createClient(supabaseUrl, supabaseKey)
    },
    getSupabase() {
        if (this.supabase) {
            console.log("Supabase is initialized")
            return this.supabase

        } else {
            console.log("Supabase is not initialized")
            this.init(process.env.supabaseUrl, process.env.supabaseKey)
            return this.supabase
        }

    },
    getSession() {
        const supabase = this.getSupabase()
        return supabase.auth.session()
    },
    setSession(session) {
        store.commit("user/SET_USER", session.user);
    },
    async signIn(email) {
        const {error} = await this.supabase.auth.signIn({email});
        if (error) {
            return error
        }
    },
    async signInWithRefreshToken(refresh_token) {
        const {session, error} = await this.supabase.auth.signIn({refreshToken: refresh_token});
        if (error) {
            return error
        }
        this.setSession(session)
        return session
    },
    async signOut() {
        const {error} = await this.supabase.auth.signOut()
        if (error) {
            return error
        }
    },
    getUserSessionExpirationTime() {
        const supabase = this.getSupabase()
        return supabase.auth.session().expires_at
    },
    getRefreshToken() {
        const supabase = this.getSupabase()
        return supabase.auth.session().refresh_token
    }
}
