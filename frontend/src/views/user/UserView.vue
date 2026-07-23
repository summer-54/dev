<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {getMe, getUserByUsername, me, type UserType} from "@/api/users";
import Title from "@/components/Title.vue";
import UserInfo from "@/components/UserInfo.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const user = ref<UserType | null>(null);
const pending = ref(false);

async function getUser() {
  pending.value = true;
  user.value = await getUserByUsername(route.params.username as string);
  pending.value = false;
}

function ifMe() {
  if (me.value && user.value && me.value?.username === user.value?.username) router.push("/me");
}

onMounted(() => {
  ifMe();
  getMe().then(user => me.value = user);
  getUser();
  watch(me, () => ifMe());
});

watch(me, () => ifMe());
watch(user, () => ifMe());
</script>

<template>
  <main v-if="user">
    <UserInfo :user="user"/>
  </main>
  <ProgressIndicator v-else-if="pending"/>
  <Title :text="`Пользователь ${route.params.username} не существует`" style="color: red" v-else/>
</template>