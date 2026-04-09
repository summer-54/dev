<script setup lang="ts">
import type {PropType} from "vue";
import type {Event} from "@/api/events.js";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermButton from "@/components/termui/TermButton.vue";
import HiddenLink from "@/components/HiddenLink.vue";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  }
});
</script>

<template>
  <TermWindow class="window" noHeader>
    <div class="content">
      <div class="main">
        <img :src="event.imgUrl" :alt="event.displayName">
        <div class="text">
          <h4>{{event.displayName}}</h4>
          <p>{{event.description}}</p>
        </div>
      </div>
      <div class="buttons">
        <TermButton v-if="event.type === 'admin'">Редактировать</TermButton>
        <HiddenLink :to="event.summaryUrl"><TermButton v-if="event.summaryUrl">Подробнее</TermButton></HiddenLink>
        <TermButton>Зарегестрироваться</TermButton>
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

.main {
  display: flex;
}

.buttons {
  gap: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  margin-top: 10px;
}

img {
  width: 120px;
}

.text {
  margin-left: 20px;

  * {
    margin: 0;
  }

  h4 {
    margin-bottom: 10px;
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>