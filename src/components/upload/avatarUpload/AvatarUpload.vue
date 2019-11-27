<template>
  <!--上传头像 -->
  <el-upload
    class="avatar-uploader"
    :style="style"
    :action="action"
    :name="name"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="handleUploadSuccess">
    <i
      class="avatar-uploader__icon"
      :class="loading ? 'el-icon-loading' : 'el-icon-plus' "
      :style="{lineHeight:this.width}"
      v-if="loading || !image">
    </i>
  </el-upload>
</template>

<script>
  export default {
    props: {
      //上传地址
      action: {
        required: true,
        type: String,
        default: '',
      },
      // 对应inpu控件的name属性，后端依据这个字段获取文件。
      name: {
        type: String,
        default: 'file'
      },
      // 图片地址
      image: {
        type: String,
        default: ''
      },
      // 图片是否为圆形
      round: {
        type: Boolean,
        default: true
      },
      // 图片文件的大小限制,单位为MB
      sizeLimit: {
        type: Number,
        default: 2
      },
      // 图片宽度
      width: {
        type: String,
        default: '120px'
      }
    },
    data() {
      return {
        loading: false
      }
    },
    computed: {
      style() {
        return {
          backgroundImage: `url(${this.image || '' })`,
          width: this.width,
          height: this.width,
          borderRadius: this.round ? '50% ' : '6%'
        }
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
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px dashed #d9d9d9;
    cursor: pointer;

    &:hover {
      border-color: var(--theme);
    }

    &--round {
      border-radius: 50%;
    }

    .avatar-uploader__icon {
      font-size: 28px;
      color: #8c939d;
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
