<template>
  <transition name="fade">
    <div class="rocket" id="rocket" v-show="isVisible" @click="clickRocket" @mouseenter="enterRocket" @mouseleave="leaveRocket"></div>
  </transition>
</template>
<script>
  import {scroll,animate } from "@/utils/util.js";
  import Animate from "@/utils/animate.js";
  export default {
    props: {
      visibleHeight: {
        type: Number,
        default: 100
      },
      customStyle: {
        type: Object,
        default () {
          return {
            bottom: "20px",
            right: "30px"
          }
        }
      }
    },
    data() {
      return {
        isClickRocket: false,
        isVisible: false,
        scrollElem: null
      }
    },
    mounted() {
      this.scrollElem = document.getElementsByClassName("page")[0];
      this.scrollElem.addEventListener("scroll", this.handleScroll);
      let rocket = document.getElementById("rocket");
      rocket.style.bottom = this.customStyle.bottom;
      rocket.style.right = this.customStyle.right;

    },
    destroyed() {
      this.scrollElem.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleScroll() {
        if (this.scrollElem.scrollTop > this.visibleHeight) {
          this.isVisible = true;
        } else {
          if (this.isClickRocket == false) {
            this.isVisible = false;
          }
        }
      },
      clickRocket(event) {
        this.isClickRocket = true;
        this.changePosition("-204px -15px");
        scroll(this.scrollElem, 0, 20);
        let rocket = event.target;
        let callback = () => {
          this.isClickRocket = false;
          this.isVisible = false;
          // 尝试transitionend事件来控制
          setTimeout(() => {
            this.changePosition("-31px -15px");
            rocket.style.bottom = this.customStyle.bottom;
          }, 500)
        }
        let animate = new Animate(rocket);
        animate.start("bottom", 1400, 700, "strongEaseIn", callback);

        // 也可以使用这个动画
        // animate(rocket, {
        //     "bottom": 1500
        // }, 25, callback)

      },
      enterRocket() {
        this.changePosition("-117px -15px");
      },
      leaveRocket() {
        if (this.isClickRocket == false) {
          this.changePosition("-31px -15px");
        }
      },
      changePosition(position) {
        let rocket = document.getElementById("rocket");
        rocket.style.backgroundPosition = position;
      }
    },
  }
</script>

<style scoped>
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .rocket {
    position: fixed;
    width: 31px;
    height: 76px;
    background: url(../../assets/img/common/rocket.png) no-repeat -31px -15px;
    cursor: pointer;
    z-index: 10000;
  }
</style>
