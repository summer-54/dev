<script lang="ts">
import {defineComponent} from "vue";
import News from "./News.vue";

export default defineComponent({
  name: "HomeView",
  components: {News},
  data() {
    return {
      news_list: [
        {src: "/public/favicon.ico", title: "Новый сайт7", comment: "А то сайт на Tilda был был был был был был был был был был был", page: "/news/7"},
        {src: "/public/favicon.ico", title: "Новый сайт6", comment: "А то сайт на Tilda был", page: "/news/6"},
        {src: "/public/favicon.ico", title: "Новый сайт5", comment: "А то сайт на Tilda был", page: "/news/5"},
        {src: "/public/favicon.ico", title: "Новый сайт4", comment: "А то сайт на Tilda был", page: "/news/4"},
        {src: "/public/favicon.ico", title: "Новый сайт3", comment: "А то сайт на Tilda был", page: "/news/3"},
        {src: "/public/favicon.ico", title: "Новый сайт2", comment: "А то сайт на Tilda был", page: "/news/2"},
        {src: "/public/favicon.ico", title: "Новый сайт1", comment: "А то сайт на Tilda был", page: "/news/1"}
      ], 
      news_count: 0,
      news_cur: [] as Array<{src: string, title: string, comment: string, page: string}>
    }
  },
  mounted(){
    const options = {
      rootMargin: "0px",
      threshold: 1.0
    }
    const news_at_once = 40;
    let global_this = this;
    const callback = function(entries: Array<IntersectionObserverEntry>){
      if(entries[0].isIntersecting){
        global_this.news_count += news_at_once;
        global_this.news_cur = [...global_this.news_cur, ...global_this.news_list.slice(global_this.news_count-news_at_once, global_this.news_count)];
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
    <span class="container">
      <News v-for="{src, title, comment, page} in news_cur" :src="src" :title="title" :comment="comment" :page="page" />
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