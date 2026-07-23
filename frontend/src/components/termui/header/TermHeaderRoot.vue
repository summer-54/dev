<script setup lang="ts">
import {NavigationMenuIndicator, NavigationMenuList, NavigationMenuRoot, NavigationMenuViewport} from "radix-vue";
import {computed, ref} from "vue";
import {colors} from "./colors.js";

const primaryColor = computed(() => colors.value.primaryColor);

const currentTrigger = ref("");
</script>

<template>
  <NavigationMenuRoot
      v-model="currentTrigger"
      :class="$style.NavigationMenuRoot"
  >
    <NavigationMenuList :class="[$style.NavigationMenuList, $style.flex]">
      <span class="bracket bracket-left"></span>
      <slot/>

      <NavigationMenuIndicator :class="$style.NavigationMenuIndicator">
        <div :class="$style.Arrow" />
      </NavigationMenuIndicator>
      <span class="bracket bracket-right"></span>
    </NavigationMenuList>

    <div :class="$style.ViewportPosition">
      <NavigationMenuViewport
          :class="$style.NavigationMenuViewport"
      />
    </div>
  </NavigationMenuRoot>
</template>

<style scoped>
.bracket {
  border: 2px solid v-bind(primaryColor);
}

.bracket-left {
  border-right: none;
}

.bracket-right {
  border-left: none;
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
}

.bracket-right {
  border-left: none;
  right: 0;
}

.bracket {
  height: 60px;
}

.bracket-left {
  left: -8px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.bracket-right {
  right: -8px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>

<style module>
.flex {
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: row;
}

.NavigationMenuRoot {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  z-index: 1;
}

.NavigationMenuList {
  display: flex;
  justify-content: center;
  padding: 4px;
  border-radius: 5px;
  list-style: none;
  border: 1px solid #95EAA730;
  background: rgba(96, 151, 109, 0.1);
  backdrop-filter: blur(22px) saturate(180%);
  margin: 0;
  transition: background-color .6s, color .6s;
}

.NavigationMenuIndicator {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width, transform 250ms ease;
}
.NavigationMenuIndicator[data-state='visible'] {
  animation: fadeIn 200ms ease;
}
.NavigationMenuIndicator[data-state='hidden'] {
  animation: fadeOut 200ms ease;
}

.NavigationMenuViewport {
  position: relative;
  transform-origin: top center;
  margin-top: 10px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  height: var(--radix-navigation-menu-viewport-height);
  transition: width, height, 300ms ease;
  border: 1px solid #95EAA730;
  background:
      linear-gradient(oklch(0 0 0 / 0.04) 1px, transparent 1px),
      linear-gradient(90deg, oklch(0 0 0 / 0.04) 1px, transparent 1px),
      white;
  background-size: 46px 46px;
}

:global(.dark) .NavigationMenuViewport {
  background:
      linear-gradient(oklch(1 0 0 / 0.022) 1px, transparent 1px),
      linear-gradient(90deg, oklch(1 0 0 / 0.022) 1px, transparent 1px),
      rgb(18, 18, 18);
  background-size: 46px 46px;
}

.NavigationMenuViewport[data-state='open'] {
  animation: scaleIn 200ms ease;
}
.NavigationMenuViewport[data-state='closed'] {
  animation: scaleOut 200ms ease;
}
@media only screen and (min-width: 600px) {
  .NavigationMenuViewport {
    width: var(--radix-navigation-menu-viewport-width);
  }
}

.ViewportPosition {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 100%;
  left: 0;
  perspective: 2000px;
}

.Arrow {
  position: relative;
  top: 70%;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  border-top-left-radius: 2px;
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