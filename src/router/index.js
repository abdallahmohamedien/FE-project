import Vue from "vue";
import Router from "vue-router";

// 💡 استيراد المكونات
import LoginPage from "@/view/LoginPage.vue";
import RegisterPage from "@/view/RegisterPage.vue";
import HomePage from "@/view/HomePage.vue";
import ReportAttend from "@/view/ReportAttend.vue";
import StudentPage from "@/view/StudentPage.vue";
import DashBoard from "@/view/DashBoard.vue";
import StudentDash from "@/view/StudentDash.vue";
import TeacherSec from "@/view/TeacherSec.vue";
import SubjectSec from "@/view/SubjectSec.vue";
import DevicesSec from "@/view/DevicesSec.vue";

Vue.use(Router);

const router = new Router({ // 💡 تم تسمية الـ router لتسهيل الإشارة إليه لاحقًا
  mode: "history",
  routes: [
    // ----------------------------------------
    // المسارات المفتوحة (لا تحتاج تسجيل دخول)
    // ----------------------------------------
    {
      path: "/",
      redirect: "/login", // 💡 توجيه المسار الأساسي لصفحة الدخول
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      meta: { requiresAuth: false }, // لا تحتاج مصادقة
    },
    { path: "/register", component: RegisterPage, meta: { requiresAuth: false } },

    // ----------------------------------------
    // المسارات المحمية (تحتاج تسجيل دخول على الأقل)
    // ----------------------------------------
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: DashBoard,
      meta: { requiresAuth: true },
    },
    {
      path: "/student_",
      name: "StudentDash",
      component: StudentDash,
      meta: { requiresAuth: true, allowedRoles: ['student', 'teacher', 'admin'] } // الكل يمكنه الوصول لـ StudentDash
    },
    
    // ----------------------------------------
    // مسارات الإدارة (تتطلب دور محدد)
    // ----------------------------------------
    {
      path: "/student",
      name: "StudentPage",
      component: StudentPage,
      meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] }, // متاح للمدير والمعلم
    },
    {
      path: "/teacher",
      name: "TeacherSec",
      component: TeacherSec,
      meta: { requiresAuth: true, allowedRoles: ['admin'] }, // متاح للمدير فقط
    },
    {
      path: "/subject",
      name: "SubjectSec",
      component: SubjectSec,
      meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] }, // متاح للمدير والمعلم
    },
    {
      path: "/devices",
      name: "DevicesSec",
      component: DevicesSec,
      meta: { requiresAuth: true, allowedRoles: ['admin'] }, // متاح للمدير فقط
    },
    {
      path: "/report",
      name: "ReportAttend",
      component: ReportAttend,
      meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] }, // متاح للمدير والمعلم
    },
  ],
});



router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  // لو المسار محتاج تسجيل دخول
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      return next("/login");
    } else {
      const allowedRoles = to.meta.allowedRoles;

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // بدل ما نعمل redirect داير ما يدور
        if (userRole === "admin" && to.path !== "/dashboard") {
          return next("/dashboard");
        }
        if (userRole === "teacher" && to.path !== "/teacher") {
          return next("/teacher");
        }
        if (userRole === "student" && to.path !== "/student_") {
          return next("/student_");
        }
      }
    }
  }

  // لو رايح على login وهو مسجل دخول
  if (to.path === "/login" && isLoggedIn) {
    if (userRole === "admin") return next("/dashboard");
    if (userRole === "teacher") return next("/teacher");
    if (userRole === "student") return next("/student_");
  }

  next();
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  // لو المسار محتاج تسجيل دخول
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      return next("/login");
    } else {
      const allowedRoles = to.meta.allowedRoles;

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // بدل ما نعمل redirect داير ما يدور
        if (userRole === "admin" && to.path !== "/dashboard") {
          return next("/dashboard");
        }
        if (userRole === "teacher" && to.path !== "/teacher") {
          return next("/teacher");
        }
        if (userRole === "student" && to.path !== "/student_") {
          return next("/student_");
        }
      }
    }
  }

  // لو رايح على login وهو مسجل دخول
  if (to.path === "/login" && isLoggedIn) {
    if (userRole === "admin") return next("/dashboard");
    if (userRole === "teacher") return next("/teacher");
    if (userRole === "student") return next("/student_");
  }

  next();
});
router.beforeEach((to, from, next) => {
  const app = document.querySelector("#app").__vue__;
  if (app) app.isLoading = true;
  setTimeout(() => {
    if (app) app.isLoading = false;
    next();
  }, 800);
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  // لو المسار محتاج تسجيل دخول
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      return next("/login");
    } else {
      const allowedRoles = to.meta.allowedRoles;

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // بدل ما نعمل redirect داير ما يدور
        if (userRole === "admin" && to.path !== "/dashboard") {
          return next("/dashboard");
        }
        if (userRole === "teacher" && to.path !== "/teacher") {
          return next("/teacher");
        }
        if (userRole === "student" && to.path !== "/student_") {
          return next("/student_");
        }
      }
    }
  }

  // لو رايح على login وهو مسجل دخول
  if (to.path === "/login" && isLoggedIn) {
    if (userRole === "admin") return next("/dashboard");
    if (userRole === "teacher") return next("/teacher");
    if (userRole === "student") return next("/student_");
  }

  next();
});


export default router;