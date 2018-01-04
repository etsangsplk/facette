import Vue from "vue";
import Notifier from "./notifier.vue";

const plugin = {
    install(vue) {
        this.event = new vue();

        vue.prototype.$notifier = {
            enqueue(text, type = "info") {
                plugin.event.$emit("enqueue", text, type);
            },
        };

        vue.component(Notifier.name, Notifier);
    },
};

Vue.use(plugin);

// TODO: useful?
// Vue.config.errorHandler = (err, vue) => {
//     vue.$notifier.enqueue(err.message, "error");
// };

export default plugin;
