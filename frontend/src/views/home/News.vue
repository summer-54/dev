<template>
  <span v-if="page === undefined">
  <span class="news">
    <img :src="src" class="img">
    <span class="title">{{ title }}</span>
    <span class="comment">{{ comment }}</span>
  </span>
  </span>
  <span v-else>
    <RouterLink :to="page">
      <span class="news">
        <img :src="src" class="img">
        <span class="title">{{ title }}</span>
        <span class="comment">{{ comment }}</span>
      </span>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "News",
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
.news {
  display: flex;
  flex-direction: column;
  @media (min-width: 1274px){
    max-width: 275px;
  }
  @media (min-width: 1054px) and (max-width: 1274px){
    max-width: 230px;
  }
  @media (min-width: 854px) and (max-width: 1054px){
    max-width: 180px;
  }
  @media (min-width: 654px) and (max-width: 854px){
    max-width: 130px;
  }
  @media (max-width: 654px){
    max-width: 70px;
  }
}
.title {
  font-weight: bold;
}
.comment {
  text-align: justify;
}
.img {
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