<script lang="ts">
import {defineComponent} from 'vue'
import AnimateOnScroll from 'primevue/animateonscroll';

export default defineComponent({
  name: "animation",
  directives: {AnimateOnScroll},
  props: {
    animation: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    delay_() {
      return this.delay + "ms";
    }
  }
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