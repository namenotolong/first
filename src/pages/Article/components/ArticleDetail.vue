<template>
    <div>
        <el-button type="primary" round :loading="publishLoading" @click="publish">发布</el-button>
        <el-button type="warning" round :loading="draftLoading" @click="publish">存草稿</el-button>
        <el-input v-model="articleDetail.title" placeholder="请输入文章标题"></el-input>
        <el-select v-model="articleDetail.type" placeholder="请选择文章类型" clearable>
            <el-option v-for="item in articleTypeList" :key="item.value" :label="item.value" :value="item.value"></el-option>
        </el-select>
        <tinymce></tinymce>
    </div>

</template>
<script>
    import {
        formatDate
    } from "../../../utils/util.js"
    import Tinymce from "../../../components/Tinymce/Tinymce.vue";
    export default {
        props: ["articleId"],
        components: {
            Tinymce
        },
        data() {
            return {
                articleDetail: {
                    author: "",
                    createDate: formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
                    title: "",
                    type: "",
                    content: ""
                },
                articleTypeList: [{
                    text: "新闻",
                    value: "新闻"
                }, {
                    text: "财经",
                    value: "财经"
                }, {
                    text: "娱乐",
                    value: "娱乐"
                }, {
                    text: "体育",
                    value: "体育"
                }, {
                    text: "科技",
                    value: "科技"
                }, {
                    text: "游戏",
                    value: "游戏"
                }],
                publishLoading:false,
                draftLoading:false,
            }
        },
        methods: {
            publish(){

            },
            draft(){

            }
        }
    }
</script>