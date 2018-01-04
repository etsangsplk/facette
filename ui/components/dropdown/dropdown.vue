<template>
    <div class="v-dropdown" :class="`v-dropdown-${placement}`">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "v-dropdown",
    props: {
        placement: {
            default: "right",
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-dropdown {
    border-radius: 0.2rem;
    box-sizing: border-box;
    cursor: default;
    line-height: 2rem;
    padding: 0.35rem 0;
    position: absolute;
    z-index: 150;

    &.v-dropdown-left,
    &.v-dropdown-right {
        top: 100%;
    }

    &.v-dropdown-left {
        right: 0;
    }

    &.v-dropdown-right {
        left: 0;
    }

    &.v-dropdown-left .v-dropdown,
    &.v-dropdown-right .v-dropdown {
        top: -0.35rem;
    }

    &.v-dropdown-left .v-dropdown {
        left: auto;
        right: 100%;
    }

    &.v-dropdown-right .v-dropdown {
        left: 100%;
        right: auto;
    }

    .v-button {
        display: block;

        /deep/ > a {
            border: none;
            border-radius: 0;

            .v-icon {
                width: 1.5rem;
            }

            .v-caret {
                font-size: 1.1rem;
                opacity: 0.5;
            }
        }

        &:hover /deep/ > a,
        &.focus /deep/ > a,
        /deep/ > a:focus {
            .v-caret {
                opacity: 0.75;
            }
        }
    }
}

body {
    &.dark .v-dropdown .v-button,
    &.light .v-dropdown .v-button {
        /deep/ > a {
            background-color: transparent;
        }

        &:hover /deep/ > a,
        &.focus /deep/ > a,
        /deep/ > a:focus {
            background-color: var(--color-blue);
            color: var(--color-white);
        }
    }

    &.dark .v-dropdown {
        background-color: var(--dark-dropdown-background-color);
        box-shadow: var(--dark-dropdown-shadow);
        color: var(--dark-dropdown-foreground-color);

        .v-button /deep/ > a {
            color: var(--dark-main-foreground-color);
        }
    }

    &.light .v-dropdown {
        background-color: var(--light-dropdown-background-color);
        box-shadow: var(--light-dropdown-shadow);
        color: var(--light-dropdown-foreground-color);

        .v-button /deep/ > a {
            color: var(--light-main-foreground-color);
        }
    }
}
</style>
