<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"

export default defineComponent({
  name: "navButton",
  components: {SuiButton},
  props: {
    icon: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <RouterLink :to="to">
    <SuiButton :class="$style.button" border="#9297FB">
      <img :src="icon" :alt="icon">
      <div><slot/></div>
    </SuiButton>
  </RouterLink>
</template>

<style scoped>
div {
  font-family: "Tiny5", sans-serif;
  font-size: 16px;
}

button {
}
</style>

<style module>
.button * {
  @media (max-width: 688px) and (min-width: 626px) {
    font-size: 12px !important;
    //padding: 10px !important;
  }

  @media (max-width: 425px) {
    font-size: 12px !important;
  }

  font-family: "Tiny5", sans-serif !important;
}
</style>