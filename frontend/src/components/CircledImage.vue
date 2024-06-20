<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "CircledImage",
  props: ['src', 'note1', 'note2', 'width_']
});
</script>

<template>
  <span class="image_with_note">
    <img :src="src" class="circled_image">
    <span class="note1">{{ note1 }}</span>
    <span class="note2">{{ note2 }}</span>
  </span>
</template>
<style scoped>
.circled_image {
  border-radius: 1000px;
  @media (min-width: 1200px){
    width: 275px;
  }
  @media (min-width: 1000px) and (max-width: 1200px){
    width: 230px;
  }
  @media (min-width: 800px) and (max-width: 1000px){
    width: 180px;
  }
  @media (min-width: 600px) and (max-width: 800px){
    width: 130px;
  }
  @media (max-width: 600px){
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