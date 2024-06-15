<template>
  <header>
    <h1>Информатика в <a href="https://moscowschool54.ru/" target="_blank">школе №54</a></h1>
    <nav>
      <span class="element"><SuiButton @click="$router.push('/')" class="element_a">Главная</SuiButton></span>
      <span class="element"><SuiButton @click="$router.push('/olymp')" class="element_a">Олимпиада</SuiButton></span>
      <span class="element"><SuiButton @click="$router.push('/summer-cup')" class="element_a">Летний кубок</SuiButton></span>
    </nav>
  </header>
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
header {
  display: flex;
  background-color: lightskyblue;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  @media (max-width: 1000px) {
    justify-content: center;
  }

  h1 {
    margin-left: 20px;
    font-family: "LXGW WenKai Mono TC", monospace;
    @media (max-width: 1000px) {
      display: none;
    }
  }

  nav {
    display: flex;
    align-items: center;

    @media (max-width: 1000px) {
      width: 100%;
      justify-content: space-evenly;
    }

    * {
      @media (min-width: 1000px) {
        margin-right: 10px;
      }

      @media (max-width: 530px) {
        font-size: 16px;
      }

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
