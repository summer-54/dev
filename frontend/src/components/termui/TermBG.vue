<script setup lang="ts">

</script>

<template>
  <div class="site-bg" aria-hidden="true">
    <div class="site-aurora aurora-1"/>
    <div class="site-aurora aurora-2"/>
    <div class="site-grid"/>
  </div>
</template>

<style scoped>
.site-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.site-aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: .5;
}

.site-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(oklch(0 0 0 / 0.04) 1px,transparent 1px),linear-gradient(90deg, oklch(0 0 0 / 0.04) 1px,transparent 1px);
  background-size: 46px 46px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 30%,#000 20%,transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 30%,#000 20%,transparent 80%);
}

:global(.dark) {
  .site-grid {
    background-image: linear-gradient(oklch(1 0 0 / .022) 1px,transparent 1px),linear-gradient(90deg,oklch(1 0 0 / .022) 1px,transparent 1px);
  }

  .aurora-1 {
    width: 62vw;
    height: 62vw;
    max-width: 760px;
    max-height: 760px;
    background: radial-gradient(circle,oklch(.55 .19 155 / .55),transparent 68%);
    top: -20vh;
    right: -12vw;
    animation: drift1-500a95e1 28s ease-in-out infinite;
  }

  .aurora-2 {
    width: 50vw;
    height: 50vw;
    max-width: 600px;
    max-height: 600px;
    background: radial-gradient(circle,oklch(.5 .15 200 / .4),transparent 68%);
    bottom: -18vh;
    left: -12vw;
    animation: drift2-500a95e1 34s ease-in-out infinite;
  }
}
</style>