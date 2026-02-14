<script lang="ts">
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue"
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import Title from "@/components/Title.vue";
import {hasToken, signIn} from "@/api/users.js";
import CustomForm from "@/components/ui/CustomForm.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "SignInView",
  components: {ProgressIndicator, CustomForm, Title, SuiButton, SuiInput},
  data() {
    return {
      username: "",
      password: "",
      wrong: false,
      pending: false
    }
  },
  async mounted() {
    if (await hasToken()) {
      let to = this.$router.currentRoute.value.query.next?.toString() ?? "/me";
      if (to.startsWith("/")) this.$router.push(to);
      else window.location.href = to;
    }
  },
  methods: {
    async submit(event: Event) {
      event.preventDefault();
      this.pending = true;
      try {
        let response = await signIn(this.username, this.password);
        if (response) {
          let to = this.$router.currentRoute.value.query.next?.toString() ?? "/me";
          if (to.startsWith("/")) this.$router.push(to);
          else window.location.href = to;
        }
        else this.wrong = true;
      }
      catch (error) {
        this.wrong = true;
      }
      this.pending = false;
    }
  }
});
</script>

<template>
  <main>
    <Title text="Вход"/>
    <CustomForm>
      <SuiInput maxLength="50" placeholder="Имя пользователя" v-model="username" border="#9297FB"/>
      <SuiInput maxLength="50" placeholder="Пароль" password v-model="password" border="#9297FB"/>
      <span v-if="wrong">Неверное имя пользователя или пароль</span>
      <span class="buttons">
        <SuiButton @click="submit" :disabled="pending" border="#9297FB">Войти</SuiButton>
        <RouterLink to="/registration"><SuiButton border="#9297FB">Зарегистрироваться</SuiButton></RouterLink>
      </span>
      <span class="buttons">
        <RouterLink to="/recovery">Забыли пароль?</RouterLink>
      </span>
    </CustomForm>
    <ProgressIndicator v-if="pending"/>
  </main>
</template>

<style scoped>
input {
  @media (max-width: 420px){
    width: 75%;
  }
}
button {
  font-family: "LXGW WenKai Mono TC", monospace;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;

  * {
    margin-bottom: 0;
  }
}
a {
  text-decoration: none;
}
</style>