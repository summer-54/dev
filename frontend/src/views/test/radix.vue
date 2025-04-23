<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {computed, ref} from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue';
import './styles.css';
import menu_olymp from '@/assets/menu_olymp.jpg'

import NavigationMenuListItem from './NavigationMenuListItem.vue';

const currentTrigger = ref('radix-v-1');

const colors = ref({
  bg: "#2c2c2c",
  hoverColor: "#154311" // 3
});

const bgColor = computed(() => colors.value.bg), hoverColor = computed(() => colors.value.hoverColor);

</script>

<template>
  <NavigationMenuRoot
      v-model="currentTrigger"
      :class="$style.NavigationMenuRoot"
  >
    <NavigationMenuList :class="$style.NavigationMenuList">
      <!-- <NavigationMenuItem>
        
        <NavigationMenuLink
            :class="$style.NavigationMenuLink"
            href="/"
        >
          Главная
        </NavigationMenuLink>
      </NavigationMenuItem> -->
      
      <NavigationMenuItem>
        <NavigationMenuTrigger
          :class="$style.NavigationMenuTrigger"
        >
          <RouterLink to="/">
            <Icon
              icon="radix-icons:file-text"
            />
            Новости
          </RouterLink>
        </NavigationMenuTrigger>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
          :class="$style.NavigationMenuTrigger"
        >
          <Icon
            icon="radix-icons:home"
          />
          Соревнования
          <Icon
            icon="radix-icons:caret-down"
            :class="$style.CaretDown"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          :class="$style.NavigationMenuContent"
        >
          <ul :class="[$style.List, $style.one]">
            <li :style="{ gridRow: 'span 3' }">
              <NavigationMenuLink as-child>
                <RouterLink
                    :class="$style.Callout"
                    to="/olymp"
                >
                  <img :src="menu_olymp" style="height: 50vh;">
                  <div :class="$style.CalloutHeading">Внутрення олимпиада</div>
                  <p :class="$style.CalloutText">Апрель. Вы. 3 часа. 5-8 задач.<br>Изменённый IOI-формат.</p>
                </RouterLink>
              </NavigationMenuLink>
            </li>

            <NavigationMenuListItem
                title="Летний кубок"
                :colors="colors"
            >
              <RouterLink to="/summer-cup" style="text-decoration: none;">
                Соревнование, которое длится почти всё лето!
              </RouterLink>
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
            :class="$style.NavigationMenuTrigger"
        >
          Overview
          <Icon
              icon="radix-icons:caret-down"
              :class="$style.CaretDown"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent :class="$style.NavigationMenuContent">
          <ul :class="[$style.List, $style.two]">
            <NavigationMenuListItem
                title="Introduction"
                href="/docs/primitives/overview/introduction"
                :colors="colors"
            >
              Build high-quality, accessible design systems and web apps.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Getting started"
                href="/docs/primitives/overview/getting-started"
                :colors="colors"
            >
              A quick tutorial to get you up and running with Radix Primitives.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Styling"
                href="/docs/primitives/guides/styling"
                :colors="colors"
            >
              Unstyled and compatible with any styling solution.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Animation"
                href="/docs/primitives/guides/animation"
                :colors="colors"
            >
              Use CSS keyframes or any animation library of your choice.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Accessibility"
                href="/docs/primitives/overview/accessibility"
                :colors="colors"
            >
              Tested in a range of browsers and assistive technologies.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Releases"
                href="/docs/primitives/overview/releases"
                :colors="colors"
            >
              Radix Primitives releases and their changelogs.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuIndicator
          :class="$style.NavigationMenuIndicator"
      >
        <div :class="$style.Arrow" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div :class="$style.ViewportPosition">
      <NavigationMenuViewport
          :class="$style.NavigationMenuViewport"
      />
    </div>
  </NavigationMenuRoot>
</template>

<style module>
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/indigo.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/green.css';
@import '@radix-ui/colors/grass.css';

.NavigationMenuRoot {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  z-index: 1;
}

.NavigationMenuList {
  display: flex;
  justify-content: center;
  background-color: v-bind(bgColor);
  padding: 4px;
  border-radius: 6px;
  list-style: none;
  box-shadow: 0 2px 10px var(--black-a7);
  margin: 0;
}

.NavigationMenuTrigger,
.NavigationMenuLink {
  all: unset;

  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  font-size: 15px;
  color: #138900;
  transition: background-color 2000ms ease-in-out;
}
.NavigationMenuTrigger:focus,
.NavigationMenuLink:focus {
  box-shadow: 0 0 0 2px var(--grass-7);
}
.NavigationMenuTrigger:hover,
.NavigationMenuLink:hover {
  background-color: v-bind(hoverColor);
}

.NavigationMenuTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.NavigationMenuLink {
  display: block;
  text-decoration: none;
  font-size: 15px;
  line-height: 1;
}

.NavigationMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation-duration: 250ms;
  animation-timing-function: ease;
}
.NavigationMenuContent[data-motion='from-start'] {
  animation-name: enterFromLeft;
}
.NavigationMenuContent[data-motion='from-end'] {
  animation-name: enterFromRight;
}
.NavigationMenuContent[data-motion='to-start'] {
  animation-name: exitToLeft;
}
.NavigationMenuContent[data-motion='to-end'] {
  animation-name: exitToRight;
}
@media only screen and (min-width: 600px) {
  .NavigationMenuContent {
    width: auto;
  }
}

.NavigationMenuIndicator {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width, transform 250ms ease;
}
.NavigationMenuIndicator[data-state='visible'] {
  animation: fadeIn 200ms ease;
}
.NavigationMenuIndicator[data-state='hidden'] {
  animation: fadeOut 200ms ease;
}

.NavigationMenuViewport {
  position: relative;
  transform-origin: top center;
  margin-top: 10px;
  width: 100%;
  background-color: v-bind(bgColor);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  height: var(--radix-navigation-menu-viewport-height);
  transition: width, height, 300ms ease;
}
.NavigationMenuViewport[data-state='open'] {
  animation: scaleIn 200ms ease;
}
.NavigationMenuViewport[data-state='closed'] {
  animation: scaleOut 200ms ease;
}
@media only screen and (min-width: 600px) {
  .NavigationMenuViewport {
    width: var(--radix-navigation-menu-viewport-width);
  }
}

.List {
  display: grid;
  padding: 22px;
  margin: 0;
  column-gap: 10px;
  list-style: none;
}
@media only screen and (min-width: 600px) {
  .List.one {
    width: 500px;
    grid-template-columns: 0.75fr 1fr;
  }
  .List.two {
    width: 600px;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, 1fr);
  }
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

.CalloutText {
  color: var(--mauve-4);
  font-size: 14px;
  line-height: 1.3;
}

.ViewportPosition {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 100%;
  left: 0;
  perspective: 2000px;
}

.CaretDown {
  position: relative;
  color: var(--grass-10);
  top: 1px;
  transition: transform 250ms ease;
}
[data-state='open'] > .CaretDown {
  transform: rotate(-180deg);
}

.Arrow {
  position: relative;
  top: 70%;
  background-color: v-bind(bgColor);
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  border-top-left-radius: 2px;
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: rotateX(-30deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotateX(-10deg) scale(0.95);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>