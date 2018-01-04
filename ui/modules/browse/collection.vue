<template>
    <article>
        <v-actionbar :side="true" v-show="!loading && collection.entries.length > 0">
            <v-button dropdown-placement="right" icon="sync">
                <template slot="dropdown">
                    <v-button :label="$t(`label.${graphMode ? 'graphs' : 'collections'}.refresh`)"
                        @click="refresh"></v-button>
                    <v-divider></v-divider>
                    <v-button :label="$t('label.set_interval')"></v-button>
                </template>
            </v-button>
            <v-button dropdown-placement="right" :icon="['far', 'clock']">
                <template slot="dropdown">
                    <v-button icon="history" :label="$t('label.timerange.reset')"
                        @click="setRange(null)"></v-button>
                    <v-divider></v-divider>
                    <v-button :icon="globalRange == `-${range}` ? 'check' : ''" :key="idx" :label="range"
                        v-for="(range, idx) in ranges" @click="setRange(`-${range}`)"></v-button>
                    <v-divider></v-divider>
                    <v-button :icon="['far', 'calendar-alt']" :label="$t('label.timerange.custom')"
                        @click="setRange('custom')"></v-button>
                </template>
            </v-button>
            <v-button dropdown-placement="right" icon="columns" v-if="!graphMode">
                <template slot="dropdown">
                    <v-button icon="" :label="$tc('label.columns_count', 1, {count: 1})"></v-button>
                    <v-button icon="" :label="$tc('label.columns_count', 2, {count: 2})"></v-button>
                    <v-button icon="" :label="$tc('label.columns_count', 3, {count: 3})"></v-button>
                </template>
            </v-button>
        </v-actionbar>

        <v-spinner :loading="loading" v-if="loading"></v-spinner>

        <v-message type="placeholder" v-else-if="!loading && error">
            <p>{{ $t("mesg.fetch_failed") }}</p>
        </v-message>

        <v-message type="placeholder" v-else-if="!loading && !error && collection.entries.length === 0">
            <p>{{ $t("mesg.graphs.empty") }}</p>
        </v-message>

        <template v-else>
            <template v-for="(entry, idx) in collection.entries">
                <v-graph :class="{active: focusIndex === idx}"
                    :attributes="Object.assign({}, collection.attributes, entry.attributes)"
                    :graph="entry.graph" :graph-index="idx" :key="idx" :options.sync="entry.options"></v-graph>
            </template>
        </template>
    </article>
</template>

<script>
import {ranges} from "../../components/graph/";

export default {
    props: {
        id: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            collection: {},
            error: false,
            focusIndex: null,
            globalRange: null,
            graphMode: false,
            loading: true,
            ranges: ranges,
        };
    },
    methods: {
        fetch() {
            this.$http.get(`/api/v1/library/${this.graphMode ? "graphs" : "collections"}/${this.id}`, {
                params: {
                    expand: 1,
                    fields: "id,name,entries.graph,entries.options,entries.attributes,options,attributes,parent",
                },
            }).then(response => response.json()).then((response) => {
                if (this.graphMode) {
                    this.collection = {
                        id: this.id,
                        name: response.name,
                        entries: [{
                            graph: response.id,
                            options: response.options,
                        }],
                        options: {
                            title: response.name || null,
                        },
                    };
                } else {
                    this.collection = response;
                }

                this.$eventbus.$emit("sidebar-collection", this.collection);

                this.error = false;
                this.loading = false;
            }).catch((response) => {
                this.error = true;
                this.loading = false;

                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
            });
        },
        refresh() {
            this.$eventbus.$emit("graph-action", "update");
        },
        setFocus(idx = null) {
            this.focusIndex = idx;
        },
        setRange(range) {
            if (range == "custom") {
                // TODO: handle custom prompt
                return;
            }

            this.globalRange = range;
            this.$eventbus.$emit("graph-action", "setRange", range);
        },
    },
    created() {
        this.$eventbus.$on("focus-graph", this.setFocus);
    },
    beforeMount() {
        this.graphMode = this.$router.currentRoute.name == "browse-graphs";
    },
    mounted() {
        this.fetch();
    },
    beforeDestroy() {
        this.$eventbus.$off("focus-graph", this.setFocus);
    },
    watch: {
        id() {
            this.fetch();
        },
        loading(to) {
            // Handle initial scroll to route hash
            if (!to && this.$route.hash && this.$route.hash.startsWith("#")) {
                this.$nextTick(() => {
                    let el = document.getElementById(this.$route.hash.substr(1));
                    if (el) {
                        el.scrollIntoView();
                    }
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-anchor {
    transform: translateY(-5.5rem);
    display: block;
}

.v-graph {
    margin-bottom: 2rem;

    &:last-of-type {
        margin-bottom: 0;
    }
}
</style>
