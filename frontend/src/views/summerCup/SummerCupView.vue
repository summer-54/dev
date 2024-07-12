<script lang="ts">
import {defineComponent} from "vue";
import Subtitle from "@/components/Subtitle.vue";
import QA_container from "@/components/QA_container.vue";
import Title from "@/components/Title.vue";
import {VueLatex} from "vatex";
import Tex from "@/components/ui/tex.vue";
import SolutionContainer from "./SolutionContainer.vue";

export default defineComponent({
  name: "SummerCupView",
  components: {Tex, Subtitle, QA_container, Title, VueLatex, SolutionContainer},
  data() {
    return {
      qa_list: [
        {q: "В каком формате проходит кубок?", a: "Кубок проходит в формате еженедельных контестов."},
        {q: "В каком формате проходит тур?", a: "С утра субботы до 7:00 четверга можно написать 5-часовое виртуальное участие. В четверг в 12:00 выкладывается разбор. Дорешивать задачи можно до начала раунда через один (т.е. 9 дней после разбора)."}
      ],
      solutions: [
        [
          {num:  1, href: "https://youtu.be/kSqRWlDEJHo?feature=shared"},
          {num:  2, href: "https://youtu.be/Enuq2_ftRnk?feature=shared"},
          {num:  3, href: "https://youtu.be/xd7ybW3XkpQ?feature=shared"},
          {num:  4, href: "https://youtu.be/8wHtb8fsXvU?feature=shared"},
          {num:  5, href: "https://youtu.be/r8AFfgb8bvY?feature=shared"},
          {num:  6, href: "https://youtu.be/f7-pjyDR3OE?feature=shared"},
          {num:  7, href: "https://youtu.be/kVicb6GQB8o?feature=shared"},
          {num:  8, href: "https://youtu.be/FI9UPkaPPWc?feature=shared"},
          {num:  9, href: "https://youtu.be/AqIf9P7YT8k?feature=shared"},
          {num: 10, href: "https://youtu.be/2Zy77NRHSMk?feature=shared"}
        ],
        [
          {num: 1, href: "https://youtu.be/2Zy77NRHSMk?feature=shared"},
          {num: 2, href: "https://youtu.be/gg-MsmrzUaY?feature=shared"},
          {num: 3, href: "https://youtu.be/eXphcfz4AzI?feature=shared"},
          {num: 4, href: "https://youtu.be/hMGGmTd5de8?feature=shared"}
        ]
      ],
      text: "Один тур оценивается в 90 баллов, общий балл за кубок — сумма баллов за все туры, кроме 2 худших. 30 баллов выставляется за место в виртуальном участии (за 1 место - 30, 2 - 28, 3 - 26, 4 - 24, 5 - 22, 6 - 20, 7 - 19, 8 - 18 и т.д.), но не решившие ни одной задачи не получают баллов за место. Оставшиеся 60 баллов участник получает за задачи. За каждую задачу, сданную до разбора, участник получает $\\frac{60}{n}$ баллов, а после разбора — $\\frac{30}{n}$ баллов, где $n$ - количество задач."
    }
  },
  mounted: function(){
    for(let i = 0; i < this.solutions.length; i++){
      this.solutions[i].reverse();
    }
  }
})
</script>

<template>
  <main>
    <Title text="Летний кубок по программированию"/>
    <QA_container :qa_list="qa_list"></QA_container>
    <Subtitle style="text-align: center;" text="Система оценивания"/>
    <tex class="plain_text" :text="text"/>
    <Subtitle text="II ЛКП"/>
    <SolutionContainer :solutions="solutions[1]"/>
    <Subtitle text="I ЛКП"/>
    <SolutionContainer :solutions="solutions[0]"/>
  </main>
</template>

<style scoped>
.plain_text {
  text-align: justify;
  margin: 0 40px;

  @media (max-width: 530px) {
    margin: 0 20px;
  }
}
h2 {
  text-align: center;
}
</style>