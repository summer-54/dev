<script lang="ts">
import {defineComponent} from 'vue'
import FixedButton from "@/components/ui/fixedButton.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import {adminUsersPatch, getAllUsers, makeAdmin, type UserType} from "@/api/users.js";
import doneIcon from "@/assets/done.svg";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";

export default defineComponent({
  name: "UsersSubView",
  components: {ProgressIndicator, FixedButton, SuiInput, SuiButton},
  data() {
    return {
      users: [] as Array<UserType & {id: number}>,
      pending: false,
      doneIcon
    }
  },
  methods: {
    async get() {
      this.pending = true;
      let response = await getAllUsers();
      if (response) this.users = response;
      this.pending = false;
    },
    async patch() {
      this.pending = true;
      await adminUsersPatch(this.users.map(({id, codeforcesHandle}) => ({id, codeforcesHandle})));
      await this.get();
    },
    async makeAdmin(id: number) {
      this.pending = true;
      await makeAdmin(id);
      await this.get();
    }
  },
  mounted() {
    this.get();
  },
  computed: {
    color() {
      return this.$theme.color;
    }
  }
})
</script>

<template>
  <main>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Имя пользователя</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Хэндл на codeforces</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="({id, username, firstName, lastName, isAdmin}, index) in users">
        <td>{{id}}</td>
        <td>{{username}}</td>
        <td>{{firstName}}</td>
        <td>{{lastName}}</td>
        <td><SuiInput v-model="users[index].codeforcesHandle"/></td>
        <td><SuiButton v-if="!isAdmin" @click="makeAdmin(id)">Сделать администратором</SuiButton></td>
      </tr>
      </tbody>
    </table>
    <FixedButton :icon="doneIcon" @click="patch">Готово</FixedButton>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

main {
  display: flex;
  justify-content: center;
}

thead {
  font-size: 32px;
}

tbody tr td:nth-child(1) {
  font-size: 32px;
}

td {
  border: 2px solid v-bind(color);
  border-radius: 15px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
}
</style>