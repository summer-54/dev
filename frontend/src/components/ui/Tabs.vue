<script lang="ts">
import {defineComponent, type PropType} from "vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";

export default defineComponent({
  name: "Tabs",
  components: {SuiButton},
  props: {
    routes: {
      type: Object as PropType<{[key: string]: string}>,
      required: true
    }
  },
  computed: {
    currentRoute(): string {
      return Object(this.$router).currentRoute.value.path;
    }
  }
})
</script>

<template>
  <header>
    <nav>
      <RouterLink v-for="(route, text) in routes" :to="route">
        <SuiButton transform="1.2" :disabled="currentRoute.startsWith(route)">{{text}}</SuiButton>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  overflow-y: visible;
  overflow-x: hidden;
  padding: 10px 0;

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