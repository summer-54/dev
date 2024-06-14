<script setup lang="ts">
import {RouterView} from 'vue-router';
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import Header from './components/Header.vue';
export default {
  components: {
    Header
  }
}
</script>

<template>
  <Header></Header>
  <RouterView/>
  <!--<SuiButton>test</SuiButton>-->
</template>

<style scoped>

</style>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>