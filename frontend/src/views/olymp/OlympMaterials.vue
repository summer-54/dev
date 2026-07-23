<template>
  <table>
    <tr style="font-weight: bold;"><td>Год</td><td>Условия</td><td>Результаты</td><td>Тренировка</td><td>Разбор</td></tr>
    <tr v-for="{year, tasks, results, gym, solutions} in materials">
      <td style="font-weight: bold;">{{ year }}</td>
      <td><a :href="tasks">Условия</a></td>
      <td><a :href="results">Результаты</a></td>
      <td v-if="gym !== undefined"><a :href="gym">Тренировка</a></td>
      <td v-if="solutions !== undefined"><a :href="solutions">Разбор</a></td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const materials = ref([
  {
    year: 2022,
    tasks: "/tasks22.pdf",
    results: "https://codeforces.com/spectator/ranklist/7a560457e6bff93772b8a5f630ba2888"
  },
  {
    year: 2023,
    tasks: "/tasks23.pdf",
    results: "https://codeforces.com/spectator/ranklist/4e6194aba52ae5ee893740ac265ca71e",
    gym: "https://codeforces.com/contestInvitation/ff9a89f060b2d1857c844f118b385fdb4fe861d0",
    solutions: "/solution23.pdf"
  },
  {
    year: 2024,
    tasks: "/tasks24.pdf",
    results: "https://codeforces.com/spectator/ranklist/5b07c464e44e728aaa349f638ef1bfe2",
    gym: "https://codeforces.com/gym/105136",
    solutions: "https://youtu.be/iac53dNDHbg"
  },
  {
    year: 2025,
    tasks: "/tasks25.pdf",
    results: "https://codeforces.com/spectator/ranklist/1e14d24fe35f078ac5a18181557e0d11",
    gym: "https://codeforces.com/contestInvitation/a2431f05cb0f66b9855a0d6b8da0f3e04eca9523",
    solutions: "/solutions25.pdf"
  },
  {
    year: 2026,
    tasks: "/tasks26.pdf",
    results: "https://codeforces.com/spectator/ranklist/feb36b4d9b2d5fc0875993401303893e",
    gym: "https://codeforces.com/contestInvitation/fe04aff4a6c4783482e360046084051d6977a44c",
    solutions: "/solutions26.pdf"
  },
]);
</script>

<style scoped>
* {
  font-size: 20px;
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 14px;
  }

  @media (max-width: 530px) {
    font-size: 10px;
  }
}
table {
  margin: auto;
  padding-top: 80px;
}
</style>