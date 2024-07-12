<template>
  <div>
    <span class="qa_container" v-for="{q, a} in qa_list">
      <Subtitle :text="q" class="subtitle"></Subtitle>
      <span class="answer">{{ a }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Subtitle from "@/components/Subtitle.vue";

export default defineComponent({
  name: "QA_container",
  components: {Subtitle},
  props: {
    qa_list: {
      type: Array<{q: string, a: string}>,
      required: true
    }
  }
});
</script>

<style scoped>
.answer {
  font-family: "LXGW WenKai Mono TC", monospace;
  font-size: 24px;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 14px;
  }
}

div {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  padding: 0 40px;

  @media (max-width: 530px) {
    padding: 0 20px;
  }

  span {
    flex-basis: 350px;
    flex-grow: 1;
    text-align: justify;

    h2 {
      text-align: center;
    }
  }
}
</style>