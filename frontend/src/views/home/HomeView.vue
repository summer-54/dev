<script lang="ts">
import {defineComponent} from "vue";
import News from "./News.vue";
import {getNews, type NewsType} from "@/api/news.js";
import Title from "@/components/Title.vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
import searchIcon from "@/assets/search.svg"
import UsersSearch from "@/views/home/UsersSearch.vue";

export default defineComponent({
  name: "HomeView",
  components: {UsersSearch, ThemeInvertSvg, News, Title, SuiInput, SuiButton},
  data() {
    return {
      news_count: 0,
      news_cur: [] as NewsType,
      news_amount: 0,
      searching: false,
      searchIcon
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
    <div>
      <Title text="Новости"/>
      <span class="container">
        <News v-for="{id, title, description, img} in news_cur" :src="img" :title="title" :comment="description" :page="'/news/'+id"/>
      </span>
      <span class="observer" ref="observer"></span>
    </div>
    <SuiButton @click="searching = true" v-if="!searching"><ThemeInvertSvg :src="searchIcon" alt="search"/></SuiButton>
    <UsersSearch v-model:searching="searching"/>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

main {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  
  @media (max-width: 764px) {
    flex-direction: column-reverse;
    align-items: center;
  }

  div:nth-child(1) {
    flex-grow: 1;
    transition: width .5s;
  }

  > button {
    position: absolute;
    right: 20px;
    margin-top: 20px;
  }
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
</style>