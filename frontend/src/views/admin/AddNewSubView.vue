<script lang="ts">
import Title from "@/components/Title.vue";
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
import FixedButton from "@/components/ui/fixedButton.vue";
import doneIcon from "@/assets/done.svg";
import {postNew} from "@/api/news.js";
import Subtitle from "@/components/Subtitle.vue";
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "AddNewSubView",
  components: {ProgressIndicator, Subtitle, FixedButton, Title, SuiInput, SuiFileInput},
  data() {
      return {
        title: "",
        description: "",
        fullText: "",
        doneIcon,
        img: [] as Array<File>,
        images: [] as Array<File>,
        pending: false
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
      this.pending = true;
      await postNew({
        title: this.title,
        description: this.description,
        fullText: this.fullText,
        img: this.img.length ? this.img[0].name.replaceAll(' ', '_') : undefined,
        images: this.images.map(image => image.name.replaceAll(' ', '_')),
        attachments: {
          ...Object.fromEntries(this.images.map(image => [image.name.replaceAll(' ', '_'), image])),
          ...(this.img.length ? {[this.img[0].name.replaceAll(' ', '_')]: this.img[0]} : {})
        }
      });
      this.pending = false;
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
      <SuiFileInput v-model="img" accept="image/*">Выберите главное изображение (показывается на главной)</SuiFileInput>
      <SuiFileInput v-model="images" multiple accept="image/*">Выберите изображения для галереи</SuiFileInput>
    </div>
    <FixedButton :icon="doneIcon" @click="post">Готово</FixedButton>
    <ProgressIndicator v-if="pending"/>
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

  label {
    margin-top: 20px;
  }
}
</style>