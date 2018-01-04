<template>
    <div class="v-graph">
        <a class="v-anchor" :id="`graph${graphIndex}`"></a>

        <v-spinner :loading="loading" v-if="loading && !data"></v-spinner>

        <template v-else>
            <v-message :icon="['far', 'clock']" v-if="loading">{{ $t("label.points.loading") }}</v-message>
            <v-message icon="exclamation-triangle" type="warning"
                v-else-if="partial">{{ $t("label.points.partial") }}</v-message>

            <v-graph-menu></v-graph-menu>

            <v-graph-slides ref="slides"></v-graph-slides>

            <div class="v-graph-container" tabindex="-1" @keypress.esc="cancelZoom" @mousemove="handleMouse">
                <v-graph-cursor ref="cursor"></v-graph-cursor>
                <v-graph-tooltip ref="tooltip"></v-graph-tooltip>
                <v-graph-zoom ref="zoom"></v-graph-zoom>

                <div class="v-graph-canvas">
                    <canvas></canvas>
                </div>

                <v-graph-legend ref="legend" v-if="showLegend"></v-graph-legend>
            </div>
        </template>
    </div>
</template>

<script>
import actions from "./actions";
import boula from "boula";
import * as d3 from "d3";
import {dateFormatRFC3339} from ".";
import {formatSize} from "./helpers";
import debounce from "lodash/debounce";
import pickBy from "lodash/pickBy";
import moment from "moment";

export default {
    name: "v-graph",
    props: {
        attributes: Object,
        graph: {
            required: true,
            type: [Object, String],
        },
        graphIndex: Number,
        options: Object,
        refreshInterval: Number,
    },
    data() {
        return {
            chart: null,
            data: null,
            error: false,
            loading: true,
            originalOptions: {},
            partial: false,
            showLegend: false,
            timeDefer: null,
            zoomOrigin: null,
        };
    },
    methods: {
        afterDraw() {
            // Set cursor/zoom position based on chart area
            let style = {top: `${this.chart.area.top}px`, height: `${this.chart.area.height}px`};

            if (this.$refs.cursor) {
                this.$refs.cursor.update(style);
            }

            if (this.$refs.zoom) {
                this.$refs.zoom.update(style);
            }
        },
        applyRange(options) {
            let newOptions = Object.assign({}, this.options, options);

            if (options.start_time || options.end_time) {
                delete newOptions.time;
                delete newOptions.range;
            } else if (options.time || options.range) {
                delete newOptions.start_time;
                delete newOptions.end_time;
            } else {
                delete newOptions.time;
                delete newOptions.range;
                delete newOptions.start_time;
                delete newOptions.end_time;
            }

            // TODO: set embeddable path options

            this.$emit("update:options", newOptions);
        },
        cancelZoom() {
            if (this.zoomOrigin !== null) {
                this.updateZoom(null, null);
            }
        },
        draw() {
            let start = moment(this.data.start),
                end = moment(this.data.end),
                dateFormat = this.$t("date.long");

            let config = {
                axes: {
                    x: {
                        max: end.toDate(),
                        min: start.toDate(),
                    },
                    y: {
                        center: this.data.options.yaxis_center || false,
                        label: {
                            text: this.data.options.yaxis_label || null,
                        },
                        max: this.data.options.yaxis_max || null,
                        min: this.data.options.yaxis_min || null,
                        stack: this.data.options.stack_mode || null,
                        ticks: {
                            format: this.formatValue,
                        },
                    },
                },
                bindTo: this.$el.querySelector("canvas"),
                events: {
                    afterDraw: this.afterDraw,
                    handleEvent: this.handleEvent,
                },
                series: this.data.series.map(series => ({
                    name: series.name,
                    points: series.points,
                    color: series.options && series.options.color ? series.options.color : null,
                })),
                titles: {
                    main: {
                        text: this.data.options.title || null,
                    },
                    subtitle: {
                        text: `${start.format(dateFormat)} — ${end.format(dateFormat)}`,
                    },
                },
                type: this.data.options.type,
            };

            if (this.data.options.constants) {
                config.axes.y.lines = this.data.options.constants.map(constant => ({
                    color: "red",
                    label: true,
                    y: constant,
                }));
            }

            if (
                this.data.options.yaxis_max !== null &&
                Math.max(...this.data.series.map(a => a.summary.max)) > this.data.options.yaxis_max
            ) {
                config.axes.y.lines.push({
                    dashed: true,
                    color: "grey",
                    y: this.data.options.yaxis_max,
                });
            }

            if (
                this.data.options.yaxis_min !== null &&
                Math.min(...this.data.series.map(a => a.summary.min)) < this.data.options.yaxis_min
            ) {
                config.axes.y.lines.push({
                    dashed: true,
                    color: "grey",
                    y: this.data.options.yaxis_min,
                });
            }

            if (!this.chart) {
                this.chart = new boula(config);
            } else {
                this.chart.update(config);
            }

            this.chart.draw();
        },
        exec(name, ...args) {
            if (actions[name]) {
                actions[name].bind(this)(...args);
            }
        },
        formatValue(value) {
            switch (this.data.options.yaxis_unit) {
            case "metric":
                return d3.format(".2s")(value);

            case "binary":
                return formatSize(value);

            default:
                return d3.format(".2r")(value);
            }
        },
        handleEvent(e) {
            switch (e.type) {
            case "mousedown":
                this.updateZoom(e.layerX, null);
                break;

            case "mouseup": {
                if (this.zoomOrigin === null || this.zoomOrigin === e.layerX) {
                    this.updateZoom(null, null);
                    return;
                }

                let [start, end] = [
                    this.chart.xScale.invert(this.zoomOrigin - this.chart.area.left),
                    this.chart.xScale.invert(e.layerX - this.chart.area.left),
                ].sort();

                this.applyRange({
                    start_time: start,
                    end_time: end,
                });

                this.updateZoom(null, null);

                // Trigger move event to restore cursor display
                let evt = new Event("mousemove");
                Object.assign(evt, {layerX: e.layerX, layerY: e.layerY});
                this.handleEvent(evt);

                break;
            }

            case "mouseleave":
                this.updateCursor(null);
                this.$refs.tooltip.update(null, this.chart);
                break;

            case "mousemove":
                if (this.zoomOrigin !== null) {
                    this.updateZoom(null, e.layerX);
                }

                if (
                    e.layerX >= this.chart.area.left && e.layerX <= this.chart.area.left + this.chart.area.width &&
                    e.layerY >= this.chart.area.top && e.layerY <= this.chart.area.top + this.chart.area.height
                ) {
                    this.chart.canvas.style.cursor = "crosshair";
                    this.$refs.tooltip.update(e, this.chart);

                    this.$eventbus.$emit("graph-cursor", this.chart.xScale.invert(e.layerX - this.chart.area.left));
                } else {
                    this.updateCursor(null);
                    this.chart.canvas.style.cursor = null;
                    this.$refs.tooltip.update(null, this.chart);

                    this.$eventbus.$emit("graph-cursor", null);
                }
            }
        },
        handleMouse(e) {
            if (this.$refs.slides) {
                this.$refs.slides.handleMouse(e);
            }
        },
        handleResize() {
            if (this.observer === null) {
                this.draw();
            }
        },
        observe() {
            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    this.update();
                    this.unobserve();
                }
            });

            this.observer.observe(this.$el, {threshold: 0});
        },
        unobserve() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
        },
        update() {
            let query = {
                id: this.graph,
            };

            Object.assign(query, pickBy(this.options, (value, key) =>
                ["time", "range", "start_time", "end_time"].indexOf(key) != -1));

            // Set defer time to prevent range delta due to ongoing observe
            if (this.timeDefer) {
                query.time = this.timeDefer;
                this.timeDefer = null;
            }

            if (this.attributes && Object.keys(this.attributes).length > 0) {
                query.attributes = this.attributes;
            }

            this.loading = true;

            this.$http({
                method: "POST",
                url: "/api/v1/series/points",
                params: {
                    normalize: 1,
                },
                body: query,
            }).then(response => response.json()).then((response) => {
                this.data = response;
                this.error = false;
                this.loading = false;
                this.partial = response.series.filter(series => series.points === null).length > 0;

                this.$nextTick(() => this.draw());
            }).catch((response) => {
                this.error = true;
                this.loading = false;
                this.partial = false;
                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
            });
        },
        updateCursor(date = null) {
            if (!this.$refs.cursor) {
                return;
            } else if (this.zoomOrigin === null && date >= this.chart.config.axes.x.min &&
                    date <= this.chart.config.axes.x.max) {
                let position = this.chart.area.left + this.chart.xScale(date);
                this.$refs.cursor.update({display: "block", left: `${position}px`});
            } else {
                this.$refs.cursor.update({display: "none"});
            }
        },
        updateZoom(start = null, end = null) {
            let style;

            if (!this.$refs.zoom) {
                return;
            }

            if (start === null && end === null) {
                style = {
                    display: "none",
                    width: 0,
                };

                this.zoomOrigin = null;
            } else if (start !== null && end === null) {
                style = {
                    display: "block",
                    left: `${start}px`,
                };

                this.zoomOrigin = start;
            } else if (start === null && end !== null) {
                style = {
                    left: `${Math.min(end, this.zoomOrigin)}px`,
                    width: `${Math.abs(end - this.zoomOrigin)}px`,
                };
            }

            if (style) {
                this.$refs.zoom.update(style);
            }
        },
    },
    created() {
        this.$eventbus.$on("graph-action", this.exec);
        this.$eventbus.$on("graph-cursor", this.updateCursor);

        // Save original options
        this.originalOptions = Object.assign({}, this.options);
    },
    mounted() {
        this.observe();
        window.addEventListener("resize", debounce(this.handleResize.bind(this), 200));
    },
    beforeDestroy() {
        this.$eventbus.$off("graph-action", this.exec);
        this.$eventbus.$off("graph-cursor", this.updateCursor);

        this.unobserve();
        window.removeEventListener("resize", this.handleResize);

        if (this.chart) {
            this.chart.destroy();
        }
    },
    watch: {
        options: {
            immediate: true,
            handler(to) {
                if (this.observer === null) {
                    this.update();
                } else if (!to.time && !to.start_time && !to.end_time) {
                    this.timeDefer = moment().format(dateFormatRFC3339);
                }
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.v-graph {
    display: flex;
    position: relative;

    &.active,
    &:hover .v-graph-slides {
        outline: 0.9rem solid;
    }

    &:hover {
        .v-message,
        .v-graph-menu,
        .v-graph-slides {
            display: flex;
        }
    }

    .v-spinner {
        top: 0;
    }

    .v-message {
        display: none;
        font-size: 0.9rem;
        left: 1rem;
        line-height: 1rem;
        position: absolute;
        top: 1rem;
    }

    .v-graph-menu,
    .v-graph-slides {
        display: none;
    }

    .v-graph-container {
        flex-grow: 1;
        max-width: 100%;
        overflow: hidden;

        &:focus {
            outline: none;
        }

        /deep/ canvas {
            display: block;
        }
    }

    &,
    .v-graph-canvas {
        min-height: 20rem;
    }
}

.v-content.fullscreen .v-graph {
    height: 100%;

    &.active,
    &:hover .v-graph-slides {
        outline: none;
    }

    .v-graph-menu {
        padding: 0.5rem;
    }
}

body {
    &.dark .v-graph {
        &.active,
        &:hover .v-graph-slides {
            outline-color: var(--dark-main-foreground-color-light);
        }

        .v-message {
            background-color: var(--dark-main-foreground-color-light);
            color: var(--dark-main-foreground-color-medium);
        }

        /deep/ .v-button {
            > a {
                background-color: var(--dark-actionbar-background-color);
                color: var(--dark-main-foreground-color);
            }

            &:hover > a,
            &.focus > a,
            > a:focus {
                background-color: var(--dark-actionbar-highlight-color);
            }
        }
    }

    &.light .v-graph {
        &.active,
        &:hover .v-graph-slides {
            outline-color: var(--light-main-foreground-color-light);
        }

        .v-message {
            background-color: var(--light-main-foreground-color-light);
            color: var(--light-main-foreground-color-medium);
        }

        /deep/ .v-button {
            > a {
                background-color: var(--light-actionbar-background-color);
                color: var(--light-main-foreground-color);
            }

            &:hover > a,
            &.focus > a,
            > a:focus {
                background-color: var(--light-actionbar-highlight-color);
            }
        }
    }
}
</style>
