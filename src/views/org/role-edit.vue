<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="dataForm.description"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sortNumber">
                <el-input v-model.number="dataForm.sortNumber" prefix-icon="fa fa-sort-numeric-asc"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="permissions">
                <el-tree
                  v-model="dataForm.permissions"
                  :data="treeData"
                  node-key="id"
                  ref="tree"
                  :props="props"
                  :default-checked-keys="treeDataChecked"
                  check-strictly="true"
                  default-expand-all="true"
                  show-checkbox>
                </el-tree>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">确认</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            treeData:[],
            treeDataChecked:[],
            dataForm: {
                permissions:'',
                id:'',
                name: '',
                description:'',
                sortNumber: ''
            },
            props: {
            value: 'id',
            label: 'label',
            children: 'children'
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '名称长度在 1 到 20 个汉字内', trigger: 'blur' }
                ],
                sortNumber: [
                    { required: true, message: '请输入排序' , trigger: 'blur'},
                    { type: 'number', message: '必须为数字！' }
                ]
            }
        };
    },
    created(){
        this.initTreeData();
        this.initTreeCheckedData();
        this.initForm();
    },
    methods: {
        initForm(){
            let id = this.$route.params.id;
            this.getRequest('/system/org/role/details',{id:id}).then(resp => {
                if (resp && resp.code==200) {
                    this.dataForm = resp.data;
                }
            })
        },
        initTreeData(){
            // 菜单数据源
            this.getRequest('/system/org/permission/get-tree-options', {}).then(resp => {
                if (resp.code == 200) {
                this.treeData = resp.data;
                }
            })
        },
        initTreeCheckedData(){
            let id = this.$route.params.id;
            this.getRequest('/system/org/role/get-role-permissoion-ids', {roleId:id}).then(resp => {
                if (resp.code == 200) {
                this.treeDataChecked = resp.data;
                }
            })
        },
        submitForm(dataForm) {
            this.dataForm.permissions = this.$refs.tree.getCheckedKeys();
            this.$refs[dataForm].validate((valid) => {
            if (valid) {
                this.putRequest('/system/org/role/update', this.dataForm).then(resp => {
                    if (resp && resp.code==200) {
                        this.$router.push('/org/role-list');
                    }
                })
            } else {
                
                return false;
            }
            });
        },
        resetForm(dataForm) {
            this.$refs[dataForm].resetFields();
        }
    }
  }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
</style>