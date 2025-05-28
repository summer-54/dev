<script lang="ts">
import {RouterView} from 'vue-router';
import Header from '@/components/Header.vue';
import {defineComponent} from "vue";
import {routerPending} from "@/router.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import {themeName} from "@/utils.js";

export default defineComponent({
  components: {ProgressIndicator, Header, RouterView},
  computed: {
    color() {
      return this.$theme.color
    },
    routerPending() {
      return routerPending.value;
    }
  },
  watch: {
    $themeName() {
      themeName.value = this.$themeName as "light" | "dark";
    }
  },
  mounted() {
    themeName.value = this.$themeName as "light" | "dark";
  }
})
</script>

<template>
  <Header/>
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
  color: v-bind(color);
}

#app {
  height: 100%;
  padding-bottom: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>