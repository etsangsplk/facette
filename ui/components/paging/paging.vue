<template>
    <ul class="v-paging" v-if="pageCount > 1">
        <li class="v-paging-entry" :disabled="page == 1" @click="handler(page - 1)"><v-icon icon="chevron-left"></v-icon></li>
        <li class="v-paging-entry" :class="{active: item.value == page}" :disabled="item.value === null" @click="handler(item.value)" v-for="item in items">{{ item.label }}</li>
        <li class="v-paging-entry" :disabled="page == pageCount" @click="handler(page + 1)"><v-icon icon="chevron-right"></v-icon></li>
    </ul>
</template>

<script>
const adjacency = 2;

export default {
    name: "v-paging",
    props: {
        handler: {
            required: true,
            type: Function,
        },
        page: {
            required: true,
            type: Number,
        },
        pageSize: {
            required: true,
            type: Number,
        },
        total: {
            required: true,
            type: Number,
        },
    },
    data() {
        return {
            items: {},
            pageCount: 0,
        };
    },
    methods: {
        addEllipsis(items) {
            items.push({label: "…", value: null});
        },
        addRange(items, start, end) {
            for (let i = start; i <= end; i++) {
                items.push({label: String(i), value: i});
            }
        },
        update() {
            let items = [],
                fullAdjacency = adjacency * 2;

            this.pageCount = Math.ceil(this.total / this.pageSize);

            if (this.pageCount <= fullAdjacency * 2) {
                this.addRange(items, 1, this.pageCount);
            }

            // Paging is at the beginning
            else if (this.page <= fullAdjacency) {
                let end = fullAdjacency + adjacency + 1;

                this.addRange(items, 1, end);

                if (end != this.pageCount - adjacency - 1) {
                    this.addEllipsis(items);
                }

                this.addRange(items, this.pageCount - adjacency, this.pageCount);
            }

            // Paging is in the middle
            else if (this.page < this.pageCount - fullAdjacency) {
                let start = this.page - adjacency,
                    end = this.page + adjacency,
                    startDelta = 0,
                    endDelta = 1;

                if (this.page == this.pageCount - fullAdjacency) {
                    startDelta = 1;
                }

                if (this.page == fullAdjacency + 1) {
                    endDelta = 0;
                }

                this.addRange(items, 1, adjacency + startDelta);

                if (endDelta !== 0) {
                    this.addEllipsis(items);
                }

                this.addRange(items, start, end);

                if (startDelta === 0 && this.page != this.pageCount / 2) {
                    this.addEllipsis(items);
                }

                this.addRange(items, this.pageCount - adjacency + endDelta, this.pageCount);
            }

            // Paging is at the end
            else {
                let start = this.pageCount - (fullAdjacency + adjacency),
                    end = this.pageCount;

                this.addRange(items, 1, adjacency + 1);

                if (start != adjacency + 2) {
                    this.addEllipsis(items);
                }

                this.addRange(items, start, end);
            }

            this.items = items;
        },
    },
    mounted() {
        this.update();
    },
    watch: {
        page() {
            this.update();
        },
        total() {
            this.update();
        },
    },
};
</script>

<style lang="scss" scoped>
.v-paging,
.v-paging-entry {
    align-items: center;
    display: flex;
    justify-content: center;
}

.v-paging {
    list-style-type: none;
    margin: 2rem 0;
}

.v-paging-entry {
    border-radius: 0.2rem;
    cursor: pointer;
    margin: 0 0.25rem;
    min-height: 2rem;
    user-select: none;
    width: 2rem;

    &[disabled] {
        opacity: var(--disabled-opacity);
        pointer-events: none;
    }
}

body {
    &.dark .v-paging-entry {
        &:hover,
        &.active {
            background-color: var(--dark-input-background-color);
        }
    }

    &.light .v-paging-entry {
        &:hover,
        &.active {
            background-color: var(--light-input-background-color);
        }
    }
}
</style>
