<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {getMe, hasToken, isAdmin, me} from "@/api/users.js";
import NavButton from "@/components/ui/navButton.vue";
import homeIcon from "@/assets/icons/home.svg"
import settingsIcon from "@/assets/icons/settings.svg"
import adminIcon from "@/assets/icons/admin.svg"
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const admin = ref(false);

const pending = computed(() => !me.value);

onMounted(async () => {
  if (!(await hasToken())) {
    await router.push("/sign-in");
    return;
  }
  getMe().then(user => me.value = user).catch(err => {
    // pending.value = false;
    localStorage.removeItem("token");
    router.push("/sign-in");
  });
  if (await isAdmin()) admin.value = true;
});
</script>

<template>
  <div>
    <header>
      <nav>
        <NavButton to="/me" :icon="homeIcon">Главная</NavButton>
        <NavButton to="/me/settings" :icon="settingsIcon">Настройки</NavButton>
        <NavButton to="/admin" :icon="adminIcon" v-if="admin">Администрирование</NavButton>
      </nav>
    </header>
    <RouterView v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <Component :is="Component"/>
      </Transition>
    </RouterView>
    <ProgressIndicator v-if="pending"/>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;

  * {
    text-decoration: none;
    margin-left: 20px;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  *:last-child {
    margin-right: 20px;
  }

  @media (max-width: 500px) {
    justify-content: center;
    gap: 20px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>