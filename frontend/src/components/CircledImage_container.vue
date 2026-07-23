<script lang="ts" setup>
import CircledImage from "@/components/CircledImage.vue";

const props = defineProps({
  imgs_list: {
    type: Array<{src: string, note1: string, note2?: string}>,
    required: true
  }
})
</script>

<template>
  <span class="circled_image_container">
    <CircledImage v-for="(item, index) in imgs_list" :src="item.src" :note1="item.note1" :note2="item.note2" :delay="index*200"/>
  </span>
</template>

<style>
.circled_image_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>