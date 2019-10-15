<template>
  <div class="article-list">

    <div class="article-list__header">
      <table-title name="文章列表" />
      <div>
        <!-- <el-button type="primary" round icon="el-icon-plus" @click="handleEdit">新增文章</el-button> -->
        <el-button type="danger" round icon="el-icon-minus" @click="handleDeleteBatch">批量删除</el-button>
        <export-excel file-name="文章列表" :header="excelHeader" :filter-filed="filterFiled" :data="articleList">导出表格</export-excel>
      </div>
    </div>

    <div class="article-list__search">
      <el-form :inline="true" :model="queryCondition">
        <el-form-item label="标题:">
          <el-input v-model="queryCondition.title" placeholder="请输入文章标题关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者:">
          <el-input v-model="queryCondition.author" placeholder="请输入作者姓名关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型:">
          <el-select v-model="queryCondition.type" placeholder="请选择文章类型" filterable multiple clearable>
            <el-option v-for="item in articleTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round icon="el-icon-search" @click="getArticleList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="article-list__table">
      <el-table
        :data="articleList"
        border
        highlight-current-row
        v-loading="articleTableLoading">
        <el-table-column prop="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="author" label="作者" width="120px"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" sortable width="180px"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="type" label="类型" width="120px"></el-table-column>
        <el-table-column prop="browseNum" label="阅读数" sortable width="100px"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <router-link :to="`/article/articleEdit/${scope.row.id}/${scope.row.index}`">
              <el-button type="text" plain>编辑</el-button>
            </router-link>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      :total="total"
      :page-number.sync="queryCondition.pageNumber"
      :page-size.sync="queryCondition.pageSize"
      @pagination="getArticleList" />

  </div>

</template>

<script>
  import codeMng from '@/assets/codeMng';
  import api from '@/api';
  import { scroll } from '@/utils/core';
  import TableTitle from '@/components/table/tableTitle';
  import ExportExcel from '@/components/excel/exportExcel';
  import Pagination from '@/components/table/pagination';

  export default {
    name: 'ArticleList',
    components: {
      TableTitle,
      ExportExcel,
      Pagination
    },
    data() {
      return {
        articleList: [],
        excelHeader: ['序号', '作者', '创建时间', '标题', '类型', '阅读数'],
        filterFiled: ['index', 'author', 'createDate', 'title', 'type', 'browseNum'],
        authorList: [],
        articleTypes: codeMng.getTable('articleType'),
        articleTableLoading: false,
        queryCondition: {
          title: '',
          author: '',
          type: [],
          pageNumber: 1,
          pageSize: 20
        },
        total: 0,
      }
    },
    created() {
      this.getArticleList();
    },
    methods: {
      getArticleList() {
        this.articleTableLoading = true;
        api.article.getList(this.queryCondition).then(res => {
          this.articleList = res.data.articleList.map((item, index) => {
            return {
              id: item.id,
              index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize +
                index + 1,
              author: item.author,
              createDate: item.createDate,
              title: item.title,
              type: item.type,
              browseNum: item.browseNum,
            }
          });
          this.total = res.data.total;
          this.articleTableLoading = false;
          const scrollElement = document.querySelector('.inner-layout__page');
          scroll(scrollElement, 0, 800);
        })
      },
      filter(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleDeleteBatch(index, row) {
        this.$confirm(`确认删除文章“${row.title}”？`, '提示', {
          type: 'warning',
        }).then(() => {
          this.$message.success('删除成功！');
        }).catch(() => {

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-list {
    background-color: #fff;
    padding: 20px;

    .article-list__header {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      justify-content: space-between;
    }

    .article-list__table {
      margin-bottom: 20px;
    }
  }
</style>
