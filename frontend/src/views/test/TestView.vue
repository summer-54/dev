<script lang="ts" setup>
import {computed} from "vue";
import TermBG from "@/components/termui/TermBG.vue";
import TermSelect from "@/components/termui/TermSelect.vue";
import TermDatetime from "@/components/termui/TermDatetime.vue";
import TermDate from "@/components/termui/TermDate.vue";

const isDark = computed(() => {
  return document.documentElement.classList.contains('dark');
});
</script>

<template>
  <main>
    <TermSelect :options="['test', 'test2']" label="test" optional/>
    <TermPin/>
    <TermInput :min="10" label="test" optional/>
    <TermDatetime label="test" optional :modelValue="new Date"/>
    <TermDate label="test" optional :modelValue="new Date"/>
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