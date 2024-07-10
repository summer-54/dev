<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"

export default defineComponent({
  name: "iconButton",
  components: {SuiButton},
  props: {
    icon: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <SuiButton :class="$style.button" border="#9297FB">
    <img :src="icon" :alt="icon">
    <div><slot/></div>
  </SuiButton>
</template>

<style scoped>
div {
  font-family: "Tiny5", sans-serif;
  font-size: 16px;
}
</style>

<style module>
.button * {
  @media (max-width: 688px) and (min-width: 626px) {
    font-size: 12px !important;
  }

  @media (max-width: 425px) {
    font-size: 12px !important;
  }

  font-family: "Tiny5", sans-serif !important;
}
</style>