import { createWebHistory, createRouter } from "vue-router";
import Play from "../components/Play.vue";
import Create from "../components/Create.vue";

const routes = [
    {
        path: "/",
        name: "Play",
        component: Play,
    },
    {
        path: "/create",
        name: "Create",
        component: Create,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
