import Vue from 'vue'
import App from './App.vue'
import vueLazyload from 'vue-lazyload'
import router from './router'
import axios from 'axios'
const loadingImg = require('./assets/loading.gif')

Vue.config.productionTip = false

Vue.use(vueLazyload, {
  loading: loadingImg,
  dispatchEvent: true
})
Vue.prototype.$axios = axios;

if(process.env.NODE_ENV === 'development') {
  const Mock = require('mockjs')
  Mock.mock('/api/getImg', 'get', () => {
    const list = []
    for(let i = 0; i < 20; i++) {
      const width = Mock.Random.integer(200,800)
      const height = Mock.Random.integer(100,900)
      const imgSrc = Mock.Random.image(`${width}x${height}`)
      const poem = Mock.Random.csentence(10,20);
      const time = Mock.Random.datetime()
      list.push({
        width,
        height,
        imgSrc,
        poem,
        time
      })
    }
    return list
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
