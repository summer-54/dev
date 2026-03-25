<script setup lang="ts">
import TermHeaderRoot from "./TermHeaderRoot.vue";
import TermHeaderRootItem from "./TermHeaderRootItem.vue";
import TermPrimaryLayout from "./TermPrimaryLayout.vue";
import home from "@/assets/home.svg";
import TermHeaderListItem from "./TermHeaderListItem.vue";
import news from "@/assets/news2.svg";
import {Icon} from "@iconify/vue";
import cup from "@/assets/cup.svg";
import account from "@/assets/account.svg";
import inf54 from "@/assets/inf54.ico";
//import menu from "@/assets/menu.svg";
import darkIcon from "@/assets/dark.svg";
import lightIcon from "@/assets/light.svg";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
import TermSecondaryLayout from "./TermSecondaryLayout.vue";
import {ref} from "vue";
import Drawer from "primevue/drawer";
import PanelMenu from "primevue/panelmenu";
import CalloutButton from "@/components/termui/header/CalloutButton.vue";

const sideBarOpened = ref(false);
</script>

<template>
  <TermHeaderRoot :class="$style.desktop">
    <TermHeaderRootItem content-less navigate-to="/">
      <template #heading>
        <div :class="$style.flex">
          <img :src="inf54" alt="" :class="$style.inf54img"/>
          <span>
              inf54
          </span>
        </div>
      </template>
    </TermHeaderRootItem>
    <TermHeaderRootItem navigate-to="/">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="news" alt=""/>
          <span>
            Статьи
          </span>
        </div>
      </template>
      <TermSecondaryLayout>
        <TermHeaderListItem title="Школьная информатика">
          Темы уроков; ОГЭ; ЕГЭ
        </TermHeaderListItem>
        <TermHeaderListItem title="Олимпиадная информатика">
          Подробные конспекты лекций
        </TermHeaderListItem>
        <TermHeaderListItem title="Промышленная разработка">
          Статьи про реальные навыки, необходимые для программистов, и подготовка к PROD и высшей пробе по промышленному программированию
        </TermHeaderListItem>
      </TermSecondaryLayout>
    </TermHeaderRootItem>
    <TermHeaderRootItem>
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="cup" alt=""/>
          <span>
            Соревнования и поездки
          </span>
        </div>
      </template>
      <TermPrimaryLayout>
        <template #primary>
          <RouterLink :class="$style.CalloutRouterLink" to="/olymp">
            <CalloutButton>
              <template #heading>Внутрення олимпиада</template>
              Апрель. Вы. 3 часа. 5-8 задач.<br>ICPC-формат.
            </CalloutButton>
          </RouterLink>
        </template>

        <TermHeaderListItem title="Летний кубок" navigateTo="/summer-cup">
          Соревнование, которое длится почти всё лето!
        </TermHeaderListItem>
        <TermHeaderListItem title="ЛШП" navigateTo="/summer-camp">
          Выездная летняя школа по программированию
        </TermHeaderListItem>
      </TermPrimaryLayout>
    </TermHeaderRootItem>
    <TermHeaderRootItem content-less navigate-to="/me">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="account" alt=""/>
          <span>
            Аккаунт
          </span>
        </div>
      </template>
    </TermHeaderRootItem>
    <TermHeaderRootItem content-less @click="$setTheme($themeName === 'dark' ? 'light' : 'dark')">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="$themeName === 'dark' ? lightIcon : darkIcon" alt=""/>
        </div>
      </template>
    </TermHeaderRootItem>
  </TermHeaderRoot>
  <TermHeaderRoot :class="$style.mobile">
    <TermHeaderRootItem content-less @click="sideBarOpened = !sideBarOpened">
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
    </TermHeaderRootItem>
    <TermHeaderRootItem content-less navigate-to="/me">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="account" alt=""/>
          <span>
            Аккаунт
          </span>
        </div>
      </template>
    </TermHeaderRootItem>
    <TermHeaderRootItem content-less @click="$setTheme($themeName === 'dark' ? 'light' : 'dark')">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="$themeName === 'dark' ? lightIcon : darkIcon" alt=""/>
        </div>
      </template>
    </TermHeaderRootItem>
  </TermHeaderRoot>
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

.CaretDown {
  position: relative;
  top: 1px;
  transition: transform 250ms ease;
}

[data-state='open'] > .CaretDown {
  transform: rotate(-180deg);
}

.CalloutRouterLink {
  text-decoration: none;
}
</style>