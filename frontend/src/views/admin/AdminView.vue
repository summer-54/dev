<script lang="ts">
import {defineComponent} from 'vue'
import NavButton from "@/components/ui/navButton.vue";
import homeIcon from "@/assets/home.svg";
import usersIcon from "@/assets/account.svg";
import contestsIcon from "@/assets/cup.svg";
import newsIcon from "@/assets/news.svg";

export default defineComponent({
  name: "AdminView",
  components: {NavButton},
  data() {
      return {homeIcon, usersIcon, contestsIcon, newsIcon}
  },
  computed: {
    color() {
      return this.$themeName === "dark" ? "white" : "black";
    }
  }
})
</script>

<template>
<div class="admin">
  <nav>
    <NavButton to="/admin" :icon="homeIcon">Главная</NavButton>
    <NavButton to="/admin/news" :icon="newsIcon">Новости</NavButton>
    <NavButton to="/admin/contests" :icon="contestsIcon">Контесты</NavButton>
    <NavButton to="/admin/users" :icon="usersIcon">Пользователи</NavButton>
  </nav>
  <div class="router"><RouterView/></div>
</div>
</template>

<style scoped>
.admin {
  display: flex;
  height: 100%;

  nav {
    padding: 10px;
    margin-top: 10px;
    margin-left: 20px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    border: 2px solid v-bind(color);
    border-radius: 25px;
    transition: border 1s ease;
  }

  .router {
    flex-grow: 1;
  }
}
</style>