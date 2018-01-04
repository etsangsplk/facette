<template>
    <div class="v-actionbar" :class="{'v-actionbar-side': side, 'v-actionbar-top': !side}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "v-actionbar",
    props: {
        side: Boolean,
    },
};
</script>

<style lang="scss" scoped>
.v-actionbar {
    align-items: center;
    display: flex;
    top: 5.5rem;
    z-index: 25;

    &.v-actionbar-top {
        flex-direction: row;
        line-height: 2.5rem;
        min-height: 4rem;
        padding: 0 2rem;
        position: sticky;

        > .v-button {
            margin: 0.75rem 0.25rem;
        }
    }

    &.v-actionbar-side {
        bottom: -2rem;
        flex-direction: column;
        left: 0;
        min-width: 3.5rem;
        position: fixed;
        top: 5.5rem;
        transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: left;

        > .v-button {
            width: 100%;

            /deep/ > a {
                height: 3.5rem;
                justify-content: center;
                line-height: 3.5rem;
                padding: 0;
            }

            /deep/ > .v-dropdown-right {
                left: 100%;
                top: 0;
            }
        }
    }

    h1 {
        align-items: center;
        display: flex;
        font-size: 1.3rem;
        font-weight: normal;
        margin-right: 2rem;

        .v-separator {
            font-size: 1rem;
            margin: 0 0.75rem;
        }
    }

    .v-button,
    .v-input {
        border: none;
    }

    .v-input {
        margin: 0.75rem 0;

        /deep/ input {
            width: 16rem;

            &::placeholder {
                opacity: 0;
            }
        }

        &.focus /deep/ input::placeholder {
            opacity: var(--placeholder-opacity);
        }
    }
}

body {
    &.dark .v-actionbar {
        background-color: var(--dark-actionbar-background-color);

        .v-separator {
            color: var(--dark-main-foreground-color-medium);
        }

        .v-button /deep/ > a {
            color: var(--dark-main-foreground-color);
        }

        .v-button:hover /deep/ > a,
        .v-button.focus /deep/ > a,
        .v-button /deep/ > a:focus,
        .v-input {
            background-color: var(--dark-actionbar-highlight-color);
        }
    }

    &.light .v-actionbar {
        background-color: var(--light-actionbar-background-color);

        .v-separator {
            color: var(--light-main-foreground-color-medium);
        }

        .v-button /deep/ > a {
            color: var(--light-main-foreground-color);
        }

        .v-button:hover /deep/ > a,
        .v-button.focus /deep/ > a,
        .v-button /deep/ > a:focus,
        .v-input {
            background-color: var(--light-actionbar-highlight-color);
        }
    }

    &.dark .v-actionbar,
    &.light .v-actionbar {
        .v-button /deep/ > a,
        .v-button[disabled] /deep/ > a {
            background-color: transparent;
        }
    }
}

@media (max-width: 1024px) {
    .v-actionbar {
        h1 {
            display: none;
        }
    }
}

@media (max-width: 1280px) {
    .v-actionbar {
        .v-button /deep/ > a .v-label {
            display: none;
        }
    }
}
</style>
