import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/home/HomeView.vue";

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
      component: () => import("./views/summerCup/SummerCupView.vue"),
      children: [
        {
          path: ":year",
          component: () => import("./views/summerCup/SolutionsSubView.vue")
        },
        {
          path: ":year/:contest",
          component: () => import("./views/summerCup/ContestSolutionsSubView.vue")
        }
      ]
    },
    {
      path: '/olymp',
      name: 'olymp',
      component: () => import("./views/olymp/OlympView.vue")
    },
    {
      path: '/news/:id',
      name: 'news',
      component: () => import("./views/news/NewsView.vue")
    },
    {
      path: "/test",
      name: 'test',
      component: () => import("./views/test/TestView.vue")
    },
    {
      path: "/sign-in",
      name: "signIn",
      component: () => import("./views/signIn/SignInView.vue")
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("./views/registration/RegistrationView.vue"),
      alias: ["/reg"]
    },
    {
      path: "/me",
      name: "me",
      component: () => import("./views/me/MeView.vue"),
      children: [
        {
          path: "",
          component: () => import("./views/me/DefaultSubView.vue"),
        },
        {
          path: "settings",
          component: () => import("./views/me/SettingsSubView.vue"),
        }
      ]
    }
  ]
});

export default router;