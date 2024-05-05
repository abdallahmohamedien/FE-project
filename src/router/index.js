import Vue from "vue";
import Router from "vue-router";
import HomePage from "../view/HomePage.vue";
import AboutUs from "../view/AboutUs.vue";
import ReportAttend from "@/view/ReportAttend.vue";
import LoginPage from "@/view/LoginPage.vue";
import StudentPage from "../view/StudentPage.vue";
import DashBoard from "../view/DashBoard.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
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
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
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
  ],
});
