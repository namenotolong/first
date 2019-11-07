<template>
  <div class="article-edit">

    <div class="article-edit__header">
      <section-title :name="articleId ? '编辑文章' : '新增文章'" />
      <el-button type="primary" round icon="el-icon-s-promotion" :loading="publishLoading" @click="handlePublish">发布</el-button>
    </div>

    <div class="article-list__form">
      <el-form :model="articleDetail" :rules="formRules" label-width="100px">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章标题:" prop="title">
              <el-input v-model="articleDetail.title" placeholder="请输入文章标题" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章类型:" prop="type">
              <el-select v-model="articleDetail.type" placeholder="请选择文章类型" clearable>
                <el-option v-for="item in articleTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章简介:">
              <el-input v-model="articleDetail.brief" type="textarea" :rows="3" :maxlength="100" placeholder="请输入文章简介" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题图片:">
              <el-upload
                class="image-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :before-upload="beforeImageUpload"
                :on-success="handleImageSuccess">
                <img v-if="articleDetail.imageUrl" :src="articleDetail.imageUrl" class="image">
                <i v-else class="el-icon-plus image-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:" prop="date">
              <el-input v-model="articleDetail.date" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <tinymce v-model="articleDetail.content"></tinymce>
    <!-- 一个组件上的v-model默认会利用名为value的prop和名为input的事件。 -->
  </div>
</template>

<script>
  import tableMng from '@/utils/tableMng';
  import api from '@/api';
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
        articleDetail: {
          title: '',
          author: '',
          date: '',
          imageUrl: '',
          type: '',
          brief: '',
          content: '',
        },
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
          type: [{
            required: true,
            message: '请选择文章类型',
            trigger: 'change'
          }]
        },
        articleTypes: tableMng.getTable('article'),
        publishLoading: false,
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
        if (!this.articleId) return;
        api.article.getDetail({
          id: this.articleId,
        }).then(res => {
          const data = res.data.articleDetail;
          this.articleDetail = {
            title: data.title,
            author: data.author,
            date: this.$dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'),
            imageUrl: data.imageUrl,
            type: data.type,
            brief: data.brief,
            content: data.content,
          };
        })
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
        this.articleDetail.image = URL.createObjectURL(file.raw);
      },
      handleAccessorySuccess() {
        this.$message.success('上传成功');
      },
      handlePublish() {
        this.$message.success('发布成功');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-edit {
    background-color: #fff;
    padding: 20px;

    .article-edit__header {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      justify-content: space-between;
    }

    .article-list__form {

      .image {
        width: 74px;
        height: 74px;
        display: block;
      }

      .image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 74px;
        height: 74px;
        line-height: 74px;
        text-align: center;
      }
    }
  }
</style>
<style lang="scss">
  .article-list__form {
    .image-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
          border-color: #409EFF;
        }
      }
    }
  }
</style>
