import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import NewsView from "./views/news/NewsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/summer-cup',
      name: 'summerCup',
      component: () => import("./views/summerCup/SummerCupView.vue")
    },
    {
      path: '/olymp',
      name: 'olymp',
      component: () => import("./views/olymp/OlympView.vue")
    },
    {
      path: '/news/:id',
      name: 'news',
      component: NewsView
    }
  ]
});

export default router;