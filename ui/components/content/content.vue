<template>
    <main class="v-content" :class="{fullscreen: fullscreen, 'has-actionbar-side': hasActionbarSide,
            'has-actionbar-top': hasActionbarTop, 'has-sidebar': hasSidebar && $store.state.sidebar,
            'has-tabset': hasTabset}">
        <slot></slot>
    </main>
</template>

<script>
export default {
    name: "v-content",
    props: {
        fullscreen: Boolean,
    },
    data() {
        return {
            hasActionbarSide: false,
            hasActionbarTop: false,
            hasSidebar: false,
            hasTabset: false,
        };
    },
    methods: {
        update() {
            Object.assign(this, {
                hasActionbarSide: this.$el.querySelector(".v-actionbar-side") !== null,
                hasActionbarTop: this.$el.querySelector(".v-actionbar-top") !== null,
                hasSidebar: this.$el.parentNode.querySelector(".v-sidebar") !== null,
                hasTabset: this.$el.querySelector(".v-tabset") !== null,
            });
        },
    },
    mounted() {
        this.update();
    },
    updated() {
        this.update();
    },
};
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 5.5rem 2rem 2rem;
    position: relative;
    transition: margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: margin-left;

    &.fullscreen {
        padding: 0;
    }

    &.has-actionbar-side {
        padding-left: 5.5rem;

        &.has-sidebar /deep/ .v-actionbar {
            left: 22rem;
        }
    }

    &.has-sidebar {
        margin-left: 22rem;
    }

    &.has-tabset {
        padding-right: 5.5rem;

        /deep/ .v-actionbar-top {
            margin-right: -5.5rem;
        }
    }

    article {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    /deep/ .v-actionbar-side,
    /deep/ .v-actionbar-top {
        transform: translateY(-2rem);
    }

    /deep/ .v-actionbar-top {
        margin: 0 -2rem;
    }

    /deep/ .v-message-placeholder {
        align-items: center;
        bottom: 0;
        display: flex;
        font-size: 1.1rem;
        justify-content: center;
        left: 0;
        padding: 0;
        position: absolute;
        right: 0;
        top: 3.5rem;
    }

    /deep/ h2 {
        font-weight: normal;
        margin-bottom: 2rem;
    }

    /deep/ dt {
        margin-bottom: 0.75rem;
    }

    /deep/ dd {
        padding-left: 2rem;

        & + dt {
            margin-top: 1.25rem;
        }
    }

    /deep/ .v-spinner {
        top: 3.5rem;
    }

    /deep/ .v-tabset {
        bottom: 0;
        flex-direction: column;
        padding: 0 1rem 1rem 0;
        position: fixed;
        right: 0;
        top: 7.5rem;
        will-change: left;

        .v-tab {
            border-radius: 0 0.2rem 0.2rem 0;
            line-height: 2.5rem;
            margin-bottom: 0.5rem;
            width: 2.5rem;
            writing-mode: tb-rl;

            .v-tab-label {
                padding: 1rem 0;
            }
        }
    }
}

body {
    &.dark main {
        /deep/ .v-message-placeholder,
        /deep/ dt {
            color: var(--dark-main-foreground-color-medium);
        }

        /deep/ .v-tabset {
            background-color: var(--dark-actionbar-background-color);

            .v-tab {
                &:hover,
                &.focus {
                    background-color: var(--dark-actionbar-highlight-color);
                }

                &.active {
                    background-color: var(--dark-main-background-color);
                }
            }
        }
    }

    &.light main {
        /deep/ .v-message-placeholder,
        /deep/ dt {
            color: var(--light-main-foreground-color-medium);
        }

        /deep/ .v-tabset {
            background-color: var(--light-actionbar-background-color);

            .v-tab {
                &:hover,
                &.focus {
                    background-color: var(--light-actionbar-highlight-color);
                }

                &.active {
                    background-color: var(--light-main-background-color);
                }
            }
        }
    }
}

@media (max-width: 800px) {
    main.has-sidebar {
        margin-left: 0;
    }
}
</style>
