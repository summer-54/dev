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
  }
})
</script>

<template>
  <main>
    <Title text="Летний кубок по программированию"></Title>
    <QA_container :qa_list="qa_list"></QA_container>
  </main>
</template>

<style scoped>

</style>