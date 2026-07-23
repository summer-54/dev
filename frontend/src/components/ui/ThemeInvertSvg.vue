<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  inverted: {
    type: Boolean,
    required: false
  }
});
</script>

<template>
<img :src="src" :alt="alt" :class="{[$style.invert]: $themeName === (inverted ? 'dark' : 'light')}"/>
</template>

<style module>
.invert {
  filter: invert(1);
}
</style>

<style scoped>
img {
  transition: filter .5s ease;
}
</style>