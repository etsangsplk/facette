<template>
    <div class="v-tab" :class="{active: active, focus: hasFocus}">
        <router-link class="v-tab-label" :to="to" @blur="handleFocus" @focus="handleFocus"
            v-if="to">{{ label }}</router-link>
        <a class="v-tab-label" tabindex="0" @click="$emit('click', $event)" @blur="handleFocus" @focus="handleFocus"
            @keydown.enter="$emit('click', $event)" v-else>{{ label }}</a>
        <span class="v-tab-counter" v-if="counter">{{ counter }}</span>
    </div>
</template>

<script>
export default {
    name: "v-tab",
    props: {
        active: Boolean,
        counter: Number,
        label: {
            required: true,
            type: String,
        },
        to: Object,
    },
    data() {
        return {
            hasFocus: false,
        };
    },
    methods : {
        handleFocus(e) {
            this.hasFocus = e.type == "focus";
        },
    },
};
</script>

<style lang="scss" scoped>
.v-tab {
    cursor: pointer;

    .v-tab-label {
        display: inline-block;
        outline: none;
        padding: 0 0.5rem;
        text-decoration: none;
    }

    .v-tab-counter {
        font-size: 0.9rem;
        margin: -0.5rem 0 1rem;
    }
}

body {
    &.dark .v-tab-counter {
        color: var(--dark-main-foreground-color-medium);
    }

    &.light .v-tab-counter {
        color: var(--light-main-foreground-color-medium);
    }
}
</style>
