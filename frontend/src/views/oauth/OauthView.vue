<script setup lang="ts">
import {onMounted} from "vue";
import {hasToken} from "@/api/users.js";
import {useRoute, useRouter} from "vue-router";
import {authWrapper} from "@/api/authWrapper.js";
import axios from "axios";
import TermBG from "@/components/termui/TermBG.vue";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  let to = route.query.next?.toString() ?? "/me";
  if (!(await hasToken())) {
    await router.push({path: "/sign-in", query: { next: `/oauth/${route.params.uuid}?next=${to}` }});
    return;
  }
  let result = await authWrapper(async () => {
    let response = await axios.post(`/api/apps/oauth/approve/${route.params.uuid}`, "", {headers: {Authorization: localStorage.getItem("token")}})
    if (response.status === 401) return null;
    return response.status === 200;
  });
  // if (!result) return;
  if (to.startsWith("/")) await router.push(to);
  else window.location.href = to;
});
</script>

<template>
  <TermBG/>
</template>

<style scoped>

</style>