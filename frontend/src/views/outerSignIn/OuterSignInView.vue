<script setup lang="ts">
import { onMounted, ref } from 'vue';

const msg = ref<string>('Sending token...');

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    msg.value = 'No token found in localStorage';
    console.error('No token found in localStorage');
    return;
  }

  // Send token to parent window (contest.inf54.ru) with explicit target origin
  try {
    window.parent.postMessage({ token }, 'https://contest.inf54.ru');
    msg.value = 'Token sent successfully';
    console.log('Token sent to https://contest.inf54.ru');
  } catch (error) {
    msg.value = 'Failed to send token';
    console.error('Failed to send token:', error);
  }
});
</script>

<template>
  <main>{{ msg }}</main>
</template>

<style scoped>

</style>