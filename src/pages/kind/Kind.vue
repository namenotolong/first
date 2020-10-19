<template>
  <div class="user-manager">

    <!-- 工具栏 -->
    <div class="user-manager__header">
      <div class="title">
        <section-title name="分类列表" />
      </div>
      <div class="operation">
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit">新增分类</el-button>
        <el-button type="danger" icon="el-icon-minus" @click="handleDelete">批量删除</el-button>
      </div>
    </div>
    <div class="table-container">
      <div style="width: 50%" class="user-manager__table">
        <h2>一级目录</h2>
        <el-table
          :data="firstKinds"
          border
          highlight-current-row
          v-loading="tableFirstLoading"
          @selection-change="handleSelectedRows">
          <el-table-column type="selection" width="50px"/>
          <el-table-column label="图标" width="40px">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="80px"/>
          <el-table-column prop="createDate" label="添加时间" width="180px" sortable/>
          <el-table-column label="操作" width="170px">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row, 1)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="checkout(scope.row.children)">二级</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 50%" class="user-manager__table">
        <h2>二级目录</h2>
        <el-table
          :data="secondKinds"
          border
          highlight-current-row
          v-loading="tableSecondLoading"
          @selection-change="handleSelectedRows">
          <el-table-column type="selection" width="70px"/>
          <el-table-column prop="name" label="名称" width="80px"/>
          <el-table-column prop="createDate" label="添加时间" width="180px" sortable></el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row, 2)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


    <!-- 用户编辑/新增 -->
    <edit ref="edit"
      :kind="kind"
      :id="editId"
      :visible="editVisible"
      @onClose="handleClose"
      @onSave="handleSave" />

  </div>
</template>

<script>
  import api from '@/api';
  import { scroll } from '@/utils/core';
  import SectionTitle from '@/components/sectionTitle';
  import Edit from './components/Edit';

  export default {
    name: 'User',
    components: {
      SectionTitle,
      Edit
    },
    data() {
      return {
        secondKinds: [],
        firstKinds: [],
        tableFirstLoading: false,
        tableSecondLoading: false,
        total: 0,
        selectedRows: [],
        editId: '',
        editVisible: false,
        kind: {},
      }
    },
    created() {
      this.getKinds();
    },
    methods: {
      checkout(children) {
        this.secondKinds = children.map((item, index) => {
          return {
            id: item.id,
            name: item.kindName,
            icon: item.bar,
            createDate: this.$dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
        });
      },
      //获取一级列表
      async getKinds() {
        this.tableFirstLoading = true;
        const data = await api.kind.getKinds();
        this.firstKinds = data.map((item, index) => {
          return {
            id: item.id,
            name: item.kindName,
            icon: item.bar,
            children: item.children,
            level: 1,
            createDate: this.$dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
        });
        this.$refs.edit.firstKinds = this.firstKinds;
        this.tableFirstLoading = false;
        const scrollElement = document.querySelector('.inner-layout__page');
        scroll(scrollElement, 0, 800);
      },
      // 编辑/新增
      handleEdit(index, row, level) {
        this.editId = row ? row.id + '' : '';
        this.editId ? this.kind = row : '';
        if(row){
          this.kind.level = level;
        }
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
              await api.kind.remove({ id });
              this.$message.success('删除成功！');
              this.secondKinds = [];
              this.getKinds();
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
        this.getKinds();
      },
      // 关闭编辑模态窗
      handleClose() {
        this.editVisible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-container{
    display: flex;
  }
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
