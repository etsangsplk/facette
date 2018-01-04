<template>
    <div class="v-notifier" :class="{active: current.text, [type]: true}">
        <v-icon :icon="current.icon" v-if="current.icon"></v-icon>
        <div class="v-notifier-text">{{ current.text }}</div>
        <v-spacer></v-spacer>
        <v-button icon="times" @click="dequeue"></v-button>

        <div class="v-notifier-timer"></div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import notifier from ".";

export default {
    name: "v-notifier",
    data() {
        return {
            current: {},
            dequeueDebounce: null,
            queue: [],
            timer: null,
            type: null,
        };
    },
    methods: {
        dequeue() {
            this.current = this.queue.pop() || {};
            if (this.current.type) {
                this.type = this.current.type;
            }

            if (isEmpty(this.current)) {
                return;
            }

            // Re-arm CSS animation
            requestAnimationFrame(() => {
                this.timer.style.display = "none";
                requestAnimationFrame(() => {
                    this.timer.style.display = "unset";
                });
            });

            this.dequeueDebounce();
        },
        enqueue(text, type = "info", icon = null) {
            if (icon === null) {
                switch (type) {
                case "error":
                    icon = "times-circle";
                    break;

                case "warning":
                    icon = "exclamation-circle";
                    break;
                }
            }

            // Re-enqueue current message in the cue
            if (!isEmpty(this.current)) {
                this.queue.push(this.current);
            }

            // Remove preexisting message duplicate if found
            let mesg = {text, type, icon},
                idx = this.queue.map(a => Object.values(a).join("\x01")).indexOf(Object.values(mesg).join("\x01"));

            if (idx != -1) {
                this.queue.splice(idx, 1);
            }

            this.queue.push(mesg);

            this.dequeue();
        },
    },
    beforeMount() {
        notifier.event.$on("enqueue", this.enqueue);
    },
    mounted() {
        this.timer = this.$el.querySelector(".v-notifier-timer");
        this.dequeueDebounce = debounce(() => this.dequeue(), 10000);
    },
};
</script>

<style lang="scss" scoped>
@keyframes shrink {
    0 {
        width: 100%;
    }

    100% {
        width: 0;
    }
}

.v-notifier {
    align-items: center;
    color: var(--notifier-foreground-color);
    display: flex;
    height: 3.5rem;
    left: 0;
    line-height: 3.5rem;
    padding: 0 2rem;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateY(-100%);
    transition: transform 0.35s ease-in-out;
    z-index: 250;

    &.active {
        transform: translateY(0);
    }

    &.error {
        background-color: var(--color-red);
    }

    &.warning {
        background-color: var(--color-yellow);
    }

    &.success {
        background-color: var(--color-green);
    }

    &.info {
        background-color: var(--color-blue);
    }

    .v-icon {
        font-size: 1.35rem;
        margin-right: 0.65rem;
    }

    .v-button /deep/ > a {
        padding: 0.25rem;
    }

    .v-notifier-timer {
        animation: shrink 10s linear;
        background-color: var(--notifier-highlight-color);
        bottom: 0;
        display: block;
        height: 0.25rem;
        left: 0;
        position: absolute;
        transition: width 0;
        width: 100%;
        will-change: width;
    }
}

body {
    &.dark .v-notifier,
    &.light .v-notifier {
        .v-button {
            /deep/ > a {
                background-color: transparent;
            }

            &:hover /deep/ > a,
            &.focus /deep/ > a,
            /deep/ > a:focus {
                background-color: var(--notifier-highlight-color);
            }
        }
    }
}
</style>
