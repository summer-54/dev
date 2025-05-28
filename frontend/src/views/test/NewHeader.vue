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
import menu_olymp from "@/assets/menu_olymp.jpg";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
</script>

<template>
  <HeaderRoot>
    <HeaderRootItem navigate-to="/">
      <template #heading>
        <div :class="$style.flex">
          <ThemeInvertSvg :src="news" alt=""/>
          <span>
            Новости и статьи
            <Icon icon="radix-icons:caret-down" :class="$style.CaretDown"/>
          </span>
        </div>
      </template>
      <PrimaryLayout>
        <template #primary>
          <RouterLink :class="$style.Callout" to="/olymp">
            <img :src="home" style="width: 100%">
            <div :class="$style.CalloutHeading">Нововти</div>
          </RouterLink>
        </template>

        <HeaderListItem title="Школьная информатика" navigate-to="/">
            Темы, проходимые на уроках; ОГЭ; ЕГЭ
        </HeaderListItem>
        <HeaderListItem title="Олимпиадная информатика">
            Подробные конспекты лекций
        </HeaderListItem>
        <HeaderListItem title="Промышленная разработка">
            Статьи про реальные навыки, необходимые для программистов, и подготовка к PROD и высшей пробе по промышленному программированию
        </HeaderListItem>
      </PrimaryLayout>
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
            <ThemeInvertSvg :src="menu_olymp" style="width: 100%" alt=""/>
            <div :class="$style.CalloutHeading">Внутрення олимпиада</div>
            <p :class="$style.CalloutText">Апрель. Вы. 3 часа. 5-8 задач.<br>ICPC-формат.</p>
          </RouterLink>
        </template>

        <HeaderListItem title="Летний кубок" navigateTo="/summer-cup">
          Соревнование, которое длится почти всё лето!
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
  </HeaderRoot>
</template>

<style module>
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
  color: var(--grass-10);
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