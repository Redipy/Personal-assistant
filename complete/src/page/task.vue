<template>
  <div class="taskBody">
    <div class="searchBar">
      <!-- <el-date-picker class="searchTask"
                      v-model="search"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button class="searchButton"
                 @click="searchTask"
                 type="primary"
                 round>搜索</el-button> -->
      <el-button class="newButton"
                 @click="addTask"
                 type="primary"
                 round>新增任务</el-button>
      <el-select @change="filterchange"
                 class="selectfilter"
                 v-model="searchfilter.type"
                 placeholder="请选择">
        <el-option v-for="item in filteroptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <!-- <template v-if="this.searchfilter.type == 3">
        <el-select @change="filterchange"
                   class="selectfilter"
                   v-model="searchfilter.name"
                   placeholder="请选择">
          <el-option v-for="item in nameoptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template> -->
    </div>
    <div class="tableBody">
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="task_name"
                         label="任务"
                         width="">
        </el-table-column>
        <el-table-column prop="task_detail"
                         label="任务描述"
                         width="">
        </el-table-column>
        <!-- <el-table-column prop="task_progress"
                         label="完成度"
                         width="">
          <template slot-scope="scope">
            <el-progress :percentage='scope.row.progress'></el-progress>
          </template>
        </el-table-column> -->
        <el-table-column prop="date"
                         label="执行日期"
                         width="">
        </el-table-column>
        <el-table-column prop="task_type"
                         label="任务类型"
                         width="">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editDetail(scope)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button @click="over(scope)"
                       type="text"
                       size="small">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     @current-change='this.currentChange'
                     :total='this.length'>
      </el-pagination>
    </div>
    <el-dialog title="编辑"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="ruleForm"
               ref="ruleForm"
               :rules="addrules"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="任务名称"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="任务描述"
                      prop="detail">
          <el-input v-model="ruleForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="任务类型"
                      prop="type">
          <el-switch v-model="ruleForm.type"
                     active-text="期限任务"
                     inactive-text="日常任务">
          </el-switch>
        </el-form-item>
        <template v-if="ruleForm.type">
          <el-form-item label="执行日期"
                        prop="date">
            <el-date-picker v-model="ruleForm.date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="no()">取 消</el-button>
        <el-button type="primary"
                   @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增"
               @close="closeadd()"
               :visible.sync="adddialogVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="addForm"
               ref="addForm"
               :rules="addrules"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="任务名称"
                      prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="任务描述"
                      prop="detail">
          <el-input v-model="addForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="任务类型"
                      prop="type">
          <el-switch v-model="addForm.type"
                     active-text="期限任务"
                     inactive-text="日常任务">
          </el-switch>
        </el-form-item>
        <template v-if="addForm.type">
          <el-form-item label="执行日期"
                        prop="date">
            <el-date-picker v-model="addForm.date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-form-item label="群组/个人"
                      prop="group">
          <el-switch v-model="addForm.group"
                     active-text="群组任务"
                     inactive-text="个人任务">
          </el-switch>
        </el-form-item>
        <template v-if="addForm.group">
          <el-form-item label="群组名称"
                        prop="group">
            <el-select v-model="addForm.chose"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item in grouplist"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="noAdd()">取 消</el-button>
        <el-button type="primary"
                   @click="sureAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addrules: {
        name: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ]
      },
      pickerOptions: {
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
      filteroptions: [
        {
          value: 1,
          label: '所有任务'
        },
        {
          value: 2,
          label: '个人任务'
        },
        {
          value: 3,
          label: '群组任务'
        }
      ],
      nameoptions: [],
      searchfilter: {
        type: 1,
        name: ''
      },
      dialogVisible: false,
      adddialogVisible: false,
      currentPage: 1,
      length: 0,
      user_id: null,
      search: '',
      tableData: [],
      ruleForm: {
        name: '',
        detail: '',
        type: false,
        date: '',
        group: ''
      },
      addForm: {
        name: '',
        detail: '',
        type: false,
        group: false,
        date: '',
        chose: ''
      },
      grouplist: []
    }
  },
  methods: {
    init () {
      if (this.$route.params.date) {
        this.search = this.$route.params.date
      } else {
        this.search = new Date()
      }
      this.loadTable()
      this.loadName()
    },
    loadTable () {
      let self = this
      this.user_id = JSON.parse(sessionStorage.getItem('EX_token')).user_id
      this.$http.post(this.url + '/task/findList', {
        user_id: this.user_id,
        date: this.dateToString(this.search),
        pageno: this.currentPage,
        pagesize: 10
      })
        .then(function (res) {
          // console.log(res)
          self.length = res.length['count(*)']
          self.tableData = res.data
          for (let i = 0; i < self.tableData.length; i++) {
            if (self.tableData[i].task_type === 0) {
              self.tableData[i].task_type = '个人任务'
            } else if (self.tableData[i].task_type === 1) {
              self.tableData[i].task_type = '群组任务'
            }
            if (self.tableData[i].task_startdate) {
              // console.log(self.dateToString(new Date(self.tableData[i].task_startdate)))
              let date = self.dateToString(new Date(self.tableData[i].task_startdate)) + ' 至 ' + self.dateToString(new Date(self.tableData[i].task_enddate))
              self.$set(self.tableData[i], 'date', date)
            } else {
              self.$set(self.tableData[i], 'date', '日常任务')
            }
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    loadFilterTable () {
      let self = this
      console.log('111111111111')
      this.$http.post(this.url + '/task/findByfilter', {
        user_id: this.user_id,
        type: this.searchfilter.type,
        name: this.searchfilter.name,
        pageno: this.currentPage,
        pagesize: 10
      }).then((res) => {
        console.log(res)
        self.length = res.length['count(*)']
        self.tableData = res.data
        for (let i = 0; i < self.tableData.length; i++) {
          if (self.tableData[i].task_type === 0) {
            self.tableData[i].task_type = '个人任务'
          } else if (self.tableData[i].task_type === 1) {
            self.tableData[i].task_type = '群组任务'
          }
          if (self.tableData[i].task_startdate) {
            // console.log(self.dateToString(new Date(self.tableData[i].task_startdate)))
            let date = self.dateToString(new Date(self.tableData[i].task_startdate)) + ' 至 ' + self.dateToString(new Date(self.tableData[i].task_enddate))
            self.$set(self.tableData[i], 'date', date)
          } else {
            self.$set(self.tableData[i], 'date', '日常任务')
          }
        }
      })
    },
    loadName () {
      let self = this
      this.$http.post(this.url + '/group/getall', {
        user_id: this.user_id
      }).then((res) => {
        // console.log(res)
        self.nameoptions = []
        for (let i = 0; i < res.data.length; i++) {
          self.nameoptions.push({
            value: res.data[i].group_id,
            label: res.data[i].group_name
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    filterchange () {
      console.log(this.searchfilter)
      switch (this.searchfilter.type) {
        case 1:
          this.loadTable()
          break
        case 2:
          this.loadFilterTable()
          break
        case 3:
          this.loadFilterTable()
          break
      }
    },
    currentChange (currentPage) {
      this.currentPage = currentPage
      // console.log(this.currentPage)
      if (this.searchfilter.type === 1) {
        this.loadTable()
      } else {
        this.loadFilterTable()
      }
    },
    searchTask () {
      let data = ''
      if (this.search) {
        data = this.dateToString(this.search)
        console.log(data)
      }
    },
    addTask () {
      this.adddialogVisible = true
      this.$http.post(this.url + '/group/getleaderoradmin', {
        user_id: this.user_id
      }).then((res) => {
        // console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          this.grouplist.push({
            value: res.data[i].group_id,
            label: res.data[i].group_name
          })
        }
      }).catch(() => { })
    },
    editDetail (data) {
      console.log(data.row)
      this.ruleForm.id = data.row.task_id
      this.ruleForm.name = data.row.task_name
      this.ruleForm.detail = data.row.task_detail
      if (data.row.date !== '日常任务') {
        this.ruleForm.type = true
        this.ruleForm.date = [new Date(data.row.date.split(' 至 ')[0]), new Date(data.row.date.split(' 至 ')[1])]
      } else {
        this.ruleForm.type = false
        this.ruleForm.date = data.row.date
      }
      console.log(this.ruleForm)
      this.dialogVisible = true
    },
    no () {
      this.$confirm('是否取消修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
      }).catch(() => { })
    },
    noAdd () {
      this.$confirm('是否取消新增？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.adddialogVisible = false
      }).catch(() => { })
    },
    sure () {
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          this.$message.error('请输入任务名与描述')
          return false
        } else {
          let self = this
          this.$confirm('是否修改？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // console.log(this.ruleForm.date)
            let date = ''
            if (!this.ruleForm.type) {
              date = ''
            } else {
              let start = this.dateToString(this.ruleForm.date[0])
              let end = this.dateToString(this.ruleForm.date[1])
              // console.log(start)
              // console.log(end)
              date = start + ' 至 ' + end
            }
            this.$http.post(this.url + '/task/update', {
              task_id: this.ruleForm.id,
              task_name: this.ruleForm.name,
              task_detail: this.ruleForm.detail,
              task_date: date
            }).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              self.filterchange()
            })
            this.dialogVisible = false
          }).catch(() => { })
        }
      })
    },
    sureAdd () {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          this.$message.error('请输入任务名与描述')
          return false
        } else {
          let self = this
          this.user_id = JSON.parse(sessionStorage.getItem('EX_token')).user_id
          this.$confirm('是否新增？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // console.log(this.addForm.group)
            if (!this.addForm.group) {
              let date = ''
              if (!this.addForm.type) {
                date = ''
              } else {
                let start = this.dateToString(this.addForm.date[0])
                let end = this.dateToString(this.addForm.date[1])
                // console.log(start)
                // console.log(end)
                date = start + ' 至 ' + end
              }
              this.$http.post(this.url + '/task/addTask', {
                task_name: this.addForm.name,
                task_detail: this.addForm.detail,
                task_userid: this.user_id,
                task_date: date
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                self.loadTable()
              }).catch(() => { })
              this.adddialogVisible = false
            } else {
              let date = ''
              if (!this.addForm.type) {
                date = ''
              } else {
                let start = this.dateToString(this.addForm.date[0])
                let end = this.dateToString(this.addForm.date[1])
                // console.log(start)
                // console.log(end)
                date = start + ' 至 ' + end
              }
              this.$http.post(this.url + '/task/addgroupTask', {
                task_name: this.addForm.name,
                task_detail: this.addForm.detail,
                task_userid: this.user_id,
                task_date: date,
                group_id: this.addForm.chose
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                self.loadTable()
              })
              this.adddialogVisible = false
            }
          }).catch(() => { })
        }
      })
    },
    closeadd () {
      this.grouplist = []
      this.addForm = {
        name: '',
        detail: '',
        type: false,
        date: ''
      }
    },
    over (data) {
      let self = this
      // console.log(data.row)
      this.$confirm('是否结束此任务？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(data.row.task_id)
        this.$http.post(this.url + '/task/overTask', {
          task_id: data.row.task_id
        })
          .then((res) => {
            this.$message({
              type: 'success',
              message: res.message
            })
            self.loadTable()
          }).catch(() => { })
      }).catch(() => { })
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
<style type="text/css" scoped>
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

.selectfilter {
  margin-left: 1%;
}

/* .newButton {
  margin-left: 80%;
} */

.tableBody {
  margin-left: 1%;
  margin-right: 1%;
}

.cell {
  text-align: center;
}
</style>
