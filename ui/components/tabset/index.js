import Vue from "vue";
import Tab from "./tab.vue";
import Tabset from "./tabset.vue";

[
    Tab,
    Tabset,
].forEach(component => Vue.component(component.name, component));
