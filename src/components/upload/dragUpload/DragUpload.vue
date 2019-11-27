<template>
  <!-- 文件拖拽上传 -->
  <div>
    <el-upload
      class="drag-upload"
      :action="action"
      :name="name"
      drag
      multiple>
      <i class="el-icon-upload drag-upload__icon"></i>
      <p class="drag-upload__text">点击或直接将文件拖到此处上传</p>
      <p class="drag-upload__tip">文件大小不能超过{{sizeLimit}}MB！{{tip}}</p>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
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
      // 文件的大小限制,单位为MB
      sizeLimit: {
        type: Number,
        default: 2
      },
      // 拖拽区宽度
      width: {
        type: String,
        default: '120px'
      },
      tip: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  .drag-upload {
    .drag-upload__icon {
      font-size: 40px;
      line-height: 40px;
      color: var(--theme);
      margin: 0;
    }

    .drag-upload__text {
      line-height: 20px;
      margin-bottom: 6px;
    }

    .drag-upload__tip {
      line-height: 20px;
      color: $auxiliary-text-color;
    }
  }
</style>

<style lang="scss">
  .drag-upload {
    .el-upload-dragger {
      width: 240px;
      min-height: 140px;
      height: 100%;
      padding: 20px 1em;
    }
  }
</style>
