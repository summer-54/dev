<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true
  }
});
</script>

<template>
  <a v-if="to.startsWith('http')" :href="to"><slot/></a>
  <RouterLink v-else :to="to"><slot/></RouterLink>
</template>

<style scoped>
* {
  text-decoration: none;
}
</style>