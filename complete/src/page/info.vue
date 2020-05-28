<template>
  <div class="app-container common-list-page">
    <el-form :model="resetForm"
             :rules="resetFormRules"
             ref="resetForm"
             status-icon
             label-width="100px">
      <el-form-item label="旧密码："
                    prop="password">
        <el-input type="password"
                  v-model="resetForm.password"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码："
                    prop="newpwd">
        <el-input type="password"
                  v-model="resetForm.newpwd"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码："
                    prop="newpassword1">
        <el-input type="password"
                  v-model="resetForm.newpassword1"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click.native.prevent="change">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6-18位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        newpassword1: '',
        password: '',
        userid: ''
      },
      resetFormRules: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newpassword1: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.resetForm.userid = JSON.parse(sessionStorage.getItem('EX_token')).user_id
    },
    change () {
      // console.log(this.resetForm)
      this.$refs['resetForm'].validate(valid => {
        if (!valid) {
          this.$message.error('请正确输入新密码')
          return false
        } else {
          this.$confirm('是否确认修改密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.url + '/users/update', {
              user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
              pass: this.resetForm.password,
              npass: this.resetForm.newpwd
            }).then((res) => {
              console.log(res)
              if (res.data === 0) {
                if (sessionStorage.getItem('time')) {
                  if (Number(sessionStorage.getItem('time')) === 5) {
                    this.$message({
                      message: '已输入5次错误密码，请重新登陆',
                      type: 'warning'
                    })
                    sessionStorage.removeItem('time')
                    sessionStorage.removeItem('EX_token')
                    this.$router.push('/login')
                  } else {
                    sessionStorage.setItem('time', Number(sessionStorage.getItem('time')) + 1)
                    let t = 5 - sessionStorage.getItem('time')
                    this.$message({
                      message: res.message + ',剩余机会：' + t,
                      type: 'warning'
                    })
                  }
                } else {
                  sessionStorage.setItem('time', 1)
                  let t = 5 - sessionStorage.getItem('time')
                  this.$message({
                    message: res.message + ',剩余机会：' + t,
                    type: 'warning'
                  })
                }
              } else {
                this.$message({
                  message: res.message + '请重新登录',
                  type: 'success'
                })
                sessionStorage.removeItem('time')
                sessionStorage.removeItem('EX_token')
                this.$router.push('/login')
              }
            }).catch(() => { })
          }).catch(() => { })
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.el-form {
  width: 60%;
  margin: 50px auto 0;
  text-align: center;
}
</style>
