<script lang="ts">
import {defineComponent} from 'vue'
import removeIcon from "@/assets/remove.svg";
import IconButton from "@/components/ui/iconButton.vue";

export default defineComponent({
  name: "RemovableFileUrl",
  components: {IconButton},
  props: {
    url: {
      type: String,
      required: true
    }
  },
  emits: ["remove"],
  data() {
    return {removeIcon};
  }
})
</script>

<template>
  <div>
    <span>{{url}}</span>
    <IconButton :icon="removeIcon" noText @click="$emit('remove')"/>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row !important;

  button {
    flex-grow: 0;
  }
}
</style>