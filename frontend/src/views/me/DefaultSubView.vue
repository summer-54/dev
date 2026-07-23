<script lang="ts" setup>
import {computed} from 'vue'
import {me, signOut as signOut_} from "@/api/users.js";
import IconButton from "@/components/ui/iconButton.vue";
import signOutIcon from "@/assets/icons/signout.svg"
import UserInfo from "@/components/UserInfo.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const user = computed(() => me.value);

function signOut() {
  signOut_().then(() => router.push("/"));
}
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