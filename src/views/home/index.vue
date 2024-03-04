<template>
  <div class="app-container">
    <div class="search-content">
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 10px"
        @click="openDialog('新建轮播')"
      >新建轮播
      </el-button>
      <add-dialog
        :dialog-visble="visible"
        :title="title"
        :edit-data="editData"
        @closeDialog="closeDialog"
        @refreshList="fetchData"
      />
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="图片链接" align="center">
        <template slot-scope="scope">
          {{ scope.row.imageData }}
        </template>
      </el-table-column>
      <el-table-column label="跳转链接" align="center">
        <template slot-scope="scope">
          {{ scope.row.href }}
        </template>
      </el-table-column>
      <el-table-column label="图片展示" align="center" width="400">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.imageData"
            style="width2100px;height:120px"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="openDialog('编辑轮播', scope.row)"
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
  </div>
</template>

<script>
import { getList, deleteBanner } from '@/api/banner'
import AddDialog from './components/addDialog'

export default {
  components: { AddDialog },
  data() {
    return {
      list: null,
      listLoading: true,
      title: '',
      editData: {},
      visible: false,
      value: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.visible = false
      this.listLoading = true
      getList()
        .then((response) => {
          this.list = response.list.filter((item) => item.type !== 2)
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    refresh(queryForm) {
      this.$refs[queryForm].resetFields()
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
      deleteBanner(data.id).then((res) => {
        this.fetchData()
        this.$message({ message: res.message, type: 'success' })
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
