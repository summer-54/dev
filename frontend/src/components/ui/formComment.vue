<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "formComment",
  props: {
    color: {
      type: String,
      default: "#e04900"
    }
  }
})
</script>

<template>
<span><slot/></span>
</template>

<style scoped>
span {
  color: v-bind(color);
  margin-left: 20px;
  font-size: 18px;
}
</style>