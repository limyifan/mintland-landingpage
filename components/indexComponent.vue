<template>
  <div class="stack-y item-align-center gap-16">
    <!-- cover -->
    <div class="cover">
      <!-- planet -->
      <img class="no-antialiasing w-fit h-fit pos-center shade" src="/img/land.gif"/>
      <!-- logo -->
      <img class="no-antialiasing w-fit h-fit pos-center" src="/img/logo.png" alt="mintland"/>
    </div>
    <div class="stack-y gap-4 f-title">
      <span class="glitch" title="The portal">The portal</span>
      <span class="glitch" title="is about to open">is about to open</span>
    </div>
    <div class="stack-y gap-4">
      <a class="button stack-x gap-4 item-align-center" href="https://twitter.com/mintlandmoe" target="_blank">
        <img class="no-antialiasing w-fit h-fit" src="/img/social/tw.png"/>
        <span class="f-label">Twitter</span>
      </a>
      <a class="button stack-x gap-4 item-align-center" href="https://discord.gg/D6Af6TUW3v" target="_blank">
        <img class="no-antialiasing w-fit h-fit" src="/img/social/dc.png"/>
        <div class="f-label">Discord</div>
      </a>
      <a class="button stack-x gap-4 item-align-center" href="https://opensea.io/mintland" target="_blank">
        <img class="no-antialiasing w-fit h-fit" src="/img/social/os.png"/>
        <div class="f-label">Opensea</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="css">
a{
  text-decoration: none;
  color: white;
}
.cover{
  width: 50px;
  height: 50px;
  position: relative;
}
.f-title{
  font-family: 'Silkscreen', cursive;
  font-size: 8px;
  font-weight: 400;
  line-height: 8px;
  letter-spacing: 0em;
  text-align: center;
  color: #00FF00;
}
.f-label{
  /* font-family: PICO-8 mono, 'Silkscreen', cursive; */
  font-family: 'Silkscreen', cursive;
  font-size: 6px;
  /* font-weight: 400; */
  line-height: 8px;
  letter-spacing: 0em;
  text-align: center;
}

.button{
  padding: 6px 8px;
  background: hsla(151, 5%, 20%, 1);
}
.button:hover{
  /* background: hsla(151, 8%, 13%, 1); */
  background: #3f4;
  transition: 0.5s;
  color:#000;
  cursor: pointer;
}
.shade{
  filter: brightness(0.75);
}

@keyframes glitchTop{
  0.5%{
    transform: translate(4px,0px);
  }
  1%{
    transform: translate(-0.5px,0px);
  }
  49.5%{
    transform: translate(-0.5px,0px);
  }
  50%{
    transform: translate(2px,0px) skew(-6deg);
  }
  50.5%{
    transform: translate(-0.5px,0px);
  }
  51%{
    transform: translate(6px,0px) skew(-12deg);
  }
  51.5%{
    transform: translate(-0.5px,0px);
  }
}

@keyframes glitchBotom{
  0.5%{
    transform: translate(-2px,0px);
  }
  1%{
    transform: translate(0.5px,0px);
  }
  49.5%{
    transform: translate(0.5px,0px);
  }
  50%{
    transform: translate(-4px,0px) skew(6deg);
  }
  50.5%{
    transform: translate(0.5px,0px);
  }
  51%{
    transform: translate(-6px,0px) skew(12deg);
  }
  51.5%{
    transform: translate(0.5px,0px);
  }
}


.glitch::before, .glitch::after {
  content: attr(title);
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
}
.glitch::before {
  color: #FF0000;
  transform: translate(-0.5px,0px);
  mix-blend-mode: screen;
  animation-name: glitchTop;
  animation-duration: 12s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: reverse-alternate;
}
.glitch::after {
  color: #0000FF;
  transform: translate(0.5px,0px);
  mix-blend-mode: screen;
  animation-name: glitchBotom;
  animation-duration: 12s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: reverse-alternate;
}

</style>

