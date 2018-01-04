<template>
    <article>
        <v-actionbar>
            <h1>
                {{ $t("label.providers._") }}
                <v-icon class="v-separator" icon="chevron-right"></v-icon>
                {{ $t(`label.providers.${id == 'add' ? 'create' : 'edit'}`) }}
            </h1>

            <template v-if="tab == 'filters' && !loading">
                <v-button icon="plus" :label="$t('label.providers.add_filter')" @click="addRule"></v-button>
            </template>
        </v-actionbar>

        <v-tabset>
            <v-tab :active="tab === null" :label="$t('label.definition')" @click="switchTab(null)"></v-tab>
            <v-tab :active="tab == 'filters'" :counter="item.filters.length" :label="$t('label.providers.filters._')"
                @click="switchTab('filters')"></v-tab>
        </v-tabset>

        <v-spinner :loading="loading" v-if="loading"></v-spinner>

        <template v-else-if="tab === null">
            <v-form>
                <h2>{{ $t("label.providers.definition") }}</h2>

                <v-form-block class="half">
                    <v-form-block>
                        <label>{{ $t("label.name") }} <v-icon icon="question-circle"
                            v-tooltip.right="$t('help.items.name')"></v-icon></label>
                        <v-input type="text" :pattern="nameRegexp" v-model="item.name"></v-input>
                    </v-form-block>

                    <v-form-block>
                        <label>{{ $t("label.description") }}</label>
                        <v-input type="textarea" v-model="item.description"></v-input>
                    </v-form-block>

                    <v-form-block>
                        <label>{{ $t("label.providers.type") }}</label>
                        <v-form-block type="row">
                            <v-select class="small" :options="providerTypes" :placeholder="$t('label.providers.type_select')"
                                v-model="item.connector"></v-select>
                            <v-button icon="cog" :disabled="!item.connector" :label="$t('label.providers.configure')"
                                @click="openSide"></v-button>
                        </v-form-block>
                    </v-form-block>

                    <v-form-block>
                        <label>{{ $t("label.providers.refresh_interval") }} <v-icon icon="question-circle"
                            v-tooltip.right="$t('help.providers.refresh_interval')"></v-icon></label>
                        <v-input class="small" type="number" v-model="item.refresh_interval"></v-input>
                    </v-form-block>

                    <v-form-block>
                        <label>{{ $t("label.providers.priority") }} <v-icon icon="question-circle"
                            v-tooltip.right="$t('help.providers.priority')"></v-icon></label>
                        <v-input class="small" type="number" v-model="item.priority"></v-input>
                    </v-form-block>

                    <v-form-block type="actions">
                        <v-button :label="$t('label.providers.save')" @click="save"></v-button>
                        <v-button class="danger" :label="$t('label.cancel')"
                            :to="{name: 'admin-list-providers'}"></v-button>
                    </v-form-block>
                </v-form-block>
            </v-form>
        </template>

        <template v-else-if="tab == 'filters'">
            <h2>{{ $t("label.providers.filters._") }}</h2>

            <v-message icon="info-circle" type="info"
                v-if="item.filters.length === 0">{{ $t("mesg.providers.filters.empty") }}</v-message>

            <v-list :draggable="true" v-model="item.filters" v-else>
                <template slot="head">
                    <v-list-tile type="heading">{{ $t("label.providers.filters.action") }}</v-list-tile>
                    <v-list-tile type="heading">{{ $t("label.providers.filters.target") }}</v-list-tile>
                    <v-list-tile type="heading" :grow="true" :span="2">{{
                        $t("label.providers.filters.pattern") }}</v-list-tile>
                </template>
                <template slot-scope="item">
                    <v-list-tile><v-input type="text" v-model="item.value.action"></v-input></v-list-tile>
                    <v-list-tile><v-input type="text" v-model="item.value.target"></v-input></v-list-tile>
                    <v-list-tile :grow="true">
                        <div class="flex">
                            <v-input type="text" v-model="item.value.pattern"></v-input>
                            <template v-if="item.value.action == 'rewrite'">
                                <v-icon icon="arrow-right"></v-icon>
                                <v-input type="text" v-model="item.value.into"></v-input>
                            </template>
                        </div>
                    </v-list-tile>
                    <v-list-tile type="actions">
                        <v-button class="v-reveal" icon="times-circle" @click="removeRule(item.index)"></v-button>
                    </v-list-tile>
                </template>
            </v-list>

            <v-form-block type="actions">
                <v-button :label="$t('label.continue')" @click="switchTab(null)"></v-button>
            </v-form-block>
        </template>

        <v-sidepane ref="sidepane" v-model="sideOpen">
            <v-connector-settings :connector="item.connector" :settings="item.settings"
                v-if="item.connector"></v-connector-settings>
        </v-sidepane>
    </article>
</template>

<script>
import {nameRegexp} from ".";
import "./connectors";

export default {
    props: {
        id: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            item: {
                name: null,
                description: null,
                filters: [],
                settings: {},
            },
            loading: true,
            nameRegexp: nameRegexp,
            sideOpen: false,
            tab: null,
        };
    },
    computed: {
        providerTypes() {
            return this.$store.state.connectors.map(a => ({label: a, value: a}));
        },
    },
    methods: {
        addRule() {
            let action = null,
                target = null;

            if (this.item.filters.length > 0) {
                let idx = this.item.filters.length - 1;
                action = this.item.filters[idx].action;
                target = this.item.filters[idx].target;
            }

            this.item.filters.push({action: action, target: target, pattern: null});

            this.$nextTick(() => {
                this.$el.querySelector(`.v-list-item:last-of-type ${this.item.filters.length > 1 ?
                    " .flex" : ""} input`).focus();

                let app = document.body.querySelector(".v-app");
                app.scrollTop = app.scrollHeight;
            });
        },
        fetchItem() {
            this.$http.get(`/api/v1/providers/${this.id}`).then(response => response.json()).then((item) => {
                this.item = item;
                this.loading = false;
            }).catch((response) => {
                this.loading = false;
                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");

                if (response.status == 404) {
                    this.$router.replace({name: "admin-list-providers"});
                }
            });
        },
        openSide() {
            this.sideOpen = true;
            this.$nextTick(() => this.$refs.sidepane.$el.querySelector("input").select());
        },
        removeRule(idx) {
            this.item.filters.splice(idx, 1);
        },
        save() {
            this.$http.put(`/api/v1/providers/${this.id != "add" ? this.id : ""}`, this.item)
                .then(() => {
                    this.$router.push({name: "admin-list-providers"});
                })
                .catch((response) => {
                    this.$notifier.enqueue(this.$t("mesg.save_error", [response.statusText]), "error");
                });
        },
        switchTab(name) {
            this.tab = name;
            this.$router.replace({hash: name});
        },
    },
    mounted() {
        if (this.id == "add") {
            this.loading = false;
        } else {
            this.fetchItem();
        }
    },
    watch: {
        "item.connector"() {
            this.item.settings = {};
        },
        "$route.hash": {
            handler(to) {
                if (to && to.startsWith("#")) {
                    this.switchTab(to.substr(1));
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-list-tile {
    /deep/ input {
        min-width: 10rem;
    }

    .flex {
        align-items: center;
        display: flex;

        > .v-input {
            flex-grow: 1;
        }

        .v-icon {
            padding: 0 0.5rem;
        }
    }
}

.v-sidepane {
    /deep/ .v-form {
        display: flex;
        flex-direction: column;
        min-height: calc(100% - 2rem);

        .v-form-actions {
            margin-bottom: 0;
        }
    }
}
</style>
