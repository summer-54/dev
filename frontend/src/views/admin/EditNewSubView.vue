<script lang="ts">
import {defineComponent} from 'vue'
import FixedButton from "@/components/ui/fixedButton.vue";
import Title from "@/components/Title.vue";
import doneIcon from "@/assets/icons/done.svg";
import {getNew, patchNew, removeNew} from "@/api/news.js";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiFileInput from "sffui.vue/suiFileInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
// @ts-ignore
import SuiModalWindow from "sffui.vue/suiModalWindow.vue";
import RemovableFileUrl from "@/views/admin/RemovableFileUrl.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "EditNewSubView",
  components: {
    ProgressIndicator,
    RemovableFileUrl, Title, FixedButton, SuiInput, SuiFileInput, SuiButton, SuiModalWindow},
  data() {
    return {
      title: "",
      description: "",
      fullText: "",
      doneIcon,
      img_: [] as Array<File>,
      images_: [] as Array<File>,
      loaded: false,
      pending: false,
      images: [] as Array<string>,
      img: undefined as string | undefined,
      oldImg: undefined as string | undefined,
      removeModalOpened: false
    }
  },
  methods: {
    resizeTextArea(ref: HTMLTextAreaElement) {
      ref.style.height = "auto";

      this.$nextTick(() => {
        ref.style.height = ref.scrollHeight - 40 + 'px';
      })
    },
    async patch() {
      this.pending = true;
      await patchNew(this.route.params.id, {
        title: this.title,
        description: this.description,
        fullText: this.fullText,
        img: this.img ?? (this.img_[0] ? this.img_[0].name.replaceAll(' ', '_') : undefined),
        images: [...this.images, ...this.images_.map(image => image.name.replaceAll(' ', '_'))],
        attachments: {
          ...Object.fromEntries(this.images_.map(image => [image.name.replaceAll(' ', '_'), image])),
          ...(this.img_.length ? {[this.img_[0].name.replaceAll(' ', '_')]: this.img_[0]} : {})
        }
      });
      this.pending = false;
      this.$router.push("/admin/news");
    },
    async remove() {
      await removeNew(this.route.params.id);
      this.$router.push("/admin/news");
    }
  },
  watch: {
    description() {
      this.resizeTextArea(this.$refs.description as HTMLTextAreaElement);
    },
    fullText() {
      this.resizeTextArea(this.$refs.fullText as HTMLTextAreaElement);
    },
    img_() {
      if (this.img_.length > 0) {
        this.oldImg = this.img;
        this.img = undefined;
      }
      else {
        this.img = this.oldImg;
      }
    }
  },
  computed: {
    bg() {
      return this.$theme.bg;
    },
    route() {
      return Object(this.$router).currentRoute.value;
    },
    color() {
      return this.$theme.color;
    }
  },
  mounted() {
    (async () => {
      this.pending = true;
      let _new = await getNew(this.route.params.id);
      this.pending = false;
      if (!_new) return;
      let {title, description, fullText, images, img} = _new;
      this.title = title;
      this.description = description;
      this.fullText = fullText;
      this.images = images.map(image => {
        let split = image.split('/');
        return split[split.length - 1];
      });
      let split = img?.split('/');
      this.img = split ? split[split.length - 1] : undefined;
    })();
  }
})
</script>

<template>
  <main>
    <div>
      <Title text="Редактирование новости"/>
      <SuiInput v-model="title" placeholder="Заголовок"/>
      <textarea v-model="description" placeholder="Краткое описание (показывается на главной)" ref="description"/>
      <textarea v-model="fullText" placeholder="Текст новости" ref="fullText"/>
      <RemovableFileUrl v-if="img" :url="img" class="url"/>
      <SuiFileInput v-model="img_" accept="image/*">Выберите главное изображение (показывается на главной)</SuiFileInput>
      <RemovableFileUrl v-for="(image, index) in images" :url="image" @remove="images.splice(index, 1)"/>
      <SuiFileInput v-model="images_" multiple accept="image/*">Добавьте изображения для галереи</SuiFileInput>
      <SuiButton @click="removeModalOpened = true" color="red" border="red">Удалить</SuiButton>
    </div>
    <FixedButton :icon="doneIcon" @click="patch">Готово</FixedButton>
    <ProgressIndicator v-if="pending"/>
    <SuiModalWindow v-model:open="removeModalOpened">
      <Title text="Вы действительно хотите удалить?"/>
      <SuiButton @click="removeModalOpened = false" style="margin-right: 20px">Отмена</SuiButton>
      <SuiButton @click="remove" color="red" border="red">Удалить</SuiButton>
    </SuiModalWindow>
  </main>
</template>

<style scoped>
div {
  padding: 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  textarea {
    width: 96%;
    background: v-bind(bg);
    outline: none !important;
    border-radius: 15px;
    padding: 20px;
    resize: none;
  }
}
</style>