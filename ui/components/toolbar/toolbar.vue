<template>
    <header class="v-toolbar">
        <slot></slot>
    </header>
</template>

<script>
export default {
    name: "v-toolbar",
    props: {
        title: String,
    },
};
</script>

<style lang="scss" scoped>
.v-toolbar {
    background-color: var(--toolbar-background-color);
    color: var(--toolbar-foreground-color);
    display: flex;
    height: 3.5rem;
    left: 0;
    line-height: 3.5rem;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;

    .v-button /deep/ > a {
        border: none;
        border-radius: 0;
        font-size: 1.35rem;
        height: 3.5rem;
        min-width: 3.5rem;
    }

    .v-input {
        background-color: var(--toolbar-highlight-color);
        border: none;
        margin: 0.75rem 1rem;

        /deep/ .v-icon {
            opacity: 1;
        }

        /deep/ input {
            width: 30rem;

            &::placeholder {
                opacity: 0;
            }
        }

        &.focus {
            background-color: var(--toolbar-input-background-color);
            color: var(--toolbar-input-foreground-color);

            /deep/ input::placeholder {
                opacity: var(--placeholder-opacity);
            }
        }
    }
}

body {
    &.dark .v-toolbar .v-button,
    &.light .v-toolbar .v-button {
        /deep/ > a {
            background-color: transparent;
        }

        &:hover /deep/ > a,
        &.focus /deep/ > a,
        /deep/ > a:focus {
            background-color: var(--toolbar-highlight-color);
        }
    }
}
</style>
