<template>
  <div class="login">
    <div class="form-container">
      <img src="../assets/image/logo.png" class="logo" />
      <h2 class="desc">
        <template v-if="curAction == 'login'">
          登陆 todoList 账号，<br />
          开始使用
        </template>
        <template v-if="curAction == 'reg'">
          注册账号，<br />
          以开始使用
        </template>
      </h2>
      <el-form ref="form" :model="form" class="form">
        <!-- 用户名 -->
        <el-form-item label="" prop="account">
          <el-input
            v-model="form.account"
            placeholder="请输入您的账号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="" prop="password" class="relative">
          <el-input v-model="form.password" placeholder="请输入您的密码" :type="showPsd ? 'text' : 'password'"></el-input>
          <i class="iconfont iconeye_close pointer" v-show="!showPsd" @click="showPsd = !showPsd"></i>
          <i class="iconfont iconeye_open pointer" v-show="showPsd" @click="showPsd = !showPsd"></i>
        </el-form-item>
        <p v-if="curAction === 'login'">
          <a class="forgetPsd pointer" href="javascript:void(0);">忘记密码?</a>
        </p>
        <el-button type="primary" class="btn" @click="validate">
            {{curAction === 'login' ? '登 陆' : '注 册'}}
        </el-button>
      </el-form>
      <p class="more-container">
        <a class="pointer" href="javascript:void(0);" @click="showMessage">验证码登陆</a>
        <a class="pointer" href="javascript:void(0);" @click="curAction = 'reg'" v-if="curAction == 'login'">注册</a>
        <a class="pointer" href="javascript:void(0);" @click="curAction = 'login'" v-if="curAction == 'reg'">账号密码登陆</a>
      </p>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5"; //引入md5加密密码
import { login, register } from "@/api/httpRequest.js";
import { salt } from "@/config.js";
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      showPsd: false,
      curAction: "login" //当前状态，默认为login-登录，还有 reg-注册 forget-忘记密码
    };
  },
  methods: {
    //弹出提醒
    showMessage() {
      this.$message({
        message: "模块还没开发，可请联系开发者!",
        type: "warning",
        duration: 2000
      });
    },
    //表单验证
    validate() {
      if (!this.form.account) {
        this.$message.error("请填写登陆账号!");
        return;
      } else if (!this.form.password) {
        this.$message.error("请填写密码!");
        return;
      }
      this.curAction === 'login' ? this.login() : this.register();
    },
    //登录
    login() {
      const params = { account: this.form.account, password: md5(this.form.password + salt) };
      login(params).then(res => {
        //登陆成功
        if (res) {
          this.utils.setItem("user", res);
          this.$message.success("登录成功!");
        }
      });
    },
    //注册
    register() {
      const params = { account: this.form.account, password: md5(this.form.password + salt) };
      register(params).then(res => {
        if(res) {
          this.$message.success("注册成功,请登陆使用系统!");
          this.curAction = 'login';
        }
      });
    }
  }
};
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
      font-size: $normal;
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
