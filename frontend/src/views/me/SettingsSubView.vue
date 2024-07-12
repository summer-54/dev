<script lang="ts">
import {defineComponent} from 'vue'
import {getMe, me, patchUser, patchUserPassword, register} from "@/api/users.js";
import Title from "@/components/Title.vue";
import Subtitle from "@/components/Subtitle.vue";
// @ts-ignore
import SuiInput from "sffui.vue/suiInput.vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";
import CustomForm from "@/components/ui/CustomForm.vue";
import FormComment from "@/components/ui/formComment.vue";

export default defineComponent({
  name: "SettingsSubView",
  components: {FormComment, CustomForm, Subtitle, Title, SuiInput, SuiButton},
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
    isPasswordEqual() {return this.newPassword === this.newPasswordRepeat;}
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
        <CustomForm>
          <Subtitle text="Общая информация"/>
          <FormComment color="unset">Ник на Codeforces:</FormComment>
          <SuiInput :placeholder="user?.codeforcesHandle" v-model="codeforcesHandle" border="#9297FB"/>
          <FormComment color="unset">Имя:</FormComment>
          <SuiInput :placeholder="user?.firstName" v-model="firstName" border="#9297FB"/>
          <FormComment color="unset">Фамилия:</FormComment>
          <SuiInput :placeholder="user?.lastName" v-model="lastName" border="#9297FB"/>
          <SuiButton @click="patchUser" :disabled="pending" border="#9297FB">Обновить</SuiButton>
        </CustomForm>
        <CustomForm>
          <Subtitle text="Смена пароля"/>
          <SuiInput password placeholder="Старый пароль" v-model="oldPassword" border="#9297FB"/>
          <FormComment v-if="!correctPassword">Не подходит</FormComment>
          <SuiInput password placeholder="Новый пароль" v-model="newPassword" border="#9297FB"/>
          <SuiInput password placeholder="Повторите пароль" v-model="newPasswordRepeat" border="#9297FB"/>
          <FormComment v-if="!isPasswordEqual">Не совпадает</FormComment>
          <SuiButton @click="patchPassword" :disabled="!isPasswordEqual || pending" border="#9297FB">Обновить пароль</SuiButton>
        </CustomForm>
      </div>
    </template>
    <Title text="Загрузка..." v-else/>
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
</style>