<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";

export default defineComponent({
  name: "iconButton",
  components: {ThemeInvertSvg, SuiButton},
  props: {
    icon: {
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
  }
})
</script>

<template>
  <SuiButton :class="{[$style.button]: true, [$style.noText]: noText}" border="#9297FB">
    <img :src="icon" :alt="alt" v-if="notInvert">
    <ThemeInvertSvg :src="icon" :alt="icon" v-else/>
    <div v-if="!noText"><slot/></div>
  </SuiButton>
</template>

<style scoped>
button {
  cursor: pointer;
}

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

.noText {
  padding: 5px !important;
}
</style>