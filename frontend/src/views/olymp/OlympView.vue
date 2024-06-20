<script lang="ts">
import {defineComponent} from 'vue';
import QA_container from '@/components/QA_container.vue';
import Subtitle from '@/components/Subtitle.vue';
import CircledImage_container from '@/components/CircledImage_container.vue';

export default defineComponent({
  name: "OlympView",
  components: {QA_container, Subtitle, CircledImage_container},
  data() {
    return {
      rules: [
        {q: "Кто может принять участие?", a: "Вы должны быть учеником 8-11 классов при мехмате МГУ."},
        {q: "Сколько длится олимпиада?", a: "Олимпиада длится 3 часа."},
        {q: "Сколько будет задач?", a: "Будет предложено от 5 до 8 задач."}, 
        {q: "Как оцениваются решения?", a: "Каждая задача оценивается в 100 баллов, из которых 70 баллов начисляется за прохождение отдельных тестов жюри (по 1 баллу за каждый тест) и 30 бонусных баллов даётся, если программа прошла все тесты жюри. Тесты из условия не приносят баллы, но их прохождение необходимо для тестирования основной группы тестов. Время и количество отправок решений не влияют на результат олимпиады. За задачу выставляется максимальный балл из набранных по всем посылкам."},
        {q: "В каком формате сдаются решения?", a: "На проверку сдается исходный код программы, написанный на одном из следующих языков программирования: C, C#, C++, D, Go, Haskell, Java, JavaScript, Kotlin, Ocaml, Pascal, Perl, PHP, Python, Ruby, Rust, Scala. Однако, жюри гарантирует существование полного решения только на языках C++ и Pascal."},
        {q: "Чем разрешено пользоваться во время олимпиады?", a: "Во время тура разрешается пользоваться любой литературой и личными записями. Запрещается использовать любую информацию в электронном виде, личные компьютеры или калькуляторы, мобильные средства связи."},
        {q: "Где посмотреть результаты?", a: "Во время олимпиады участникам доступна текущая таблица результатов. За 30 минут до конца олимпиады таблица «замораживается» (в таблице видны посылки, но не их результат). По окончании олимпиады будут подведены итоги, награждены победители и призёры."}
      ],
      manager_list: [
        {src: "./../../../assets/manager1.jpg", note1: "Князевский Сергей Сергеевич", note2: "Призёр заключительного этапа Всероссийской олимпиады школьников по информатике 2017 г."},
        {src: "./../../../assets/manager2.jpg", note1: "Васильев Михаил Юрьевич", note2: "Выпускник механико-математического факультета МГУ имени М.В. Ломоносова, 2019 г."},
        {src: "./../../../assets/manager3.jpg", note1: "Смирнова Елена Юрьевна", note2: "Почётный работник образования г. Москвы. Лауреат премии Президента РФ, 2008 г."},
        {src: "./../../../assets/manager4.jpg", note1: "Бегунц Александр Владимирович", note2: "Директор Центра математического творчества МГУ имени М.В. Ломоносова."}
      ],
      authors_list: [
        {src: "./../../../assets/author1.jpg", note1: "Сергей Сергеевич Князевский"},
        {src: "./../../../assets/author2.jpg", note1: "Никита Пшеничный"},
        {src: "./../../../assets/author3.jpg", note1: "Иван Клочков"},
        {src: "./../../../assets/author4.jpg", note1: "Рамиль Хакимов"}
      ]
    }
  }
})
</script>

<template>
  <h1>Олимпиада по программированию</h1>
  <span class="subtitle"><Subtitle text="Правила"></Subtitle></span>
  <QA_container :qa_list="rules"></QA_container>
  <span class="subtitle"><Subtitle text="Организационный комитет"></Subtitle></span>
  <CircledImage_container :imgs_list="manager_list"></CircledImage_container>
  <span class="subtitle"><Subtitle text="Методическая комиссия"></Subtitle></span>
  <CircledImage_container :imgs_list="authors_list"></CircledImage_container>
</template>

<style scoped>
.subtitle {
  text-align: center;
}
h1 {
  text-align: center;
  font-family: "LXGW WenKai Mono TC", monospace;
  margin-left: 8px;
  margin-right: 8px;
}
.qa_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 5%;
  margin-right: 5%;
}
</style>