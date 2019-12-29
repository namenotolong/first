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
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
  import Bar from './Bar';
  import getScrollbarWidth from './util';

  export default {
    props: ['size', 'color'],
    components: { Bar },
    data() {
      return {
        scrollbarWidth: getScrollbarWidth(),
        content: null,
        // 内容滚动的距离
        scroll: 0,
        verticalVisible: true,
        horizontalVisible: true
      }
    },
    mounted() {
      this.content = this.$refs.content;
      this.setContentStyle();
      this.getVisible();
      this.calcContentSize();
      // window.addEventListener('resize',this.calcContentSize)
      // addResizeListener(this.content, this.calcContentSize);
    },
    methods: {
      setContentStyle() {
        this.content.style.marginRight = this.content.style.marginBottom = -this.scrollbarWidth + 'px';
      },
      // 获取滚动条显示/隐藏状态
      getVisible() {
        const { scrollHeight, scrollWidth, clientHeight, clientWidth } = this.content;
        this.verticalVisible = scrollHeight > clientHeight;
        this.horizontalVisible = scrollWidth > clientWidth;
      },
      //只存在竖直滚动条或横向滚动条时需要重新计算内容区的宽高
      calcContentSize() {
        console.log(111);
        const { horizontalVisible, verticalVisible, scrollbarWidth, content } = this;
        if (verticalVisible && !horizontalVisible) {
          content.style.height = parseInt(getComputedStyle(content).height) - scrollbarWidth + 'px';
        }
        if (horizontalVisible && !verticalVisible) {
          content.style.width = parseInt(getComputedStyle(content).width) - scrollbarWidth + 'px';
        }
      },
      // 垂直滚动监听scroll事件
      handleScroll() {
        if (this.verticalVisible) {
          this.scroll = this.content.scrollTop;
        }
      },
      // 水平滚动监听wheel事件
      handleWheel(evnt) {
        if (!this.verticalVisible && this.horizontalVisible) {
          // 阻止默认事件，不然当页面存在滚动条的时候，会滚动页面
          event.preventDefault();
          // webkit内核的event.deltaY是100，火狐是3，这里指定每次滚动40px；
          let step;
          if (event.deltaY > 0) {
            step = 30;
          } else {
            step = -30;
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
      overflow: auto;
    }
  }
</style>
