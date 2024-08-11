<script lang="ts">
import {defineComponent} from 'vue';
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue";
import {postNew} from "@/api/news.js";

export default defineComponent({
  name: "TestView",
  components: {SuiFileInput},
  data() {
      return {
        files: [] as Array<File>
      }
  },
  methods: {
    submit() {
      postNew({
        title: "test",
        description: "testestestestestest",
        fullText: "testestestestestestestestestestestestestestestestestestest",
        attachments: {
          [this.files[0].name.replaceAll(' ', '_')]: this.files[0]
        },
        img: this.files[0].name.replaceAll(' ', '_'),
        images: [this.files[0].name.replaceAll(' ', '_')]
      });
    }
  }
})
</script>

<template>
  <div>
    <SuiFileInput v-model="files" @change="submit">files</SuiFileInput>
  </div>
</template>

<style scoped>

</style>