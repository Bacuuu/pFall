<template>
  <div class="pf-wrap">
    <div class="pf-column" v-for="(item, index) in infoList" :key="index" :style="columnStyle">
      <single-pt v-for="pt in item" :key="pt.imgSrc" :imgInfo="pt" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SinglePt from '@/components/SinglePt';
import { colsToWidth } from './config'
import {
  colInsert,
  colNumChangeTo,
  getColData
} from './wcti'
export default {
  name: 'Home',
  components: {
    SinglePt
  },
  data () {
    return {
      colNums: 4,
      infoList: []
    }
  },
  mounted() {
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
