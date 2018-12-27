<template>
    <div class="not-found">
        <p>404</p>
    </div>
</template>

<script>
    import bus from "../../utils/bus.js"
    export default {
        name: "not-found",
        data() {
            return {

            }
        },
        created() {
            $on("myevent", data => {})
        },
    }
</script>

<style scoped>


</style>