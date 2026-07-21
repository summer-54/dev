<script lang="ts">
import {RouterView} from 'vue-router';
import {defineComponent} from "vue";
import {routerPending} from "@/router.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import {themeName} from "@/utils.js";
import Header from "@/Header.vue";

export default defineComponent({
  components: {Header, ProgressIndicator, RouterView},
  computed: {
    color() {
      return this.$theme.color
    },
    routerPending() {
      return routerPending.value;
    },
    theme() {return this.$themeName}
  },
  watch: {
    $themeName() {
      themeName.value = this.$themeName as "light" | "dark";
      // PrimeVue.changeTheme(this.$themeName);
      // this.$primevue.changeTheme(
      //     `lara-${this.$themeName}-blue`
      // );
      if (this.$themeName === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  },
  mounted() {
    themeName.value = this.$themeName as "light" | "dark";
    if (this.$themeName === "dark") document.documentElement.classList.add("dark");
  }
})
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
  color-scheme: v-bind(theme);
}

* {
  color: v-bind(color);
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
  src: url('./assets/ShoptronicSP Basic.otf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>