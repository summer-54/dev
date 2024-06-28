<script lang="ts">
import {defineComponent} from "vue";
import News from "./News.vue";
import {getNews, type NewsType} from "@/api";
import Title from "@/components/Title.vue";

export default defineComponent({
  name: "HomeView",
  components: {News, Title},
  data() {
    return {
      news_count: 0,
      news_cur: [] as NewsType,
      news_amount: 0
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
    <Title text="Новости" />
    <span class="container">
      <News v-for="{id, title, description, img} in news_cur" :src="img" :title="title" :comment="description" :page="'/news/'+id" />
    </span>
    <span class="observer" ref="observer"></span>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.observer {
  display: block;
  height: 30px;
}
</style>