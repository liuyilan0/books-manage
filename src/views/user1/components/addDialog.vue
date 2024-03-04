<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisble"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="center" label-width="120px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dataForm.username" maxlength="50" show-word-limit style="width: 380px" :disabled="title !== '新建用户'" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" maxlength="50" show-word-limit style="width: 380px" />
        </el-form-item>
        <!-- <el-form-item label="身份" prop="type">
          <el-select v-model="dataForm.type" placeholder="请选择用户类型" style="width: 380px">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
            <el-option label="传承人" :value="3" />
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item label="昵称" prop="name">
          <el-input v-model="dataForm.nickname" maxlength="50" show-word-limit style="width: 380px" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="dataForm.avatar" maxlength="200" show-word-limit style="width: 380px" />
        </el-form-item> -->
        <el-form-item label="联系方式" prop="name">
          <el-input v-model="dataForm.phone" maxlength="50" show-word-limit style="width: 380px" />
        </el-form-item>
        <!-- <el-form-item label="介绍" prop="name">
          <el-input v-model="dataForm.intro" maxlength="200" show-word-limit style="width: 380px" />
        </el-form-item>
        <el-form-item label="成就" prop="name">
          <el-input v-model="dataForm.achive" maxlength="300" show-word-limit style="width: 380px" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="dataForm.status" placeholder="请选择用户状态" style="width: 380px">
            <el-option label="正常" :value="1" />
            <el-option label="异常" :value="2" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="save()"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, editUser } from '@/api/user'

export default {
  name: 'AddDialog',
  props: ['dialogVisble', 'title', 'editData'],
  data() {
    return {
      dialogStatus: '',
      dataForm: {
        username: '',
        type: 1,
        nickname: '',
        phone: '',
        intro: '',
        achive: '',
        status: 1,
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户名密码', trigger: 'change' }]
      }
    }
  },
  watch: {
    editData() {
      this.dataForm = { ...this.editData }
      this.dataForm.type = 1
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog')
    },

    /* 新建、编辑 */
    save() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          if (this.title === '新建用户') {
            const data = { ...this.dataForm }
            addUser(data).then(resp => {
              this.$emit('refreshList')
              this.$message({ message: resp.message, type: 'success' })
            })
          } else {
            const data = { ...this.dataForm }
            editUser(data).then(resp => {
              this.$emit('refreshList')
              this.$message({ message: resp.message, type: 'success' })
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped></style>
