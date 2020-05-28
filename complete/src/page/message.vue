<template>
  <div class="messagebody">
    <div class="messagetable">
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="message_fromname"
                         label="发起人">
        </el-table-column>
        <el-table-column prop="message_info"
                         label="信息">
        </el-table-column>
        <el-table-column prop="message_time"
                         label="时间">
        </el-table-column>
        <el-table-column prop="address"
                         label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.message_type == 1">
              <el-button @click="join(scope)"
                         type="text"
                         size="small">同意</el-button>
            </template>
            <el-button @click="dele(scope)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          name: 'redipy',
          info: '加入微信'
        }
      ]
    }
  },
  methods: {
    init () {
      this.loadtable()
    },
    async loadtable () {
      await this.$http.post(this.url + '/message/getByuserid', {
        user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id
      }).then((res) => {
        // console.log(res)
        this.tableData = res.data
      }).catch(() => { console.log('出错') })
      // console.log(this.tableData.length)
      for (let i = 0; i < this.tableData.length; i++) {
        await this.$http.post(this.url + '/users/getnameByid', {
          user_id: this.tableData[i].message_from
        }).then((res) => {
          // console.log(res)
          this.$set(this.tableData[i], 'message_fromname', res.data)
        }).catch(() => { })
      }
      // console.log(this.tableData)
    },
    join (scope) {
      this.$confirm('是否加入群组？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.url + '/group/joingroup', {
          user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
          user_name: JSON.parse(sessionStorage.getItem('EX_token')).user_name,
          group_id: scope.row.message_groupid
        }).then((res) => {
          this.$message({
            message: '已加入群组',
            type: 'success'
          })
          this.delete(scope)
        }).catch(() => { })
      }).catch(() => { })
    },
    dele (scope) {
      this.$confirm('是否删除该消息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(scope)
      }).catch(() => { })
    },
    delete (scope) {
      this.$http.post(this.url + '/message/deletemessage', {
        message_id: scope.row.message_id
      }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.loadtable()
      }).catch(() => { })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style type="text/css" scoped>
.messagebody {
  width: 100%;
  height: 100%;
}

.messagetable {
  margin-left: 1%;
  margin-right: 1%;
}
</style>
