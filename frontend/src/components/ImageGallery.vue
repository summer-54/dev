<template>
  <span class="imageGallery">
    <span class="arrow"><img v-on:click="previous()" src="./../../assets/left.png"></span>
    <span class="img_container">
      <span v-for="item in imgs_list" :id="item.id">
        <img class="img_gallery" :src="item.src" v-if="item.id == cur">
      </span>
    </span>
    <span class="arrow"><img v-on:click="next()" src="./../../assets/right.png"></span>
  </span>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ImageGallery",
  props: ["imgs_list"],
  data(){
    return {
      cur: 0
    }
  },
  methods: {
    previous(){
      this.cur += this.imgs_list.length-1;
      this.cur %= this.imgs_list.length;
    },
    next(){
      this.cur++;
      this.cur %= this.imgs_list.length;
    }
  }
});
</script>

<style scoped>
.imageGallery {
  display: flex;
  justify-content: space-around;
}
.img_container {
  margin: auto;
}
.arrow {
  margin: auto;
  cursor: pointer;
}
.img_gallery {
  @media (min-width: 1200px){
    width: 600px;
  }
  @media (min-width: 800px) and (max-width: 1200px) {
    width: 400px;
  }
  @media (min-width: 500px) and (max-width: 800px){
    width: 250px;
  }
  @media (max-width: 500px){
    width: 150px;
  }
}
</style>