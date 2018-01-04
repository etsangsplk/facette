export default {
    name: "Français",
    label: {
        admin: {
            _: "Panneau d’administration",
            exit: "Quitter le panneau d’administration",
        },
        browse: "Parcourir",
        catalog: "Catalogue",
        cancel: "Annuler",
        close: "Fermer",
        collections: {
            _: "Collections",
            create: "Créer une collection",
            delete: [
                "Supprimer la collection",
                "Supprimer les collections",
            ].join("|"),
            filter: "Filtrer les collections…",
            refresh: "Rafraîchir la collection",
        },
        columns_count: [
            "{count} colonne",
            "{count} colonnes",
        ].join("|"),
        disable: "Désactiver",
        enable: "Activer",
        export: {
            png: "Sauvegarder le PNG…",
            summary_csv: "Exporter le résumé en CSV…",
            summary_json: "Exporter le résumé en JSON…",
        },
        goto_home: "Aller à la page d’accueil",
        goto_parent: "Aller au parent",
        graphs: {
            _: "Graphiques",
            create: "Créer un graphique",
            delete: [
                "Supprimer le graphique",
                "Supprimer les graphiques",
            ].join("|"),
            filter: "Filtrer les graphiques…",
            fold: "Replier le graph",
            hide_legend: "Masquer la légende",
            refresh: "Rafraîchir le graphique",
            show_legend: "Afficher la légende",
        },
        info: {
            _: "Informations",
            build_date: "Date de compilation",
            build_hash: "Condensé de compilation",
            compiler: "Compilateur",
            connectors: "Connecteurs",
            drivers: "Pilotes de stockage",
            version: "Version",
            website: "Visiter le site web",
        },
        items: {
            clone: "Cloner",
            delete: "Supprimer",
            last_modified: "Dernière modification",
        },
        language: "Langue",
        library: "Librarie",
        metricgroups: {
            _: "Groupes de métriques",
            create: "Créer un groupe",
            delete: [
                "Supprimer le groupe de métriques",
                "Supprimer les groupes de métriques",
            ].join("|"),
            filter: "Filtrer les groupes de métriques…",
        },
        metrics: {
            _: "Métriques",
            filter: "Filtrer les métriques…",
        },
        ok: "OK",
        origins: {
            _: "Origines",
            filter: "Filtrer les origines…",
        },
        points: {
            loading: "Récupération des données…",
            partial: "Données partielles",
        },
        providers: {
            _: "Fournisseurs",
            create: "Créer un fournisseur",
            delete: [
                "Supprimer le fournisseur",
                "Supprimer les fournisseurs",
            ].join("|"),
            disable: [
                "Désactiver le fournisseur",
                "Désactiver les fournisseurs",
            ].join("|"),
            enable: [
                "Activer le fournisseur",
                "Activer les fournisseurs",
            ].join("|"),
            filter: "Filtrer les fournisseurs…",
        },
        refresh: "Rafraîchir",
        search: "Rechercher…",
        set_interval: "Définir l'intervalle…",
        sourcegroups: {
            _: "Groupes de sources",
            create: "Créer un groupe",
            delete: [
                "Supprimer le groupe de sources",
                "Supprimer les groupes de sources",
            ].join("|"),
            filter: "Filtrer les groupes de sources…",
        },
        sources: {
            _: "Sources",
            filter: "Filtrer les sources…",
        },
        system: "Système",
        templates: "Modèles",
        theme: {
            _: "Thème",
            dark: "Sombre",
            light: "Clair",
        },
        timerange: {
            custom: "Personnalisé…",
            reset: "Réinitialiser l'intervalle",
        },
        total: "Total",
    },
    mesg: {
        action_error: "Une erreur est survenue lors de l’exécution de l’action : {0}",
        bulk_error: "Une erreur est survenue lors de l’exécution des actions",
        collections: {
            delete: [
                "Vous êtes sur le point de supprimer la collection « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point de supprimer {count} collections. Voulez-vous continuer ?",
            ].join("|"),
            empty: "Aucune collection définie",
        },
        fetch_error: "Une erreur est survenue lors de la récupération des données : {0}",
        fetch_failed: "Impossible de récupérer les données",
        graphs: {
            delete: [
                "Vous êtes sur le point de supprimer le graphique « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point de supprimer {count} graphiques. Voulez-vous continuer ?",
            ].join("|"),
            empty: "Aucun graphique défini",
        },
        metricgroups: {
            delete: [
                "Vous êtes sur le point de supprimer le groupe de métriques « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point de supprimer {count} groupes de métriques. Voulez-vous continuer ?",
            ].join("|"),
            empty: "Aucun groupe de métriques défini",
        },
        metrics: {
            empty: "Aucune métrique trouvée",
        },
        origins: {
            empty: "Aucune origine trouvée",
        },
        pages: {
            not_found: "La page demandée n'existe pas",
        },
        providers: {
            delete: [
                "Vous êtes sur le point de supprimer le fournisseur « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point de supprimer {count} fournisseurs. Voulez-vous continuer ?",
            ].join("|"),
            disable: [
                "Vous êtes sur le point de désactiver le fournisseur « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point de désactiver {count} fournisseurs. Voulez-vous continuer ?",
            ].join("|"),
            disabled: "Ce fournisseur est inactif",
            empty: "Aucun fournisseur défini",
            enable: [
                "Vous êtes sur le point d’activer le fournisseur « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point d’activer {count} fournisseurs. Voulez-vous continuer ?",
            ].join("|"),
            enabled: "Ce fournisseur est actif",
        },
        read_only: "Instance en lecteur-seule",
        sourcegroups: {
            delete: [
                "Vous êtes sur le point de supprimer le groupe de sources « {name} ». Voulez-vous continuer ?",
                "Vous êtes sur le point de supprimer {count} groupes de sources. Voulez-vous continuer ?",
            ].join("|"),
            empty: "Aucun groupe de sources défini",
        },
        sources: {
            empty: "Aucune source trouvée",
        },
    },
};
