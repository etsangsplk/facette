<template>
    <div class="v-graph-legend">
        <table>
            <tr :key="idx" v-for="(series, idx) in data.series">
                <td><div class="label">
                    <span class="color" :style="{backgroundColor: chart.config.series[idx].color}"></span>
                    {{ series.name }}
                </div></td>
                <th>min</th>
                <td>{{ chart.config.axes.y.ticks.format(series.summary.min) }}</td>
                <th>avg</th>
                <td>{{ chart.config.axes.y.ticks.format(series.summary.avg) }}</td>
                <th>max</th>
                <td>{{ chart.config.axes.y.ticks.format(series.summary.max) }}</td>
                <th>last</th>
                <td>{{ chart.config.axes.y.ticks.format(series.summary.last) }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "v-graph-legend",
    data() {
        return {
            chart: {},
            data: {},
        };
    },
    methods: {
        update(data, chart) {
            this.data = data;
            this.chart = chart;

            // Update legend padding based on chart state
            Object.assign(this.$el.style, {
                paddingBottom: `${chart.config.margin / 2}px`,
                paddingLeft: `${chart.area.left}px`,
                paddingRight: `${chart.config.margin}px`,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.v-graph-legend {
    line-height: 1.75rem;
    font-size: 0.9rem;

    table {
        border-spacing: 0;
    }

    th,
    td {
        padding-right: 1rem;
    }

    td:first-child {
        padding-right: 2rem;
    }

    th {
        font-weight: normal;
    }

    .label {
        align-items: center;
        display: flex;

        .color {
            border-radius: 0.1rem;
            display: inline-block;
            height: 0.8rem;
            margin-right: 0.5rem;
            width: 1rem;
        }
    }
}

body {
    &.dark .v-graph-legend {
        th {
            color: var(--dark-tooltip-foreground-color-medium);
        }
    }

    &.light .v-graph-legend {
        th {
            color: var(--light-tooltip-foreground-color-medium);
        }
    }
}
</style>
