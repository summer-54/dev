<template>
  <h1>{{ text }}</h1>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Title",
  props: ['text'],
  computed: {
    color() {
      return this.$theme.color;
    }
  }
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 40px;
  color: v-bind(color);
}
</style>