<script lang="ts">
import {defineComponent} from 'vue';
import QA_container from '@/components/QA_container.vue';
import Subtitle from '@/components/Subtitle.vue';

export default defineComponent({
  name: "OlympView",
  components: {QA_container, Subtitle},
  data() {
    return {
      rules: [
        {q: "Кто может принять участие?", a: "Вы должны быть учеником 8-11 классов при мехмате МГУ"},
        {q: "Сколько длится олимпиада?", a: "3 часа"},
        {q: "Сколько будет задач?", a: "Будет предложено от 5 до 8 задач"}, 
        {q: "Как оцениваются решения?", a: "Каждая задача оценивается в 100 баллов, из которых 70 баллов начисляется за прохождение отдельных тестов жюри (по 1 баллу за каждый тест) и 30 бонусных баллов даётся, если программа прошла все тесты жюри. Тесты из условия не приносят баллы, но их прохождение необходимо для тестирования основной группы тестов. Время и количество отправок решений не влияют на результат олимпиады. За задачу выставляется максимальный балл из набранных по всем посылкам."}
      ]
    }
  }
})
</script>

<template>
  <h1>Олимпиада по программированию</h1>
  <span class="subtitle"><Subtitle text="Правила"></Subtitle></span>
  <QA_container :qa_list="rules"></QA_container>
  <QA question="Кто может принять участие?" answer="Вы должны быть учеником 8&#150;11 классов при мехмате МГУ"></QA>
  <QA question="Сколько длится олимпиада?" answer="3 часа"></QA>
  <QA question="Сколько будет задач?" answer="От 5 до 8"></QA>
</template>

<style scoped>
.subtitle {
  text-align: center;
}
h1 {
  text-align: center;
  font-family: "LXGW WenKai Mono TC", monospace;
  margin-left: 8px;
  margin-right: 8px;
}
.qa_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 5%;
}
</style>