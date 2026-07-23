<script lang="ts">
import {defineComponent} from 'vue'
import {VueLatex} from "vatex";

export default defineComponent({
  name: "tex",
  components: {VueLatex},
  props: {
    text: {
      type: String,
      required: true
    },
    fontSize: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    data() {
      return this.text.split("$");
    },
    fontsize() {
      return (this.fontSize ?? (window.matchMedia("(max-width: 530px)").matches ? 14 : window.matchMedia("(max-width: 940px)").matches ? 16 : 24)) + "px";
    }
  }
})
</script>

<template>
<div>
  <template v-for="(elem, index) in data">
    <VueLatex v-if="index % 2" :expression="elem" :fontsize="fontSize"/>
    <template v-else>{{elem}}</template>
  </template>
</div>
</template>

<style scoped>
* {
  font-size: v-bind(fontsize);
}
</style>