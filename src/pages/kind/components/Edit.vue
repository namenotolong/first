<template>
  <el-dialog
    class="user-edit"
    :title="id ? '编辑分类' : '新增分类'"
    width="700px"
    :visible="visible"
    >
    <el-form
      ref="form"
      :model="userInfo"
      :rules="formRules"
      label-width="70px"
      v-loading="getDetailLoading">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="userInfo.name" placeholder="请填写名称" clearable/>
      </el-form-item>
      <el-form-item label="图标:" prop="bar" v-if="userInfo.level == 1 || level == 1">
        <el-select v-model="userInfo.bar" placeholder="请选择图标">
          <el-option v-for="item in bars" :key="item" :label="item" :value="item">
            <i :class="item"/>
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="!id">
        <el-form-item label="级别:" prop="level">
          <el-radio-group v-model="level">
            <el-radio label="1" value="1">一级</el-radio>
            <el-radio label="2" value="2">二级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="一级:" prop="parent" v-if="(userInfo.level = 2 && id) || level == 2">
          <el-select v-model="userInfo.parent" placeholder="请选择对应一级菜单">
            <el-option v-for="item in firstKinds" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import api from '@/api';

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      kind: {
        type: Object,
        default: {}
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible(value) {
        if (value) {
          this.getDetail();
        }
      }
    },
    data() {
      return {
        params:{},
        level: '',
        firstKinds: [],
        bars: [],
        userInfo: {
          name: '',
          bar: '',
          level: '',
          parent: '',
        },
        formRules: {
          bar: [{
            required: true,
            message: '请选择图标',
            trigger: 'change'
          }],
          parent: [{
            required: true,
            message: '请选择一级分类',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }],
        },
        submitLoading: false,
        getDetailLoading: false
      }
    },
    mounted() {
      this.getDetail();
    },
    methods: {
      async getDetail() {
        let temp = await api.kind.getAllBar();
        this.bars = temp.map(item => {
          return item.content;
        })
        if (!this.id) return;
        this.getDetailLoading = true;
        this.userInfo = this.kind;
        console.log(this.userInfo)
        this.getDetailLoading = false;
      },
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if(this.level != 1 && this.level != 2 && !this.id ) {
              console.log(this.level)
              this.$message.error('请选择级别');
              return;
            }
            this.submitLoading = true;
            let temp = {};
            if (this.id) {
              temp.id = this.id;
            }
            temp.kindName = this.userInfo.name;
            temp.bar = this.userInfo.bar;
            //添加
            if(this.level = 2 && !this.id) {
              temp.parentId = this.userInfo.parent;
            }
            await api.kind.update(temp);
            this.submitLoading = false;
            this.handleClose();
            this.$emit('onSave');
            this.$message.success('提交成功');
          } else {
            this.$message.error('请按照正确格式填写');
          }
        });
      },

      handleClose() {
        this.userInfo = {};
        this.$emit('onClose');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-edit {}
</style>
