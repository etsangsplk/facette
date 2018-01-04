<template>
    <article>
    </article>
</template>

<script>
export default {
    created() {
        this.$eventbus.$emit("sidebar-collection", {});
    },
};
</script>
