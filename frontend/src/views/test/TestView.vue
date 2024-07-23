<script lang="ts">
import {defineComponent} from 'vue'
import { YoutubeIframe } from '@vue-youtube/component';

export default defineComponent({
  name: "TestView",
  components: {YoutubeIframe}
})
</script>

<template>
  <div>
    <youtube-iframe video-id="jvEdVcos6Ms" />
  </div>
</template>

<style scoped>

</style>