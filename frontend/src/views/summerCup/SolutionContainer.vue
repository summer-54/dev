<template>
  <span class="solution_container">
    <a v-for="solution in solutions" :href="solution.href" target="_blank">Разбор {{ solution.num }} тура</a>
  </span>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SolutionContainer",
  props: {
    solutions: {
      type: Array<{num: number, href: string}>,
      required: true
    }
  }
})
</script>

<style scoped>
.solution_container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
a {
  font-size: 28px;
  margin-right: 20px;
  margin-left: 20px;
  font-family: "LXGW WenKai Mono TC", monospace;
  text-decoration: none;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 24px;
  }

  @media (max-width: 530px) {
    font-size: 20px;
  }
}
</style>