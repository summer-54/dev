<script lang="ts" setup>
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import {computed} from "vue";
import TermBG from "@/components/termui/TermBG.vue";
// import TermHeader from "@/components/termui/header/TermHeader.vue";

const isDark = computed(() => {
  return document.documentElement.classList.contains('dark');
});
</script>

<template>
  <main>
    <div class="forms">
      <TermWindow class="window" prompt="root@inf54:~# ./register.sh">
        <template #header>
          Добро пожаловать. Вход
        </template>

        <TermInput label="root@inf54:~# username:" mLabel="> username:" placeholder="Имя пользователя" noBreak/>
        <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Пароль" password noBreak/>
        <TermButton>Войти</TermButton>
        <p>Нет аккаунта? <RouterLink class="highlight" to="/registration">Регистрация</RouterLink></p>
      </TermWindow>
      <TermWindow class="window" prompt="root@inf54:~# ./recovery.sh">
        <template #header>
          Восстановление пароля
        </template>

        <TermInput label="root@inf54:~# email:" mLabel="> email:" placeholder="Email" noBreak/>
        <TermButton>Продолжить</TermButton>
      </TermWindow>
      <TermWindow class="window" prompt="root@inf54:~# ./patch-user.sh">
        <template #header>
          Общая информация
        </template>

        <TermInput label="root@inf54:~# name:" mLabel="> name:" placeholder="Имя" noBreak/>
        <TermInput label="root@inf54:~# surname:" mLabel="> surname:" placeholder="Фамилия" noBreak/>
        <p class="subtitle">Дополнительная информация</p>
        <TermInput label="root@inf54:~# codeforces:" mLabel="> codeforces:" placeholder="Ник на Codeforces" optional noBreak/>
        <TermButton>Обновить</TermButton>
      </TermWindow>
      <TermWindow class="window" prompt="root@inf54:~# ./patch-user.sh --password">
        <template #header>
          Смена пароля
        </template>

        <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Старый пароль" password noBreak/>
        <TermInput label="root@inf54:~# newPassword:" mLabel="> newPassword:" placeholder="Новый пароль" password noBreak/>
        <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите новый пароль" password noBreak/>
        <TermButton>Обновить пароль</TermButton>
      </TermWindow>
    </div>

<!--    <TermHeader/>-->
    <TermBG/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0 20px;
  gap: 20px;
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  max-width: 700px;
}

.window {
  //min-width: 800px;
}

.subtitle {
  margin: 0;
  font-size: 20px;
  text-align: center;
}

p {
  margin: 0;
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
</style>