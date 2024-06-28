<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue"
import axios from "axios";
import {SERVER_URL} from "@/api";

export default defineComponent({
  name: "TestView",
  components: {SuiFileInput},
  data() {
    return {
      files: [] as File[]
    }
  },
  watch: {
    files() {
      console.log(this.files);
    }
  },
  methods: {
    readFile(file: File) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        if (!reader.result || typeof reader.result === "string") return;
        let str = btoa(String.fromCharCode(...new Uint8Array(reader.result)));
        await axios.post(SERVER_URL + "/news", {
          title: "test",
          description: "test",
          fullText: "test",
          images: ["test.png"],
          img: "test.png",
          attachments: {
            "test.png": str
          }
        });
      }
    },
    read() {
      this.files.forEach(file => this.readFile(file));
    }
  }
})
</script>

<template>
  <SuiFileInput v-model="files" multiple>Files</SuiFileInput>
  <button @click="read">read</button>
</template>

<style scoped>

</style>