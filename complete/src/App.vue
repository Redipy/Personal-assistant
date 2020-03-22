<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // 关闭浏览器窗口的时候清空浏览器缓存在sessionStorage的数据
    // window.onbeforeunload = function (e) {
    //   var storage = window.sessionStorage
    //   storage.clear()
    // }
    if (!sessionStorage.getItem('EX_token')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: #eee;
}
</style>
