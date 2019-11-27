<template>
  <div>tags</div>
</template>
<script>
export default {
  data () {
    return {
      a: 'tags'
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
