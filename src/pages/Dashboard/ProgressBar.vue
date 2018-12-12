<template>
    <el-card class="progress-card">
        <div slot="header">
            <span class="progress-card__header">项目进度</span>
        </div>
        <div class="progress-item">
            <p>进度一</p>
            <el-progress :percentage="10" color="#409eff"></el-progress>
        </div>
        <div class="progress-item">
            <p>进度二</p>
            <el-progress :percentage="70"></el-progress>
        </div>
        <div class="progress-item">
            <p>进度三</p>
            <el-progress :percentage="80" color="#8e71c7"></el-progress>
        </div>
        <div class="progress-item">
            <p>进度四</p>
            <el-progress :percentage="100" status="success"></el-progress>
        </div>




    </el-card>

</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .progress-card {
        .progress-card__header {
            font-size: 16px;
        }
    }
</style>