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
      component: () => import("@/views/summerCup/SummerCupView.vue"),
      children: [
        {
          path: ":year",
          component: () => import("@/views/summerCup/SolutionsSubView.vue")
        },
        {
          path: ":year/solutions",
          component: () => import("@/views/summerCup/YearSolutionsSubView.vue"),
          children: [
            {
              path: ":contest",
              component: () => import("@/views/summerCup/ContestSolutionsSubView.vue"),
            }
          ]
        }
      ]
    },
    {
      path: '/olymp',
      name: 'olymp',
      component: () => import("@/views/olymp/OlympView.vue")
    },
    {
      path: '/news/:id',
      name: 'news',
      component: () => import("@/views/news/NewsView.vue")
    },
    {
      path: "/test",
      name: 'test',
      component: () => import("@/views/test/TestView.vue")
    },
    {
      path: "/sign-in",
      name: "signIn",
      component: () => import("@/views/signIn/SignInView.vue")
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("@/views/registration/RegistrationView.vue"),
      alias: ["/reg"]
    },
    {
      path: "/me",
      name: "me",
      component: () => import("@/views/me/MeView.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/me/DefaultSubView.vue"),
        },
        {
          path: "settings",
          component: () => import("@/views/me/SettingsSubView.vue"),
        }
      ]
    },
    {
      path: "/users/:username",
      name: "user",
      component: () => import("@/views/user/UserView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/AdminView.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/admin/DefaultSubView.vue")
        },
        {
          path: "users",
          component: () => import("@/views/admin/UsersSubView.vue"),
        },
        {
          path: "contests",
          component: () => import("@/views/admin/ContestsSubView.vue")
        },
        {
          path: "news",
          component: () => import("@/views/admin/NewsSubView.vue")
        }
      ]
    }
  ]
});

export default router;