import Vue from "vue";
import Cursor from "./cursor.vue";
import Graph from "./graph.vue";
import Legend from "./legend.vue";
import Menu from "./menu.vue";
import Slides from "./slides.vue";
import Tooltip from "./tooltip.vue";
import Zoom from "./zoom.vue";

[
    Cursor,
    Graph,
    Legend,
    Menu,
    Slides,
    Tooltip,
    Zoom,
].forEach(component => Vue.component(component.name, component));

const
    dateFormatFilename = "YYYYMMDDHHmmss",
    dateFormatRFC3339 = "YYYY-MM-DDTHH:mm:ss.SSSZ";

export {dateFormatFilename, dateFormatRFC3339};

const ranges = [
    "1h",
    "3h",
    "1d",
    "3d",
    "7d",
    "1mo",
    "3mo",
    "1y",
];

export {ranges};
