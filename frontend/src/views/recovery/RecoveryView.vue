<template>
  <main>
    <TermWindow class="form" prompt="root@inf54:~# ./recovery.sh">
      <template #header>
        Восстановление пароля
      </template>

      <div v-if="!done" class="inner">
        <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Пароль" password noBreak v-model="password"/>
        <p class="error" v-if="passwordStrength === -1">Не может содержать русские буквы</p>
        <p>Сила пароля: {{passwordStrength}}/6</p>
        <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите пароль" password noBreak v-model="passwordConfirm"/>
        <p class="error" v-if="password !== passwordConfirm">Не совпадает</p>
        <TermButton @click="recoveryRequest" :disabled="password !== passwordConfirm || passwordStrength <= 0 || pending">Продолжить</TermButton>
      </div>
      <p class="error" v-else-if="failed">При отправке возникла проблема</p>
    </TermWindow>
    <ProgressIndicator v-if="pending"/>
    <TermBG/>
  </main>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {recovery} from "@/api/recovery.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermBG from "@/components/termui/TermBG.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermWindow from "@/components/termui/TermWindow.vue";

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