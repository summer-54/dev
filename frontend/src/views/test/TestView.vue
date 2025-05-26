<script lang="ts">
import {defineComponent} from 'vue';
//import PrimevueHeader from "@/views/test/primevue.vue";
//import RadixHeader from "@/views/test/radix.vue";
//import Animation from "@/components/ui/animation.vue";
import DeepseekMenu from './DeepseekMenu.vue';

export default defineComponent({
  name: "TestView",
  components: {/*Animation, RadixHeader, PrimevueHeader,*/DeepseekMenu}
})
</script>

<template>
  <div>
    <!-- <RadixHeader/>-->
    <!-- <PrimevueHeader/> -->
    <DeepseekMenu/>
    <!--<animation animation="flip">test</animation>-->
  </div>
</template>

<style scoped>

</style>