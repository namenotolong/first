<template>
  <div class="grid-wrap">
    <el-row :gutter="30">
      <el-col :lg="6" :sm="12" v-for="grid in grids" :key="grid.name">
        <div class="grid" :class="grid.gridBackground" @click="handleChart(grid.name)">
          <i class="iconfont grid-icon" :class="grid.icon"></i>
          <div class="grid-right">
            <p class="grid-name" v-text="grid.name"></p>
            <p class="grid-value" v-text="grid.value"></p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>


</template>
<script>
  import bus from "@/utils/bus.js"
  import { getGridData } from "@/api/dashboard.js";
  export default {
    data() {
      return {
        grids: [{
          gridBackground: "grid--red",
          icon: "icon-visite",
          name: "访问量",
          value: "",
        }, {
          gridBackground: "grid--blue",
          icon: "icon-user",
          name: "用户数量",
          value: "",
        }, {
          gridBackground: "grid--green",
          icon: "icon-goods",
          name: "商品数量",
          value: "",
        }, {
          gridBackground: "grid--yellow",
          icon: "icon-comment",
          name: "评论数量",
          value: "",
        }]
      }
    },
    created() {
      this.getGridData();
    },
    methods: {
      getGridData() {
        getGridData().then(res => {
          const data = res.data;
          this.grids.forEach((item, index) => {
            item.value = Object.values(res.data)[index]
          })

        })
      },
      handleChart(name) {
        bus.$emit("changeData", name);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .grid {
    position: relative;
    color: #fff;
    box-shadow: 0px 0px 10px rgba(100, 100, 100, .5);
    cursor: pointer;
    @include clearfix;

    &--green {
      background-color: #06d6a0;
    }

    &--yellow {
      background-color: #ffd166;
    }

    &--blue {
      background-color: #06aed5;
    }

    &--red {
      background-color: #ef476f;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0px;
      height: 100%;
      width: 100px;
      background-color: rgba(0, 0, 0, 0.05);
      -webkit-transition: all 0.95s;
      transition: width 0.5s;
    }

    &:hover::before {
      width: 100%;
      box-sizing: border-box;
    }

    .grid-icon {
      display: inline-block;
      font-size: 48px;
      width: 100px;
      text-align: center;
      line-height: 108px;
    }

    .grid-right {
      float: right;
      padding: 16px;

      p {
        color: #fff !important;
      }

      .grid-name {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .grid-value {
        font-size: 30px;
      }
    }


  }
</style>
<style lang="scss">
  .grid-wrap {
    .el-col {
      margin-bottom: 20px;
    }
  }
</style>
