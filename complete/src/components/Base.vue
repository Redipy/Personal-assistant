<template>
  <div class="container">
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main"
         :style="{left: collapse ? '64px' : '200px'}">
      <Tags></Tags>
      <keep-alive :include="tagComponent">
        <router-view></router-view>
      </keep-alive>
    </div>
    <el-footer></el-footer>
  </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Tags from './Tags.vue'
import Bus from './bus'
export default {
  name: 'Base',
  components: { Header, Sidebar, Tags },
  data () {
    return {
      collapse: false,
      tagComponent: []
    }
  },
  created () {
    Bus.$on('collapse', isCollapse => {
      this.collapse = isCollapse
    })

    // 只有在标签页列表里的页面才使用keep-alive，关闭标签之后就不保存到内存中了
    Bus.$on('tags', tagList => {
      for (let item of tagList) {
        item.name && this.tagComponent.push(item.name)
      }
    })
  }
}
</script>
<style type="text/css">
.main {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 200px;
  right: 0;
  overflow: auto;
}
</style>
