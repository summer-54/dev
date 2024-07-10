<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue"
import NavButton from "@/components/ui/navButton.vue";

export default defineComponent({
  name: "TestView",
  components: {NavButton}
})
</script>

<template>
  <NavButton icon="clock" to="/test"/>
</template>

<style scoped>

</style>