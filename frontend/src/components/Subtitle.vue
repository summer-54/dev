<template>
  <h2>{{ text }}</h2>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Subtitle",
  props: ['text']
});
</script>

<style scoped>
h2 {
  font-family: "LXGW WenKai Mono TC", monospace;
  font-size: 28px;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 18px;
  }

  @media (max-width: 530px) {
    font-size: 15px;
  }
}
</style>