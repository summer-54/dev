<template>
    <span class="all">
        <span class="element"><a href="/">Главная</a></span>
        <span class="element"><a href="/olymp">Олимпиада</a></span>
        <span class="element"><a href="/summer-cup">Летний кубок</a></span>
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
    margin: 20px 20px 20px 20px;
    display: block;
    width: 100%;
    align-items: center;
}
.element {
    margin-left: 50px;
}
a {
    text-decoration: none;
}
</style>
