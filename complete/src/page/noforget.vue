<template>
  <div>
    <el-date-picker class="searchTask"
                    v-model="search"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    @change="timechange"
                    :picker-options="pickerOptions">
    </el-date-picker>
    <el-button class="searchButton"
               @click="searchinfo"
               type="primary"
               round>搜索</el-button>
    <quill-editor ref="text"
                  v-model="content"
                  class="myQuillEditor"
                  :options="editorOption" />
    <el-button class="searchButton"
               @click="saveinfo"
               type="primary"
               round>保存</el-button>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      insert: true,
      id: '',
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
      search: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'clean': '源码编辑' }],
            ['link', 'image', 'video'],
            ['sourceEditor']
          ]
        },
        theme: 'snow'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    init () {
      if (this.$route.params.date) {
        this.search = this.$route.params.date
        // console.log(this.search)
        // console.log(this.$route.params.date)
        // console.log('11111111111111111111111111111111111111111111111')
      } else {
        this.search = this.dateToString(new Date())
      }
      this.loadinfo()
    },
    loadinfo () {
      this.content = ''
      this.$http.post(this.url + '/noforget/getinfo', {
        user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
        noforget_time: this.search
      }).then((res) => {
        if (res.index === 0) {
          this.insert = true
        } else {
          this.insert = false
          this.content = res.data.noforget_info
          this.id = res.data.noforget_id
        }
      }).catch(() => { console.log('报错') })
    },
    searchinfo () {
      this.loadinfo()
    },
    saveinfo () {
      //       console.log(this.content)
      this.$confirm('是否保存？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.insert) {
          this.$http.post(this.url + '/noforget/insertinfo', {
            user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
            noforget_info: this.content,
            noforget_time: this.search,
            insert: this.insert,
            id: this.id
          }).then((res) => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }).catch(() => { console.log('报错') })
        } else {
          this.$http.post(this.url + '/noforget/updateinfo', {
            user_id: JSON.parse(sessionStorage.getItem('EX_token')).user_id,
            noforget_info: this.content,
            noforget_time: this.search,
            id: this.id
          }).then((res) => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }).catch(() => { console.log('报错') })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消保存'
        })
      })
    },
    timechange (value) {
      //       console.log(value)
      this.search = this.dateToString(value)
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
