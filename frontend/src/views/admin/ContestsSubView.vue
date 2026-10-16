<script lang="ts">
import {defineComponent} from "vue";
import {addContest, type ContestType, getAllContests, patchContest, patchContests} from "@/api/codeforces.js";
import FixedButton from "@/components/ui/fixedButton.vue";
import doneIcon from "@/assets/icons/done.svg";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import Title from "@/components/Title.vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue";
// @ts-ignore
import SuiModalWindow from "sffui.vue/suiModalWindow.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";

export default defineComponent({
  name: "ContestsSubView",
  components: {Title, ProgressIndicator, FixedButton, SuiInput, SuiFileInput, SuiModalWindow, SuiButton},
  data() {
    return {
      contests: [] as Array<ContestType>,
      pdfFiles: [] as Array<File | undefined>,
      doneIcon,
      pending: false,
      addModalOpened: false,
      addFile: [] as Array<File>,
      addContestId: ""
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
    async setPdf(index: number, file?: File) {
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
    },
    async patchContest(id: number, file?: File) {
      if (!file) return;
      this.pending = true;
      await patchContest(id, file);
      this.pending = false;
    },
    async addContest() {
      if (!this.addFile.length || !this.addContestId.length) return;
      this.pending = true;
      await addContest(Number(this.addContestId), this.addFile[0]);
      this.addModalOpened = false;
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
          <th>Ручное обновление результатов</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({name, problemsPdfLink, id}, index) in contests">
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
          <td>
            <SuiFileInput @update:modelValue="patchContest(id, $event[0])" accept="text/html">Обновить результаты</SuiFileInput>
          </td>
        </tr>
      </tbody>
    </table>
    <FixedButton :icon="doneIcon" @click="patch">Готово</FixedButton>
    <FixedButton :icon="doneIcon" @click="addModalOpened = true" class="add">Добавить</FixedButton>
    <ProgressIndicator v-if="pending"/>
    <SuiModalWindow v-model:open="addModalOpened">
      <Title text="Добавление контеста"/>
      <div style="margin-bottom: 20px">
        <SuiInput v-model="addContestId" placeholder="ID контеста" number style="margin-right: 20px"/>
        <SuiFileInput v-model="addFile" accept="text/html">Файл</SuiFileInput>
      </div>
      <div>
        <SuiButton @click="addModalOpened = false" style="margin-right: 20px">Отмена</SuiButton>
        <SuiButton @click="addContest" color="green" border="green">Добавить</SuiButton>
      </div>
    </SuiModalWindow>
  </main>
</template>

<style scoped>
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
  border-radius: 15px;
  margin: 10px;
  text-align: center;
}

.add {
  right: 130px;
}
</style>