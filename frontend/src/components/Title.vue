<template>
  <h1>{{ text }}</h1>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Title",
  props: ['text']
});
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: "LXGW WenKai Mono TC", monospace;
  margin-left: 8px;
  margin-right: 8px;
}
</style>