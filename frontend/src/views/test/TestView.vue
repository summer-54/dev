<script lang="ts" setup>
//import PrimevueHeader from "@/views/test/primevue.vue";
import RadixHeader from "@/views/test/radix.vue";
//import Animation from "@/components/ui/animation.vue";
import DeepseekMenu from './DeepseekMenu.vue';
import NewHeader from "@/views/test/NewHeader.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
</script>

<template>
  <div>
<!--    <RadixHeader/>-->
<!--    <NewHeader/>-->
    <!-- <PrimevueHeader/> -->
<!--    <DeepseekMenu/>-->
    <!--<animation animation="flip">test</animation>-->
    <TermInput label="root@inf54:~# username:" placeholder="Имя пользователя"/>
    <TermButton>testtest</TermButton>
  </div>
</template>

<style scoped>

</style>