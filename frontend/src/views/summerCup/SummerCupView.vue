<script lang="ts">
import {defineComponent} from "vue";
import Subtitle from "@/components/Subtitle.vue";
import QA_container from "@/components/QA_container.vue";
import Title from "@/components/Title.vue";

export default defineComponent({
  name: "SummerCupView",
  components: {Subtitle, QA_container, Title}
})
</script>

<template>
  <main>
    <Title text="Летний кубок по программированию"></Title>
  </main>
</template>

<style scoped>

</style>