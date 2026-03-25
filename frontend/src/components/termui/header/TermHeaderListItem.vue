<script setup lang="ts">
import {computed, type PropType} from "vue";
import type {RouteLocationRaw} from "vue-router";
import {colors} from "./colors.js";

const props = defineProps({
  title: String,
  navigateTo: Object as PropType<RouteLocationRaw>
});

const hoverColor = computed(() => colors.value.hoverColor),
    itemHeadingColor = computed(() => colors.value.itemHeadingColor),
    itemHeadingHoverColor = computed(() => colors.value.itemHeadingHoverColor),
    itemTextColor = computed(() => colors.value.itemTextColor),
    itemTextHoverColor = computed(() => colors.value.itemTextHoverColor);
</script>

<template>
  <li>
    <span class="bracket bracket-left"></span>
<!--    <NavigationMenuLink as-child>-->
    <RouterLink v-if="navigateTo" :to="navigateTo" class="ListItemLink">
      <div class="ListItemHeading">
        {{ props.title }}
      </div>
      <p class="ListItemText">
        <slot/>
      </p>
    </RouterLink>
    <button v-else class="ListItemLink">
      <div class="ListItemHeading">
        {{ props.title }}
      </div>
      <p class="ListItemText">
        <slot/>
      </p>
    </button>
<!--    </NavigationMenuLink>-->
    <span class="bracket bracket-right"></span>
  </li>
</template>

<style scoped>
.ListItemHeading {
  line-height: 1.2;
  margin-bottom: 5px;
  color: #95EAA7FF;
  transition: color 0.6s ease-in-out;
  font-weight: bold;
}

.ListItemText {
  line-height: 1.4;
  font-weight: initial;
  color: v-bind(itemTextColor);
  transition: color 0.6s ease-in-out;
}

.ListItemLink {
  display: block;
  outline: none;
  text-decoration: none;
  user-select: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  line-height: 1;
  transition: background-color 0.6s ease-in-out;
  background-color: transparent;
  border: none;
  width: 100%;
  text-align: left;
}

.ListItemLink:focus-visible {
  box-shadow: 0 0 0 2px var(--grass-7);
}

li {
  position: relative;
  display: flex;
}

.bracket {
  border: 2px solid #95EAA7FF;
}

.bracket {
  width: 5px;
  opacity: 0;
  position: absolute;
  transition: all ease-in-out 0.2s;
  top: 50%;
  transform: translateY(-50%);
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
  height: 100%;
  box-sizing: border-box;
}

.bracket-left {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.bracket-right {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

li:hover {
  .bracket {
    opacity: 1;
    height: calc(100% + 10px);
  }

  .bracket-left {
    left: -8px;
  }

  .bracket-right {
    right: -8px;
  }
}
</style>