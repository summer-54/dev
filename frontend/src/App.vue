<script lang="ts">
import {RouterView} from 'vue-router';
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import Header from '@/components/Header.vue';
export default {
  components: {Header, RouterView},
  computed: {
    color() {return this.$theme.color}
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

* {
  color: v-bind(color);
}
</style>