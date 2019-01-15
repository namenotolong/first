<template>
    <div>
        <div v-for="item in form1.influenceCollect" :key="item.influencetType">
            <transition-group name="block" tag="div" v-show="form1.influenceType == item.influenceType">
                <div class="block-item" v-for="(subItem,subItemIndex) in item.influenceItem" :key="subItem.id">
                    <div class="block-item__index" v-text="subItemIndex + 1"></div>

                    <!-- 有的表是填年份，有的是填年月 -->
                    <el-form-item :label="subItem.label1" v-if="subItem.label1 == '年份'">
                        <el-date-picker class="w310" type="year" format="yyyy年" value-format="yyyy" :placeholder="'请选择' + subItem.label1"
                            v-model="subItem.value1"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="subItem.label1" v-else>
                        <el-date-picker class="w310" type="month" format="yyyy年MM月" value-format="yyyy-MM" :placeholder="'请选择' + subItem.label1"
                            v-model="subItem.value1"></el-date-picker>
                    </el-form-item>

                    <el-form-item :label="subItem.label2">
                        <el-input class="w310" v-model="subItem.value2"></el-input>
                    </el-form-item>
                    <el-form-item :label="subItem.label3">
                        <el-input class="w640" v-model="subItem.value3"></el-input>
                    </el-form-item>

                    <!-- 会议组织明细表有六个项要填 -->
                    <el-form-item :label="subItem.label6" v-if="subItem.label6">
                        <el-input class="w640" v-model="subItem.value6"></el-input>
                    </el-form-item>

                    <el-form-item class="margin-bottom0" :label="subItem.label4">
                        <el-input class="w310" v-model="subItem.value4"></el-input>
                    </el-form-item>
                    <el-form-item class="margin-bottom0" :label="subItem.label5">
                        <el-input class="w310" v-model="subItem.value5"></el-input>
                    </el-form-item>

                    <div class="block-item--remove" @click="removeBlock('influenceCollect',item.itemIndex,'influenceItem',subItemIndex)">
                        <span class="block-item--remove__inner"></span>
                    </div>
                </div>
                <div class="block-item--add" key="add" @click="addBlock('influenceCollect',item.itemIndex,'influenceItem')">点击新增影响力</div>
            </transition-group>
        </div>


        <el-form-item class="button--center">
            <el-button type="primary" round @click="previousStep">上一步</el-button>
            <el-button type="info" round @click="saveLocalInfo">保存</el-button>
            <el-button type="success" :loading="isLoading" round @click="submit">提交</el-button>
        </el-form-item>

    </div>
    </div>
</template>
<script>
    export default {
        data() {

        },
        methods() {

        }
    }
</script>
<style lang="scss" scoped>

</style>