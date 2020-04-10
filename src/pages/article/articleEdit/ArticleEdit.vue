<template>
  <div class="article-edit">

    <div class="article-edit__header">
      <div class="title">
        <section-title :name="articleId ? '编辑文章' : '新增文章'" />
      </div>
      <div class="operation">
        <el-button type="primary" icon="el-icon-s-promotion" :loading="submitLoading" @click="handleSubmit">发布</el-button>
        <el-button type="info" icon="el-icon-circle-close" @click="handleClose">取消</el-button>
      </div>
    </div>


    <el-row>
      <el-col :lg="16">
        <!-- 一个组件上的v-model默认会利用名为value的prop和名为input的事件。 -->
        <tinymce
          v-model="articleDetail.content"
          :height="660" />
      </el-col>

      <el-col :lg="8">
        <el-form class="article-edit__form" ref="form" :model="articleDetail" :rules="formRules" label-width="90px">
          <el-form-item label="文章标题:" prop="title">
            <el-input v-model="articleDetail.title" placeholder="请输入文章标题" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import api from '@/api';
  import bus from '@/utils/bus';
  import tableMng from '@/utils/tableMng';
  import AvatarUpload from '@/components/upload/avatarUpload';
  import DragUpload from '@/components/upload/dragUpload';
  import SectionTitle from '@/components/sectionTitle';
  import Tinymce from '@/components/tinymce';

  const defaultDetail = {
    id: '',
    name: '',
    type: '',
    content: '',
  }

  export default {
    name: 'ArticleEdit',
    props: ['articleId'],
    components: {
      AvatarUpload,
      DragUpload,
      SectionTitle,
      Tinymce
    },
    data() {
      return {
        tableMng,
        articleDetail: { ...defaultDetail },
        formRules: {
          title: [{
            required: true,
            message: '请填写文章标题',
            trigger: 'blur'
          }, {
            max: 20,
            message: '标题不能超过20个字',
            trigger: 'blur'
          }],
        },
        submitLoading: false,
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      async getDetail() {
        if (this.articleId) {
          const data = await api.article.getDetail({ id: this.articleId });
          this.articleDetail = {
            id: data.id,
            title: data.title,
            content: data.content,
          };
        } else {
          this.articleDetail = { ...defaultDetail };
        }
      },
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.submitLoading = true;
            this.articleDetail.type = 1;
            this.articleId ? this.articleDetail.ops = 1 : this.articleDetail.ops = 0;
            await api.article.update(this.articleDetail);
            this.submitLoading = false;
            this.$message.success('发布成功');
            this.handleClose();
          } else {
            this.$message.error('请按照正确格式填写');
          }
        })
      },
      handleClose() {
        bus.$emit('closeTag', this.$route.path);
        this.$router.push('/article/list');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-edit {
    background-color: #fff;
    padding: 1em;

    .article-edit__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .title,
      .operation {
        margin-bottom: 1em;
      }
    }

    .article-edit__form {
      box-sizing: border-box;
      height: 660px;
      overflow-y: auto;
      padding: 1em;
      border: 1px solid #c5c5c5;
    }
  }
</style>
