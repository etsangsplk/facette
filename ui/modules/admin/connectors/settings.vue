<template>
    <component :is="connector" :settings="settings"></component>
</template>

<script>
export default {
    name: "v-connector-settings",
    props: {
        connector: {
            required: true,
            type: String,
        },
        settings: {
            required: true,
            type: Object,
        },
    },
    components: {
        facette:  () => import("./facette.vue"),
        graphite: () => import("./graphite.vue"),
        influxdb: () => import("./influxdb.vue"),
        kairosdb: () => import("./kairosdb.vue"),
        rrd:      () => import("./rrd.vue"),
    },
};
</script>
