<template>
  <header>
    <h1>Информатика в <a href="https://moscowschool54.ru/" target="_blank">школе №54</a></h1>
    <nav>
      <NavButton to="/" :icon="homeIcon">Главная</NavButton>
      <NavButton to="/olymp" :icon="olympIcon">Олимпиада</NavButton>
      <NavButton to="/summer-cup" :icon="cupIcon">Летний кубок</NavButton>
    </nav>
  </header>
  <teleport to="body">
    <footer>
      <nav>
        <NavButton to="/" :icon="homeIcon">Главная</NavButton>
        <NavButton to="/olymp" :icon="olympIcon">Олимпиада</NavButton>
        <NavButton to="/summer-cup" :icon="cupIcon">Летний кубок</NavButton>
      </nav>
    </footer>
  </teleport>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CustomRouterLink from "@/components/ui/customRouterLink.vue";
import NavButton from "@/components/ui/navButton.vue";
import homeIcon from "@/assets/home.svg"
import cupIcon from "@/assets/cup.svg"
import olympIcon from "@/assets/olymp.svg"

export default defineComponent({
  name: "Header",
  components: {NavButton, CustomRouterLink},
  data() {
    return {homeIcon, cupIcon, olympIcon}
  },
});
</script>

<style scoped>
* {
  --headerBg: lightskyblue;
}

header {
  display: flex;
  background-color: var(--headerBg);
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: 100000;
  padding: 8px;

  @media (max-width: 625px) {
    justify-content: center;
  }

  h1 {
    margin: 0 0 0 20px;
    font-family: "LXGW WenKai Mono TC", monospace;

    @media (max-width: 854px) {
      margin-left: 8px;
    }

    @media (min-width: 530px) and (max-width: 836px) {
      font-size: 20px;
    }

    @media (max-width: 625px) {
      font-size: 25px;
      margin-left: 0;
    }

    @media (max-width: 315px) {
      font-size: 20px;
      margin-left: 0;
    }
  }

  nav {
    @media (max-width: 625px) {
      display: none;
    }

    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 500px) {
      width: 100%;
      justify-content: space-evenly;
    }

    span {
      @media (min-width: 500px) {
        margin-right: 8px;
      }

      @media (min-width: 500px) and (max-width: 530px) {
        margin: 4px 4px 4px 0;
      }

      a button {
        @media (max-width: 830px) {
          font-size: 16px;
        }
      }

      margin: 8px 0;
    }
  }
}

footer {
  @media (min-width: 626px) {
    display: none;
  }

  overflow: visible;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--headerBg);

  nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px;
  }
}

a:any-link {
  text-decoration: none;
  color: blueviolet;
  cursor: pointer;
}
</style>

<style module>
.button * {
  @media (max-width: 800px) {
    font-size: 16px !important;
  }

  @media (max-width: 380px) {
    font-size: 12px !important;
    padding: 10px !important;
  }

  font-family: "Tiny5", sans-serif !important;
}
</style>

<style>
#app {
  @media (max-width: 501px) {
    padding-bottom: 60px;
  }
}
</style>