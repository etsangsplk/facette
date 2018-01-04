import ShowCollection from "./collection.vue";

const ShowRoutes = [
    {
        name: "show-collections",
        path: "/show/collections/:id/:index",
        pathToRegexpOptions: {strict: true},
        components: {
            default: ShowCollection,
        },
        props: {
            default: true,
        },
    },
    {
        name: "show-graphs",
        path: "/show/graphs/:id",
        pathToRegexpOptions: {strict: true},
        components: {
            default: ShowCollection,
        },
        props: {
            default: true,
        },
    },
];

export {ShowRoutes};
