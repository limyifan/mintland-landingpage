export default {
    namespaced: true,
    state() {
        return {
            networkId: "",
            email: "",
            id:"",
            user:"",
        }
    },
    getters: {
        networkId: state => state.networkId,
        email: state => state.email,
        id: state => state.id,
        user: state => state.user,
    },
    mutations: {
        SET_NETWORK_ID(state, val) {
            state.networkId = val
        },
        SET_EMAIL(state, val) {
            state.email = val
        },
        SET_ID(state, val) {
            state.id = val
        },
        SET_USER(state, val) {
            state.user = val
        },
    },
    actions: {},
}
