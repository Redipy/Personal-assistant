<template>
  <div class="home">
    <div class="homebody">
      <div class="homeuser">
        <div class="homeusertitle">
          个人助理工具
        </div>
        <div class="homeuserdetail">
          <p>欢迎您，{{user.username}}</p>
          <p>当前时间：{{nowTime}}</p>
        </div>
      </div>
      <div class="homebox"
           v-for="(info, index) in start"
           :key="index">
        <div class="homebox-inside"
             v-for="(item, index) in info"
             :key="index">
          <div class="homebox-icon"
               :style="{'background-color': item.bgColor}">
            <i :class="item.icon"></i>
          </div>
          <div class="homebox-info">
            <!-- <p class="homebox-info-total">{{item.total}}</p> -->
            <p @click="go(item.path)"
               class="homebox-info-title">{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="homefoot">
      <div class="homefoot-title">常用网站链接</div>
      <div class="homefoot-body">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in userweb"
                  :key="index"
                  :span="2">
            <div class="grid-content"
                 @click="gotopath(item.path)">
              <div class="homefoot-pic">
                <el-image style="width: 100px; height: 100px"
                          :src=item.src
                          fit="contain"></el-image>
              </div>
              <div class="homefoot-picname">{{item.name}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowTime: new Date(),
      user: {
        userid: '',
        username: ''
      },
      start: [
        [
          {
            icon: 'el-icon-service',
            title: '日历',
            path: '/date',
            // total: 198397,
            bgColor: '#ebcc6f'
          },

          {
            icon: 'el-icon-star-off',
            title: '我的任务',
            path: '/task',
            // total: 190857,
            bgColor: '#67c4ed'
          }
        ],
        [
          {
            icon: 'el-icon-edit-outline',
            title: '我的备忘录',
            path: '/noforget',
            // total: 9397,
            bgColor: '#af84cb'
          },
          {
            icon: 'el-icon-location-outline',
            title: '我的信息',
            path: '/message',
            // total: 19,
            bgColor: '#3acaa9'
          }
        ],
        [
          {
            icon: 'el-icon-share',
            title: '群组管理',
            path: '/group',
            // total: 9097,
            bgColor: '#67c4ed'
          },
          {
            icon: 'el-icon-goods',
            title: '修改密码',
            path: '/info',
            // total: 397,
            bgColor: '#ebcc6f'
          }
        ]
      ],
      userweb: [
        {
          src: 'static/img/baidu.jpg',
          name: '百度',
          path: 'https://www.baidu.com'
        },
        {
          src: 'static/img/bilibili.jpg',
          name: '哔哩哔哩',
          path: 'https://www.bilibili.com/'
        },
        {
          src: 'static/img/douyu.jpg',
          name: '斗鱼',
          path: 'https://www.douyu.com/'
        },
        {
          src: 'static/img/github.jpg',
          name: 'github',
          path: 'https://github.com/'
        },
        {
          src: 'static/img/google.jpg',
          name: '谷歌翻译',
          path: 'https://translate.google.cn/'
        },
        {
          src: 'static/img/wangyi.jpg',
          name: '网易邮箱',
          path: 'https://email.163.com/'
        }
      ]
    }
  },
  methods: {
    init () {
      this.setNowTime()
      console.log(sessionStorage.getItem('EX_token'))
      this.user = {
        userid: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
        username: JSON.parse(sessionStorage.getItem('EX_token')).user_name
      }
      console.log(this.user)
    },
    go (side) {
      console.log(side)
      this.$router.push(side)
    },
    setNowTime () {
      this.nowTime = this.dateToString(new Date())
      setInterval(() => {
        this.nowTime = this.dateToString(new Date())
      }, 1000)
    },
    dateToString (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (second < 10) {
        second = '0' + second
      }
      let res = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second
      return res
    },
    gotopath (path) {
      window.open(path, '_blank')
    }
  },
  created () {
    this.init()
  }
}
</script>
<style type="text/css" scoped>
.home {
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgb(230, 230, 230);
  /* width: 95%; */
}
.homebody {
  height: 30%;
  /* margin: 20px 20px; */
  display: flex;
  justify-content: space-around;
}
.homefoot {
  height: 60%;
  margin: 50px 20px 0px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.homefoot-title {
  height: 10%;
  width: 100%;
  background-color: #34a598;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.homefoot-body {
  height: 90%;
  width: 100%;
}
.el-row {
  width: 100%;
  height: 30%;
  margin: 0;
}
.el-col {
  height: 100%;
}
.grid-content {
  margin: 10%;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.homeuser {
  height: 100%;
  width: 19%;
  margin: 20px 20px;
  box-shadow: 2px 2px 5px #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.homeusertitle {
  width: 100%;
  height: 50%;
  background-color: #34a598;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* line-height: 100%; */
}
.homeuserdetail {
  width: 100%;
  height: 50%;
  color: #666;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.homebox {
  height: 100%;
  width: 25%;
  margin: 20px 20px;
  /* box-shadow: 2px 2px 5px #ccc; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.homebox-inside {
  height: 45%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 2px 2px 5px #ccc;
  /* align-items: center; */
}
.homebox-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  color: white;
  font-size: 50px;
}
.homebox-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.homebox-info-total {
  color: #0085d0;
  font-size: 27px;
  font-weight: bold;
  margin: 0 auto;
}
.homebox-info-title {
  color: #666;
  font-size: 22px;
  margin: 0 auto;
  cursor: pointer;
}
</style>
