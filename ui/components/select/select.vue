<template>
    <div class="v-select" :class="{focus: hasFocus}" :tabindex="opened ? -1 : 0" @blur="handleFocus"
            @click="open" @focus="handleFocus" @keydown.enter="open">
        <div class="v-select-value" :class="{placeholder: value === undefined}" v-show="!opened">
            <span class="v-select-label">{{ value !== undefined ?
                this.options[this.selected].label : placeholder }}</span>
            <v-icon icon="chevron-down"></v-icon>
        </div>

        <v-input type="search" :delay="200" :placeholder="placeholder" @blur="handleFocus" @focus="handleFocus"
            @keydown.stop="handleKey" v-model="filter" v-show="opened"></v-input>

        <v-dropdown v-show="opened">
            <v-button :class="{focus: active === idx}" :key="idx" :label="option.label"
                @click.stop="select(idx)" @mousedown.native.prevent @mouseenter.native="setActive(idx)"
                v-for="(option, idx) in (filteredOptions || options)"></v-button>
        </v-dropdown>
    </div>
</template>

<script>
export default {
    name: "v-select",
    props: {
        options: Array,
        placeholder: String,
        value: {
            required: true,
        },
    },
    data() {
        return {
            active: 0,
            filter: null,
            filteredOptions: null,
            hasFocus: false,
            inputEl: null,
            opened: false,
            selected: 0,
        };
    },
    methods: {
        handleFocus(e) {
            // Skip focus/blur when switching from main element to input
            if (
                e.type == "blur" && e.relatedTarget === this.inputEl ||
                e.type == "focus" && e.relatedTarget === this.$el
            ) {
                return;
            }

            this.hasFocus = e.type == "focus";

            if (!this.hasFocus) {
                this.opened = false;
            }
        },
        handleKey(e) {
            switch (e.which) {
            case 13: // <Enter>
                this.select(this.active);
                break;

            case 38: // <Up>
                e.preventDefault();
                if (this.active > 0) {
                    this.active--;
                }
                break;

            case 40: // <Down>
                e.preventDefault();
                if (this.active < Object.keys(this.filteredOptions || this.options).length - 1) {
                    this.active++;
                }
                break;
            }
        },
        open() {
            this.active = 0;
            this.filter = null;
            this.opened = true;
            this.$nextTick(() => this.inputEl.focus());
        },
        select(idx) {
            this.opened = false;
            this.$emit("input", this.filteredOptions ? this.filteredOptions[idx].value : this.options[idx].value);
            this.$nextTick(() => this.$el.focus());
        },
        setActive(idx) {
            this.active = idx;
        },
    },
    mounted() {
        this.inputEl = this.$el.querySelector("input");
    },
    watch: {
        filter(to) {
            if (to) {
                to = to.toLowerCase();
            }

            this.filteredOptions = to ? this.options.filter(a => a.label.toLowerCase().indexOf(to) != -1) : null;
        },
        value: {
            handler(to) {
                for(let i in this.options) {
                    if (this.options[i].value === to) {
                        this.selected = i;
                    }
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-select {
    border-radius: 0.2rem;
    border: 1.5px solid;
    line-height: calc(2rem - 3px);
    min-height: 2rem;
    padding: 0 0.5rem;
    position: relative;

    &:focus {
        outline: none;
    }

    .v-select-value {
        align-items: center;
        cursor: default;
        display: flex;

        &.placeholder {
            .v-select-label {
                opacity: var(--placeholder-opacity);
            }
        }

        .v-select-label {
            flex-grow: 1;
            height: calc(2rem - 3px);
        }

        .v-icon {
            margin-left: 0.5rem;
            opacity: var(--placeholder-opacity);
        }
    }

    .v-input {
        border: none;
        border-radius: 0;
        min-height: auto;
        padding: 0;
    }

    .v-dropdown {
        left: 0;
        right: 0;
    }
}

body {
    &.dark .v-select.focus,
    &.light .v-select.focus {
        border-color: var(--color-blue);

        .v-icon {
            color: var(--color-blue);
        }
    }

    &.dark .v-select {
        border-color: var(--dark-input-border-color);
    }

    &.light .v-select {
        border-color: var(--light-input-border-color);
    }
}
</style>
