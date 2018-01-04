import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from "./layout.vue";
import {AdminRoutes} from "./modules/admin";
import {BrowseRoutes} from "./modules/browse";
import {ShowRoutes} from "./modules/show";
import {DefaultRoutes} from "./modules/default";

const router = new VueRouter({
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    mode: "history",
    routes: [
        {
            path: "/",
            component: Layout,
            children: [].concat(
                AdminRoutes,
                BrowseRoutes,
                ShowRoutes,
                DefaultRoutes,
            ),
        },
    ],
    scrollBehavior(to) {
        if (to.hash && to.hash.startsWith("#")) {
            let el = document.getElementById(to.hash.substr(1));
            if (el) {
                el.scrollIntoView();
            }
        }

        return false;
    },
});

export default router;

function setQueryParam(router, key, value, condition = true) {
    let q = Object.assign({}, router.currentRoute.query);

    if (condition) {
        q[key] = value;
    } else {
        delete q[key];
    }

    router.replace({query: q});
}

export {setQueryParam};
