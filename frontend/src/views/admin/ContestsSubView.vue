<script lang="ts">
import {defineComponent} from "vue";
import {type ContestType, getAllContests} from "@/api/codeforces.js";

export default defineComponent({
  name: "ContestsSubView",
  data() {
    return {
      contests: [] as Array<ContestType>,
    }
  },
  mounted() {
    (async () => {
      this.contests = await getAllContests();
    })();
  }
})
</script>

<template>
  <main>
    <table rules="all">
      <thead>
        <tr>
          <th>Контест</th>
          <th>Условия</th>
          <th>Дата разбора</th>
          <th>Видео разбора</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{id, name, solutionsPublishDatetime, solutionsVideoId, problemsPdfLink} in contests">
          <td>{{name}}</td>
          <td>{{problemsPdfLink}}</td>
          <td>{{solutionsPublishDatetime}}</td>
          <td>{{solutionsVideoId}}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}
thead {
  font-size: 20px;
}
</style>