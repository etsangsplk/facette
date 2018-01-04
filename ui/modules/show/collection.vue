<template>
    <article>
        <v-message type="placeholder" v-if="!loading && error">
            <p>{{ $t("mesg.fetch_failed") }}</p>
        </v-message>

        <v-graph :attributes="graph.attributes" :graph="graph.id" :options.sync="graph.options"
            v-else-if="graph.id"></v-graph>
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
        index: [Number, String],
    },
    data() {
        return {
            error: false,
            graph: {},
            graphMode: false,
            loading: true,
            ranges: ranges,
        };
    },
    methods: {
        fetch() {
            if (!this.graphMode) {
                this.$http.get(`/api/v1/library/collections/${this.id}`, {
                    params: {
                        expand: 1,
                        fields: "entries.graph,entries.options,entries.attributes,attributes",
                    },
                }).then(response => response.json()).then((response) => {
                    let entry = response.entries[this.index];

                    this.graph = {
                        id: entry.graph,
                        options: entry.options || {},
                        attributes: Object.assign({}, response.attributes, entry.attributes),
                    };

                    this.error = false;
                    this.loading = false;
                }).catch((response) => {
                    this.error = true;
                    this.loading = false;

                    this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
                });
            } else {
                this.graph = {
                    id: this.id,
                    options: {},
                    attributes: null,
                };
            }
        },
    },
    beforeMount() {
        this.graphMode = this.$router.currentRoute.name == "show-graphs";
    },
    mounted() {
        this.fetch();
    },
    watch: {
        id() {
            this.fetch();
        },
        index() {
            this.fetch();
        },
    },
};
</script>
