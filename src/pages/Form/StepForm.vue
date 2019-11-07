<template>
  <div class="form-step">
    <el-steps :active="pageIndex" align-center>
      <el-step v-for="step in steps" :key="step.title" :title="step.title" :status="step.status"></el-step>
    </el-steps>

    <el-form
      ref="form1"
      :model="form1"
      :rules="form1Rules"
      status-icon
      label-width="80px"
      label-position="left"
      v-show="pageIndex == 0">

      <el-form-item label="字段1" prop="value1">
        <el-input v-model="form1.value1" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="字段2" prop="value2">
        <el-input v-model="form1.value2" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="字段3" prop="value3">
        <el-input v-model="form1.value3" clearable placeholder="请输入"></el-input>
      </el-form-item>

      <div style="text-align:center;">
        <el-button type="primary" round @click="nextStep">下一步</el-button>
      </div>
    </el-form>

    <el-form ref="form2" :model="form2" :rules="form2Rules" status-icon label-width="80px" label-position="left"
      v-show="pageIndex == 1">

      <el-form-item label="字段11" prop="value1">
        <el-input v-model="form2.value1" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="字段22" prop="value2">
        <el-input v-model="form2.value2" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="字段33" prop="value3">
        <el-input v-model="form2.value3" clearable placeholder="请输入"></el-input>
      </el-form-item>

      <div style="text-align:center;">
        <el-button type="primary" round @click="prevStep">上一步</el-button>
        <el-button type="primary" round @click="nextStep">下一步</el-button>
      </div>
    </el-form>

    <el-form ref="form3" :model="form3" :rules="form3Rules" status-icon label-width="80px" label-position="left"
      v-show="pageIndex == 2">

      <el-form-item label="字段111" prop="value1">
        <el-input v-model="form3.value1" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="字段222" prop="value2">
        <el-input v-model="form3.value2" clearable placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="字段333" prop="value3">
        <el-input v-model="form3.value3" clearable placeholder="请输入"></el-input>
      </el-form-item>

      <div style="text-align:center;">
        <el-button type="primary" round @click="prevStep">上一步</el-button>
        <el-button type="success" round @click="submit" :loading="submitLoading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'StepForm',

    data() {
      return {
        form1: {
          value1: '',
          value2: '',
          value3: ''
        },
        form1Rules: {
          value1: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }],
          value2: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }],
          value3: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }]
        },
        form2: {
          value1: '',
          value2: '',
          value3: ''
        },
        form2Rules: {
          value1: [{
            required: true,
            message: '请填写名称',
            trigger: 'blur'
          }],
          value2: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }],
          value3: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }]
        },
        form3: {
          value1: '',
          value2: '',
          value3: ''
        },
        form3Rules: {
          value1: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }],
          value2: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }],
          value3: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          }]
        },
        submitLoading: false,
        pageIndex: 0,
        steps: [{
          title: '步骤1',
          status: 'finish'
        }, {
          title: '步骤2',
          status: 'wait'
        }, {
          title: '步骤3',
          status: 'wait'
        }],
      }
    },
    methods: {
      nextStep() {
        this.stepValid();
        this.pageIndex++;
        this.steps[this.pageIndex].status = 'finish';
      },
      prevStep() {
        this.stepValid();
        this.pageIndex--;
        this.steps[this.pageIndex].status = 'finish';
      },
      stepValid() {
        const currentStep = this.pageIndex;
        const formName = 'form' + (currentStep + 1);
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.steps[currentStep].status = 'success';
          } else {
            this.steps[currentStep].status = 'error';
          }
        })
      },
      submit() {
        this.submitLoading = true;
        let form1 = this.form1;
        let form2 = this.form2;
        let form3 = this.form3;
        let valid1 = false;
        let valid2 = false;
        let valid3 = false;
        this.$refs.form1.validate(valid => {
          valid1 = valid;
        })
        this.$refs.form2.validate(valid => {
          valid2 = valid;
        })
        this.$refs.form3.validate(valid => {
          valid3 = valid;
        })
        if (valid1 && valid2 && valid3) {
          this.$message.success('提交成功！');
        } else {
          this.$message.error('内容填写有误！');
        }
        this.submitLoading = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .form-step {
    width: 50%;
    min-width: 500px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;

    .el-steps {
      margin-bottom: 20px;
    }

    .el-button {
      width: 80px;
    }
  }
</style>
