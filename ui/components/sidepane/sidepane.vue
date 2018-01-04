<template>
    <div class="v-sidepane" tabindex="-1" :class="{open: value}" @click="close" @keydown.esc="close">
        <div class="v-sidepane-content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "v-sidepane",
    props: {
        value: Boolean,
    },
    methods: {
        close() {
            this.$emit("input", false);
        },
    },
};
</script>

<style lang="scss" scoped>
.v-sidepane {
    bottom: 0;
    visibility: hidden;
    right: 0;
    left: 0;
    position: fixed;
    top: 3.5rem;
    transition: background-color 0.2s ease-in-out,
                visibility 0.2s ease 0.2s;
    user-select: none;
    z-index: 50;

    .v-sidepane-content {
        bottom: 0;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        padding: 2rem 2rem 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(45vw);
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: text;
        width: 45vw;
        will-change: transform;

        .v-form-actions:last-child {
            padding-bottom: 2rem;
        }
    }

    &.open {
        transition: background-color 0.2s ease-in-out;
        visibility: visible;

        .v-sidepane-content {
            transform: translateX(0);
        }
    }
}

body {
    &.dark .v-sidepane {
        &.open {
            background-color: var(--dark-sidepane-background-color);
        }

        .v-sidepane-content {
            background-color: var(--dark-main-background-color);
            box-shadow: var(--dark-sidepane-shadow);
        }
    }

    &.light .v-sidepane {
        &.open {
            background-color: var(--light-sidepane-background-color);
        }

        .v-sidepane-content {
            background-color: var(--light-main-background-color);
            box-shadow: var(--light-sidepane-shadow);
        }
    }
}
</style>
