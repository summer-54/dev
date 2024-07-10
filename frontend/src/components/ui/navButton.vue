<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import IconButton from "@/components/ui/iconButton.vue";

export default defineComponent({
  name: "navButton",
  components: {IconButton, SuiButton},
  props: {
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
    }
  }
})
</script>

<template>
  <RouterLink :to="to">
    <IconButton :icon="icon" :noText="noText" :notInvert><slot/></IconButton>
  </RouterLink>
</template>