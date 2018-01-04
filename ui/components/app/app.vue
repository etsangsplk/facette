<template>
    <div class="v-app">
        <slot></slot>
    </div>
</template>

<script>
import "./themes";

// Initialize polyfills
import "intersection-observer";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

export default {
    name: "v-app",
    props: {
        theme: {
            type: String,
            required: true,
        },
    },
    watch: {
        theme: {
            handler(to, from) {
                if (from) {
                    document.body.classList.replace(from, to);
                } else {
                    document.body.classList.add(to);
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-app {
    height: 100%;
    overflow-y: auto;
}
</style>

<style lang="scss">
body {
    &.dark {
        background-color: var(--dark-main-background-color);
        color: var(--dark-main-foreground-color);
    }

    &.light {
        background-color: var(--light-main-background-color);
        color: var(--light-main-foreground-color);
    }
}
</style>
