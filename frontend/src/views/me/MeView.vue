<script lang="ts">
import {computed, defineComponent} from "vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import {getMe, me, type UserType} from "@/api/users.js";

export default defineComponent({
  name: "MeView",
  components: {SuiButton},
  mounted() {
    getMe().then(user => me.value = user);
  }
});
</script>

<template>
  <div>
    <nav class="usermenu">
      <SuiButton border="#9297FB">
        <RouterLink to="/me">Главная</RouterLink>
      </SuiButton>
      <SuiButton border="#9297FB">
        <RouterLink to="/me/settings">Настройки</RouterLink>
      </SuiButton>
    </nav>
    <RouterView v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <Component :is="Component"/>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.usermenu {
  justify-content: space-around;
  margin-top: 20px;

  button {
    margin-left: 20px;
  }

  * {
    text-decoration: none;
    font-family: "Tiny5", sans-serif;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>