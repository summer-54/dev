<script lang="ts">
import {defineComponent} from "vue";
import {type ContestType, getAllContests, patchContests} from "@/api/codeforces.js";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue";
import FixedButton from "@/components/ui/fixedButton.vue";
import doneIcon from "@/assets/done.svg";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "ContestsSubView",
  components: {ProgressIndicator, FixedButton, SuiInput, SuiFileInput},
  data() {
    return {
      contests: [] as Array<ContestType>,
      pdfFiles: [] as Array<File | undefined>,
      doneIcon,
      pending: false
    }
  },
  methods: {
    async get() {
      this.pending = true;
      this.contests = await getAllContests();
      this.pdfFiles.fill(undefined, 0, this.contests.length);
      this.pending = false;
    },
    async getDataUrl(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (!reader.result || typeof reader.result !== "string") return reject();
          resolve(reader.result);
        };
      });
    },
    async setPdf(index: number, file: File) {
      this.pdfFiles[index] = file;
    },
    async patch() {
      this.pending = true;
      await patchContests(this.contests.map(({id, solutionsPublishDatetime, solutionsVideoId}, index) => ({
        id,
        solutionsPublishDatetime,
        solutionsVideoId,
        ...(this.pdfFiles[index] ? {problemsPdf: this.pdfFiles[index]} : {})
      })));
      await this.get();
    }
  },
  mounted() {
    this.get();
  }
})
</script>

<template>
  <main>
    <table>
      <thead>
        <tr>
          <th>Контест</th>
          <th>Условия</th>
          <th>Дата разбора</th>
          <th>Видео разбора</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({name, problemsPdfLink}, index) in contests">
          <td>{{name}}</td>
          <td>
            <SuiFileInput @update:modelValue="setPdf(index, $event[0])" accept="application/pdf">
              <template v-if="!pdfFiles[index] && !problemsPdfLink">Выберите файл</template>
              <template v-else-if="pdfFiles[index]">Файл выбран</template>
              <template v-else>Заменить файл</template>
            </SuiFileInput>
          </td>
          <td><SuiInput v-model="contests[index].solutionsPublishDatetime" datetime/></td>
          <td><SuiInput v-model="contests[index].solutionsVideoId"/></td>
        </tr>
      </tbody>
    </table>
    <FixedButton :icon="doneIcon" @click="patch">Готово</FixedButton>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

main {
  display: flex;
  justify-content: center;
}

thead {
  font-size: 32px;
}

tbody tr td:nth-child(1) {
  font-size: 32px;
}

td {
  border: 2px solid white;
  border-radius: 15px;
  margin: 10px;
  text-align: center;
}
</style>