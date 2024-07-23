<script lang="ts">
import {defineComponent} from 'vue'
import { YoutubeIframe } from '@vue-youtube/component';

export default defineComponent({
  name: "TestView",
  components: {YoutubeIframe}
})
</script>

<template>
<youtube-iframe video-id="jvEdVcos6Ms" />
</template>

<style scoped>

</style>