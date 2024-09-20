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
        {q: "Где проходит лагерь?", a: ""}
      ]
    }
  }
})
</script>