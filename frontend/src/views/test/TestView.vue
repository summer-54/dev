<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue"

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
      reader.readAsText(file);
      reader.onload = () => {
        console.log(reader.result);
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