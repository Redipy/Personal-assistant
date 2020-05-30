<template>
  <div class="groupBody">
    <div class="searchBar">
      <el-button class="searchButton"
                 @click="newGroup"
                 type="primary"
                 round>新增群组</el-button>
    </div>
    <div class="groupItems">
      <el-row v-for="(group, groupid) in usergroup"
              :key="groupid"
              :gutter="20"
              class="group-list">
        <el-col v-for="(item, index) in group"
                :key="index"
                :span="5"
                class="group-img">
          <el-card :body-style="{ padding: '0px'}">
            <img src="../../static/img/qunzu.jpg"
                 class="image">
            <div style="padding: 14px;">
              <span>{{item.group_name}}</span>
              <span>群主:{{item.group_leaderName}}</span>
              <div class="bottom clearfix">
                <el-button type="text"
                           class="button"
                           @click="watchgrouptask(item.group_id)">查看团队任务</el-button>
                <el-button type="text"
                           class="button"
                           @click="watchgoupmenber(item.group_id)">查看团队成员</el-button>
                <template v-if="item.isleader">
                  <el-button type="text"
                             class="button"
                             @click="delegroup(item)">解散团队</el-button>
                </template>
                <template v-else>
                  <el-button type="text"
                             class="button"
                             @click="quitgroup(item)">退出团队</el-button>
                </template>
                <!-- <el-button type="text"
                           class="button">退出团队</el-button> -->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="群组任务"
               :visible.sync="groupTaskVisible"
               @close="closetask()"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-table :data="grouptask">
        <el-table-column property="task_name"
                         label="任务名称"></el-table-column>
        <el-table-column property="task_detail"
                         label="任务描述"></el-table-column>
        <!-- <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editDetail(scope)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button @click="over(scope)"g
                       type="text"
                       size="small">完成</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>

    <el-dialog title="群员列表"
               :visible.sync="groupMenberVisible"
               @close="closemenber()"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <template v-if="isleader">
        <el-button @click="addmenber"
                   type="primary"
                   round>新增成员</el-button>
        <el-popover v-for="(item,index) in menberlist"
                    :key="index"
                    class="group-menberlist"
                    placement="top"
                    width="160">
          <p>更改群员状态</p>
          <div style="text-align: right; margin: 0">
            <!-- <el-button size="primary"
                       type="text"
                       @click="levelup(item)">升级</el-button> -->
            <el-button type="primary"
                       size="mini"
                       @click="goout(item)">踢出群</el-button>
          </div>
          <el-button slot="reference">{{item.name}}</el-button>
        </el-popover>
      </template>
      <template v-else>
        <el-popover v-for="(item,index) in menberlist"
                    :key="index"
                    class="group-menberlist"
                    placement="top"
                    width="160">
          <p>群成员</p>
          <el-button slot="reference">{{item.name}}</el-button>
        </el-popover>
      </template>
    </el-dialog>

    <el-dialog title="新增群组"
               :visible.sync="newGroupVisible"
               @close="closenew()"
               width="30%"
               rules="addrules"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-form :model="groupinfo"
               ref="groupinfo"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="群组名称"
                      prop="name">
          <el-input v-model="groupinfo.group_name"></el-input>
        </el-form-item>
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
          { required: true, message: '请输入群组名', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ]
      },
      groupinfo: {
        group_name: ''
      },
      isleader: false,
      isadmin: false,
      newGroupVisible: false,
      groupTaskVisible: false,
      groupMenberVisible: false,
      // visible: true,
      group_id: '',
      user: {
        user_id: '',
        user_name: ''
      },
      search: '',
      usergroup: [],
      grouptask: [],
      menberlist: [],
      leaderlist: [],
      adminlist: []
    }
  },
  methods: {
    init () {
      this.getgroup()
      this.searchleader()
      this.searchadmin()
    },
    addmenber () {
      this.$prompt('请输入用户名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === null) {
          this.$message({
            type: 'warning',
            message: '请输入用户名'
          })
        } else {
          this.$http.post(this.url + '/message/invmessage', {
            user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
            group_id: this.group_id,
            time: this.dateToString(new Date()),
            type: 1,
            toname: value
          }).then((res) => {
            if (res.index === 1) {
              this.$message({
                type: 'success',
                message: '邀请成功'
              })
            } else if (res.index === 2) {
              this.$message({
                type: 'info',
                message: '请勿重复发送请求'
              })
            } else if (res.index === 0) {
              this.$message({
                type: 'info',
                message: '该用户已在群组中'
              })
            } else if (res.index === 3) {
              this.$message({
                type: 'warning',
                message: '该用户不存在'
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    getgroup () {
      this.$http.post(this.url + '/group/getall', {
        user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id
      }).then((res) => {
        // console.log(res)
        let a = []
        let b = []
        let num = Math.floor(res.data.length / 4)
        for (let i = 0; i <= num; i++) {
          let n = 4 * i
          for (let m = 0; m < 4; m++) {
            if (res.data[m + n]) {
              a.push(res.data[m + n])
            }
          }
          b.push(a)
          a = []
        }
        // console.log(b)
        this.usergroup = b
        for (let x = 0; x < this.usergroup.length; x++) {
          for (let y = 0; y < this.usergroup[x].length; y++) {
            if (this.usergroup[x][y].group_leaderId === JSON.parse(sessionStorage.getItem('EX_token')).user_id) {
              this.$set(this.usergroup[x][y], 'isleader', true)
            } else {
              this.$set(this.usergroup[x][y], 'isleader', false)
            }
          }
        }
      })
    },
    watchgrouptask (id) {
      for (let i = 0; i < this.leaderlist.length; i++) {
        if (id === this.leaderlist[i]) {
          this.isleader = true
        }
      }
      let self = this
      this.groupTaskVisible = true
      this.$http.post(this.url + '/group/getgrouptask', {
        group_id: id
      }).then((res) => {
        // console.log(res)
        if (res.data !== 0) {
          for (let i = 0; i < res.data.split(',').length; i++) {
            this.$http.post(this.url + '/task/findByid', {
              task_id: res.data.split(',')[i]
            }).then((res) => {
              // console.log(res)
              self.grouptask.push(res.data[0])
            })
          }
        } else {
          this.$message({
            message: '没有群组任务哦',
            type: 'warning'
          })
        }
      }).catch(() => { })
      // for (let i = 0; i < self.grouptask.length; i++) {
      //   if (self.grouptask[i].task_startdate === null) {
      //     self.$set(self.grouptask[i], 'date', '日常任务')
      //   } else {
      //     let date = self.dateToString(new Date(self.grouptask[i].task_startdate)) + ' 至 ' + self.dateToString(new Date(self.grouptask[i].task_enddate))
      //     self.$set(self.grouptask[i], 'date', date)
      //   }
      // }
      // console.log(self.grouptask)
    },
    watchgoupmenber (id) {
      this.group_id = id
      for (let i = 0; i < this.leaderlist.length; i++) {
        if (id === this.leaderlist[i]) {
          this.isleader = true
        }
      }
      let self = this
      this.groupMenberVisible = true
      this.$http.post(this.url + '/group/getgroupmenber', {
        group_id: id
      }).then((res) => {
        // console.log(res)
        let a = res.data.split(',')
        for (let i = 0; i < a.length; i++) {
          // console.log(a[i])
          self.menberlist.push({
            name: a[i]
          })
        }
        // console.log(this.menberlist)
      })
    },
    newGroup () {
      this.newGroupVisible = true
    },
    searchleader () {
      let self = this
      this.$http.post(this.url + '/group/searchleader', {
        user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id
      }).then((res) => {
        // console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          self.leaderlist.push(res.data[i].group_id)
        }
      }).catch(() => { })
    },
    levelup (item) {
      // console.log(item)
      this.$confirm('是否让' + item.name + '获得管理员权限', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.url + '/group/beadmin', {
          user_name: item.name,
          group_id: this.group_id
        }).then((res) => {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }).catch(() => { })
        this.groupMenberVisible = false
      }).catch(() => { })
    },
    goout (item) {
      // console.log(item)
      this.$confirm('是否将' + item.name + '踢出该团队', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.url + '/group/goout', {
          user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
          fuser_name: JSON.parse(sessionStorage.getItem('EX_token')).user_name,
          group_id: this.group_id,
          user_name: item.name,
          time: this.dateToString(new Date())
        }).then((res) => {
          if (res.index === 1) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.init()
            this.groupMenberVisible = false
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch(() => { })
      })
    },
    delegroup (item) {
      this.$confirm('是否解散该团队', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.url + '/group/delegroup', {
          user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
          group_id: item.group_id,
          time: this.dateToString(new Date())
        }).then((res) => {
          // console.log(res)
          this.$message({
            message: '已解散该团队',
            type: 'success'
          })
          this.init()
        })
      })
    },
    quitgroup (item) {
      this.$confirm('是否退出该团队', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.url + '/group/quitgroup', {
          group_id: item.group_id,
          user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
          user_name: JSON.parse(sessionStorage.getItem('EX_token')).user_name,
          time: this.dateToString(new Date())
        }).then((res) => {
          // console.log(res)
          this.$message({
            message: '已退出该团队',
            type: 'success'
          })
          this.init()
        })
      })
    },
    searchadmin () {
      let self = this
      this.$http.post(this.url + '/group/searchadmin', {
        user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id
      }).then((res) => {
        // console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          self.adminlist.push(res.data[i].group_id)
        }
      }).catch(() => { })
    },
    searchGroup () {

    },
    closetask () {
      this.grouptask = []
      this.isleader = false
    },
    closemenber () {
      this.menberlist = []
      this.isleader = false
    },
    closenew () {
      this.newGroupVisible = false
      this.groupinfo = {
        group_name: ''
      }
    },
    noAdd () {
      this.$confirm('是否取消新增？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.newGroupVisible = false
      }).catch(() => { })
    },
    sureAdd () {
      // let self = this
      this.$confirm('是否新增？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.groupinfo.group_name === '') {
          this.$message({
            type: 'warning',
            message: '请输入群名'
          })
        } else {
          this.$http.post(this.url + '/group/newgroup', {
            user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
            user_name: JSON.parse(sessionStorage.getItem('EX_token')).user_name,
            group_name: this.groupinfo.group_name,
            time: this.dateToString(new Date())
          }).then((res) => {
            // console.log(res)
            this.$message({
              type: 'warning',
              message: res.message
            })
            this.newGroupVisible = false
            this.init()
          }).catch(() => { })
        }
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
.groupBody {
  width: 100%;
  height: 95%;
}

.groupItems {
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.group-list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.group-list {
  margin: 1% auto;
}

.group-menberlist {
  margin: 0 1%;
}

.searchBar {
  width: 98%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1%;
}

.searchInput {
  width: 200px;
}

.searchButton {
  margin-left: 1%;
}
</style>
