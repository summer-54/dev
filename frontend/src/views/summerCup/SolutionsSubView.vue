<script lang="ts">
import {defineComponent} from 'vue'
import SolutionContainer, {type SolutionsType} from "@/views/summerCup/SolutionContainer.vue";

export default defineComponent({
  name: "AnalysisSubView",
  components: {SolutionContainer},
  data() {
    return {
      solutions: [
        [
          {num:  1, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/1"}, // , href: "https://youtu.be/kSqRWlDEJHo"},
          {num:  2, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/2"}, // , href: "https://youtu.be/Enuq2_ftRnk"},
          {num:  3, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/3"}, // , href: "https://youtu.be/xd7ybW3XkpQ"},
          {num:  4, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/4"}, // , href: "https://youtu.be/8wHtb8fsXvU"},
          {num:  5, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/5"}, // , href: "https://youtu.be/r8AFfgb8bvY"},
          {num:  6, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/6"}, // , href: "https://youtu.be/f7-pjyDR3OE"},
          {num:  7, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/7"}, // , href: "https://youtu.be/kVicb6GQB8o"},
          {num:  8, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/8"}, // , href: "https://youtu.be/FI9UPkaPPWc"},
          {num:  9, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/9"}, // , href: "https://youtu.be/AqIf9P7YT8k"},
          {num: 10, href: undefined, tasks_amount: undefined, date: undefined, route: "/summer-cup/2/10"}  // , href: "https://youtu.be/2Zy77NRHSMk"}
        ],
        [
          {num:  1, href: undefined, tasks_amount: 11, date: "01.06.2024—14.06.2024", route: "/summer-cup/2/1"}, // , href: "https://youtu.be/mCj1RIXx_qw"},
          {num:  2, href: undefined, tasks_amount:  9, date: "08.06.2024—21.06.2024", route: "/summer-cup/2/2"}, // , href: "https://youtu.be/gg-MsmrzUaY"},
          {num:  3, href: undefined, tasks_amount:  8, date: "15.06.2024—28.06.2024", route: "/summer-cup/2/3"}, // , href: "https://youtu.be/eXphcfz4AzI"},
          {num:  4, href: undefined, tasks_amount: 11, date: "21.06.2024—06.07.2024", route: "/summer-cup/2/4"}, // , href: "https://youtu.be/hMGGmTd5de8"},
          {num:  5, href: undefined, tasks_amount:  9, date: "26.06.2024—19.07.2024", route: "/summer-cup/2/5"}, // , href: "https://youtu.be/6z9clGg8s7E"},
          {num:  6, href: undefined, tasks_amount:  9, date: "06.07.2024—19.07.2024", route: "/summer-cup/2/6"}, // , href: "https://youtu.be/GXFJrkMJrRw"},
          {num:  7, href: undefined, tasks_amount: 11, date: "14.07.2024—27.07.2024", route: "/summer-cup/2/7"}  // , href: "https://youtu.be/jvEdVcos6Ms"}
        ]
      ] as Array<Array<SolutionsType>>
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
  <SolutionContainer :solutions="solutions[route.params.year - 1]"/>
</template>

<style scoped>

</style>