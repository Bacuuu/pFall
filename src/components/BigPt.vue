<template>
  <div class="big-wrap" v-show="on">
    <div class="img-wrap">
      <!-- <img :src="imgInfo ? imgInfo.imgSrc : ''" :class="[imgClass, wVSh]" alt=""> -->
      <lazy-img :imgSrc="imgInfo ? imgInfo.imgSrc : ''" :key="imgInfo === null ? 'nu1l' : imgInfo.imgSrc" :class="[imgClass, wVSh]" />
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
      width: 0,
      height: 0
    }
  },
  data () {
    return {
      imgClass: 'img-zoomin'
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
    on: function(n) {
      if (n) {
        setTimeout(() => {
          this.toggleClass()
        }, 0)
      }
    }
  },
  mounted () {
    
  },
  methods: {
    toggleClass () {
      // this.$nextTick(() => {
        this.imgClass = this.imgClass === 'img-zoomin' ? 'img-zoomout' : 'img-zoomin'
      // })
    },
    handleClose () {
      this.toggleClass()
      setTimeout(() => {
        this.$emit('handleClose')      
      }, 300);
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
      transition: all .3s;
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
    transform: scale(0);
    &.wwin {
      width: 80%;
      max-width: 80%;
      height: auto;
    }
    &.hwin {
      width: auto;
      height: calc(100% - 100px);
    }
  }
  .img-zoomout {
    transform: scale(1);
    &.wwin {
      width: 80%;
      max-width: 80%;
      height: auto;
    }
    &.hwin {
      width: auto;
      height: calc(100% - 100px);
    }
  }
</style>