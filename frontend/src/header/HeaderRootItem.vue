<script setup lang="ts">
import {NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger} from "radix-vue";
import {computed, type PropType, ref} from "vue";
import type {RouteLocationRaw} from "vue-router";
import {colors} from "@/header/colors.js";

const props = defineProps({
  navigateTo: Object as PropType<RouteLocationRaw>,
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
        <slot name="heading"/>
      </NavigationMenuTrigger>
    </RouterLink>
    <NavigationMenuTrigger v-else :class="$style.NavigationMenuTrigger">
      <slot name="heading"/>
    </NavigationMenuTrigger>
    <NavigationMenuContent :class="$style.NavigationMenuContent" style="max-width: 30vw;">
      <slot/>
    </NavigationMenuContent>
  </NavigationMenuItem>
  <NavigationMenuItem v-else-if="!navigateTo" :class="$style.NavigationMenuTrigger">
    <slot name="heading"/>
  </NavigationMenuItem>
  <NavigationMenuItem v-else>
    <RouterLink :to="navigateTo" :class="$style.NavigationMenuTrigger">
      <slot name="heading"/>
    </RouterLink>
  </NavigationMenuItem>
</template>

<style module>
.routerLink {
  text-decoration: none;
}

.NavigationMenuTrigger,
.NavigationMenuLink {
  all: unset;

  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  font-size: 15px;
  color: #138900;
  transition: background-color 0.6s ease-in-out;
}
.NavigationMenuTrigger:focus,
.NavigationMenuLink:focus {
  box-shadow: 0 0 0 2px var(--grass-7); /**/
}
.NavigationMenuTrigger:hover,
.NavigationMenuLink:hover {
  background-color: v-bind(hoverColor);
}

.NavigationMenuTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.NavigationMenuLink, .NavigationMenuLink span {
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