<template>
    <div class="not-found">
        <p>404</p>
    </div>
</template>

<script>
    import bus from "../../utils/bus.js"
    export default {
        data() {
            return {

            }
        },
        created() {
            bus.$on("myevent", data => {})
        },
    }
</script>

<style scoped>


</style>