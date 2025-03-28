<script lang="ts">
import {defineComponent} from 'vue';
import Animation from "@/components/ui/animation.vue";

export default defineComponent({
  name: "CircledImage",
  components: {Animation},
  props: {
    src: {
      type: String,
      required: true
    },
    note1: {
      type: String,
      required: true
    },
    note2: String,
    delay: {
      type: Number,
      required: true
    }
  }
});
</script>

<template>
  <animation animation="flip" :delay="delay">
    <span class="image_with_note">
      <img :src="src" class="circled_image" alt="image">
      <span class="note1">{{ note1 }}</span>
      <span class="note2">{{ note2 }}</span>
    </span>
  </animation>
</template>
<style scoped>
.circled_image {
  border-radius: 1000px;
  @media (min-width: 1288px){
    width: 275px;
  }
  @media (min-width: 1105px) and (max-width: 1288px){
    width: 230px;
  }
  @media (min-width: 902px) and (max-width: 1105px){
    width: 180px;
  }
  @media (min-width: 702px) and (max-width: 902px){
    width: 130px;
  }
  @media (max-width: 702px){
    width: 50vw;
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

.note1, .note2 {
  @media (min-width: 1288px){
    max-width: 21vw;
  }

  @media (min-width: 1105px) and (max-width: 1288px){
    max-width: 232px;
  }

  @media (min-width: 902px) and (max-width: 1105px){
    max-width: 182px;
  }

  @media (min-width: 702px) and (max-width: 902px){
    max-width: 132px;
  }

  @media (max-width: 702px){
    max-width: 60vw;
  }
  margin-bottom: 30px;
}
</style>