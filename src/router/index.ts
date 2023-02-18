import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CourseReportView from "../views/CourseReportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/course-report",
      name: "course-report",
      component: CourseReportView,
    },
    {
      path: "/competence-list",
      name: "competence-list",
      component: CourseReportView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
