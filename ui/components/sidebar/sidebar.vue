<template>
    <aside class="v-sidebar" :class="{open: value}">
        <slot></slot>
    </aside>
</template>

<script>
export default {
    name: "v-sidebar",
    props: {
        value: Boolean,
    },
};
</script>

<style lang="scss" scoped>
.v-sidebar {
    background-color: var(--sidebar-background-color);
    bottom: 0;
    color: var(--sidebar-foreground-color);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: fixed;
    top: 3.5rem;
    transform: translateX(-100%);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    width: 22rem;
    will-change: transform;
    z-index: 50;

    &.open {
        transform: translateX(0);
    }

    nav {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 2rem 0;
    }

    /deep/ h1 {
        background-color: var(--sidebar-top-background-color);
        font-size: 1.3rem;
        font-weight: normal;
        height: 4rem;
        line-height: 4rem;
        padding: 0 2rem;
        position: sticky;
        top: 2rem;
        transform: translateY(-2rem);
        z-index: 25;
    }

    /deep/ h2 {
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 0.1rem;
        line-height: 2.5rem;
        margin: 0.5rem 0;
        overflow: hidden;
        padding: 0 1.5rem;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:first-of-type {
            margin-top: 0;
        }
    }

    /deep/ .v-button {
        display: block;

        > a {
            border: none;
            border-radius: 0;
            line-height: 2rem;
            margin: 0.25rem 0;
            padding: 0 1.5rem;

            .v-label {
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        > a.active {
            box-shadow: inset -0.35rem 0 0 var(--color-blue);
        }
    }

    /deep/ .v-message-placeholder {
        align-items: center;
        display: flex;
        flex-grow: 1;
        font-size: 1.1rem;
        justify-content: center;
        padding: 0;
    }
}

body {
    &.dark .v-sidebar /deep/ h2 {
        color: var(--dark-main-foreground-color-medium);
    }

    &.light .v-sidebar /deep/ h2 {
        color: var(--light-main-foreground-color-medium);
    }

    &.dark .v-sidebar /deep/ .v-button,
    &.light .v-sidebar /deep/ .v-button {
        > a {
            background-color: transparent;
        }

        &:hover > a,
        &.focus > a,
        > a:focus,
        > a.active {
            background-color: var(--sidebar-highlight-color);
        }
    }
}

@media (max-width: 800px) {
    main.has-sidebar {
        margin-left: 0;
    }
}
</style>
