<script lang="ts" setup>
import {RouterView} from 'vue-router';
import {routerPending} from "@/router.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import Header from "@/Header.vue";
</script>

<template>
  <Header class="header"/>
  <RouterView v-slot="{Component}">
    <Transition name="fade" mode="out-in">
      <Component :is="Component"/>
    </Transition>
  </RouterView>
  <ProgressIndicator v-if="routerPending"/>
</template>

<style scoped>

</style>

<style>
html {
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

* {
  font-family: "PT Mono", monospace;
  color: black;
}

.dark {
  body {
    background: rgb(18, 18, 18);
  }

  * {
    color: white;
  }
}

#app {
  height: 100%;
  padding-bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@font-face {
  font-family: 'ShoptronicSP';
  src: url('@/assets/fonts/ShoptronicSP Basic.otf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PT Mono';
  src: url('@/assets/fonts/PTM55FT.ttf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>