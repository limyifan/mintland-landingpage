<template>
  <div>
    <fieldset v-if="resource">
      <legend>{{ resource.category }}</legend>
      <div class="images">
        <div class="image-select" @click="selectImage(image)" :class="config.image === image&&'selected'"
             v-for="image in resource.images">
          <img :src="createObjectURL(image.blob)" alt=""/>
        </div>
      </div>

      <div v-if="config.palettes!=null">
        <div>Palette:</div>
        <color-palette :id="`input-color-picker-${resource.category+i}`" :update-config="updateConfig"
                       :palette="palette" :onColorChange="changePalette"
                       v-for="(palette,i) in Object.entries(config.palettes)"/>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "Closet",
  props: ["resource", "updateConfig"],
  data() {
    return {
      config: {
        category: "",
        priority: -1,
        image: null,
        palettes: null,
      },
    }
  },
  mounted() {
    this.config.category = this.resource.category;
    this.config.priority = this.resource.priority;
    if (this.resource.image) {
      this.config.image = this.resource.image;
    }
    if (this.resource.category === "身体")
    {
      this.selectImage(this.resource.images[0]);
    }
  },
  methods: {
    createObjectURL(blob) {
      return URL.createObjectURL(blob);
    },
    selectImage(image) {
      if (!this.resource) return;
      if (this.config.image === image) {
        this.config.image = null;
        this.config.palettes = null;
      } else {
        this.config.image = image;
        this.config.palettes = this.getImagePalettes(image);
      }
      this.updateConfig(this.config);
    },
    changePalette(from, to) {
      this.config.palettes = {...this.config.palettes, [from]: to};
      this.updateConfig(this.config);
    },
    toHex(n) {
      return n.toString(16).padStart(6, "0");
    },
    getImagePalettes(image) {
      const palettesEntries = image.png.palettes.map((n) => [`#${this.toHex(n)}`, ""]);
      return Object.fromEntries(palettesEntries);
    }
  }
}
</script>

<style scoped>
.images {
  display: flex;
}
legend{
  font-size: 2vh;
}
.image-select {
  display: flex;
  background-color: lightgray;
  cursor: pointer;
}

.selected {
  background-color: lightblue;
}
</style>
