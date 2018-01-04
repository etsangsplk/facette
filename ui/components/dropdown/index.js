import Vue from "vue";
import Divider from "./divider.vue";
import Dropdown from "./dropdown.vue";

[
    Divider,
    Dropdown,
].forEach(component => Vue.component(component.name, component));
