<template>
    <div class="v-input" :class="{focus: hasFocus, invalid: isInvalid, [`v-input-${type}`]: true}">
        <v-icon :icon="icon" v-if="icon"></v-icon>

        <textarea :value="value" @blur="handleFocus" @focus="handleFocus" @input="update"
            v-if="type == 'textarea'"></textarea>

        <input ref="input" :pattern="pattern" :placeholder="placeholder" :type="type" :value="value"
            @blur="handleFocus" @focus="handleFocus" @input="update" @keydown="handleKey" v-else>

        <template v-if="completionHandler">
            <v-spinner :loading="loading" :line-size="2" :size="14"></v-spinner>

            <v-dropdown v-if="open">
                <v-button :key="idx" :label="entry.label" @click.stop="select(idx)" @mousedown.native.prevent
                    @mouseenter.native="setActive(idx)" v-for="(entry, idx) in entries"></v-button>
            </v-dropdown>
        </template>
    </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
    name: "v-input",
    props: {
        completionHandler: Function,
        delay: {
            default: 0,
            type: Number,
        },
        icon: String,
        pattern: String,
        placeholder: String,
        type: {
            default: "text",
            type: String,
        },
        value: {
            required: true,
        },
    },
    data() {
        return {
            active: 0,
            activeEl: null,
            entries: [],
            hasFocus: false,
            isInvalid: false,
            loading: false,
            open: false,
            updateDebounce: null,
        };
    },
    methods: {
        focus(select = false) {
            this.$refs.input[select ? "select" : "focus"]();
        },
        handleFocus(e) {
            this.hasFocus = e.type == "focus";
            if (!this.hasFocus) {
                // this.open = false;
            }

            this.$emit(e.type, e);
        },
        handleKey(e) {
            switch (e.which) {
            case 13: // <Enter>
                if (this.open) {
                    this.open = false;
                    this.select(this.active);
                }
                break;

            case 27: // <Esc>
                if (this.completionHandler || this.type == "search") {
                    e.preventDefault();

                    if (this.open) {
                        this.open = false;
                    } else if (this.value) {
                        this.$emit("input", null);
                    } else {
                        e.target.blur();
                    }
                }
                break;

            case 38: // <Up>
            case 40: // <Down>
                if (this.open) {
                    e.preventDefault();

                    if (e.which == 38 && this.active > 0) {
                        this.active--;
                        this.switchFocus();
                    } else if (e.which == 40 && this.active < this.entries.length - 1) {
                        this.active++;
                        this.switchFocus();
                    }
                }
                break;
            }

            this.$emit(e.type, e);
        },
        select(idx) {
            this.open = false;
            this.$emit("input", this.entries[idx].value);
        },
        setActive(idx) {
            if (this.activeEl) {
                this.activeEl.classList.remove("focus");
            }

            this.active = idx;
        },
        update(e) {
            this.isInvalid = !e.target.validity.valid;

            if (!this.completionHandler && this.delay === 0) {
                this.$emit("input", e.target.value);
                return;
            }

            this.updateDebounce(e);
        },
        switchFocus() {
            this.$nextTick(() => {
                if (this.activeEl) {
                    this.activeEl.classList.remove("focus");
                }

                this.activeEl = this.$el.querySelector(`.v-button:nth-child(${this.active + 1})`);
                this.activeEl.classList.add("focus");
                this.activeEl.scrollIntoView({block: "nearest"});
            });
        },
    },
    mounted() {
        if (!this.completionHandler && !this.delay) {
            return;
        }

        this.updateDebounce = debounce((e) => {
            if (this.completionHandler) {
                if (e.target.value) {
                    this.loading = true;

                    this.completionHandler(e.target.value).then((response) => {
                        this.active = 0;
                        this.entries = response;
                        this.loading = false;

                        if (this.entries.length > 0) {
                            this.open = true;
                        }

                        this.$nextTick(() => {
                            this.activeEl = this.$el.querySelector(".v-button");
                            this.activeEl.classList.add("focus");
                        });
                    });
                } else {
                    this.open = false;
                }
            }

            this.$emit("input", e.target.value);
        }, this.delay);
    },
};
</script>

<style lang="scss" scoped>
.v-input {
    align-items: center;
    border-radius: 0.2rem;
    border: 1.5px solid;
    display: inline-flex;
    line-height: 2rem;
    min-height: 2rem;
    padding: 0 0.5rem;
    position: relative;

    &.v-input-search {
        -webkit-appearance: textfield;
    }

    &.v-input-textarea {
        padding: 0;

        textarea {
            padding: 0.5rem;
        }
    }

    .v-icon {
        margin-right: 0.35rem;
        opacity: var(--placeholder-opacity);
        width: 1.5rem;
    }

    input,
    textarea {
        background-color: transparent;
        border: none;
        flex-grow: 1;

        &:focus,
        &:invalid {
            box-shadow: none;
            outline: none;
        }
    }

    input[type=number] {
        -moz-appearance: textfield;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button, {
            -webkit-appearance: none;
        }
    }

    textarea {
        resize: vertical;
        min-height: 4rem;
    }

    .v-dropdown {
        left: 0;
        max-height: 12.5rem;
        overflow-y: auto;
        right: 0;

        .v-button /deep/ .v-label {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .v-spinner {
        bottom: auto;
        left: auto;
        margin-left: 0.35rem;
        position: static;
        right: auto;
        top: auto;
    }
}

body {
    &.dark .v-input,
    &.light .v-input {
        &.focus {
            border-color: var(--color-blue);
        }

        &.invalid {
            border-color: var(--color-red);
            color: var(--color-red);
        }
    }

    &.dark .v-input {
        border-color: var(--dark-input-border-color);
    }

    &.light .v-input {
        border-color: var(--light-input-border-color);
    }
}
</style>
