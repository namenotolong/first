<template>
  <div>
    <div class="handle">
      <div class="fr">
        <el-button class="handle-item" type="primary" round :loading="publishLoading" @click="publish">发布</el-button>
        <el-button class="handle-item" type="warning" round :loading="draftLoading" @click="publish">存草稿</el-button>
      </div>
      <el-input class="handle-item" v-model="articleDetail.title" placeholder="请输入文章标题" clearable style="width: 200px;"></el-input>
      <el-select class="handle-item" v-model="articleDetail.type" placeholder="请选择文章类型" clearable>
        <el-option v-for="item in articleTypeList" :key="item.value" :label="item.value" :value="item.value"></el-option>
      </el-select>
    </div>

    <tinymce v-model="articleDetail.content"></tinymce>
    <!-- 一个组件上的v-model默认会利用名为value的prop和名为input的事件。 -->
  </div>

</template>
<script>
  import { formatDate } from "@/utils/util.js"
  import Tinymce from "@/components/Tinymce/Tinymce.vue";
  export default {
    components: {
      Tinymce
    },
    data() {
      return {
        articleDetail: {
          author: "",
          createDate: "",
          title: "",
          type: "",
          content: "",
        },
        articleTypeList: [{
          text: "新闻",
          value: "新闻"
        }, {
          text: "财经",
          value: "财经"
        }, {
          text: "娱乐",
          value: "娱乐"
        }, {
          text: "体育",
          value: "体育"
        }, {
          text: "科技",
          value: "科技"
        }, {
          text: "游戏",
          value: "游戏"
        }],
        publishLoading: false,
        draftLoading: false,
      }
    },
    created() {
      console.log(this.$route);
      console.log(this.articleId);
    },
    methods: {
      getArticleDetail() {

      },
      publish() {
        console.log(this.articleDetail.content);
        this.articleDetail.title = ""
        this.articleDetail.type = ""
        this.articleDetail.content = ""
      },
      draft() {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .handle {
    .handle-item {
      margin-bottom: 10px;
    }
  }

  .pagination {
    margin-top: 10px;
  }
</style>
