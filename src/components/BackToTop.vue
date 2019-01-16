<template>
    <div class="scroll">
        <div class="rocket" v-show="isScroll" @click="clickRocket" @mouseenter="enterRocket" @mouseleave="leaveRocket"></div>
        <div style="width: 60px;">文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容</div>
    </div>
</template>
<script>
    import {
        scroll
    } from "../../utils/util.js";
    export default {
        data() {
            return {
                //判断是否点击了火箭
                flag: false,
                isScroll: false
            }
        },
        mounted() {
            let page = document.getElementsByClassName("page")[0];
            page.addEventListener("scroll", () => {
                console.log(555);
                if (page.scrollTop > 100) {
                    this.isScroll = true;
                } else {
                    if (this.flag == false) {
                        this.isScroll = false;
                    }
                }
            })
        },
        destroyed(){

        },
        methods: {
            clickRocket(event) {
                this.flag = true;
                let rocket = event.target;
                let page = document.getElementsByClassName("page")[0];
                this.changePosition(rocket, "-204px -15px");
                scroll(page, 0, 500);

        
                rocket.animate({
                    "bottom": "1200px"
                }, 700, () => {
                    this.flag = false;
                    this.isScroll = false;

                    setTimeout(() => {
                        this.changePosition(rocket, "-31px -15px");
                        rocket.style.bottom = "0px";


                    }, 200)
                });
            },
            enterRocket(event) {
                let rocket = event.target;
                this.changePosition(rocket, "-117px -15px");
            },
            leaveRocket(event) {
                let rocket = event.target;
                if (this.flag == false) {
                    this.changePosition(rocket, "-31px -15px");
                }
            },
            changePosition(elem, position) {
                elem.style.backgroundPosition = position;
            }
        },
    }
</script>

<style scoped>
    .rocket {
        position: fixed;
        bottom: 0px;
        right: 20px;
        width: 31px;
        height: 76px;
        background: url(../../assets/img/rocket.png) no-repeat -31px -15px;
        cursor: pointer;
        z-index: 10000;
    }
</style>