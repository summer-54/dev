<script lang="ts">
import {defineComponent} from "vue";
import Subtitle from "@/components/Subtitle.vue";
import QA_container from "@/components/QA_container.vue";
import Title from "@/components/Title.vue";
import {VueLatex} from "vatex";
import Tex from "@/components/ui/tex.vue";
import SolutionContainer from "./SolutionContainer.vue";
import Tabs from "@/components/ui/Tabs.vue";

export default defineComponent({
  name: "SummerCupView",
  components: {Tabs, Tex, Subtitle, QA_container, Title, VueLatex, SolutionContainer},
  data() {
    return {
      qa_list: [
        {q: "В каком формате проходит кубок?", a: "Кубок проходит в формате еженедельных контестов."},
        {q: "В каком формате проходит тур?", a: "С утра субботы до 7:00 четверга можно написать 5-часовое виртуальное участие. В четверг в 12:00 выкладывается разбор. Дорешивать задачи можно до начала раунда через один (т.е. 9 дней после разбора)."}
      ],
      // UPD: href is now link to page of this tour, not to solutions!!!
      solutions: [
        [
          {num:  1, href: undefined, tasks_amount: undefined, date: undefined, solution: "kSqRWlDEJHo"},
          {num:  2, href: undefined, tasks_amount: undefined, date: undefined, solution: "Enuq2_ftRnk"},
          {num:  3, href: undefined, tasks_amount: undefined, date: undefined, solution: "xd7ybW3XkpQ"},
          {num:  4, href: undefined, tasks_amount: undefined, date: undefined, solution: "8wHtb8fsXvU"},
          {num:  5, href: undefined, tasks_amount: undefined, date: undefined, solution: "r8AFfgb8bvY"},
          {num:  6, href: undefined, tasks_amount: undefined, date: undefined, solution: "f7-pjyDR3OE"},
          {num:  7, href: undefined, tasks_amount: undefined, date: undefined, solution: "kVicb6GQB8o"},
          {num:  8, href: undefined, tasks_amount: undefined, date: undefined, solution: "FI9UPkaPPWc"},
          {num:  9, href: undefined, tasks_amount: undefined, date: undefined, solution: "AqIf9P7YT8k"},
          {num: 10, href: undefined, tasks_amount: undefined, date: undefined, solution: "2Zy77NRHSMk"}
        ],
        [
          {num:  1, href: undefined, tasks_amount: 11, date: "01.06.2024—14.06.2024", solution: "mCj1RIXx_qw"},
          {num:  2, href: undefined, tasks_amount:  9, date: "08.06.2024—21.06.2024", solution: "gg-MsmrzUaY"},
          {num:  3, href: undefined, tasks_amount:  8, date: "15.06.2024—28.06.2024", solution: "eXphcfz4AzI"},
          {num:  4, href: undefined, tasks_amount: 11, date: "21.06.2024—06.07.2024", solution: "hMGGmTd5de8"},
          {num:  5, href: undefined, tasks_amount:  9, date: "26.06.2024—19.07.2024", solution: "6z9clGg8s7E"},
          {num:  6, href: undefined, tasks_amount:  9, date: "06.07.2024—19.07.2024", solution: "GXFJrkMJrRw"},
          {num:  7, href: undefined, tasks_amount: 11, date: "14.07.2024—27.07.2024", solution: "jvEdVcos6Ms"}
        ]
      ],
      text: "Один тур оценивается в 90 баллов, общий балл за кубок — сумма баллов за все туры, кроме 2 худших. 30 баллов выставляется за место в виртуальном участии (за 1 место - 30, 2 - 28, 3 - 26, 4 - 24, 5 - 22, 6 - 20, 7 - 19, 8 - 18 и т.д.), но не решившие ни одной задачи не получают баллов за место. Оставшиеся 60 баллов участник получает за задачи. За каждую задачу, сданную до разбора, участник получает $\\dfrac{60}{n}$ баллов, а после разбора — $\\dfrac{30}{n}$ баллов, где $n$ - количество задач."
    }
  },
  mounted() {
    if (!("year" in this.route.params)) this.$router.push("/summer-cup/2");
    for (let i = 0; i < this.solutions.length; i++){
      this.solutions[i].reverse();
    }
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
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
    <Tabs :routes="{'I ЛКП': '/summer-cup/1', 'II ЛКП': '/summer-cup/2'}"/>
    <RouterView v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <Component :is="Component"/>
      </Transition>
    </RouterView>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>