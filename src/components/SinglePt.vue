<template>
  <div class="photo-wrap" :style="wrapStyle">
    <img v-lazy="imgInfo.imgSrc" alt="" :style="imgStyle">
  </div>
</template>

<script>
export default {
  name: 'SinglePt',
  props: {
    imgInfo: {
      // 图片src
      imgSrc: '',
      // 宽
      width: 0,
      // 高
      height: 0,
      // 简语
      poem: '',
      // 时间
      time: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    wrapStyle () {
      return {
        width: this.imgInfo.width + 8 + 'px',
        height: this.imgInfo.height + 28 + 'px'
      }
    },
    imgStyle () {
      return {
        width: this.imgInfo.width + 'px',
        height: this.imgInfo.height + 'px'
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .photo-wrap {
    background-color: black;
  }
</style>