import '@/polyfill'
import '@/api/init-parse'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Meta from 'vue-meta'

Vue.use(Meta)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
