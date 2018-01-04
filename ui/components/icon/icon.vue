<template>
    <span class="v-icon" :class="classes">
        <font-awesome-icon :icon="icon" :spin="options && options.spin" @click="$emit('click', $event)"
            @keypress="$emit('keypress', $event)"></font-awesome-icon>
    </span>
</template>

<script>
import Vue from "vue";
import VueFontAwesome from "@fortawesome/vue-fontawesome";

Vue.component(VueFontAwesome.name, VueFontAwesome);

import fontawesome from "@fortawesome/fontawesome";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
import faArrowRight from "@fortawesome/fontawesome-free-solid/faArrowRight";
import faArrowsAltV from "@fortawesome/fontawesome-free-solid/faArrowsAltV";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faBullseye from "@fortawesome/fontawesome-free-solid/faBullseye";
import faCalendarAlt from "@fortawesome/fontawesome-free-regular/faCalendarAlt";
import faCaretRight from "@fortawesome/fontawesome-free-solid/faCaretRight";
import faChartArea from "@fortawesome/fontawesome-free-solid/faChartArea";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faCheckCircle from "@fortawesome/fontawesome-free-solid/faCheckCircle";
import faCheckSquare from "@fortawesome/fontawesome-free-solid/faCheckSquare";
import faChevronDown from "@fortawesome/fontawesome-free-solid/faChevronDown";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight";
import faChevronUp from "@fortawesome/fontawesome-free-solid/faChevronUp";
import faCircle from "@fortawesome/fontawesome-free-regular/faCircle";
import faClock from "@fortawesome/fontawesome-free-regular/faClock";
import faClone from "@fortawesome/fontawesome-free-solid/faClone";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";
import faColumns from "@fortawesome/fontawesome-free-solid/faColumns";
import faDotCircle from "@fortawesome/fontawesome-free-regular/faDotCircle";
import faDownload from "@fortawesome/fontawesome-free-solid/faDownload";
import faEllipsisV from "@fortawesome/fontawesome-free-solid/faEllipsisV";
import faExclamationCircle from "@fortawesome/fontawesome-free-solid/faExclamationCircle";
import faExclamationTriangle from "@fortawesome/fontawesome-free-solid/faExclamationTriangle";
import faFilter from "@fortawesome/fontawesome-free-solid/faFilter";
import faFolder from "@fortawesome/fontawesome-free-solid/faFolder";
import faHistory from "@fortawesome/fontawesome-free-solid/faHistory";
import faInfoCircle from "@fortawesome/fontawesome-free-solid/faInfoCircle";
import faLanguage from "@fortawesome/fontawesome-free-solid/faLanguage";
import faPaintBrush from "@fortawesome/fontawesome-free-solid/faPaintBrush";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import faPlug from "@fortawesome/fontawesome-free-solid/faPlug";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faQuestionCircle from "@fortawesome/fontawesome-free-solid/faQuestionCircle";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faSearchMinus from "@fortawesome/fontawesome-free-solid/faSearchMinus";
import faSearchPlus from "@fortawesome/fontawesome-free-solid/faSearchPlus";
import faSignOutAlt from "@fortawesome/fontawesome-free-solid/faSignOutAlt";
import faSquare from "@fortawesome/fontawesome-free-regular/faSquare";
import faStop from "@fortawesome/fontawesome-free-solid/faStop";
import faStopCircle from "@fortawesome/fontawesome-free-solid/faStopCircle";
import faSync from "@fortawesome/fontawesome-free-solid/faSync";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faTimesCircle from "@fortawesome/fontawesome-free-solid/faTimesCircle";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faWindowMaximize from "@fortawesome/fontawesome-free-solid/faWindowMaximize";

fontawesome.library.add(
    faArrowLeft,
    faArrowRight,
    faArrowsAltV,
    faBars,
    faBullseye,
    faCalendarAlt,
    faCaretRight,
    faChartArea,
    faCheck,
    faCheckCircle,
    faCheckSquare,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faCircle,
    faClock,
    faClone,
    faCog,
    faColumns,
    faDotCircle,
    faDownload,
    faEllipsisV,
    faExclamationCircle,
    faExclamationTriangle,
    faFilter,
    faFolder,
    faHistory,
    faInfoCircle,
    faLanguage,
    faPaintBrush,
    faPencilAlt,
    faPlay,
    faPlug,
    faPlus,
    faQuestionCircle,
    faSearch,
    faSearchMinus,
    faSearchPlus,
    faSignOutAlt,
    faSquare,
    faStop,
    faStopCircle,
    faSync,
    faTh,
    faTimes,
    faTimesCircle,
    faTrash,
    faWindowMaximize,
);

export default {
    name: "v-icon",
    props: {
        icon: [Object, Array, String],
        options: Object,
    },
    data() {
        return {
            classes: {},
        };
    },
    watch: {
        options: {
            handler(to) {
                if (!to) {
                    this.classes = null;
                    return;
                }

                this.classes = {
                    [`speed-${to.speed}`]: to.spin && to.speed,
                };
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scope>
.v-icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;

    &.speed-2x .fa-spin {
        animation: fa-spin 1s infinite linear;
    }
}
</style>
