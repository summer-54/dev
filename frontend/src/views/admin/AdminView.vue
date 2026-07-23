<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import NavButton from "@/components/ui/navButton.vue";
import homeIcon from "@/assets/icons/home.svg";
import usersIcon from "@/assets/icons/account.svg";
import contestsIcon from "@/assets/icons/cup.svg";
import newsIcon from "@/assets/icons/news.svg";
import {isAdmin} from "@/api/users.js";
import {themeName} from "@/utils.ts";
import {useRouter} from "vue-router";

const router = useRouter();

computed(() => {
  return themeName.value === "dark" ? "white" : "black";
});

onMounted(async () => {
  if (!(await isAdmin())) await router.push("/");
});
</script>

<template>
<div class="admin">
  <nav>
    <NavButton to="/admin" :icon="homeIcon">Главная</NavButton>
    <NavButton to="/admin/news" :icon="newsIcon">Новости</NavButton>
    <NavButton to="/admin/contests" :icon="contestsIcon">Контесты</NavButton>
    <NavButton to="/admin/users" :icon="usersIcon">Пользователи</NavButton>
  </nav>
  <div class="router">
    <RouterView v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <Component :is="Component"/>
      </Transition>
    </RouterView>
  </div>
</div>
</template>

<style scoped>
.admin {
  display: flex;
  height: 100%;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  nav {
    padding: 10px;
    margin-top: 20px;
    margin-left: 20px;

    display: flex;
    @media (min-width: 768px) {
      flex-direction: column;
    }
    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      margin-right: 20px;
    }
    gap: 20px;

    border: 2px solid v-bind(color);
    border-radius: 25px;
    transition: border 1s ease;
  }

  .router {
    flex-grow: 1;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>