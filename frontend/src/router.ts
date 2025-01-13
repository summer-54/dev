import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import {ref} from "vue";
import {ROUTER_PATH_PREFIX} from "@/serverConfig.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `${ROUTER_PATH_PREFIX}/`,
      name: 'home',
      component: HomeView,
      alias: ["/"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/summer-cup`,
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
      ],
      alias: ["/summer-cup"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/olymp`,
      name: 'olymp',
      component: () => import("@/views/olymp/OlympView.vue"),
      alias: ["/olymp"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/news/:id`,
      name: 'news',
      component: () => import("@/views/news/NewsView.vue"),
      alias: ["/news/:id"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/test`,
      name: 'test',
      component: () => import("@/views/test/TestView.vue"),
      alias: ["/test"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/sign-in`,
      name: "signIn",
      component: () => import("@/views/signIn/SignInView.vue"),
      alias: ["/sign-in"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/registration`,
      name: "registration",
      component: () => import("@/views/registration/RegistrationView.vue"),
      alias: ["/reg", "/registration"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/me`,
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
      ],
      alias: ["/me"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/users/:username`,
      name: "user",
      component: () => import("@/views/user/UserView.vue"),
      alias: ["/users/:username"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/admin`,
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
        },
        {
          path: "news/add",
          component: () => import("@/views/admin/AddNewSubView.vue")
        },
        {
          path: "news/:id",
          component: () => import("@/views/admin/EditNewSubView.vue")
        }
      ],
      alias: ["/admin"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/summer-camp`,
      name: "summer-camp",
      component: () => import("@/views/summerCamp/SummerCamp.vue"),
      alias: ["/summer-camp"]
    },
    {
      path: `${ROUTER_PATH_PREFIX}/recovery`,
      name: "rec",
      component: () => import("@/views/recovery/RecoveryView.vue"),
      alias: ["/rec"]
    }
  ]
});

export const routerPending = ref(false);

router.beforeEach(() => {
  routerPending.value = true;
});

router.afterEach(() => {
  routerPending.value = false;
})

export default router;