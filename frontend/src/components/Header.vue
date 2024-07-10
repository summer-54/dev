<template>
  <header>
    <h1>Информатика в <a href="https://moscowschool54.ru/" target="_blank">школе №54</a></h1>
    <nav>
      <span class="element"><CustomRouterLink to="/" :class="$style.button">Главная</CustomRouterLink></span>
      <span class="element"><CustomRouterLink to="/olymp" :class="$style.button">Олимпиада</CustomRouterLink></span>
      <span class="element"><CustomRouterLink to="/summer-cup" :class="$style.button">Летний кубок</CustomRouterLink></span>
    </nav>
  </header>
  <teleport to="body">
    <footer>
      <nav>
        <span class="element"><CustomRouterLink to="/" :class="$style.button">Главная</CustomRouterLink></span>
        <span class="element"><CustomRouterLink to="/olymp" :class="$style.button">Олимпиада</CustomRouterLink></span>
        <span class="element"><CustomRouterLink to="/summer-cup" :class="$style.button">Летний кубок</CustomRouterLink></span>
      </nav>
    </footer>
  </teleport>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CustomRouterLink from "@/components/ui/customRouterLink.vue";

export default defineComponent({
  name: "Header",
  components: {CustomRouterLink}
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

  @media (max-width: 500px) {
    justify-content: center;
  }

  h1 {
    margin-left: 20px;
    font-family: "LXGW WenKai Mono TC", monospace;

    @media (min-width: 530px) and (max-width: 940px) {
      font-size: 20px;
    }

    @media (min-width: 500px) and (max-width: 530px) {
      font-size: 16px;
      margin-left: 8px;
    }

    @media (max-width: 500px) {
      font-size: 25px;
      margin-left: 0;
    }

    @media (max-width: 315px) {
      font-size: 20px;
      margin-left: 0;
    }
  }

  nav {
    @media (max-width: 500px) {
      display: none;
    }

    display: flex;
    align-items: center;

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
  @media (min-width: 501px) {
    display: none;
  }

  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--headerBg);

  nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
      margin: 8px 0;

      a button {
        font-size: 16px;
        font-family: "Tiny5", sans-serif;
      }
    }
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