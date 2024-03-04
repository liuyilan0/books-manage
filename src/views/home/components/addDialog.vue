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
        <el-form-item label="图片链接" prop="imageData">
          <el-input v-model="dataForm.imageData" maxlength="100" style="width: 380px" />
        </el-form-item>
        <el-form-item label="跳转链接" prop="desc">
          <el-input v-model="dataForm.href" maxlength="100" style="width: 380px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="save()"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBanner, editBanner } from '@/api/banner'

export default {
  name: 'AddDialog',
  props: ['dialogVisble', 'title', 'editData'],
  data() {
    return {
      dialogStatus: '',
      dataForm: {
        id: '',
        imageData: '',
        href: ''
      },
      rules: {
        imageData: [{ required: true, message: '请输入图片链接', trigger: 'blur' }]
      }
    }
  },
  watch: {
    editData() {
      this.dataForm = { ...this.editData }
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
          if (this.title === '新建轮播') {
            const data = { ...this.dataForm }
            addBanner(data).then(resp => {
              this.$emit('refreshList')
              this.$message({ message: resp.message, type: 'success' })
            })
          } else {
            const data = { ...this.dataForm }
            editBanner(data).then(resp => {
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
