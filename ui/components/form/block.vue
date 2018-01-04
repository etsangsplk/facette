<template>
    <div class="v-form-block" :class="{[`v-form-${type}`]: type, grow: grow}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "v-form-block",
    props: {
        grow: Boolean,
        type: String,
    },
};
</script>

<style lang="scss" scoped>
.v-form-block {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;

    & + .v-form-block {
        margin-top: 0;
    }

    &.grow {
        flex-grow: 1;
    }

    &.half {
        width: 50%;
    }

    &.v-form-actions {
        flex-direction: row;
        margin-top: 1rem;
    }

    &.v-form-row {
        flex-direction: row;

        > .v-form-block {
            border-left: 1.5px solid;
            margin: 0;
            padding: 1rem 2rem;

            &.small {
                min-width: 22rem;
                width: 22rem;
            }

            &:first-child {
                border-left: none;
                padding-left: 0;
            }

            &:last-child {
                padding-right: 0;
            }
        }
    }

    > :first-child {
        margin-top: 0;
    }

    > :last-child {
        margin-bottom: 0;
    }

    .v-button + .v-button,
    .v-input + .v-button,
    .v-select + .v-button {
        margin-left: 0.75rem;
    }
}

body {
    &.dark .v-form-block {
        &.v-form-row > .v-form-block {
            border-color: var(--dark-main-foreground-color-light);
        }
    }

    &.light .v-form-block {
        &.v-form-row > .v-form-block {
            border-color: var(--light-main-foreground-color-light);
        }
    }
}
</style>
