<script setup lang="ts">
import {onMounted, ref} from "vue";
import {editResponse, type EventResponseType, type EventType, getEvent, getMyResponses} from "@/api/events.js";
import {useRoute} from "vue-router";
import EventForm from "@/components/EventForm.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermButton from "@/components/termui/TermButton.vue";

const route = useRoute();

const event = ref<{event: EventType, incorrect: false} | {event: null, incorrect: true}>({incorrect: true, event: null});
const responses = ref<Array<EventResponseType>>([]);
const pending = ref<boolean>(true);

onMounted(async () => {
  const data = await getEvent(route.params.id.toString());
  const data2 = await getMyResponses(route.params.id.toString())
  pending.value = false;
  if (data !== false && data !== null && data2 !== false && data2 !== null) {
    event.value = {event: data, incorrect: false};
    responses.value = data2;
  }
});

function send(rid: number) {
  editResponse(responses.value.filter(({id}) => id === rid)[0].formFields, route.params.id.toString(), rid);
}
</script>

<template>
  <main>
    <template v-if="event.incorrect">Ошибка доступа (или ещё какая-то)</template>
    <template v-else>
      <h2>{{event.event.displayName}}</h2>
      <EventForm v-for="response in responses" :event="event.event" v-model:response="response.formFields">
        <template #header>
          <div class="respId">Заявка на участие №{{response.id}}</div>
          <div class="date">Создано: {{new Date(response.datetime).toLocaleString('ru')}}</div>
          <div class="date">Изменено: {{new Date(response.editDatetime).toLocaleString('ru')}}</div>
        </template>
        <TermButton @click="send(response.id)">Изменить</TermButton>
      </EventForm>
    </template>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<style scoped>
main {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 3px;
}

.date {
  font-size: 14px;
  color: white !important;
  text-shadow: none !important;
}

.respId {
  font-size: 25px;
  color: white !important;
  text-shadow: none !important;
}

h2 {
  margin: 0 0 10px 0;
  font-size: 30px;
  font-weight: bold;
  color: #95EAA7FF;
  text-shadow: 0 0 5px #95EAA7FF;
}
</style>