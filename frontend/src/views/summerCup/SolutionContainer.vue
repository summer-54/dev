<template>
  <span class="solution_container">
    <template v-for="solution in solutions">
      <template v-if="solution.href">
        <RouterLink :to="solution.href">
          <span class="tour">
            <Subtitle :text="solution.num + ' тур'" />
            <span v-if="solution.date" class="date"><img src="@/assets/clock.svg"> {{ solution.date }}</span>
            <span v-if="solution.tasks_amount">{{ solution.tasks_amount }} задач{{ ending }}</span>
          </span>
        </RouterLink>
      </template>
      <template v-else>
        <span class="tour">
          <Subtitle :text="solution.num + ' тур'" />
          <span v-if="solution.date" class="date"><img src="@/assets/clock.svg"> {{ solution.date }}</span>
          <span v-if="solution.tasks_amount">{{ solution.tasks_amount }} задач{{ ending }}</span>
        </span>
      </template>
    </template>
  </span>
</template>

<script lang="ts">
import Subtitle from "@/components/Subtitle.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "SolutionContainer",
  props: {
    solutions: {
      type: Array<{num: number, tasks_amount: number|undefined, href: string|undefined, date: string|undefined, solution: string}>,
      required: true
    }
  },
  components: {Subtitle},
  computed: {
    ending() {
      let result = [] as Array<string>;
      for(let i = 0; i < this.solutions.length; i++){
        let amount = this.solutions[i].tasks_amount;
        if(amount === undefined){
          result[i] = "";
          continue;
        }
        if(10 <= amount%100 && amount%100 <= 19){
          result[i] = "";
          continue;
        }
        if(amount%10 == 1) return "а";
        if(2 <= amount%10 && amount%10 <= 4) return "и";
        return "";
      }
    }
  }
})
</script>

<style scoped>
.tour {
  border: 3px solid gray;
  border-radius: 10px;
  min-width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-evenly;
  padding: 10px 0;
  align-items: center;

  font-size: 20px;
  font-family: "LXGW WenKai Mono TC", monospace;
  text-decoration: none;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 12px;
  }
}
.date {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 0 10px;
}
h2 {
  margin: 0 0;
}
.solution_container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 50px;
  margin-left: 50px;
  margin-right: 50px;
}
a {
  font-size: 28px;
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