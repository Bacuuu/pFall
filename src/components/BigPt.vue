<template>
  <div class="big-wrap" v-show="on">
    <div class="img-wrap">
      <img v-lazy="imgInfo ? imgInfo.imgSrc : ''" alt="" :class="imgClass">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigPt',
  props: {
    imgInfo: {
      imgSrc: '',
      poem: '',
      time: ''
    }
  },
  computed: {
    on: function () {
      return this.imgInfo !== null
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .big-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .432);
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
  .img-zoomin {
    height: 0;
    width: 0;
  }
  .img-zoomout {
    height: 80%;
    width: auto;
  }
</style>