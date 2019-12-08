<template>
  <div class="carousel" :style="{height:`${height}px`}">

    <!-- 淡入淡出效果 -->
    <transition-group name="fade" tag="div">
      <div class="carousel-item" v-for="item in carouselList" v-show="activeIndex == item.index" :key="item.index" :style="{backgroundImage:`url(${item.image}`,height:`${height}px`}">
      </div>
    </transition-group>

    <!-- 换页按钮 -->
    <ul class="circle-list">
      <li class="circle-item" :class="{'circle-active':isActive(item.index)}" v-for=" item in carouselList" :key="item.index" @click="triggerChange(item.index)">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      height: {
        type: Number,
        default: 360
      },
      speed: {
        type: Number,
        default: 3000
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      dotPosition: {
        type: String,
        default: 'bottom'
      },
      carouselList: {
        type: Array,
        default () {
          return [];
        }
      },
    },
    data() {
      return {
        activeIndex: 1,
      }
    },
    mounted() {
      this.startPlay();
    },
    methods: {
      startPlay() {
        setInterval(() => {
          this.activeIndex++;
          if (this.activeIndex > this.carouselList.length) {
            this.activeIndex = 1;
          }
        }, 4000);
      },
      isActive(index) {
        if (index == this.activeIndex) return true;
      },
      triggerChange(index) {
        this.activeIndex = index;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .carousel {
    .carousel-item {
      position: absolute;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1s;
    }

    .circle-list {
      position: absolute;
      right: 2%;
      top: 50%;
      transform: translate(-50%, -50%);

      .circle-item {
        width: 8px;
        height: 8px;
        margin-bottom: 10px;
        border-radius: 50%;
        background-color: rgba(116, 227, 247, 0.2);
        cursor: pointer;
      }

      .circle-active {
        background-color: rgba(116, 227, 247, 1);
      }
    }
  }
</style>
