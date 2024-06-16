<template>
  <header>
    <h1>Информатика в <a href="https://moscowschool54.ru/" target="_blank">школе №54</a></h1>
    <nav>
      <span class="element"><RouterLink to="/"><SuiButton class="element_a">Главная</SuiButton></RouterLink></span>
      <span class="element"><RouterLink to="/olymp"><SuiButton class="element_a">Олимпиада</SuiButton></RouterLink></span>
      <span class="element"><RouterLink to="/summer-cup"><SuiButton class="element_a">Летний кубок</SuiButton></RouterLink></span>
    </nav>
  </header>
  <teleport to="body">
    <footer>
      <nav>
        <span class="element"><RouterLink to="/"><SuiButton class="element_a">Главная</SuiButton></RouterLink></span>
        <span class="element"><RouterLink to="/olymp"><SuiButton class="element_a">Олимпиада</SuiButton></RouterLink></span>
        <span class="element"><RouterLink to="/summer-cup"><SuiButton class="element_a">Летний кубок</SuiButton></RouterLink></span>
      </nav>
    </footer>
  </teleport>
</template>

<script>
import {defineComponent} from "vue";
// @ts-ignore
import SuiButton from "sffui.vue/suiButton.vue";

export default defineComponent({
  name: "Header",
  components: {SuiButton}
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

        font-family: "Tiny5", sans-serif !important;
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
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: var(--headerBg);

  nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
      margin: 8px 0;
    }

    * {
      font-size: 16px;
      font-family: "Tiny5", sans-serif;
    }
  }
}

a:any-link {
  text-decoration: none;
  color: blueviolet;
  cursor: pointer;
}
</style>
