<template>
    <div>
        <div class="handle">
            <div class="fr">
                <router-link to="/articleCreate">
                    <el-button class="handle-item" type="primary" round>创建文章</el-button>
                </router-link>
                <el-button class="handle-item" type="primary" round :loading="exportLoading" @click="exportArticle">导出文章</el-button>
                <router-link to="/articleCreate">
                    <el-button class="handle-item" type="primary" round>草稿箱</el-button>
                </router-link>
            </div>
            <el-input class="handle-item" v-model="queryCondition.title" placeholder="请输入文章标题" clearable style="width: 200px;"></el-input>
            <el-select class="handle-item" v-model="queryCondition.author" filterable placeholder="请选择作者(可搜索)"
                clearable>
                <el-option v-for="item in authorList" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
            <el-select class="handle-item" v-model="queryCondition.type" placeholder="请选择文章类型" clearable>
                <el-option v-for="item in articleTypeList" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
            <el-button class="handle-item" type="primary" round @click="getArticleList">搜索文章</el-button>
        </div>

        <el-table :data="currentPageList" border highlight-current-row v-loading="articleTableLoading">
            <el-table-column prop="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="author" label="作者" width="120px" :filters="authorList" :filter-method="filterAuthor"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" sortable width="180px"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="type" label="类型" width="120px" :filters="articleTypeList" :filter-method="filterType"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="browseNum" label="阅读数" sortable width="100px"></el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <router-link :to="'/articleEdit/' + scope.row.id">
                        <el-button type="primary" size="mini" plain>编辑</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" plain @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagination" :total="articleAmount" :current-page="queryCondition.currentPage" :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper" background @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
    </div>

</template>

<script>
    import {
        scroll
    } from "../../utils/util.js";
    import {
        getArticleList,
        getAuthorList
    } from "../../api/article.js";
    export default {
        name: "articleList",
        data() {
            return {
                articleList: [],
                authorList: [],
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
                articleTableLoading: false,
                exportLoading: false,
                queryCondition: {
                    title: "",
                    author: "",
                    type: "",
                    currentPage: 1,
                    pageSize: 20
                },
                articleAmount: 0,
            }
        },
        computed: {
            currentPageList() {
                const startIndex = (this.currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;
                return this.articleList.slice(startIndex, endIndex);
            },
        },
        created() {
            this.getArticleList(this.queryCondition);
            this.getAuthorList();
        },
        methods: {
            getArticleList(params) {
                this.articleTableLoading = true;
                getArticleList(params).then(res => {
                    this.articleList = res.articleList.map((item, index) => {
                        return {
                            id: item.id,
                            index: index + 1,
                            author: item.author,
                            createDate: item.createDate,
                            title: item.title,
                            type: item.type,
                            browseNum: item.browseNum,
                        }
                    });
                    this.articleAmount = res.articleList.length;
                    this.articleTableLoading = false;
                })
            },
            getAuthorList() {
                getAuthorList().then(res => {
                    this.authorList = res.authorList.map(item => {
                        return {
                            text: item,
                            value: item
                        }
                    })
                })
            },
            filterAuthor(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            filterType(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            exportArticle() {

            },
            deleteArticle(a, b) {

            },
            handleSizeChange(pageSize) {
                this.queryCondition.pageSize = pageSize;
            },
            handleCurrentChange(currentPage) {
                this.queryCondition.currentPage = currentPage;
                const scrollElement = document.querySelector(".page");
                scroll(scrollElement, 0, 300);

            }
        }
    }
</script>
<style lang="scss" scoped>
    .handle {
        .handle-item {
            margin-bottom: 10px;
        }
    }

    .pagination {
        margin-top: 10px;
    }
</style>