<script setup lang="ts">
import HeaderRoot from "@/header/HeaderRoot.vue";
import HeaderRootItem from "@/header/HeaderRootItem.vue";
import PrimaryLayout from "@/header/PrimaryLayout.vue";
import home from "@/assets/home.svg";
import HeaderListItem from "@/header/HeaderListItem.vue";
import news from "@/assets/news2.svg";
import {Icon} from "@iconify/vue";
import cup from "@/assets/cup.svg";
import account from "@/assets/account.svg";
import inf54 from "@/assets/inf54.ico";
//import menu from "@/assets/menu.svg";
import menu_olymp from "@/assets/menu_olymp.jpg";
import darkIcon from "@/assets/dark.svg";
import lightIcon from "@/assets/light.svg";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
import SecondaryLayout from "@/header/SecondaryLayout.vue";
import {ref} from "vue";
import Drawer from "primevue/drawer";
import PanelMenu from "primevue/panelmenu";

const sideBarOpened = ref(false);
</script>

<template>
  <HeaderRoot :class="$style.desktop">
    <HeaderRootItem content-less navigate-to="/">
      <template #heading>
        <div :class="$style.flex">
          <img :src="inf54" alt="" :class="$style.inf54img"/>
          <span>
              inf54
          </span>
        </div>
      </template>
    </HeaderRootItem>
    <HeaderRootItem navigate-to="/">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="news" alt=""/>
          <span>
            Статьи
            <Icon icon="radix-icons:caret-down" :class="$style.CaretDown"/>
          </span>
        </div>
      </template>
      <SecondaryLayout>
        <HeaderListItem title="Школьная информатика">
          Темы уроков; ОГЭ; ЕГЭ
        </HeaderListItem>
        <HeaderListItem title="Олимпиадная информатика">
          Подробные конспекты лекций
        </HeaderListItem>
        <HeaderListItem title="Промышленная разработка">
          Статьи про реальные навыки, необходимые olympдля программистов, и подготовка к PROD и высшей пробе по промышленному программированию
        </HeaderListItem>
      </SecondaryLayout>
    </HeaderRootItem>
    <HeaderRootItem>
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="cup" alt=""/>
          <span>
            Соревнования и поездки
            <Icon icon="radix-icons:caret-down" :class="$style.CaretDown"/>
          </span>
        </div>
      </template>
      <PrimaryLayout>
        <template #primary>
          <RouterLink :class="$style.Callout" to="/olymp">
            <img :src="menu_olymp" style="width: 100%" alt=""/>
            <div :class="$style.CalloutHeading">Внутрення олимпиада</div>
            <p :class="$style.CalloutText">Апрель. Вы. 3 часа. 5-8 задач.<br>ICPC-формат.</p>
          </RouterLink>
        </template>

        <HeaderListItem title="Летний кубок" navigateTo="/summer-cup">
          Соревнование, которое длится почти всё лето!
        </HeaderListItem>
        <HeaderListItem title="ЛШП" navigateTo="/summer-camp">
          Выездная летняя школа по программированию
        </HeaderListItem>
      </PrimaryLayout>
    </HeaderRootItem>
    <HeaderRootItem content-less navigate-to="/me">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="account" alt=""/>
          <span>
            Аккаунт
          </span>
        </div>
      </template>
    </HeaderRootItem>
    <HeaderRootItem content-less @click="$setTheme($themeName === 'dark' ? 'light' : 'dark')">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="$themeName === 'dark' ? lightIcon : darkIcon" alt=""/>
        </div>
      </template>
    </HeaderRootItem>
  </HeaderRoot>
  <HeaderRoot :class="$style.mobile">
    <HeaderRootItem content-less @click="sideBarOpened = !sideBarOpened">
      <template #heading>
        <div :class="$style.flex">
          <img :src="inf54" alt="" :class="$style.inf54img"/>
          <span>
            inf54
            <Icon icon="radix-icons:caret-down" :class="$style.CaretDown"/>
          </span>
<!--          <ThemeInvertSvg :src="menu" alt=""/>-->
        </div>
      </template>
    </HeaderRootItem>
    <HeaderRootItem content-less navigate-to="/me">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="account" alt=""/>
          <span>
            Аккаунт
          </span>
        </div>
      </template>
    </HeaderRootItem>
    <HeaderRootItem content-less @click="$setTheme($themeName === 'dark' ? 'light' : 'dark')">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="$themeName === 'dark' ? lightIcon : darkIcon" alt=""/>
        </div>
      </template>
    </HeaderRootItem>
  </HeaderRoot>
  <Drawer v-model:visible="sideBarOpened" :class="$style.drawer">
    <PanelMenu :model="[
      {
        label: 'Новости',
        icon: home,
        route: '/',
        command() {sideBarOpened = false}
      },
      {
        label: 'Статьи',
        icon: news,
        items: [
          {
            label: 'Школьная информатика',
            command() {sideBarOpened = false}
          },
          {
            label: 'Олимпиадная информатика',
            command() {sideBarOpened = false}
          },
          {
            label: 'Промышленная разработка',
            command() {sideBarOpened = false}
          }
        ]
      },
      {
        label: 'Соревнования и поездки',
        icon: cup,
        items: [
          {
            label: 'Внутрення олимпиада',
            route: '/olymp',
            command() {sideBarOpened = false}
          },
          {
            label: 'Летний кубок',
            route: '/summer-cup',
            command() {sideBarOpened = false}
          },
          {
            label: 'ЛШП',
            route: '/summer-camp',
            command() {sideBarOpened = false}
          }
        ]
      }
    ]">
      <template #item="{item: {label, icon, items, route}}">
        <RouterLink :to='route' :class="$style.menuElem" v-if="route">
          <ThemeInvertSvg v-if="icon" :alt="label as string" :src="icon as string"/>
          {{label}}
          <Icon icon="radix-icons:caret-down" :class="$style.CaretDown" v-if="items"/>
        </RouterLink>
        <div :class="$style.menuElem" v-else>
          <ThemeInvertSvg v-if="icon" :alt="label as string" :src="icon as string"/>
          {{label}}
          <Icon icon="radix-icons:caret-down" :class="$style.CaretDown" v-if="items"/>
        </div>
      </template>
    </PanelMenu>
  </Drawer>
</template>

<style module>
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/indigo.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/green.css';
@import '@radix-ui/colors/grass.css';

.desktop {
  @media (width < 700px) {
    display: none;
  }

  position: sticky;
  top: 10px;
}

.inf54img {
  width: 24px;
  height: 24px;
}

.mobile {
  @media (width >= 700px) {
    display: none;
  }

  position: sticky;
  top: 10px;
}

.drawer {
  width: 350px !important;
}

.menuElem {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  text-decoration: none;
}

.flex {
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: row;
}

.Callout {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--green-9) 0%, var(--indigo-9) 100%);
  border-radius: 6px;
  padding: 25px;
  text-decoration: none;
  outline: none;
  user-select: none;
}
.Callout:focus {
  box-shadow: 0 0 0 2px var(--grass-7);
}

.CalloutHeading {
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 16px;
  margin-bottom: 7px;
}

.CaretDown {
  position: relative;
  top: 1px;
  transition: transform 250ms ease;
}

.CalloutText {
  color: var(--mauve-4);
  font-size: 14px;
  line-height: 1.3;
}

[data-state='open'] > .CaretDown {
  transform: rotate(-180deg);
}
</style>