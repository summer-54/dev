<script lang="ts">
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue"
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import Title from "@/components/Title.vue";
import {hasToken, isUniqueCodeforcesHandle, isUniqueUsername, register} from "@/api/users.js";
import CustomForm from "@/components/ui/CustomForm.vue";
import FormComment from "@/components/ui/formComment.vue";

export default defineComponent({
  name: "RegistrationView",
  components: {FormComment, CustomForm, Title, SuiInput, SuiButton},
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
      codeforcesHandle: "",
      isUniqueUsername: true,
      isUniqueCodeforcesHandle: true,
      pending: false
    }
  },
  mounted() {
    if (hasToken()) this.$router.push("/me");
  },
  watch: {
    username() {
      isUniqueUsername(this.username).then(unique => this.isUniqueUsername = Boolean(unique));
    },
    codeforcesHandle() {
      isUniqueCodeforcesHandle(this.codeforcesHandle).then(unique => this.isUniqueCodeforcesHandle = Boolean(unique));
    }
  },
  methods: {
    async submit(event: Event) {
      event.preventDefault();
      this.pending = true;
      let response = await register({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        codeforcesHandle: this.codeforcesHandle
      });
      this.pending = false;
      if (!response) this.$router.push("/me");
    }
  },
  computed: {
    isPasswordEqual() {
      return this.password === this.passwordRepeat;
    }
  }
});
</script>

<template>
  <main>
    <Title text="Регистрация"/>
    <CustomForm>
      <SuiInput maxLength="50" placeholder="Имя пользователя" v-model="username" border="#9297FB"/>
      <FormComment v-if="!isUniqueUsername">Не уникально</FormComment>
      <SuiInput maxLength="50" placeholder="Пароль" password v-model="password" border="#9297FB"/>
      <SuiInput maxLength="50" placeholder="Повторите пароль" password v-model="passwordRepeat" border="#9297FB"/>
      <FormComment v-if="!isPasswordEqual">Не совподает</FormComment>
      <SuiInput maxLength="50" placeholder="Имя" v-model="firstName" border="#9297FB"/>
      <SuiInput maxLength="50" placeholder="Фамилия" v-model="lastName" border="#9297FB"/>
      <SuiInput maxLength="50" placeholder="Ник на Codeforces" v-model="codeforcesHandle" border="#9297FB"/>
      <FormComment v-if="!isUniqueCodeforcesHandle">Не уникально</FormComment>
      <span class="buttons">
        <SuiButton :disabled="!isPasswordEqual || !isUniqueUsername || !isUniqueCodeforcesHandle || pending" @click="submit" border="#9297FB">Зарегистрироваться</SuiButton>
        <SuiButton border="#9297FB"><RouterLink to="/sign-in">Войти</RouterLink></SuiButton>
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
a {
  text-decoration: none;
}
</style>