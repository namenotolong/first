<template>
  <div class="scrollbar__bar" ref="bar" v-if="visible" @mousedown="handleBarMousedown">
    <div class="scrollbar__thumb" ref="thumb" @mousedown="handleThumbMousedown"> </div>
  </div>
</template>

<script>
  import { getOffset, throttle } from '@/utils/core';

  const BAR_MAP = {
    vertical: {
      name: 'vertical',
      offset: 'offsetTop',
      offsetSize: 'offsetHeight',
      scroll: 'scrollTop',
      scrollSize: 'scrollHeight',
      thumbSize: 'height',
      client: 'clientY',
      position: 'top'
    },
    horizontal: {
      name: 'horizontal',
      offset: 'offsetLeft',
      offsetSize: 'offsetWidth',
      scroll: 'scrollLeft',
      scrollSize: 'scrollWidth',
      thumbSize: 'width',
      client: 'clientX',
      position: 'left'
    }
  };

  export default {
    props: {
      // 垂直滚动/水平滚动
      vertical: {
        type: Boolean,
        default: true
      },
      // 滚动条粗细
      size: {
        type: Number,
        default: 6
      },
      color: {
        type: String,
        default: '#939393'
      },
      scroll: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        visible: true,
        content: null,
        thumb: null,
        // 可视区大小
        // rezise需要监听它的改变
        offsetSize: 0,
        // 内容真实大小
        scrollSize: 0,
        // 滚动条长度
        thumbSize: 0,
        // 滚动速率
        speed: 0,
        // 鼠标按下时，光标离滚动条顶部的距离加上滚动区离浏览器顶部的距离
        record: 0,
        bar: BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
      }
    },
    watch: {
      // 通过滚轮滚动内容区的时候带动滚动条滚动
      scroll(value) {
        this.thumb.style[this.bar.position] = value / this.speed + 'px';
      }
    },
    mounted() {
      this.initData();
      this.setVisible();
      if (this.visible) {
        this.getThumbSize();
        this.getScrollSpeed();
        this.setBarStyle();
        this.setThumbStyle();
      }
    },
    destroyed() {
      document.removeEventListener('mouseup', this.handleDocumentMouseup);
    },
    methods: {
      // 初始化所要用到的数据
      initData() {
        this.content = this.$parent.$refs.content;
        this.thumb = this.$refs.thumb;
        this.offsetSize = this.content[this.bar.offsetSize];
        this.scrollSize = this.content[this.bar.scrollSize];
      },
      // 是否显示滚动条
      setVisible() {
        const visible = this.scrollSize > this.offsetSize;
        this.visible = visible;
        this.$emit('onVisible', visible)
      },
      // 计算滚动条长度
      getThumbSize() {
        this.thumbSize = this.offsetSize * this.offsetSize / this.scrollSize;
      },
      // 计算滚动速率
      getScrollSpeed() {
        this.speed = (this.scrollSize - this.offsetSize) / (this.offsetSize - this.thumbSize);
      },
      // 设置滚动区样式
      setBarStyle() {
        const bar = this.$refs.bar;
        bar.style[this.bar.position] = '0px';
        if (this.vertical) {
          bar.style.width = this.size + 'px';
          bar.style.right = '0px';
        } else {
          bar.style.height = this.size + 'px';
          bar.style.bottom = '0px';
        }
      },
      // 设置滚动条样式
      setThumbStyle() {
        const thumb = this.$refs.thumb;
        thumb.style.backgroundColor = this.color;
        thumb.style.borderRadius = this.size / 2 + 'px';
        thumb.style[this.bar.thumbSize] = this.thumbSize + 'px';
        thumb.style[this.bar.position] = '0px';
        if (this.vertical) {
          thumb.style.width = this.size + 'px';
        } else {
          thumb.style.height = this.size + 'px';
        }
      },
      // 手动控制滚动条和内容区的滚动
      handleManualScroll(target) {
        let end = target;
        const max = this.offsetSize - this.thumbSize;
        if (end < 0) {
          // 滚动条到达最顶部
          end = 0;
        } else if (end > max) {
          // 滚动条到达最底部
          end = max;
        }
        this.thumb.style[this.bar.position] = end + 'px';
        this.content[this.bar.scroll] = end * this.speed;
      },
      // 拖动滚动条进行滚动
      handleThumbMousedown(event) {
        event.stopPropagation();
        // 原生滚动条不能按住右键进行滚动
        if (event.button === 2) { return; };
        this.record = event[this.bar.client] - this.thumb[this.bar.offset];
        document.addEventListener('mousemove', this.handleDocumentMousemove);
        document.addEventListener('mouseup', this.handleDocumentMouseup);
      },
      handleDocumentMousemove(event) {
        const target = event[this.bar.client] - this.record;
        this.handleManualScroll(target);
        // 防止拖动太快选中文字
        window.getSelection().removeAllRanges();
      },
      handleDocumentMouseup() {
        document.removeEventListener('mousemove', this.handleDocumentMousemove);
      },
      // 点击滚动区进行滚动
      handleBarMousedown(event) {
        if (event.button === 2) { return; }
        // 浏览器原生滚动条是点一下，则滚动一定距离，这里直接滚动到点击的位置。
        const target = event[this.bar.client] - getOffset(this.content)[this.bar.position] - this.thumbSize / 2;
        this.handleManualScroll(target);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scrollbar__bar {
    position: absolute;
    width: 100%;
    height: 100%;

    .scrollbar__thumb {
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0.4;

      &:hover {
        opacity: 0.6;
      }
    }
  }
</style>
