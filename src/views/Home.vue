<template>
  <div class="home">
    <single-pt :imgInfo="info" />
  </div>
</template>

<script>
// @ is an alias to /src
import SinglePt from '@/components/SinglePt';
export default {
  name: 'Home',
  components: {
    SinglePt
  },
  data () {
    return {
      info: {
        imgSrc: 'https://upload.jianshu.io/users/upload_avatars/3668354/73cca7ac-400d-4ca4-ab7a-d19a9c287a30.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
        width: 28,
        height: 28,
        poem: 'pppoe',
        time: 'time'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
