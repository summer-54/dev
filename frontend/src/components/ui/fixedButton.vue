<script lang="ts">
import {defineComponent} from 'vue'
import NavButton from "@/components/ui/navButton.vue";
import IconButton from "@/components/ui/iconButton.vue";

export default defineComponent({
  name: "fixedButton",
  components: {IconButton, NavButton},
  props: {
    icon: {
      type: String,
      required: true
    },
    to: {
      type: String
    },
    noText: {
      type: Boolean,
      default: false
    },
    notInvert: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: ""
    }
  }
})
</script>

<template>
  <NavButton v-if="to" :to="to" :icon="icon" :class="[$style.addButton, $style.navButton]"><slot/></NavButton>
  <IconButton v-else :icon="icon" :class="[$style.addButton, $style.iconButton]"><slot/></IconButton>
</template>

<style module>
.addButton {
  position: fixed !important;
  bottom: 20px;
  right: 20px;
}

/*.navButton button {
  border: 2px solid v-bind(color);
}

.iconButton {
  border: 2px solid v-bind(color) !important;

  @media (hover: hover) {
    &[data-v-95bbf38c]:hover {
      border-radius: 32px;
      transform: scale(1.4);
      border: v-bind(border) solid 2px !important;
    }
  }
}*/
</style>