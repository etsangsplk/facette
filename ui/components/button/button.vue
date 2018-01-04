<template>
    <div class="v-button" :class="{'has-dropdown': hasDropdown, 'v-button-icon': !label}" :disabled="disabled">
        <router-link :class="{'has-dropdown': hasDropdown, 'v-button-icon': !label}" :exact="exact" :to="to" v-if="to">
            <span class="v-icon" v-if="icon === ''"></span>
            <v-icon :icon="icon" :options="iconOptions" v-else-if="icon"></v-icon>
            <span class="v-label" v-if="label">{{ label }}</span>
            <slot></slot>
        </router-link>

        <a :tabindex="disabled ? -1 : 0" @click="$emit('click', $event)" @blur="handleFocus" @focus="handleFocus"
                @keydown.enter="$emit('click', $event)" v-else>
            <span class="v-icon" v-if="icon === ''"></span>
            <v-icon :icon="icon" :options="iconOptions" v-else-if="icon"></v-icon>
            <span class="v-label" v-if="label">{{ label }}</span>
            <slot></slot>
        </a>

        <v-dropdown :placement="dropdownPlacement" v-if="hasDropdown">
            <slot name="dropdown"></slot>
        </v-dropdown>
    </div>
</template>

<script>
export default {
    name: "v-button",
    props: {
        disabled: Boolean,
        dropdownPlacement: String,
        exact: Boolean,
        icon: [Object, Array, String],
        iconOptions: Object,
        label: String,
        to: Object,
    },
    computed: {
        hasDropdown() {
            return !!(this.$slots && this.$slots.dropdown);
        },
    },
    methods: {
        handleFocus(e) {
            if (e.type == "focus") {
                Array(...this.$el.parentNode.children).forEach((node) => {
                    if (node.matches(".focus")) {
                        node.classList.remove("focus");
                    }
                });

                if (this.hasDropdown) {
                    this.$el.classList.add("focus");
                }
            } else {
                var parent = this.$el.parentNode.closest(".v-button.has-dropdown"),
                    next = e.relatedTarget;

                if (parent === null && (next === null || next.closest(".v-button.has-dropdown") === null)) {
                    this.$el.classList.remove("focus");
                } else if (parent !== null) {
                    if (next === null) {
                        parent.parents(".v-button.has-dropdown").forEach((node) => {
                            node.classList.remove("focus");
                        });
                    } else if (!next.parents(".v-button.has-dropdown").includes(parent)) {
                        parent.classList.remove("focus");
                    }
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-button {
    display: inline-block;
    position: relative;
    user-select: none;

    &[disabled] {
        pointer-events: none;

        > a .v-icon,
        > a .v-label {
            opacity: var(--disabled-opacity);
        }
    }

    &.v-button-icon {
        justify-content: center;

        > a .v-icon {
            width: 1.5rem;
        }
    }

    > a {
        align-items: center;
        border: 1.5px solid transparent;
        border-radius: 0.2rem;
        color: inherit;
        cursor: pointer;
        display: flex;
        height: 2rem;
        line-height: 2rem;
        padding: 0 1rem;
        text-decoration: none;
        white-space: nowrap;

        &:focus {
            outline: none;
        }

        .v-icon + .v-label {
            margin-left: 0.65rem;
        }

        .v-label {
            flex-grow: 1;
        }
    }

    &.big > a {
        height: 3rem;
        line-height: 3rem;
        padding: 0 2rem;
        text-align: center;
    }

    .v-dropdown {
        display: none;
    }

    &.focus > .v-dropdown,
    &:hover > .v-dropdown {
        display: unset;
    }
}

body {
    &.dark .v-button {
        > a {
            background-color: var(--dark-input-background-color);
        }

        &:hover > a,
        &.focus > a,
        > a:focus {
            background-color: var(--dark-input-border-color);
        }
    }

    &.light .v-button {
        > a {
            background-color: var(--light-button-background-color);
            color: var(--light-button-foreground-color);
        }

        &:hover > a,
        &.focus > a,
        > a:focus {
            background-color: var(--light-button-highlight-color);
        }
    }

    &.dark .v-button.danger,
    &.light .v-button.danger {
        > a {
            background-color: transparent;
            border-color: var(--color-red);
            color: var(--color-red);
        }

        &:hover > a,
        &.focus > a,
        > a:focus {
            background-color: var(--color-red);
            color: var(--color-white);
        }
    }
}
</style>
