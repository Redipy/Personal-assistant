<template>
  <el-container class="container">
    <com-header></com-header>
    <!-- <com-sidebar></com-sidebar>
    <div :style="{left: collapse ? '64px' : '200px'}">
      <com-tags></com-tags>
      <keep-alive :include="tagComponent">
        <router-view></router-view>
      </keep-alive>
    </div>
    <el-footer></el-footer> -->
  </el-container>
</template>

<script>
import comHeader from './Header.vue'
import comSidebar from './Sidebar.vue'
import comTags from './Tags.vue'
import Bus from './bus'
export default {
  name: 'Base',
  components: { comHeader, comSidebar, comTags },
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
