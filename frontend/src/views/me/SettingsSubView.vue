<script lang="ts">
import {defineComponent} from 'vue'
import {getMe, me, patchUser, patchUserPassword} from "@/api/users.js";
import Title from "@/components/Title.vue";
import Subtitle from "@/components/Subtitle.vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import CustomForm from "@/components/ui/CustomForm.vue";
import FormComment from "@/components/ui/formComment.vue";
import TermButton from "@/components/termui/TermButton.vue";
import TermWindow from "@/components/termui/TermWindow.vue";
import TermInput from "@/components/termui/TermInput.vue";

export default defineComponent({
  name: "SettingsSubView",
  components: {TermInput, TermWindow, TermButton, FormComment, CustomForm, Subtitle, Title, SuiInput, SuiButton},
  data() {
    return {
      firstName: "",
      lastName: "",
      codeforcesHandle: "",
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
      correctPassword: true,
      pending: false
    }
  },
  computed: {
    user: () => me.value,
    isPasswordEqual() {return this.newPassword === this.newPasswordRepeat;},
    passwordStrength() {
      if (this.newPassword.split("").map(char => char >= 'а' && char <= 'я' || char >= 'А' && char <= 'Я').filter(value => value).length) return -1;
      if (this.newPassword.length < 4) return 0;
      let numbersCount = this.newPassword.split("").map(char => char >= '1' && char <= '9').filter(value => value).length;
      let lowerCaseCount = this.newPassword.split("").map(char => char >= 'a' && char <= 'z').filter(value => value).length;
      let upperCaseCount = this.newPassword.split("").map(char => char >= 'A' && char <= 'Z').filter(value => value).length;
      let symbolsCount = this.newPassword.split("").map(char => !(char >= '1' && char <= '9' || char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z')).filter(value => value).length;
      return Math.min(numbersCount, 2) + Math.min(lowerCaseCount, 1) + Math.min(upperCaseCount, 1) + Math.min(symbolsCount, 2);
    }
  },
  methods: {
    async patchUser(event: Event) {
      event.preventDefault();
      this.pending = true;
      let response = await patchUser({
        firstName: this.firstName,
        lastName: this.lastName,
        codeforcesHandle: this.codeforcesHandle
      });
      this.pending = false;
      if (response) {
        me.value = await getMe();
        this.$router.push("/me");
      }
    },
    async patchPassword(event: Event) {
      event.preventDefault();
      this.pending = true;
      let response = await patchUserPassword(this.oldPassword, this.newPassword);
      this.pending = false;
      if (response) this.$router.push("/me");
      else this.correctPassword = false;
    },
    setup() {
      if (this.user) {
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.codeforcesHandle = this.user.codeforcesHandle;
      }
    }
  },
  watch: {
    user() {
      this.setup();
    },
    oldPassword() {
      this.correctPassword = true;
    }
  },
  mounted() {
    this.setup();
  }
})
</script>

<template>
  <main>
    <template v-if="user">
      <Title text="Настройки"/>
      <div>
        <TermWindow class="form" prompt="root@inf54:~# ./patch-user.sh">
          <template #header>
            Общая информация
          </template>

          <TermInput label="root@inf54:~# name:" mLabel="> name:" placeholder="Имя" noBreak v-model="firstName"/>
          <TermInput label="root@inf54:~# surname:" mLabel="> surname:" placeholder="Фамилия" noBreak v-model="lastName"/>
          <p class="subtitle">Дополнительная информация</p>
          <TermInput label="root@inf54:~# codeforces:" mLabel="> codeforces:" placeholder="Ник на Codeforces" optional noBreak v-model="codeforcesHandle"/>
          <TermButton @click="patchUser" :disabled="pending || firstName.length <= 1 || lastName.length <= 1">Обновить</TermButton>
        </TermWindow>
        <TermWindow class="form" prompt="root@inf54:~# ./patch-user.sh --password">
          <template #header>
            Смена пароля
          </template>

          <TermInput label="root@inf54:~# password:" mLabel="> password:" placeholder="Старый пароль" password noBreak v-model="oldPassword"/>
          <TermInput label="root@inf54:~# newPassword:" mLabel="> newPassword:" placeholder="Новый пароль" password noBreak v-model="newPassword"/>
          <p class="error" v-if="passwordStrength === -1">Не может содержать русские буквы</p>
          <p>Сила пароля: {{passwordStrength}}/6</p>
          <TermInput label="root@inf54:~# confirm:" mLabel="> confirm:" placeholder="Повторите новый пароль" password noBreak v-model="newPasswordRepeat"/>
          <p class="error" v-if="newPassword !== newPasswordRepeat">Не совпадает</p>
          <TermButton @click="patchPassword" :disabled="newPassword !== newPasswordRepeat || passwordStrength <= 0 || oldPassword.length <= 0 || pending">Обновить пароль</TermButton>
        </TermWindow>
      </div>
    </template>
  </main>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
  align-items: baseline;
}
button {
  width: 100%;
}

.form {
  width: calc(min(600px, 98vw));
}
</style>