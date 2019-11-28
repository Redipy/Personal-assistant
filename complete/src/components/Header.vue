<template>
  <el-header class="header">
    <div class="headleft">
      <span>个人任务管理系统</span>
    </div>
    <div class="headright">
      <div class="info">
        <el-tooltip placement="left">
          <span slot="content">{{message ? `有${message}条消息` : '消息中心'}}</span>
          <i class="el-icon-message-solid"></i>
        </el-tooltip>
      </div>
      <el-dropdown :command="handleCommand"
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
                            command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import Bus from './bus'
export default {
  name: 'Header',
  data () {
    return {
      message: 1,
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
      if (command === 'loginout') {
        localStorage.removeItem('username')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username')
    }
  }
}
</script>
<style type="text/css" >
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

.el-dropdown {
  margin-right: 5%;
  margin-top: 1%;
  color: antiquewhite;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
