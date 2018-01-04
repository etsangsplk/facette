<template>
    <v-form>
        <h2>{{ $t("label.connectors.settings") }}</h2>

        <v-form-block>
            <label>{{ $t("label.connectors.url") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.url', ['Facette'])"></v-icon></label>
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
