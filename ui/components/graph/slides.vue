<template>
    <div class="v-graph-slides">
        <div class="v-graph-fold" :class="{active: active.y == 'fold'}">
            <v-button icon="chevron-up" :label="$t('label.graphs.fold')"></v-button>
        </div>

        <div class="v-graph-steps">
            <v-button class="v-graph-step-backward" icon="arrow-left"
                :class="{active: active.x == 'backward'}" @click="$parent.exec('move', false)"></v-button>
            <v-button class="v-graph-step-forward" icon="arrow-right"
                :class="{active: active.x == 'forward'}" @click="$parent.exec('move', true)"></v-button>
        </div>

        <div class="v-graph-legend-toggle" :class="{active: active.y == 'legend'}">
            <v-button icon="chevron-up" :label="$t('label.graphs.hide_legend')"
                @click="$parent.exec('toggleLegend', false)" v-if="$parent.showLegend"></v-button>
            <v-button icon="chevron-down" :label="$t('label.graphs.show_legend')"
                @click="$parent.exec('toggleLegend', true)" v-else></v-button>
        </div>
    </div>
</template>

<script>
const mouseRange = 40;

export default {
    name: "v-graph-slides",
    data() {
        return {
            active: {
                x: null,
                y: null,
            },
        };
    },
    methods: {
        handleMouse(e) {
            let rect = this.$el.getBoundingClientRect(),
                relX = e.pageX - rect.x,
                relY = e.pageY - rect.y;

            if (this.active.x === null) {
                if (relX <= mouseRange) {
                    this.active.x = "backward";
                } else if (relX >= rect.width - mouseRange) {
                    this.active.x = "forward";
                }
            } else if (relX > mouseRange && relX < rect.width - mouseRange) {
                this.active.x = null;
            }

            if (this.active.y === null) {
                if (relY <= mouseRange) {
                    this.active.y = "fold";
                } else if (relY >= rect.height - mouseRange) {
                    this.active.y = "legend";
                }
            } else if (relY > mouseRange && relY < rect.height - mouseRange) {
                this.active.y = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-graph-slides {
    bottom: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 15;

    .v-graph-fold,
    .v-graph-legend-toggle,
    .v-graph-step-backward,
    .v-graph-step-forward {
        pointer-events: all;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
    }

    .v-graph-fold,
    .v-graph-legend-toggle {
        display: flex;
        font-size: 0.85rem;
        justify-content: center;
    }

    .v-graph-fold.active,
    .v-graph-legend-toggle.active {
        transform: translateY(0);
    }

    .v-graph-fold {
        transform: translateY(-100%);

        /deep/ .v-button > a {
            border-radius: 0 0 0.2rem 0.2rem;
        }
    }

    .v-graph-legend-toggle {
        transform: translateY(100%);

        /deep/ .v-button > a {
            border-radius: 0.2rem 0.2rem 0 0;
        }
    }

    .v-graph-steps {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: space-between;

        /deep/ .v-button > a {
            font-size: 1.8rem;
            height: 5rem;
            line-height: 5rem;
            padding: 0 0.5rem;
        }
    }

    .v-graph-step-backward {
        transform: translateX(-100%);

        /deep/ > a {
            border-radius: 0 0.2rem 0.2rem 0;
        }
    }

    .v-graph-step-forward {
        transform: translateX(100%);

        /deep/ > a {
            border-radius: 0.2rem 0 0 0.2rem;
        }
    }

    .v-graph-step-backward.active,
    .v-graph-step-forward.active {
        transform: translateX(0);
    }
}

body {
    &.dark .v-graph-slides {
        .v-button:hover /deep/ > a,
        .v-button.focus /deep/ > a,
        .v-button /deep/ > a:focus {
            background-color: var(--dark-main-foreground-color-light);
        }
    }

    &.light .v-graph-slides {
        .v-button:hover /deep/ > a,
        .v-button.focus /deep/ > a,
        .v-button /deep/ > a:focus {
            background-color: var(--light-main-foreground-color-light);
        }
    }
}
</style>
