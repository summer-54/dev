<script lang="ts">
import {defineComponent} from "vue";
import {getNew} from "@/api"
import Title from "@/components/Title.vue";

export default defineComponent({
  name: "NewsView",
  mounted() {
    console.log(this.route.params.id);
    getNew(this.route.params.id).then(result=>{
      this.news = result;
    }, ()=>{
      this.err = true;
    });
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
    },
    date() {
      if(this.err) return undefined;
      return `${this.news.datetime.getDate()} ${["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][this.news.datetime.getMonth()]} ${this.news.datetime.getFullYear()} ${this.news.datetime.getHours()}:${this.news.datetime.getMinutes()}`
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
        "img": ""
      },
      err: false
    }
  },
  components: {Title}
})
</script>

<template>
  <span class="allcont">
    <span v-if="err">Произошла ошибка. Убедитесь, что данная новость существует, и обновите страницу.</span>
    <span v-else>
      <Title :text="news.title" />
      <span class="date"><img src="@/assets/clock.svg"><span>{{ date }}</span></span>
      <span class="text">
        {{ news.fullText }}
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
  @media (min-width: 530px) and (max-width: 940px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 14px;
  }
}
</style>