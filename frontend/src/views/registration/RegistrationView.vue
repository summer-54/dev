<script lang="ts">
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue"
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import Title from "@/components/Title.vue";
import {hasToken, isUniqueCodeforcesHandle, isUniqueEmail, isUniqueUsername, register} from "@/api/users.js";
import CustomForm from "@/components/ui/CustomForm.vue";
import FormComment from "@/components/ui/formComment.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";

export default defineComponent({
  name: "RegistrationView",
  components: {ProgressIndicator, FormComment, CustomForm, Title, SuiInput, SuiButton},
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
      email: "",
      codeforcesHandle: "",
      isUniqueUsername: true,
      isUniqueEmail: true,
      isUsernameEnoughLength: true,
      isUniqueCodeforcesHandle: true,
      pending: false
    }
  },
  async mounted() {
    if (await hasToken()) this.$router.push("/me");
  },
  watch: {
    username() {
      isUniqueUsername(this.username).then(unique => this.isUniqueUsername = Boolean(unique));
    },
    email() {
      isUniqueEmail(this.email).then(unique => this.isUniqueEmail = Boolean(unique));
    },
    codeforcesHandle() {
      isUniqueCodeforcesHandle(this.codeforcesHandle).then(unique => this.isUniqueCodeforcesHandle = Boolean(unique));
    }
  },
  methods: {
    async submit(event: Event) {
      event.preventDefault();
      this.checkUsernameLength(true);
      if (!this.isPasswordEqual || !this.isUniqueUsername || !this.isUniqueEmail || !this.isUniqueCodeforcesHandle || !this.isUsernameEnoughLength || this.passwordStrength <= 0 || this.pending) return;
      this.pending = true;
      let response = await register({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        codeforcesHandle: this.codeforcesHandle
      });
      this.pending = false;
      if (!response) this.$router.push("/me");
    },
    checkUsernameLength(setToFalse: boolean) {
      if (this.username.length < 4 && setToFalse) this.isUsernameEnoughLength = false;
      if (this.username.length >= 4) this.isUsernameEnoughLength = true;
    }
  },
  computed: {
    isPasswordEqual() {
      return this.password === this.passwordRepeat;
    },
    passwordStrength() {
      if (this.password.split("").map(char => char >= 'а' && char <= 'я' || char >= 'А' && char <= 'Я').filter(value => value).length) return -1;
      if (this.password.length < 4) return 0;
      let numbersCount = this.password.split("").map(char => char >= '1' && char <= '9').filter(value => value).length;
      let lowerCaseCount = this.password.split("").map(char => char >= 'a' && char <= 'z').filter(value => value).length;
      let upperCaseCount = this.password.split("").map(char => char >= 'A' && char <= 'Z').filter(value => value).length;
      let symbolsCount = this.password.split("").map(char => !(char >= '1' && char <= '9' || char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z')).filter(value => value).length;
      return Math.min(numbersCount, 2) + Math.min(lowerCaseCount, 1) + Math.min(upperCaseCount, 1) + Math.min(symbolsCount, 2);
    }
  }
});
</script>

<template>
  <main>
    <Title text="Регистрация"/>
    <CustomForm>
      <SuiInput maxLength="50" placeholder="Имя пользователя" v-model="username" @change="checkUsernameLength(true)" @input="checkUsernameLength(false)"/>
      <FormComment v-if="!isUniqueUsername">Не уникально</FormComment>
      <FormComment v-if="!isUsernameEnoughLength">Должно быть >= 4 символов</FormComment>
      <SuiInput maxLength="50" placeholder="Пароль" password v-model="password"/>
      <FormComment v-if="passwordStrength === -1">Не может содержать русские буквы</FormComment>
      <FormComment color="unset">Сила пароля: {{passwordStrength}}/6</FormComment>
      <SuiInput maxLength="50" placeholder="Повторите пароль" password v-model="passwordRepeat"/>
      <FormComment v-if="!isPasswordEqual">Не совпадает</FormComment>
      <SuiInput maxLength="50" placeholder="Имя" v-model="firstName"/>
      <SuiInput maxLength="50" placeholder="Фамилия" v-model="lastName"/>
      <SuiInput maxLength="50" placeholder="Ник на Codeforces" v-model="codeforcesHandle"/>
      <FormComment v-if="!isUniqueCodeforcesHandle">Не уникально</FormComment>
      <SuiInput maxLength="64" placeholder="Email" v-model="email"/>
      <FormComment v-if="!isUniqueEmail">Не уникально</FormComment>
      <span class="buttons">
        <SuiButton :disabled="!isPasswordEqual || !isUniqueUsername || !isUniqueEmail || !isUniqueCodeforcesHandle || !isUsernameEnoughLength || passwordStrength <= 0 || pending" @click="submit">Зарегистрироваться</SuiButton>
        <RouterLink to="/sign-in"><SuiButton>Войти</SuiButton></RouterLink>
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