<script lang="ts">
import {defineComponent} from 'vue'
import {getNews, type NewsType} from "@/api/news.js";
import News from "@/views/home/News.vue";
import Title from "@/components/Title.vue";
import IconButton from "@/components/ui/iconButton.vue";
import addIcon from "@/assets/add.svg";

export default defineComponent({
  name: "NewsSubView",
  components: {IconButton, Title, News},
  data() {
    return {
      news_count: 0,
      news_cur: [] as NewsType,
      news_amount: 0,
      searching: false,
      addIcon
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
    observer.observe(this.$refs.observer as HTMLElement);
  }
})
</script>

<template>
  <main>
    <Title text="Новости"/>
    <span class="container">
        <News v-for="{id, title, description, img} in news_cur" :src="img" :title="title" :comment="description" :page="'/admin/news/'+id"/>
      </span>
    <span class="observer" ref="observer"/>
    <IconButton :icon="addIcon" class="addButton">Добавить</IconButton>
  </main>
</template>

<style scoped>
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

.addButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 2px solid white;
}
</style>