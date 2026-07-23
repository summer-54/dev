<script setup lang="ts">
import menu_olymp from "@/assets/photo/menu_olymp.jpg";
import {computed} from "vue";
import {colors} from "@/components/termui/header/colors.js";

const primaryColor = computed(() => colors.value.primaryColor);
</script>

<template>
  <div :class="[$style.Callout, 'callout']">
    <span class="bracket bracket-left"></span>
    <img :src="menu_olymp" style="width: 100%" alt=""/>
    <div :class="$style.CalloutHeading"><slot name="heading"/></div>
    <p :class="$style.CalloutText"><slot/></p>
    <span class="bracket bracket-right"></span>
  </div>
</template>

<style scoped>
.bracket {
  border: 2px solid v-bind(primaryColor);
}

.bracket {
  width: 5px;
  opacity: 0;
  position: absolute;
  transition: all ease-in-out 0.2s;
  top: 50%;
  transform: translateY(-50%);
}

.bracket-left {
  border-right: none;
  left: 0;
}

.bracket-right {
  border-left: none;
  right: 0;
}

.bracket {
  height: calc(100% + 10px);
  box-sizing: border-box;
}

.bracket-left {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.bracket-right {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

:global(.dark) {
  .callout {
    background: #95EAA710;
  }
}

.callout:hover {
  .bracket {
    opacity: 1;
  }

  .bracket-left {
    left: -8px;
  }

  .bracket-right {
    right: -8px;
  }
}
</style>

<style module>
.Callout {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 6px;
  padding: 25px;
  text-decoration: none;
  outline: none;
  user-select: none;
  position: relative;

  img {
    border-radius: 10px;
  }
}
.Callout:focus {
  box-shadow: 0 0 0 2px var(--grass-7);
}

.CalloutHeading {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 16px;
  margin-bottom: 7px;
  color: v-bind(primaryColor);
}

.CalloutText {
  font-size: 14px;
  line-height: 1.3;
}
</style>