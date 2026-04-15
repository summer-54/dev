<script setup lang="ts">
import type {PropType} from "vue";
import type {EventType} from "@/api/events.js";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermButton from "@/components/termui/TermButton.vue";
import HiddenLink from "@/components/HiddenLink.vue";

const props = defineProps({
  event: {
    type: Object as PropType<Omit<EventType, "formFields">>,
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
        <HiddenLink v-if="event.summaryUrl" :to="event.summaryUrl"><TermButton>Подробнее</TermButton></HiddenLink>
        <HiddenLink v-if="!event.my" :to="`/events/${event.id}`"><TermButton>Зарегистрироваться</TermButton></HiddenLink>
        <HiddenLink v-if="event.my && event.editable" :to="`/events/${event.id}/response`"><TermButton>Изменить</TermButton></HiddenLink>
        <HiddenLink v-if="event.my && !event.editable" :to="`/events/${event.id}/response`"><TermButton>Просмотреть</TermButton></HiddenLink>
        <HiddenLink v-if="event.my && !event.account" :to="`/events/${event.id}`"><TermButton>Зарегистрироваться повторно</TermButton></HiddenLink>
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
  width: 100%;
}
</style>