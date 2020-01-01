<template>

  <div class="scrollbar-wrap">
    <div
      class="scrollbar__content"
      ref="content"
      @scroll="handleScroll"
      @wheel="handleWheel">
      <div ref="resize">
        <slot />
      </div>
    </div>

    <!-- 竖直滚动条 -->
    <Bar
      ref="vertical"
      :size="size"
      :color="color"
      :scroll="scroll" />

    <!-- 水平滚动条 -->
    <Bar
      ref="horizontal"
      :vertical="false"
      :size="size"
      :color="color"
      :scroll="verticalVisible ? 0 : scroll" />
  </div>

</template>

<script>
  import Bar from './Bar';
  import getScrollbarWidth from './util';

  export default {
    props: ['size', 'color'],
    components: { Bar },
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
      this.getVisible();
      this.setContentMargin();
    },
    methods: {
      // 获取滚动条显示/隐藏状态
      getVisible() {
        const { scrollHeight, scrollWidth, offsetHeight, offsetWidth } = this.content;
        // 这里不能使用clientWidth/clientHeight来判断，它们是不包含原生滚动条的宽度的。
        this.verticalVisible = scrollHeight > offsetHeight;
        this.horizontalVisible = scrollWidth > offsetWidth;
      },
      setContentMargin() {
        const scrollbarWidth = getScrollbarWidth();
        this.content.style.marginRight = this.content.style.marginBottom = -scrollbarWidth + 'px';
      },
      // 垂直滚动监听scroll事件
      handleScroll() {
        if (this.verticalVisible) {
          this.scroll = this.content.scrollTop;
        }
      },
      // 只存在水平滚动条的时候，水平滚动监听wheel事件
      handleWheel(evnt) {
        if (!this.verticalVisible && this.horizontalVisible) {
          // 阻止默认事件，不然当页面存在滚动条的时候，会滚动页面
          event.preventDefault();
          // webkit内核的event.deltaY是100，火狐是3，这里指定每次滚动40px；
          let step;
          if (event.deltaY > 0) {
            step = 40;
          } else {
            step = -40;
          }
          this.content.scrollLeft = this.content.scrollLeft + step;
          this.scroll = this.content.scrollLeft;
        }
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
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      // 一定要设置成scoll，目的是不管存不存在滚动，都让原生滚动区显示，这样才方便同时设置负的margin-bottom和margin-right
      overflow: scroll;
    }
  }
</style>
