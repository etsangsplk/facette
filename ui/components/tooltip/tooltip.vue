<script>
import Vue from "vue";
import VueTooltip from "v-tooltip";

Vue.use(VueTooltip, {
    defaultClass: "v-tooltip",
});
</script>

<style lang="scss">
.v-tooltip {
    border-radius: 0.2rem;
    font-size: 0.9rem;
    padding: 0.25rem 0.75rem;
    pointer-events: none;
    position: relative;
    max-width: 30%;
    z-index: 200;

    &::before {
        border: 0.5rem solid transparent;
        content: '';
        height: 0;
        position: absolute;
        width: 0;
    }

    &[x-placement="bottom"]::before {
        transform: translateX(-0.5rem);
        left: 50%;
        bottom: 100%;
    }

    &[x-placement="right"] {
        margin-left: 0.5rem;
    }

    &[x-placement="right"]::before {
        right: 100%;
        top: 50%;
        transform: translateY(-0.5rem);
    }
}

body {
    &.dark .v-tooltip {
        background-color: var(--dark-tooltip-background-color);
        color: var(--dark-tooltip-foreground-color);

        &[x-placement="bottom"]::before {
            border-bottom-color: var(--dark-tooltip-background-color);
        }

        &[x-placement="right"]::before {
            border-right-color: var(--dark-tooltip-background-color);
        }
    }

    &.light .v-tooltip {
        background-color: var(--light-tooltip-background-color);
        color: var(--light-tooltip-foreground-color);

        &[x-placement="bottom"]::before {
            border-bottom-color: var(--light-tooltip-background-color);
        }

        &[x-placement="right"]::before {
            border-right-color: var(--light-tooltip-background-color);
        }
    }
}
</style>
