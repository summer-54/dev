<script lang="ts" setup>
import {onMounted, ref, watch} from "vue"
import {searchUser, type SearchUserType} from "@/api/users";
import vFocus from "@/directives/focus";
import TermInput from "@/components/termui/TermInput.vue";
import TermButton from "@/components/termui/TermButton.vue";

const props = defineProps({
  searching: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits<{
  "update:searching": [value: boolean]
}>();

const searchText = ref("");
const foundUsers = ref<Array<SearchUserType & {text: string}>>([])
const selectedFoundUser = ref(-1);

async function updateSearch() {
  if (searchText.value === "") return emit("update:searching", false);
  let users = await searchUser(searchText.value);
  if (users) foundUsers.value = users.map(user => ({
    ...user,
    text: user.minStr !== "username" ? `${user.username} (${user[user.minStr]})` : user.username
  }));
}

function selectUser(event: KeyboardEvent) {
  if (event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key != "Escape") return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  if (event.key === "ArrowUp" && selectedFoundUser.value >= 0) selectedFoundUser.value--;
  if (event.key === "ArrowDown" && selectedFoundUser.value < foundUsers.value.length - 1) selectedFoundUser.value++;
  if (event.key === "Escape") emit("update:searching", false);
}

onMounted(() => {
  document.body.addEventListener("click", () => {
    emit("update:searching", false);
    searchText.value = "";
  });
});

watch(props, () => {
  if (!props.searching) foundUsers.value = [];
});
</script>

<template>
  <Transition name="searchOpen" mode="out-in">
    <div class="search" v-if="searching" @keydown="selectUser" @click="$event.stopPropagation()">
      <TermInput v-model="searchText" @input="updateSearch" border="#9297FB" placeholder="Поиск пользователей" v-focus="selectedFoundUser < 0"/>
      <div>
        <TransitionGroup name="foundUsers">
          <RouterLink v-for="(user, index) in foundUsers" :key="user.username" :to="`/users/${user.username}`">
            <TermButton v-focus="selectedFoundUser === index" transform="1.2">{{user.text}}</TermButton>
          </RouterLink>
        </TransitionGroup>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.search {
  padding: 20px;
  width: 20%;
  text-align: center;

  @media (max-width: 764px) {
    padding: 20px 0;
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