<template>
  <div class="userTable">
    <el-table
      :data="tableData"
      stripe
      height="424"
      style="width: 100%"
    >
      <el-table-column
        class-name="userUsername"
        prop="username"
        label="用户名"
        width="150"
      >
        <template slot-scope="scope">
          <img class="userImg" :src="scope.row.avatar" alt="">
          {{ (scope.row.username).substring(0,12) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="userStatus"
        prop="status"
        label="类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1" class="orangeBgColor">管理员</span>
          <span v-if="scope.row.type === 2" class="greenBgColor">用户</span>
          <span v-if="scope.row.type === 3" class="lightGreenBgColor">传承人</span>
          <span v-if="scope.row.type === 4" class="lightBlueBgColor">其他</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getUserTableList } from '@/api/charts'

export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getUserTableList({}).then(res => {
        this.pageTotal = res.total
        this.tableData = res.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userTable {
  .userImg {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
}
</style>
