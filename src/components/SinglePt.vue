<template>
  <div class="pt-wrap" :style="wrapStyle" @click="clickPt">
    <lazy-img
      :key="imgInfo.imgSrc"
      :width="imgInfo.width"
      :height="imgInfo.height"
      :imgSrc="imgInfo.imgSrc" />
    <div class="pt-info">
      <span>{{imgInfo.poem}}</span>
    </div>
  </div>
</template>

<script>
import LazyImg from '@/components/LazyImg'
export default {
  name: 'SinglePt',
  components: { LazyImg },
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
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    img {
      transition: all .5s;
      object-fit: cover;
    }
    &:hover {
      background-color: #ccc;
      box-shadow: 0 0 10px #333;
      img {
        transform: scale(0.95);
      }
      .pt-info span {
        color: black
      }
    }
    .pt-info {
      height: 24px;
      text-align: left;
      padding-left: 8px;
      span {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        color: rgba($color: #eee, $alpha: 1.0);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>