<template>
    <div>
        <div class="handle">
            <div class="fr">
                <el-button class="handle-item" type="primary" round :loading="exportLoading" @click="exportArticle">导出表格</el-button>
            </div>
            <el-select class="handle-item" v-model="queryCondition.name" filterable placeholder="请输入用户姓名(可搜索)"
                clearable>
                <el-option v-for="item in authorList" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
            <el-button class="handle-item" type="primary" round @click="getArticleList">搜索用户</el-button>
        </div>

        <el-table :data="articleList" border highlight-current-row v-loading="articleTableLoading">
            <el-table-column prop="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="author" label="姓名" width="120px" :filters="authorList" :filter-method="filterAuthor"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="type" label="角色" width="120px" :filters="articleTypeList" :filter-method="filterType"
                filter-placement="bottom"></el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <router-link :to="'/articleEdit/' + scope.row.id + '/' + scope.row.index">
                        <el-button type="primary" size="mini" plain>编辑</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" plain @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagination" :total="articleAmount" :current-page="queryCondition.currentPageNum"
            :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper"
            background @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
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
        name: "ArticleList",
        data() {
            return {
                userList: [],
                articleTableLoading: false,
                exportLoading: false,
                queryCondition: {
                    title: "",
                    author: "",
                    type: "",
                    currentPageNum: 1,
                    pageSize: 20
                },
                articleAmount: 0,
            }
        },
        created() {
            this.getArticleList();
            this.getAuthorList();
        },
        methods: {
            getArticleList() {
                this.articleTableLoading = true;
                getArticleList(this.queryCondition).then(res => {
                    this.articleList = res.data.articleList.map((item, index) => {
                        return {
                            id: item.id,
                            index: (this.queryCondition.currentPageNum - 1) * this.queryCondition.pageSize +
                                index + 1,
                            author: item.author,
                            createDate: item.createDate,
                            title: item.title,
                            type: item.type,
                            browseNum: item.browseNum,
                        }
                    });
                    this.articleAmount = res.data.articleAmount;
                    this.articleTableLoading = false;
                    const scrollElement = document.querySelector(".page");
                    scroll(scrollElement, 0, 300);
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
            exportArticle() {

            },
            deleteArticle(index, row) {
                this.$confirm(`确认删除文章“${row.title}”？`, "提示", {
                    type: 'warning',
                }).then(() => {
                    this.$message.success("删除成功！");
                }).catch(() => {

                })
            },
            handleSizeChange(pageSize) {
                this.queryCondition.pageSize = pageSize;
                this.getArticleList();
            },
            handleCurrentChange(currentPageNum) {
                this.queryCondition.currentPageNum = currentPageNum;
                this.getArticleList();
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
