import Vue from "vue";
import Modal from "./modal.vue";

const plugin = {
    install(vue) {
        this.event = new vue();

        vue.prototype.$modal = {
            hide() {
                plugin.event.$emit("toggle", false);
            },
            show(params) {
                plugin.event.$emit("toggle", true, params);
            },
        };

        vue.component(Modal.name, Modal);
    },
};

Vue.use(plugin);

export default plugin;
