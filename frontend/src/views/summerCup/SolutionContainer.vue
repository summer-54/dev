<template>
  <span class="solution_container">
    <template v-for="solution in solutions">
      <template v-if="solution.href">
        <RouterLink :to="solution.route" class="tour">
            <Subtitle :text="solution.num + ' тур'" />
            <span v-if="solution.date" class="date"><img src="../../assets/icons/clock.svg"> {{ solution.date }}</span>
            <span v-if="solution.tasks_amount">{{ solution.tasks_amount }} задач{{ ending[solution.num-1] }}</span>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink class="tour" :to="solution.route">
          <Subtitle :text="solution.num + ' тур'" />
          <span v-if="solution.date" class="date"><img src="../../assets/icons/clock.svg"> {{ solution.date }}</span>
          <span v-if="solution.tasks_amount">{{ solution.tasks_amount }} задач{{ ending[solution.num-1] }}</span>
        </RouterLink>
      </template>
    </template>
  </span>
</template>

<script lang="ts">
import Subtitle from "@/components/Subtitle.vue";
import {defineComponent, type PropType} from "vue";

export type SolutionType = {
  num: number,
  tasks_amount?: number,
  href?: string,
  date?: string,
  solution: string,
  route: string
}

export default defineComponent({
  name: "SolutionContainer",
  props: {
    solutions: {
      type: Object as PropType<Array<SolutionType>>,
      required: true
    }
  },
  components: {Subtitle},
  computed: {
    ending() {
      let result = [] as Array<string>;
      for (let i = 0; i < this.solutions.length; i++) {
        let amount = this.solutions[i].tasks_amount;
        if (amount === undefined) {
          result[i] = "";
          continue;
        }
        let last_digit = amount % 10;
        let last_2_digits = amount % 100;
        if (10 <= last_2_digits && last_2_digits <= 19) {
          result[i] = "";
          continue;
        }
        if (last_digit == 1) {
          result[i] = "а";
          continue;
        }
        if (2 <= last_digit && last_digit <= 4) {
          result[i] = "и";
          continue;
        }
        result[i] = "";
      }
      return result;
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
  transition: all .5s;

  font-size: 20px;
  text-decoration: none;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 12px;
  }

  &:hover {
    cursor: pointer;
    border-color: #9297FB;
    transform: scale(1.4);
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
  text-decoration: none;
  
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 24px;
  }

  @media (max-width: 530px) {
    font-size: 20px;
  }
}
</style>