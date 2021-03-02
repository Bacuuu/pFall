import Vue from 'vue'
import App from './App.vue'
import vueLazyload from 'vue-lazyload'
import router from './router'

Vue.config.productionTip = false

Vue.use(vueLazyload)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
