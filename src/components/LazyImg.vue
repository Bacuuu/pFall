<template>
  <img class="lz" ref="lazyimg" :src="src" alt="" :style="lzStyle">
</template>
<script>
import { throttle } from 'throttle-debounce'
export default {
  name: 'LazyImg',
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    imgSrc: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 图片的src,这里进行require CONFIG目录底下的文件
      src: require('../assets/loading.gif'),
      lzStyle: {},
      // 用于记录该图片是否已经进行加载，用于阻止滑动之后又一次返回，导致重新触发加载条件
      // unload 未加载 pending 加载中 loaded 已加载 failed 失败
      // loaded之后进行freeze?
      status: 'unload'
    }
  },
  watch: {
    status: function (n) {
      switch (n) {
      case 'pending':
        // 加载中
        break
      case 'loaded':
        // 加载完成
        window.onscroll = null
        break
      case 'failed':
        // 失败
        // 进行再次请求 || 置为错误图片或者不显示该图片
        break
      default:
        break
      }
    }
  },
  mounted () { 
    if (this.width && this.height) {
      this.changeSize()
      this.handleScroll()
      // 做节流
      window.onscroll = throttle(300, false, () => {
        this.handleScroll()
      })
    } else {
      this.genImg()
    }
  },
  methods: {
    changeSize () {
      const { width } = this.$refs.lazyimg.getBoundingClientRect()
      if (this.height / this.width > 2) {
        this.lzStyle = {
          height: '200px'
        }
      } else {
        this.lzStyle = {
          height: this.height / this.width * width + 'px'
        }
      }
    },
    handleScroll () {
      // 这个是距离屏幕顶端的像素
      const { top } = this.$refs.lazyimg.getBoundingClientRect()
      // 这个是屏幕的高度
      const winheight = window.innerHeight
      // 这个可用于判断离图片出现还有多远，进行data-src和src的swap
      if (top - winheight < 600) {
        this.status = 'pending'
        this.genImg()
      }
    },
    genImg () {
      // 创建image进行请求
      const image = new Image()
      image.src = this.imgSrc
      // 图片加载完成后进行替换
      image.onload = () => {
        this.src = this.imgSrc
        this.status = 'loaded'
      }
      image.onerror = () => {
        this.status = 'failed'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.lz {
  width: 100%;
  object-fit: cover;
}
</style>