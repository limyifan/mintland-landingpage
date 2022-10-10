<template>
  <div class="container">
    <div v-if="bodyPromise" class="row">
      <div class="preview col">
        <AvatarPreview :eye-config="eyeConfig" :body-config="bodyConfig" ref="avatarPreview"/>
      </div>
      <div class="closet col">
<!--        <Closet :resource="resource" :updateConfig="collectEyesItem" v-for="resource in eyesPromise"/>-->
        <Closet :resource="resource" :updateConfig="collectBodyItem" v-for="resource in bodyPromise"/>
      </div>
    </div>
    <div v-else><h1>Loading....</h1></div>

  </div>
</template>

<script>

import {loadResourceFromManifest} from "@/lib/utils.js";
import Closet from "@/components/Closet.vue";

export default {
  name: "avatar",
  components: {Closet},
  // computed: {
  //   ...mapState({
  //     lookConfig: (state) => state.avatar.lookConfig,
  //     lookConfig1: (state) => state.avatar.lookConfig1,
  //     resourcesPromise: (state) => state.avatar.resourcesPromise,
  //     resourcesPromise1: (state) => state.avatar.resourcesPromise1,
  //   }),
  // },
  //
  async mounted() {
    // this.eyesPromise = await loadResourceFromManifest("parts_64/eyes-manifest.json");
    this.bodyPromise = await loadResourceFromManifest("/parts_64/manifest.json");
  },
  data() {
    return {
      eyeConfig: {},
      bodyConfig: {},
      eyesPromise: null,
      bodyPromise: null,
    }
  },
  methods:
      {
        collectEyesItem(item) {
          if (item.image) {
            this.eyeConfig[item.category] = item
          } else {
            delete this.eyeConfig[item.category]
            this.eyeConfig = this.eyeConfig
          }
          this.$refs.avatarPreview.triggerDrawEyes()
        },
        collectBodyItem(item) {
          if (item.image) {
            this.bodyConfig[item.category] = item
          } else {
            delete this.bodyConfig[item.category]
            this.bodyConfig = this.bodyConfig
          }
          this.$refs.avatarPreview.triggerDrawBody()
        },
      }
}
</script>

<style scoped>
.container{
  width: 50%;
  margin: 0 auto;
}
.row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.closet{
  overflow: scroll;
  height: 100vh;
}
.preview{
  flex: 1;
}
.closet{
  flex:4;
}
@media (max-width: 980px) {

}

</style>
