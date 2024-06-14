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
    padding: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-around;
}
a {
    text-decoration: none;
}
</style>
