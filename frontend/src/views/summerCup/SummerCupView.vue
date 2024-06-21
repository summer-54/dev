<script lang="ts">
import {defineComponent} from "vue";
import Subtitle from "@/components/Subtitle.vue";
import QA_container from "@/components/QA_container.vue";
import Title from "@/components/Title.vue";

export default defineComponent({
  name: "SummerCupView",
  components: {Subtitle, QA_container, Title},
  data() {
    return {
      qa_list: [
        {q: "В каком формате проходит кубок?", a: "Кубок проходит в формате еженедельных контестов."},
        {q: "В каком формате проходит тур?", a: "С утра субботы до 7:00 четверга можно написать 5-часовое виртуальное участие. В четверг в 12:00 выкладывается разбор. Дорешивать задачи можно до начала раунда через один (т.е. 9 дней после разбора)."}
      ]
    }
  },
  mounted(){
    MathJax.typeset();
  }
})
</script>

<template>
  <main>
    <Title text="Летний кубок по программированию"></Title>
    <QA_container :qa_list="qa_list"></QA_container>
    <Subtitle style="text-align: center;" text="Система оценивания"></Subtitle>
    <span class="plain_text">Один тур оценивается в 90 баллов, общий балл за кубок &#151; сумма баллов за все туры, кроме 2 худших. 30 баллов выставляется за место в виртуальном участии (за 1 место - 30, 2 - 28, 3 - 26, 4 - 24, 5 - 22, 6 - 20, 7 - 19, 8 - 18 и т.д.), но не решившие ни одной задачи не получают баллов за место. Оставшиеся 60 баллов участник получает за задачи. За каждую задачу, сданную до разбора, участник получает \(\frac{60}{n}\) баллов, а после разбора &#151; \(\frac{30}{n}\) баллов, где n - количество задач.</span>
  </main>
</template>

<style scoped>
.plain_text {
  text-align: justify;
  font-family: "LXGW WenKai Mono TC", monospace;
  font-size: 24px;
  margin-left: 20px;
}
</style>