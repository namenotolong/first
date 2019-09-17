<template>
  <div class="grid-wrap">
    <el-row :gutter="30">
      <el-col :lg="6" :sm="12" v-for="grid in grids" :key="grid.name">
        <div class="grid" :class="grid.gridBackground" @click="handleChart(grid.name)">
          <div class="grid-left">
            <svg-icon :icon-name="grid.icon" icon-class="grid-icon" />
          </div>

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
  import bus from "@/utils/bus"
  import api from '@/api';

  export default {
    data() {
      return {
        grids: [{
          gridBackground: "grid--red",
          icon: "view",
          name: "访问量",
          value: "",
        }, {
          gridBackground: "grid--blue",
          icon: "user_filled",
          name: "用户数量",
          value: "",
        }, {
          gridBackground: "grid--green",
          icon: "goods",
          name: "商品数量",
          value: "",
        }, {
          gridBackground: "grid--yellow",
          icon: "message",
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
        api.dashboard.getGridData().then(res => {
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
    height: 108px;
    color: #fff;
    box-shadow: 0px 0px 10px rgba(100, 100, 100, .5);
    cursor: pointer;

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

    .grid-left {
      display: inline-block;
      width: 100px;
      line-height: 108px;
      vertical-align: top;
      text-align: center;

      .grid-icon {
        font-size: 48px;
        vertical-align: middle;
      }
    }

    .grid-right {
      display: inline-block;
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
