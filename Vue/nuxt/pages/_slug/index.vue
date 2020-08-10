<template>
    <h1>slug index</h1>
</template>
<script>
export default {
    validate({ params }) {
        // 必须是number类型
        return /^\d+$/.test(params.slug);
    },
};
</script>