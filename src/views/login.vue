<template>
    <div class="login" :style="backgourndStyle" >
        <div style="height:160px"> </div>
        <div>
            <div style="width:58%;float:left">.</div>
            <div style="width:42%;float:left">
                <el-form :model="loginForm" :rules="rules" ref="loginForm"   
                    v-loading="loading"
                    element-loading-text="正在登录..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    class="loginContainer">
                    <h3 class="loginTitle">欢迎使用微图书平台</h3>
                    <el-form-item prop="userId">
                        <el-input v-model="loginForm.userId" placeholder="用户名" prefix-icon="el-icon-s-custom"></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input type="password" placeholder="密码" v-model="loginForm.pwd"  @keydown.enter.native="submitForm('loginForm')" prefix-icon="el-icon-key"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right">
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" size="medium">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'login',
        data(){
            return{
                loading: false,
                loginForm: {
                    userId: 'admin',
                    pwd: 'pass',
                    remenber: 1
                },
                rules: {
                    userId: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            backgourndStyle: function() {
                // 计算body可用高度
                let cHeight = window.outerHeight - (window.outerHeight - window.innerHeight)
                // 计算背景图
                let imgName = ["https://cdn.pixabay.com/photo/2020/09/19/15/40/books-5584811_960_720.jpg"]
                let style = "background-image:url('" + imgName + "'); background-repeat: round; height:" + cHeight + "px;";
                return style
            }
        },
        created(){
            this.db.save("LOGINFLAG","0")
            document.title = "微图书"
        },
        methods:{
            submitForm(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postRequest('/doLogin', this.loginForm).then(resp => {
                            this.loading = false;
                            console.log('------', resp)
                            if (resp.code === 200) { 
                                this.db.save("USER", resp.data);
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                            }
                        })
                    } else {
                        
                        return false;
                    }
                });
            }
        }
    }
</script>

<style >
    body{
        margin:0px;
    }

    .login{
        width:100%;
        
    }

    .loginContainer {
        border-radius: 8px;
        background-clip: padding-box;
        width: 265px;
        padding: 5px 40px 2px 40px;
        background: #fff;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
        font-size:24px
    }
</style>