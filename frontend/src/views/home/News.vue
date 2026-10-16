<template>
  <span class="all_new" v-if="!page">
    <span class="news">
      <span class="title" v-html="title"></span>
      <img :src="src" class="img">
      <span class="comment" v-html="comment"></span>
    </span>
  </span>
  <span class="all_new" v-else>
    <RouterLink :to="page">
      <TermButton transform="1.2">
        <span class="news">
          <span class="title" v-html="title"></span>
          <img :src="src" class="img">
          <span class="comment" v-html="comment"></span>
        </span>
      </TermButton>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TermButton from "@/components/termui/TermButton.vue";

export default defineComponent({
  name: "News",
  components: {TermButton},
  props: {
    src: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String
    },
    page: {
      type: String
    }
  }
});
</script>

<style scoped>
.all_new {
  margin-top: 50px;
}
.news {
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (min-width: 1054px){
    max-width: 30em;
  }
  @media (min-width: 654px) and (max-width: 1054px){
    max-width: 40em;
  }
  @media (max-width: 654px){
    max-width: 80em;
  }
}
.title {
  font-weight: bold;
}
.comment {
  text-align: justify;
}
.img {
  border-radius: 10px;

  @media (min-width: 1274px){
    width: 275px;
  }
  @media (min-width: 1054px) and (max-width: 1274px){
    width: 230px;
  }
  @media (min-width: 854px) and (max-width: 1054px){
    width: 180px;
  }
  @media (min-width: 654px) and (max-width: 854px){
    width: 130px;
  }
  @media (max-width: 654px){
    width: 70px;
  }
}
* {
  text-decoration: none;
}
</style>