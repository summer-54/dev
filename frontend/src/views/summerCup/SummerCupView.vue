<script lang="ts" setup>
import {onMounted, ref} from "vue";
import QA_container from "@/components/QA_container.vue";
import Tex from "@/components/ui/tex.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import Animation from "@/components/ui/animation.vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const qa_list = ref([
  {q: "В каком формате проходит кубок?", a: "Кубок проходит в формате еженедельных контестов."},
  {q: "В каком формате проходит тур?", a: "С утра субботы до 7:00 четверга можно написать 5-часовое виртуальное участие. В четверг в 12:00 выкладывается разбор. Дорешивать задачи можно до начала раунда через один (т.е. 9 дней после разбора)."}
]);

const solutions = ref([
  [
    {num:  1, tasks_amount: undefined, date: undefined, solution: "kSqRWlDEJHo"},
    {num:  2, tasks_amount: undefined, date: undefined, solution: "Enuq2_ftRnk"},
    {num:  3, tasks_amount: undefined, date: undefined, solution: "xd7ybW3XkpQ"},
    {num:  4, tasks_amount: undefined, date: undefined, solution: "8wHtb8fsXvU"},
    {num:  5, tasks_amount: undefined, date: undefined, solution: "r8AFfgb8bvY"},
    {num:  6, tasks_amount: undefined, date: undefined, solution: "f7-pjyDR3OE"},
    {num:  7, tasks_amount: undefined, date: undefined, solution: "kVicb6GQB8o"},
    {num:  8, tasks_amount: undefined, date: undefined, solution: "FI9UPkaPPWc"},
    {num:  9, tasks_amount: undefined, date: undefined, solution: "AqIf9P7YT8k"},
    {num: 10, tasks_amount: undefined, date: undefined, solution: "2Zy77NRHSMk"}
  ],
  [
    {num:  1, tasks_amount: 11, date: "01.06.2024—14.06.2024", solution: "mCj1RIXx_qw"},
    {num:  2, tasks_amount:  9, date: "08.06.2024—21.06.2024", solution: "gg-MsmrzUaY"},
    {num:  3, tasks_amount:  8, date: "15.06.2024—28.06.2024", solution: "eXphcfz4AzI"},
    {num:  4, tasks_amount: 11, date: "21.06.2024—06.07.2024", solution: "hMGGmTd5de8"},
    {num:  5, tasks_amount:  9, date: "26.06.2024—19.07.2024", solution: "6z9clGg8s7E"},
    {num:  6, tasks_amount:  9, date: "06.07.2024—19.07.2024", solution: "GXFJrkMJrRw"},
    {num:  7, tasks_amount: 11, date: "14.07.2024—27.07.2024", solution: "jvEdVcos6Ms"}
  ],
  [
    {num:  1, tasks_amount: 6, date: "01.06.2025—14.06.2025", solution: ""}
  ]
]);

onMounted(() => {
  if (!("year" in route.params)) router.push(`/summer-cup/${solutions.value.length}`);
  for (let i = 0; i < solutions.value.length; i++){
    solutions.value[i].reverse();
  }
});

const text = ref("Один тур оценивается в 90 баллов, общий балл за кубок — сумма баллов за все туры, кроме 2 худших. 30 баллов выставляется за место в виртуальном участии (за 1 место - 30, 2 - 28, 3 - 26, 4 - 24, 5 - 22, 6 - 20, 7 - 19, 8 - 18 и т.д.), но не решившие ни одной задачи не получают баллов за место. Оставшиеся 60 баллов участник получает за задачи. За каждую задачу, сданную до разбора, участник получает $\\dfrac{60}{n}$ баллов, а после разбора — $\\dfrac{30}{n}$ баллов, где $n$ - количество задач.");
</script>

<template>
  <main>
    <h1>Летний кубок по программированию</h1>
    <QA_container :qa_list="qa_list"></QA_container>
    <Animation animation="fadeRight" :delay="200">
      <TermWindow class="tex">
        <template #header>
          Система оценивания
        </template>
        <tex class="plain_text" :text="text"/>
      </TermWindow>
    </Animation>
<!--    <Tabs :routes="{'I ЛКП': '/summer-cup/1', 'II ЛКП': '/summer-cup/2'}"/>-->
<!--    <RouterView v-slot="{Component}">-->
<!--      <Transition name="fade" mode="out-in">-->
<!--        <Component :is="Component"/>-->
<!--      </Transition>-->
<!--    </RouterView>-->
<!--    <TermBG/>-->
  </main>
</template>

<style scoped>
.plain_text {
  text-align: justify;
}

h1 {
  font-family: "ShoptronicSP",serif;
  text-align: center;

  @media (width >= 1270px) {
    font-size: 96px;
  }
  @media (910px <= width < 1270px) {
    font-size: 64px;
  }
  @media (710px <= width < 910px) {
    font-size: 48px;
  }
  @media (420px <= width < 710px) {
    font-size: 36px;
  }
  @media (width < 420px) {
    font-size: 30px;
  }
}

:global(.dark) {
  h1 {
    color: #95EAA7FF;
    text-shadow: 0 0 10px #95EAA7FF;
  }
}

h2 {
  text-align: center;
}

.tex {
  margin: 32px 40px 0 40px;

  @media (max-width: 530px) {
    margin: 32px 20px 0 20px;
  }
}
</style>