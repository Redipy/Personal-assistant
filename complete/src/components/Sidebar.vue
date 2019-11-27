<template>
  <div>sidebar</div>
</template>
<script>
export default {
  data () {
    return {
      a: 'sidebar'
    }
  },
  methods: {
    aa () {
      console.log(this.a)
    }
  },
  mounted () {
    this.aa()
  }
}
</script>
