<script lang="ts" setup>
import {computed} from 'vue'
import {VueLatex} from "vatex";

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  fontSize: {
    type: Number,
    default: undefined
  }
});

const data = computed(() => props.text.split("$"));
const fontsize = computed(() => {
  return (props.fontSize ?? (window.matchMedia("(max-width: 530px)").matches ? 14 : window.matchMedia("(max-width: 940px)").matches ? 16 : 24)) + "px";
});
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