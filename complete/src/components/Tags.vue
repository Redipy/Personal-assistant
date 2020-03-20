<template>
  <div class='main-tags'
       v-if="showTag">
    <ul class="tag-list">
      <li class="tag-item"
          v-for="(item, index ) in tagList"
          :class="{'active': isActive(item.path)}"
          :key="index">
        <router-link :to="item.path"
                     class="tag-item-title">
          {{item.title}}
        </router-link>
        <i class="el-icon-close"
           @click="closeTag(index)"></i>
      </li>
    </ul>
    <el-dropdown class="tagsDropdown"
                 @command="handleTag">
      <el-button size="mini"
                 type="primary">
        标签选项<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Bus from './bus'
export default {
  name: 'Tags',
  data () {
    return {
      tagList: [],
      collapse: false,
      initTag: {
        title: '系统首页',
        path: '/index',
        name: 'Home'
      }
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTag (index) {
      let delItem = this.tagList.splice(index, 1)[0]
      // 删除标签后 当前选中的标签  后一个标签 前一个标签
      let curItem = this.tagList[index] ? this.tagList[index] : this.tagList[index - 1]

      if (curItem) {
        delItem.path === this.$route.fullPath && this.$router.push(curItem.path)
      } else {
        // 没有前一个标签和后一个标签 关闭该标签就类似于 关闭所有
        this.closeAll()
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagList = [this.initTag]
      this.$router.push('/index')
    },
    // 关闭其他标签
    closeOther () {
      let curItem = this.tagList.filter(item => item.path === this.$route.fullPath)
      this.tagList = curItem
    },
    // 设置标签
    setTag (route) {
      let isExist = this.tagList.some(item => item.path === this.$route.fullPath)
      !isExist && this.tagList.push({
        title: route.meta.title,
        path: route.fullPath,
        name: route.matched[1].components.default.name
      })
      Bus.$emit('tags', this.tagList)
    },
    handleTag (command) {
      command === 'closeOther' ? this.closeOther() : this.closeAll()
    }
  },
  computed: {
    showTag () {
      return this.tagList.length > 0
    }
  },
  watch: {
    $route (newValue) {
      this.setTag(newValue)
    }
  },
  created () {
    this.setTag(this.$route)
  }
}
</script>

<style type="text/css">
.main-tags {
  z-index: 2;
  width: 98%;
  padding: 8px 5px;
  box-shadow: 1px 0 2px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: -30px;
  margin-left: -30px; */
}

.tag-list {
  float: left;
  font-size: 14px !important;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.tag-item {
  float: left;
  padding: 3px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
}

.tag-item.active {
  border-color: #409eff;
  background-color: #409eff;
  color: white !important;
}

.tag-item.hover {
  background-color: #444;
  color: white;
}

.tag-item.hover.tag-item-title {
  color: white;
}

.tag-item.el-icon-close {
  position: relative;
  right: -5px;
  margin-left: 3px;
  cursor: pointer;
}

.el-icon-close {
  position: relative;
  right: -5px;
  margin-left: 3px;
  cursor: pointer;
}

.tag-item-title {
  color: #666;
  text-decoration: none;
}

.tag-item-title.router-link-active {
  color: white;
}

.tagsDropdown {
  margin-right: 20px;
}
</style>
