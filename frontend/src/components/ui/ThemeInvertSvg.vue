<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ThemeInvertSvg",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
<img :src="src" :alt="alt" :class="{[$style.invert]: $themeName === 'light'}"/>
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