<template>
  <el-header>
    <div class="headleft">
      <span class="btn-collapse"
            @click="collapseChage"
            :title="collapse ? '展开侧边栏' : '收起侧边栏'">
        <i class="el-icon-menu"></i>
      </span>
      <span>个人助理工具</span>
    </div>
    <div class="headright">
      <div class="info">
        <el-badge :is-dot="this.ismessage"
                  class="item">
          <el-tooltip placement="left">
            <span slot="content">{{message ? `有${message}条消息` : '消息中心'}}</span>
            <i @click="tomessage()"
               class="el-icon-message-solid"></i>
          </el-tooltip>
        </el-badge>
      </div>
      <el-dropdown class="headerDropdown"
                   @command="handleCommand"
                   trigger="click">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <a href="https://github.com/Redipy/Complete"
             target="_blank">
            <el-dropdown-item>项目仓库</el-dropdown-item>
          </a>
          <el-dropdown-item divided
                            command="updetail">修改密码</el-dropdown-item>
          <el-dropdown-item divided
                            command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <el-dialog title="个人信息"
               @close="closeup()"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="Form"
               ref="addForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码"
                      prop="pass">
          <el-input v-model="Form.pass"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </el-header>
</template>
<script>
import Bus from './bus'
export default {
  name: 'Header',
  data () {
    return {
      // dialogVisible: false,
      message: '',
      ismessage: false,
      username: 'admin!',
      collapse: false
    }
  },
  methods: {
    // 侧边栏折叠打开效果
    collapseChage () {
      this.collapse = !this.collapse
      Bus.$emit('collapse', this.collapse)
    },

    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command === 'logout') {
        sessionStorage.removeItem('EX_token')
        this.$router.push('/login')
      } else if (command === 'updetail') {
        this.$router.push('/info')
      }
    },

    tomessage () {
      this.message = ''
      this.ismessage = false
      this.$router.push('/message')
    }

    // updetail () {
    //   this.dialogVisible = true
    // }
  },
  mounted () {
    if (sessionStorage.getItem('EX_token')) {
      this.username = JSON.parse(sessionStorage.getItem('EX_token')).user_name
    }
    this.$http.post(this.url + '/message/howmany', {
      user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id
    }).then((res) => {
      this.message = res.data
      if (this.message !== '') {
        this.ismessage = true
      }
    })
    console.log(this.message)
    console.log(this.ismessage)
  }
}
</script>
<style type="text/css">
.el-tooltip {
  font-size: 25px;
}

.el-icon-message-solid {
  line-height: 0 !important;
}

.el-header {
  width: 100%;
  padding: 0 30px;
  background-color: #34a598;
  color: white;
  font-size: 16px;
  line-height: 53px;
  display: flex;
  justify-content: space-between;
}

.headleft {
  width: 20%;
  font-size: 25px;
  line-height: 58px;
}

.headright {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.headright .info {
  margin-right: 10%;
  margin-top: 2%;
  cursor: pointer;
}

.headerDropdown {
  margin-right: 5%;
  margin-top: 1%;
  color: antiquewhite;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
