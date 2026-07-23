<template>
  <main>
    <TermWindow class="form" prompt="root@inf54:~# ./recovery.sh --request">
      <template #header>
        Восстановление пароля
      </template>

      <div v-if="!done" class="inner">
        <TermInput label="root@inf54:~# email:" mLabel="> email:" placeholder="Email" noBreak v-model="email"/>
        <TermButton @click="recovery" :disabled="pending">Продолжить</TermButton>
      </div>
      <p v-if="done">Письмо отправлено на {{email}}</p>
      <p class="error" v-else-if="failed">При отправке возникла проблема</p>
    </TermWindow>
    <ProgressIndicator v-if="pending"/>
    <TermBG/>
  </main>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {requestRecovery} from "@/api/recovery.js";
import TermButton from "@/components/termui/TermButton.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermBG from "@/components/termui/TermBG.vue";

const email = ref("");
const pending = ref(false);
const done = ref(false);
const failed = ref(false);

async function recovery(event: Event) {
  event.preventDefault();
  pending.value = true;
  if (await requestRecovery(email.value)) done.value = true;
  else failed.value = true;
  pending.value = false;
}
</script>

<style scoped>
.error {
  color: red;
}

p {
  margin: 0;
}

.form {
  width: calc(min(600px, 98vw));
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}
</style>