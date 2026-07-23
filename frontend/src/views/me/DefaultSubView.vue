<script lang="ts">
import {defineComponent} from 'vue'
import Title from "@/components/Title.vue";
import {me, signOut} from "@/api/users.js";
import IconButton from "@/components/ui/iconButton.vue";
import signOutIcon from "@/assets/icons/signout.svg"
import UserInfo from "@/components/UserInfo.vue";

export default defineComponent({
  name: "DefaultSubView",
  data() {
    return {
      signOutIcon
    }
  },
  components: {UserInfo, IconButton, Title},
  computed: {
    user: () => me.value
  },
  methods: {
    signOut() {
      signOut().then(() => this.$router.push("/"));
    }
  }
})
</script>

<template>
  <main>
    <template v-if="user">
      <UserInfo :user="user">
        <div class="button">
          <IconButton :icon="signOutIcon" @click="signOut">Выйти</IconButton>
        </div>
      </UserInfo>
    </template>
  </main>
</template>

<style scoped>
@media (max-width: 396px) {
  .button {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>