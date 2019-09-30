<template>
  <!-- 分页 -->
  <div class="pagination" :class="`pagination--${position}`">
    <el-pagination :total="total" :current-page.sync="currentPage" :page-size.sync="pageSizeNum" :page-sizes="pageSizes" :layout="layout" :background="background" @size-change="handlePageSizeChange" @current-change="handlePageNumberrChange">
    </el-pagination>
  </div>

</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      pageNumber: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizes: {
        type: Array,
        default () {
          return [10, 20, 30, 50];
        }
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      background: {
        type: Boolean,
        default: true
      },
      position: {
        validator: function(value) {
          return ['left', 'center', 'right'].includes(value);
        },
        default: 'left'
      }
    },
    computed: {
      currentPage: {
        get() {
          return this.pageNumber;
        },
        set(val) {
          this.$emit('update:pageNumber', val);
        }
      },
      pageSizeNum: {
        get() {
          return this.pageSize;
        },
        set(val) {
          this.$emit('update:pageSize', val);
        }
      }
    },
    methods: {
      handlePageSizeChange(val) {
        // 也可以不用在父组件中监听pagezie和pageNumber的变化，而是直接触发自定义事件pagination。
        // this.$emit('pagination')
      },
      handlePageNumberrChange(val) {
        // this.$emit('pagination')
      }
    }
  };
</script>
<style lang="scss">
  .pagination {
    height: 32px;
    padding: 14px 0px;

    &--left {
      float: left;
    }

    &--center {
      text-align: center;
    }

    &--right {
      float: right;
    }

    .el-pagination .el-pager {
      .number {
        font-weight: normal;
        color: #888;
      }

      .el-icon-more {
        border: none !important;
      }
    }


    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .el-pager li {
      background-color: #fff;
      border: 1px solid #D2D2D2;
      border-radius: 4px;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
      border-color: $theme-color;
      background-color: #fff;
      color: #888;
    }
  }
</style>
