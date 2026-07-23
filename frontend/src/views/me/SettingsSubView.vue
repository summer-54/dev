<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue'
import {getMe, me, patchUser as patchUser_, patchUserPassword} from "@/api/users.js";
import Title from "@/components/Title.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermInput from "@/components/termui/TermInput.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const codeforcesHandle = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const newPasswordRepeat = ref("");
const correctPassword = ref(true);
const pending = ref(false);

const user = computed(() => me.value);

const passwordStrength = computed(() => {
  if (newPassword.value.split("").map(char => char >= 'а' && char <= 'я' || char >= 'А' && char <= 'Я').filter(value => value).length) return -1;
  if (newPassword.value.length < 4) return 0;
  let numbersCount = newPassword.value.split("").map(char => char >= '1' && char <= '9').filter(value => value).length;
  let lowerCaseCount = newPassword.value.split("").map(char => char >= 'a' && char <= 'z').filter(value => value).length;
  let upperCaseCount = newPassword.value.split("").map(char => char >= 'A' && char <= 'Z').filter(value => value).length;
  let symbolsCount = newPassword.value.split("").map(char => !(char >= '1' && char <= '9' || char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z')).filter(value => value).length;
  return Math.min(numbersCount, 2) + Math.min(lowerCaseCount, 1) + Math.min(upperCaseCount, 1) + Math.min(symbolsCount, 2);
})

async function patchUser(event: Event) {
  event.preventDefault();
  pending.value = true;
  let response = await patchUser_({
    firstName: firstName.value,
    lastName: lastName.value,
    codeforcesHandle: codeforcesHandle.value
  });
  pending.value = false;
  if (response) {
    me.value = await getMe();
    await router.push("/me");
  }
}

async function patchPassword(event: Event) {
  event.preventDefault();
  pending.value = true;
  let response = await patchUserPassword(oldPassword.value, newPassword.value);
  pending.value = false;
  if (response) await router.push("/me");
  else correctPassword.value = false;
}

function setup() {
  if (user.value) {
    firstName.value = user.value.firstName;
    lastName.value = user.value.lastName;
    codeforcesHandle.value = user.value.codeforcesHandle;
  }
}

watch(user, () => setup());
watch(oldPassword, () => {
  correctPassword.value = true;
});

onMounted(() => setup());
</script>

<template>
  <main>
    <template v-if="user">
      <Title text="Настройки"/>
      <div>
        <TermWindow class="form" prompt="root@inf54:~# ./patch-user.sh">
          <template #header>
            Общая информация
          </template>

          <TermInput label="root@inf54:~# name:" mLabel="> name:" placeholder="Имя" noBreak v-model="firstName"/>
          <TermInput label="root@inf54:~# surname:" mLabel="> surname:" placeholder="Фамилия" noBreak v-model="lastName"/>
          <p class="subtitle">Дополнительная информация</p>
          <TermInput label="root@inf54:~# codeforces:" mLabel="> codeforces:" placeholder="Ник на Codeforces" optional noBreak v-model="codeforcesHandle"/>
          <TermButton @click="patchUser" :disabled="pending || firstName.length <= 1 || lastName.length <= 1">Обновить</TermButton>
        </TermWindow>
        <TermWindow class="form" prompt="root@inf54:~# ./patch-user.sh --password">
          <template #header>
            Смена пароля
          </template>

          <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Старый пароль" password noBreak v-model="oldPassword"/>
          <TermInput label="root@inf54:~# newPassword:" mLabel="> newPassword:" placeholder="Новый пароль" password noBreak v-model="newPassword"/>
          <p class="error" v-if="passwordStrength === -1">Не может содержать русские буквы</p>
          <p>Сила пароля: {{passwordStrength}}/6</p>
          <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите новый пароль" password noBreak v-model="newPasswordRepeat"/>
          <p class="error" v-if="newPassword !== newPasswordRepeat">Не совпадает</p>
          <TermButton @click="patchPassword" :disabled="newPassword !== newPasswordRepeat || passwordStrength <= 0 || oldPassword.length <= 0 || pending">Обновить пароль</TermButton>
        </TermWindow>
      </div>
    </template>
  </main>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
  align-items: baseline;
}
button {
  width: 100%;
}

.form {
  width: calc(min(600px, 98vw));
}
</style>