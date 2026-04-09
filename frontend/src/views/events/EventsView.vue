<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getEvents, type Event} from "@/api/events.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import EventButton from "@/components/EventButton.vue";

const events = ref<Array<Omit<Event, "formFields">> | null | false>([]);
const pending = ref<boolean>(true);

onMounted(async () => {
  events.value = await getEvents();
  pending.value = false;
});
</script>

<template>
  <main>
    <template v-if="events === false || events === null">Ошибка доступа (или ещё какая-то)</template>
    <ul v-else>
      <li v-for="event in events" :key="event.id">
        <EventButton :event="event"/>
      </li>
    </ul>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul, li {
  list-style: none;
  padding: 0 10px 0 6px;
  width: 100%;
}

li {
  display: flex;
  justify-content: center;
}
</style>