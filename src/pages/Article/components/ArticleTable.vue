<template>
    <div>
        <div class="handle">
            <div class="fr">
                <export-excel file-name="文章列表" :data="articleList">导出表格</export-excel>
            </div>
            <el-input class="handle-item" v-model="queryCondition.title" placeholder="请输入文章标题关键字" clearable style="width: 200px;"></el-input>
            <el-select class="handle-item" v-model="queryCondition.author" filterable multiple clearable placeholder="请选择作者(可搜索)">
                <el-option v-for="item in authorList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select class="handle-item" v-model="queryCondition.type" multiple clearable placeholder="请选择文章类型">
                <el-option v-for="item in articleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button class="handle-item" type="primary" round @click="getArticleList">搜索文章</el-button>
        </div>

        <el-table :data="articleList" border highlight-current-row v-loading="articleTableLoading">
            <el-table-column prop="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="author" label="作者" width="120px" :filters="authorList" :filter-method="filter"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" sortable width="180px"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="type" label="类型" width="120px" :filters="articleTypeList" :filter-method="filter"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="browseNum" label="阅读数" sortable width="100px"></el-table-column>
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
    } from "../../../utils/util.js";
    import {
        getArticleList,
        getAuthorList
    } from "../../../api/article.js";
    import ExportExcel from "../../../components/ExportExcel/ExportExcel.vue";
    export default {
        name: "ArticleList",
        components: {
            ExportExcel
        },
        data() {
            return {
                articleList: [],
                authorList: [],
                articleTypeList: [{
                    label: "新闻",
                    value: "新闻"
                }, {
                    label: "财经",
                    value: "财经"
                }, {
                    label: "娱乐",
                    value: "娱乐"
                }, {
                    label: "体育",
                    value: "体育"
                }, {
                    label: "科技",
                    value: "科技"
                }, {
                    label: "游戏",
                    value: "游戏"
                }],
                articleTableLoading: false,
                queryCondition: {
                    title: "",
                    author: [],
                    type: [],
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
                            label: item,
                            value: item
                        }
                    })
                })
            },
            filter(value, row, column) {
                const property = column['property'];
                return row[property] === value;
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