export default {
    name: "English",
    date: {
        long: "MMMM D YYYY, HH:mm:ss",
    },
    help: {
        items: {
            name: "Must start and end by an alphanumerical character, and contain alphanumerical characters, hyphens, underscores or dots.",
        },
        providers: {
            influxdb: {
                database: "Database to query sources and metrics from.",
                password: "Password to connect to the database.",
                username: "User name to connect to the database.",
            },
            kairosdb: {
                aggregators: "List of KairosDB aggregators to use for sampling.",
            },
            priority: "Priority to use in case of multiple providers exposing the same metric. The provider having the higher priority wins.",
            refresh_interval: "Interval in seconds between each scheduled refresh. Use 0 to disable.",
            rrd: {
                daemon: "Address of rrdcached daemon socket. Leave empty to disable.",
                path: "Base path on the local filesystem where the RRDtool files are stored.",
                pattern: "Matching pattern mapping sources and metrics to the filesystem structure under the base directory. Both “source” and “metric” regular expression named groups are mandatory.",
            },
            timeout: "Delay in seconds before declaring a timeout. Default to 10 seconds.",
            tls: "Allow usage of untrusted or expired SSL/TLS certificates.",
            url: "Address of the {0} HTTP API to retrieve sources and metrics from.",
        },
    },
    label: {
        admin: {
            _: "Administration panel",
            exit: "Exit administration panel",
        },
        browse: "Browse",
        catalog: "Catalog",
        cancel: "Cancel",
        close: "Close",
        collections: {
            _: "Collections",
            create: "Create collection",
            delete: [
                "Delete collection",
                "Delete collections",
            ].join("|"),
            filter: "Filter collections…",
            refresh: "Refresh collection",
        },
        columns_count: [
            "{count} column",
            "{count} columns",
        ].join("|"),
        connectors: {
            influxdb: {
                database: "Database",
                password: "Password",
                username: "User name",
            },
            kairosdb: {
                aggregators: "Aggregators",
            },
            match_pattern: "Match pattern",
            rrd: {
                daemon: "rrdcached daemon socket",
                path: "Base directory",
            },
            settings: "Connector settings",
            timeout: "Connection timeout",
            tls: "SSL/TLS",
            tls_allow_insecure: "Allow insecure connections",
            url: "Instance URL",
        },
        continue: "Continue",
        definition: "Definition",
        description: "Description",
        disable: "Disable",
        enable: "Enable",
        export: {
            png: "Save PNG…",
            summary_csv: "Export summary as CSV…",
            summary_json: "Export summary as JSON…",
        },
        goto_home: "Go to home page",
        goto_parent: "Go to parent",
        graphs: {
            _: "Graphs",
            create: "Create graph",
            delete: [
                "Delete graph",
                "Delete graphs",
            ].join("|"),
            filter: "Filter graphs…",
            fold: "Fold graph",
            hide_legend: "Hide legend",
            refresh: "Refresh graph",
            show_legend: "Show legend",
        },
        groups: {
            definition: "Group definition",
            patterns: {
                _: "Patterns",
                add: "Add pattern",
                matches: "Pattern matches",
                type: "Pattern type",
                type_glob: "Glob",
                type_regexp: "Regexp",
                type_select: "Select a pattern type…",
                type_single: "Single",
                update: "Update pattern",
                value: "Pattern value",
            },
            save: "Save group",
        },
        info: {
            _: "Information",
            build_date: "Build date",
            build_hash: "Build hash",
            compiler: "Compiler",
            connectors: "Provider connectors",
            drivers: "Back-end drivers",
            version: "Version",
            website: "Visit website",
        },
        items: {
            clone: "Clone",
            delete: "Delete",
            last_modified: "Last modified",
        },
        language: "Language",
        library: "Library",
        metricgroups: {
            _: "Metric groups",
            create: "Create group",
            delete: [
                "Delete metric group",
                "Delete metric groups",
            ].join("|"),
            edit: "Edit metric group",
            filter: "Filter metric groups…",
        },
        metrics: {
            _: "Metrics",
            filter: "Filter metrics…",
        },
        name: "Name",
        next: "Next",
        ok: "OK",
        origins: {
            _: "Origins",
            filter: "Filter origins…",
        },
        points: {
            loading: "Loading data points…",
            partial: "Partial data",
        },
        providers: {
            _: "Providers",
            add_filter: "Add filter",
            configure: "Configure",
            create: "Create provider",
            definition: "Provider definition",
            delete: [
                "Delete provider",
                "Delete providers",
            ].join("|"),
            disable: [
                "Disable provider",
                "Disable providers",
            ].join("|"),
            edit: "Edit provider",
            enable: [
                "Enable provider",
                "Enable providers",
            ].join("|"),
            filter: "Filter providers…",
            filters: {
                _: "Filters",
                action: "Action",
                pattern: "Pattern",
                target: "Target",
            },
            priority: "Priority",
            refresh_interval: "Refresh interval",
            save: "Save provider",
            type: "Type",
            type_select: "Select a provider type…",
        },
        refresh: "Refresh",
        search: "Search…",
        set_interval: "Set interval…",
        sourcegroups: {
            _: "Source groups",
            create: "Create group",
            delete: [
                "Delete source group",
                "Delete source groups",
            ].join("|"),
            edit: "Edit source group",
            filter: "Filter source groups…",
        },
        sources: {
            _: "Sources",
            filter: "Filter sources…",
        },
        system: "System",
        templates: "Templates",
        theme: {
            _: "Theme",
            dark: "Dark",
            light: "Light",
        },
        timerange: {
            custom: "Custom…",
            reset: "Reset time range",
        },
        total: "Total",
    },
    mesg: {
        action_error: "An error occurred while executing action: {0}",
        bulk_error: "An error occurred while executing bulk action",
        collections: {
            delete: [
                "You are about to delete the “{name}” collection. Are you sure?",
                "You are about to delete {count} collections. Are you sure?",
            ].join("|"),
            empty: "No collection defined",
        },
        fetch_error: "An error occurred while fetching data: {0}",
        fetch_failed: "Failed to fetch data",
        graphs: {
            delete: [
                "You are about to delete the “{name}” graph. Are you sure?",
                "You are about to delete {count} graphs. Are you sure?",
            ].join("|"),
            empty: "No graph defined",
        },
        groups: {
            patterns: {
                empty: "No pattern defined",
            },
        },
        metricgroups: {
            delete: [
                "You are about to delete the “{name}” metric group. Are you sure?",
                "You are about to delete {count} metric groups. Are you sure?",
            ].join("|"),
            empty: "No metric group defined",
        },
        matches_found: [
            "No match found",
            "{count} match found",
            "{count} matches found",
        ].join("|"),
        metrics: {
            empty: "No metric found",
        },
        origins: {
            empty: "No origin found",
        },
        pages: {
            not_found: "Requested page doesn’t exist",
        },
        providers: {
            delete: [
                "You are about to delete the “{name}” provider. Are you sure?",
                "You are about to delete {count} providers. Are you sure?",
            ].join("|"),
            disable: [
                "You are about to disable the “{name}” provider. Are you sure?",
                "You are about to disable {count} providers. Are you sure?",
            ].join("|"),
            disabled: "This provider is disabled",
            empty: "No provider defined",
            enable: [
                "You are about to enable the “{name}” provider. Are you sure?",
                "You are about to enable {count} providers. Are you sure?",
            ].join("|"),
            enabled: "This provider is enabled",
            filters: {
                empty: "No filter defined",
            },
        },
        read_only: "Instance is read-only",
        sourcegroups: {
            delete: [
                "You are about to delete the “{name}” source group. Are you sure?",
                "You are about to delete {count} source groups. Are you sure?",
            ].join("|"),
            empty: "No source group defined",
        },
        sources: {
            empty: "No source found",
        },
    },
};
