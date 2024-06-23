<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "CircledImage",
  props: {
    src: {
      type: String,
      required: true
    },
    note1: {
      type: String,
      required: true
    },
    note2: String
  }
});
</script>

<template>
  <span class="image_with_note">
    <img :src="src" class="circled_image" alt="image">
    <span class="note1">{{ note1 }}</span>
    <span class="note2">{{ note2 }}</span>
  </span>
</template>
<style scoped>
.circled_image {
  border-radius: 1000px;
  @media (min-width: 1274px){
    width: 275px;
  }
  @media (min-width: 1054px) and (max-width: 1274px){
    width: 230px;
  }
  @media (min-width: 854px) and (max-width: 1054px){
    width: 180px;
  }
  @media (min-width: 654px) and (max-width: 854px){
    width: 130px;
  }
  @media (max-width: 654px){
    width: 70px;
  }
}
.image_with_note {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
  font-family: "LXGW WenKai Mono TC", monospace;

  @media (min-width: 940px){
    font-size: 18px;
  }

  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 12px;
  }
}
.note1 {
  font-weight: bold;
  font-family: "LXGW WenKai Mono TC", monospace;
  text-align: center;
}
.note2 {
  text-align: justify;
}
</style>