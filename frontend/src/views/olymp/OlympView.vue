<script lang="ts" setup>
import {ref} from 'vue';

import QA_container from '@/components/QA_container.vue';
import CircledImage_container from '@/components/CircledImage_container.vue';
import OlympMaterials from "./OlympMaterials.vue";

import manager1 from "@/assets/photo/manager1.jpg";
import manager2 from "@/assets/photo/manager2.jpg";
import manager3 from "@/assets/photo/manager3.jpg";
import manager4 from "@/assets/photo/manager4.jpg";
import author1 from "@/assets/photo/author1.jpg";
import author2 from "@/assets/photo/author2.jpg";
import author3 from "@/assets/photo/author3.jpg";
import author4 from "@/assets/photo/author4.jpg";
import Animation from "@/components/ui/animation.vue";
import TermBG from "@/components/termui/TermBG.vue";

const rules = ref([
  {q: "Кто может принять участие?", a: "Вы должны быть учеником 8-11 классов при мехмате МГУ."},
  {q: "Сколько длится олимпиада?", a: "Олимпиада длится 3 часа."},
  {q: "Сколько будет задач?", a: "Будет предложено от 5 до 8 задач."},
  //{q: "Как оцениваются решения?", a: "Каждая задача оценивается в 100 баллов, из которых 70 баллов начисляется за прохождение отдельных тестов жюри (по 1 баллу за каждый тест) и 30 бонусных баллов даётся, если программа прошла все тесты жюри. Тесты из условия не приносят баллы, но их прохождение необходимо для тестирования основной группы тестов. Время и количество отправок решений не влияют на результат олимпиады. За задачу выставляется максимальный балл из набранных по всем посылкам."},
  {q: "Как оцениваются решения?", a: "Олимпиада проходит в ICPC-формате, то есть каждая задача либо решена, либо не решена. Участники упорядочиваются сначала по количеству решённых задач, затем по штрафу."},
  {q: "Что такое штраф?", a: "Штраф &#0151; величина, по которой ранжируются участники, решившие одинаковое число задач. Штраф &#0151; сумма времени в минутах с начала соревнования до первой успешной посылки участника по этой задаче и количества неправильных посылок до неё, умноженное на 20."},
  {q: "В каком формате сдаются решения?", a: "На проверку сдается исходный код программы, написанный на одном из следующих языков программирования: C, C#, C++, D, Go, Haskell, Java, JavaScript, Kotlin, Ocaml, Pascal, Perl, PHP, Python, Ruby, Rust, Scala. Однако, жюри гарантирует существование полного решения только на языках C++ и Pascal."},
  {q: "Чем разрешено пользоваться во время олимпиады?", a: "Во время тура разрешается пользоваться любой литературой и личными записями. Запрещается использовать любую информацию в электронном виде, личные компьютеры или калькуляторы, мобильные средства связи."},
  {q: "Где посмотреть результаты?", a: "Во время олимпиады участникам доступна текущая таблица результатов. За 30 минут до конца олимпиады таблица «замораживается» (в таблице видны посылки, но не их результат). По окончании олимпиады будут подведены итоги, награждены победители и призёры."}
]);

const manager_list = ref([
  {src: manager1, note1: "Князевский Сергей Сергеевич", note2: "Учитель информатики, призёр заключительного этапа Всероссийской олимпиады школьников по информатике 2017 г."},
  {src: manager2, note1: "Васильев Михаил Юрьевич", note2: "Выпускник механико-математического факультета МГУ имени М.В. Ломоносова, 2019 г."},
  {src: manager3, note1: "Смирнова Елена Юрьевна", note2: "Почётный работник образования г. Москвы. Лауреат премии Президента РФ, 2008 г."},
  {src: manager4, note1: "Бегунц Александр Владимирович", note2: "Директор Центра математического творчества МГУ имени М.В. Ломоносова."}
]);

const authors_list = ref([
  {src: author1, note1: "Сергей Сергеевич Князевский"},
  {src: author2, note1: "Никита Пшеничный"},
  {src: author3, note1: "Иван Клочков"},
  {src: author4, note1: "Рамиль Хакамов"}
]);
</script>

<template>
  <main>
    <div class="firstScreen">
      <Animation animation="opacity">
        <h1><span class="highlight">Олимпиада</span> классов при механико-математическом факультете МГУ имени М.В.Ломоносова <span class="highlight">по программированию</span></h1>
      </Animation>
      <Animation animation="opacity" :delay="500">
        <p class="description">
          Олимпиада проводится с целью выявления наиболее талантливых и способных учащихся в области программирования, а также пробуждения интереса к программированию.
          Победители и призёры олимпиады получат дипломы и памятные призы.
          По результатам олимпиады отбираются участники ЛШП.
        </p>
      </Animation>
    </div>
<!--    <Animation animation="opacity" :delay="1000">-->
    <animation animation="opacity"><h2 class="highlight">Правила</h2></animation>
    <QA_container :qa_list="rules"></QA_container>
    <animation animation="opacity"><h2 class="highlight">Организационный комитет</h2></animation>
    <CircledImage_container :imgs_list="manager_list"></CircledImage_container>
    <animation animation="opacity"><h2 class="highlight">Методическая комиссия</h2></animation>
    <CircledImage_container :imgs_list="authors_list"></CircledImage_container>
    <OlympMaterials/>
<!--    </Animation>-->
<!--    <span class="link_p"><a class="link" href="https://moscowschool54.ru/priyem/2024/" target="_blank">Приходите к нам учиться!</a></span>-->
    <TermBG/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: "ShoptronicSP",serif;
  text-align: center;

  @media (width >= 1270px) {
    font-size: 96px;
  }
  @media (910px <= width < 1270px) {
    font-size: 64px;
  }
  @media (710px <= width < 910px) {
    font-size: 48px;
  }
  @media (420px <= width < 710px) {
    font-size: 36px;
  }
  @media (width < 420px) {
    font-size: 30px;
  }
}

h2 {
  font-family: "ShoptronicSP", serif;
  font-size: 48px;

  @media (910px <= width) {
    font-size: 48px;
  }
  @media (width < 910px) {
    font-size: 28px;
  }
}

.description {
  text-align: center;

  @media (910px <= width) {
    font-size: 36px;
  }
  @media (710px <= width < 910px) {
    font-size: 24px;
  }
  @media (width < 710px) {
    font-size: 20px;
  }
}

.highlight {
  font-family: "ShoptronicSP", serif;
  color: #57d16d;
  text-shadow: 0 0 10px #57d16d;
}

.firstScreen {
  margin-top: -60px;
  min-height: calc(100vh);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media (width >= 1270px) {
    padding: 0 100px;
  }
  @media (910px <= width < 1270px) {
    padding: 0 50px;
  }
  @media (width <= 910px) {
    padding: 0 20px;
  }
}

:global(.dark) {
  .highlight {
    color: #95EAA7FF;
    text-shadow: 0 0 10px #95EAA7FF;
  }
}
</style>