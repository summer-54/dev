<script lang="ts">
import {defineComponent} from 'vue'
import Title from "@/components/Title.vue";
import {me, signOut} from "@/api/users.js";
import IconButton from "@/components/ui/iconButton.vue";
import signOutIcon from "@/assets/signout.svg"

export default defineComponent({
  name: "DefaultSubView",
  data() {
    return {signOutIcon}
  },
  components: {IconButton, Title},
  computed: {
    user: () => me.value
  },
  methods: {
    signOut() {
      signOut();
      this.$router.push("/");
    }
  }
})
</script>

<template>
  <main>
    <template v-if="user">
      <Title :text="'Информация о ' + user.username"/>
      <div class="info">
        <div>
          <span>Аккаунт Codeforces: <a :href="`https://codeforces.com/profile/${user.codeforcesHandle}`" target="_blank">{{ user.codeforcesHandle }}</a></span>
          <span>{{ user.lastName }} {{ user.firstName }}</span>
        </div>
        <div class="button">
          <IconButton :icon="signOutIcon" @click="signOut">Выйти</IconButton>
        </div>
      </div>

    </template>
    <Title text="Загрузка..." v-else/>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 20px;
  flex-wrap: wrap;

  div {
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: 10px;
      font-size: 20px;
    }
  }

  @media (max-width: 396px) {
    .button {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
}

/*span {
  display: block;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
}*/
</style>