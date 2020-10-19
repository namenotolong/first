<template>
  <div class="user-manager">

    <!-- 工具栏 -->
    <div class="user-manager__header">
      <div class="title">
        <section-title name="评论列表" />
      </div>
      <div class="operation">
        <el-button type="danger" icon="el-icon-minus" @click="handleDelete">批量删除</el-button>
        <export-excel
          file-name="评论数据表"
          :header="['序号', '发送人', '接收人','内容','文章','发送时间']"
          :filter-filed="['index', 'from', 'to', 'content', 'title', 'createDate']"
          :data="topicList">
          导出表格
        </export-excel>
      </div>
    </div>

    <!-- 查询 -->
    <el-form :inline="true" :model="queryCondition">
      <el-form-item label="发送人:">
        <el-input v-model="queryCondition.from" placeholder="请输入昵称关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="接收人:">
        <el-input v-model="queryCondition.to" placeholder="请输入学校关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <el-input v-model="queryCondition.content" placeholder="请输入学校关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="文章标题:">
        <el-input v-model="queryCondition.title" placeholder="请输入学校关键字" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getTopicList">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <div class="user-manager__table">
      <el-table
        :data="topicList"
        border
        highlight-current-row
        v-loading="tableLoading"
        @selection-change="handleSelectedRows">
        <el-table-column type="selection" width="50px"></el-table-column>
        <el-table-column prop="index" label="序号" width="50px"></el-table-column>
        <el-table-column prop="from" label="发送人" width="80px"></el-table-column>
        <el-table-column prop="to" label="接收人" width="80px"></el-table-column>
        <el-table-column prop="content" label="内容" width="180px"></el-table-column>
        <el-table-column prop="title" label="文章" width="120px">
          <template slot-scope="scope">
            <el-link @click="toArticle(scope.row.articleId)">{{scope.row.title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="发表时间" sortable></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <pagination
      :total="total"
      :page-number.sync="queryCondition.pageNumber"
      :page-size.sync="queryCondition.pageSize"
      @pagination="getTopicList" />
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
    name: 'topic',
    components: {
      SectionTitle,
      ExportExcel,
      Pagination,
    },
    data() {
      return {
        tableMng,
        topicList: [],
        tableLoading: false,
        queryCondition: {
          from: '',
          pageNumber: 1,
          pageSize: 20,
          to: '',
          content: '',
          title: '',
        },
        total: 0,
        selectedRows: [],
        editId: '',
        editVisible: false,
      }
    },
    created() {
      this.getTopicList();
    },
    methods: {
      toArticle(id) {
        window.open("http://zhsdsb.top:8080/#/customer/detail/" + id);
      },
      //获取topic列表
      async getTopicList() {
        this.tableLoading = true;
        const data = await api.topic.getList(this.queryCondition);
        this.topicList = data.list.map((item, index) => {
          return {
            id: item.id,
            index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize + index + 1,
            from: item.userName,
            to: item.toUserName,
            title: item.title,
            content: item.content,
            articleId: item.articleId,
            createDate: this.$dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
          }
        });
        this.total = data.total;
        this.tableLoading = false;
        const scrollElement = document.querySelector('.inner-layout__page');
        scroll(scrollElement, 0, 800);
      },

      // 删除
      handleDelete(index, row) {
        let id = [];
        let name = [];
        if (row) {
          id = [row.id];
          name = [row.content];
        } else {
          id = this.selectedRows.map(row => row.id);
          name = this.selectedRows.map(row => row.content);
        }
        if (name.length === 0) {
          this.$message.warning('请选择要删除的评论！');
        } else {
          this.$confirm(`确定删除内容：“${name.join('，')}”？`, '提示', { type: 'warning', })
            .then(async () => {
              await api.topic.remove({ id });
              this.$message.success('删除成功！');
              this.getTopicList();
            }).catch(() => {})
        }
      },
      // 多选
      handleSelectedRows(rows) {
        this.selectedRows = rows;
      },
      // 关闭编辑模态窗
      handleClose() {
        this.editVisible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-manager {
    background-color: #fff;
    padding: 1em;

    .user-manager__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .title,
      .operation {
        margin-bottom: 1em;
      }
    }

    .user-manager__table {
      margin-bottom: 1em;
    }
  }
</style>
