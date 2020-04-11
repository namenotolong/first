<template>
  <div class="user-manager">

    <!-- 工具栏 -->
    <div class="user-manager__header">
      <div class="title">
        <section-title name="用户列表" />
      </div>
      <div class="operation">
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit">新增用户</el-button>
        <el-button type="danger" icon="el-icon-minus" @click="handleDelete">批量删除</el-button>
        <export-excel
          file-name="用户数据表"
          :header="['序号', '姓名', '邮箱','学校','年龄', '状态','性别', '角色', '注册时间']"
          :filter-filed="['index', 'name', 'email','school','age','online', 'gender', 'role', 'createDate']"
          :data="userList">
          导出表格
        </export-excel>
      </div>
    </div>

    <!-- 查询 -->
    <el-form :inline="true" :model="queryCondition">
      <el-form-item label="昵称:">
        <el-input v-model="queryCondition.name" placeholder="请输入昵称关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="学校:">
        <el-input v-model="queryCondition.school" placeholder="请输入学校关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="queryCondition.email" placeholder="请输入邮箱关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="queryCondition.gender" placeholder="请选择性别" clearable>
          <el-option v-for="item in tableMng.getTable('gender')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:">
        <el-select v-model="queryCondition.roles" placeholder="请选择角色" multiple clearable>
          <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在线:">
        <el-select v-model="queryCondition.online" placeholder="请选择状态" clearable>
          <el-option v-for="item in tableMng.getTable('online')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getUserList">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <div class="user-manager__table">
      <el-table
        :data="userList"
        border
        highlight-current-row
        v-loading="tableLoading"
        @selection-change="handleSelectedRows">
        <el-table-column type="selection" width="50px"></el-table-column>
        <el-table-column prop="index" label="序号" width="50px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180px"></el-table-column>
        <el-table-column prop="school" label="学校" width="120px"></el-table-column>
        <el-table-column prop="age" label="年龄" width="50px" ></el-table-column>
        <el-table-column prop="online" label="状态" width="50px">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('online',scope.row.online)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50px">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('gender',scope.row.gender)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" width="80px">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('role',scope.row.role)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="注册时间" sortable></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
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
      @pagination="getUserList" />

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
        userList: [],
        tableLoading: false,
        queryCondition: {
          name: '',
          gender: '',
          roles: [],
          pageNumber: 1,
          pageSize: 20,
          school: '',
          email: '',
          online: '',
        },
        total: 0,
        selectedRows: [],
        editId: '',
        editVisible: false,
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      //获取用户列表
      async getUserList() {
        this.tableLoading = true;
        const data = await api.user.getList(this.queryCondition);
        this.userList = data.list.map((item, index) => {
          return {
            id: item.id,
            index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize + index + 1,
            name: item.userName,
            email: item.email,
            gender: item.gender,
            work: item.work,
            online: item.online,
            address: item.address,
            school: item.school,
            picture: item.picture,
            age: item.age,
            role: item.role,
            createDate: this.$dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss'),
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
          this.$confirm(`确定删除用户：“${name.join('，')}”？`, '提示', { type: 'warning', })
            .then(async () => {
              await api.user.remove({ id });
              this.$message.success('删除成功！');
              this.getUserList();
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
        this.getUserList();
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
