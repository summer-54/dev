<script lang="ts">
import {defineComponent} from "vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue"
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue"
import Title from "@/components/Title.vue";
import {
  emailConfirm,
  hasToken,
  isUniqueCodeforcesHandle,
  isUniqueEmail,
  isUniqueUsername,
  register,
  registerStart
} from "@/api/users.js";
import CustomForm from "@/components/ui/CustomForm.vue";
import FormComment from "@/components/ui/formComment.vue";
import ProgressIndicator from "@/components/ui/progressIndicator.vue";
import TermBG from "@/components/termui/TermBG.vue";
import TermPin from "@/components/termui/TermPin.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermInput from "@/components/termui/TermInput.vue";

export default defineComponent({
  name: "RegistrationView",
  components: {
    TermInput,
    TermWindow,
    TermButton,
    TermPin,
    TermBG, ProgressIndicator, FormComment, CustomForm, Title, SuiInput, SuiButton},
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
      email: "",
      codeforcesHandle: "",
      emailConfirm: "",
      isUniqueUsername: true,
      isUniqueEmail: true,
      isUsernameEnoughLength: true,
      isUniqueCodeforcesHandle: true,
      pending: false,
      stage: 0,
      stage0Error: 0,
      emailToken: undefined as undefined | null | string
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
    },
    emailConfirm() {
      if (this.emailConfirm.length === 6) this.submit1();
    }
  },
  methods: {
    async submit(event: Event) {
      event.preventDefault();
      this.checkUsernameLength(true);
      if (!this.isPasswordEqual || !this.isUniqueUsername || !this.isUniqueEmail || !this.isUniqueCodeforcesHandle || !this.isUsernameEnoughLength || this.passwordStrength <= 0 || this.pending || !this.emailToken) return;
      this.pending = true;
      let response = await register({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        emailToken: this.emailToken,
        codeforcesHandle: this.codeforcesHandle
      });
      this.pending = false;
      if (!response) this.$router.push("/me");
    },
    checkUsernameLength(setToFalse: boolean) {
      if (this.username.length < 4 && setToFalse) this.isUsernameEnoughLength = false;
      if (this.username.length >= 4) this.isUsernameEnoughLength = true;
    },
    async submit0() {
      this.pending = true;
      this.stage0Error = await registerStart(this.email);
      if (this.stage0Error === 0) this.stage = 1;
      this.pending = false;
    },
    async submit1() {
      this.pending = true;
      this.emailToken = await emailConfirm(this.email, this.emailConfirm);
      if (this.emailToken) this.stage = 2;
      else this.emailConfirm = "";
      this.pending = false;
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
    <div class="forms">
      <TermWindow class="window" prompt="root@inf54:~# ./register.sh">
        <template #header>
          Добро пожаловать. Регистрация
        </template>

        <TermInput label="root@inf54:~# email:" mLabel="> email:" placeholder="Email" noBreak v-model="email" :disabled="stage !== 0"/>
        <p class="error" v-if="stage0Error === 1">Email некорректен</p>
        <p class="error" v-if="stage0Error === 2 || !isUniqueEmail">Email занят</p>
        <TermButton v-if="stage === 0" @click="submit0" :disabled="pending">Продолжить</TermButton>
        <TermButton v-if="stage !== 0" @click="stage = 0">Изменить</TermButton>
        <p>Уже есть аккаунт? <RouterLink class="highlight" to="/sign-in">Вход</RouterLink></p>
      </TermWindow>
      <Transition>
        <TermWindow class="window" prompt="root@inf54:~# ./register.sh --mail-confirm" v-if="stage >= 1">
          <template #header>
            Подтвердите email-адрес
          </template>

          <p class="subtitle">Введите код, который мы отправили вам на почту</p>
          <TermPin v-model="emailConfirm" :disabled="stage === 1"/>
          <p class="error" v-if="emailToken === null">Код не верный</p>
        </TermWindow>
      </Transition>
      <Transition>
        <TermWindow class="window" prompt="root@inf54:~# ./register.sh --user-info" v-if="stage >= 2">
          <template #header>
            Заполните информацию
          </template>

          <TermInput label="root@inf54:~# username:" mLabel="> username:" placeholder="Имя пользователя" noBreak v-model="username"/>
          <p class="error" v-if="!isUniqueUsername && username.length > 0">Не уникально</p>
          <p class="error" v-if="!isUsernameEnoughLength">Должно быть >= 4 символов</p>
          <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Пароль" password noBreak v-model="password"/>
          <p class="error" v-if="passwordStrength === -1">Не может содержать русские буквы</p>
          <p>Сила пароля: {{passwordStrength}}/6</p>
          <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите пароль" password noBreak v-model="passwordRepeat"/>
          <p class="error" v-if="!isPasswordEqual">Не совпадает</p>
          <TermInput label="root@inf54:~# name:" mLabel="> name:" placeholder="Имя" noBreak v-model="firstName"/>
          <TermInput label="root@inf54:~# surname:" mLabel="> surname:" placeholder="Фамилия" noBreak v-model="lastName"/>
          <p class="subtitle">Дополнительная информация</p>
          <TermInput label="root@inf54:~# codeforces:" mLabel="> codeforces:" placeholder="Ник на Codeforces" optional noBreak v-model="codeforcesHandle"/>
          <p class="error" v-if="!isUniqueCodeforcesHandle && codeforcesHandle.length > 0">Не уникально</p>
          <TermButton :disabled="!isPasswordEqual || !isUniqueUsername || !isUniqueEmail || !isUniqueCodeforcesHandle || !isUsernameEnoughLength
            || passwordStrength <= 0 || firstName.length <= 1 || lastName.length <= 1 || pending" @click="submit">Зарегистрироваться</TermButton>
        </TermWindow>
      </Transition>
    </div>
    <ProgressIndicator v-if="pending"/>
    <TermBG/>
  </main>
</template>

<style scoped>
.subtitle {
  margin: 0;
  font-size: 20px;
  text-align: center;
}

p {
  margin: 0;
}

.error {
  color: red;
}

:global(.dark) {
  .subtitle {
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
  }

  .highlight {
    color: #95EAA7FF;
    text-shadow: 0 0 5px #95EAA7FF;
  }
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: calc(min(600px, 98vw));
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: all 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>