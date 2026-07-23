<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";
import {
  emailConfirm as emailConfirm_,
  hasToken,
  isUniqueCodeforcesHandle as isUniqueCodeforcesHandle_,
  isUniqueEmail as isUniqueEmail_,
  isUniqueUsername as isUniqueUsername_,
  register,
  registerStart
} from "@/api/users.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermBG from "@/components/termui/TermBG.vue";
import TermPin from "@/components/termui/TermPin.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermInput from "@/components/termui/TermInput.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const passwordRepeat = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const codeforcesHandle = ref("");
const emailConfirm = ref("");
const isUniqueUsername = ref(true);
const isUniqueEmail = ref(true);
const isUsernameEnoughLength = ref(true);
const isUniqueCodeforcesHandle = ref(true);
const pending = ref(false);
const stage = ref(0);
const stage0Error = ref(0);
const emailToken = ref<undefined | null | string>(undefined);

const passwordStrength = computed(() => {
  if (password.value.split("").map(char => char >= 'а' && char <= 'я' || char >= 'А' && char <= 'Я').filter(value => value).length) return -1;
  if (password.value.length < 4) return 0;
  let numbersCount = password.value.split("").map(char => char >= '1' && char <= '9').filter(value => value).length;
  let lowerCaseCount = password.value.split("").map(char => char >= 'a' && char <= 'z').filter(value => value).length;
  let upperCaseCount = password.value.split("").map(char => char >= 'A' && char <= 'Z').filter(value => value).length;
  let symbolsCount = password.value.split("").map(char => !(char >= '1' && char <= '9' || char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z')).filter(value => value).length;
  return Math.min(numbersCount, 2) + Math.min(lowerCaseCount, 1) + Math.min(upperCaseCount, 1) + Math.min(symbolsCount, 2);
});

function checkUsernameLength(setToFalse: boolean) {
  if (username.value.length < 4 && setToFalse) isUsernameEnoughLength.value = false;
  if (username.value.length >= 4) isUsernameEnoughLength.value = true;
}

async function submit(event: Event) {
  event.preventDefault();
  checkUsernameLength(true);
  if (password.value !== passwordRepeat.value || !isUniqueUsername.value || !isUniqueEmail.value || !isUniqueCodeforcesHandle.value || !isUsernameEnoughLength.value || passwordStrength.value <= 0 || pending.value || !emailToken.value) return;
  pending.value = true;
  let response = await register({
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    emailToken: emailToken.value,
    codeforcesHandle: codeforcesHandle.value
  });
  pending.value = false;
  if (!response) await router.push("/me");
}

async function submit0() {
  pending.value = true;
  stage0Error.value = await registerStart(email.value);
  if (stage0Error.value === 0) stage.value = 1;
  pending.value = false;
}

async function submit1() {
  pending.value = true;
  emailToken.value = await emailConfirm_(email.value, emailConfirm.value);
  if (emailToken.value) stage.value = 2;
  else emailConfirm.value = "";
  pending.value = false;
}

onMounted(async () => {
  if (await hasToken()) await router.push("/me");
});

watch(username, () => isUniqueUsername_(username.value).then(unique => isUniqueUsername.value = Boolean(unique)));
watch(email, () => isUniqueEmail_(email.value).then(unique => isUniqueEmail.value = Boolean(unique)));
watch(codeforcesHandle, () => isUniqueCodeforcesHandle_(codeforcesHandle.value).then(unique => isUniqueCodeforcesHandle.value = Boolean(unique)));
watch(emailConfirm, () => {
  if (emailConfirm.value.length === 6) submit1();
});
</script>

<template>
  <main>
    <div class="forms">
      <TermWindow class="window" prompt="root@inf54:~# ./register.sh">
        <template #header>
          Добро пожаловать. Регистрация
        </template>

        <TermInput label="root@inf54:~# email:" mLabel="> email:" placeholder="Email" noBreak v-model="email" :disabled="stage !== 0"/>
        <p class="error" v-if="stage0Error === 1">Email некорректен</p>
        <p class="error" v-if="stage0Error === 2 || !isUniqueEmail">Email занят</p>
        <TermButton v-if="stage === 0" @click="submit0" :disabled="pending">Продолжить</TermButton>
        <TermButton v-if="stage !== 0" @click="stage = 0">Изменить</TermButton>
        <p>Уже есть аккаунт? <RouterLink class="highlight" to="/sign-in">Вход</RouterLink></p>
      </TermWindow>
      <Transition>
        <TermWindow class="window" prompt="root@inf54:~# ./register.sh --mail-confirm" v-if="stage >= 1">
          <template #header>
            Подтвердите email-адрес
          </template>

          <p class="subtitle">Введите код, который мы отправили вам на почту</p>
          <TermPin v-model="emailConfirm" :disabled="stage !== 1"/>
          <p class="error" v-if="emailToken === null">Код не верный</p>
        </TermWindow>
      </Transition>
      <Transition>
        <TermWindow class="window" prompt="root@inf54:~# ./register.sh --user-info" v-if="stage >= 2">
          <template #header>
            Заполните информацию
          </template>

          <TermInput label="root@inf54:~# username:" mLabel="> username:" placeholder="Имя пользователя" noBreak v-model="username"/>
          <p class="error" v-if="!isUniqueUsername && username.length > 0">Не уникально</p>
          <p class="error" v-if="!isUsernameEnoughLength">Должно быть >= 4 символов</p>
          <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Пароль" password noBreak v-model="password"/>
          <p class="error" v-if="passwordStrength === -1">Не может содержать русские буквы</p>
          <p>Сила пароля: {{passwordStrength}}/6</p>
          <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите пароль" password noBreak v-model="passwordRepeat"/>
          <p class="error" v-if="password !== passwordRepeat">Не совпадает</p>
          <TermInput label="root@inf54:~# name:" mLabel="> name:" placeholder="Имя" noBreak v-model="firstName"/>
          <TermInput label="root@inf54:~# surname:" mLabel="> surname:" placeholder="Фамилия" noBreak v-model="lastName"/>
          <p class="subtitle">Дополнительная информация</p>
          <TermInput label="root@inf54:~# codeforces:" mLabel="> codeforces:" placeholder="Ник на Codeforces" optional noBreak v-model="codeforcesHandle"/>
          <p class="error" v-if="!isUniqueCodeforcesHandle && codeforcesHandle.length > 0">Не уникально</p>
          <TermButton :disabled="password !== passwordRepeat || !isUniqueUsername || !isUniqueEmail || !isUniqueCodeforcesHandle || !isUsernameEnoughLength
            || passwordStrength <= 0 || firstName.length <= 1 || lastName.length <= 1 || pending" @click="submit">Зарегистрироваться</TermButton>
        </TermWindow>
      </Transition>
    </div>
    <ProgressIndicator v-if="pending"/>
    <TermBG/>
  </main>
</template>

<style scoped>
.subtitle {
  margin: 0;
  font-size: 20px;
  text-align: center;
}

p {
  margin: 0;
}

.error {
  color: red;
}

:global(.dark) {
  .subtitle {
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
  }

  .highlight {
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
  }
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: calc(min(600px, 98vw));
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: all 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>