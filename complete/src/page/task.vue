<template>
  <div class="taskBody">
    <div class="searchBar">
      <el-date-picker class="searchTask"
                      v-model="search"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button class="searchButton"
                 @click="searchTask"
                 type="primary"
                 round>搜索</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="Stime"
                         label="开始时间"
                         width="">
        </el-table-column>
        <el-table-column prop="Etime"
                         label="结束时间"
                         width="">
        </el-table-column>
        <el-table-column prop="name"
                         label="任务"
                         width="">
        </el-table-column>
        <el-table-column prop="progress"
                         label="完成度"
                         width="">
          <template slot-scope="scope">
            <el-progress :percentage='scope.row.progress'></el-progress>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope)"
                       type="text"
                       size="small">查看</el-button>
            <el-button @click="editDetail(scope)"
                       type="text"
                       size="small">编辑</el-button>
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
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      date: '',
      search: '',
      tableData: []
    }
  },
  methods: {
    init () {
      if (this.$route.params.date) {
        this.date = this.$route.params.date
      } else {
        this.date = this.dateToString(new Date())
      }
      console.log(this.date)
      this.loadTable()
    },
    loadTable () {
      this.tableData = [
        {
          Stime: '12:00',
          Etime: '17:30',
          name: '写项目',
          progress: 60
        }
      ]
    },
    searchTask () {
      let data = ''
      if (this.search) {
        data = this.dateToString(this.search)
        console.log(data)
      }
    },
    showDetail (data) {
      console.log(data.row)
    },
    editDetail (data) {
      console.log(data.row)
    },
    dateToString (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      let res = year + '-' + month + '-' + day
      return res
    }
  },
  created () {
    this.init()
  }
}
</script>
<style type="text/css">
.taskBody {
  width: 100%;
  height: 100%;
}

.searchBar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1%;
}

.searchTask {
  width: 200px;
}

.searchButton {
  margin-left: 1%;
}

.tableBody {
  margin-left: 1%;
  margin-right: 1%;
}

.cell {
  text-align: center;
}
</style>
