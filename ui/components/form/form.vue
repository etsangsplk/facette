<template>
    <div class="v-form" :class="{constrained: constrained}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "v-form",
    props: {
        constrained: Boolean,
    },
};
</script>

<style lang="scss" scoped>
.v-form {
    &.constrained {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        > .v-form-block {
            flex-grow: 1;
            height: 1px;
            margin: 0;
            overflow: hidden;

            /deep/ .v-form-block.grow {
                overflow-y: auto;
            }
        }
    }

    /deep/ label,
    /deep/ .v-input,
    /deep/ .v-select {
        width: 100%;
    }

    /deep/ .v-input.small,
    /deep/ .v-select.small {
        width: 50%;
    }

    /deep/ .v-form-block > label {
        align-items: center;
        display: flex;
        margin-bottom: 0.5rem;

        .v-icon {
            font-size: 0.9rem;
            margin-left: 0.5rem;
            opacity: 0.25;

            &:hover {
                opacity: 0.75;
            }
        }
    }
}
</style>
