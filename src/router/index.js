import Vue from "vue";
import Router from "vue-router";
import HomePage from "../view/HomePage.vue";
import AboutUs from "../view/AboutUs.vue";
import ReportAttend from "@/view/ReportAttend.vue";
import LoginPage from "@/view/LoginPage.vue";
import StudentPage from "../view/StudentPage.vue";
import DashBoard from "../view/DashBoard.vue";
import StudentDash from "../view/StudentDash.vue";
import UpDate from "../view/UpDate.vue";
import TeacherSec from "../view/TeacherSec.vue";
import SubjectSec from "../view/SubjectSec.vue";
import DevicesSec from "../view/DevicesSec.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/about",
      name: "About",
      component: AboutUs,
    },
    {
      path: "/report",
      name: "ReportAttend",
      component: ReportAttend,
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/student",
      name: "StudentPage",
      component: StudentPage,
    },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: DashBoard,
    },
    {
      path: "/student_",
      name: "StudentDash",
      component: StudentDash,
    },
    {
      path: "/student_update",
      name: "UpdateStu",
      component: UpDate,
    },
    {
      path: "/add_teacher",
      name: "TeacherSec",
      component: TeacherSec,
    },
    {
      path: "/add_subject",
      name: "SubjectSec",
      component: SubjectSec,
    },
    {
      path: "/devices",
      name: "DevicesSec",
      component: DevicesSec,
    },
  ],
});
// Router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   if (
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     !isAuthenticated
//   ) {
//     next("/login");
//   } else {
//     next();
//   }
// });
