<template>
  <!--上传头像 -->
  <el-upload
    class="avatar-uploader"
    :action="action"
    :name="name"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="handleUploadSuccess"
    :style="{backgroundImage:`url(${image || '' })`}">
    <i class="icon" :class="loading ? 'el-icon-loading' : 'el-icon-plus' " v-if="loading || !image"></i>
  </el-upload>
</template>

<script>
  export default {
    props: {
      action: {
        required: true,
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: 'file'
      },
      image: {
        type: String,
        default: ''
      },
      sizeLimit: {
        type: Number,
        default: 2
      },
      round: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      beforeUpload(file) {
        const isImage = /\.(jpg|png)$/.test(file.name);
        const isLt2M = file.size / 1024 / 1024 < this.sizeLimit;
        if (!isImage) {
          this.$message.error('上传的图片只能是jpg或png格式!');
        }
        if (!isLt2M) {
          this.$message.error(`上传的图片大小不能超过 ${this.sizeLimit}MB!`);
        }
        const valid = isImage && isLt2M;
        if (valid) {
          this.loading = true;
        }
        return valid;
      },
      handleUploadSuccess(res, file) {
        this.loading = false;
        if (res.success) {
          this.$emit('update:image', res.data.url);
        } else {
          this.$message.error(res.message);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    box-sizing: border-box;
    width: 140px;
    height: 140px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border-color: #409EFF;
    }

    .icon {
      font-size: 28px;
      color: #8c939d;
      line-height: 140px;
      text-align: center;
    }
  }
</style>

<style lang="scss">
  .avatar-uploader {
    .el-upload {
      width: 100%;
      height: 100%;
    }
  }
</style>
