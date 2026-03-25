<script lang="ts" setup>
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import {computed} from "vue";
import TermHeader from "@/components/termui/header/TermHeader.vue";

const isDark = computed(() => {
  return document.documentElement.classList.contains('dark');
});
</script>

<template>
  <div>
    <TermWindow class="window" prompt="root@inf54:~# ./register.sh">
      <template #header>
        Добро пожаловать. Регистрация
      </template>

      <TermInput label="root@inf54:~# username:" mLabel="> username:" placeholder="Имя пользователя"/>
      <TermInput label="root@inf54:~# email:" mLabel="> email:" placeholder="Email"/>
      <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Пароль"/>
      <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите пароль"/>
      <TermInput label="root@inf54:~# name:" mLabel="> name:" placeholder="Имя"/>
      <TermInput label="root@inf54:~# surname:" mLabel="> surname:" placeholder="Фамилия"/>
      <TermInput label="root@inf54:~# codeforces:" mLabel="> codeforces:" placeholder="Ник на Codeforces (опц.)" optional/>
      <TermButton>testtest</TermButton>
    </TermWindow>

    <TermHeader/>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.window {
  //min-width: 800px;
}
</style>