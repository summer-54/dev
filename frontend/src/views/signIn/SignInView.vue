<script lang="ts">
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue"
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import Title from "@/components/Title.vue";
import {signIn} from "@/api/users.js";
import CustomForm from "@/components/ui/CustomForm.vue";

export default defineComponent({
  name: "SignInView",
  components: {CustomForm, Title, SuiButton, SuiInput},
  data() {
    return {
      username: "",
      password: "",
      wrong: false,
      pending: false
    }
  },
  methods: {
    async submit(event: Event) {
      event.preventDefault();
      this.pending = true;
      try {
        let response = await signIn(this.username, this.password);
        if (response) this.$router.push("/me");
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
      <SuiInput maxLength="50" placeholder="Имя пользователя" v-model="username"/>
      <SuiInput maxLength="50" placeholder="Пароль" password v-model="password"/>
      <span v-if="wrong">Неверное имя пользователя или пароль</span>
      <span class="buttons">
      <SuiButton @click="submit" class="first" :disabled="pending">Войти</SuiButton>
      <SuiButton><RouterLink to="/registration">Зарегистрироваться</RouterLink></SuiButton>
    </span>
    </CustomForm>
  </main>
</template>

<style scoped>
.buttons {
  * {
    margin-bottom: 0;
    margin-right: 20px;
  }

  *:last-child {
    margin-right: 0;
  }
}
</style>