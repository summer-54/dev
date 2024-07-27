<script lang="ts">
import {defineComponent} from "vue"
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import {searchUser, type SearchUserType} from "@/api/users";
import focus from "@/directives/focus";

export default defineComponent({
  name: "UsersSearch",
  components: {SuiInput, SuiButton},
  props: {
    searching: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:searching"],
  data() {
    return {
      searchText: "",
      foundUsers: [] as Array<SearchUserType & {text: string}>,
      selectedFoundUser: -1
    }
  },
  directives: {focus},
  methods: {
    async updateSearch() {
      if (this.searchText === "") return this.$emit("update:searching", false);
      let users = await searchUser(this.searchText);
      if (users) this.foundUsers = users.map(user => ({
        ...user,
        text: user.minStr !== "username" ? `${user.username} (${user[user.minStr]})` : user.username
      }));
    },
    selectUser(event: KeyboardEvent) {
      if (event.key === "ArrowUp") {
        this.selectedFoundUser--;
      }
      if (event.key === "ArrowDown") {
        this.selectedFoundUser++;
      }
    }
  }
})
</script>

<template>
  <Transition name="searchOpen">
    <div class="search" v-if="searching" @keydown="selectUser">
      <SuiInput v-model="searchText" @input="updateSearch" border="#9297FB" placeholder="Поиск пользователей" v-focus="selectedFoundUser < 0"/>
      <div>
        <TransitionGroup name="foundUsers">
          <RouterLink v-for="(user, index) in foundUsers" :key="user.username" :to="`/users/${user.username}`">
            <SuiButton @click="$router.push(`/users/${user.username}`)" v-focus="selectedFoundUser === index">{{user.text}}</SuiButton>
          </RouterLink>
        </TransitionGroup>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.search {
  padding-right: 20px;
  padding-top: 20px;
  flex-direction: column;

  @media (max-width: 764px) {
    padding-right: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
    align-items: flex-end;

    @media (max-width: 764px) {
      width: 100%;
      align-items: center;

      input {
        width: 80%;
      }
    }
  }
}

.searchOpen-enter-active, .searchOpen-leave-active {
  transition: all .5s;
}

.searchOpen-enter-from, .searchOpen-leave-to {
  transform: translate(1000px);
}

.foundUsers-move, /* apply transition to moving elements */
.foundUsers-enter-active,
.foundUsers-leave-active {
  transition: all 0.5s ease;
}

.foundUsers-enter-from,
.foundUsers-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.foundUsers-leave-active {
  position: absolute;
}
</style>