<script lang="ts" setup>
import {VueSpinnerGrid} from "vue3-spinners";
</script>

<template>
  <VueSpinnerGrid :size="64"/>
</template>

<style scoped>
svg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>