<script setup lang="ts">
import TermHeaderRoot from "@/components/termui/header/TermHeaderRoot.vue";
import TermHeaderRootItem from "@/components/termui/header/TermHeaderRootItem.vue";
import TermPrimaryLayout from "@/components/termui/header/TermPrimaryLayout.vue";
import home from "@/assets/icons/home.svg";
import TermHeaderListItem from "@/components/termui/header/TermHeaderListItem.vue";
// import news from "@/assets/icons/news2.svg";
import {Icon} from "@iconify/vue";
import cup from "@/assets/icons/cup.svg";
import account from "@/assets/icons/account.svg";
import inf54 from "@/assets/icons/inf54.ico";
import code from "@/assets/icons/code.svg";
import darkIcon from "@/assets/icons/dark.svg";
import lightIcon from "@/assets/icons/light.svg";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
import TermSecondaryLayout from "@/components/termui/header/TermSecondaryLayout.vue";
import {ref} from "vue";
import CalloutButton from "@/components/termui/header/CalloutButton.vue";
import {useColorMode} from "@vueuse/core";
import {ElDrawer, ElMenu, ElMenuItem, ElSubMenu} from "element-plus";

const sideBarOpened = ref(false);
const dark = useColorMode({initialValue: "dark"});

function toggleDark() {
  dark.value = dark.value === "dark" ? "light" : "dark";
}
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
<!--    <TermHeaderRootItem navigate-to="/">-->
<!--      <template #heading>-->
<!--        <div :class="$style.flex">-->
<!--          <ThemeInvertSvg :src="news" alt=""/>-->
<!--          <span>-->
<!--            Статьи-->
<!--          </span>-->
<!--        </div>-->
<!--      </template>-->
<!--      <TermSecondaryLayout>-->
<!--        <TermHeaderListItem title="Школьная информатика">-->
<!--          Темы уроков; ОГЭ; ЕГЭ-->
<!--        </TermHeaderListItem>-->
<!--        <TermHeaderListItem title="Олимпиадная информатика">-->
<!--          Подробные конспекты лекций-->
<!--        </TermHeaderListItem>-->
<!--        <TermHeaderListItem title="Промышленная разработка">-->
<!--          Статьи про реальные навыки, необходимые для программистов, и подготовка к PROD и высшей пробе по промышленному программированию-->
<!--        </TermHeaderListItem>-->
<!--      </TermSecondaryLayout>-->
<!--    </TermHeaderRootItem>-->
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
    <TermHeaderRootItem>
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="code" alt=""/>
          <span>
            Решать!
          </span>
        </div>
      </template>
      <TermSecondaryLayout>
        <TermHeaderListItem title="Контесты" href="https://contest.inf54.ru" contentLess/>
        <TermHeaderListItem title="Группы" href="https://contest.inf54.ru/groups" contentLess/>
        <TermHeaderListItem title="Вопросы" href="https://contest.inf54.ru/questions">
          Можно задать вопрос по решению задачи
        </TermHeaderListItem>
        <TermHeaderListItem title="Рейтинг" href="https://contest.inf54.ru/rating">
          Рейтинг среди всех учеников школы
        </TermHeaderListItem>
      </TermSecondaryLayout>
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
    <TermHeaderRootItem content-less @click="toggleDark">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="dark ? lightIcon : darkIcon" alt=""/>
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
    <TermHeaderRootItem content-less @click="toggleDark">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="dark ? lightIcon : darkIcon" alt=""/>
        </div>
      </template>
    </TermHeaderRootItem>
  </TermHeaderRoot>
  <ElDrawer v-model="sideBarOpened" :class="$style.drawer" direction="ltr">
    <ElMenu>
      <ElMenuItem index="1">
        <RouterLink to="/" :class="$style.menuElem" @click="sideBarOpened = false">
          <ThemeInvertSvg :alt="home" :src="home"/>
          Новости
        </RouterLink>
      </ElMenuItem>
      <ElSubMenu index="2">
        <template #title>
          <div :class="$style.menuElem">
            <ThemeInvertSvg :alt="cup" :src="cup"/>
            Соревнования и поездки
          </div>
        </template>
        <ElMenuItem index="2-1">
          <RouterLink to="/olymp" :class="$style.menuElem" @click="sideBarOpened = false">
            Внутрення олимпиада
          </RouterLink>
        </ElMenuItem>
        <ElMenuItem index="2-2">
          <RouterLink to="/summer-cup" :class="$style.menuElem" @click="sideBarOpened = false">
            Летний кубок
          </RouterLink>
        </ElMenuItem>
        <ElMenuItem index="2-3">
          <RouterLink to="/summer-camp" :class="$style.menuElem" @click="sideBarOpened = false">
            ЛШП
          </RouterLink>
        </ElMenuItem>
      </ElSubMenu>
      <ElSubMenu index="3">
        <template #title>
          <div :class="$style.menuElem">
            <ThemeInvertSvg :alt="code" :src="code"/>
            Решать!
          </div>
        </template>
        <ElMenuItem index="3-1">
          <a href="https://contest.inf54.ru" :class="$style.menuElem">
            Контесты
          </a>
        </ElMenuItem>
        <ElMenuItem index="3-2">
          <a href="https://contest.inf54.ru/groupes" :class="$style.menuElem">
            Группы
          </a>
        </ElMenuItem>
        <ElMenuItem index="3-3">
          <a href="https://contest.inf54.ru/questions" :class="$style.menuElem">
            Вопросы
          </a>
        </ElMenuItem>
        <ElMenuItem index="3-3">
          <a href="https://contest.inf54.ru/rating" :class="$style.menuElem">
            Рейтинг
          </a>
        </ElMenuItem>
      </ElSubMenu>
    </ElMenu>
  </ElDrawer>
</template>

<style module>
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/indigo.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/green.css';
@import '@radix-ui/colors/grass.css';

.desktop {
  @media (width < 775px) {
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
  @media (width >= 775px) {
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
  width: 100%;
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