<template>
  <span class="qa_container">
  <QA v-for="item in qa_list" :question="item.q" :answer="item.a"></QA>
  </span>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import QA from '@/components/QA.vue'

export default defineComponent({
  name: "QA_container",
  props: ['qa_list'],
  components: {QA}
});
</script>

<style>
.qa {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  width: 30%;
}
.answer {
  font-family: "LXGW WenKai Mono TC", monospace;
  font-size: 24px;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 12px;
  }
}
</style>