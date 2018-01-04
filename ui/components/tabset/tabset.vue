<template>
    <div class="v-tabset">
    	<slot></slot>
    </div>
</template>

<script>
export default {
    name: "v-tabset",
};
</script>

<style lang="scss" scoped>
.v-tabset {
    display: flex;
}
</style>
