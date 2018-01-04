<template>
    <div class="v-divider"></div>
</template>

<script>
export default {
    name: "v-divider",
};
</script>

<style lang="scss" scoped>
.v-divider {
    height: 1px;
    margin: 0.35rem 0;
}

body {
    &.dark .v-divider {
        background-color: var(--dark-dropdown-divider-background-color);
    }

    &.light .v-divider {
        background-color: var(--light-dropdown-divider-background-color);
    }
}
</style>
