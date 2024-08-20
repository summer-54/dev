<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "TestView",
  mounted() {
    let connection = new WebSocket(`ws://localhost/api/ws/news`);
    connection.onmessage = (e: MessageEvent) => {
      console.log(e);
    }
  }
})
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>