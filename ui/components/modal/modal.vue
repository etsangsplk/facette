<template>
    <div class="v-modal" v-if="visible" @click="toggle(false)" @keydown="handleKey">
        <div class="v-modal-content" @click.stop>
            <slot>
                <p v-if="text">{{ text }}</p>

                <div class="v-modal-actions">
                    <v-button :class="{[button.class]: button.class, default: button.default}" :data-index="idx"
                        :key="button.label" :label="button.label" @click="handleAction($event, button)"
                        v-for="(button, idx) in buttons"></v-button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import modal from ".";

export default {
    name: "v-modal",
    data() {
        return {
            buttons: [],
            hasDefault: false,
            text: null,
            visible: false,
        };
    },
    methods: {
        handleAction(e, button) {
            if (button.handler) {
                button.handler(e);
            }

            this.toggle(false);
        },
        handleKey(e) {
            switch (e.which) {
            case 9: { // <Tab>
                let index = parseInt(e.target.closest(".v-button").getAttribute("data-index"), 10);

                if (index === 0) {
                    e.preventDefault();
                    this.$el.querySelector(".v-modal-actions .v-button:last-of-type a").focus();
                } else if (index == this.buttons.length - 1) {
                    e.preventDefault();
                    this.$el.querySelector(".v-modal-actions .v-button:first-of-type a").focus();
                }

                break;
            }

            case 27: // <Escape>
                this.toggle(false);
            }
        },
        toggle(state, params = {}) {
            this.buttons = params.buttons || [{label: this.$t("label.ok")}];
            this.hasDefault = this.buttons.filter(a => a.default === true).length > 0;
            this.text = params.text || null;
            this.visible = state;

            if (state) {
                this.$nextTick(() => {
                    if (this.$el.querySelector) {
                        this.$el.querySelector(`.v-modal-actions .v-button${this.hasDefault ? ".default" :
                            ":first-of-type"} a`).focus();
                    }
                });
            }

            document.body.classList[state ? "add" : "remove"]("has-overlay");
        },
    },
    beforeMount() {
        modal.event.$on("toggle", this.toggle);
    },
};
</script>

<style lang="scss" scoped>
.v-modal {
    align-items: center;
    background-color: var(--modal-background-color);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 400;

    .v-modal-content {
        border-radius: 0.2rem;
        padding: 2rem;
    }

    .v-modal-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 1.5rem;

        .v-button + .v-button {
            margin-left: 1rem;
        }
    }
}

body {
    &.dark .v-modal-content {
        background-color: var(--dark-main-background-color);
        box-shadow: var(--dark-modal-shadow);
        color: var(--dark-main-foreground-color);
    }

    &.light .v-modal-content {
        background-color: var(--light-main-background-color);
        box-shadow: var(--light-modal-shadow);
        color: var(--light-main-foreground-color);
    }
}
</style>

<style>
body.has-overlay {
    overflow: hidden;
}
</style>
