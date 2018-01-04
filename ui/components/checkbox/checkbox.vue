<template>
    <div class="v-checkbox" :class="{checked: value}">
        <v-icon :icon="value ? 'check-square' : ['far', 'square']" tabindex="0" @click="toggle"
            @keypress.enter="toggle"></v-icon>
        <input ref="input" type="checkbox" :checked="value" @change="$emit('input', $event.target.checked)">
        <label class="v-checkbox-label" @click="toggle" v-if="label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: "v-checkbox",
    props: {
        label: String,
        value: {},
    },
    methods: {
        toggle() {
            this.$refs.input.checked = !this.$refs.input.checked;
            this.$emit("input", this.$refs.input.checked);
        },
    },
};
</script>

<style lang="scss" scoped>
.v-checkbox {
    align-items: center;
    display: inline-flex;

    .v-icon {
        cursor: pointer;
        font-size: 1.2rem;

        &:focus {
            color: var(--color-blue);
            outline: none;
        }
    }

    input {
        display: none;
    }

    .v-checkbox-label {
        margin-left: 0.5rem;
    }
}

body {
    &.dark .v-checkbox {
        .v-icon {
            color: var(--dark-main-foreground-color-light);

            &:focus,
            &:hover {
                color: var(--dark-main-foreground-color-medium);
            }
        }

        &.checked .v-icon {
            color: var(--dark-main-foreground-color-medium);
        }
    }

    &.light .v-checkbox {
        .v-icon {
            color: var(--light-main-foreground-color-light);

            &:focus,
            &:hover {
                color: var(--light-main-foreground-color-medium);
            }
        }

        &.checked .v-icon {
            color: var(--light-main-foreground-color-medium);
        }
    }
}
</style>
