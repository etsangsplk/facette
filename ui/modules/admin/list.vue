<template>
    <article>
        <v-actionbar>
            <h1>
                {{ $t(`label.${type == 'providers' ? 'system' : section}`) }}
                <v-icon class="v-separator" icon="chevron-right"></v-icon>
                {{ $t(`label.${type}._`) }}
            </h1>

            <template v-if="section != 'catalog' && !loading && !error">
                <v-button icon="plus" :label="$t(`label.${type}.create`)"
                    :to="{name: `admin-edit-${type}`, params: {id: 'add'}}"></v-button>
                <v-button icon="sync" :icon-options="{spin: refresh, speed: '2x'}" :label="$t('label.refresh')"
                    :disabled="refresh" @click="fetchItems(true)"></v-button>
                <v-button icon="play" :label="$tc('label.enable')"
                    :disabled="selected.length === 0 || selectedStates.length == 1 &&  selectedStates[0] === true"
                    @click="toggleProviders(selected, true)" v-if="type == 'providers'"></v-button>
                <v-button icon="stop" :label="$tc('label.disable')"
                    :disabled="selected.length === 0 || selectedStates.length == 1 &&  selectedStates[0] === false"
                    @click="toggleProviders(selected, false)" v-if="type == 'providers'"></v-button>
                <v-button icon="trash" :label="$t('label.items.delete')" :disabled="selected.length === 0"
                    @click="deleteItems(selected)"></v-button>
            </template>
            <template v-else>
                <v-button icon="sync" :icon-options="{spin: refresh, speed: '2x'}" :label="$t('label.refresh')"
                    :disabled="refresh" @click="fetchItems(true)"></v-button>
            </template>

            <v-spacer></v-spacer>

            <v-input class="filter" icon="filter" type="search" :delay="200" :placeholder="$t(`label.${type}.filter`)"
                v-model="filter" @change="fetchItems"></v-input>
        </v-actionbar>

        <v-tabset v-if="type == 'collections' || type == 'graphs'">
            <v-tab :active="!$router.currentRoute.query.kind" :label="$t(`label.${type}._`)"
                :to="{query: null}"></v-tab>
            <v-tab :active="$router.currentRoute.query.kind == 'template'" :label="$t('label.templates')"
                :to="{query: {kind: 'template'}}"></v-tab>
        </v-tabset>

        <v-spinner :loading="loading" v-if="loading"></v-spinner>

        <v-message type="placeholder" v-else-if="!loading && error">
            <p>{{ $t("mesg.fetch_failed") }}</p>
        </v-message>

        <v-message type="placeholder" v-else-if="!loading && !error && items.length === 0">
            <p v-if="filter">{{ $tc("mesg.matches_found", 0) }}</p>
            <p v-else>{{ $t(`mesg.${type}.empty`) }}</p>
        </v-message>

        <template v-else>
            <v-list :selectable="section != 'catalog'" select-key="id" @selected="handleSelection" v-model="items">
                <template slot="head">
                    <v-list-tile type="heading" :grow="true">
                        <span class="label" :class="{sortable: sortable}" @click="sortable && toggleSort('name')">
                            <template v-if="$router.currentRoute.query.kind == 'template'">
                                {{ $t('label.templates') }}
                            </template>
                            <template v-else>
                                {{ $t(`label.${type}._`) }}
                            </template>
                            <v-icon class="sorting" :icon="`chevron-${sort == '-name' ? 'down' : 'up'}`"
                                v-if="sortable && (sort == 'name' || sort == '-name')"></v-icon>
                        </span>
                    </v-list-tile>
                    <v-list-tile type="heading" v-if="section != 'catalog'">
                        <span class="label" :class="{sortable: sortable}" @click="sortable && toggleSort('modified')">
                            {{ $t(`label.items.last_modified`) }}
                            <v-icon class="sorting" :icon="`chevron-${sort == '-modified' ? 'down' : 'up'}`"
                                v-if="sortable && (sort == 'modified' || sort == '-modified')"></v-icon>
                        </span>
                    </v-list-tile>
                    <v-list-tile type="heading" align="right" :span="2">
                    </v-list-tile>
                </template>
                <template slot-scope="item">
                    <v-list-tile :grow="true">
                        <div class="name">
                            <router-link :to="{name: `admin-edit-${type}`, params: {id: item.value.id}}"
                                v-if="section != 'catalog'">{{ item.value.name }}</router-link>
                            <span v-else>{{ item.value.name }}</span>
                            <v-icon class="state-enabled" icon="check-circle"
                                v-tooltip.bottom="$t('mesg.providers.enabled')"
                                v-if="type == 'providers' && item.value.enabled"></v-icon>
                            <v-icon class="state-disabled" icon="stop-circle"
                                v-tooltip.bottom="$t('mesg.providers.disabled')"
                                v-else-if="type == 'providers'"></v-icon>
                        </div>
                    </v-list-tile>
                    <v-list-tile v-if="section != 'catalog'">
                        {{ item.value.modified|date($t('date.long')) }}
                    </v-list-tile>
                    <v-list-tile type="actions">
                        <v-button class="v-reveal" icon="info-circle" @click="fetchInfo(item.value)"
                            v-if="section == 'catalog'"></v-button>
                        <v-button dropdown-placement="left" icon="ellipsis-v" v-else>
                            <template slot="dropdown">
                                <v-button icon="clone" :label="$t('label.items.clone')"></v-button>
                                <v-button icon="trash" :label="$t('label.items.delete')"
                                    @click="deleteItems([item.value])"></v-button>
                                <v-divider v-if="type == 'providers'"></v-divider>
                                <v-button icon="play" :label="$t('label.enable')"
                                    @click="toggleProviders([item.value], true)"
                                    v-if="type == 'providers' && !item.value.enabled"></v-button>
                                <v-button icon="stop" :label="$t('label.disable')"
                                    @click="toggleProviders([item.value], false)"
                                    v-if="type == 'providers' && item.value.enabled"></v-button>
                            </template>
                        </v-button>
                    </v-list-tile>
                </template>
            </v-list>

            <v-paging :handler="switchPage" :page="page" :page-size="limit" :total="itemsTotal"></v-paging>
        </template>

        <v-sidepane ref="sidepane" v-model="side.open" v-if="section == 'catalog'">
            <v-spinner :loading="true" v-if="side.open && Object.keys(side.data).length === 0"></v-spinner>

            <template v-else>
                <h2>{{ side.data.name }}</h2>

                <dl>
                    <dt v-if="side.data.origins">{{ $t("label.origins._") }}</dt>
                    <dd v-for="origin in side.data.origins">{{ origin }}</dd>
                    <dt v-if="side.data.sources">{{ $t("label.sources._") }}</dt>
                    <dd v-for="source in side.data.sources">{{ source }}</dd>
                    <dt v-if="side.data.providers">{{ $t("label.providers._") }}</dt>
                    <dd v-for="provider in side.data.providers">{{ provider }}</dd>
                </dl>
            </template>

            <v-spacer></v-spacer>

            <v-form-block type="actions">
                <v-button :label="$t('label.close')" @click="closeInfo"></v-button>
            </v-form-block>
        </v-sidepane>
    </article>
</template>

<script>
import uniq from "lodash/uniq";
import {setQueryParam} from "../../router";

export default {
    props: {
        section: String,
        type: String,
    },
    data() {
        return {
            error: false,
            filter: null,
            items: [],
            itemsTotal: 0,
            limit: 20,
            loading: true,
            page: 1,
            refresh: false,
            selected: [],
            selectedStates: {},
            side: {
                data: {},
                open: false,
            },
            sort: "name",
        };
    },
    computed: {
        sortable() {
            return this.section != "catalog";
        },
    },
    methods: {
        closeInfo() {
            this.side = {
                data: {},
                open: false,
            };
        },
        deleteItems(items) {
            this.$modal.show({
                buttons: [
                    {
                        label: this.$t("label.cancel"),
                    },
                    {
                        label: this.$tc(`label.${this.type}.delete`, items.length),
                        class: "danger",
                        default: true,
                        handler: () => {
                            this.$http.post("/api/v1/bulk", items.map(a => ({
                                endpoint: `${this.section ? `/${this.section}` : ""}/${this.type}/${a.id}`,
                                method: "DELETE",
                            }))).then(response => response.json()).then((responses) => {
                                if (responses.filter(a => a.status >= 400).length > 0) {
                                    this.$notifier.enqueue(this.$t("mesg.bulk_error"), "error");
                                }

                                this.fetchItems();
                            }).catch((response) => {
                                this.$notifier.enqueue(this.$t("mesg.action_error", [response.statusText]), "error");
                            });
                        },
                    },
                ],
                text: this.$tc(`mesg.${this.type}.delete`, items.length,
                    items.length > 1 ? {count: items.length} : items[0]),
            });
        },
        fetchInfo(item) {
            this.$http.get(`/api/v1${this.section ? `/${this.section}` : ""}/${this.type}/${item.name}`)
                .then(response => response.json()).then((response) => {
                    this.side.data = response;
                }).catch((response) => {
                    this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
                });

            this.side.open = true;
            this.$nextTick(() => this.$refs.sidepane.$el.querySelector(".v-button > a").focus());
        },
        fetchItems(refresh = false) {
            if (refresh) {
                this.refresh = true;
            }

            let params = {
                fields: "id,name,modified,enabled",
                limit: this.limit,
                offset: (this.page - 1) * this.limit,
            };

            if (this.filter) {
                params.filter = `glob:*${this.filter}*`;
            }

            if (this.type == "collections" || this.type == "graphs") {
                params.kind = this.$router.currentRoute.query.kind || "raw";
            }

            if (this.sort) {
                params.sort = this.sort;
            }

            this.$http.get(`/api/v1${this.section ? `/${this.section}` : ""}/${this.type}/`, {
                params: params,
            }).then((response) => {
                this.itemsTotal = parseInt(response.headers.get("X-Total-Records"), 10);
                return response.json();
            }).then((items) => {
                if (this.section == "catalog") {
                    this.items = items.map(a => ({name: a}));
                } else {
                    this.items = items;
                }

                this.error = false;
                this.loading = false;
                setTimeout(() => { this.refresh = false; }, 500);
            }).catch((response) => {
                this.error = true;
                this.loading = false;
                this.refresh = false;

                this.$notifier.enqueue(this.$t("mesg.fetch_error", [response.statusText]), "error");
            });
        },
        handleSelection(selected) {
            this.selected = selected;
            this.selectedStates = uniq(this.selected.map(item => item.enabled));
        },
        switchPage(page) {
            this.page = page;
        },
        toggleProviders(items, state) {
            this.$modal.show({
                buttons: [
                    {
                        label: this.$t("label.cancel"),
                    },
                    {
                        label: this.$tc(`label.providers.${state ? "enable" : "disable"}`, items.length),
                        class: "danger",
                        default: true,
                        handler: () => {
                            this.$http.post("/api/v1/bulk", items.map(a => ({
                                endpoint: `/providers/${a.id}`,
                                method: "PATCH",
                                data: {
                                    enabled: state,
                                },
                            }))).then(response => response.json()).then((responses) => {
                                if (responses.filter(a => a.status >= 400).length > 0) {
                                    this.$notifier.enqueue(this.$t("mesg.bulk_error"), "error");
                                }

                                this.fetchItems();
                            }).catch((response) => {
                                this.$notifier.enqueue(this.$t("mesg.action_error", [response.statusText]), "error");
                            });
                        },
                    },
                ],
                text: this.$tc(`mesg.providers.${state ? "enable" : "disable"}`, items.length,
                    items.length > 1 ? {count: items.length} : items[0]),
            });
        },
        toggleSort(key) {
            let desc = this.sort.startsWith("-"),
                sort = desc ? this.sort.substr(1) : this.sort;

            this.sort = key == sort && !desc ? `-${key}` : key;
        },
    },
    watch: {
        filter() {
            this.page = 1;
            setQueryParam(this.$router, "filter", this.filter, Boolean(this.filter));
        },
        page() {
            setQueryParam(this.$router, "page", this.page, this.page > 1);
        },
        sort() {
            setQueryParam(this.$router, "sort", this.sort, this.sort != "name");
        },
        type() {
            this.loading = true;

            if (this.filter) {
                this.filter = null;
            } else {
                this.fetchItems();
            }
        },
        "$route.query": {
            handler(to, from) {
                let props = {
                    filter: to.filter || null,
                    page: parseInt(to.page, 10) || 1,
                    sort: to.sort || "name",
                };

                if (from && to.kind !== from.kind) {
                    props.loading = true;
                    props.filter = null;
                }

                Object.assign(this, props);

                this.fetchItems();
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.name {
    align-items: center;
    display: flex;

    a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .state-enabled {
        color: var(--color-green);
    }

    .v-icon {
        margin-left: 0.65rem;
    }
}

.v-actionbar .filter {
    transform: translateX(1rem);
}

.v-list-heading .label.sortable {
    cursor: pointer;
    display: inline-flex;

    .sorting {
        font-size: 0.8rem;
        margin-left: 0.35rem;
    }
}

body {
    &.dark .state-disabled {
        color: var(--dark-main-foreground-color-medium);
    }

    &.light .state-disabled {
        color: var(--light-main-foreground-color-medium);
    }
}
</style>
