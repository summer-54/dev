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

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "OlympMaterials",
  data() {
    return {
      materials: [
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
        }
      ]
    }
  }
})
</script>

<style>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}
table {
  margin: auto;
  padding-top: 100px;
}
</style>