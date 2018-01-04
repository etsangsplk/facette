import Vue from "vue";

const plugin = {
    install(vue) {
        vue.prototype.$eventbus = new Vue();
    },
};

Vue.use(plugin);

export default plugin;
