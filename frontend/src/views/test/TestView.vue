<script lang="ts">
import {defineComponent} from 'vue';
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue";
import {VueSpinnerGrid} from "vue3-spinners";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "TestView",
  components: {ProgressIndicator, VueSpinnerGrid, SuiFileInput}
})
</script>

<template>
  <div>
    <ProgressIndicator/>
  </div>
</template>

<style scoped>

</style>