<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "StatisticsField",
  props: {
    statName: {type: String},
    statValue: {type: Number}
  }
});
</script>

<template>
  <div class="field">
    <span class="key">{{ statName }}</span>
    <span class="value" v-if="statValue !== -1">{{ statValue }}</span>
    <span class="value" v-else>Загрузка...</span>
  </div>
</template>

<style>
.field {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  gap: 10px;
}
.value {
  font-weight: bold;
}
</style>