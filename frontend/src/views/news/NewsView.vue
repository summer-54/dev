<script lang="ts">
import {defineComponent} from "vue";
import {getNew, type NewType} from "@/api/news.js"
import Title from "@/components/Title.vue";
import Subtitle from "@/components/Subtitle.vue";
import ImageGallery from "@/components/ImageGallery.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import {isAdmin} from "@/api/users.js";
import IconButton from "@/components/ui/iconButton.vue";
import edit from "@/assets/edit.svg";

export default defineComponent({
  name: "NewsView",
  mounted() {
    this.pending = true;
    getNew(this.route.params.id).then(result=>{
      this.pending = false;
      if (result) this.news = result;
    }, ()=>{
      this.pending = false;
      this.err = true;
    });
    (async () => {
      if (await isAdmin()) this.admin = true;
    })();
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
    },
    date() {
      if(this.err) return undefined;
      return `${this.news.datetime.getDate()} ${["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][this.news.datetime.getMonth()]} ${this.news.datetime.getFullYear()}, ${this.news.datetime.getHours() < 10 ? "0" : ""}${this.news.datetime.getHours()}:${this.news.datetime.getMinutes() < 10 ? "0" : ""}${this.news.datetime.getMinutes()}`
    },
    images(): Array<{src: string, id: number}> {
      if(!("images" in this.news)) return [];
      let res = [] as Array<{src: string, id: number}>;
      for(let i = 0; i < this.news.images.length; i++){
        res[i] = {src: this.news.images[i], id: i};
      }
      return res;
    }
  },
  data() {
    return {
      news: {
        "id": 0,
        "datetime": new Date(),
        "title": "", 
        "description": "",
        "fullText": "",
        "img": "",
        "images": []
      } as NewType,
      err: false,
      pending: false,
      admin: false,
      edit
    }
  },
  methods: {
    editMethod() {
      this.$router.push(`/admin/news/${this.news.id}`);
    }
  },
  components: {ProgressIndicator, Title, Subtitle, ImageGallery, IconButton}
})
</script>

<template>
  <span class="allcont">
    <span v-if="err">Произошла ошибка. Убедитесь, что данная новость существует, и обновите страницу.</span>
    <ProgressIndicator v-else-if="pending"/>
    <span v-else>
      <span v-if="admin" class="edit">
        <IconButton :icon="edit" @click="editMethod()">Редактировать</IconButton>
      </span>
      <Title :text="news.title" />
      <span class="date"><img src="@/assets/clock.svg"><span>{{ date }}</span></span>
      <span class="text">
        {{ news.fullText }}
      </span>
      <span v-if="images.length > 0">
        <Subtitle style="text-align: center" text="Фотогалерея" />
        <ImageGallery :imgs_list="images" />
      </span>
    </span>
  </span>
</template>

<style scoped>
* {
  margin-left: 8px;
  margin-right: 8px;
  font-family: "LXGW WenKai Mono TC", monospace;
}
.date {
  display: flex;
  justify-content: end;
  font-size: 18px;
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 14px;
  }
}
.text {
  text-align: justify;
  font-size: 18px;
  word-break: break-all;
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 14px;
  }
}
.edit {
  display: flex;
  justify-content: flex-end;
}
</style>