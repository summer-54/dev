<script lang="ts" setup>
import {onMounted, ref} from "vue";
import News from "./News.vue";
import {getNews, type NewsType, websocketNews} from "@/api/news.js";
import Title from "@/components/Title.vue";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
import searchIcon from "@/assets/icons/search.svg"
import UsersSearch from "@/views/home/UsersSearch.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import TermBG from "@/components/termui/TermBG.vue";

const observerElem = ref<HTMLSpanElement>();

const news_count = ref(0);
const news_cur = ref<NewsType>([]);
const news_amount = ref(0);
const searching = ref(false);

onMounted(() => {
  const options = {
    rootMargin: "0px",
    threshold: 1.0
  }
  getNews().then(data => {
    news_amount.value = data.length;
  }, () => {
    news_amount.value = 0;
    console.log("Cannot get news");
  });
  const news_at_once = 40;
  const callback = function(entries: Array<IntersectionObserverEntry>){
    if(entries[0].isIntersecting){
      news_count.value += news_at_once;
      getNews(news_count.value, Math.max(0, news_amount.value - news_count.value + 1)).then(data => {
        news_cur.value = data
      });
    }
  }
  const observer = new IntersectionObserver(callback, options);
  observer.observe(observerElem.value as HTMLSpanElement);
  websocketNews(article => {
    if (news_cur.value.map(({id}) => id).includes(article.id)) news_cur.value[news_cur.value.findIndex(({id}) => id === article.id) ?? 0] = article;
    else news_cur.value.unshift(article);
  }, ID => {
    news_cur.value = news_cur.value.filter(({id}) => id !== ID);
  });
});
</script>

<template>
  <main>
    <div>
      <Title text="Новости"/>
      <span class="container">
        <News v-for="{id, title, description, img} in news_cur" :src="img" :title="title" :comment="description" :page="'/news/'+id"/>
      </span>
      <span class="observerElem" ref="observerElem"/>
    </div>
    <SuiButton @click="$event.stopPropagation(); searching = true" v-if="!searching"><ThemeInvertSvg :src="searchIcon" alt="search"/></SuiButton>
    <UsersSearch v-model:searching="searching"/>
    <ProgressIndicator v-if="!news_cur.length"/>
    <TermBG/>
  </main>
</template>

<style scoped>
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
    position: fixed;
    right: 20px;
    top: 120px;
    
    @media (max-width: 625px) {
      top: 80px;
    }

    @media (max-width: 420px) {
      top: 95px;
    }
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

.observerElem {
  display: block;
  height: 30px;
}
</style>