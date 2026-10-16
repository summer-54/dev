<script lang="ts" setup>
import {computed} from 'vue'
// import vAnimateOnScroll from 'primevue/animateonscroll';

const props = defineProps({
  animation: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
});

const delay_ = computed(() => {
  return props.delay + "ms";
})
</script>

<template>
  <span v-animate-on-scroll="{enterClass: $style[animation]}" class="span"><slot/></span>
</template>

<style scoped>
.span {
  display: inline-block;
  animation-delay: v-bind(delay_);
}
</style>

<style module>
@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.opacity {
  opacity: 0;
  animation: opacity 1.2s ease-out forwards;
}

@keyframes fadeLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fadeLeft {
  opacity: 0;
  animation: fadeLeft 0.8s ease-out forwards;
}

@keyframes fadeRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fadeRight {
  opacity: 0;
  animation: fadeRight 0.8s ease-out forwards;
}

@keyframes flip {
  from {
    transform: rotateY(90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0);
    opacity: 1;
  }
}

.flip {
  opacity: 0;
  animation: flip 1.2s ease-out forwards;
}
</style>