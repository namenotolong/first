<template>
  <div class="text-ellipsis" :class="classname">
    <div v-if="limit > 0">
      {{ellipsisText(text, limit)}}
    </div>

    <div v-else :class="ellipsisClass" :style="ellipsis">
      {{text}}
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      limit: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 0
      },
      lineClamp: {
        type: Number,
        default: 0
      },
      classname: {
        type: String,
        default: ''
      }
    },
    computed: {
      ellipsisClass() {
        return this.lineClamp > 0 ? 'text-ellipsis__multiple' : 'text-ellipsis__single';
      },
      ellipsis() {
        return {
          width: this.width > 0 ? this.width + 'px' : '100%',
          '-webkit-line-clamp': this.lineClamp
        }
      }
    },
    methods: {
      ellipsisText(text, limit) {
        if (text.length <= limit) {
          return text;
        } else {
          return text.slice(0, limit) + '...';
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .text-ellipsis {

    //多行文本文字超过行数限制后显示省略号
    .text-ellipsis__multiple {
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
    }

    // 单行文本超出显示省略号
    .text-ellipsis__single {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
