<script lang="ts">
import {defineComponent} from 'vue';
import { Icon } from '@iconify/vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'
import './styles.css'

import NavigationMenuListItem from './NavigationMenuListItem.vue'

export default defineComponent({
  name: "RadixHeader",
  components: {NavigationMenuList, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuRoot, NavigationMenuTrigger, NavigationMenuViewport, NavigationMenuListItem},
  data() {
    return {
      currentTrigger: "radix-v-"
    }
  }
})
</script>

<template>
  <NavigationMenuRoot
      v-model="currentTrigger"
      :class="$style.NavigationMenuRoot"
  >
    <NavigationMenuList :class="$style.NavigationMenuList">
      <NavigationMenuItem>
        <NavigationMenuTrigger
            :class="$style.NavigationMenuTrigger"
        >
          Learn
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
                <a
                    :class="$style.Callout"
                    href="/"
                >
                  <img src="https://www.radix-vue.com/logo.svg">
                  <div :class="$style.CalloutHeading">Radix Primitives</div>
                  <p :class="$style.CalloutText">Unstyled, accessible components for Vue.</p>
                </a>
              </NavigationMenuLink>
            </li>

            <NavigationMenuListItem
                href="https://stitches.dev/"
                title="Stitches"
            >
              CSS-in-JS with best-in-class developer experience.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                href="/colors"
                title="Colors"
            >
              Beautiful, thought-out palettes with auto dark mode.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                href="https://icons.radix-ui.com/"
                title="Icons"
            >
              A crisp set of 15x15 icons, balanced and consistent.
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
            >
              Build high-quality, accessible design systems and web apps.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Getting started"
                href="/docs/primitives/overview/getting-started"
            >
              A quick tutorial to get you up and running with Radix Primitives.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Styling"
                href="/docs/primitives/guides/styling"
            >
              Unstyled and compatible with any styling solution.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Animation"
                href="/docs/primitives/guides/animation"
            >
              Use CSS keyframes or any animation library of your choice.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Accessibility"
                href="/docs/primitives/overview/accessibility"
            >
              Tested in a range of browsers and assistive technologies.
            </NavigationMenuListItem>
            <NavigationMenuListItem
                title="Releases"
                href="/docs/primitives/overview/releases"
            >
              Radix Primitives releases and their changelogs.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
            :class="$style.NavigationMenuLink"
            href="https://github.com/unovue/radix-vue"
        >
          Github
        </NavigationMenuLink>
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
  background-color: white;
  padding: 4px;
  border-radius: 6px;
  list-style: none;
  box-shadow: 0 2px 10px var(--black-a7);
  margin: 0;
}

.NavigationMenuTrigger,
.NavigationMenuLink {
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  font-size: 15px;
  color: var(--grass-11);
  text-decoration: none;
}
.NavigationMenuTrigger:focus,
.NavigationMenuLink:focus {
  box-shadow: 0 0 0 2px var(--grass-7);
}
.NavigationMenuTrigger:hover,
.NavigationMenuLink:hover {
  background-color: var(--grass-3);
}

.NavigationMenuTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  background: transparent;
  outline: none;
  border: none;
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
  background-color: white;
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

.ListItemLink {
  display: block;
  outline: none;
  text-decoration: none;
  user-select: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  line-height: 1;
}
.ListItemLink:focus {
  box-shadow: 0 0 0 2px var(--grass-7);
}
.ListItemLink:hover {
  background-color: var(--mauve-3);
}

.ListItemHeading {
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 5px;
  color: var(--grass-12);
}

.ListItemText {
  color: var(--mauve-11);
  line-height: 1.4;
  font-weight: initial;
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
  background-color: white;
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