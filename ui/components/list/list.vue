<template>
    <table class="v-list" :class="{'v-list-simple': !hasHead}">
        <thead v-if="hasHead">
            <tr>
                <v-list-tile type="heading" class="v-list-handle" v-if="draggable"></v-list-tile>
                <v-list-tile type="heading" class="v-list-select" v-if="selectable && value">
                    <v-checkbox v-model="selectedAll" @click.native="selectAll(selectedAll)"></v-checkbox>
                </v-list-tile>
                <slot name="head"></slot>
            </tr>
        </thead>
        <draggable element="tbody" :options="{disabled: !draggable, handle: '.v-list-handle'}" v-model="items">
            <tr class="v-list-item" :class="{active: idx === active, disabled: typeof active == 'number' &&
                    idx !== active, selected: selected[selectKey ? item[selectKey] : idx]}"
                    v-for="(item, idx) in items">
                <v-list-tile class="v-list-handle" v-if="draggable">
                    <v-icon icon="ellipsis-v"></v-icon>
                </v-list-tile>
                <v-list-tile class="v-list-select" v-if="selectable && value">
                    <v-checkbox v-model="selected[selectKey ? item[selectKey] : idx]"
                        @click.native="selectRange($event, idx)"></v-checkbox>
                </v-list-tile>
                <slot v-bind="{index: idx, value: item}"></slot>
            </tr>
        </draggable>
    </table>
</template>

<script>
export default {
    name: "v-list",
    props: {
        active: Number,
        draggable: Boolean,
        selectable: Boolean,
        selectKey: String,
        value: Array,
    },
    data() {
        return {
            lastIndex: null,
            selected: {},
            selectedAll: false,
        };
    },
    computed: {
        hasHead() {
            return !!(this.$slots && this.$slots.head);
        },
        items: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
    methods: {
        selectAll(checked) {
            let selected = {};

            this.value.forEach((item, idx) => {
                selected[this.selectKey ? item[this.selectKey] : idx] = checked;
            });

            this.selected = selected;
        },
        selectRange(e, idx) {
            if (e.shiftKey && this.lastIndex !== null) {
                let selected = Object.assign({}, this.selected),
                    start = Math.min(this.lastIndex, idx),
                    end = Math.max(this.lastIndex, idx);

                for (let idx = start; idx <= end; idx++) {
                    if (this.selectKey) {
                        selected[this.value[idx][this.selectKey]] =
                            this.selected[this.value[this.lastIndex][this.selectKey]];
                    } else {
                        selected[idx] = this.selected[this.lastIndex];
                    }
                }

                this.selected = selected;
            }

            this.lastIndex = idx;
        },
        updateSelection() {
            let selected = this.value.filter((item, idx) => this.selected[this.selectKey ? item[this.selectKey] : idx]);

            this.$emit("selected", selected);
            this.selectedAll = selected.length > 0 && selected.length === this.value.length;
        },
    },
    beforeMount() {
        this.selectAll(false);
    },
    watch: {
        value() {
            this.updateSelection();
        },
        selected: {
            deep: true,
            handler() {
                this.updateSelection();
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-list {
    border-spacing: 0;
    width: 100%;

    &.v-list-simple {
        /deep/ .v-list-item:first-of-type .v-list-tile {
            border-top-style: solid;
            border-top-width: 1px;
        }
    }

    .v-list-handle {
        cursor: pointer;

        .v-icon {
            align-items: center;
            display: flex;
            opacity: var(--placeholder-opacity);
        }
    }

    .v-list-select {
        user-select: none;

        .v-checkbox {
            align-items: center;
            display: flex;
        }
    }

    .v-list-item {
        &:hover /deep/ .v-reveal {
            visibility: visible;
        }

        /deep/ .v-reveal {
            visibility: hidden;
        }
    }

    .sortable-drag .v-list-tile {
        border: none;
    }

    .sortable-ghost {
        opacity: var(--placeholder-opacity);
    }
}

body {
    &.dark .v-list /deep/,
    &.light .v-list /deep/ {
        .v-list-item.active,
        .v-list-item.disabled {
            .v-list-handle .v-icon,
            .v-reveal {
                visibility: hidden;
            }
        }

        .v-list-item.active {
            background-color: var(--color-blue);
            color: var(--color-white);
        }
    }

    &.dark .v-list /deep/ {
        /deep/ .v-reveal,
        .v-list-heading,
        .v-list-item.disabled {
            color: var(--dark-main-foreground-color-medium);
        }

        .sortable-drag {
            background-color: var(--dark-main-background-color);
        }
    }

    &.light .v-list {
        /deep/ .v-reveal,
        .v-list-heading,
        .v-list-item.disabled {
            color: var(--light-main-foreground-color-medium);
        }

        .sortable-drag {
            background-color: var(--light-main-background-color);
        }
    }
}
</style>
