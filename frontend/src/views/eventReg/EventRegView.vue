<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type Event, getEvent} from "@/api/events.js";
import {useRoute} from "vue-router";

const route = useRoute();

const event = ref<Event | null | false>(null);
const pending = ref<boolean>(true);

onMounted(async () => {
  event.value = await getEvent(route.params.id.toString());
  pending.value = false;
});
</script>

<template>

</template>

<style scoped>

</style>