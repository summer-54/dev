<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const sendTo = computed<string>(() => router.currentRoute.value.query.to?.toString() ?? "");

onMounted(() => {
  if (!sendTo.value.startsWith("https://")) return;
  const domain = sendTo.value.split("/")[2];
  if (!["contest.inf54.ru"].includes(domain)) return;
  const targetWindow = window.open(sendTo.value, "_blank");
  console.log(targetWindow);
  if (!targetWindow) return;
  const token = localStorage.getItem("token");
  // targetWindow.onload = () => {
  //   targetWindow.postMessage({token}, 'http://localhost:5173');
  //   console.log('Token sent to contest.inf54.ru');
  // };
  targetWindow.addEventListener("load", () => {
    console.log(targetWindow);
    targetWindow.postMessage({token});
    console.log('Token sent to contest.inf54.ru');
  });
});
</script>

<template>

</template>

<style scoped>

</style>