<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {Line} from "vue-chartjs";
import IconButton from "@/components/ui/iconButton.vue";
import {type UserType} from "@/api/users";
import {getFullStandings, getUserStatistics} from "@/api/codeforces";
import Title from "@/components/Title.vue";
import type {ChartDataset} from "chart.js";

export default defineComponent({
  name: "UserInfo",
  components: {Title, IconButton, Line},
  props: {
    user: {
      type: Object as PropType<UserType>,
      required: true
    }
  },
  data() {
    return {
      labels: [] as Array<string>,
      tasksDatasets: [] as Array<ChartDataset<"line">>,
      percentsDatasets: [] as Array<ChartDataset<"line">>,
      participatingInCup: false,
      cupDatasets: [] as Array<ChartDataset<"line">>
    }
  },
  methods: {
    async updateStatistics() {
      let username = this.user?.username ?? "";
      let {perContest, hardTasks, attemptsCountPerTask} = await getUserStatistics(username);
      this.tasksDatasets = [{
        data: perContest.map(percent => Math.round(percent * 10) / 10),
        label: "Процент решенных задач",
        borderColor: this.$themeName === "light" ? "#004e01" : "#00ad03",
        backgroundColor: this.$themeName === "light" ? "#004e01" : "#00ad03",
        tension: .5
      }, {
        data: hardTasks.map(percent => Math.round(percent * 10) / 10),
        label: "Процент решенных сложных задач",
        borderColor: this.$themeName === "light" ? "#850000" : "#bf0000",
        backgroundColor: this.$themeName === "light" ? "#850000" : "#bf0000",
        tension: .5
      }];
      this.percentsDatasets = [{
        data: attemptsCountPerTask,
        label: "Среднее количество попыток на задачу",
        borderColor: this.$themeName === "light" ? "#001285" : "#0721c8",
        backgroundColor: this.$themeName === "light" ? "#001285" : "#0721c8",
        tension: .5
      }]
      this.labels = [];
      for (let i = 1; i <= perContest.length; i++) this.labels.push(`${i} тур`);
      console.log(this.tasksDatasets, this.labels);
      let standings = (await getFullStandings()).standings;
      if (standings[username] !== undefined) {
        this.participatingInCup = true;
        this.cupDatasets = [{
          data: standings[username],
          label: "Баллы в ЛКП",
          borderColor: this.$themeName === "light" ? "#ff8b00" : "#ff8b00",
          backgroundColor: this.$themeName === "light" ? "#ff8b00" : "#ff8b00",
          tension: .5
        }]
      }
    }
  },
  mounted() {
    this.updateStatistics();
  },
  watch: {
    user() {
      this.updateStatistics();
    },
    $themeName() {
      this.updateStatistics();
    }
  }
});
</script>

<template>
  <main>
    <Title :text="'Информация о ' + user.username"/>
    <div class="info">
      <div>
        <span>Аккаунт Codeforces: <a :href="`https://codeforces.com/profile/${user.codeforcesHandle}`" target="_blank">{{ user.codeforcesHandle }}</a></span>
        <span>{{ user.lastName }} {{ user.firstName }}</span>
      </div>
      <slot/>
    </div>
    <div class="charts">
      <div class="chart">
        <Line :data="{labels, datasets: tasksDatasets}" :options="{scales: {y: {min: 0, max: 100}}}"/>
      </div>
      <div class="chart">
        <Line :data="{labels, datasets: percentsDatasets}" :options="{scales: {y: {min: 0}}}"/>
      </div>
      <div class="chart" v-if="participatingInCup">
        <Line :data="{labels, datasets: cupDatasets}" :options="{scales: {y: {min: 0, max: 90}}}"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 20px;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;

  div {
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: 10px;
      font-size: 20px;
    }
  }

  @media (max-width: 396px) {
    .button {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
}

@media (min-width: 1000px) {
  .charts {
    display: flex;

    .chart {
      width: 50%;

      canvas {
        position: relative;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>