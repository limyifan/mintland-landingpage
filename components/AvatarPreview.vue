<template>
  <div class="preview">
      <canvas hidden height="25" width="25" id="eye-canvas"/>
      <canvas hidden height="64" width="64" id="body-canvas"/>
      <canvas hidden height="300" width="300" id="download-canvas"/>
      <canvas id="preview-canvas" height="64" width="64"/>
    <div>
      <el-button type="primary" plain @click="saveCanvasImage">Save Image</el-button>
    </div>
  </div>
</template>

<script>
import {blendColors} from "../lib/utils";

export default {
  name: "AvatarPreview",
  props: ["configs"],
  data() {
    return {
      eyecanvas: null,
      bodyCanvas: null,
      mainCanvas: null,
      downloadCanvas: null,
    }
  },
  mounted() {
    this.initCanvas()
    this.triggerDraw()
  },
  methods: {
    triggerDraw() {
      const all = []
      for (let config of this.configs) {
        const items = Object.values(config).filter(Boolean);
        items.sort((a, b) => a.priority - b.priority);
        all.push(items)

      }
      this.drawItems(all);
    },
    initCanvas: function () {
      this.mainCanvas = document.getElementById("preview-canvas");
      this.eyecanvas = document.getElementById("eye-canvas");
      this.bodyCanvas = document.getElementById("body-canvas");
      this.downloadCanvas = document.getElementById("download-canvas");
    },
    saveCanvasImage() {
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', 'Avatar.png');
      var ctx = this.mainCanvas.getContext('2d');
      var downloadCtx = this.downloadCanvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, this.mainCanvas.width, this.mainCanvas.height);
      downloadCtx.putImageData(this.scaleImageData(imageData, 7), -74, -55);
      this.downloadCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
      });

    },
    scaleImageData(imageData, scale) {
      const ctx = this.eyecanvas.getContext("2d");
      var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
      var subLine = ctx.createImageData(scale, 1).data
      for (var row = 0; row < imageData.height; row++) {
        for (var col = 0; col < imageData.width; col++) {
          var sourcePixel = imageData.data.subarray(
              (row * imageData.width + col) * 4,
              (row * imageData.width + col) * 4 + 4
          );
          for (var x = 0; x < scale; x++) subLine.set(sourcePixel, x * 4)
          for (var y = 0; y < scale; y++) {
            var destRow = row * scale + y;
            var destCol = col * scale;
            scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4)
          }
        }
      }

      return scaled;
    },
    blendItems(items) {
      if (!items.length) return null;
      const sample = items[0]
      const {width, height} = sample.image.png;

      const imageData = new ImageData(width, height);
      const pixelLength = items[0].image.png.data.length / 4;
      console.log("items", items)
      console.log("pixelLength", pixelLength)

      const colorMappingCache = new Map()
      // iterate thro px and blend them
      for (let i = 0; i < pixelLength; i++) {
        const stack = []
        const j = i * 4;
        for (const item of items) {
          const data = item.image.png.data;
          if (!colorMappingCache.has(item)) {
            const m = this.convertPaletteToColorMapping(item.palettes)
            colorMappingCache.set(item, m)
          }
          if (data[j + 3] != 0) {
            // const rgba = data.subarray(j, j + 4);
            const rgba = [data[j], data[j + 1], data[j + 2], data[j + 3]]
            const rgb = (rgba[0] << 16) + (rgba[1] << 8) + rgba[2]
            // if palette customized
            const mp = colorMappingCache.get(item);
            if (mp.has(rgb)) {
              const m = mp.get(rgb)
              rgba[0] = m[0]
              rgba[1] = m[1]
              rgba[2] = m[2]
            }
            stack.push(rgba);
          }
        }
        const mix = blendColors(...stack)
        imageData.data[j] = mix[0]
        imageData.data[j + 1] = mix[1]
        imageData.data[j + 2] = mix[2]
        imageData.data[j + 3] = mix[3]
      }
      return imageData
    },
    convertPaletteToColorMapping(palette) {
      const colorMapping = Object.entries(palette).filter(p => p[1] && p[1] != p[0])
      const entries = colorMapping.map(([from, to]) => {
        const key = this.colorHexToRgb(from)
        const v = this.colorHexToRgb(to)
        const r = (v & 0xff0000) >> 16
        const g = (v & 0x00ff00) >> 8
        const b = (v & 0x0000ff)
        const value = [r, g, b]
        return [key, value]
      })

      return new Map(entries)
    },
    colorHexToRgb(hex) {
      return parseInt(hex.slice(1), 16)
    },
    drawItems(all) {
      console.log("draw", all)
      for (let i = 0; i < all.length; i++) {
        const items = all[i];
        if (!this.eyecanvas) return;
        let ctx
        if (i === 0)
          ctx = this.eyecanvas.getContext("2d");
        else
          ctx = this.bodyCanvas.getContext("2d");

        // ctx.imageSmoothingEnabled = false;
        // ctx.clearRect(0, 0, w, h);

        const imageData = this.blendItems(items);

        if (!imageData) return;
        if (i === 0)
          ctx.putImageData(imageData, 0, 0);
        else
          ctx.putImageData(imageData, 0, 0);
      }
      var ctx3 = this.mainCanvas.getContext('2d');
      ctx3.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
      ctx3.drawImage(this.bodyCanvas, 0, 0);
      ctx3.drawImage(this.eyecanvas, 18, 18);
    }
  }
}
</script>

<style scoped>

canvas#preview-canvas {
  height: 25vw;
  width: 25vw;
  image-rendering: pixelated;
}

@media (max-width: 768px) {
  canvas#preview-canvas {
    image-rendering: pixelated;
    height: 90vw;
    width: 90vw;
  }

  .preview {
    flex-direction: column;
    align-items: center;

  }
}

@media (min-width: 769px) {
  .preview {
    flex-direction: column;
  }
}

.preview {
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
