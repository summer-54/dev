<script lang="ts">
import {defineComponent} from 'vue'
import Title from "@/components/Title.vue";
import {me} from "@/api/users.js";

export default defineComponent({
  name: "DefaultSubView",
  components: {Title},
  computed: {
    user: () => me.value
  }
})
</script>

<template>
  <main>
    <template v-if="user">
      <Title :text="'Информация о ' + user.username"/>
      <span>Аккаунт Codeforces: <a :href="`https://codeforces.com/profile/${user.codeforcesHandle}`" target="_blank">{{ user.codeforcesHandle }}</a></span>
      <span>{{ user.lastName }} {{ user.firstName }}</span>
    </template>
    <Title text="Загрузка..." v-else/>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

span {
  display: block;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
}
</style>