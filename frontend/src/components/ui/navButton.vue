<script lang="ts" setup>
import IconButton from "@/components/ui/iconButton.vue";
import {ROUTER_PATH_PREFIX} from "@/serverConfig.js";

defineProps({
  icon: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  noText: {
    type: Boolean,
    default: false
  },
  notInvert: {
    type: Boolean,
    default: false
  },
  alt: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <RouterLink :to="ROUTER_PATH_PREFIX + to">
    <IconButton :icon="icon" :noText="noText" :notInvert :alt="alt"><slot/></IconButton>
  </RouterLink>
</template>

<style scoped>
a button {
  width: 100%;
}
</style>