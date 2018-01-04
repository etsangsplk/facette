<template>
    <v-form>
        <h2>{{ $t("label.connectors.settings") }}</h2>

        <v-form-block>
            <label>{{ $t("label.connectors.url") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.url', ['InfluxDB'])"></v-icon></label>
            <v-input type="text" v-model="settings.url"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.timeout") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.timeout')"></v-icon></label>
            <v-input class="small" type="number" v-model="settings.timeout"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.tls") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.tls')"></v-icon></label>
            <v-checkbox :label="$t('label.connectors.tls_allow_insecure')"
                v-model="settings.allow_insecure_tls"></v-checkbox>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.influxdb.database") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.influxdb.database')"></v-icon></label>
            <v-input type="text" v-model="settings.database"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.influxdb.username") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.influxdb.username')"></v-icon></label>
            <v-input class="small" type="text" v-model="settings.username"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.influxdb.password") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.influxdb.password')"></v-icon></label>
            <v-input class="small" type="password" v-model="settings.password"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.influxdb.match_type") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.influxdb.match_type')"></v-icon></label>
            <input name="match-type" type="radio" value="pattern" v-model="settings.match_type">
            <label>{{ $t("label.connectors.influxdb.match_pattern") }}</label>
            <input name="match-type" type="radio" value="mapping" v-model="settings.match_type">
            <label>{{ $t("label.connectors.influxdb.match_mapping") }}</label>
        </v-form-block>

        <v-spacer></v-spacer>

        <v-form-block type="actions">
            <v-button :label="$t('label.continue')" @click="$parent.$parent.close"></v-button>
        </v-form-block>
    </v-form>
</template>

<script>
export default {
    props: {
        settings: {
            required: true,
            type: Object,
        },
    },
};
</script>
