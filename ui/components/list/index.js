import Vue from "vue";
import List from "./list.vue";
import Tile from "./tile.vue";

[
    List,
    Tile,
].forEach(component => Vue.component(component.name, component));
