<template>
  <div class="article-edit">

    <div class="article-edit__header">
      <section-title :name="articleId ? '编辑文章' : '新增文章'" />
      <el-button type="primary" icon="el-icon-s-promotion" :loading="submitLoading" @click="handleSubmit">发布</el-button>
    </div>

    <div class="article-edit__body">
      <!-- 一个组件上的v-model默认会利用名为value的prop和名为input的事件。 -->
      <tinymce
        class="article-edit_editor"
        v-model="articleDetail.content"
        :height="500" />

      <div class="article-edit__form">
        <el-form ref="form" :model="articleDetail" :rules="formRules" label-width="90px">
          <el-form-item label="文章标题:" prop="name">
            <el-input v-model="articleDetail.name" placeholder="请输入文章标题" clearable></el-input>
          </el-form-item>

          <el-form-item label="文章类型:" prop="type">
            <el-select v-model="articleDetail.type" placeholder="请选择文章类型" clearable>
              <el-option v-for="item in tableMng.getTable('article')" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文章简介:">
            <el-input v-model="articleDetail.brief" type="textarea" :rows="3" :maxlength="100" placeholder="请输入文章简介" clearable></el-input>
          </el-form-item>

          <el-form-item label="创建时间:" prop="createDate">
            <el-input v-model="articleDetail.createDate" disabled></el-input>
          </el-form-item>

          <el-form-item label="标题图片:">
            <avatar-upload
              action="https://sm.ms/api/v2/upload"
              name="smfile"
              :round="false"
              width="80px"
              :image.sync="articleDetail.imageURL" />
          </el-form-item>

          <el-form-item label="附件上传:">
            <drag-upload
              action="https://jsonplaceholder.typicode.com/posts" />

          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';
  import AvatarUpload from '@/components/upload/avatarUpload';
  import DragUpload from '@/components/upload/dragUpload';
  import SectionTitle from '@/components/sectionTitle';
  import Tinymce from '@/components/tinymce';

  export default {
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
        articleDetail: {
          id: '',
          name: '',
          author: '',
          createDate: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
          imageURL: '',
          type: '',
          brief: '',
          content: '',
        },
        formRules: {
          name: [{
            required: true,
            message: '请填写文章标题',
            trigger: 'blur'
          }, {
            max: 20,
            message: '标题不能超过20个字',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择文章类型',
            trigger: 'change'
          }]
        },
        submitLoading: false,
      }
    },
    watch: {
      $route() {
        this.getDetail();
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      async getDetail() {
        if (!this.articleId) return;
        const response = await api.article.getDetail({ id: this.articleId })
        const data = response.data;
        this.articleDetail = {
          id: data.id,
          name: data.name,
          author: data.author,
          createDate: this.$dayjs(data.createDate).format('YYYY-MM-DD HH:mm:ss'),
          imageURL: data.imageURL,
          type: data.type,
          brief: data.brief,
          content: data.content,
        };
      },

      handleAccessorySuccess() {
        this.$message.success('上传成功');
      },
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.submitLoading = true;
            const response = await api.article.update({ detail: this.articleDetail });
            this.submitLoading = false;
            this.$message.success('发布成功');
          } else {
            this.$message.error('请按照正确格式填写');
          }
        })
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
      margin-bottom: 1em;
      align-items: center;
      justify-content: space-between;
    }

    .article-edit__body {
      display: flex;

      .article-edit_editor {
        width: calc(100% - 360px);
      }

      .article-edit__form {
        box-sizing: border-box;
        width: 360px;
        padding: 1em;
        border: $base-border;
      }
    }
  }
</style>
