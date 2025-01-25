<template>
  <main>
    <Title text="Восстановление пароля"></Title>
    <Subtitle :text="`Письмо отправлено на ${email}`" v-if="done"/>
    <Subtitle text="При отправке возникла проблема" v-else-if="failed"/>
    <CustomForm v-if="!done">
      <SuiInput placeholder="Почта" v-model="email"/>
      <SuiButton @click="recovery" :disabled="pending">Восстановить пароль</SuiButton>
    </CustomForm>
    <ProgressIndicator v-if="pending"/>
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

export default defineComponent({
  name: "RecoveryView",
  components: {CustomForm, SuiButton, SuiInput, Title, Subtitle},
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