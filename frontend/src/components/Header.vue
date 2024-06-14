<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet">
    <h1>Информатика в <a href="https://moscowschool54.ru/" target="_blank">школе №54</a></h1>
    <span class="all">
        <span class="element"><a href="/"           class="element_a">Главная</a></span>
        <span class="element"><a href="/olymp"      class="element_a">Олимпиада</a></span>
        <span class="element"><a href="/summer-cup" class="element_a">Летний кубок</a></span>
    </span>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({

});
</script>
<style scoped>
.all {
    background-color: lightskyblue;
    padding: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-around;
}
.element_a {
    font-family: "Tiny5", sans-serif;
}
.element {
    font-size: 3em;
}
a:any-link {
    text-decoration: none;
    color: blueviolet;
    cursor: pointer;
}
</style>
