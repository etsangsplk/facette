<template>
    <td class="v-list-tile" :class="{grow: grow, [`v-list-${type}`]: type, [`align-${align}`]: true}" :colspan="span">
        <slot></slot>
    </td>
</template>

<script>
export default {
    name: "v-list-tile",
    props: {
        align: {
            default: "left",
            type: String,
        },
        grow: Boolean,
        span: {
            default: 1,
            type: Number,
        },
        type: String,
    },
};
</script>

<style lang="scss" scoped>
.v-list-tile {
    border-bottom: 1px solid;
    padding: 0.65rem 0.5rem;
    white-space: nowrap;

    &:first-child {
        padding-left: 1rem;
    }

    &:last-child {
        padding-right: 1rem;
    }

    .v-list-heading {
        border-bottom: 1.5px solid;
        font-weight: normal;
        text-align: left;
    }

    &.v-list-actions {
        padding-right: 0;
    }

    &.align-right {
        text-align: right;
    }

    &.grow {
        width: 100%;
    }
}

body {
    &.dark .v-list-tile {
        border-color: var(--dark-main-foreground-color-light);

        &.v-list-actions /deep/ > .v-button {
            > a {
                background-color: transparent;
                color: var(--dark-main-foreground-color);
                padding: 0 0.25rem;
            }

            &:hover > a,
            &.focus > a,
            > a:focus {
                background-color: var(--dark-main-foreground-color-dark);
            }
        }
    }

    &.light .v-list-tile {
        border-color: var(--light-main-foreground-color-light);

        &.v-list-actions /deep/ > .v-button {
            > a {
                background-color: transparent;
                color: var(--light-main-foreground-color);
                padding: 0 0.25rem;
            }

            &:hover > a,
            &.focus > a,
            > a:focus {
                background-color: var(--light-main-foreground-color-light);
            }
        }
    }
}
</style>
