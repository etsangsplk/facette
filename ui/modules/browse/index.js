import BrowseCollection from "./collection.vue";
import BrowseSearch from "./search.vue";
import BrowseSidebar from "./sidebar.vue";

const BrowseRoutes = [
    {
        name: "browse-root",
        path: "/browse/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: BrowseSearch,
            sidebar: BrowseSidebar,
        },
    },
    {
        name: "browse-collections",
        path: "/browse/collections/:id",
        pathToRegexpOptions: {strict: true},
        components: {
            default: BrowseCollection,
            sidebar: BrowseSidebar,
        },
        props: {
            default: true,
            sidebar: true,
        },
    },
    {
        name: "browse-graphs",
        path: "/browse/graphs/:id",
        pathToRegexpOptions: {strict: true},
        components: {
            default: BrowseCollection,
            sidebar: BrowseSidebar,
        },
        props: {
            default: true,
            sidebar: true,
        },
    },
];

export {BrowseRoutes};
