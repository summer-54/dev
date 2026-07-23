<script lang="ts" setup>
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";

defineProps({
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
});
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
  position: relative;

  @media (hover: hover) {
    &:hover {
      z-index: 100;
    }
  }
}

div {
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
}

.noText {
  padding: 5px !important;
}
</style>