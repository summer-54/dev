<script setup lang="ts">
import { NavigationMenuLink } from 'radix-vue'
import {computed, type PropType} from "vue";

const props = defineProps({
  title: String,
  colors: {
    type: Object as PropType<{hoverColor: string}>,
    required: true
  }
})

const hoverColor = computed(() => props.colors.hoverColor);
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
          v-bind="$attrs"
          class="ListItemLink"
      >
        <div class="ListItemHeading">
          {{ props.title }}
        </div>
        <p class="ListItemText">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
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
  transition: background-color 2000ms ease-in-out;
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
  color: var(--mauve-11);
  line-height: 1.4;
  font-weight: initial;
}
</style>