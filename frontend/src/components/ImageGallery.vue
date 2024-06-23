<template>
  <span class="imageGallery">
    <span class="arrow"><img v-on:click="previous()" src="@/assets/left.svg" alt="prev"></span>
    <span class="img_container">
      <span v-for="item in imgs_list" :key="item.id">
        <Transition><img class="img_gallery" :src="item.src" v-if="item.id === cur" alt="image"></Transition>
      </span>
    </span>
    <span class="arrow"><img v-on:click="next()" src="@/assets/right.svg" alt="next"></span>
  </span>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ImageGallery",
  props: {
    imgs_list: {
      type: Array<{src: string, id: number}>,
      required: true
    }
  },
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
  overflow: hidden;
}
.img_container {
  margin: auto;
  position: relative;
}
.arrow {
  display: inline-block;
  margin: auto;
  cursor: pointer;
  width: 100px;

  img {
    width: 100%;
  }
}
.img_gallery {
  @media (min-width: 1200px){
    border-radius: 200px;
  }
  @media (min-width: 800px) and (max-width: 1200px) {
    border-radius: 150px;
  }
  @media (min-width: 500px) and (max-width: 800px){
    border-radius: 100px;
  }
  @media (max-width: 500px){
    border-radius: 65px;
  }
  position: absolute;
}
.img_gallery, .img_container {
  @media (min-width: 1200px){
    height: 600px;
    width: 600px;
  }
  @media (min-width: 800px) and (max-width: 1200px) {
    height: 400px;
    width: 400px;
  }
  @media (min-width: 500px) and (max-width: 800px){
    height: 250px;
    width: 250px;
  }
  @media (max-width: 500px){
    height: 150px;
    width: 150px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}
.v-enter-from {
  transform: translateX(200vw);
}
.v-leave-to {
  transform: translateX(-200vw);
}
</style>