<script setup lang="ts">
import type {PropType} from "vue";
import type {Event} from "@/api/events.js";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermButton from "@/components/termui/TermButton.vue";
import HiddenLink from "@/components/HiddenLink.vue";

const props = defineProps({
  event: {
    type: Object as PropType<Omit<Event, "formFields">>,
    required: true
  }
});
</script>

<template>
  <TermWindow class="window" noHeader>
    <div class="main">
      <div class="content">
        <h4>{{event.displayName}}</h4>
        <p>
          <img :src="event.imgUrl" :alt="event.displayName">
          {{event.description}}
        </p>
      </div>
      <div class="buttons">
        <TermButton v-if="event.type === 'admin'">Редактировать</TermButton>
        <HiddenLink :to="event.summaryUrl"><TermButton v-if="event.summaryUrl">Подробнее</TermButton></HiddenLink>
        <HiddenLink :to="`/events/${event.id}`"><TermButton>Зарегестрироваться</TermButton></HiddenLink>
      </div>
    </div>
  </TermWindow>
</template>

<style scoped>
.window {
  max-width: 1200px;
  width: 100%;
}

.content {
  width: 100%;
}

.buttons {
  gap: 20px;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  //margin-top: 10px;
}

img {
  width: 120px;
  float: left;
  margin-right: 10px;
}

h4 {
  color: #95EAA7FF;
  text-shadow: 0 0 5px #95EAA7FF;
  font-weight: bold;
  font-size: 24px;
  margin: 0;

  display: block;
  word-break: break-word;
  white-space: normal;
}

p {
  width: 100%;

  word-break: break-word;
  white-space: normal;
}

.main {
  gap: 10px;
}
</style>