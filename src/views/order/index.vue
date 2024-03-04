<template>
  <div class="app-container">
    <div class="search-content">
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
        <div class="create-btn">
          <el-form-item>
            <el-input
              v-model="queryParams.username"
              class="search-item"
              placeholder="请输入用户名搜索"
              clearable
            />
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
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单id" width="200">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品Id" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsId }}
        </template>
      </el-table-column>
      <el-table-column label="商品名" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsName }}
        </template>
      </el-table-column>
      <el-table-column label="订单总额" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
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
import { getList, deleteOrder } from '@/api/order'
import Pagination from '@/components/Pagination/index'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,

      title: '',
      editData: {},
      visible: false,
      queryParams: {
        username: ''
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
      this.listLoading = true
      this.visible = false
      getList(this.query).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    refresh(queryForm) {
      this.$refs[queryForm].resetFields()
      this.queryParams = {
        username: ''
      }
      this.fetchData()
    },
    handleDelete(data) {
      deleteOrder(data).then(resp => {
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
