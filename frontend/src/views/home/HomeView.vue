<script lang="ts">
import {defineComponent} from "vue";
import News from "./News.vue";
import {getNews, type NewsType} from "@/api/news.js";
import Title from "@/components/Title.vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";

export default defineComponent({
  name: "HomeView",
  components: {News, Title, SuiInput, SuiButton},
  data() {
    return {
      news_count: 0,
      news_cur: [] as NewsType,
      news_amount: 0,
      searchText: ""
    }
  },
  methods: {
    updateSearch(event: Event){
      // @ts-ignore
      this.searchText = event?.target?.value
    },
    search(){
      this.$router.push(`/search/${this.searchText}`);
    }
  },
  mounted(){
    const options = {
      rootMargin: "0px",
      threshold: 1.0
    }
    let global_this = this;
    getNews().then(data=>{
      global_this.news_amount = data.length;
    }, () => {
      global_this.news_amount = 0;
      console.log("Cannot get news");
    });
    const news_at_once = 40;
    const callback = function(entries: Array<IntersectionObserverEntry>){
      if(entries[0].isIntersecting){
        global_this.news_count += news_at_once;
        getNews(global_this.news_count, Math.max(0, global_this.news_amount-global_this.news_count+1)).then(data=>{
          global_this.news_cur = data
        });
      }
    }
    const observer = new IntersectionObserver(callback, options);
    // @ts-ignore
    observer.observe(this.$refs.observer as HTMLElement);
  }
})
</script>

<template>
  <main>
    <div class="search">
      <SuiInput :value="searchText" @input="updateSearch" border="#9297FB" placeholder="Поиск пользователей" />
      <SuiButton @click="search"><img src="@/assets/search.svg"></SuiButton>
    </div>
    <Title text="Новости" />
    <span class="container">
      <News v-for="{id, title, description, img} in news_cur" :src="img" :title="title" :comment="description" :page="'/news/'+id" />
    </span>
    <span class="observer" ref="observer"></span>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}
.container {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}
.observer {
  display: block;
  height: 30px;
}
.search {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  padding-top: 20px;
  gap: 20px;
}
</style>