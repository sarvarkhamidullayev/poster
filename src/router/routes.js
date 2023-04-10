const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/LoginPage.vue") },
      {
        path: "/user",
        component: () => import("src/pages/client/UserPage.vue"),
        children: [
          {
            path: "",
            redirect: "/dashboard",
          },
          {
            path: "/dashboard",
            component: () => import("src/pages/client/DashboardPage.vue"),
            meta: {
              page: "Asosiy",
            },
          },
          {
            path: "/details/:id",
            component: () => import("src/pages/client/DetailsPage.vue"),
            props: true,
            meta: {
              page: "Ma'lumot",
            },
          },
          {
            path: "/order",
            component: () => import("src/pages/client/OrderPage.vue"),
            meta: {
              page: "Buyurtmalar",
            },
          },
          {
            path: "/signup",
            component: () => import("src/pages/client/SignupPage.vue"),
            meta: {
              page: "Buyurtma qilish",
            },
          },
        ],
      },
      {
        path: "/auth",
        component: () => import("src/pages/admin/AuthPage.vue"),
      },
      {
        path: "/admin",
        component: () => import("src/pages/admin/AdminPage.vue"),
        children: [
          {
            path: "",
            redirect: "/orders",
          },
          {
            path: "/orders",
            component: () => import("src/pages/admin/OrderPage.vue"),
            meta: {
              page: "Buyurtmalar",
            },
          },
          {
            path: "/category",
            component: () => import("src/pages/admin/CategoryPage.vue"),
            meta: {
              page: "Bo'limlar",
            },
          },
          {
            path: "/product",
            component: () => import("src/pages/admin/ProductPage.vue"),
            meta: {
              page: "Mahsulotlar",
            },
          },
        ],
      },
      {
        path: "/details",
        name: "ProductDetailPage",
        component: () => import("src/pages/admin/ProductDetailPage.vue"),
        props: true,
        meta: {
          page: "Mahsulot",
        },
      },
      {
        path: "/income",
        component: () => import("src/pages/admin/IncomePage.vue"),
        meta: {
          page: "Mahsulot kiritish",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
