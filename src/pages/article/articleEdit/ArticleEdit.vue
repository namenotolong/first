<template>
  <div class="article-edit">

    <div class="article-edit__header">
      <section-title :name="articleId ? '编辑文章' : '新增文章'" />
      <el-button type="primary" icon="el-icon-s-promotion" :loading="submitLoading" @click="handleSubmit">发布</el-button>
    </div>

    <div class="article-edit__body">
      <!-- 一个组件上的v-model默认会利用名为value的prop和名为input的事件。 -->
      <tinymce class="article-edit_editor" v-model="articleDetail.content"></tinymce>
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
            <el-upload
              class="image-uploader"
              action="https://sm.ms/api/v2/upload"
              name="smfile"
              :show-file-list="false"
              :before-upload="beforeImageUpload"
              :on-success="handleImageSuccess">
              <img class="image-uploader__preview" v-if="articleDetail.imageURL" :src="articleDetail.imageURL">
              <i class="el-icon-plus image-uploader__icon" v-else></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="附件上传:">
            <el-input placeholder="请上传文件">
              <template slot="append">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAccessorySuccess">
                  <el-button type="primary" round>点击上传</el-button>
                </el-upload>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';
  import SectionTitle from '@/components/sectionTitle';
  import Tinymce from '@/components/tinymce';

  export default {
    props: ['articleId'],
    components: {
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
      beforeImageUpload(file) {
        const isImage = /\.(jpg|png)$/.test(file.name);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isImage) {
          this.$message.error('上传的图片只能是jpg或png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isImage && isLt2M;
      },
      handleImageSuccess(res, file) {
        console.log(res);
        console.log(file);
        this.articleDetail.imageURL = URL.createObjectURL(file.raw);
        this.$message.success('上传成功');
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

        .image-uploader {
          .image-uploader__preview {
            width: 74px;
            height: 74px;
            display: block;
          }

          .image-uploader__icon {
            font-size: 28px;
            color: #8c939d;
            width: 74px;
            height: 74px;
            line-height: 74px;
            text-align: center;
          }
        }


      }


    }



  }
</style>
<style lang="scss">
  .article-edit__form {
    .image-uploader {
      .el-upload {
        position: relative;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          border-color: #409EFF;
        }
      }
    }
  }
</style>
