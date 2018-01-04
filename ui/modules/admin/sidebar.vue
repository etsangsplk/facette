<template slot="sidebar">
    <nav>
        <h1>{{ $t("label.admin._") }}</h1>

        <v-button icon="arrow-left" :exact="true" :label="$t('label.goto_home')" :to="{name: 'root'}"></v-button>

        <h2>{{ $t('label.library') }}</h2>
        <v-button icon="th" :label="$t('label.collections._')"
            :to="{name: 'admin-list-collections'}"></v-button>
        <v-button icon="chart-area" :label="$t('label.graphs._')"
            :to="{name: 'admin-list-graphs'}"></v-button>
        <v-button :icon="['far', 'dot-circle']" :label="$t('label.sourcegroups._')"
            :to="{name: 'admin-list-sourcegroups'}"></v-button>
        <v-button icon="bullseye" :label="$t('label.metricgroups._')"
            :to="{name: 'admin-list-metricgroups'}"></v-button>

        <h2>{{ $t('label.catalog') }}</h2>
        <v-button :icon="['far', 'circle']" :label="$t('label.origins._')"
            :to="{name: 'admin-list-origins'}"></v-button>
        <v-button :icon="['far', 'dot-circle']" :label="$t('label.sources._')"
            :to="{name: 'admin-list-sources'}"></v-button>
        <v-button icon="bullseye" :label="$t('label.metrics._')"
            :to="{name: 'admin-list-metrics'}"></v-button>

        <h2>{{ $t('label.system') }}</h2>
        <v-button icon="plug" :label="$t('label.providers._')"
            :to="{name: 'admin-list-providers'}"></v-button>
        <v-button icon="info-circle" :label="$t('label.info._')"
            :to="{name: 'admin-info'}"></v-button>

        <template v-if="$store.state.readOnly">
            <v-spacer></v-spacer>
            <v-message icon="exclamation-circle" type="warning">{{ $t("mesg.read_only") }}</v-message>
        </template>
    </nav>
</template>

<style lang="scss" scoped>
.v-message {
    margin: 2rem 2rem 0;
}
</style>
