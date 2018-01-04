<template>
    <article>
        <v-message type="placeholder" v-else-if="!loading && error">
            <p>{{ $t("mesg.fetch_failed") }}</p>
        </v-message>

        <v-graph :class="{active: focusIndex === idx}"
            :attributes="Object.assign({}, collection.attributes, entry.attributes)"
            :graph="entry.graph" :key="idx" :options.sync="entry.options" v-else></v-graph>
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
            loading: true,
            ranges: ranges,
        };
    },
    methods: {
        fetchCollection() {
            this.$http.get(`/api/v1/library/collections/${this.id}`, {
                params: {
                    expand: 1,
                    fields: "id,name,entries.graph,entries.options,entries.attributes,options,attributes,parent",
                },
            }).then(response => response.json()).then((response) => {
                this.collection = response;
                this.$eventbus.$emit("sidebar-collection", response);

                this.error = false;
                this.loading = false;
            }).catch((response) => {
                this.error = true;
                this.loading = false;

                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
            });
        },
        setFocus(idx = null) {
            this.focusIndex = idx;
        },
    },
    created() {
        this.$eventbus.$on("focus-graph", this.setFocus);
    },
    beforeDestroy() {
        this.$eventbus.$off("focus-graph", this.setFocus);
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                this.fetchCollection();
            },
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
