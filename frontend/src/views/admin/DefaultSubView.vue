<script lang="ts">
import {defineComponent} from 'vue'
import {getNews} from '@/api/news';
import {getAllUsers} from '@/api/users';
import Title from '@/components/Title.vue';

export default defineComponent({
  name: "DefaultSubView",
  data() {
    return {
      news_amount: -1,
      users_amount: -1,
      err: false
    }
  },
  methods: {
    async getUsers() {
      let users = await getAllUsers();
      if (!users) {
        this.err = true;
      } else {
        this.users_amount = users.length;
      }
    }
  },
  mounted() {
    let global_this = this;
    getNews().then(data=>{
      global_this.news_amount = data.length;
    }, () => {
      global_this.news_amount = 0;
      global_this.err = true;
    });
    this.getUsers();
  },
  components: {Title}
})
</script>

<template>
  <main>
    <span v-if="err">
      Произошла ошибка. Не удалось загрузить данные.
    </span>
    <div v-else>
      <Title text="Общая статистика"/>
      <div class="field">Количество новостей: <span class="value">{{ news_amount }}</span>.</div>
      <div class="field">Количество пользователей: <span class="value">{{ users_amount }}</span>.</div>
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}
.field {
  font-family: 20px;
}
.value {
  font-weight: bold;
}
main {
  margin: 0 20px;
}
</style>