<script lang="ts">
import Title from "@/components/Title.vue";
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
import FixedButton from "@/components/ui/fixedButton.vue";
import doneIcon from "@/assets/done.svg";
import {postNew} from "@/api/news.js";

export default defineComponent({
  name: "AddNewSubView",
  components: {FixedButton, Title, SuiInput},
  data() {
      return {
        title: "",
        description: "",
        fullText: "",
        doneIcon
      }
  },
  methods: {
    resizeTextArea(ref: HTMLTextAreaElement) {
      ref.style.height = "auto";

      this.$nextTick(() => {
        ref.style.height = ref.scrollHeight - 40 + 'px';
      })
    },
    async post() {
      await postNew({title: this.title, description: this.description, fullText: this.fullText});
      this.$router.push("/admin/news");
    }
  },
  watch: {
    description() {
      this.resizeTextArea(this.$refs.description as HTMLTextAreaElement);
    },
    fullText() {
      this.resizeTextArea(this.$refs.fullText as HTMLTextAreaElement);
    }
  },
  computed: {
    bg() {
      return this.$theme.bg;
    }
  }
})
</script>

<template>
  <main>
    <div>
      <Title text="Создание новости"/>
      <SuiInput v-model="title" placeholder="Заголовок"/>
      <textarea v-model="description" placeholder="Краткое описание (показывается на главной)" ref="description"/>
      <textarea v-model="fullText" placeholder="Текст новости" ref="fullText"/>
    </div>
    <FixedButton :icon="doneIcon" @click="post">Готово</FixedButton>
  </main>
</template>

<style scoped>
div {
  padding: 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  textarea {
    width: 96%;
    background: v-bind(bg);
    outline: none !important;
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    resize: none;
  }
}
</style>