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
        <TermDate v-if="field.type === 'date'" :label="field.title" :modelValue="new Date(response[field.key])" @update:modelValue="date => response[field.key] = date?.toISOString()"/>
        <TermDatetime v-if="field.type === 'datetime'" :label="field.title" :modelValue="new Date(response[field.key])" @update:modelValue="date => response[field.key] = date?.toISOString()"/>
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
</style>