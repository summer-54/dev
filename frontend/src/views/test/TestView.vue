<script lang="ts">
import {defineComponent} from 'vue';
import PrimevueHeader from "@/views/test/primevue.vue";

export default defineComponent({
  name: "TestView",
  components: {PrimevueHeader}
})
</script>

<template>
<!--  <RadixHeader/>-->
  <PrimevueHeader/>
</template>