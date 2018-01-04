<template>
    <div class="v-graph-cursor"></div>
</template>

<script>
export default {
    name: "v-graph-cursor",
    methods: {
        update(style) {
            Object.assign(this.$el.style, style);
        },
    },
};
</script>

<style lang="scss" scoped>
.v-graph-cursor {
    display: none;
    height: 1px;
    pointer-events: none;
    position: absolute;
    width: 1px;
    will-change: height, left, top;
}

body {
    &.dark .v-graph-cursor {
        background-color: var(--dark-graph-cursor-background-color);
    }

    &.light .v-graph-cursor {
        background-color: var(--light-graph-cursor-background-color);
    }
}
</style>
