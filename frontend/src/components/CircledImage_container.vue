<script lang="ts">
import { defineComponent } from 'vue';
import CircledImage from "@/components/CircledImage.vue";

export default defineComponent({
  name: "CircledImage_container",
  props: ['imgs_list'],
  components: {CircledImage}
});
</script>

<template>
  <span class="circled_image_container">
    <CircledImage v-for="item in imgs_list" :src="item.src" :note1="item.note1" :note2="item.note2"></CircledImage>
  </span>
</template>

<style>
.circled_image_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 100px;
}
</style>