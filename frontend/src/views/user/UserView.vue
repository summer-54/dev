<script lang="ts">
import {defineComponent, watch} from 'vue'
import {getMe, getUserByUsername, me, type UserType} from "@/api/users";
import Title from "@/components/Title.vue";
import IconButton from "@/components/ui/iconButton.vue";
import UserInfo from "@/components/UserInfo.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "UserView",
  components: {ProgressIndicator, UserInfo, IconButton, Title},
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
    },
    ifMe() {
      if (me.value && this.user && me.value?.username === this.user?.username) this.$router.push("/me");
    }
  },
  mounted() {
    this.ifMe();
    getMe().then(user => me.value = user);
    this.getUser();
    watch(me, () => this.ifMe());
  },
  watch: {
    user() {
      this.ifMe();
    }
  }
})
</script>

<template>
  <main v-if="user">
    <UserInfo :user="user"/>
  </main>
  <ProgressIndicator v-else-if="pending"/>
  <Title :text="`Пользователь ${route.params.username} не существует`" style="color: red" v-else/>
</template>