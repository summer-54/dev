<script lang="ts" setup>
//import PrimevueHeader from "@/views/test/primevue.vue";
import RadixHeader from "@/views/test/radix.vue";
//import Animation from "@/components/ui/animation.vue";
import DeepseekMenu from './DeepseekMenu.vue';
import NewHeader from "@/views/test/NewHeader.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
</script>

<template>
  <div>
<!--    <RadixHeader/>-->
<!--    <NewHeader/>-->
    <!-- <PrimevueHeader/> -->
<!--    <DeepseekMenu/>-->
    <!--<animation animation="flip">test</animation>-->
    <TermWindow class="window">
      <template #header>
        test
      </template>

      <TermInput label="root@inf54:~# username:" placeholder="Имя пользователя"/>
      <TermButton>testtest</TermButton>
    </TermWindow>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.window {
  //min-width: 800px;
}
</style>