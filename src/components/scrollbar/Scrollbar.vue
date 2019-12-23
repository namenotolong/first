<template>

  <div class="scrollbar-wrap">
    <div
      class="scrollbar__content"
      ref="content"
      @resize="handleResize"
      @scroll="handleScroll"
      @wheel="handleWheel">
      <slot />
    </div>

    <!-- 竖直滚动条 -->
    <Bar ref="vertical"
      :size="size"
      :color="color"
      :scroll="scroll"
      @onVisible="handleVerticalVisible" />
    <!-- 水平滚动条 -->
    <Bar
      ref="horizontal"
      :vertical="false"
      :size="size"
      :color="color"
      :scroll="verticalVisible ? 0 : scroll"
      @onVisible="handleHorizontalVisible" />
  </div>

</template>

<script>
  import Bar from './Bar';

  export default {
    props: ['size', 'color'],
    components: {
      Bar
    },
    data() {
      return {
        content: null,
        // 内容滚动的距离
        scroll: 0,
        verticalVisible: true,
        horizontalVisible: true
      }
    },
    mounted() {
      this.content = this.$refs.content;
    },
    methods: {
      handleVerticalVisible(value) {
        this.verticalVisible = value;
      },
      handleHorizontalVisible(value) {
        this.horizontalVisible = value;
      },
      handleScroll() {
        if (this.verticalVisible) {
          this.scroll = this.content.scrollTop;
        }
      },
      handleWheel(evnt) {
        if (!this.verticalVisible && this.horizontalVisible) {
          // 阻止默认事件，不然当页面存在滚动条的时候，会滚动页面
          event.preventDefault();
          this.content.scrollLeft = this.content.scrollLeft + event.deltaY;
          this.scroll = this.content.scrollLeft;
        }
      },
      handleResize(){
        console.log(11);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scrollbar-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;


    .scrollbar__content {
      // width: calc(100% + 17px);
      // height: calc(100% + 17px);
      width: 100%;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
