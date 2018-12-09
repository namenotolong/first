<template>
    <div class="not-found">
        <p>404</p>
    </div>
</template>

<script>
    export default {
        name: "not-found",
        data() {
            return {

            }
        },
        created() {
            this.$_bus.$on("myevent", data => {})
        },
    }
</script>

<style scoped>


</style>