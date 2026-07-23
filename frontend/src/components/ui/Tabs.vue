<script lang="ts" setup>
import {type PropType} from "vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import {useRoute} from "vue-router";

const currentRoute = useRoute();

defineProps({
  routes: {
    type: Object as PropType<{[key: string]: string}>,
    required: true
  }
});
</script>

<template>
  <header>
    <nav>
      <RouterLink v-for="(route, text) in routes" :to="route">
        <SuiButton transform="1.2" :disabled="currentRoute.fullPath.startsWith(route)">{{text}}</SuiButton>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  overflow-y: visible;
  overflow-x: hidden;
  padding: 30px 0;

  nav {
    display: flex;
    margin: 0 40px;
    gap: 40px;

    a {
      flex-grow: 1;

      button {
        width: 100%;
      }
    }
  }
}
</style>