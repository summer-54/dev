<script setup lang="ts">
import TermInput from "@/components/termui/TermInput.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermSelect from "@/components/termui/TermSelect.vue";
import TermDate from "@/components/termui/TermDate.vue";
import TermDatetime from "@/components/termui/TermDatetime.vue";
import {type PropType} from "vue";
import type {EventType} from "@/api/events.js";

const props = defineProps({
  event: {
    type: Object as PropType<EventType>,
    required: true
  }
});

const response = defineModel("response", {
  type: Object,
  required: true
});

function formatDatetime(date: Date) {
  return !isNaN(date.getTime()) ? date?.toISOString() : "";
}

function formatDate(date: Date) {
  return !isNaN(date.getTime()) ? `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).padStart(4, '0')}` : "";
}

function readDate(dateStr: string | undefined) {
  if (!dateStr) return undefined;
  let [d, m, y] = dateStr.split('.').map(v => Number(v));
  let date = new Date();
  date.setFullYear(y);
  date.setMonth(m - 1);
  date.setDate(d);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function readDatetime(dateStr: string | undefined) {
  return dateStr ? new Date(dateStr) : undefined;
}
</script>

<template>
  <TermWindow class="window" prompt="root@inf54:~# ./register.sh">
    <template #header>
      <slot name="header"/>
    </template>

    <template v-for="field in event.formFields">
      <TermInput v-if="field.type === 'text'"
                 :label="field.title"
                 v-model="response[field.key]"
                 :min="field.min" :max="field.max"/>
      <TermInput v-if="field.type === 'int'" int
                 :label="field.title"
                 :modelValue="response[field.key]"
                 @update:modelValue="value => response[field.key] = value?.replaceAll(',', '.')"
                 :min="field.min" :max="field.max"/>
      <TermInput v-if="field.type === 'float'" float
                 :label="field.title"
                 :modelValue="response[field.key]"
                 @update:modelValue="value => response[field.key] = value?.replaceAll(',', '.')"
                 :min="field.min" :max="field.max"/>
      <TermSelect v-if="field.type === 'select'"
                  :label="field.title"
                  :options="field.variants"
                  v-model="response[field.key]"/>
      <TermDate v-if="field.type === 'date'"
                :label="field.title"
                :modelValue="readDate(response[field.key])"
                @update:modelValue="date => response[field.key] = formatDate(date)"
                :min="readDate(field.min)" :max="readDate(field.max)"/>
      <TermDatetime v-if="field.type === 'datetime'"
                    :label="field.title"
                    :modelValue="readDatetime(response[field.key])"
                    @update:modelValue="date => response[field.key] = formatDatetime(date)"
                    :min="readDatetime(field.min)" :max="readDatetime(field.max)"/>
    </template>

    <slot/>
  </TermWindow>
</template>

<style scoped>
.window {
  min-width: calc(min(500px, 100%));
  max-width: 800px;
}
</style>