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
      if (event.key === "ArrowUp" && this.selectedFoundUser >= 0) this.selectedFoundUser--;
      if (event.key === "ArrowDown" && this.selectedFoundUser < this.foundUsers.length - 1) this.selectedFoundUser++;
      if (event.key === "Escape") this.$emit("update:searching", false);
    }
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.$emit("update:searching", false);
      this.searchText = "";
    });
  },
  watch: {
    searching() {
      if (!this.searching) this.foundUsers = [];
    }
  }
})
</script>

<template>
  <Transition name="searchOpen" mode="out-in">
    <div class="search" v-if="searching" @keydown="selectUser" @click="$event.stopPropagation()">
      <SuiInput v-model="searchText" @input="updateSearch" border="#9297FB" placeholder="Поиск пользователей" v-focus="selectedFoundUser < 0"/>
      <div>
        <TransitionGroup name="foundUsers">
          <RouterLink v-for="(user, index) in foundUsers" :key="user.username" :to="`/users/${user.username}`">
            <SuiButton v-focus="selectedFoundUser === index" transform="1.2">{{user.text}}</SuiButton>
          </RouterLink>
        </TransitionGroup>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

.search {
  padding: 20px;
  width: 20%;
  text-align: center;

  @media (max-width: 764px) {
    padding-right: 0;
    width: 100%;
  }

  input {
    display: inline-block;
    width: 70%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
    align-items: flex-end;

    * {
      width: 95%;
    }

    @media (max-width: 764px) {
      width: 100%;
      align-items: center;
    }
  }
}

.searchOpen-enter-active, .searchOpen-leave-active {
  transition: all .5s;
}

.searchOpen-enter-from, .searchOpen-leave-to {
  opacity: 0;
  width: 0;
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