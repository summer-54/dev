<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage");
    router.push({path:"/login", query: {next: "https://contest.inf54.ru/get-token"}});
    return;
  }
  try {
    window.parent.postMessage({ token }, "https://contest.inf54.ru");
    console.log("Token sent to https://contest.inf54.ru");
  } catch (error) {
    console.error("Failed to send token:", error);
  }
});
</script>

<template>
  <main></main>
</template>

<style scoped>

</style>