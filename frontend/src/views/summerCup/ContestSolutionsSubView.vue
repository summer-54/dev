<script lang="ts">
import {defineComponent} from 'vue'
import {YoutubeIframe} from "@vue-youtube/component";

export default defineComponent({
  name: "SolutionSubView",
  components: {YoutubeIframe},
  data() {
    return {
      solutions: [
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
          {num:  7, tasks_amount: 11, date: "14.07.2024—27.07.2024", solution: "jvEdVcos6Ms"},
          {num:  8, tasks_amount: 11, date: "21.07.2024—02.08.2024", solution: "Zx9LE6WFeaY"},
          {num:  9, tasks_amount:  9, date: "27.07.2024—09.08.2024", solution: "1HMJNzHsW8Q"},
          {num: 10, tasks_amount: 10, date: "01.08.2024—16.08.2024", solution: "kew51D-ZVFU"},
          {num: 11, tasks_amount:  9, date: "11.08.2024—23.08.2024", solution: "/LKP_2_11_solutions.pdf"},
          {num: 12, tasks_amount: 11, date: "21.08.2024—30.08.2024", solution: undefined}
        ]
      ]
    }
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
    },
    videoId() {
      return this.solutions[this.route.params.year - 1][this.route.params.contest - 1].solution;
    }
  }
})
</script>

<template>
  <article>
    <YoutubeIframe :videoId="videoId" v-if="videoId && !videoId.startsWith('/')"/>
    <span class="comment" v-else-if="videoId?.startsWith('/')">
      Разбор этого тура выложен <a :href="videoId" target="_blank">в формате PDF</a>.
    </span>
    <span class="comment" v-else>К сожалению, у этого тура нет разбора.</span>
  </article>
</template>

<style>
#vue-youtube-1 {
  width: calc(100vw - 190px);
  @media (max-width: 768px) {
    width: 90vw;
  }
}
.comment {
  font-size: 20px;
}
</style>
