<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type EventType, getEvent, register} from "@/api/events.js";
import {useRoute} from "vue-router";
import EventForm from "@/components/EventForm.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermButton from "@/components/termui/TermButton.vue";

const route = useRoute();

const event = ref<{event: EventType, incorrect: false} | {event: null, incorrect: true}>({incorrect: true, event: null});
const pending = ref<boolean>(true);
const response = ref<Record<string, any>>({});
const filled = ref(false);

onMounted(async () => {
  const data = await getEvent(route.params.id.toString());
  pending.value = false;
  if (data !== false && data !== null) event.value = {event: data, incorrect: false};
});

async function send() {
  pending.value = true;
  await register(response.value, route.params.id.toString());
  pending.value = false;
}
</script>

<template>
  <main>
    <template v-if="event.incorrect">Ошибка доступа (или ещё какая-то)</template>
    <EventForm v-else :event="event.event" v-model:response="response" v-model:filled="filled">
      <template #header>{{event.event.displayName}}</template>
      <TermButton @click="send" :disabled="!filled">Зарегистрироваться</TermButton>
    </EventForm>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<style scoped>
main {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3px;
}
</style>