<template>
  <div class="article-list">

    <div class="article-list__header">
      <div class="title">
        <section-title name="文章列表" />
      </div>

      <div class="operation">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增文章</el-button>
        <el-button type="danger" icon="el-icon-minus" @click="handleDelete">批量删除</el-button>
        <export-excel
          file-name="文章数据表"
          :header="['序号', '标题','作者','评论数','收藏数','点赞数','阅读数', '创建时间']"
          :filter-filed="['index', 'name','author','topicCount','storeCount','praiseCount','browseNum', 'createDate']"
          :data="articleList">
          导出表格
        </export-excel>
      </div>
    </div>

    <el-form :inline="true" :model="queryCondition">
      <el-form-item label="标题:">
        <el-input v-model="queryCondition.title" placeholder="请输入文章标题关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="作者:">
        <el-select
          clearable
          v-model="queryCondition.name"
          placeholder="请输入作者姓名关键字"
          filterable
          remote
          :remote-method="getRemoteUserList"
          default-first-option
          :loading="userLoading">
          <el-option v-for="(item,index) in userListOptions" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getArticleList">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="article-list__table">
      <el-table
        :data="articleList"
        border
        highlight-current-row
        v-loading="articleTableLoading"
        @selection-change="handleSelectedRows">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者" width="120px"></el-table-column>
        <el-table-column prop="topicCount" label="评论数" sortable width="100px"></el-table-column>
        <el-table-column prop="storeCount" label="收藏数" sortable width="100px"></el-table-column>
        <el-table-column prop="praiseCount" label="点赞数" sortable width="100px"></el-table-column>
        <el-table-column prop="browseNum" label="阅读数" sortable width="100px"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" sortable width="180px"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <router-link :to="`/article/edit/${scope.row.id}/${scope.row.index}`">
              <el-button type="text">编辑</el-button>
            </router-link>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="total"
      :page-number.sync="queryCondition.pageNum"
      :page-size.sync="queryCondition.pageSize"
      @pagination="getArticleList" />

  </div>

</template>

<script>
  import api from '@/api';
  import { scroll } from '@/utils/core';
  import tableMng from '@/utils/tableMng';
  import SectionTitle from '@/components/sectionTitle';
  import ExportExcel from '@/components/excel/exportExcel';
  import Pagination from '@/components/pagination';


  export default {
    name: 'ArticleList',
    components: {
      SectionTitle,
      ExportExcel,
      Pagination
    },
    data() {
      return {
        tableMng,
        userListOptions: [],
        userLoading: false,
        articleList: [],
        articleTableLoading: false,
        queryCondition: {
          title: '',
          name: '',
          pageNum: 1,
          pageSize: 20,
        },
        total: 0,
        selectedRows: [],
      }
    },
    created() {
      this.getArticleList();
    },
    methods: {
      // 获取文章列表
      async getArticleList() {
        this.articleTableLoading = true;
        const data = await api.article.getList({
          ...this.queryCondition
        })
        console.log(data)
        this.articleList = data.list.map((item, index) => {
          return {
            id: item.id,
            index: (this.queryCondition.pageNum - 1) * this.queryCondition.pageSize + index + 1,
            author: item.user.userName,
            createDate: item.updateTime,
            name: item.title,
            browseNum: item.visitCount,
            topicCount: item.topicCount,
            praiseCount: item.praiseCount,
            storeCount: item.storeCount,
          }
        });
        this.total = data.total;
        this.articleTableLoading = false;
        const scrollElement = document.querySelector('.inner-layout__page');
        scroll(scrollElement, 0, 800);
      },
      // 跳转到新建文章页面
      handleAdd() {
        this.$router.push('/article/add');
      },
      // 删除
      handleDelete(index, row) {
        let id = [];
        let name = [];
        if (row) {
          id = [row.id];
          name = [row.name];
        } else {
          id = this.selectedRows.map(row => row.id);
          name = this.selectedRows.map(row => row.name);
        }
        if (name.length === 0) {
          this.$message.warning('请选择要删除的文章！');
        } else {
          this.$confirm(`确定删除文章：“${name.join('，')}”？`, '提示', { type: 'warning', })
            .then(async () => {
              await api.article.remove({ id });
              this.$message.success('删除成功！');
              this.getArticleList();
            }).catch(() => {})
        }
      },
      // 多选
      handleSelectedRows(rows) {
        this.selectedRows = rows;
      },
      async getRemoteUserList(keyword) {
        this.userLoading = true;
        const data = await api.user.getList({ name: keyword });
        this.userListOptions = data.list.map(item => item.userName);
        this.userLoading = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-list {
    background-color: #fff;
    padding: 1em;

    .article-list__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .title,
      .operation {
        margin-bottom: 1em;
      }
    }

    .article-list__table {
      margin-bottom: 1em;
    }
  }
</style>
