<template>
  <main>
    <h1>Летняя школа программирования</h1>
    <QA_container :qa_list="qa_list_small" class="qa_list_small"/>
    <QA_container :qa_list="qa_list_large"/>
    <TermBG/>
  </main>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import QA_container from '@/components/QA_container.vue';
import TermBG from "@/components/termui/TermBG.vue";

const qa_list_small = ref([
  {q: "Что нужно, чтобы поехать?", a: "Нужно учиться в 54 школе и показать высокий результат на <RouterLink to=\"/olymp\">внутренней олимпиаде</RouterLink> или пройти на региональный этап ВсОШ."},
  {q: "Где и когда проходит лагерь?", a: "Лагерь проходит в Красновидово, в <a href=\"http://krasnovydovo.msu.ru/\" target=\"_blank\">доме отдыха МГУ</a> в середине августа. Лагерь длится примерно две недели."},
  {q: "Что еще есть в ЛШП, кроме уроков?", a: "В ЛШП проводятся спортивные мероприятия, командная олимпиада и даже контест, где часть команды ищет условия на территории базы, а другая их решает!"}
]);

const qa_list_large = ref([
  {q: "Какой уровень тем?", a: "Уровень тем зависит от участников. В этом году были выделены 2 группы. В более сильной группе проходили корневую декомпозицию, СНМ, ДП по подотрезкам, поддеевьям, подмножествам, алгоритмы на графах (включая LCA, мосты, точки сочленения, КСС), алгоритмы на строках (включая префикс- и Z-функцию, бор, хеши), структуры для запросов по подотрезкам (ДО, лес Фенвика, sparse table). В более слабой&nbsp;&#0151; линейные алгоритмы (2 указателя, префиксные суммы), стек, очередь, дек, графы (DFS, BFS, Форд-Беллман, Флойд-Уоршелл, Дейкстра), битовые операции, STL, бинарный и тернарный поиски, линейное и двумерное ДП."}
]);
</script>

<style scoped>
h1 {
  font-family: "ShoptronicSP",serif;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;

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

.qa_list_small {
  margin-bottom: 32px;
}
</style>