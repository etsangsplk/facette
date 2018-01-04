<template>
    <div class="v-message" :class="`v-message-${type}`">
        <v-icon :icon="icon" v-if="icon"></v-icon>
        <div class="v-message-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "v-message",
    props: {
        icon: [Array, String],
        type: String,
    },
};
</script>

<style lang="scss" scoped>
.v-message {
    align-items: center;
    border-radius: 0.2rem;
    display: flex;
    padding: 0.5rem 0.75rem;

    &.v-message-error {
        background-color: var(--color-red);
        color: var(--message-foreground-color);
    }

    &.v-message-warning {
        background-color: var(--color-yellow);
        color: var(--message-foreground-color);
    }

    &.v-message-success {
        background-color: var(--color-green);
        color: var(--message-foreground-color);
    }

    &.v-message-info {
        background-color: var(--color-blue);
        color: var(--message-foreground-color);
    }

    .v-icon {
        font-size: 1.1rem;
        margin-right: 0.5rem;
    }
}
</style>
