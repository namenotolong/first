<template>
    <div>
        <div class="handle">
            <div class="fr">
                <el-button class="handle-item" type="primary" round @click="createArticle">创建文章</el-button>
                <el-button class="handle-item" type="primary" round :loading="exportLoading" @click="exportArticle">导出文章</el-button>
            </div>
            <el-input class="handle-item" v-model="searchCondition.title" placeholder="请输入文章标题" clearable style="width: 200px;"></el-input>
            <el-select class="handle-item" v-model="searchCondition.author" filterable placeholder="请选择作者(可搜索)"
                clearable>
                <el-option v-for="item in authorList" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
            <el-select class="handle-item" v-model="searchCondition.type" filterable placeholder="请选择文章类型(可搜索)"
                clearable>
                <el-option v-for="item in typeList" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
            <el-button class="handle-item" type="primary" round @click="searchArticle">搜索文章</el-button>
        </div>

        <el-table :data="currentPageList" border highlight-current-row v-loading="articleTableLoading">
            <el-table-column prop="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="author" label="作者" width="120px" :filters="authorList" :filter-method="filterAuthor"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" sortable width="180px"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="type" label="类型" width="120px" :filters="typeList" :filter-method="filterType"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="browseNum" label="阅读数" sortable width="100px"></el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="editArticle(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" plain @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagination" :total="articleNum" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
    </div>

</template>

<script>
    import {
        getArticleList
    } from "../../api/article.js";
    export default {
        name:"articleList",
        data() {
            return {
                articleList: [],
                authorList: [],
                typeList: [],
                articleTableLoading: false,
                exportLoading: false,
                searchCondition: {
                    tltle: "",
                    author: "",
                    type: ""
                },
                articleNum: 0,
                currentPage: 1,
                pageSize: 20
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
            this.getArticleList();
        },
        methods: {
            getArticleList() {
                this.articleTableLoading = true;
                getArticleList().then(res => {
                    this.articleList = res.articleList;
                    this.articleNum = res.articleList.length;
                    this.authorList = res.authorList.map(item => {
                        return {
                            text: item,
                            value: item
                        }
                    })
                    this.typeList = res.typeList.map(item => {
                        return {
                            text: item,
                            value: item
                        }
                    })
                    this.articleTableLoading = false;
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
            searchArticle() {

            },
            createArticle() {

            },
            exportArticle() {

            },
            editArticle() {

            },
            deleteArticle() {

            },
            currentPageListChange() {

            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            handleCurrentChange(currentPage) {
                document.getElementsByClassName("page")[0].scrollTop = 0;
                this.currentPage = currentPage;
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