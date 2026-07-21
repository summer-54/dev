<script lang="ts" setup>
import {computed} from "vue";
import TermBG from "@/components/termui/TermBG.vue";

const isDark = computed(() => {
  return document.documentElement.classList.contains('dark');
});
</script>

<template>
  <main>
    <TermBG/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0 20px;
  gap: 20px;
}
</style>