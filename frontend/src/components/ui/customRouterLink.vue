<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";

export default defineComponent({
  name: "CustomRouterLink",
  components: {SuiButton},
  props: {
    to: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <RouterLink :to="to"><SuiButton><slot/></SuiButton></RouterLink>
</template>