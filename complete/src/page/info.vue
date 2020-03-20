<template>
  <div>
    {{flag}}
    <el-button @click="to">aaaa</el-button>
    <!-- {{f}} -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      // f: 'a',
      flag: []
    }
  },
  created () {
    for (var i = 0; i < 5; i++) {
      this.flag[i] = false
      // this.$set(this.flag, i, false)
    }
  },
  methods: {
    to () {
      console.log(this.flag)
      // this.flag[2] = true
      // this.flag.splice(2, 1, true)
      this.$set(this.flag, 2, true)
      // this.f = ''
      console.log(this.flag)
    }
  }
}
</script>
