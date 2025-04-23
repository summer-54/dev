<script lang="ts">
import {defineComponent} from 'vue';
import PrimevueHeader from "@/views/test/primevue.vue";
import RadixHeader from "@/views/test/radix.vue";
import Animation from "@/components/ui/animation.vue";

export default defineComponent({
  name: "TestView",
  components: {Animation, RadixHeader, PrimevueHeader}
})
</script>

<template>
  <div>
    <RadixHeader/>
    <PrimevueHeader/>
    <animation animation="flip">test</animation>
  </div>
</template>

<style scoped>

</style>