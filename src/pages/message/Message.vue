<template>
  <div class="user-manager">

    <!-- 工具栏 -->
    <div class="user-manager__header">
      <div class="title">
        <section-title name="消息列表" />
      </div>
      <div class="operation">
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit">新增系统消息</el-button>
        <el-button type="danger" icon="el-icon-minus" @click="handleDelete">批量删除</el-button>
        <export-excel
          file-name="用户数据表"
          :header="['序号', '姓名', '邮箱','学校','年龄', '状态','性别', '角色', '注册时间', '累计消费额(元)']"
          :filter-filed="['index', 'name', 'email', 'gender', 'role', 'createDate', 'consume']"
          :data="messageList">
          导出表格
        </export-excel>
      </div>
    </div>

    <!-- 查询 -->
    <el-form :inline="true" :model="queryCondition">
      <el-form-item label="发送人:">
        <el-input v-model="queryCondition.from" placeholder="请输入发送人昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="接收人:">
        <el-input v-model="queryCondition.to" placeholder="请输入接收人昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="消息内容:">
        <el-input v-model="queryCondition.content" placeholder="请输入消息关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="评论:">
        <el-input v-model="queryCondition.common" placeholder="请输入评论关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="文章标题:">
        <el-input v-model="queryCondition.title" placeholder="请输入文章关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="消息类型:">
        <el-select v-model="queryCondition.types" placeholder="请选择角色" multiple clearable>
          <el-option v-for="item in tableMng.getTable('message')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getMessageList">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <div class="user-manager__table">
      <el-table
        :data="messageList"
        border
        highlight-current-row
        v-loading="tableLoading"
        @selection-change="handleSelectedRows">
        <el-table-column type="selection" width="50px"/>
        <el-table-column prop="index" label="序号" width="50px"/>
        <el-table-column prop="userName" label="发送人" width="80px"/>
        <el-table-column prop="toUserName" label="接收人" width="80px"/>
        <el-table-column prop="content" label="内容" width="120px"/>
        <el-table-column prop="type" label="消息类型" width="50px">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('message',scope.row.type)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50px">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('status',scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="对应评论" width="120px">
          <template slot-scope="scope">
            <el-link v-if="scope.row.articleId" @click="toArticle(scope.row.articleId)">{{scope.row.common}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="对应文章" width="120px">
          <template slot-scope="scope">
            <el-link v-if="scope.row.articleId" @click="toArticle(scope.row.articleId)">{{scope.row.title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发送时间" sortable></el-table-column>
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
      @pagination="getMessageList" />

    <!-- 用户编辑/新增 -->
    <edit
      :id="editId"
      :visible="editVisible"
      @onClose="handleClose"
      @onSave="handleSave" />

  </div>
</template>

<script>
  import api from '@/api';
  import { scroll } from '@/utils/core';
  import tableMng from '@/utils/tableMng';
  import SectionTitle from '@/components/sectionTitle';
  import ExportExcel from '@/components/excel/exportExcel';
  import Pagination from '@/components/pagination';
  import Edit from './components/Edit';

  export default {
    name: 'User',
    components: {
      SectionTitle,
      ExportExcel,
      Pagination,
      Edit
    },
    data() {
      return {
        tableMng,
        messageList: [],
        tableLoading: false,
        queryCondition: {
          from: '',
          to: '',
          types: [],
          pageNumber: 1,
          pageSize: 20,
          content: '',
          title: '',
          common: '',
        },
        total: 0,
        selectedRows: [],
        editId: '',
        editVisible: false,
      }
    },
    created() {
      this.getMessageList();
    },
    methods: {
      toArticle(id) {
        window.open("http://zhsdsb.top:8080/#/customer/detail/" + id);
      },
      //获取消息列表
      async getMessageList() {
        this.tableLoading = true;
        const data = await api.message.getList(this.queryCondition);
        console.log(data)
        this.messageList = data.list.map((item, index) => {
          return {
            id: item.id,
            index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize + index + 1,
            userName: item.userName,
            toUserName: item.toUserName,
            content: item.content,
            articleId: item.articleId,
            type: item.type,
            status: item.status,
            common: item.common,
            title: item.title,
            createTime: this.$dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
          }
        });
        this.total = data.total;
        this.tableLoading = false;
        const scrollElement = document.querySelector('.inner-layout__page');
        scroll(scrollElement, 0, 800);
      },
      // 编辑/新增
      handleEdit(index, row) {
        this.editId = row ? row.id + '' : '';
        this.editVisible = true;
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
          this.$message.warning('请选择要删除的用户！');
        } else {
          this.$confirm('确定删除?', '提示', { type: 'warning', })
            .then(async () => {
              await api.message.remove({ id });
              this.$message.success('删除成功！');
              this.getMessageList();
            }).catch(() => {})
        }
      },
      // 多选
      handleSelectedRows(rows) {
        this.selectedRows = rows;
      },
      // 保存
      handleSave() {
        this.handleClose();
        this.getMessageList();
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
