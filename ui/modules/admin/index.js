import AdminGroups from "./groups.vue";
import AdminInfo from "./info.vue";
import AdminList from "./list.vue";
import AdminProviders from "./providers.vue";
import AdminSidebar from "./sidebar.vue";

const AdminRoutes = [
    {
        name: "admin-root",
        path: "/admin/",
        pathToRegexpOptions: {strict: true},
        redirect: {
            name: "admin-list-collections",
        },
    },
    {
        name: "admin-list-collections",
        path: "/admin/collections/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "collections"),
        },
    },
    {
        name: "admin-list-graphs",
        path: "/admin/graphs/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "graphs"),
        },
    },
    {
        name: "admin-list-sourcegroups",
        path: "/admin/sourcegroups/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "sourcegroups"),
        },
    },
    {
        name: "admin-edit-sourcegroups",
        path: "/admin/sourcegroups/:id",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminGroups,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "sourcegroups"),
        },
    },
    {
        name: "admin-list-metricgroups",
        path: "/admin/metricgroups/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "metricgroups"),
        },
    },
    {
        name: "admin-edit-metricgroups",
        path: "/admin/metricgroups/:id",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminGroups,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "metricgroups"),
        },
    },
    {
        name: "admin-list-origins",
        path: "/admin/origins/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "origins"),
        },
    },
    {
        name: "admin-list-sources",
        path: "/admin/sources/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "sources"),
        },
    },
    {
        name: "admin-list-metrics",
        path: "/admin/metrics/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "metrics"),
        },
    },
    {
        name: "admin-list-providers",
        path: "/admin/providers/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminList,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "providers"),
        },
    },
    {
        name: "admin-edit-providers",
        path: "/admin/providers/:id",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminProviders,
            sidebar: AdminSidebar,
        },
        props: {
            default: route => definePropFn(route, "providers"),
        },
    },
    {
        name: "admin-info",
        path: "/admin/info/",
        pathToRegexpOptions: {strict: true},
        components: {
            default: AdminInfo,
            sidebar: AdminSidebar,
        },
    },
];

export {AdminRoutes};

function definePropFn(route, type) {
    let section;

    switch (type) {
    case "collections":
    case "graphs":
    case "sourcegroups":
    case "metricgroups":
        section = "library";
        break;

    case "origins":
    case "sources":
    case "metrics":
        section = "catalog";
        break;

    default:
        section = null;
    }

    return Object.assign(route.params, {
        section: section,
        type: type,
    });
}

const nameRegexp = "[a-zA-Z0-9](?:[a-zA-Z0-9-_.]*[a-zA-Z0-9])?";

export {nameRegexp};
