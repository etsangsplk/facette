<template>
    <article>
        <v-actionbar>
            <h1>
                {{ $t("label.system") }}
                <v-icon class="v-separator" icon="chevron-right"></v-icon>
                {{ $t("label.info._") }}
            </h1>

            <v-spacer></v-spacer>

            <a href="https://facette.io/" rel="external" target="_blank">{{ $t("label.info.website") }}</a>
        </v-actionbar>

        <v-spinner :loading="loading" v-if="loading"></v-spinner>

        <v-message type="placeholder" v-else-if="!loading && error">
            <p>{{ $t("mesg.fetch_failed") }}</p>
        </v-message>

        <dl v-else>
            <dt v-if="info.version">{{ $t("label.info.version") }}</dt>
            <dd v-if="info.version">{{ info.version }}</dd>

            <dt v-if="info.build_date">{{ $t("label.info.build_date") }}</dt>
            <dd v-if="info.build_date">{{ info.build_date }}</dd>

            <dt v-if="info.build_hash">{{ $t("label.info.build_hash") }}</dt>
            <dd v-if="info.build_hash">{{ info.build_hash }}</dd>

            <dt v-if="info.compiler">{{ $t("label.info.compiler") }}</dt>
            <dd v-if="info.compiler">{{ info.compiler }}</dd>

            <dt>{{ $t("label.info.drivers") }}</dt>
            <dd v-for="name in info.drivers">{{ name }}</dd>

            <dt>{{ $t("label.info.connectors") }}</dt>
            <dd v-for="name in info.connectors">{{ name }}</dd>
        </dl>
    </article>
</template>

<script>
export default {
    data() {
        return {
            error: false,
            info: {},
            loading: true,
        };
    },
    methods: {
        fetchInfo() {
            this.$http.get("/api/v1/").then(response => response.json()).then((info) => {
                this.info = info;

                this.error = false;
                this.loading = false;
            }).catch((response) => {
                this.error = true;
                this.loading = false;

                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
            });
        },
    },
    mounted() {
        this.fetchInfo();
    },
};
</script>
