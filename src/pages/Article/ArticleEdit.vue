<template>
  <div>
    <div class="handle">
      <div class="fr">
        <el-button class="handle-item" type="primary" round :loading="publishLoading" @click="publish">发布</el-button>
        <el-button class="handle-item" type="warning" round :loading="draftLoading" @click="draft">存草稿</el-button>
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
  import api from '@/api';
  import { formatDate } from "@/utils/core"
  import Tinymce from "@/components/Tinymce/Tinymce";

  export default {
    props: ["articleIndex", "articleId"],
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
    watch: {
      $route() {
        this.getArticleDetail();
      }
    },
    created() {
      this.getArticleDetail();
    },
    methods: {
      getArticleDetail() {
        api.article.getArticleDetail({
          id: this.articleId
        }).then(res => {
          this.articleDetail = res.data.articleDetail;
        })
      },
      publish() {
        this.$message.success("发布成功");
      },
      draft() {
        this.$message.success("保存成功，可前往草稿箱查看。");
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
