<template>
  <span class="imageGallery">
    <span class="arrow" v-if="imgs_list.length > 1"><img v-on:click="previous()" src="../assets/icons/left.svg" alt="prev"></span>
    <span class="img_container">
      <span v-for="item in imgs_list" :key="item.id">
        <Transition :name="left ? 'left' : 'right'">
          <span class="img_gallery" v-if="item.id === cur">
            <img :src="item.src" alt="image">
          </span>
        </Transition>
      </span>
    </span>
    <span class="arrow" v-if="imgs_list.length > 1"><img v-on:click="next()" src="../assets/icons/right.svg" alt="next"></span>
  </span>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";

const props = defineProps({
  imgs_list: {
    type: Array<{src: string, id: number}>,
    required: true
  }
});

const cur = ref(0);
const left = ref(false);

function previous() {
  left.value = false;
  cur.value += props.imgs_list.length - 1;
  cur.value %= props.imgs_list.length;
}

function next() {
  left.value = true;
  cur.value++;
  cur.value %= props.imgs_list.length;
}

const length = computed(() => {
  return window.matchMedia("(min-width: 1200px)").matches ? 600 :
    window.matchMedia("(min-width: 800px) and (max-width: 1200px)").matches ? 400 :
    window.matchMedia("(min-width: 500px) and (max-width: 800px)").matches ? 250 : 150;
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
  img {
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
  }

  position: absolute;
}
.img_gallery, .img_container {
  img {
    @media (min-width: 1200px) {
      width: 600px;
    }
    @media (min-width: 800px) and (max-width: 1200px) {
      width: 400px;
    }
    @media (min-width: 500px) and (max-width: 800px) {
      width: 250px;
    }
    @media (max-width: 500px) {
      width: 150px;
    }
  }

  @media (min-width: 1200px) {
    height: 600px;
    width: 600px;
  }
  @media (min-width: 800px) and (max-width: 1200px) {
    height: 400px;
    width: 400px;
  }
  @media (min-width: 500px) and (max-width: 800px) {
    height: 250px;
    width: 250px;
  }
  @media (max-width: 500px) {
    height: 150px;
    width: 150px;
  }
}
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: transform 0.5s ease;
}
.left-enter-from, .right-leave-to {
  transform: translateX(200vw);
}
.left-leave-to, .right-enter-from {
  transform: translateX(-200vw);
}
</style>