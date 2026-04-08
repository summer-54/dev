<script setup lang="ts">
import type {PropType} from "vue";
import type {Event} from "@/api/events.js";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermButton from "@/components/termui/TermButton.vue";

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
        <img :src="event.imgUrl">
        <div class="text">
          <h4>{{event.displayName}}</h4>
          <p>{{event.description}}</p>
        </div>
      </div>
      <div class="buttons">
        <TermButton v-if="event.type === 'admin'">Редактировать</TermButton>
        <TermButton v-if="event.summaryUrl">Подробнее</TermButton>
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
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

img {
  max-width: 120px;
}

.text {
  margin-left: 20px;

  * {
    margin: 0;
  }

  h4 {
    margin-bottom: 20px;
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>