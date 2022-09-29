import Vue from 'vue'
import Vuex from 'vuex'

// Modules
// import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'

import user from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user,
    },
})
