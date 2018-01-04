<template>
    <v-app :theme="theme">
        <v-modal></v-modal>

        <v-notifier></v-notifier>

        <template v-if="!isFullscreen">
            <v-toolbar>
                <v-button icon="bars" @click.stop="toggleSidebar(); triggerResize()"></v-button>
                <v-spacer></v-spacer>
                <v-input icon="search" type="search" :placeholder="$t('label.search')" v-model="search.term"></v-input>
                <v-spacer></v-spacer>
                <v-button dropdown-placement="left" icon="ellipsis-v">
                    <template slot="dropdown">
                        <v-button icon="cog" :label="$t('label.admin._')" :to="{name: 'admin-root'}"
                            v-if="!inAdmin"></v-button>
                        <v-button icon="sign-out-alt" :label="$t('label.admin.exit')" :to="{name: 'root'}"
                            v-else></v-button>
                        <v-divider></v-divider>
                        <v-button icon="paint-brush" :label="$t('label.theme._')">
                            <template slot="dropdown">
                                <v-button :icon="theme == 'light' ? 'check' : ''"
                                    :label="$t('label.theme.light')" @click="setTheme('light')"></v-button>
                                <v-button :icon="theme == 'dark' ? 'check' : ''"
                                    :label="$t('label.theme.dark')" @click="setTheme('dark')"></v-button>
                            </template>
                            <v-icon class="v-caret" icon="caret-right"></v-icon>
                        </v-button>
                        <v-button icon="language" :label="$t('label.language')">
                            <template slot="dropdown">
                                <v-button :icon="$store.state.locale == locale ? 'check' : ''" :key="locale"
                                    :label="$t('name', locale)" @click="setLocale(locale)"
                                    v-for="locale in locales"></v-button>
                            </template>
                            <v-icon class="v-caret" icon="caret-right"></v-icon>
                        </v-button>
                        <v-button icon="" label="pref"></v-button>
                    </template>
                </v-button>
            </v-toolbar>

            <v-sidebar v-model="$store.state.sidebar">
                <router-view name="sidebar"></router-view>
            </v-sidebar>
        </template>

        <v-content :fullscreen="isFullscreen">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import {mapMutations} from "vuex";

export default {
    data() {
        return {
            locales: [],
            search: {
                term: null,
            },
            storeUnwatch: null,
        };
    },
    computed: {
        inAdmin() {
            return this.$route.name.startsWith("admin-");
        },
        isFullscreen() {
            return this.$route.name.startsWith("show-");
        },
        theme() {
            return this.$store.state.theme;
        },
    },
    methods: {
        triggerResize() {
            window.dispatchEvent(new Event("resize"));
        },
        ...mapMutations([
            "setLocale",
            "setTheme",
            "toggleSidebar",
        ]),
    },
    beforeCreate() {
        this.$store.dispatch("init");

        this.$i18n.locale = this.$store.state.locale;
        this.storeUnwatch = this.$store.watch(state => state.locale, (to) => { this.$i18n.locale = to; });
    },
    beforeMount() {
        this.locales = Object.keys(this.$i18n.messages).sort();
    },
    beforeDestroy() {
        if (this.storeUnwatch) {
            this.storeUnwatch();
        }
    },
};
</script>

<style>
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Regular'),
         local('Roboto-Regular'),
         url('~typeface-roboto/files/roboto-latin-400.woff2') format('woff2'),
         url('~typeface-roboto/files/roboto-latin-400.woff') format('woff');
}

@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'),
         local('Roboto-Medium'),
         url('~typeface-roboto/files/roboto-latin-500.woff2') format('woff2'),
         url('~typeface-roboto/files/roboto-latin-500.woff') format('woff');
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html,
body {
    height: 100%;
}

html {
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
}

body {
    line-height: 1.5rem;
}

a {
    color: inherit;
}

button,
input,
select,
textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
}

::placeholder {
    opacity: var(--placeholder-opacity);
}
</style>
