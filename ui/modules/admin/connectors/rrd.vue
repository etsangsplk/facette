<template>
    <v-form>
        <h2>{{ $t("label.connectors.settings") }}</h2>

        <v-form-block>
            <label>{{ $t("label.connectors.rrd.path") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.rrd.path')"></v-icon></label>
            <v-input type="text" v-model="settings.path"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.rrd.daemon") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.rrd.daemon')"></v-icon></label>
            <v-input type="text" v-model="settings.daemon"></v-input>
        </v-form-block>

        <v-form-block>
            <label>{{ $t("label.connectors.match_pattern") }} <v-icon icon="question-circle"
                v-tooltip.right="$t('help.providers.rrd.pattern')"></v-icon></label>
            <v-input type="text" v-model="settings.pattern"></v-input>
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
