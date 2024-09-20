<template>
  <main>
    <Title text="Летняя школа программирования" />
    <QA_container :qa_list="qa_list"/>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Title from '@/components/Title.vue';
import QA_container from '@/components/QA_container.vue';

export default defineComponent({
  name: "SummerCamp",
  components: {Title, QA_container},
  data() {
    return {
      qa_list: [
        {q: "Что нужно, чтобы поехать?", a: "Нужно учиться в 54 школе и показать высокий результат на <RouterLink to=\"/olymp\">внутренней олимпиаде</RouterLink> или на региональном этапе ВсОШ."},
        {q: "Где и когда проходит лагерь?", a: "Лагерь проходит в Красновидово, в <a href=\"http://krasnovydovo.msu.ru/\" target=\"_blank\">доме отдыха МГУ</a> в середине августа. Лагерь длится примерно две недели."},
        {q: "Какой уровень тем?", a: "Уровень тем зависит от участников. В этом году были выделены 2 группы. В более сильной группе проходили ... В более слабой &#0151; ..."}
      ]
    }
  }
})
</script>