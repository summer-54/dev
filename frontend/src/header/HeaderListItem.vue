<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import type {RouteLocationRaw} from "vue-router";

const props = defineProps({
  title: String,
  navigateTo: Object as PropType<RouteLocationRaw>
})

const colors = ref({
  bg: "#2c2c2c",
  hoverColor: "#154311" // 3
});

const hoverColor = computed(() => colors.value.hoverColor);
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
.ListItemLink:focus {
  box-shadow: 0 0 0 2px var(--grass-7);
}
.ListItemLink:hover {
  background-color: v-bind(hoverColor);
}

.ListItemHeading {
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 5px;
  color: #138900;
}

.ListItemText {
  line-height: 1.4;
  font-weight: initial;
}
</style>