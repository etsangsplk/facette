import Vue from "vue";

import i18n from "./i18n";
import router from "./router";
import store from "./store";

import "./components";
import "./filters";
import "./resource";
import "./eventbus";
import "./extend";

new Vue({
    el: "router-view",
    i18n,
    router,
    store,
});
