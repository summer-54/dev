<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "TestView",
  mounted() {
    console.log(this.route.params.id);
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
    }
  }
})
</script>

<template>
  <span>{{route.params.id}}</span>
</template>