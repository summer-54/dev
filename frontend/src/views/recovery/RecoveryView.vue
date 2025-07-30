<template>
  <main>
    <Title text="Восстановление пароля"></Title>
    <Subtitle class="centered" text="При восстановлении возникла проблема" v-if="failed"/>
    <CustomForm v-if="!done">
      <SuiInput placeholder="Новый пароль" v-model="password" password/>
      <FormComment color="unset">Сила пароля: {{passwordStrength}}/6</FormComment>
      <SuiInput placeholder="Повторите новый пароль" v-model="passwordConfirm" password/>
      <FormComment v-if="password !== passwordConfirm && passwordConfirm.length > 0">Не совпадает</FormComment>
      <SuiButton @click.prevent.stop="recoveryRequest" :disabled="password !== passwordConfirm || passwordStrength <= 0 || pending">Восстановить пароль</SuiButton>
    </CustomForm>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import Title from "@/components/Title.vue";
import Subtitle from "@/components/Subtitle.vue";
import CustomForm from "@/components/ui/CustomForm.vue";
// @ts-ignore
import SuiButton from 'sffui.vue/suiButton.vue';
// @ts-ignore
import SuiInput from 'sffui.vue/suiInput.vue';
import FormComment from "@/components/ui/formComment.vue";
import {recovery} from "@/api/recovery.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

const router = useRouter();

const key = ref<string>(Array.isArray(router.currentRoute.value.params.key) ? router.currentRoute.value.params.key[0] : router.currentRoute.value.params.key);
const password = ref(""), passwordConfirm = ref("");
const pending = ref(false), done = ref(false), failed = ref(false);

const passwordStrength = computed(() => {
  if (password.value.split("").map(char => char >= 'а' && char <= 'я' || char >= 'А' && char <= 'Я').filter(value => value).length) return -1;
  if (password.value.length < 4) return 0;
  let numbersCount = password.value.split("").map(char => char >= '1' && char <= '9').filter(value => value).length;
  let lowerCaseCount = password.value.split("").map(char => char >= 'a' && char <= 'z').filter(value => value).length;
  let upperCaseCount = password.value.split("").map(char => char >= 'A' && char <= 'Z').filter(value => value).length;
  let symbolsCount = password.value.split("").map(char => !(char >= '1' && char <= '9' || char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z')).filter(value => value).length;
  return Math.min(numbersCount, 2) + Math.min(lowerCaseCount, 1) + Math.min(upperCaseCount, 1) + Math.min(symbolsCount, 2);
});

async function recoveryRequest() {
  pending.value = true;
  const token = await recovery(key.value, password.value);
  if (token !== null) {
    done.value = true;
    router.push("/me");
  }
  else failed.value = true;
  pending.value = false;
}
</script>