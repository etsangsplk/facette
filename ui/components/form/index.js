import Vue from "vue";
import Block from "./block.vue";
import Form from "./form.vue";

[
    Block,
    Form,
].forEach(component => Vue.component(component.name, component));
