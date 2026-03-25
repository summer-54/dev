<script setup lang="ts">
import {NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger} from "radix-vue";
import {computed, type PropType} from "vue";
import type {RouteLocationRaw} from "vue-router";
import {colors} from "./colors.js";

const props = defineProps({
  navigateTo: Object as PropType<RouteLocationRaw | string>,
  contentLess: {
    type: Boolean,
    default: false
  }
});

const hoverColor = computed(() => colors.value.hoverColor);
</script>

<template>
  <NavigationMenuItem v-if="!contentLess">
    <RouterLink v-if="navigateTo" :to="navigateTo" :class="$style.routerLink">
      <NavigationMenuTrigger :class="$style.NavigationMenuTrigger">
        <span :class="[$style.bracket, $style['bracket-left']]"></span>
        <span :class="$style.prompt">&gt;</span>
        <span :class="$style.heading"><slot name="heading"/></span>
        <span :class="[$style.bracket, $style['bracket-right']]"></span>
      </NavigationMenuTrigger>
    </RouterLink>
    <NavigationMenuTrigger v-else :class="$style.NavigationMenuTrigger">
      <span :class="[$style.bracket, $style['bracket-left']]"></span>
      <span :class="$style.prompt">&gt;</span>
      <span :class="$style.heading"><slot name="heading"/></span>
      <span :class="[$style.bracket, $style['bracket-right']]"></span>
    </NavigationMenuTrigger>
    <NavigationMenuContent :class="$style.NavigationMenuContent" style="max-width: 30vw;">
      <slot/>
    </NavigationMenuContent>
  </NavigationMenuItem>
  <NavigationMenuItem v-else-if="!navigateTo" :class="$style.NavigationMenuTrigger">
    <span :class="[$style.bracket, $style['bracket-left']]"></span>
    <span :class="$style.prompt">&gt;</span>
    <span :class="$style.heading"><slot name="heading"/></span>
    <span :class="[$style.bracket, $style['bracket-right']]"></span>
  </NavigationMenuItem>
  <NavigationMenuItem v-else>
    <RouterLink :to="navigateTo" :class="$style.NavigationMenuTrigger">
      <span :class="[$style.bracket, $style['bracket-left']]"></span>
      <span :class="$style.prompt">&gt;</span>
      <span :class="$style.heading"><slot name="heading"/></span>
      <span :class="[$style.bracket, $style['bracket-right']]"></span>
    </RouterLink>
  </NavigationMenuItem>
</template>

<style module>
.bracket {
  border: 2px solid #95EAA7FF;
}

.bracket {
  width: 5px;
  height: 40px;
  opacity: 0.6;
  position: absolute;
  transition: all ease-in-out 0.2s;
}

.bracket-left {
  border-right: none;
  left: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.bracket-right {
  border-left: none;
  right: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.routerLink {
  text-decoration: none;
}

.NavigationMenuTrigger {
  all: unset;

  padding: 8px 20px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 10px;
  font-size: 15px;
  transition: background-color .6s ease-in-out;

  position: relative;

  .prompt {
    position: absolute;
    opacity: 0;
    transition: all .2s ease-in-out;
    transform: rotate(90deg);
  }

  .heading {
    transition: all .2s ease-in-out;
  }

  .bracket {
    opacity: 0;
  }
}

.NavigationMenuTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.NavigationMenuTrigger:hover {
  * {
    color: #95EAA7FF;
    img {
      filter: brightness(0) saturate(100%) invert(86%) sepia(32%) saturate(478%) hue-rotate(71deg) brightness(99%) contrast(85%);
    }
  }

  .prompt {
    opacity: 1;
    transform: translateX(-10px) rotate(0);
  }

  .heading {
    transform: translateX(10px);
  }

  .bracket {
    opacity: 1;
  }
}

.NavigationMenuLink span {
  display: block;
  text-decoration: none;
  font-size: 15px;
  line-height: 1;
}

.NavigationMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation-duration: 250ms;
  animation-timing-function: ease;
}
.NavigationMenuContent[data-motion='from-start'] {
  animation-name: enterFromLeft;
}
.NavigationMenuContent[data-motion='from-end'] {
  animation-name: enterFromRight;
}
.NavigationMenuContent[data-motion='to-start'] {
  animation-name: exitToLeft;
}
.NavigationMenuContent[data-motion='to-end'] {
  animation-name: exitToRight;
}
@media only screen and (min-width: 600px) {
  .NavigationMenuContent {
    width: auto;
  }
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: rotateX(-30deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotateX(-10deg) scale(0.95);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>