<script lang="ts" setup>
//import PrimevueHeader from "@/views/test/primevue.vue";
import RadixHeader from "@/views/test/radix.vue";
//import Animation from "@/components/ui/animation.vue";
import DeepseekMenu from './DeepseekMenu.vue';
import NewHeader from "@/views/test/NewHeader.vue";
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
</script>

<template>
  <div>
<!--    <RadixHeader/>-->
<!--    <NewHeader/>-->
    <!-- <PrimevueHeader/> -->
<!--    <DeepseekMenu/>-->
    <!--<animation animation="flip">test</animation>-->
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