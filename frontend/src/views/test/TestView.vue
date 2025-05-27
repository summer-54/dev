<script lang="ts">
import {defineComponent} from 'vue';
//import PrimevueHeader from "@/views/test/primevue.vue";
import RadixHeader from "@/views/test/radix.vue";
//import Animation from "@/components/ui/animation.vue";
import DeepseekMenu from './DeepseekMenu.vue';
import NewHeader from "@/views/test/NewHeader.vue";

export default defineComponent({
  name: "TestView",
  components: {
    NewHeader: NewHeader,
    /*Animation, PrimevueHeader,*/DeepseekMenu, RadixHeader}
})
</script>

<template>
  <div>
    <RadixHeader/>
    <NewHeader/>
    <!-- <PrimevueHeader/> -->
    <DeepseekMenu/>
    <!--<animation animation="flip">test</animation>-->
  </div>
</template>

<style scoped>

</style>