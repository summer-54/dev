<template>
  <Title text="Восстановление пароля"></Title>
  <CustomForm>
    <SuiInput placeholder="Почта"/>
    <SuiButton>Восстановить пароль</SuiButton>
  </CustomForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomForm from '@/components/ui/CustomForm.vue';
// @ts-ignore
import SuiButton from 'sffui.vue/suiButton.vue';
// @ts-ignore
import SuiInput from 'sffui.vue/suiInput.vue';
import Title from '@/components/Title.vue';

export default defineComponent({
  name: "RecoveryView",
  components: {CustomForm, SuiButton, SuiInput, Title}
});
</script>