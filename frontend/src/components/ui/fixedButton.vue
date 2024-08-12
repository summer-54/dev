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
  },
  computed: {
    color() {
      return this.$theme.color;
    }
  }
})
</script>

<template>
  <NavButton v-if="to" :to="to" :icon="icon" :class="$style.addButton"><slot/></NavButton>
  <IconButton v-else :icon="icon" :class="$style.addButton"><slot/></IconButton>
</template>

<style module>
.addButton {
  position: fixed !important;
  bottom: 20px;
  right: 20px;

  button {
    border: 2px solid v-bind(color);
  }
}
</style>