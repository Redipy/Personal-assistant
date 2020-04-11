<template>
  <el-aside width="200px"
            height="100%">
    <el-menu :collapse="isCollapse"
             :default-active="onRoutes"
             background-color="#1e504f"
             text-color="#ccc"
             active-text-color="#3ebfb0"
             unique-opened
             router>
      <template v-for="item in items">
        <!-- <template v-if="item.subItems">
          <el-submenu :index="item.path"
                      :key="item.title">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subItem, i) in item.subItems"
                          :index="subItem.path"
                          :key="i">
              {{subItem.title}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else> -->
        <el-menu-item :index="item.path"
                      :key="item.title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <!-- </template> -->
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import Bus from './bus'
export default {
  data () {
    return {
      isCollapse: false,
      items: [
        {
          title: '系统首页',
          path: '/index',
          icon: 'el-icon-house'
        },
        {
          title: '日历',
          path: '/date',
          icon: 'el-icon-date'
        },
        {
          title: '我的任务',
          path: '/task',
          icon: 'el-icon-notebook-2'
        },
        {
          title: '我的备忘录',
          path: '/noforget',
          icon: 'el-icon-s-order'
        },
        {
          title: '我的信息',
          path: '/message',
          icon: 'el-icon-message'
        },
        {
          title: '群组管理',
          path: '/group',
          icon: 'el-icon-tickets'
        },
        {
          title: '修改密码',
          path: '/info',
          icon: 'el-icon-info'
        }
      ]
    }
  },
  methods: {
  },
  computed: {
    onRoutes () {
      return this.$route.fullPath
    }
  },
  created () {
    // 通过 event bus进行组件间的通信 来折叠和展开侧边栏
    Bus.$on('collapse', isCollapse => {
      this.isCollapse = isCollapse
    })
  }
}
</script>
<style type="text/css">
.el-aside {
  height: 100%;
}

.el-menu {
  height: 100%;
}

.el-menu-item {
  text-align: left;
}

.el-menu-item.is-active {
  border-left: 3px solid #74f9e9;
  background-color: #153834 !important;
}
</style>
