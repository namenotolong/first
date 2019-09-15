<template>
  <div class="reject">
    <div class="content">
      <img :style="{float:'right'}" :src="errGif" alt="">
      <p class="oops">Oops!</p>
      <h2>你没有权限访问该页面</h2>
      <p class="dissatisfy">如有不满请联系相关领导</p>
      <p>或者你可以</p>

      <ul class="list">
        <li>
          <router-link to="/dashboard">返回首页</router-link>
        </li>
        <li>
          <a href="https://www.tmall.com/" target="_blank">随便看看</a>
        </li>
        <li @click="dialogVisible = true">点我看图</li>
      </ul>

      <el-dialog title="好玩的图片" :visible.sync="dialogVisible">
        <el-carousel arrow="always" :autoplay="false" height="400px">
          <el-carousel-item v-for="gif in gifList" :key="gif">
            <img class="dialog-img" :src="gif" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import gif from "@/assets/images/403/403.gif";

  export default {
    data() {
      return {
        errGif: gif + "?" + Date.now(), //图片路径加上参数，保证每次打开这个页面都会重新开始播放gif。
        gifList: [
          require("@/assets/images/403/403-9.gif"),
          require("@/assets/images/403/403-1.gif"),
          require("@/assets/images/403/403-2.gif"),
          require("@/assets/images/403/403-3.gif"),
          require("@/assets/images/403/403-4.gif"),
          require("@/assets/images/403/403-5.gif"),
          require("@/assets/images/403/403-6.gif"),
          require("@/assets/images/403/403-7.gif"),
          require("@/assets/images/403/403-8.gif"),
          require("@/assets/images/403/403-10.gif")
        ],
        dialogVisible: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .reject {
    position: absolute;
    top: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;

    .content {
      width: 650px;
      margin: 80px auto;

      .oops {
        font-size: 50px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .dissatisfy {
        font-size: 12px;
        margin: 10px 0;
      }

      .list {
        list-style-type: disc;
        list-style-position: inside;

        li {
          text-decoration: underline;
          cursor: pointer;
          margin-bottom: 4px;
          color: #4a4a4a
        }
      }

      .dialog-img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
