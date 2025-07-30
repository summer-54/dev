<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const msg = ref<string>("");

// const sendTo = computed<string>(() => router.currentRoute.value.query.to?.toString() ?? "");

onMounted(() => {
  const token = localStorage.getItem('token');
  // msg.value = token ?? "null";
  if (!token) {
    console.error('No token found in localStorage');
    return;
  }
  // Send token to parent window (contest.inf54.ru)
  window.parent.postMessage({ token });
  console.log('Token sent to contest.inf54.ru');
});
</script>

<template>
<main>{{msg}}</main>
</template>

<style scoped>

</style>