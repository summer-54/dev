<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type Event, getEvent, register} from "@/api/events.js";
import {useRoute} from "vue-router";
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermSelect from "@/components/termui/TermSelect.vue";
import TermDate from "@/components/termui/TermDate.vue";
import TermDatetime from "@/components/termui/TermDatetime.vue";

const route = useRoute();

const event = ref<{event: Event, incorrect: false} | {event: null, incorrect: true}>({incorrect: true, event: null});
const response = ref<Record<string, any>>({});

onMounted(async () => {
  const data = await getEvent(route.params.id.toString());
  if (data !== false && data !== null) event.value = {event: data, incorrect: false};
});

function send() {
  register(response.value, route.params.id.toString());
}

function formatDatetime(date: Date) {
  return !isNaN(date.getTime()) ? date?.toISOString() : "";
}

function formatDate(date: Date) {
  return !isNaN(date.getTime()) ? `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).padStart(4, '0')}` : "";
}

function readDate(dateStr: string) {
  let [d, m, y] = dateStr.split('.').map(v => Number(v));
  let date = new Date();
  date.setFullYear(y);
  date.setMonth(m - 1);
  date.setDate(d);
  return date;
}
</script>

<template>
  <main>
    <template v-if="event.incorrect">Ошибка доступа (или ещё какая-то)</template>
    <TermWindow v-else class="window" prompt="root@inf54:~# ./register.sh">
      <template #header>
        {{event.event.displayName}}
      </template>

      <template v-for="field in event.event.formFields">
        <TermInput v-if="field.type === 'text'" :label="field.title" v-model="response[field.key]"/>
        <TermInput v-if="field.type === 'int' || field.type === 'float'" number :label="field.title" :modelValue="response[field.key]" @update:modelValue="value => response[field.key] = Number(value)"/>
        <TermSelect v-if="field.type === 'select'" :label="field.title" :options="field.variants" v-model="response[field.key]"/>
        <TermDate v-if="field.type === 'date'" :label="field.title" :modelValue="response[field.key] ? readDate(response[field.key]) : undefined" @update:modelValue="date => response[field.key] = formatDate(date)"/>
        <TermDatetime v-if="field.type === 'datetime'" :label="field.title" :modelValue="response[field.key] ? new Date(response[field.key]) : undefined" @update:modelValue="date => response[field.key] = formatDatetime(date)"/>
      </template>

      <TermButton @click="send">Зарегистрироваться</TermButton>
    </TermWindow>
  </main>
</template>

<style scoped>
main {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.window {
  max-width: 800px;
}
</style>