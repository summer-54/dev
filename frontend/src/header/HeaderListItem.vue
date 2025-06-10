<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import type {RouteLocationRaw} from "vue-router";
import {colors} from "@/header/colors.js";

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
  </li>
</template>

<style scoped>
.ListItemHeading {
  line-height: 1.2;
  margin-bottom: 5px;
  color: v-bind(itemHeadingColor);
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

@media (hover: hover) {
  .ListItemLink:hover {
    background-color: v-bind(hoverColor);

    .ListItemHeading {
      color: v-bind(itemHeadingHoverColor);
    }

    .ListItemText {
      color: v-bind(itemTextHoverColor);
    }
  }
}

.ListItemLink:active {
  background-color: v-bind(hoverColor);

  .ListItemHeading {
    color: v-bind(itemHeadingHoverColor);
  }

  .ListItemText {
    color: v-bind(itemTextHoverColor);
  }
}
</style>