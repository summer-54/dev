<script lang="ts">
import {defineComponent} from 'vue'
import {getUserByUsername, type UserType} from "@/api/users";
import Title from "@/components/Title.vue";
import IconButton from "@/components/ui/iconButton.vue";
import UserInfo from "@/components/UserInfo.vue";

export default defineComponent({
  name: "UserView",
  components: {UserInfo, IconButton, Title},
  data() {
    return {
      user: null as UserType | null,
      pending: true
    }
  },
  computed: {
    route() {
      return Object(this.$router).currentRoute.value;
    }
  },
  methods: {
    async getUser() {
      this.pending = true;
      this.user = await getUserByUsername(this.route.params.username);
      this.pending = false;
    }
  },
  mounted() {
    this.getUser();
  }
})
</script>

<template>
  <template v-if="user">
    <UserInfo :user="user"/>
  </template>
  <Title text="Загрузка..." v-else-if="pending"/>
  <Title :text="`Пользователь ${route.params.username} не существует`" style="color: red" v-else/>
</template>