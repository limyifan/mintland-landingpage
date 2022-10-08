<template>
  <el-main>
    <el-row v-if="resourcesPromise&&resourcesPromise1">
      <el-col :md="24" :lg="6" class="preview">
        <AvatarPreview :configs="[lookConfig,lookConfig1]" ref="avatarPreview"/>
      </el-col>
      <el-col :md="24" :lg="6" class="closet">
        <Closet :resource="resource" :updateConfig="collectItem" v-for="resource in resourcesPromise"/>
        <Closet :resource="resource" :updateConfig="collectItem1" v-for="resource in resourcesPromise1.slice(0,1)"/>
        <Closet :resource="resource" :updateConfig="collectItem1" v-for="resource in resourcesPromise1.slice(1,7)"/>
      </el-col>
      <el-col :md="24" :lg="6" class="closet">
        <Closet :resource="resource" :updateConfig="collectItem1" v-for="resource in resourcesPromise1.slice(7)"/>
      </el-col>
    </el-row>
    <div v-else v-loading.fullscreen.lock="true"></div>

  </el-main>
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
    this.resourcesPromise = await loadResourceFromManifest("parts_64/eyes-manifest.json");
    this.resourcesPromise1 = await loadResourceFromManifest("parts_64/manifest.json");
  },
  data() {
    return {
      lookConfig: {},
      lookConfig1: {},
      lookConfig2: {},
      resourcesPromise: null,
      resourcesPromise1: null,
      resourcesPromise2: [],
    }
  },
  methods:
      {
        collectItem(item) {
          if (item.image) {
            this.lookConfig[item.category] = item
          } else {
            delete this.lookConfig[item.category]
            this.lookConfig = this.lookConfig
          }
          this.$refs.avatarPreview.triggerDraw()
        },
        collectItem1(item) {
          if (item.image) {
            this.lookConfig1[item.category] = item
          } else {
            delete this.lookConfig1[item.category]
            this.lookConfig1 = this.lookConfig1
          }
          this.$refs.avatarPreview.triggerDraw()
        },
        collectItem2(item) {
          if (item.image) {
            this.lookConfig2[item.category] = item
          } else {
            delete this.lookConfig2[item.category]
            this.lookConfig2 = this.lookConfig2
          }
          this.$refs.avatarPreview.triggerDraw()
        }
      }
}
</script>

<style scoped>
@media (max-width: 980px) {

}

</style>
