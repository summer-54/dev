<template>
  <h2>{{ text }}</h2>
</template>

<script lang="ts" setup>
const props = defineProps(["text"]);
</script>

<style scoped>
h2 {
  font-size: 28px;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 24px;
  }

  @media (max-width: 530px) {
    font-size: 20px;
  }
}
</style>