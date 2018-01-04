import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";
import isArray from "lodash/isArray";

Vue.use(Vuex);

function setArray(obj, key, value) {
    obj[key] = isArray(value) ? value : [];
}

function setBoolean(obj, key, value) {
    obj[key] = typeof value == "boolean" ? value : !state[key];
}

function setString(obj, key, value) {
    obj[key] = value || null;
}

export default new Vuex.Store({
    actions: {
        init(ctx) {
            Vue.http.get("/api/v1/").then(response => response.json()).then((response) => {
                ctx.commit("setConnectors", response.connectors);
                ctx.commit("setReadOnly", Boolean(response.read_only));
            }).catch(() => {
                throw new Error("Failed to retrieve instance information");
            });
        },
    },
    plugins: [
        VuexPersistedState({
            key: "facette",
        }),
    ],
    state: {
        connectors: [],
        locale: "en",
        readOnly: false,
        sidebar: true,
        theme: "light",
    },
    mutations: {
        setConnectors(state, value) {
            setArray(state, "connectors", value);
        },
        setLocale(state, value) {
            setString(state, "locale", value);
        },
        setReadOnly(state, value) {
            setBoolean(state, "readOnly", value);
        },
        setTheme(state, value) {
            setString(state, "theme", value);
        },
        toggleSidebar(state, value) {
            setBoolean(state, "sidebar", value);
        },
    },
});
