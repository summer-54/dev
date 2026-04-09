<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type Event, getEvent} from "@/api/events.js";
import {useRoute} from "vue-router";
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermSelect from "@/components/termui/TermSelect.vue";
import TermDate from "@/components/termui/TermDate.vue";
import TermDatetime from "@/components/termui/TermDatetime.vue";

const route = useRoute();

const event = ref<{event: Event, incorrect: false} | {event: null, incorrect: true}>({incorrect: true, event: null});

onMounted(async () => {
  const data = await getEvent(route.params.id.toString());
  if (data !== false && data !== null) event.value = {event: data, incorrect: false};
});
</script>

<template>
  <div>
    <template v-if="event.incorrect">Ошибка доступа (или ещё какая-то)</template>
    <TermWindow v-else class="window" prompt="root@inf54:~# ./register.sh">
      <template #header>
        {{event.event.displayName}}
      </template>

      <template v-for="field in event.event.formFields">
        <TermInput v-if="field.type === 'text' || field.type === 'int' || field.type === 'float'" :label="field.title"/>
        <TermSelect v-if="field.type === 'select'" :label="field.title" :options="field.variants"/>
        <TermDate v-if="field.type === 'date'" :label="field.title"/>
        <TermDatetime v-if="field.type === 'datetime'" :label="field.title"/>
      </template>

      <TermButton>Зарегистрироваться</TermButton>
    </TermWindow>
  </div>
</template>

<style scoped>

</style>