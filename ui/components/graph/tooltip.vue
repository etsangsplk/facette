<template>
    <div class="v-graph-tooltip">
        <table>
            <thead>
                <tr>
                    <th colspan="2">{{ tooltip.title }}</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>{{ $t("label.total") }}</th>
                    <td>{{ tooltip.total }}</td>
                </tr>
            </tfoot>
            <tbody>
                <tr :key="idx" v-for="(entry, idx) in tooltip.entries">
                    <th>
                        <span class="color" :style="{backgroundColor: entry.color}"></span>
                        {{ entry.name }}
                    </th>
                    <td>{{ entry.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import * as d3 from "d3";
import moment from "moment";

export default {
    name: "v-graph-tooltip",
    data() {
        return {
            tooltip: {},
        };
    },
    methods: {
        update(e, chart) {
            if (e === null) {
                // Reset tooltip state
                Object.assign(this.$el.style, {
                    bottom: null,
                    display: "none",
                    left: null,
                    right: null,
                    top: chart.config.margin,
                });

                return;
            }

            let date = chart.xScale.invert(e.layerX - chart.area.left),
                bisector = d3.bisector(a => a[0] * 1000).left,
                total = 0;

            let tooltip = {
                title: moment(date).format(this.$t("date.long")),
                entries: chart.config.series.map((series) => {
                    let idx = series.points ? bisector(series.points, date, 1) : -1,
                        value = idx != -1 && series.points[idx] ? series.points[idx][1] : null;

                    if (value) {
                        total += value;
                    }

                    return {
                        name: series.name,
                        value: chart.config.axes.y.ticks.format(value),
                        color: series.color,
                    };
                }),
            };

            this.tooltip = Object.assign(tooltip, {total: chart.config.axes.y.ticks.format(total)});

            // Check client height before update to prevent flicking
            if (this.$el.clientHeight > 0) {
                let style = {
                    visibility: null,
                };

                if (e.layerX + this.$el.clientWidth >= chart.width - chart.config.margin * 2) {
                    style.left = `${e.layerX - this.$el.clientWidth - chart.config.margin}px`;
                } else {
                    style.left = `${e.layerX + chart.config.margin}px`;
                }

                if (e.clientY - this.$el.clientHeight >= chart.config.margin) {
                    style.top = `${e.layerY - this.$el.clientHeight}px`;
                } else {
                    style.top = `${chart.config.margin}px`;
                }

                Object.assign(this.$el.style, style);
            } else {
                Object.assign(this.$el.style, {
                    display: "block",
                    visibility: "hidden",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-graph-tooltip {
    background-color: rgba(0, 255, 255, 0.9);
    border-radius: 0.2rem;
    display: none;
    font-size: 0.9rem;
    padding: 0.5rem;
    pointer-events: none;
    position: absolute;
    white-space: nowrap;
    will-change: bottom, left, right, top;
    z-index: 200;

    table {
        border-spacing: 0.5rem 0;
        width: 1px;
    }

    th {
        font-weight: normal;
        width: 100%;
    }

    tfoot th,
    tfoot td,
    tbody td {
        text-align: right;
    }

    tbody th {
        text-align: left;
    }

    tfoot th,
    tbody th {
        padding-right: 0.5rem;
    }

    .color {
        border-radius: 0.1rem;
        display: inline-block;
        height: 0.75rem;
        margin-right: 0.25rem;
        vertical-align: middle;
        width: 0.75rem;
    }
}

body {
    &.dark .v-graph-tooltip {
        background-color: var(--dark-tooltip-background-color);
        color: var(--dark-tooltip-foreground-color);

        thead th,
        tfoot th {
            color: var(--dark-tooltip-foreground-color-medium);
        }
    }

    &.light .v-graph-tooltip {
        background-color: var(--light-tooltip-background-color);
        color: var(--light-tooltip-foreground-color);

        thead th,
        tfoot th {
            color: var(--light-tooltip-foreground-color-medium);
        }
    }
}
</style>
