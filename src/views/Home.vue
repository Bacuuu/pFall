<template>
  <div class="pf-wrap">
    <div class="pf-column" v-for="(item, index) in infoList" :key="index" :style="columnStyle">
      <single-pt v-for="pt in item" :key="pt.imgSrc" :imgInfo="pt" @clickPt="clickPt(pt)" />
    </div>
    <big-pt :imgInfo="biggerPt" @handleClose="closeBigPt"></big-pt>
  </div>
</template>

<script>
// @ is an alias to /src
import SinglePt from '@/components/SinglePt';
import BigPt from '@/components/BigPt'
import { colsToWidth } from './config'
import {
  colInsert,
  colNumChangeTo,
  getColData
} from './wcti'
export default {
  name: 'Home',
  components: {
    SinglePt,
    BigPt
  },
  data () {
    return {
      colNums: 4,
      infoList: [],
      biggerPt: null
    }
  },
  created() {
    colNumChangeTo(this.colNums)
    this.$axios.get('/api/getImg')
      .then(r => {
        r.data.forEach(i => {
          colInsert(i)
        })
        this.infoList = getColData()
      })
  },
  computed: {
    columnStyle () {
      return {
        width: colsToWidth[this.colNums]
      }
    }
  },
  methods: {
    clickPt (pt) {
      console.log(pt)
      this.biggerPt = pt;
    },
    closeBigPt () {
      this.biggerPt = null
    }
  }
}
</script>
<style lang="scss" scoped>
.pf-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.pf-column {
  display: flex;
  flex-direction: column;
}
</style>
