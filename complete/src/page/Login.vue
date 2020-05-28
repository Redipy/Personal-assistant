<template>
  <div class="login-wrapper">
    <div class="login-main">
      <h3 class="login-title">个人助理工具</h3>
      <template v-if="log">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item prop="username">
            <el-input v-model.trim="ruleForm.username"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      placeholder="密码"
                      v-model.trim="ruleForm.password"
                      @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn"
                       type="primary"
                       :loading="loading"
                       @click="submitForm('ruleForm')">登录</el-button>
            <el-button class="reg-btn"
                       type="info"
                       @click="reg()">去注册</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form :model="regForm"
                 :rules="regrules"
                 ref="regForm">
          <el-form-item prop="regusername">
            <el-input v-model.trim="regForm.regusername"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="regpassword">
            <el-input type="password"
                      placeholder="密码"
                      v-model.trim="regForm.regpassword"
                      @keyup.enter.native="submitForm('regForm')"></el-input>
          </el-form-item>
          <el-form-item prop="password_confirm">
            <el-input type="password"
                      placeholder="再次输入密码"
                      v-model.trim="regForm.password_confirm"
                      @keyup.enter.native="submitForm('regForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn"
                       type="primary"
                       :loading="loading"
                       @click="submitForm('regForm')">立即注册</el-button>
            <el-button class="reg-btn"
                       type="info"
                       @click="backlog()">返回登录</el-button>
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    // let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
    let reg = /^[\da-zA-Z]{6,12}$/i
    var validateloginPwd = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('密码应是6-12位数字或字母！'))
      } else {
        callback()
      }
    }
    var validateregPwd = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('密码应是6-12位数字或字母！'))
      } else if (this.regForm.password_confirm !== value) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    var validateComfirmPwd = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('密码应是6-12位数字或字母！'))
      } else if (this.regForm.regpassword !== value) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      regForm: {
        regusername: '',
        regpassword: '',
        password_confirm: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateloginPwd, trigger: 'blur' }
        ]
      },
      regrules: {
        regusername: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        regpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateregPwd, trigger: 'blur' }
        ],
        password_confirm: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ]
      },
      loading: false,
      log: true
    }
  },
  methods: {
    submitForm (formName) {
      let self = this
      this.$refs[formName].validate(valid => {
        if (formName === 'ruleForm') {
          if (!valid) {
            this.$message.error('请输入用户名与密码')
            return false
          } else {
            this.loading = true
            this.$http.post(this.url + '/users/login', {
              user_name: this.ruleForm.username,
              password: this.ruleForm.password
            })
              .then(function (res) {
                console.log(res)
                if (res.data === 1) {
                  self.$message.error('用户名或密码错误')
                } else if (res.data === 0) {
                  let user = {
                    user_id: res.info.user_id,
                    user_name: res.info.user_name
                  }
                  sessionStorage.setItem('EX_token', JSON.stringify(user))
                  console.log(sessionStorage.getItem('EX_token'))
                  self.$router.push('/')
                }
                self.loading = false
              })
              .catch(res => {
                console.log(res)
                self.loading = false
              })
          }
        } else if (formName === 'regForm') {
          if (!valid) {
            this.$message.error('请输入用户名与密码')
            return false
          } else {
            this.loading = true
            this.$http.post(this.url + '/users/reg', {
              user_name: this.regForm.regusername,
              password: this.regForm.regpassword
            })
              .then(function (res) {
                console.log(res)
                if (res.data === 0) {
                  self.$message.error('用户名重复')
                } else if (res.data === 1) {
                  self.$message.success('注册成功，请登录')
                  self.backlog()
                }
                self.loading = false
              })
              .catch(res => {
                console.log(res)
                self.loading = false
              })
          }
        }
      })
    },
    reg () {
      this.log = false
      this.ruleForm = this.$options.data().ruleForm
    },
    backlog () {
      this.log = true
      this.regForm = this.$options.data().regForm
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.el-loading-spinner {
  top: 80%;
}
.login-wrapper {
  height: 100%;
  background: #57f1f1 url(../../static/img/loginBG.png) no-repeat center center;
  background-size: 100% 100%;
}
.login-main {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 320px;
  height: 400px;
  padding: 20px 35px;
  border: 1px solid #498683;
  margin: -185px 0 0 -160px;
  box-shadow: 4px 4px #498683;
}
.login-title {
  margin: 15px 0 45px 0;
  color: #555;
  text-align: center;
  font-size: 30px;
}
.login-btn {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  font-size: 16px;
}
.reg-btn {
  width: 100%;
  height: 40px;
  margin: 20px 0px 0px 0px !important;
  font-size: 16px;
}
.login-tip {
  color: #999;
  font-size: 12px;
  line-height: 30px;
}
.login-anim {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
}
</style>
