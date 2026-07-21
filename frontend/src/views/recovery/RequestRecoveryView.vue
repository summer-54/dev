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

<script lang="ts">
import { defineComponent } from 'vue';
import CustomForm from '@/components/ui/CustomForm.vue';
// @ts-ignore
import SuiButton from 'sffui.vue/suiButton.vue';
// @ts-ignore
import SuiInput from 'sffui.vue/suiInput.vue';
import Title from '@/components/Title.vue';
import Subtitle from '@/components/Subtitle.vue';
import {requestRecovery} from "@/api/recovery.js";
import TermButton from "@/components/termui/TermButton.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermBG from "@/components/termui/TermBG.vue";

export default defineComponent({
  name: "RecoveryView",
  components: {
    TermBG,
    ProgressIndicator,
    TermWindow, TermInput, TermButton, CustomForm, SuiButton, SuiInput, Title, Subtitle},
  data() {
    return {
      email: "",
      pending: false,
      done: false,
      failed: false
    }
  },
  methods: {
    async recovery(event: Event) {
      event.preventDefault();
      this.pending = true;
      if (await requestRecovery(this.email)) this.done = true;
      else this.failed = true;
      this.pending = false;
    }
  }
});
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