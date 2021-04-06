<template>
  <div class="big-wrap" v-show="on">
    <div class="img-wrap">
      <lazy-img :imgSrc="imgInfo ? imgInfo.imgSrc : ''" :key="imgInfo === null ? 'nu1l' : imgInfo.imgSrc" :class="[imgClass, wVSh]" />
      <!-- <img v-lazy="imgInfo ? imgInfo.imgSrc : ''" alt="" :key="imgInfo === null ? 'nu1l' : imgInfo.imgSrc" :class="[imgClass, wVSh]"> -->
    </div>
    <div class="poem">
      <p>{{imgInfo && imgInfo.poem}}</p>
      <p>{{imgInfo && imgInfo.poem}}</p>
      <p>{{imgInfo && imgInfo.poem}}</p>
      <p>{{imgInfo && imgInfo.poem}}</p>
    </div>
    <div class="close-icon" @click="handleClose">

    </div>
  </div>
</template>

<script>
import LazyImg from './LazyImg'
export default {
  name: 'BigPt',
  components: { LazyImg },
  props: {
    imgInfo: {
      imgSrc: '',
      poem: '',
      time: '',
      width: 1,
      height: 1
    }
  },
  computed: {
    on: function () {
      return this.imgInfo !== null
    },
    wVSh: function () {
      let e = 'hwin'
      if ((this.imgInfo && this.imgInfo.width && this.imgInfo.height) && this.imgInfo.width > 2 * this.imgInfo.height) {
        e = 'wwin'
      }
      return e
    }
  },
  watch: {
    on: function() {
      this.toggleClass()
    }
  },
  data () {
    return {
      imgClass: 'img-zoomin'
    }
  },
  mounted () {
    
  },
  methods: {
    toggleClass () {
      this.$nextTick(() => {
        this.imgClass = this.imgClass === 'img-zoomin' ? 'img-zoomout' : 'img-zoomin'
      })
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  .big-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .432);
    overflow-x: hidden;
  }
  .img-wrap {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      transition: all 1s;
    }
  }
  .poem {
    position: absolute;
    left: 20px;
    bottom: 20px;
    p {
      color: white;
      margin: 4px 0;
    }
  }
  .close-icon {
    position: absolute;
    right: -50px;
    top: -50px;
    width: 100px;
    height: 100px;
    border-bottom-left-radius: 50%;
    background-color: rgba(0, 0, 0, .45);
    box-shadow: 0 0 10px rgba(0, 0, 0, .6);
    transition: all .3s;
    &:before {
      content: '';
      position: absolute;
      left: 22px;
      top: 68px;
      width: 16px;
      height: 2px;
      background-color: #fff;
      transform: rotate(45deg);
      transition: all .3s
    }
    &:after {
      content: '';
      position: absolute;
      left: 22px;
      top: 68px;
      width: 16px;
      height: 2px;
      background-color: #fff;
      transform: rotate(-45deg);
      transition: all .3s;
    }
    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, .8);
      &:before {
        transform: rotate(135deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
  }
  .img-zoomin {
    height: 0;
    width: 0;
  }
  .img-zoomout {
    &.wwin {
      width: 80%;
      height: auto;
    }
    &.hwin {
      width: auto;
      height: calc(100% - 100px);
    }
  }
</style>