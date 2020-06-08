<template> 
    <div class="login">
        <div class="form-container">
            <img src="../assets/image/logo.png" class="logo"/>
            <h2 class="desc">
                    登陆 todoList 账号，<br/>
                    开始使用
                </h2>
            <el-form ref="form" :model="form" class="form">
                <!-- 用户名 -->
                <el-form-item label="" prop="userName">
                    <el-input v-model="form.userName" placeholder="请输入您的用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="" prop="password" class="relative">
                    <el-input v-model="form.password" placeholder="请输入您的密码" :type="showPsd ? 'text' : 'password'"></el-input>
                    <i class="iconfont iconeye_close pointer" v-show="!showPsd" @click="showPsd = !showPsd"></i>
                    <i class="iconfont iconeye_open pointer" v-show="showPsd" @click="showPsd = !showPsd"></i>
                </el-form-item>
                <p>
                    <a class="forgetPsd pointer" href="javascript:void(0);">忘记密码?</a>
                </p>
                <el-button type="primary" class="btn" @click="validate">登 陆</el-button>
            </el-form>
            <p class="more-container">
                <a class="pointer" href="javascript:void(0);" @click="showMessage">验证码登陆</a>
                <a class="pointer" href="javascript:void(0);">注册</a>
            </p>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5'; //引入md5加密密码
    import { login } from "@/api/httpRequest.js";
    export default {
        data() {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                showPsd: false
            }
        },
        methods: {
            //弹出提醒
            showMessage() {
                this.$message({
                    message: '模块还没开发，可请联系开发者!',
                    type: 'warning',
                    duration: 2000
                });
            },
            //表单验证
            validate() {
                if (!this.form.userName) {
                    this.$message.error('请填写登陆账号!');
                    return;
                } else if(!this.form.password) {
                    this.$message.error('请填写密码!');
                    return;
                }
                this.login();
            },
            //登录
            login() {
                login().then(res => {
                });
            }
        },
        mounted() {
            this.login();
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixins.scss";
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        .form-container {
            @include inMiddle(verticakMiddle);
            width: 25%;
            margin: 0 auto;
            .logo {
                max-width: 100%;
            }
            .desc {
                color: $black;
                font-size: $large;
                margin-bottom: 24px;
            }
            .more-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 16px;
                color: $primary;
                font-size: $normal
            }
        }
        .form {
            .forgetPsd {
                color: $grey;
                font-size: $normal;
                &:hover {
                    color: lighten($grey, 5%);
                }
            }
            .btn {
               width: 100%;
               margin-top: 16px;
            }
            .iconfont {
                @include inMiddle(vertical);
                right: 12px;
                font-size: 1.2em;
            } 
        }
    }
</style>
