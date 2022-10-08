<template>
  <input
      type="color"
      class="input-color-picker"
      :id="id"
      v-model="color"/>
</template>

<script>
export default {
  name: "ColorPalette",
  props: ["id", "updateConfig","palette","onColorChange"],
  mounted() {
    this.color= this.palette[0];
  },

  data() {
    return {
      color: null,
    }
  },
  watch: {
    color: function (val) {
      this.onColorChange(this.palette[0],val)
    }
  },
}
</script>

<style scoped>

</style>
