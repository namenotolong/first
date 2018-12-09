<template>
    <div>
        <v-header></v-header>
        <v-menu></v-menu>
        <div class="container" :class="{collapse:isCollapse}">
            <v-tags></v-tags>
            <div class="page">
                <transition name="page" mode="out-in">
                    <keep-alive :include="cachePages">
                        <router-view></router-view>
                    </keep-alive>
                </transition>

            </div>

        </div>

    </div>

</template>
<script>
    import VHeader from "../Header/Header.vue";
    import VMenu from "../Menu/Menu.vue";
    import VTags from "../Tags/Tags.vue";
    export default {
        components: {
            VHeader,
            VMenu,
            VTags
        },
        data() {
            return {
                isCollapse: false,
                cachePages: []
            }
        },
        created() {
            this.$_bus.$on("collapse", msg => {
                this.isCollapse = msg;
            })
            this.$_bus.$on("cachePage", msg => {
                this.cachePages = msg;
            })
        },
        methods: {

        }
    }
</script>

<style scoped>
    .container {
        box-sizing: border-box;
        position: absolute;
        top: 62px;
        bottom: 0px;
        left: 220px;
        right: 0px;
        transition: left .3s ease-in-out; /* 查看element的menu.css源码可知transition的参数 */
        background-color: #f0f2f5;
    }

    .container.collapse {
        left: 65px;
    }

    .page {
        box-sizing: border-box;
        height: calc(100% - 45px);
        padding: 20px;
        overflow-y: auto;
    }

    .page-enter,
    .page-leave {
        opacity: 0;
    }

    .page-enter-active,
    .page-leave-active {
        transition: opacity .5s ease;
    }
</style>