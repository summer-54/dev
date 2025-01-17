<template>
  <main>

  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "RecoveryView",
  components: {},
  data() {
    return {
      pending: false,
      done: false,
      failed: false
    }
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
    }
  }
});
</script>