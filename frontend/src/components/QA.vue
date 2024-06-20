<template>
  <span class="qa">
  <Subtitle :text="question" class="subtitle"></Subtitle>
  <span class="answer">{{ answer }}</span>
  </span>
</template>

<script>
import {defineComponent} from "vue";
import Subtitle from "@/components/Subtitle.vue";

export default defineComponent({
  name: "QA",
  components: {Subtitle},
  props: ['question', 'answer']
});
</script>

<style scoped>
.qa {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  @media (min-width: 1200px){
    width: 30%;
  }
  @media (min-width: 600px) and (max-width: 1200px){
    width: 45%;
  }
  @media (max-width: 600px){
    width: 90%;
  }
}
.subtitle {
  text-align: justify;
}
.answer {
  font-family: "LXGW WenKai Mono TC", monospace;
  font-size: 24px;
  text-align: justify;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 12px;
  }
}
</style>