<template>
  <!--上传头像 -->
  <el-upload
    class="avatar-upload"
    :style="style"
    :action="action"
    :name="name"
    :data="params"
    accept="image/jpeg,image/png"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :headers="headers"
    :on-success="handleSuccess">
    <i
      class="avatar-upload__icon"
      :class="loading ? 'el-icon-loading' : 'el-icon-plus' "
      :style="{lineHeight:this.width}"
      v-if="loading || !value">
    </i>
  </el-upload>
</template>

<script>
  export default {
    props: {
      // 图片地址
      value: {
        type: String,
        default: ''
      },
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
      baseUrl: {
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
      },
      //附带参数
      params : {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        loading: false,
        headers: {"authorization" : sessionStorage.getItem('token')}
      }
    },
    computed: {
      style() {
        return {
          backgroundImage: `url(${this.value || '' })`,
          width: this.width,
          height: this.width,
          borderRadius: this.round ? '50% ' : '6%'
        }
      }
    },
    methods: {
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const limit = file.size / 1024 / 1024 < this.sizeLimit;
        if (!isJpgOrPng) {
          this.$message.error('上传的图片只能是jpg或png格式!');
        }
        if (!limit) {
          this.$message.error(`上传的图片大小不能超过 ${this.sizeLimit}MB!`);
        }
        const valid = isJpgOrPng && limit;
        if (valid) {
          this.loading = true;
        }
        return valid;
      },
      handleSuccess(res, file) {
        this.loading = false;
        if (res.success) {
          this.$emit('update-img', res.data);
        } else {
          this.$message.error(res.message || '上传失败');
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-upload {
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

    .avatar-upload__icon {
      font-size: 28px;
      color: #8c939d;
      text-align: center;
    }
  }
</style>

<style lang="scss">
  .avatar-upload {
    .el-upload {
      width: 100%;
      height: 100%;
    }
  }
</style>
