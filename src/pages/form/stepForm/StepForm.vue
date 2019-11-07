<template>
  <div class="form-step" :key="pageKey">
    <el-steps :active="stepNumber" align-center>
      <el-step
        v-for="step in steps"
        :key="step.title"
        :title="step.title"
        :description="step.description"
        :status="step.status" />
    </el-steps>

    <step-one v-show="stepNumber === 0" @onStep="handleStep" />
    <step-two v-show="stepNumber === 1" @onStep="handleStep" @onPrevStep="handlePrevStep" />
    <step-three v-show="stepNumber === 2" @onReload="handleRload" />
  </div>
</template>

<script>
  import StepOne from './components/StepOne';
  import StepTwo from './components/StepTwo';
  import StepThree from './components/StepThree';

  export default {
    // name: 'StepForm',
    components: {
      StepOne,
      StepTwo,
      StepThree
    },
    data() {
      return {
        pageKey: 0,
        submitLoading: false,
        stepNumber: 0,
        steps: [{
          title: '基本信息',
          status: 'process',
          description: '请填写用户基本信息'
        }, {
          title: '资料上传',
          status: 'wait',
          description: '请上传认证资料'
        }, {
          title: '提交结果',
          status: 'wait'
        }],
      }
    },
    created(){
      console.log('shuax')
    },
    destroyed() {
      console.log(33)
    },
    methods: {
      handleStep(result) {
        if (result) {
          this.steps[this.stepNumber].status = 'success';
          this.steps[++this.stepNumber].status = 'process';
        } else {
          this.$message.error('信息填写有误！');
          this.steps[this.stepNumber].status = 'error';
        }
      },
      handlePrevStep() {
        this.steps[this.stepNumber].status = 'wait';
        this.steps[--this.stepNumber].status = 'process';
      },
      handleRload() {
        this.pageKey = +new Date();
        console.log(this.pageKey)

      },
      nextStep() {
        this.stepValid();
        this.stepNumber++;
        this.steps[this.stepNumber].status = 'finish';
      },
      prevStep() {
        this.stepValid();
        this.stepNumber--;
        this.steps[this.stepNumber].status = 'finish';
      },
      stepValid() {
        const currentStep = this.stepNumber;
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
  }
</style>
