<template>
  <div class="user-manager">

    <div class="user-manager__header">
      <section-title name="用户列表" />
      <div>
        <el-button type="primary" round icon="el-icon-plus" @click="handleEdit">新增用户</el-button>
        <el-button type="danger" round icon="el-icon-minus" @click="handleDeleteBatch">批量删除</el-button>
        <export-excel file-name="用户列表" :header="excelHeader" :filter-filed="filterFiled" :data="userList">导出表格</export-excel>
      </div>
    </div>

    <div class="user-manager__search">
      <el-form :inline="true" :model="queryCondition">
        <el-form-item label="姓名:">
          <el-input v-model="queryCondition.name" placeholder="请输入用户姓名关键字" clearable></el-input>
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
        <el-form-item>
          <el-button type="primary" round icon="el-icon-search" @click="getUserList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="user-manager__table">
      <el-table
        :data="userList"
        border
        highlight-current-row
        v-loading="userTableLoading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄" width="120px" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" width="120px">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('gender',scope.row.gender)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <span>{{tableMng.getNameById('role',scope.row.role)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="registerDate" label="注册时间" sortable></el-table-column>
        <el-table-column prop="consume" label="累计消费额(元)" width="160px" sortable></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      :total="total"
      :page-number.sync="queryCondition.pageNumber"
      :page-size.sync="queryCondition.pageSize"
      @pagination="getUserList" />

    <user-detail></user-detail>

  </div>
</template>

<script>
  import api from '@/api';
  import bus from '@/utils/bus';
  import { scroll } from '@/utils/core';
  import tableMng from '@/utils/tableMng';
  import SectionTitle from '@/components/sectionTitle';
  import ExportExcel from '@/components/excel/exportExcel';
  import Pagination from '@/components/pagination';
  import UserDetail from './components/UserDetail';

  export default {
    components: {
      SectionTitle,
      ExportExcel,
      Pagination,
      UserDetail
    },
    data() {
      return {
        tableMng,
        userList: [],
        excelHeader: ['序号', '姓名', '年龄', '性别', '角色', '注册时间', '累计消费额(元)'],
        filterFiled: ['index', 'name', 'age', 'gender', 'role', 'registerDate', 'consume'],
        userTableLoading: false,
        queryCondition: {
          name: '',
          gender: '',
          roles: [],
          pageNumber: 1,
          pageSize: 20
        },
        total: 0,
        multipleSelection: []
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      //获取用户列表
      async getUserList() {
        this.userTableLoading = true;
        const response = await api.user.getList(this.queryCondition)
        this.userList = response.data.list.map((item, index) => {
          return {
            id: item.id,
            index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize + index + 1,
            name: item.name,
            age: item.age,
            gender: item.gender,
            role: item.role,
            registerDate: item.registerDate,
            consume: item.consume
          }
        });
        this.total = response.data.total;
        this.userTableLoading = false;
        const scrollElement = document.querySelector('.inner-layout__page');
        scroll(scrollElement, 0, 800);
      },
      // 批量删除
      handleDeleteBatch() {
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请勾选要删除的用户！');
        } else {
          const names = this.multipleSelection.map(row => row.name)
          this.$confirm(`确认删除用户“${names.join('，')}”？`, '提示', {
            type: 'warning',
          }).then(() => {
            this.getUserList().then(res => {
              this.$message.success('删除成功！');
            });
          }).catch(() => {

          })
        }
      },
      // 编辑用户
      handleEdit(index, row) {
        if (!row) {
          row = {};
        }
        bus.$emit('userDetail', row.id)
      },
      // 删除用户
      handleDelete(index, row) {
        this.$confirm(`确认删除用户“${row.name}”？`, '提示', {
          type: 'warning',
        }).then(() => {
          this.getList();
          this.$message.success('删除成功！');
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      transmitData() {
        const header = this.tableHeader;
        return this.userList.map(item => {
          delete item.id;
          const values = Object.values(item);
          let newItem = {};
          header.forEach((item, index) => {
            newItem[header[index]] = values[index];
          })
          return newItem;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-manager {
    background-color: #fff;
    padding: 20px;

    .user-manager__header {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      justify-content: space-between;
    }

    .user-manager__table {
      margin-bottom: 20px;
    }
  }
</style>
