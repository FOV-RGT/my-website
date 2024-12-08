import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: "/",
        name: "",
        redirect: "/HelloCat",
    },
    {
        path: "/home",
        name: "home",
        beforeEnter() {
            window.location.href = 'src/assets/pages/home.html';
        }
    },
    {
        path: "/HelloCat",
        name: "hellocat",
        component: () => import("../pages/HelloCat.vue"),
        meta: {
        },
        
    },
    {
        path:"/temp",
        name:"temp",
        component: () => import("../pages/temp.vue"),
    }]
});

export default router;