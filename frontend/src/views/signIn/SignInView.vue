<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {hasToken, signIn} from "@/api/users.js";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermBG from "@/components/termui/TermBG.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const wrong = ref(false);
const pending = ref(false);

onMounted(async () => {
  if (await hasToken()) {
    let to = router.currentRoute.value.query.next?.toString() ?? "/me";
    if (to.startsWith("/")) await router.push(to);
    else window.location.href = to;
  }
});

async function submit(event: Event) {
  event.preventDefault();
  pending.value = true;
  try {
    let response = await signIn(username.value, password.value);
    if (response) {
      let to = router.currentRoute.value.query.next?.toString() ?? "/me";
      if (to.startsWith("/")) await router.push(to);
      else window.location.href = to;
    }
    else wrong.value = true;
  }
  catch (error) {
    wrong.value = true;
  }
  pending.value = false;
}
</script>

<template>
  <main>
<!--    <CustomForm>-->
<!--      <SuiInput maxLength="50" placeholder="Имя пользователя" v-model="username" border="#9297FB"/>-->
<!--      <SuiInput maxLength="50" placeholder="Пароль" password v-model="password" border="#9297FB"/>-->
<!--      <span v-if="wrong">Неверное имя пользователя или пароль</span>-->
<!--    </CustomForm>-->
    <TermWindow class="form" prompt="root@inf54:~# ./login.sh">
      <template #header>
        Добро пожаловать. Вход
      </template>

      <TermInput label="root@inf54:~# username:" mLabel="> username:" placeholder="Имя пользователя" noBreak v-model="username"/>
      <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Пароль" password noBreak v-model="password"/>
      <p class="error" v-if="wrong">Неверное имя пользователя или пароль</p>
      <TermButton @click="submit" :disabled="pending">Войти</TermButton>
      <p>Нет аккаунта? <RouterLink class="highlight" to="/registration">Регистрация</RouterLink></p>
      <p><RouterLink class="highlight" to="/recovery">Забыли пароль?</RouterLink></p>
    </TermWindow>
    <ProgressIndicator v-if="pending"/>
    <TermBG/>
  </main>
</template>

<style scoped>
.error {
  color: red;
}

p {
  margin: 0;
}

:global(.dark) {
  .highlight {
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
  }
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
</style>