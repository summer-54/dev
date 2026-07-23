<template>
  <div>
    <Animation class="qa_container" v-for="({q, a}, index) in qa_list" animation="fadeRight" :delay="index * 100">
      <TermWindow class="inner">
        <template #header>
          <span class="question">{{q}}</span>
        </template>
        <span class="answer" v-html="a"></span>
      </TermWindow>
    </Animation>
  </div>
</template>

<script lang="ts" setup>
import Animation from "@/components/ui/animation.vue";
import TermWindow from "@/components/termui/TermWindow.vue";

const props = defineProps({
  qa_list: {
    type: Array<{q: string, a: string}>,
    required: true
  }
});
</script>

<style scoped>
.answer {
  font-family: "PT Mono", monospace;
  font-size: 24px;
  width: 100%;

  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 20px;
  }

  @media (max-width: 530px) {
    font-size: 16px;
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

  .qa_container {
    flex-basis: 350px;
    flex-grow: 1;

    h2 {
      text-align: center;
    }

    .inner {
      width: 100%;
      height: 100%;
    }
  }
}
</style>