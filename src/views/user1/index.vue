<template>
  <div class="app-container">
    <div class="search-content">
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 10px"
        @click="openDialog('新建用户')"
      >新建用户
      </el-button>
      <add-dialog
        :dialog-visble="visible"
        :title="title"
        :edit-data="editData"
        @closeDialog="closeDialog"
        @refreshList="fetchData"
      />
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
        <div class="create-btn">
          <el-form-item>
            <el-input
              v-model="queryParams.username"
              class="search-item"
              placeholder="请输入用户名搜索"
              clearable
            />
            <!-- <el-select
              v-model="queryParams.type"
              class="search-item"
              placeholder="请选择用户类型搜索"
              clearable
            >
              <el-option label="管理员" :value="1" />
              <el-option label="普通用户" :value="2" />
              <el-option label="传承人" :value="3" />
            </el-select> -->
            <!-- <el-select
              v-model="queryParams.status"
              class="search-item"
              placeholder="请选择状态搜索"
              clearable
            >
              <el-option label="正常" :value="1" />
              <el-option label="异常" :value="2" />
            </el-select> -->
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData(query.keywords)"> 查询 </el-button>
          <el-button icon="el-icon-refresh" @click="refresh('queryForm')">重置</el-button>
        </div>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="身份" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type === 1 ? '管理员' : scope.row.type === 2 ? '用户' : '传承人' }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="昵称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column> -->
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="介绍" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.intro }}
        </template>
      </el-table-column>
      <el-table-column label="成就" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.achive }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column class-name="status-col" label="状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>
            {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ? dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm') :'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="openDialog('编辑用户', scope.row)"
          >编辑
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再看看"
            icon="el-icon-info"
            icon-color="red"
            title="是否确认删除？"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              style="margin: 0 12px"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="query.pageNum"
      :limit.sync="query.pageRow"
      layout="total, prev, pager, next"
      :hide-on-single-page="value"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getList, deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination/index'
import AddDialog from './components/addDialog'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    status(status) {
      const statusMap = {
        1: '正常',
        2: '异常'
      }
      return statusMap[status]
    }
  },
  components: { Pagination, AddDialog },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,

      title: '',
      editData: {},
      visible: false,
      queryParams: {
        username: '',
        type: '1',
        status: ''
      },
      query: {
        pageRow: 10,
        pageNum: 1
      },
      value: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.query = { ...this.query, ...this.queryParams }
      this.query.type = '1'
      this.visible = false
      this.listLoading = true
      getList(this.query).then(res => {
        this.list = res.list
        this.total = res.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    refresh(queryForm) {
      this.$refs[queryForm].resetFields()
      this.queryParams = {
        username: '',
        type: '',
        status: ''
      }
      this.fetchData()
    },
    openDialog(title, data = null) {
      this.title = title
      this.visible = true
      this.editData = data || {}
    },
    closeDialog() {
      this.visible = false
    },
    handleDelete(data) {
      deleteUser(data.id).then(resp => {
        this.fetchData()
        this.$message({ message: resp.message, type: 'success' })
      })
    }
  }
}
</script>

<style scoped>
.app-container {
    height: calc(100vh - 80px);
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: white;
    overflow-x: hidden;
    overflow-y: auto;
}

.search-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.create-btn {
    margin-top: 10px;
}

.search-item {
    width: 180px;
    margin-left: 12px;
}
</style>
