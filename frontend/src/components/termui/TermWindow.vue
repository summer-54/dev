<script setup lang="ts">
import {onMounted, ref} from "vue";

defineProps({
  noHeader: {
    type: Boolean,
    default: false
  },
  prompt: String
});

const h = ref("");
const v = ref("");

onMounted(() => {
  for (let i = 0; i < 1000; i++) {
    h.value += '—';
    v.value += "|";
  }
});
</script>

<template>
<section>
  <span class="border border-top">{{h}}</span>
  <span class="border border-left">{{v}}</span>
  <span class="border border-right">{{v}}</span>
  <span class="border border-bottom">{{h}}</span>

  <span class="border corner corner-top-left">┌</span>
  <span class="border corner corner-top-right">┐</span>
  <span class="border corner corner-bottom-left">└</span>
  <span class="border corner corner-bottom-right">┘</span>

  <div class="prompt" v-if="prompt">{{prompt}}</div>
  <div class="header" v-if="!noHeader">
    <slot name="header"/>
  </div>
  <div class="content">
    <slot/>
  </div>
</section>
</template>

<style scoped>
section {
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0 0 5px #95EAA7FF;
  border-radius: 5px;
  outline-offset: -5px;
  position: relative;
  overflow: hidden;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;

  .header {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
    margin-top: 10px;
  }

  .prompt {
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
  }

  .content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .border {
    position: absolute;
    font-size: 16px;
    letter-spacing: 5px;
    color: #95EAA7FF;
    //text-shadow: 0 0 5px #95EAA7FF, 0 0 10px #95EAA7FF;
  }

  .border-right, .border-left {
    writing-mode: vertical-rl;
    text-orientation: upright;

    top: 18px;
  }

  .border-top, .border-bottom {
    left: 15px;
  }

  .border-left {
    left: -5px;
  }

  .border-top {
    top: -5px;
  }

  .border-right {
    right: -5px;
  }

  .border-bottom {
    bottom: -5px;
  }

  .corner {
    background-color: rgb(18, 18, 18);
  }

  .corner-top-left {
    top: -5px;
    left: 0;
    border-bottom-right-radius: 10px;
  }

  .corner-top-right {
    top: -5px;
    right: -5px;
    border-bottom-left-radius: 10px;
  }

  .corner-bottom-left {
    bottom: -5px;
    left: 0;
    border-top-right-radius: 10px;
  }

  .corner-bottom-right {
    bottom: -5px;
    right: -5px;
    border-top-left-radius: 10px;
  }
}
</style>