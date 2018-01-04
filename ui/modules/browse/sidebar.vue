<template slot="sidebar">
    <nav>
        <v-spinner :loading="loading" v-if="loading"></v-spinner>

        <v-message type="placeholder" v-else-if="!loading && error">
            <p>{{ $t("mesg.fetch_failed") }}</p>
        </v-message>

        <template v-else>
            <h2>{{ (collection.options ? collection.options.title : collection.name) || $t("label.browse") }}</h2>

            <v-button icon="arrow-left" :label="$t('label.goto_parent')"
                :to="{name: 'browse-collections', params: {id: collection.parent}}"
                v-if="collection.parent"></v-button>
            <v-button icon="arrow-left" :label="$t('label.goto_home')"
                :to="{name: 'browse-root'}"
                v-else-if="id"></v-button>
            <v-button icon="folder" :key="item.id" :label="item.label"
                :to="{name: 'browse-collections', params: {id: item.id}}"
                v-for="item in collections"></v-button>
            <v-button :key="item.graph" :label="item.options.title" :to="{params: {id: collection.id},
                hash: `#graph${idx}`}" @mouseenter.native="emitFocus(idx)" @mouseleave.native="emitFocus(null)"
                v-for="(item, idx) in collection.entries"></v-button>
        </template>
    </nav>
</template>

<script>
export default {
    props: {
        id: String,
    },
    data() {
        return {
            collection: {},
            collections: [],
            error: false,
            loading: true,
        };
    },
    methods: {
        emitFocus(idx) {
            this.$eventbus.$emit("focus-graph", idx);
        },
        fetchCollections() {
            let params = {};
            if (this.id) {
                params.parent = this.id;
            }

            this.loading = true;

            this.$http.get("/api/v1/library/collections/tree", {
                params: params,
            }).then(response => response.json()).then((response) => {
                this.error = false;
                this.loading = false;
                this.collections = response;
            }).catch((response) => {
                this.error = true;
                this.loading = false;
                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
            });
        },
        setCollection(collection) {
            this.collection = collection;
        },
    },
    created() {
        this.$eventbus.$on("sidebar-collection", this.setCollection);
    },
    beforeDestroy() {
        this.$eventbus.$off("sidebar-collection", this.setCollection);
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                this.fetchCollections();
            },
        },
    },
};
</script>
