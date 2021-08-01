<template>
  <div class="pf-wrap">
    <div class="pf-column" v-for="(item, index) in infoList" :key="index" :style="columnStyle">
      <single-pt class="single-pt" v-for="(pt, index) in item" :key="index" :imgInfo="pt" @clickPt="clickPt(pt)" />
    </div>
    <big-pt :imgInfo="biggerPt" @handleClose="closeBigPt"></big-pt>
  </div>
</template>

<script>
// @ is an alias to /src
import SinglePt from '@/components/SinglePt';
import BigPt from '@/components/BigPt'
import { colsToWidth } from './config'
import { throttle } from 'throttle-debounce'
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
      biggerPt: null,
      current: 0
    }
  },
  created() {
    this.judgeWidth();
    colNumChangeTo(this.colNums)
    this.getData()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleResize, true);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.handleScroll, true)
      window.removeEventListener('resize', this.handleResize, true)
    })
  },
  computed: {
    columnStyle () {
      return {
        width: colsToWidth[this.colNums]
      }
    }
  },
  watch: {
    colNums (n) {
      colNumChangeTo(n);
      this.infoList = getColData()
    }
  },
  methods: {
    clickPt (pt) {
      this.biggerPt = pt;
    },
    closeBigPt () {
      this.biggerPt = null
    },
    handleScroll: throttle(200, false, function () {
      if ((document.documentElement.offsetHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) < 1200) {
        this.getData()
      }
    }),
    handleResize: throttle(200, false, function () {
      this.judgeWidth()
    }),
    judgeWidth () {
      const width = document.documentElement.clientWidth
      if (width > 1000) {
        this.colNums = 4;
      } else if (width > 745) {
        this.colNums = 3
      } else {
        this.colNums = 2
      }
    },
    getData () {
      this.$axios.get('/api/v1/photo/get', {
        params: {
          limit: 20,
          current: this.current
        }
      })
        .then(r => {
          const { list } = r.data.data
          if (list && list.length) {
            this.current += list.length
            list.forEach(i => {
              colInsert(i)
            })
            this.infoList = getColData()
          } else {
            window.removeEventListener('scroll', this.handleScroll, true)
          }
        })
        .catch(err => {
          console.log(err)
          window.removeEventListener('scroll', this.handleScroll, true)
        })
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
.single-pt {
  margin: 4px 0;
}
</style>
