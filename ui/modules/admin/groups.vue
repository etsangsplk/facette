<template>
    <article>
        <v-actionbar>
            <h1>
                {{ $t(`label.${type}._`) }}
                <v-icon class="v-separator" icon="chevron-right"></v-icon>
                {{ $t(`label.${type}.${id == 'add' ? 'create' : 'edit'}`) }}
            </h1>
        </v-actionbar>

        <v-tabset>
            <v-tab :active="tab == 'patterns'" :counter="item.patterns.length" :label="$t('label.groups.patterns._')"
                @click="switchTab('patterns')"></v-tab>
            <v-tab :active="tab === null" :label="$t('label.definition')" @click="switchTab(null)"></v-tab>
        </v-tabset>

        <v-spinner :loading="loading" v-if="loading"></v-spinner>

        <template v-else-if="tab == 'patterns'">
            <v-form :constrained="true">
                <h2>{{ $t("label.groups.patterns._") }}</h2>

                <v-form-block type="row">
                    <v-form-block class="small">
                        <v-form-block>
                            <label>{{ $t("label.groups.patterns.type") }}</label>
                            <v-select :options="groupPatterns" :placeholder="$t('label.groups.patterns.type_select')"
                                v-model="pattern.type"></v-select>
                        </v-form-block>

                        <v-form-block>
                            <label>{{ $t("label.groups.patterns.value") }}</label>
                            <v-input ref="patternValue" type="text"
                                :completion-handler="pattern.type ? null : completePattern"
                                :delay="pattern.type ? 0 : 200" v-model="pattern.value"></v-input>
                        </v-form-block>

                        <v-form-block type="row">
                            <v-button :disabled="!pattern.value"
                                :label="$t('label.groups.patterns.add')" @click="setPattern"
                                v-if="pattern.index === null"></v-button>
                            <template v-else>
                                <v-button :disabled="!pattern.value"
                                    :label="$t('label.groups.patterns.update')" @click="setPattern"></v-button>
                                <v-button class="danger" :label="$t('label.cancel')" @click="resetPattern"></v-button>
                            </template>
                        </v-form-block>

                        <v-spacer></v-spacer>

                        <v-button class="big" :disabled="this.item.patterns.length === 0" :label="$t('label.next')"
                            @click="switchTab(null)"></v-button>
                    </v-form-block>

                    <v-form-block :grow="true">
                        <v-message icon="info-circle" type="info"
                            v-if="item.patterns.length === 0">{{ $t("mesg.groups.patterns.empty") }}</v-message>

                        <v-list :active="pattern.index" :draggable="true" v-model="item.patterns" v-else>
                            <template slot-scope="item">
                                <v-list-tile :grow="true" @click.native="updatePattern(item.index)">
                                    {{ item.value }}
                                </v-list-tile>
                                <v-list-tile type="actions">
                                    <v-button class="v-reveal" icon="info-circle"
                                        @click="testPattern(item.value)"></v-button>
                                    <v-button class="v-reveal" icon="times-circle"
                                        @click="removePattern(item.index)"></v-button>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-form-block>
                </v-form-block>
            </v-form>
        </template>

        <template v-else-if="tab === null">
            <v-form>
                <h2>{{ $t("label.groups.definition") }}</h2>

                <v-form-block type="row">
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

                        <v-form-block type="actions">
                            <v-button :label="$t('label.groups.save')"
                                :disabled="!item.name || item.patterns.length === 0" @click="save"></v-button>
                            <v-button class="danger" :label="$t('label.cancel')"
                                :to="{name: `admin-list-${type}`}"></v-button>
                        </v-form-block>
                    </v-form-block>
                </v-form-block>
            </v-form>
        </template>

        <v-sidepane ref="sidepane" v-model="side.open">
            <h2>{{ side.data.pattern }}</h2>

            <p v-if="side.data.items.length === 0">{{ $tc("mesg.matches_found", 0) }}</p>

            <dl v-else>
                <dt>{{ $t("label.groups.patterns.matches") }}</dt>
                <dd :key="idx" v-for="(item, idx) in side.data.items">{{ item }}</dd>
                <dt>{{ $t("label.total") }}</dt>
                <dd>{{ side.data.items.length }}</dd>
            </dl>

            <v-spacer></v-spacer>

            <v-form-block type="actions">
                <v-button :label="$t('label.close')" @click="closeSide"></v-button>
            </v-form-block>
        </v-sidepane>
    </article>
</template>

<script>
import {nameRegexp} from ".";

export default {
    props: {
        id: {
            required: true,
            type: String,
        },
        type: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            item: {
                name: null,
                description: null,
                patterns: [],
            },
            loading: true,
            nameRegexp: nameRegexp,
            pattern: {
                index: null,
                type: "",
                value: null,
            },
            side: {},
            tab: "patterns",
        };
    },
    computed: {
        groupPatterns() {
            return [
                {label: this.$t("label.groups.patterns.type_single"), value: ""},
                {label: this.$t("label.groups.patterns.type_glob"), value: "glob:"},
                {label: this.$t("label.groups.patterns.type_regexp"), value: "regexp:"},
            ];
        },
    },
    methods: {
        closeSide() {
            this.side = {
                data: {
                    items: [],
                    pattern: null,
                },
                open: false,
            };
        },
        completePattern(term) {
            return this.$http.get(`/api/v1/catalog/${this.type.replace("groups", "s")}/`, {
                params: {
                    filter: `glob:*${term}*`,
                },
            }).then(response => response.json()).then(response => response.map(a => ({label: a, value: a})));
        },
        fetchItem() {
            this.$http.get(`/api/v1/library/${this.type}/${this.id}`).then(response => response.json()).then((item) => {
                this.item = item;
                this.loading = false;
            }).catch((response) => {
                this.loading = false;
                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");

                if (response.status == 404) {
                    this.$router.replace({name: `admin-list-${this.type}`});
                }
            });
        },
        removePattern(idx) {
            this.item.patterns.splice(idx, 1);
        },
        resetPattern(keepType = false) {
            let pattern = {
                index: null,
                value: null,
            };

            if (!keepType) {
                pattern.type = "";
            }

            Object.assign(this.pattern, pattern);

            this.$nextTick(() => this.$refs.patternValue.focus());
        },
        save() {
            let method = this.id == "add" ? "post" : "put";

            this.$http[method](`/api/v1/library/${this.type}/${this.id != "add" ? this.id : ""}`, this.item)
                .then(() => {
                    this.$router.push({name: `admin-list-${this.type}`});
                })
                .catch((response) => {
                    this.$notifier.enqueue(this.$t("mesg.save_error", [response.statusText]), "error");
                });
        },
        setPattern() {
            let pattern = this.pattern.type + this.pattern.value;
            if (this.pattern.index !== null) {
                this.item.patterns[this.pattern.index] = pattern;
            } else {
                this.item.patterns.push(pattern);
            }

            this.resetPattern(true);
            this.$nextTick(() => this.$refs.patternValue.focus());
        },
        switchTab(name) {
            this.tab = name;
        },
        testPattern(pattern) {
            this.$http.get(`/api/v1/catalog/${this.type.replace("groups", "s")}/`, {
                params: {
                    filter: pattern,
                },
            }).then(response => response.json()).then((response) => {
                Object.assign(this.side, {
                    data: {
                        items: response,
                        pattern: pattern,
                    },
                    open: true,
                });
            });
        },
        updatePattern(idx) {
            let type = "",
                value = this.item.patterns[idx];

            if (value.startsWith("glob:") || value.startsWith("regexp:")) {
                let idx = value.indexOf(":") + 1;
                [type, value] = [value.substring(0, idx), value.substring(idx)];
            }

            Object.assign(this.pattern, {index: idx, type, value});
            this.$nextTick(() => this.$refs.patternValue.focus(true));
        },
    },
    beforeMount() {
        this.closeSide();
    },
    mounted() {
        if (this.id == "add") {
            this.loading = false;
        } else {
            this.fetchItem();
        }
    },
};
</script>

<style lang="scss" scoped>
body {
    &.dark .v-sidepane {
        .count {
            color: var(--dark-main-foreground-color-medium);
        }
    }

    &.light .v-sidepane {
        .count {
            color: var(--light-main-foreground-color-medium);
        }
    }
}
</style>
