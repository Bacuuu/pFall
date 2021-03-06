<template>
  <div class="pt-wrap" :style="wrapStyle" @click="clickPt">
    <img v-lazy="imgInfo.imgSrc" alt="" :key="imgInfo.imgSrc" :style="imgStyle">
    <div class="pt-info">
      <span>{{imgInfo.poem}}</span>
    </div>
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
        width: '100%',
        height: this.imgInfo.vHeight ? this.imgInfo.vHeight + 24 + 'px' : 'auto'
      }
    },
    imgStyle () {
      return {
        width: '100%',
        height: this.imgInfo.vHeight ? this.imgInfo.vHeight + 'px' : 'auto',
      }
    }
  },
  methods: {
    clickPt () {
      this.$emit('clickPt',this.imgInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pt-wrap {
    transition: all .5s;
    background-color: black;
    img {
      transition: all .5s;
      object-fit: cover;
    }
    &:hover {
      img {
        transform: scale(0.98);
      }
      box-shadow: 0 0 10px #333;
      // box-sizing: border-box;
      // border: 8px solid rgba(100, 100, 100, 1)
    }
    .pt-info {
      height: 24px;
      text-align: left;
      padding-left: 8px;
      span {
        font-size: 16px;
        color: rgba($color: #eee, $alpha: 1.0)
      }
    }
  }
</style>