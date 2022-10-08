import {loadResourceFromManifest} from "@/lib/utils";

export default {
  namespaced: true,
  state() {
    return {
      lookConfig: {},
      lookConfig1: {},
      resourcesPromise:[],
      resourcesPromise1:[],
    };
  },
  getters: {
    getLookConfig: (state) => state.lookConfig,
    getLookConfig1: (state) => state.lookConfig1,
    getResourcesPromise: (state) => state.resourcesPromise,
    getResourcesPromise1: (state) => state.resourcesPromise1,
  },
  mutations: {
    setLookConfig(state, val) {
      state.lookConfig = val;
    },
    setLookConfig1(state, val) {
      state.lookConfig1 = val;
    },
    setResourcesPromise(state, val) {
      state.resourcesPromise = val;
    },
    setResourcesPromise1(state, val) {
      state.resourcesPromise1 = val;
    },
  },
  actions: {
    collectItem({ state, commit },item) {
      let lookConfig = state.lookConfig
      console.log("lookConfig",lookConfig)
       if (item.image) {
         lookConfig[item.category] = item
       } else {
         delete lookConfig[item.category]
       }
       commit('setLookConfig', lookConfig)
    },
    collectItem1({ state, commit },item) {
      let lookConfig = state.lookConfig1
      if (item.image) {
        lookConfig[item.category] = item
      } else {
        delete lookConfig[item.category]
      }
      commit('setLookConfig1', lookConfig)
    },
    async loadResourcePromise({state, commit}, url) {
      const promise = await loadResourceFromManifest(url);
      commit('setResourcesPromise', promise)
    },
    async loadResourcePromise1({state, commit}, url) {
      const promise = await loadResourceFromManifest(url);
      commit('setResourcesPromise1', promise)
    },
  },
};
