<script lang="ts">
import {defineComponent} from "vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import {getMe, hasToken, me} from "@/api/users.js";
import NavButton from "@/components/ui/navButton.vue";
import homeIcon from "@/assets/home.svg"
import settingsIcon from "@/assets/settings.svg"
import signOutIcon from "@/assets/signout.svg"
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "MeView",
  components: {ProgressIndicator, NavButton, SuiButton},
  data() {
    return {homeIcon, settingsIcon, signOutIcon};
  },
  mounted() {
    if (!hasToken()) {
      this.$router.push("/sign-in");
      return;
    }
    getMe().then(user => me.value = user);
  },
  computed: {
    pending() {
      return !me.value;
    }
  }
});
</script>

<template>
  <div>
    <header>
      <nav>
        <NavButton to="/me" :icon="homeIcon">Главная</NavButton>
        <NavButton to="/me/settings" :icon="settingsIcon">Настройки</NavButton>
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
  justify-content: space-around;
  margin-top: 20px;

  * {
    text-decoration: none;
    font-family: "Tiny5", sans-serif;
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
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>