<template>
    <div class="v-graph-menu">
        <v-button icon="pencil-alt"></v-button>
        <v-divider></v-divider>
        <v-button icon="sync" @click="$parent.exec('update')"></v-button>
        <v-button dropdown-placement="left" :icon="['far', 'clock']">
            <template slot="dropdown">
                <v-button icon="history" :label="$t('label.timerange.reset')"
                    @click="$parent.exec('setRange', null)"></v-button>
                <v-divider></v-divider>
                <v-button :icon="$parent.options.range == `-${range}` ? 'check' : ''" :key="idx" :label="range"
                    v-for="(range, idx) in ranges" @click="$parent.exec('setRange', `-${range}`)"></v-button>
                <v-divider></v-divider>
                <v-button :icon="['far', 'calendar-alt']" :label="$t('label.timerange.custom')"
                    @click="$parent.exec('setRange', 'custom')"></v-button>
            </template>
        </v-button>
        <v-button icon="arrows-alt-v" @click="$parent.exec('propagate')"></v-button>
        <v-button icon="search-minus" @click="$parent.exec('zoom', false)"></v-button>
        <v-button icon="search-plus" @click="$parent.exec('zoom', true)"></v-button>
        <v-divider></v-divider>
        <v-button dropdown-placement="left" icon="download">
            <template slot="dropdown">
                <v-button :label="$t('label.export.png')"
                    @click="$parent.exec('export', $event, 'png')"></v-button>
                <v-divider></v-divider>
                <v-button :label="$t('label.export.summary_csv')"
                    @click="$parent.exec('export', $event, 'summary_csv')"></v-button>
                <v-button :label="$t('label.export.summary_json')"
                    @click="$parent.exec('export', $event, 'summary_json')"></v-button>
            </template>
        </v-button>
        <v-button icon="window-maximize" :to="{name: 'show-collections',
            params: {id: $router.currentRoute.params.id, index: $parent.graphIndex}}"
            v-if="$router.currentRoute.name == 'browse-collections'"></v-button>
        <v-button icon="window-maximize" :to="{name: 'show-graphs',
            params: {id: $router.currentRoute.params.id}}" v-else></v-button>
    </div>
</template>

<script>
import {ranges} from ".";

export default {
    name: "v-graph-menu",
    props: {
        graphIndex: Number,
    },
    data() {
        return {
            ranges: ranges,
        };
    },
};
</script>

<style lang="scss" scoped>
.v-graph-menu {
    border-bottom-left-radius: 0.2rem;
    display: flex;
    padding: 0 0 0.9rem 0.9rem;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 20;

    > .v-button /deep/ > a {
        height: 1.5rem;
        justify-content: center;
        line-height: 1.5rem;
        margin: 0 0.25rem;
        padding: 0;
        width: 1.5rem;
    }

    > .v-divider {
        display: inline-block;
        height: 1.5rem;
        opacity: 0.35;
        margin: 0 0.25rem;
        width: 1px;
    }
}

body {
    &.dark .v-graph-menu {
        background-color: var(--dark-main-foreground-color-light);
    }

    &.light .v-graph-menu {
        background-color: var(--light-main-foreground-color-light);
    }
}
</style>
