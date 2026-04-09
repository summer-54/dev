import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import {ref} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: ["/"]
    },
    {
      path: "/summer-cup",
      name: "summerCup",
      component: () => import("@/views/summerCup/SummerCupView.vue"),
      children: [
        {
          path: "/:year",
          component: () => import("@/views/summerCup/SolutionsSubView.vue")
        },
        {
          path: "/:year/solutions",
          component: () => import("@/views/summerCup/YearSolutionsSubView.vue"),
          children: [
            {
              path: "/:contest",
              component: () => import("@/views/summerCup/ContestSolutionsSubView.vue"),
            }
          ]
        }
      ],
      alias: ["/summer-cup"]
    },
    {
      path: "/olymp",
      name: "olymp",
      component: () => import("@/views/olymp/OlympView.vue"),
      alias: ["/olymp"]
    },
    {
      path: "/news/:id",
      name: "news",
      component: () => import("@/views/news/NewsView.vue"),
      alias: ["/news/:id"]
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test/TestView.vue"),
      alias: ["/test"]
    },
    {
      path: "/sign-in",
      name: "signIn",
      component: () => import("@/views/signIn/SignInView.vue"),
      alias: ["/sign-in"]
    },
    {
      path: "/oauth/:uuid",
      name: "oauth",
      component: () => import("@/views/oauth/OauthView.vue"),
      alias: ["/oauth/:uuid"]
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("@/views/registration/RegistrationView.vue"),
      alias: ["/reg", "//registration"]
    },
    {
      path: "/me",
      component: () => import("@/views/me/MeView.vue"),
      children: [
        {
          name: "/me",
          path: "",
          component: () => import("@/views/me/DefaultSubView.vue"),
        },
        {
          path: "/settings",
          component: () => import("@/views/me/SettingsSubView.vue"),
        }
      ],
      alias: ["/me"]
    },
    {
      path: "/users/:username",
      name: "user",
      component: () => import("@/views/user/UserView.vue"),
      alias: ["/users/:username"]
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/AdminView.vue"),
      children: [
        {
          name: "admin",
          path: "/",
          component: () => import("@/views/admin/DefaultSubView.vue")
        },
        {
          path: "/users",
          component: () => import("@/views/admin/UsersSubView.vue"),
        },
        {
          path: "/contests",
          component: () => import("@/views/admin/ContestsSubView.vue")
        },
        {
          path: "/news",
          component: () => import("@/views/admin/NewsSubView.vue")
        },
        {
          path: "/news/add",
          component: () => import("@/views/admin/AddNewSubView.vue")
        },
        {
          path: "/news/:id",
          component: () => import("@/views/admin/EditNewSubView.vue")
        }
      ],
      alias: ["/admin"]
    },
    {
      path: "/summer-camp",
      name: "summer-camp",
      component: () => import("@/views/summerCamp/SummerCamp.vue"),
      alias: ["/summer-camp"]
    },
    {
      path: "/recovery",
      name: "requestRecovery",
      component: () => import("@/views/recovery/RequestRecoveryView.vue"),
      alias: ["/rec"]
    },
    {
      path: "/recovery/:key",
      name: "recovery",
      component: () => import("@/views/recovery/RecoveryView.vue")
    },
    {
      path: "/honor",
      name: "honor",
      component: () => import("@/views/honor/HonorView.vue")
    },
    {
      path: "/outer-sign-in",
      name: "outer-sign-in",
      component: () => import("@/views/outerSignIn/OuterSignInView.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () => import("@/views/events/EventsView.vue")
    },
    {
      path: "/events/:id",
      name: "eventReg",
      component: () => import("@/views/eventReg/EventRegView.vue")
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