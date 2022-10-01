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
    isSignedIn: false,

    init() {
        this.supabase = createClient(process.env.VUE_SUPABASE_URL, process.env.VUE_SUPABASE_KEY)
    },
    getSupabase() {
        if (this.supabase) {
            console.log("Supabase is initialized")
            return this.supabase

        } else {
            console.log("Supabase is not initialized")
            this.init()
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
        this.isSignedIn=true;
    },
    async signInWithRefreshToken(refresh_token) {
        const {session, error} = await this.supabase.auth.signIn({refreshToken: refresh_token});
        if (error) {
            return error
        }
        this.setSession(session)
        this.isSignedIn=true;
        return session
    },
    async signOut() {
        const {error} = await this.supabase.auth.signOut()
        if (error) {
            return error
        }
        this.isSignedIn=false;
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
