<script lang="ts">
import {defineComponent} from 'vue'
import {getNews} from '@/api/news';
import {getAllUsers} from '@/api/users';
import Title from '@/components/Title.vue';
import StatisticsField from './StatisticsField.vue';

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
  components: {Title, StatisticsField}
})
</script>

<template>
  <main>
    <span v-if="err">
      Произошла ошибка. Не удалось загрузить данные.
    </span>
    <div v-else>
      <Title text="Общая статистика"/>
      <div class="cont">
        <StatisticsField statName="Количество новостей" :statValue="news_amount"/>
        <StatisticsField statName="Количество пользователей" :statValue="users_amount"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}
main {
  margin: 0 20px;
}
.cont {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}
</style>