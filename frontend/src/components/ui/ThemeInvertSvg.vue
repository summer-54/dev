<script lang="ts" setup>
import {useColorMode} from "@vueuse/core";

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

const dark = useColorMode({initialValue: "dark"});
</script>

<template>
<img :src="src" :alt="alt" :class="{[$style.invert]: dark === (inverted ? 'dark' : 'light')}"/>
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