<template>
  <div>
    <el-calendar v-model="date">
      <template slot="dateCell"
                slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
        </p>
        <span title="查看当天备忘录">
          <i class="el-icon-edit"
             v-if="data.isSelected"
             @click="edit(data)"></i>
        </span>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: new Date(),
      visible: false
    }
  },
  methods: {
    edit (data) {
      this.visible = true
      console.log(data)
      this.$router.push({
        name: 'noforget',
        params: {
          date: data.day
        }
      })
    }
  }
}
</script>
<style type="text/css" scoped>
.is-selected {
  color: #1989fa;
}
</style>
