import { createRouter, createWebHistory } from "vue-router";

/** layout */
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: () => import("@/views/MainPage.vue"),
            meta: {
                requiresAuth: false,
                layout: DefaultLayout,
            },
        },
    ],
});

export default router;
