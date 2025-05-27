<script setup lang="ts">
import {NavigationMenuIndicator, NavigationMenuList, NavigationMenuRoot, NavigationMenuViewport} from "radix-vue";
import {computed, ref} from "vue";

const colors = ref({
  bg: "#2c2c2c",
  hoverColor: "#154311" // 3
});

const bgColor = computed(() => colors.value.bg), hoverColor = computed(() => colors.value.hoverColor);

const currentTrigger = ref("");
</script>

<template>
  <NavigationMenuRoot
      v-model="currentTrigger"
      :class="$style.NavigationMenuRoot"
  >
    <NavigationMenuList :class="[$style.NavigationMenuList, $style.flex]">
      <slot/>

      <NavigationMenuIndicator
          :class="$style.NavigationMenuIndicator"
      >
        <div :class="$style.Arrow" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div :class="$style.ViewportPosition">
      <NavigationMenuViewport
          :class="$style.NavigationMenuViewport"
      />
    </div>
  </NavigationMenuRoot>
</template>

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
  background-color: v-bind(bgColor);
  padding: 4px;
  border-radius: 6px;
  list-style: none;
  box-shadow: 0 2px 10px var(--black-a7);
  margin: 0;
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
  background-color: v-bind(bgColor);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  height: var(--radix-navigation-menu-viewport-height);
  transition: width, height, 300ms ease;
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
  background-color: v-bind(bgColor);
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