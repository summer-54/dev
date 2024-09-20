<template>
  <main>
    <Title text="Летняя школа программирования" />
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Title from '@/components/Title.vue';

export default defineComponent({
  name: "SummerCamp",
  components: {Title}
})
</script>