<template>
  <div>
  <div class="bg pos-full"></div>
  <div class="tile no-antialiasing pos-full"></div>
  <div class="pos-center w-fit h-fit">
    <div class="scale">
      <indexComponent class="double"/>
    </div>
  </div>
  </div>
</template>

<script>
import indexComponent from "~/components/indexComponent";
export default {
  name: 'IndexPage',
  components: {
    indexComponent
  }
}
</script>

<style>
:root{
  color: white;
}
.pos-full{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.pos-center-x{
  position: absolute;
  left: 50%;
  transform: translate-x(-50%);
}
.pos-center-y{
  position: absolute;
  top: 50%;
  transform: translate-y(-50%);
}
.pos-center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.stack-y{
  display: inline-flex;
  align-content: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
}
.stack-x{
  display: inline-flex;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
}
.layer{
  display: inline-grid;
}
.w-fit{
  width: fit-content;
}
.h-fit{
  height: fit-content;
}
.item-align-center {
  align-items: center;
}
.gap-16{
  gap: 16px;
}
.gap-4{
  gap: 4px;
}
.no-antialiasing{
  image-rendering: optimizeSpeed;
  image-rendering: pixelated;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>

<style scoped>
.scale{
  transform: scale(3);
}

.tile{
  background: url('/img/starrybg.png');
  background-repeat: repeat;
  background-size: 600px 300px;
  mix-blend-mode: screen;
  opacity: 0.5;
}
.bg{
  background: #0a110d;
}
</style>
