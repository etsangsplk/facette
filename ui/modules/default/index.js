import NotFound from "./not-found.vue";
import NotFoundSidebar from "./sidebar.vue";

const DefaultRoutes = [
    {
        name: "root",
        path: "/",
        redirect: {
            name: "browse-root",
        },
    },
    {
        name: "not-found",
        path: "*",
        components: {
            default: NotFound,
            sidebar: NotFoundSidebar,
        },
    },
];

export {DefaultRoutes};
